import {Hono, Next} from 'hono'
import {serveStatic} from 'hono/cloudflare-workers' // @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'

const app = new Hono()

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
            result = { ASN: '未知', as_info: '未知', as_domain: '未知' }
        }
        return c.json(result)
    } catch (error) {
        // 始终返回 200，避免前端 500
        return c.json({ ASN: '未知', as_info: '未知', as_domain: '未知' })
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

// IP质量检测API - 返回各个数据源的完整风险因子信息
app.post('/api/ip-quality', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        // 并行获取所有数据源的信息（参考 ip-quality.sh 的多数据源检测逻辑）
        const [ipinfo, ipapi, ip2location, scamalytics, ipregistry, ipqs, ipdata, ipwhois, dbip, abuseipdb, cloudflare] = await Promise.allSettled([
            fetchIPInfo(ip),
            fetchIPAPI(ip),
            fetchIP2Location(ip),
            fetchScamalytics(ip),
            fetchIPRegistry(ip),
            fetchIPQS(ip),
            fetchIPData(ip),
            fetchIPWhois(ip),
            fetchDBIP(ip),
            fetchAbuseIPDB(ip),
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
        return c.json({ error: '检测失败', details: error?.message || '未知错误' }, 500)
    }
})

// 数据源获取辅助函数（参考 ip-quality.sh 的检测逻辑）
async function fetchIPInfo(ipAddress: string) {
    try {
        // 使用 ipinfo.check.place 代理以统一字段（参考 ip-quality.sh）
        const response = await fetch(`https://ipinfo.check.place/${ipAddress}?db=ipinfo`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const d: any = await response.json()
            const privacy: any = d.privacy || {}
            const asn: any = d.asn || d.connection || {}
            const company: any = d.company || {}
            const host = (privacy.hosting === 'true' || privacy.hosting === true) || (d.hosting === 'true' || d.hosting === true)
            return {
                countryCode: d.country_code || d.country || null,
                proxy: (privacy.proxy === 'true' || privacy.proxy === true) || (d.proxy === 'true' || d.proxy === true) || false,
                vpn: (privacy.vpn === 'true' || privacy.vpn === true) || (d.vpn === 'true' || d.vpn === true) || false,
                tor: (privacy.tor === 'true' || privacy.tor === true) || (d.tor === 'true' || d.tor === true) || false,
                relay: (privacy.relay === 'true' || privacy.relay === true) || false,
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
            const mapType = (type: string) => {
                const t = (type || '').toLowerCase()
                switch (t) {
                    case 'business': return 'business'
                    case 'isp': return 'isp'
                    case 'hosting': return 'hosting'
                    case 'education': return 'education'
                    case 'government': return 'government'
                    case 'banking': return 'banking'
                    default: return 'other'
                }
            }

            // 评分与风险解析（严格参考 ip-quality.sh）
            const scoreText: string = data.company?.abuser_score || ''
            const scoreNumStr = (scoreText.split(' ')[0] || '0').trim()
            const scoreNum = parseFloat(scoreNumStr || '0')
            const score = `${(scoreNum * 100).toFixed(2)}%`
            const riskText = (scoreText.match(/\(([^)]+)\)/)?.[1] || '').trim()
            let risk: string | null = null
            switch (riskText) {
                case 'Very Low': risk = '极低风险'; break
                case 'Low': risk = '低风险'; break
                case 'Elevated': risk = '较高风险'; break
                case 'High': risk = '高风险'; break
                case 'Very High': risk = '极高风险'; break
                default: risk = null
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
        // 使用 ipinfo.check.place 代理（参考 ip-quality.sh）
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=ip2location`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat((data.fraud_score ?? data.score) || '0')
            
            // 风险等级判断（参考 ip-quality.sh 的 IP2Location 评分标准）
            let risk = '未知'
            if (scoreNum < 33) risk = '低风险'
            else if (scoreNum < 66) risk = '中风险'
            else risk = '高风险'
            
            // 使用类型映射（参考 ip-quality.sh）
            const mapUsageType = (type: string) => {
                const prefix = (type || '').toUpperCase().split('/')[0]
                switch(prefix) {
                    case 'COM': return 'business'
                    case 'DCH': return 'hosting'
                    case 'EDU': return 'education'
                    case 'GOV': return 'government'
                    case 'ORG': return 'organization'
                    case 'MIL': return 'military'
                    case 'LIB': return 'library'
                    case 'CDN': return 'cdn'
                    case 'ISP': return 'isp'
                    case 'MOB': return 'mobile'
                    case 'SES': return 'spider'
                    case 'RSV': return 'reserved'
                    default: return 'other'
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

            console.log('[ip2location] ok', { score: scoreNum, country: data.country_code, proxy: isProxy, dc: isDC })
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

// 独立的 IP2Location 检测端点，便于前端或调试直接调用
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
    return c.json({ ip })
})

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
    // 优先代理；失败时回退到 ipregistry tryout
    try {
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=ipregistry`, {
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
                usageType: (data.connection?.type || '未知'),
                companyType: (data.company?.type || '未知'),
                score: null,
                risk: null
            }
        }
    } catch (e) {
        console.warn('ipinfo.check.place ipregistry failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPQS(ip: string) {
    // 优先代理；失败时回退到 ipwho.is 提供的安全字段作为兜底
    try {
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=ipqualityscore`, {
            signal: timeoutSignal(8000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat(data.fraud_score || '0')
            let risk = '未知'
            if (scoreNum < 75) risk = '低风险'
            else if (scoreNum < 85) risk = '可疑IP'
            else if (scoreNum < 90) risk = '存在风险'
            else risk = '高风险'
            return {
                countryCode: data.country_code || null,
                proxy: data.proxy === 'true' || data.proxy === true,
                vpn: data.vpn === 'true' || data.vpn === true,
                tor: data.tor === 'true' || data.tor === true,
                relay: false,
                server: false,
                datacenter: false,
                abuser: data.recent_abuse === 'true' || data.recent_abuse === true,
                robot: data.bot_status === 'true' || data.bot_status === true,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk: risk
            }
        }
    } catch (e) {
        console.warn('ipinfo.check.place ipqualityscore failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPData(ip: string) {
    // 仅解析代理数据源 ipdata，移除所有外部回退
    try {
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=ipdata`, {
            signal: timeoutSignal(8000)
        })
        if (response.ok) {
            const data: any = await response.json()
            return {
                countryCode: data.country_code || null,
                proxy: data.threat?.is_proxy === 'true' || data.threat?.is_proxy === true,
                vpn: false,
                tor: data.threat?.is_tor === 'true' || data.threat?.is_tor === true,
                relay: false,
                server: data.threat?.is_datacenter === 'true' || data.threat?.is_datacenter === true,
                datacenter: data.threat?.is_datacenter === 'true' || data.threat?.is_datacenter === true,
                abuser: data.threat?.is_threat === 'true' || data.threat?.is_threat === true || 
                        data.threat?.is_known_abuser === 'true' || data.threat?.is_known_abuser === true ||
                        data.threat?.is_known_attacker === 'true' || data.threat?.is_known_attacker === true,
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: null,
                risk: null
            }
        }
    } catch (e) {
        console.warn('ipinfo.check.place ipdata failed:', (e as any)?.message || e)
    }
    return null
}

async function fetchIPWhois(ip: string) {
    // 按 ip-quality.sh 对齐：使用 ipwhois.io/widget 提供的字段
    try {
        const response = await fetch(`https://ipwhois.io/widget?ip=${ip}`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
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
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
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
            if (riskText.includes('low')) { score = '0'; risk = '低风险' }
            else if (riskText.includes('medium')) { score = '50'; risk = '中风险' }
            else if (riskText.includes('high')) { score = '100'; risk = '高风险' }

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

// 媒体服务检测API
// 已移除媒体检测端点及辅助函数

async function fetchAbuseIPDB(ip: string) {
    try {
        // 使用 ipinfo.check.place 代理（参考 ip-quality.sh）
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=abuseipdb`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat((data.data?.abuseConfidenceScore ?? data.abuseConfidencePercentage) || '0')
            
            // 风险等级判断（参考 ip-quality.sh 的 AbuseIPDB 评分标准）
            let risk = '未知'
            if (scoreNum < 25) risk = '低风险'
            else if (scoreNum < 75) risk = '高风险'
            else risk = '建议封禁'
            
            // 使用类型映射（参考 ip-quality.sh）
            const mapUsageType = (type: string) => {
                switch(type) {
                    case 'Commercial': return 'business'
                    case 'Data Center/Web Hosting/Transit': return 'hosting'
                    case 'University/College/School': return 'education'
                    case 'Government': return 'government'
                    case 'banking': return 'banking'
                    case 'Organization': return 'organization'
                    case 'Military': return 'military'
                    case 'Library': return 'library'
                    case 'Content Delivery Network': return 'cdn'
                    case 'Fixed Line ISP': return 'isp'
                    case 'Mobile ISP': return 'mobile'
                    case 'Search Engine Spider': return 'spider'
                    case 'Reserved': return 'reserved'
                    default: return 'other'
                }
            }
            const usageResolved = mapUsageType((data.data?.usageType ?? data.usageType) || '')
            
            return {
                countryCode: data.countryCode || null,
                proxy: false,
                vpn: false,
                tor: false,
                relay: false,
                server: false,
                datacenter: false,
                abuser: scoreNum > 0,
                robot: false,
                usageType: usageResolved,
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk: risk
            }
        }
        return null
    } catch (e) {
        console.warn('abuseipdb error:', (e as any)?.message || e)
        return null
    }
}

async function fetchCloudflare(ip: string) {
    try {
        // 使用 ipinfo.check.place 代理（参考 ip-quality.sh）
        const response = await fetch(`https://ipinfo.check.place/${ip}?db=cloudflare`, {
            signal: timeoutSignal(10000)
        })
        if (response.ok) {
            const data: any = await response.json()
            const scoreNum = parseFloat(data.score || '0')
            
            // 风险等级判断
            let risk = '未知'
            if (scoreNum < 25) risk = '低风险'
            else if (scoreNum < 50) risk = '中风险'
            else risk = '高风险'
            
            return {
                countryCode: data.country_code || null,
                proxy: data.proxy === 'true' || data.proxy === true,
                vpn: data.vpn === 'true' || data.vpn === true,
                tor: data.tor === 'true' || data.tor === true,
                relay: false,
                server: data.hosting === 'true' || data.hosting === true,
                datacenter: data.hosting === 'true' || data.hosting === true,
                abuser: false,
                robot: false,
                usageType: '未知',
                companyType: '未知',
                score: scoreNum.toFixed(2),
                risk: risk
            }
        }
        return null
    } catch (e) {
        console.warn('cloudflare error:', (e as any)?.message || e)
        return null
    }
}


// 静态资源路由（显式绑定首页）
app.get('/', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/index.html', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/check.html', serveStatic({ manifest: manifest, path: '/check.html' }))

// 通配静态资源（保持原有配置）
app.use("*", serveStatic({manifest: manifest, root: "./"}));

export default app
