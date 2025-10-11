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


// JSONP 代理：用于国内（ipw.cn）与谷歌（sorry 页面）跨域绕过（已禁用）
/* app.get('/api/jsonp', async (c) => {
    const url = new URL(c.req.url)
    const type = url.searchParams.get('type')
    const callback = url.searchParams.get('callback')

    if (!callback) {
        return c.text('缺少 callback 参数', 400)
    }

    let target = ''
    switch (type) {
        case 'domestic-ipv4':
            target = 'https://4.ipw.cn/'
            break
        case 'domestic-ipv6':
            target = 'https://6.ipw.cn/'
            break
        case 'google-ipv4':
            target = 'https://ipv4.google.com/sorry/index?continue=https://maxmind.com&sclient=gws-wiz-serp&hl=zh-CN#'
            break
        case 'google-ipv6':
            target = 'https://ipv6.google.com/sorry/index?continue=https://maxmind.com&sclient=gws-wiz-serp&hl=zh-CN#'
            break
        default:
            return c.text('不支持的 JSONP 类型', 400)
    }

    try {
        console.log(`[jsonp] start type=${type} target=${target}`)
        const isGoogle = type === 'google-ipv4' || type === 'google-ipv6'
        const headers: Record<string, string> = isGoogle ? {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
            'Referer': 'https://maxmind.com/',
            'Cache-Control': 'no-cache'
        } : {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        const buildFallback = (t: string) => {
            if (t.startsWith('https://')) return `https://r.jina.ai/https://${t.slice('https://'.length)}`
            if (t.startsWith('http://')) return `https://r.jina.ai/http://${t.slice('http://'.length)}`
            return `https://r.jina.ai/http://${t}`
        }
        let resp: Response
        try {
            resp = await fetch(target, {
                method: 'GET',
                headers,
                signal: AbortSignal.timeout(8000)
            })
        } catch (e) {
            console.error(`[jsonp] primary fetch failed type=${type} err=${(e as any)?.message}`)
            if (isGoogle) {
                const fb = buildFallback(target)
                console.log(`[jsonp] fallback fetch via r.jina.ai url=${fb}`)
                resp = await fetch(fb, {
                    method: 'GET',
                    headers: {
                        'User-Agent': headers['User-Agent'],
                        'X-Respond-With': 'html',
                        'Accept': 'text/html,application/xhtml+xml',
                        'Cache-Control': 'no-cache'
                    },
                    signal: AbortSignal.timeout(8000)
                })
            } else {
                throw e
            }
        }
        const contentType = resp.headers.get('content-type') || ''
        let result: { ok: boolean; ip: string | null } = { ok: false, ip: null }
        console.log(`[jsonp] resp type=${type} status=${resp.status} ok=${resp.ok} ctype=${contentType}`)
        // 无论状态码是否 2xx，只要能成功获取文本则视为“可达”
        let text = ''
        try { text = await resp.text() } catch (e) { console.error(`[jsonp] read text failed type=${type} err=${(e as any)?.message}`); text = '' }
        console.log(`[jsonp] text len=${text.length} snippet=${text.slice(0,200).replace(/\n/g,'\\n')}`)
        if (isGoogle && (!text || text.length === 0)) {
            const fb = buildFallback(target)
            console.log(`[jsonp] empty text; try fallback fetch via r.jina.ai url=${fb}`)
            try {
                const fbResp = await fetch(fb, {
                    method: 'GET',
                    headers: {
                        'User-Agent': headers['User-Agent'],
                        'X-Respond-With': 'html',
                        'Accept': 'text/html,application/xhtml+xml',
                        'Cache-Control': 'no-cache'
                    },
                    signal: AbortSignal.timeout(8000)
                })
                text = await fbResp.text()
                console.log(`[jsonp] fallback text len=${text.length} snippet=${text.slice(0,200).replace(/\n/g,'\\n')}`)
            } catch (e) {
                console.error(`[jsonp] fallback read failed type=${type} err=${(e as any)?.message}`)
            }
        }
        if (isGoogle) {
            // 谷歌 sorry 页面：成功获取页面则认为可达；改用字符串标记提取 IP
            const normalized = text
                .replace(/<br\s*\/?\s*>/gi, '\n')
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<[^>]+>/g, ' ')
                .replace(/&nbsp;/gi, ' ')
                .replace(/\s+/g, ' ')
                .trim()

            const findIPByMarkers = (t: string): string | null => {
                const markers = ['IP 地址：', 'IP 地址:', 'IP地址：', 'IP地址:', 'IP Address：', 'IP Address:', 'IP：', 'IP:']
                for (const mk of markers) {
                    const idx = t.indexOf(mk)
                    console.log(`[jsonp] marker '${mk}' index=${idx}`)
                    if (idx >= 0) {
                        let s = t.slice(idx + mk.length)
                        s = s.replace(/^\s+/, '')
                        let ip = ''
                        for (let i = 0; i < s.length; i++) {
                            const ch = s[i]
                            if ((ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F') || ch === ':' || ch === '.') {
                                ip += ch
                            } else {
                                break
                            }
                        }
                        ip = ip.trim()
                        console.log(`[jsonp] candidate ip='${ip}'`)
                        if (ip && (ip.includes(':') || ip.includes('.'))) return ip
                    }
                }
                return null
            }

            const isValidIPv4 = (s: string): boolean => {
                if (!s || s.indexOf('.') === -1) return false
                const parts = s.split('.')
                if (parts.length !== 4) return false
                for (const p of parts) {
                    if (!/^\d{1,3}$/.test(p)) return false
                    const n = Number(p)
                    if (n < 0 || n > 255) return false
                }
                return true
            }

            const isLikelyIPv6 = (s: string): boolean => {
                const colons = (s.match(/:/g) || []).length
                if (colons < 2) return false
                if (!/^[0-9a-fA-F:.]+$/.test(s)) return false
                return true
            }

            const findAnyIPByScan = (t: string): string | null => {
                let best: string | null = null
                for (let i = 0; i < t.length; i++) {
                    const ch = t[i]
                    const allowed = (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F') || ch === ':' || ch === '.'
                    if (!allowed) continue
                    let j = i
                    let acc = ''
                    while (j < t.length) {
                        const cj = t[j]
                        if ((cj >= '0' && cj <= '9') || (cj >= 'a' && cj <= 'f') || (cj >= 'A' && cj <= 'F') || cj === ':' || cj === '.') {
                            acc += cj
                            j++
                        } else {
                            break
                        }
                    }
                    i = j
                    if (!acc) continue
                    if (acc.includes(':') && isLikelyIPv6(acc)) {
                        console.log(`[jsonp] scan found ipv6 candidate='${acc}'`)
                        return acc
                    }
                    if (acc.includes('.') && isValidIPv4(acc)) {
                        console.log(`[jsonp] scan found ipv4 candidate='${acc}'`)
                        best = best || acc
                    }
                }
                return best
            }

            const extracted = findIPByMarkers(text) || findIPByMarkers(normalized) || findAnyIPByScan(text) || findAnyIPByScan(normalized)
            console.log(`[jsonp] google extracted='${extracted}'`)
            result = { ok: true, ip: extracted }
        } else {
            // ipw.cn 返回纯文本 IP。
            const ip = (text || '').trim()
            // 只要请求有返回文本，视为可达；若解析到 IP 则返回
            console.log(`[jsonp] domestic ip='${ip}'`)
            result = { ok: true, ip: ip || null }
        }

        const body = `${callback}(${JSON.stringify(result)})`
        console.log(`[jsonp] reply type=${type} ok=${result.ok} ip='${result.ip}'`)
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
                'Cache-Control': 'no-store'
            }
        })
    } catch (e) {
        console.error(`[jsonp] error type=${type} name=${(e as any)?.name} message=${(e as any)?.message}`)
        const body = `${callback}(${JSON.stringify({ ok: false, ip: null })})`
        return new Response(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/javascript; charset=utf-8',
                'Cache-Control': 'no-store'
            }
        })
    }
}) */

// 静态资源路由（显式绑定首页）
app.get('/', serveStatic({ manifest: manifest, path: '/index.html' }))
app.get('/index.html', serveStatic({ manifest: manifest, path: '/index.html' }))

// 通配静态资源（保持原有配置）
app.use("*", serveStatic({manifest: manifest, root: "./"}));

export default app
