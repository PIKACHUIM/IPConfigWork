import { Hono, Next } from 'hono'
import { INDEX_HTML, CHECK_HTML, SPEED_HTML } from './pages'

// 生成一个完整的 Hono 应用实例，供 Cloudflare Workers（src/index.ts）
// 与 EdgeOne Pages（node-functions/[[index]].ts）复用。
// 页面（INDEX_HTML / CHECK_HTML）以内联方式提供，访问时无需 .html 后缀。
export function createApp(): Hono<{ Bindings: { ABUSEIPDB_KEY?: string, IPQS_KEY?: string } }> {
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
        const hostingSynonyms = ['hosting', 'host', 'datacenter', 'data center', 'dc', 'cloud', 'cloud_provider', 'cloud provider', 'cdn', 'colo', 'server']
        if (hostingSynonyms.some(k => t.includes(k))) return 'hosting'

        const ispSynonyms = ['isp', 'residential', 'consumer', 'home', 'carrier', 'cellular', 'mobile', 'broadband', 'telecom', 'internet service']
        if (ispSynonyms.some(k => t.includes(k))) return 'isp'

        const eduSynonyms = ['education', 'university', 'college', 'school', 'library']
        if (eduSynonyms.some(k => t.includes(k))) return 'education'

        const govSynonyms = ['government', 'gov', 'military', 'public sector']
        if (govSynonyms.some(k => t.includes(k))) return 'government'

        const bizSynonyms = ['business', 'enterprise', 'company', 'commercial', 'organization', 'org', 'corporate', 'vendor', 'provider', 'nonprofit', 'finance', 'financial', 'banking']
        if (bizSynonyms.some(k => t.includes(k))) return 'business'

        return '未知'
    }

    // 从请求头推断真实客户端 IP（优先 Cloudflare / EdgeOne 提供的头部）
    function extractClientIP(c: any): string {
        const header = (name: string) => c.req.header(name) || c.req.raw.headers.get(name) || ''
        const cfIp = header('cf-connecting-ip') || header('CF-Connecting-IP')
        const xff = header('x-forwarded-for') || header('X-Forwarded-For')
        const trueClient = header('true-client-ip') || header('True-Client-IP')
        const xReal = header('x-real-ip') || header('X-Real-IP')
        const fromXff = (xff || '').split(',')[0]?.trim() || ''
        return cfIp || fromXff || trueClient || xReal || ''
    }

    // 跨域处理
    app.use('*', async (c: any, next: Next): Promise<any> => {
        c.header('Access-Control-Allow-Origin', '*')
        c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        c.header('Access-Control-Allow-Credentials', 'true')
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

            let result: { ASN: string; as_info: string; as_domain: string } | null = null
            // 主数据源：ipinfo.io（无需 key，稳定，含 org/asn 字段）
            try {
                const response = await fetch(`https://ipinfo.io/${encodeURIComponent(ip)}/json`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                        'Accept': 'application/json'
                    },
                    signal: timeoutSignal(6000)
                })
                if (response.ok) {
                    const data: any = await response.json()
                    if (data && !data.error) {
                        const org = data.org || ''
                        // org 形如 "AS13335 Cloudflare, Inc."
                        const asRaw = data.asn ? `AS${data.asn}` : org
                        result = {
                            ASN: (asRaw || '').split(' ')[0] || '未知',
                            as_info: org.replace(/^AS\d+\s+/, '') || '未知',
                            as_domain: org || '未知'
                        }
                    }
                }
            } catch (_) {
                // ignore and fallback
            }

            if (!result) {
                try {
                    const response = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,as,isp,org`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        },
                        signal: timeoutSignal(6000)
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
            }

            if (!result) {
                try {
                    const resp2 = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
                        headers: {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                        },
                        signal: timeoutSignal(6000)
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

            if (!result) {
                try {
                    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,as,isp,org,country,countryCode,regionName,city,zip,lat,lon,timezone,proxy,hosting`, {
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
                result = {
                    source: 'fallback',
                    ip: params.get('ip') || '',
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
                source: 'error'
            }, 500)
        }
    })

    // IP信息查询API（GET，自动获取真实客户端IP并查询 ipinfo.io widget demo）
    app.get('/api/ip-info', async (c) => {
        try {
            const ip = extractClientIP(c)

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
                    privacy: { vpn: false, proxy: false, tor: false, relay: false, hosting: false, service: '' },
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

            const abuseKeyPresent = Boolean(c.env?.ABUSEIPDB_KEY || process.env.ABUSEIPDB_KEY)
            console.log('[ip-quality] 调用 fetchAbuseIPDB: ip', ip, '密钥存在:', abuseKeyPresent)

            // 共享 ip-api.com 查询结果，避免多个源并发请求触发限流
            const ipApiShared = await fetchIPApiShared(ip)

            const [ipinfo, ipapi, ip2location, scamalytics, ipregistry, ipqs, ipdata, ipwhois, dbip, abuseipdb, cloudflare] = await Promise.allSettled([
                fetchIPInfo(ip),
                fetchIPAPI(ip, ipApiShared),
                fetchIP2Location(ip),
                fetchScamalytics(ip),
                fetchIPRegistry(ip),
                fetchIPQS(ip, c.env?.IPQS_KEY),
                fetchIPData(ip, ipApiShared),
                fetchIPWhois(ip, ipApiShared),
                fetchDBIP(ip, ipApiShared),
                fetchAbuseIPDB(ip, c.env?.ABUSEIPDB_KEY),
                fetchCloudflare(ip, ipApiShared)
            ])

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

    // 客户端访问IP查询
    app.get('/api/client-ip', (c) => {
        return c.json({ ip: extractClientIP(c) })
    })

    // ---- 网速测试 ----
    // 校验测速目标 URL 的合法性，防止被当作开放代理滥用（SSRF）
    function validateSpeedUrl(raw: string): URL | string {
        if (!raw) return '缺少 url 参数'
        let parsed: URL
        try {
            parsed = new URL(raw)
        } catch {
            return '无效的 url'
        }
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return '仅支持 http/https'
        }
        const host = parsed.hostname.toLowerCase()
        const isPrivate =
            host === 'localhost' ||
            host === '0.0.0.0' ||
            /^127\./.test(host) ||
            /^10\./.test(host) ||
            /^192\.168\./.test(host) ||
            /^172\.(1[6-9]|2\d|3[01])\./.test(host) ||
            /^169\.254\./.test(host) ||
            host === '::1' ||
            host === '::'
        if (isPrivate) {
            return '禁止访问内网地址'
        }
        return parsed
    }

    // 下载代理：由 Worker 拉取测速文件并流式回传，绕过浏览器 CORS 限制
    app.get('/api/download', async (c) => {
        const url = validateSpeedUrl(c.req.query('url') || '')
        if (typeof url === 'string') return c.text(url, 400)

        const headers: Record<string, string> = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': '*/*'
        }
        const range = c.req.header('Range')
        if (range) headers['Range'] = range

        try {
            const resp = await fetch(url.toString(), { headers, redirect: 'follow' })
            const outHeaders = new Headers()
            outHeaders.set('Access-Control-Allow-Origin', '*')
            outHeaders.set('Access-Control-Expose-Headers', 'Content-Length, Content-Range, Content-Type')
            const ct = resp.headers.get('Content-Type')
            if (ct) outHeaders.set('Content-Type', ct)
            const cr = resp.headers.get('Content-Range')
            if (cr) outHeaders.set('Content-Range', cr)
            return new Response(resp.body, { status: resp.status, headers: outHeaders })
        } catch (e: any) {
            return c.text('下载失败: ' + (e?.message || String(e)), 502)
        }
    })

    // 上传测速：接收客户端上传的数据流并统计字节数
    app.post('/api/upload', async (c) => {
        try {
            const reader = c.req.raw.body?.getReader()
            let total = 0
            if (reader) {
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    total += value?.byteLength || 0
                }
            }
            return c.json({ received: total })
        } catch (e: any) {
            return c.json({ error: '上传失败', details: e?.message || String(e) }, 500)
        }
    })

    // 延迟探测：向节点发起最小范围请求（Range: bytes=0-0），
    // 客户端对整个往返计时，据此计算平均延迟与抖动（标准差）。
    app.get('/api/ping', async (c) => {
        const url = validateSpeedUrl(c.req.query('url') || '')
        if (typeof url === 'string') return c.json({ status: 0, ok: false, error: url })

        try {
            const resp = await fetch(url.toString(), {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Range': 'bytes=0-0'
                },
                redirect: 'follow',
                signal: timeoutSignal(10000)
            })
            // 不读取 body，仅返回状态，计时由客户端完成
            return c.json({ status: resp.status, ok: resp.ok })
        } catch (e: any) {
            return c.json({ status: 0, ok: false, error: e?.message || String(e) })
        }
    })

    // api.ipapi.is 代理查询：前端直连失败时，改由 Worker 出口 IP 查询，
    // 可绕过浏览器 CORS 限制、额度按出口 IP 计费或网络不通等问题。
    // 当 ipapi.is 本身也失败时，自动聚合 ip-api.com + ipwho.is 作为兜底，返回完整结构供前端复用解析
    app.post('/api/ipapi', async (c) => {
        try {
            const body = await c.req.text()
            const params = new URLSearchParams(body)
            const ip = params.get('ip') || c.req.query('ip')
            if (!ip) {
                return c.text('IP地址参数缺失', 400)
            }
            // 并行请求：主源 api.ipapi.is + 兜底 ip-api.com/ipwho.is，二者合并返回完整字段
            const [raw, fallback] = await Promise.all([
                fetchIPAPIRaw(ip),
                fetchIPAPIFallback(ip)
            ])
            if (raw && fallback) {
                return c.json(mergeIPAPIResults(raw, fallback))
            }
            if (raw) {
                return c.json(raw)
            }
            if (fallback) {
                return c.json(fallback)
            }
            return c.json({ error: 'unavailable', error_code: 'ERR_NO_DATA' })
        } catch (error: any) {
            return c.json({ error: 'proxy_failed', error_code: 'ERR_PROXY', details: error?.message || '未知错误' }, 500)
        }
    })

    // 首页：浏览器访问返回页面，非浏览器（curl 等）返回纯文本 IP
    app.get('/', (c) => {
        const userAgent = c.req.header('User-Agent') || ''
        const browserRegex = /(Chrome|Firefox|Safari|Edge|Opera|Mozilla)/i
        const excludeRegex = /(bot|crawler|api-client|curl|wget)/i
        if (browserRegex.test(userAgent) && !excludeRegex.test(userAgent)) {
            return c.html(INDEX_HTML)
        }
        const ip = extractClientIP(c)
        return c.text(ip)
    })

    // 质量检测页
    app.get('/check', (c) => {
        return c.html(CHECK_HTML)
    })

    // 兼容旧地址：无跳转，直接返回对应页面
    app.get('/index.html', (c) => c.html(INDEX_HTML))
    app.get('/check.html', (c) => c.html(CHECK_HTML))

    // 网速测试页
    app.get('/speed', (c) => c.html(SPEED_HTML))
    app.get('/speed.html', (c) => c.html(SPEED_HTML))

    // 数据源获取辅助函数（参考 ip-quality.sh 的检测逻辑）
    async function fetchIPInfo(ipAddress: string) {
        // 主源：ipinfo widget demo（含 privacy 隐私标志），失败回退公开 /json 接口
        try {
            const response = await fetch(`https://ipinfo.io/widget/demo/${encodeURIComponent(ipAddress)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(10000)
            })
            if (response.ok) {
                const raw: any = await response.json()
                const d: any = raw?.data || raw || {}
                const asn: any = d.asn || {}
                const company: any = d.company || {}
                const privacy: any = d.privacy || {}
                const hosting = privacy.hosting === true || d.is_hosting === true
                
                let usageType = normalizeType(asn.type || '')
                let companyType = normalizeType(company.type || '')
                
                // 如果 type 字段为空，通过 org/company name 推断
                if (usageType === '未知' && d.org) {
                    usageType = normalizeType(d.org)
                }
                if (companyType === '未知' && company.name) {
                    companyType = normalizeType(company.name)
                }
                
                return {
                    countryCode: d.country || null,
                    proxy: privacy.proxy === true,
                    vpn: privacy.vpn === true,
                    tor: privacy.tor === true,
                    relay: privacy.relay === true,
                    server: hosting,
                    datacenter: hosting,
                    abuser: false,
                    robot: false,
                    usageType: usageType,
                    companyType: companyType,
                    usageTypeRaw: asn.type || d.org || '',
                    companyTypeRaw: company.type || company.name || '',
                    score: null,
                    risk: null
                }
            }
        } catch { /* 回退公开接口 */ }

        // 备用：ipinfo.io/{ip}/json 公开接口（通过 org 字段推断类型）
        try {
            const response = await fetch(`https://ipinfo.io/${encodeURIComponent(ipAddress)}/json`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(10000)
            })
            if (response.ok) {
                const d: any = await response.json()
                if (d && !d.error) {
                    const org = d.org || ''
                    const type = normalizeType(org)
                    return {
                        countryCode: d.country || null,
                        proxy: false,
                        vpn: false,
                        tor: false,
                        relay: false,
                        server: type === 'hosting',
                        datacenter: type === 'hosting',
                        abuser: false,
                        robot: false,
                        usageType: type,
                        companyType: type,
                        usageTypeRaw: org,
                        companyTypeRaw: org,
                        score: null,
                        risk: null
                    }
                }
            }
            return null
        } catch {
            return null
        }
    }

    async function fetchIPAPI(ip: string, ipApiShared?: any) {
        // 主源：api.ipapi.is（免费额度耗尽或失败时回退 ip-api.com）
        try {
            const response = await fetch(`https://api.ipapi.is/?q=${encodeURIComponent(ip)}`, {
                signal: timeoutSignal(10000)
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && !data.error && !data.error_code) {
                    const mapType = (type: string) => normalizeType(type)

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

                    let usageType = mapType(data.asn?.type || '')
                    let companyType = mapType(data.company?.type || '')
                    
                    // 如果 type 为空，通过公司名称推断
                    if (usageType === '未知' && data.asn?.org) {
                        usageType = mapType(data.asn.org)
                    }
                    if (companyType === '未知' && data.company?.name) {
                        companyType = mapType(data.company.name)
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
                        usageTypeRaw: data.asn?.type || data.asn?.org || '',
                        companyTypeRaw: data.company?.type || data.company?.name || '',
                        usageType: usageType,
                        companyType: companyType,
                        score: score,
                        risk: risk
                    }
                }
            }
        } catch { /* 回退备用渠道 */ }

        // 备用渠道：复用共享的 ip-api.com 结果（避免重复请求触发限流）
        const data = ipApiShared || await fetchIPApiShared(ip)
        if (data) {
            const hosting = data.hosting === true
            const proxy = data.proxy === true
            const mobile = data.mobile === true
            
            // 通过 ISP/ORG 名称智能推断类型
            const orgText = (data.org || data.isp || '').toLowerCase()
            let inferredType = '未知'
            if (hosting) {
                inferredType = 'hosting'
            } else if (mobile) {
                inferredType = 'isp'
            } else if (orgText) {
                inferredType = normalizeType(orgText)
            }
            
            const usageType = inferredType
            const companyType = inferredType
            const score = hosting || proxy ? '50.00%' : '0.00%'
            const risk = hosting || proxy ? '中风险' : '低风险'
            return {
                countryCode: data.countryCode || null,
                proxy: proxy,
                vpn: false,
                tor: false,
                relay: false,
                server: hosting,
                datacenter: hosting,
                abuser: false,
                robot: false,
                usageTypeRaw: data.org || data.isp || '',
                companyTypeRaw: data.org || data.isp || '',
                usageType: usageType,
                companyType: companyType,
                score: score,
                risk: risk
            }
        }
        return null
    }

    // 透传 api.ipapi.is 的完整原始 JSON（不做精简），供前端 getIpapi 复用同一套解析逻辑。
    // 仅当主源返回正常数据时才返回对象，否则返回 null 由调用方处理。
    async function fetchIPAPIRaw(ip: string) {
        try {
            const response = await fetch(`https://api.ipapi.is/?q=${encodeURIComponent(ip)}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Accept': 'application/json'
                },
                signal: timeoutSignal(10000)
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && !data.error && !data.error_code) {
                    return data
                }
            }
        } catch {
            // ignore, fallback to null
        }
        return null
    }

    // 共享的 ip-api.com 查询结果（多源复用，避免并发请求触发 ip-api.com 限流）。
    // 返回原始 JSON；成功返回对象，失败返回 null。
    async function fetchIPApiShared(ip: string) {
        try {
            const response = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(8000)
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && data.status === 'success') return data
            }
        } catch { /* ignore */ }
        return null
    }

    // 兜底数据源：聚合 ip-api.com + ipwho.is + ip2c.org，构造出与 ipapi.is 完整字段一致的结构，
    // 供前端 fillIpapiDetail 复用同一套渲染逻辑（风险标志 + 数据中心 + ASN + 地理位置）。
    async function fetchIPAPIFallback(ip: string) {
        let ipapi: any = null
        let whois: any = null
        let cc: string = ''   // ip2c.org 免费国家代码兜底

        // ip-api.com：风险标志（proxy/hosting/mobile）+ 完整地理 + ASN/ISP/ORG
        try {
            const resp = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,asname,reverse,mobile,proxy,hosting,query`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(8000)
            })
            if (resp.ok) {
                const d: any = await resp.json()
                if (d && d.status === 'success') ipapi = d
            }
        } catch { /* ignore */ }

        // ipwho.is：补充 connection（asn/org/domain/isp）、continent、calling_code、is_eu、timezone
        try {
            const resp = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(8000)
            })
            if (resp.ok) {
                const d: any = await resp.json()
                if (d && d.success) whois = d
            }
        } catch { /* ignore */ }

        // ip2c.org：纯文本国家代码（免费无 key，1;US;USA;United States），作为国家字段最终兜底
        try {
            const resp = await fetch(`https://ip2c.org/${encodeURIComponent(ip)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(6000)
            })
            if (resp.ok) {
                const txt = (await resp.text()).trim()
                const parts = txt.split(';')
                if (parts[0] === '1' && parts[1] && parts[1] !== 'ZZ') cc = parts[1]
            }
        } catch { /* ignore */ }

        if (!ipapi && !whois && !cc) return null

        const ipa: any = ipapi || {}
        const wh: any = whois || {}
        const conn: any = wh.connection || {}
        const tz: any = wh.timezone || {}

        const hosting = ipa.hosting === true
        const proxy = ipa.proxy === true
        const mobile = ipa.mobile === true
        const org = ipa.org || conn.org || ''
        const isp = ipa.isp || conn.isp || ''
        const asnNum = conn.asn != null
            ? conn.asn
            : (ipa.as ? parseInt(String(ipa.as).replace(/[^\d]/g, '') || '0', 10) || '' : '')

        return {
            is_bogon: false,
            is_mobile: mobile,
            is_satellite: false,
            is_crawler: false,
            is_datacenter: hosting,
            is_tor: false,
            is_proxy: proxy,
            is_vpn: false,
            is_abuser: false,
            company_name: org || isp,
            asn_num: asnNum,
            asn_org: org || isp,
            cc: ipa.countryCode || wh.country_code || cc,
            lat: ipa.lat != null ? ipa.lat : wh.latitude,
            lon: ipa.lon != null ? ipa.lon : wh.longitude,
            datacenter: {
                datacenter: '',
                domain: conn.domain || '',
                network: ''
            },
            company: {
                abuser_score: '',
                type: hosting ? 'hosting' : mobile ? 'isp' : '',
                whois: '',
                name: org || isp,
                domain: conn.domain || ''
            },
            abuse: { name: '', address: '', email: '', phone: '' },
            asn: {
                asn: asnNum,
                abuser_score: '',
                route: '',
                descr: org || isp,
                country: ipa.countryCode || wh.country_code || cc,
                active: null,
                org: org || isp,
                domain: conn.domain || '',
                abuse: '',
                type: hosting ? 'hosting' : mobile ? 'isp' : '',
                updated: '',
                rir: '',
                whois: ''
            },
            location: {
                is_eu_member: wh.is_eu != null ? wh.is_eu : null,
                calling_code: wh.calling_code || '',
                currency_code: '',
                continent: wh.continent || '',
                country: ipa.country || wh.country || '',
                country_code: ipa.countryCode || wh.country_code || cc,
                state: ipa.regionName || wh.region || '',
                city: ipa.city || wh.city || '',
                latitude: ipa.lat != null ? ipa.lat : wh.latitude,
                longitude: ipa.lon != null ? ipa.lon : wh.longitude,
                zip: ipa.zip || wh.postal || '',
                timezone: ipa.timezone || (tz && tz.id) || '',
                local_time: (tz && tz.current_time) || '',
                is_dst: tz && tz.is_dst != null ? tz.is_dst : null
            },
            rir: ''
        }
    }

    // 合并 api.ipapi.is 原始结果与 fallback 完整结构：
    //   - 扁平字段（company_name/asn_num/asn_org/cc/lat/lon）raw 优先
    //   - 嵌套对象（datacenter/company/abuse/asn/location）fallback 提供骨架，raw 子字段覆盖
    //   - is_* 风险标志：raw 与 fallback 取 OR（任一判定为真即真）
    function mergeIPAPIResults(raw: any, fallback: any) {
        const out: any = { ...fallback }
        const truthyFlags = ['is_bogon', 'is_mobile', 'is_satellite', 'is_crawler', 'is_datacenter', 'is_tor', 'is_proxy', 'is_vpn', 'is_abuser']

        // 扁平字段：raw 优先
        for (const k of Object.keys(raw || {})) {
            const v = raw[k]
            if (v !== undefined && v !== null && v !== '' && !truthyFlags.includes(k) && !['datacenter', 'company', 'abuse', 'asn', 'location'].includes(k)) {
                out[k] = v
            }
        }

        // 嵌套对象：fallback 骨架 + raw 子字段覆盖
        for (const key of ['datacenter', 'company', 'abuse', 'asn', 'location']) {
            const rv = raw && raw[key]
            if (rv && typeof rv === 'object') {
                const base = (fallback && typeof fallback[key] === 'object' && fallback[key]) || {}
                out[key] = { ...base }
                for (const sk of Object.keys(rv)) {
                    const sv = rv[sk]
                    if (sv !== undefined && sv !== null && sv !== '') out[key][sk] = sv
                }
            }
        }

        // 风险标志：OR
        for (const key of truthyFlags) {
            out[key] = (raw && raw[key] === true) || (fallback && fallback[key] === true)
        }

        // raw 的扁平字段同步到嵌套结构（避免 fallback 的嵌套值覆盖更准确的 raw 扁平值）
        if (raw && raw.company_name && !out.company?.name) out.company.name = raw.company_name
        if (raw && raw.asn_org && !out.asn?.org) out.asn.org = raw.asn_org
        if (raw && raw.asn_num != null && !out.asn?.asn) out.asn.asn = raw.asn_num

        return out
    }

    async function fetchIP2Location(ip: string) {
        try {
            console.log('[ip2location] start', ip)
            const key = (typeof process !== 'undefined' ? process.env?.IP2LOCATION_KEY : undefined) || (globalThis as any)?.IP2LOCATION_KEY
            const url = key ? `https://api.ip2location.io/?key=${encodeURIComponent(key)}&ip=${encodeURIComponent(ip)}` : `https://api.ip2location.io/?ip=${encodeURIComponent(ip)}`
            const response = await fetch(url, { signal: timeoutSignal(10000) })
            if (response.ok) {
                const data: any = await response.json()
                const scoreNum = parseFloat((data.fraud_score ?? data.score) || '0')

                let risk = '未知'
                if (scoreNum < 33) risk = '低风险'
                else if (scoreNum < 66) risk = '中风险'
                else risk = '高风险'

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
            const response = await fetch(`https://scamalytics.com/ip/${ip}`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://scamalytics.com'
                },
                signal: timeoutSignal(10000)
            })
            if (response.ok) {
                const html = await response.text()

                const scoreMatch = html.match(/Fraud Score: (\d+)/i)
                const scoreNum = scoreMatch ? parseInt(scoreMatch[1]) : 0

                let risk = '未知'
                if (scoreNum < 25) risk = '低风险'
                else if (scoreNum < 50) risk = '中风险'
                else if (scoreNum < 75) risk = '高风险'
                else risk = '极高风险'

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
        const key = (envKey ?? process.env.IPQS_KEY ?? '').trim()
        if (!key) {
            console.warn('IPQS_KEY 未配置，跳过 IPQS 请求')
            throw new Error('IPQS_KEY 未配置')
        }
        try {
            const url = `https://ipqualityscore.com/api/json/ip/${encodeURIComponent(key)}/${encodeURIComponent(ip)}?strictness=1&fast=true&allow_public_access_points=true`
            const response = await fetch(url, { signal: timeoutSignal(10000) })
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

    async function fetchIPData(ip: string, ipApiShared?: any) {
        // 主源 ipwho.is（免费版无 security 字段），失败回退共享的 ip-api.com 结果
        try {
            const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(8000)
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && data.success) {
                    const sec: any = data.security || {}
                    const conn: any = data.connection || {}
                    const ispText = (conn.isp || conn.org || '').toLowerCase()
                    const isHosting = /(host|datacenter|data.?center|cloud|cdn|server|colo)/i.test(ispText)
                    return {
                        countryCode: data.country_code || null,
                        proxy: sec.proxy === true,
                        vpn: sec.vpn === true,
                        tor: sec.tor === true,
                        relay: false,
                        server: sec.hosting === true || isHosting,
                        datacenter: sec.hosting === true || isHosting,
                        abuser: false,
                        robot: false,
                        usageType: isHosting ? 'hosting' : '未知',
                        companyType: isHosting ? 'hosting' : '未知',
                        score: null,
                        risk: null
                    }
                }
            }
        } catch (e) {
            console.warn('ipwho.is failed:', (e as any)?.message || e)
        }

        // 回退共享的 ip-api.com 结果
        const data = ipApiShared
        if (data) {
            const hosting = data.hosting === true
            return {
                countryCode: data.countryCode || null,
                proxy: data.proxy === true,
                vpn: false,
                tor: false,
                relay: false,
                server: hosting,
                datacenter: hosting,
                abuser: false,
                robot: false,
                usageType: hosting ? 'hosting' : (data.mobile ? 'isp' : '未知'),
                companyType: hosting ? 'hosting' : (data.mobile ? 'isp' : '未知'),
                score: null,
                risk: null
            }
        }
        return null
    }

    async function fetchIPWhois(ip: string, ipApiShared?: any) {
        // 原 ipwhois.io/widget 已 403 失效，改用 ipwho.is 主源 + 共享 ip-api.com 结果回退
        try {
            const response = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
                signal: timeoutSignal(8000)
            })
            if (response.ok) {
                const data: any = await response.json()
                if (data && data.success) {
                    const conn: any = data.connection || {}
                    const ispText = (conn.isp || conn.org || '').toLowerCase()
                    const isHosting = /(host|datacenter|data center|cloud|cdn|server|colo)/i.test(ispText)
                    return {
                        countryCode: data.country_code || null,
                        proxy: false,
                        vpn: false,
                        tor: false,
                        relay: false,
                        server: isHosting,
                        datacenter: isHosting,
                        abuser: false,
                        robot: false,
                        usageType: isHosting ? 'hosting' : '未知',
                        companyType: isHosting ? 'hosting' : '未知',
                        score: null,
                        risk: null
                    }
                }
            }
        } catch (e) {
            console.warn('ipwho.is failed:', (e as any)?.message || e)
        }

        // 回退共享的 ip-api.com 结果
        const data = ipApiShared
        if (data) {
            const asname = ((data.asname || data.org || data.isp || '') as string).toLowerCase()
            const isHosting = /(host|datacenter|data.?center|cloud|cdn|server|colo|vps|dedicated)/i.test(asname) || data.hosting === true
            return {
                countryCode: data.countryCode || null,
                proxy: data.proxy === true,
                vpn: false,
                tor: false,
                relay: false,
                server: isHosting,
                datacenter: isHosting,
                abuser: false,
                robot: false,
                usageType: isHosting ? 'hosting' : '未知',
                companyType: isHosting ? 'hosting' : '未知',
                score: null,
                risk: null
            }
        }
        return null
    }

    async function fetchDBIP(_ip: string, ipApiShared?: any) {
        // 原 db-ip.com HTML 抓取已失效（SSL 连接失败），改用共享的 ip-api.com 结果，用 ASN 组织名做托管商识别
        const data = ipApiShared
        if (data) {
            const asname = ((data.asname || data.org || data.isp || '') as string).toLowerCase()
            const hostingKeywords = /(host|datacenter|data.?center|cloud|cdn|server|colo|vps|dedicated|digitalocean|vultr|linode|aws|azure|google)/i
            const isHosting = hostingKeywords.test(asname)
            const scoreNum = isHosting ? 60 : 10
            const risk = isHosting ? '中风险' : '低风险'
            return {
                countryCode: data.countryCode || null,
                proxy: false,
                vpn: false,
                tor: false,
                relay: false,
                server: isHosting,
                datacenter: isHosting,
                abuser: false,
                robot: false,
                usageType: isHosting ? 'hosting' : '未知',
                companyType: isHosting ? 'hosting' : '未知',
                score: scoreNum.toString(),
                risk
            }
        }
        return null
    }

    async function fetchAbuseIPDB(ip: string, envKey?: string) {
        try {
            console.log('[abuseipdb] start ip', ip)
            const key = (envKey || process.env.ABUSEIPDB_KEY || '').trim()
            if (!key) {
                console.warn('[abuseipdb] ABUSEIPDB_KEY 未配置，抛出错误以便 errors 捕获')
                throw new Error('ABUSEIPDB_KEY 未配置')
            }
            const url = `https://api.abuseipdb.com/api/v2/check?ipAddress=${encodeURIComponent(ip)}&maxAgeInDays=90`
            const response = await fetch(url, {
                headers: { 'Key': key, 'Accept': 'application/json' },
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

    async function fetchCloudflare(_ip: string, ipApiShared?: any) {
        // 原 ipwhois.io/widget 已 403 失效，改用共享的 ip-api.com 结果提供 proxy/hosting 标志
        const data = ipApiShared
        if (data) {
            const hosting = data.hosting === true
            const proxy = data.proxy === true
            const mobile = data.mobile === true
            // 基于风险标志打分：hosting/proxy 各占 40
            const scoreNum = Math.min(100, (hosting ? 40 : 0) + (proxy ? 40 : 0))
            let risk = '低风险'
            if (scoreNum >= 80) risk = '高风险'
            else if (scoreNum >= 40) risk = '中风险'
            return {
                countryCode: data.countryCode || null,
                proxy: proxy,
                vpn: false,
                tor: false,
                relay: false,
                server: hosting,
                datacenter: hosting,
                abuser: false,
                robot: false,
                usageType: hosting ? 'hosting' : mobile ? 'isp' : '未知',
                companyType: hosting ? 'hosting' : mobile ? 'isp' : '未知',
                score: scoreNum.toFixed(2),
                risk
            }
        }
        return null
    }

    return app
}
