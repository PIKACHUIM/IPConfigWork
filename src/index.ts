import {Hono, Next} from 'hono'
import {serveStatic} from 'hono/cloudflare-workers' // @ts-ignore
import manifest from '__STATIC_CONTENT_MANIFEST'

const app = new Hono()

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
                const data = await response.json()
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
                    const data2 = await resp2.json()
                    if (data2 && data2.success) {
                        const conn = data2.connection || {}
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

// IP信息查询API（代理ip-api.com和ipwho.is解决跨域问题）
app.post('/api/ip-info', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        let result = null
        
        // 首先尝试ip-api.com
        try {
            const response = await fetch(`https://ip-api.com/json/${ip}?fields=status,message,as,isp,org,country,countryCode,regionName,city,zip,lat,lon,timezone,proxy,hosting`, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                }
            })
            
            if (response.ok) {
                const data = await response.json()
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
                        zip: data.zip || '',
                        lat: data.lat || 0,
                        lon: data.lon || 0,
                        timezone: data.timezone || '',
                        proxy: data.proxy || false,
                        hosting: data.hosting || false
                    }
                }
            }
        } catch (error) {
            console.warn('ip-api.com failed:', error)
        }

        // 如果ip-api.com失败，尝试ipwho.is
        if (!result) {
            try {
                const response = await fetch(`https://ipwho.is/${ip}`, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    }
                })
                
                if (response.ok) {
                    const data = await response.json()
                    if (data && data.success) {
                        const conn = data.connection || {}
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
                            zip: data.postal || '',
                            lat: data.latitude || 0,
                            lon: data.longitude || 0,
                            timezone: data.timezone?.id || '',
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
            return c.json({ error: '无法获取IP信息' }, 500)
        }

        return c.json(result)
    } catch (error) {
        return c.json({ error: '查询失败', details: error.message }, 500)
    }
})

// IP质量检测API
app.post('/api/ip-quality', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        // 这里可以集成更多的IP质量检测服务
        // 由于很多服务需要API密钥或有跨域限制，这里返回模拟数据
        const mockQualityData = {
            ip: ip,
            risk_score: Math.floor(Math.random() * 100),
            proxy: false,
            vpn: false,
            tor: false,
            hosting: false,
            abuser: false,
            robot: false,
            fraud_score: Math.floor(Math.random() * 100),
            threat_level: 'low',
            reputation: 'good'
        }

        return c.json(mockQualityData)
    } catch (error) {
        return c.json({ error: '检测失败', details: error.message })
    }
})

// 媒体服务检测API
app.post('/api/media-check', async (c) => {
    try {
        const body = await c.req.text()
        const params = new URLSearchParams(body)
        const ip = params.get('ip')

        if (!ip) {
            return c.text('IP地址参数缺失', 400)
        }

        // 模拟媒体服务检测结果
        const mediaResults = {
            netflix: Math.random() > 0.3 ? 'available' : 'blocked',
            youtube: 'available',
            disney: Math.random() > 0.5 ? 'available' : 'blocked',
            amazon_prime: Math.random() > 0.4 ? 'available' : 'blocked',
            spotify: 'available',
            chatgpt: Math.random() > 0.2 ? 'available' : 'blocked',
            tiktok: Math.random() > 0.6 ? 'available' : 'blocked'
        }

        return c.json(mediaResults)
    } catch (error) {
        return c.json({ error: '检测失败', details: error.message })
    }
})


// 静态资源路由（显式绑定首页）
app.get('/', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/index.html', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/check.html', serveStatic({ manifest: manifest, path: '/check.html' }))

// 通配静态资源（保持原有配置）
app.use("*", serveStatic({manifest: manifest, root: "./"}));

export default app
