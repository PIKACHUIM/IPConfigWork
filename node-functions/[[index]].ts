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



// 静态资源路由（显式绑定首页）
app.get('/', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/index.html', serveStatic({ manifest: manifest, path: '/index.html' }))

// 通配静态资源（保持原有配置）
app.use("*", serveStatic({manifest: manifest, root: "./"}));

export default app
