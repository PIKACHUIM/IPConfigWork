import {Hono, Next} from 'hono'
import {serveStatic} from 'hono/cloudflare-workers' // @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'
import {getConnInfo} from 'hono/cloudflare-workers'

// 为 Cloudflare Workers 绑定环境变量（如 ABUSEIPDB_KEY）
const app = new Hono<{ Bindings: { ABUSEIPDB_KEY?: string, IPQS_KEY?: string } }>()

// 通用超时信号，兼容 AbortSignal.timeout 不可用的运行时
function timeoutSignal(ms: number): AbortSignal {
    const AS: any = AbortSignal as any
    if (typeof AS?.timeout === 'function') {
        return AS.timeout(ms)
    }
    const controller = new AbortController()
    setTimeout(() => controller.abort(), ms)
    return controller.signal
}

// 统一归一化使用类型/公司类型，映射到前端识别的主类目
function normalizeType(type: string | null | undefined): string {
    const t = (type || '').toString().trim().toLowerCase()
    if (!t) return '未知'
    // hosting / datacenter / cloud / cdn
    const hostingSynonyms = ['hosting', 'host', 'datacenter', 'data center', 'dc', 'cloud', 'cloud_provider', 'cloud provider', 'cdn', 'colo', 'server']
    if (hostingSynonyms.some(k => t.includes(k))) return 'hosting'

    // isp / residential / mobile / carrier / cellular / broadband / telecom
    const ispSynonyms = ['isp', 'residential', 'consumer', 'home', 'carrier', 'cellular', 'mobile', 'broadband', 'telecom', 'internet service']
    if (ispSynonyms.some(k => t.includes(k))) return 'isp'

    // education / university / college / school / library
    const eduSynonyms = ['education', 'university', 'college', 'school', 'library']
    if (eduSynonyms.some(k => t.includes(k))) return 'education'

    // government / gov / military / public sector
    const govSynonyms = ['government', 'gov', 'military', 'public sector']
    if (govSynonyms.some(k => t.includes(k))) return 'government'

    // banking / finance 归为 business，前端不单列 banking
    const bizSynonyms = ['business', 'enterprise', 'company', 'commercial', 'organization', 'org', 'corporate', 'vendor', 'provider', 'nonprofit', 'finance', 'financial', 'banking']
    if (bizSynonyms.some(k => t.includes(k))) return 'business'

    return '未知'
}

// 跨域处理 ##############################################################################
app.use('*', async (c: any, next: Next): Promise<any> => {
    // 设置 CORS 头 =============================================================
    c.header('Access-Control-Allow-Origin', '*')
    c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    c.header('Access-Control-Allow-Credentials', 'true')
    // 处理预检请求 =============================================================
    if (c.req.method === 'OPTIONS') return c.text('', 200)
    await next()
})

// ASN查询API
app.post('/api/asn', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        // Primary: ip-api.com（HTTPS）增加状态字段，便于判断
        let result: { ASN: string; as_info: string; as_domain: string } | null = null
        try {
            const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,as,isp,org`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && data.status === 'success') {
                    const asRaw: string = data.as || ''
                    const asCode: string = (asRaw || '').split(' ')[0] || '未知'
                    result = {
                        ASN: asCode,
                        as_info: data.isp || data.org || '未知',
                        as_domain: data.org || '未知'
                    }
                }
            }
        } catch (_) {
            // ignore and fallback
        }

        // Fallback: ipwho.is
        if (!result) {
            try {
                const resp2 = await fetch(`https://ipwho.is/${ip}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                })
                if (resp2.ok) {
                    const data2: any = await resp2.json()
                    if (data2 && data2.success) {
                        const conn: any = data2.connection || {}
                        const asRaw: string = conn.asn ? `AS${conn.asn}` : ''
                        const asCode: string = (asRaw || '').split(' ')[0] || '未知'
                        result = {
                            ASN: asCode,
                            as_info: conn.isp || conn.org || '未知',
                            as_domain: conn.org || '未知'
                        }
                    }
                }
            } catch (_) {
                // ignore
            }
        }

        if (!result) {
            result = {ASN: '未知', as_info: '未知', as_domain: '未知'}
        }
        return c.json(result)
    } catch (error) {
        // 始终返回 200，避免前端 500
        return c.json({ASN: '未知', as_info: '未知', as_domain: '未知'})
    }
})

// IP信息查询API（使用ipinfo.io获取完整信息）
app.post('/api/ip-info', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        let result = null

        // 首先尝试ipinfo.io（提供完整的company和abuse信息）
        try {
            const response = await fetch(`https://ipinfo.io/widget/demo/${ip}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json'
                },
                signal: timeoutSignal(5000)
            })

            if (response.ok) {
                const data: any = await response.json()
                if (data && data.data) {
                    const d: any = data.data
                    const loc = (d.loc || '').split(',')
                    result = {
                        source: 'ipinfo.io',
                        ip: ip,
                        asn: d.asn ? {
                            asn: d.asn.asn || '',
                            name: d.asn.name || '',
                            domain: d.asn.domain || '',
                            route: d.asn.route || '',
                            type: d.asn.type || ''
                        } : null,
                        isp: d.asn?.name || '',
                        org: d.asn?.name || '',
                        country: d.country_name || '',
                        countryCode: d.country || '',
                        region: d.region || '',
                        city: d.city || '',
                        postal: d.postal || '',
                        lat: loc[0] ? parseFloat(loc[0]) : 0,
                        lon: loc[1] ? parseFloat(loc[1]) : 0,
                        timezone: d.timezone || '',
                        company: d.company ? {
                            name: d.company.name || '',
                            domain: d.company.domain || '',
                            type: d.company.type || ''
                        } : null,
                        abuse: d.abuse ? {
                            address: d.abuse.address || '',
                            country: d.abuse.country || '',
                            email: d.abuse.email || '',
                            name: d.abuse.name || '',
                            network: d.abuse.network || '',
                            phone: d.abuse.phone || ''
                        } : null,
                        privacy: d.privacy ? {
                            vpn: d.privacy.vpn || false,
                            proxy: d.privacy.proxy || false,
                            tor: d.privacy.tor || false,
                            relay: d.privacy.relay || false,
                            hosting: d.privacy.hosting || false,
                            service: d.privacy.service || ''
                        } : {
                            vpn: false,
                            proxy: false,
                            tor: false,
                            relay: false,
                            hosting: false,
                            service: ''
                        },
                        // 新增字段
                        is_anycast: d.is_anycast || false,
                        is_mobile: d.is_mobile || false,
                        is_anonymous: d.is_anonymous || false,
                        is_satellite: d.is_satellite || false,
                        is_hosting: d.is_hosting || false,
                        proxy: d.privacy?.proxy || false,
                        hosting: d.privacy?.hosting || false
                    }
                }
            }
        } catch (error: any) {
            console.warn('ipinfo.io failed:', error?.message || error)
        }

        // 如果ipinfo.io失败，尝试ip-api.com
        if (!result) {
            try {
                const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,as,isp,org,country,countryCode,regionName,city,zip,lat,lon,timezone,proxy,hosting`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    signal: timeoutSignal(5000)
                })

                if (response.ok) {
                    const data: any = await response.json()
                    if (data && data.status === 'success') {
                        result = {
                            source: 'ip-api.com',
                            ip: ip,
                            asn: data.as || '',
                            isp: data.isp || '',
                            org: data.org || '',
                            country: data.country || '',
                            countryCode: data.countryCode || '',
                            region: data.regionName || '',
                            city: data.city || '',
                            postal: data.zip || '',
                            lat: data.lat || 0,
                            lon: data.lon || 0,
                            timezone: data.timezone || '',
                            company: null,
                            abuse: null,
                            proxy: data.proxy || false,
                            hosting: data.hosting || false
                        }
                    }
                }
            } catch (error: any) {
                console.warn('ip-api.com failed:', error?.message || error)
            }
        }

        // 如果ip-api.com失败，尝试ipwho.is
        if (!result) {
            try {
                const response = await fetch(`https://ipwho.is/${ip}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                    signal: timeoutSignal(5000)
                })

                if (response.ok) {
                    const data: any = await response.json()
                    if (data && data.success) {
                        const conn: any = data.connection || {}
                        result = {
                            source: 'ipwho.is',
                            ip: ip,
                            asn: conn.asn ? `AS${conn.asn}` : '',
                            isp: conn.isp || '',
                            org: conn.org || '',
                            country: data.country || '',
                            countryCode: data.country_code || '',
                            region: data.region || '',
                            city: data.city || '',
                            postal: data.postal || '',
                            lat: data.latitude || 0,
                            lon: data.longitude || 0,
                            timezone: data.timezone?.id || '',
                            company: null,
                            abuse: null,
                            proxy: data.security?.proxy || false,
                            hosting: data.security?.hosting || false
                        }
                    }
                }
            } catch (error) {
                console.warn('ipwho.is failed:', error)
            }
        }

        if (!result) {
            // 如果所有API都失败，返回基本信息
            result = {
                source: 'fallback',
                ip: ip,
                asn: '未知',
                isp: '未知',
                org: '未知',
                country: '未知',
                countryCode: '',
                region: '未知',
                city: '未知',
                postal: '',
                lat: 0,
                lon: 0,
                timezone: '未知',
                company: null,
                abuse: null,
                proxy: false,
                hosting: false
            }
        }

        return c.json(result)
    } catch (error: any) {
        console.error('IP info API error:', error)
        return c.json({
            error: '查询失败',
            details: error?.message || '未知错误',
            source: 'error',
            ip: ip || ''
        }, 500)
    }
})

// IP信息查询API（GET，自动获取真实客户端IP并查询 ipinfo.io widget demo）
app.get('/api/ip-info', async (c) => {
    try {
        // 从请求头推断真实客户端IP（优先Cloudflare提供的头部）
        const header = (name: string) => c.req.header(name) || c.req.raw.headers.get(name) || ''
        const cfIp = header('cf-connecting-ip') || header('CF-Connecting-IP')
        const xff = header('x-forwarded-for') || header('X-Forwarded-For')
        const trueClient = header('true-client-ip') || header('True-Client-IP')
        const xReal = header('x-real-ip') || header('X-Real-IP')
        const fromXff = (xff || '').split(',')[0]?.trim() || ''
        const ip = cfIp || fromXff || trueClient || xReal || ''

        if (!ip) {
            return c.text('无法获取真实客户端IP', 400)
        }

        let result = null
        try {
            const response = await fetch(`https://ipinfo.io/widget/demo/${ip}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json'
                },
                signal: timeoutSignal(5000)
            })

            if (response.ok) {
                const data: any = await response.json()
                if (data && data.data) {
                    const d: any = data.data
                    const loc = (d.loc || '').split(',')
                    result = {
                        source: 'ipinfo.io',
                        ip: ip,
                        asn: d.asn ? {
                            asn: d.asn.asn || '',
                            name: d.asn.name || '',
                            domain: d.asn.domain || '',
                            route: d.asn.route || '',
                            type: d.asn.type || ''
                        } : null,
                        isp: d.asn?.name || '',
                        org: d.asn?.name || '',
                        country: d.country_name || '',
                        countryCode: d.country || '',
                        region: d.region || '',
                        city: d.city || '',
                        postal: d.postal || '',
                        lat: loc[0] ? parseFloat(loc[0]) : 0,
                        lon: loc[1] ? parseFloat(loc[1]) : 0,
                        timezone: d.timezone || '',
                        company: d.company ? {
                            name: d.company.name || '',
                            domain: d.company.domain || '',
                            type: d.company.type || ''
                        } : null,
                        abuse: d.abuse ? {
                            address: d.abuse.address || '',
                            country: d.abuse.country || '',
                            email: d.abuse.email || '',
                            name: d.abuse.name || '',
                            network: d.abuse.network || '',
                            phone: d.abuse.phone || ''
                        } : null,
                        privacy: d.privacy ? {
                            vpn: d.privacy.vpn || false,
                            proxy: d.privacy.proxy || false,
                            tor: d.privacy.tor || false,
                            relay: d.privacy.relay || false,
                            hosting: d.privacy.hosting || false,
                            service: d.privacy.service || ''
                        } : {
                            vpn: false,
                            proxy: false,
                            tor: false,
                            relay: false,
                            hosting: false,
                            service: ''
                        },
                        is_anycast: d.is_anycast || false,
                        is_mobile: d.is_mobile || false,
                        is_anonymous: d.is_anonymous || false,
                        is_satellite: d.is_satellite || false
                    }
                }
            }
        } catch (_) {
            // ignore
        }

        if (!result) {
            result = {
                source: 'ipinfo.io',
                ip,
                asn: null,
                isp: '',
                org: '',
                country: '',
                countryCode: '',
                region: '',
                city: '',
                postal: '',
                lat: 0,
                lon: 0,
                timezone: '',
                company: null,
                abuse: null,
                privacy: {vpn: false, proxy: false, tor: false, relay: false, hosting: false, service: ''},
                is_anycast: false,
                is_mobile: false,
                is_anonymous: false,
                is_satellite: false
            }
        }
        return c.json(result)
    } catch (_) {
        return c.text('服务错误', 500)
    }
})

// IP质量检测API - 返回各个数据源的完整风险因子信息
app.post('/api/ip-quality', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        // 调试日志：确认是否存在 AbuseIPDB 密钥
        const abuseKeyPresent = Boolean(c.env?.ABUSEIPDB_KEY || process.env.ABUSEIPDB_KEY)
        console.log('[ip-quality] 调用 fetchAbuseIPDB: ip', ip, '密钥存在:', abuseKeyPresent)

        // 并行获取所有数据源的信息（参考 ip-quality.sh 的多数据源检测逻辑）
        const [ipinfo, ipapi, ip2location, scamalytics, ipregistry, ipqs, ipdata, ipwhois, dbip, abuseipdb, cloudflare] = await Promise.allSettled([
            fetchIPInfo(ip),
            fetchIPAPI(ip),
            fetchIP2Location(ip),
            fetchScamalytics(ip),
            fetchIPRegistry(ip),
            fetchIPQS(ip, c.env?.IPQS_KEY),
            fetchIPData(ip),
            fetchIPWhois(ip),
            fetchDBIP(ip),
            fetchAbuseIPDB(ip, c.env?.ABUSEIPDB_KEY),
            fetchCloudflare(ip)
        ])

        // 简要日志，便于确认IP2Location是否被调用与返回状态
        console.log('[ip-quality] ip', ip, 'ip2location status:', ip2location.status)

        const errors: Record<string, string> = {}
        const val = (r: PromiseSettledResult<any>, name: string) => {
            if (r.status === 'fulfilled') {
                return r.value || null
            }
            const reason = (r as any)?.reason
            errors[name] = (reason?.message || String(reason) || '查询失败')
            return null
        }

        const qualityData = {
            ip: ip,
            ipinfo: val(ipinfo, 'ipinfo'),
            ipapi: val(ipapi, 'ipapi'),
            ip2location: val(ip2location, 'ip2location'),
            scamalytics: val(scamalytics, 'scamalytics'),
            ipregistry: val(ipregistry, 'ipregistry'),
            ipqs: val(ipqs, 'ipqs'),
            ipdata: val(ipdata, 'ipdata'),
            ipwhois: val(ipwhois, 'ipwhois'),
            dbip: val(dbip, 'dbip'),
            abuseipdb: val(abuseipdb, 'abuseipdb'),
            cloudflare: val(cloudflare, 'cloudflare'),
            errors
        }

        return c.json(qualityData)
    } catch (error: any) {
        return c.json({error: '检测失败', details: error?.message || '未知错误'}, 500)
    }
})

// 客户端访问IP查询（通过请求头获取，优先 Cloudflare 提供的头部）
app.get('/api/client-ip', (c) => {
    const header = (name: string) => c.req.header(name) || c.req.raw.headers.get(name) || ''
    // 优先顺序：CF-Connecting-IP → X-Forwarded-For(首个) → True-Client-IP → X-Real-IP
    const cfIp = header('cf-connecting-ip') || header('CF-Connecting-IP')
    const xff = header('x-forwarded-for') || header('X-Forwarded-For')
    const trueClient = header('true-client-ip') || header('True-Client-IP')
    const xReal = header('x-real-ip') || header('X-Real-IP')
    const fromXff = (xff || '').split(',')[0]?.trim() || ''
    const ip = cfIp || fromXff || trueClient || xReal || ''
    return c.json({ip})
})


// 静态资源路由（显式绑定首页）
app.get('/', async (c) => {
    const userAgent = c.req.header('User-Agent') || '';
    const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera)/i;
    const excludeRegex = /(bot|crawler|api-client)/i;
    if (browserRegex.test(userAgent) && !excludeRegex.test(userAgent))
        return c.redirect('index.html', 302);
    const header = (name: string) => c.req.header(name) || c.req.raw.headers.get(name) || ''
    // 优先顺序：CF-Connecting-IP → X-Forwarded-For(首个) → True-Client-IP → X-Real-IP
    const cfIp = header('cf-connecting-ip') || header('CF-Connecting-IP')
    const xff = header('x-forwarded-for') || header('X-Forwarded-For')
    const trueClient = header('true-client-ip') || header('True-Client-IP')
    const xReal = header('x-real-ip') || header('X-Real-IP')
    const fromXff = (xff || '').split(',')[0]?.trim() || ''
    const ip = cfIp || fromXff || trueClient || xReal || ''
    const info: string = getConnInfo(c).remote.address || '';
    return c.text(ip.length > 0 ? ip : info)

})
app.get('/index.html', serveStatic({manifest: manifest, path: '/index.html'}))
app.get('/check.html', serveStatic({manifest: manifest, path: '/check.html'}))

// 通配静态资源（保持原有配置）
app.use("*", serveStatic({manifest: manifest, root: "./"}));


// 数据源获取辅助函数（参考 ip-quality.sh 的检测逻辑）
async function fetchIPInfo(ipAddress: string) {
    try {
        // 使用官方 ipinfo.io JSON（无需聚合网关）
        const response = await fetch(`https://ipinfo.io/${ipAddress}/json`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const d: any = await response.json()
            const asn: any = d.asn || d.connection || {}
            const company: any = d.company || {}
            const host = false
            return {
                countryCode: d.country || null,
                proxy: false,
                vpn: false,
                tor: false,
                relay: false,
                server: host,
                datacenter: host,
                abuser: false,
                robot: false,
                usageType: asn.type || '未知',
                companyType: company.type || '未知',
                score: null,
                risk: null
            }
        }
        return null
    } catch {
        return null
    }
}

async function fetchIPAPI(ip: string) {
    try {
        const response = await fetch(`https://api.ipapi.is/?q=${ip}`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            // 使用类型映射（严格参考 ip-quality.sh）
            const mapType = (type: string) => normalizeType(type)

            // 评分与风险解析（严格参考 ip-quality.sh）
            const scoreText: string = data.company?.abuser_score || ''
            const scoreNumStr = (scoreText.split(' ')[0] || '0').trim()
            const scoreNum = parseFloat(scoreNumStr || '0')
            const score = `${(scoreNum * 100).toFixed(2)}%`
            const riskText = (scoreText.match(/\(([^)]+)\)/)?.[1] || '').trim()
            let risk: string | null = null
            switch (riskText) {
                case 'Very Low':
                    risk = '低风险';
                    break
                case 'Low':
                    risk = '低风险';
                    break
                case 'Elevated':
                    risk = '低风险';
                    break
                case 'High':
                    risk = '高风险';
                    break
                case 'Very High':
                    risk = '高风险';
                    break
                default:
                    risk = null
            }

            return {
                countryCode: data.location?.country_code || null,
                proxy: data.is_proxy || false,
                vpn: data.is_vpn || false,
                tor: data.is_tor || false,
                relay: false,
                server: data.is_datacenter || false,
                datacenter: data.is_datacenter || false,
                abuser: data.is_abuser || false,
                robot: data.is_crawler || false,
                usageTypeRaw: data.asn?.type || '',
                companyTypeRaw: data.company?.type || '',
                usageType: mapType(data.asn?.type || ''),
                companyType: mapType(data.company?.type || ''),
                score: score,
                risk: risk
            }
        }
        return null
    } catch {
        return null
    }
}

async function fetchIP2Location(ip: string) {
    try {
        console.log('[ip2location] start', ip)
        // 使用官方 IP2Location.io API（需要可选密钥）
        const key = (typeof process !== 'undefined' ? process.env?.IP2LOCATION_KEY : undefined) || (globalThis as any)?.IP2LOCATION_KEY
        const url = key ? `https://api.ip2location.io/?key=${encodeURIComponent(key)}&ip=${encodeURIComponent(ip)}` : `https://api.ip2location.io/?ip=${encodeURIComponent(ip)}`
        const response = await fetch(url, {signal: timeoutSignal(10000)})
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat((data.fraud_score ?? data.score) || '0')

            // 风险等级判断（参考 ip-quality.sh 的 IP2Location 评分标准）
            let risk = '未知'
            if (scoreNum < 33) risk = '低风险'
            else if (scoreNum < 66) risk = '中风险'
            else risk = '高风险'

            // 使用类型映射（参考 ip-quality.sh），归一化到主类目
            const mapUsageType = (type: string) => {
                const prefix = (type || '').toUpperCase().split('/')[0]
                switch (prefix) {
                    case 'COM':
                        return 'business'
                    case 'DCH':
                        return 'hosting'
                    case 'EDU':
                        return 'education'
                    case 'GOV':
                        return 'government'
                    case 'ORG':
                        return 'business'
                    case 'MIL':
                        return 'government'
                    case 'LIB':
                        return 'education'
                    case 'CDN':
                        return 'hosting'
                    case 'ISP':
                        return 'isp'
                    case 'MOB':
                        return 'isp'
                    case 'SES':
                        return 'business'
                    case 'RSV':
                        return 'business'
                    default:
                        return normalizeType(type)
                }
            }

            // 组合代理/机器人/滥用与数据中心标记（参考 ip-quality.sh）
            const proxy0 = (data.is_proxy ?? data.proxy)
            const proxy1 = data.proxy?.is_public_proxy
            const proxy2 = data.proxy?.is_web_proxy
            const isProxy = [proxy0, proxy1, proxy2].some(v => v === true || v === 'true')

            const robot1 = data.proxy?.is_web_crawler
            const robot2 = data.proxy?.is_scanner
            const robot3 = data.proxy?.is_botnet
            const isRobot = [robot1, robot2, robot3].some(v => v === true || v === 'true')

            const isDC = (data.proxy?.is_data_center === true || data.proxy?.is_data_center === 'true') ||
                (data.datacenter === true || data.datacenter === 'true')

            console.log('[ip2location] ok', {score: scoreNum, country: data.country_code, proxy: isProxy, dc: isDC})
            return {
                countryCode: data.country_code || null,
                proxy: isProxy,
                vpn: (data.proxy?.is_vpn === true || data.proxy?.is_vpn === 'true') || (data.vpn === 'true' || data.vpn === true),
                tor: (data.proxy?.is_tor === true || data.proxy?.is_tor === 'true') || (data.tor === 'true' || data.tor === true),
                relay: false,
                server: isDC,
                datacenter: isDC,
                abuser: data.proxy?.is_spammer === true || data.proxy?.is_spammer === 'true' || false,
                robot: isRobot,
                usageTypeRaw: data.usage_type || '',
                companyTypeRaw: data.company_type || '',
                usageType: mapUsageType(data.usage_type),
                companyType: mapUsageType(data.company_type || data.usage_type),
                score: scoreNum.toFixed(2),
                risk: risk
            }
        }
        console.log('[ip2location] response not ok')
        return null
    } catch (e) {
        console.warn('[ip2location] error:', (e as any)?.message || e)
        return null
    }
}

async function fetchScamalytics(ip: string) {
    try {
        // 使用真实的SCAMALYTICS网站抓取（参考ip-quality.sh）
        const response = await fetch(`https://scamalytics.com/ip/${ip}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://scamalytics.com'
            },
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const html = await response.text()

            // 解析评分（参考ip-quality.sh的正则表达式）
            const scoreMatch = html.match(/Fraud Score: (\d+)/i)
            const scoreNum = scoreMatch ? parseInt(scoreMatch[1]) : 0

            // 风险等级判断（完全按照ip-quality.sh的标准）
            let risk = '未知'
            if (scoreNum < 25) risk = '低风险'
            else if (scoreNum < 50) risk = '中风险'
            else if (scoreNum < 75) risk = '高风险'
            else risk = '极高风险'

            // 解析各项检测结果
            const countryMatch = html.match(/<th>Country Code<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const vpnMatch = html.match(/<th>Anonymizing VPN<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const torMatch = html.match(/<th>Tor Exit Node<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const serverMatch = html.match(/<th>Server<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const publicProxyMatch = html.match(/<th>Public Proxy<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const webProxyMatch = html.match(/<th>Web Proxy<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)
            const robotMatch = html.match(/<th>Search Engine Robot<\/th>[\s\S]*?<td[^>]*>([^<]+)<\/td>/i)

            const isProxy = (publicProxyMatch?.[1]?.includes('Yes') || webProxyMatch?.[1]?.includes('Yes')) || false

            return {
                countryCode: countryMatch?.[1]?.trim() || null,
                proxy: isProxy,
                vpn: vpnMatch?.[1]?.includes('Yes') || false,
                tor: torMatch?.[1]?.includes('Yes') || false,
                relay: false,
                server: serverMatch?.[1]?.includes('Yes') || false,
                datacenter: serverMatch?.[1]?.includes('Yes') || false,
                abuser: false,
                robot: robotMatch?.[1]?.includes('Yes') || false,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toString(),
                risk: risk
            }
        }
        return null
    } catch {
        return null
    }
}

async function fetchIPRegistry(ip: string) {
    // 使用 ipregistry 官方接口（tryout 密钥）
    try {
        const response = await fetch(`https://api.ipregistry.co/${encodeURIComponent(ip)}?hostname=true&key=tryout`, {
            signal: timeoutSignal(8000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const security: any = data.security || {}
            return {
                countryCode: data.location?.country?.code || data.country_code || null,
                proxy: security.is_public_proxy === true || security.is_proxy === true,
                vpn: security.is_vpn === true,
                tor: (security.is_tor === true) || (security.is_tor_exit === true),
                relay: false,
                server: security.is_datacenter === true || security.is_cloud_provider === true,
                datacenter: security.is_datacenter === true || security.is_cloud_provider === true,
                abuser: security.is_threat === true || security.is_abuser === true,
                robot: false,
                usageTypeRaw: data.connection?.type || '',
                companyTypeRaw: data.company?.type || '',
                usageType: normalizeType(data.connection?.type || ''),
                companyType: normalizeType(data.company?.type || ''),
                score: null,
                risk: null
            }
        }
    } catch (e) {
        console.warn('api.ipregistry.co failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPQS(ip: string, envKey?: string) {
    // 使用 IPQS 官方 JSON API，需要密钥（环境变量 IPQS_KEY）
    try {
        const key = (envKey ?? process.env.IPQS_KEY ?? '').trim()
        if (!key) {
            console.warn('IPQS_KEY 未配置，跳过 IPQS 请求')
            return null
        }
        const url = `https://ipqualityscore.com/api/json/ip/${encodeURIComponent(key)}/${encodeURIComponent(ip)}?strictness=1&fast=true&allow_public_access_points=true`
        const response = await fetch(url, {signal: timeoutSignal(10000)})
        if (response.ok) {
            const d: any = await response.json()
            const scoreNum = parseFloat((d.fraud_score ?? 0).toString())
            let risk = '未知'
            if (scoreNum < 75) risk = '低风险'
            else if (scoreNum < 85) risk = '可疑IP'
            else if (scoreNum < 90) risk = '存在风险'
            else risk = '高风险'
            return {
                countryCode: d.country_code || null,
                proxy: d.proxy === true || d.active_proxy === true,
                vpn: d.vpn === true || d.active_vpn === true,
                tor: d.tor === true || d.active_tor === true,
                relay: false,
                server: d.hosting === true || d.datacenter === true,
                datacenter: d.hosting === true || d.datacenter === true,
                abuser: d.recent_abuse === true,
                robot: d.bot_status === true,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk
            }
        }
    } catch (e) {
        console.warn('ipqualityscore api failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPData(ip: string) {
    // 使用 ipwho.is 提供的安全字段作为替代
    try {
        const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const sec: any = data.security || {}
            return {
                countryCode: data.country_code || data.country_code || null,
                proxy: sec.proxy === true,
                vpn: sec.vpn === true,
                tor: sec.tor === true,
                relay: false,
                server: sec.hosting === true,
                datacenter: sec.hosting === true,
                abuser: false,
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: null,
                risk: null
            }
        }
    } catch (e) {
        console.warn('ipwho.is failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPWhois(ip: string) {
    // 按 ip-quality.sh 对齐：使用 ipwhois.io/widget 提供的字段
    try {
        const response = await fetch(`https://ipwhois.io/widget?ip=${ip}`, {
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'},
            signal: timeoutSignal(8000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const security: any = data.security || {}
            return {
                countryCode: data.country_code || null,
                proxy: security.proxy === 'true' || security.proxy === true,
                vpn: security.vpn === 'true' || security.vpn === true,
                tor: security.tor === 'true' || security.tor === true,
                relay: false,
                server: security.hosting === 'true' || security.hosting === true,
                datacenter: security.hosting === 'true' || security.hosting === true,
                abuser: false,
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: null,
                risk: null
            }
        }
    } catch (e) {
        console.warn('ipwhois.io/widget failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchDBIP(ip: string) {
    // 抓取 db-ip.com HTML，解析国家代码与风险/标识（参考 ip-quality.sh）
    try {
        const response = await fetch(`https://db-ip.com/${ip}`, {
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'},
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const html = await response.text()

            const countryMatch = html.match(/\"countryCode\"\s*:\s*\"([A-Z]{2})\"/i)
            const robotMatch = html.match(/<th[^>]*>\s*Crawler\s*<\/th>[\s\S]*?<span class=\"sr-only\">(Yes|No)<\/span>/i)
            const proxyMatch = html.match(/<th[^>]*>\s*Proxy\s*<\/th>[\s\S]*?<span class=\"sr-only\">(Yes|No)<\/span>/i)
            const abuserMatch = html.match(/<th[^>]*>\s*Abuser\s*<\/th>[\s\S]*?<span class=\"sr-only\">(Yes|No)<\/span>/i)

            const riskTextMatch = html.match(/Estimated threat level[^<]*<span[^>]*>([^<]+)<\/span>/i)
            const riskText = (riskTextMatch?.[1] || '').trim().toLowerCase()
            let score: string | null = null
            let risk: string | null = null
            if (riskText.includes('low')) {
                score = '0';
                risk = '低风险'
            } else if (riskText.includes('medium')) {
                score = '50';
                risk = '中风险'
            } else if (riskText.includes('high')) {
                score = '100';
                risk = '高风险'
            }

            return {
                countryCode: countryMatch?.[1] || null,
                proxy: (proxyMatch?.[1] === 'Yes') || false,
                vpn: false,
                tor: false,
                relay: false,
                server: false,
                datacenter: false,
                abuser: (abuserMatch?.[1] === 'Yes') || false,
                robot: (robotMatch?.[1] === 'Yes') || false,
                usageType: '未知',
                companyType: '未知',
                score: score,
                risk: risk
            }
        }
        return null
    } catch (e) {
        console.warn('db-ip.com scrape failed:', (e as any)?.message || e)
        return null
    }
}

async function fetchAbuseIPDB(ip: string, envKey?: string) {
    try {
        // 使用 AbuseIPDB 官方 JSON 接口，需要密钥（环境变量 ABUSEIPDB_KEY）
        console.log('[abuseipdb] start ip', ip)
        const key = (envKey || process.env.ABUSEIPDB_KEY || '').trim()
        if (!key) {
            console.warn('[abuseipdb] ABUSEIPDB_KEY 未配置，抛出错误以便 errors 捕获')
            throw new Error('ABUSEIPDB_KEY 未配置')
        }
        const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`
        const response = await fetch(url, {
            headers: {'Key': key, 'Accept': 'application/json'},
            signal: timeoutSignal(12000)
        })
        console.log('[abuseipdb] http status', response.status)
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat((data.data?.abuseConfidenceScore ?? 0).toString())
            let risk = '未知'
            if (scoreNum < 25) risk = '低风险'
            else if (scoreNum < 75) risk = '高风险'
            else risk = '建议封禁'
            return {
                countryCode: data.data?.countryCode || null,
                proxy: false,
                vpn: false,
                tor: false,
                relay: false,
                server: false,
                datacenter: false,
                abuser: (scoreNum > 0) || (data.data?.totalReports > 0),
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk
            }
        }
        throw new Error('HTTP ' + response.status)
    } catch (e) {
        console.warn('[abuseipdb] api error:', (e as any)?.message || e)
        throw e
    }
}

async function fetchCloudflare(ip: string) {
    try {
        // 使用 ipwhois.io 的安全字段，计算一个简单分数作为替代
        const response = await fetch(`https://ipwhois.io/widget?ip=${encodeURIComponent(ip)}`, {
            headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'},
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const s: any = data.security || {}
            const flags = [s.proxy, s.vpn, s.tor, s.hosting].filter(Boolean).length
            const scoreNum = Math.min(100, flags * 25)
            let risk = '未知'
            if (scoreNum < 25) risk = '低风险'
            else if (scoreNum < 50) risk = '中风险'
            else risk = '高风险'
            return {
                countryCode: data.country_code || null,
                proxy: s.proxy === true || s.proxy === 'true',
                vpn: s.vpn === true || s.vpn === 'true',
                tor: s.tor === true || s.tor === 'true',
                relay: false,
                server: s.hosting === true || s.hosting === 'true',
                datacenter: s.hosting === true || s.hosting === 'true',
                abuser: false,
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk
            }
        }
        return null
    } catch (e) {
        console.warn('cloudflare replacement error:', (e as any)?.message || e)
        return null
    }
}


export default app
