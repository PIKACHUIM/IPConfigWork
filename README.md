## 项目说明

本项目用于查询并展示您的 IPv4/IPv6 地址、国内/海外连通性、以及 ASN 信息。前端页面通过后端提供的 JSONP 与代理接口进行检测与解析。

声明：本站仅提供 IP 地址查询的功能，不提供其它任何服务，也不与别的网站有任何合作。

仓库地址：`https://github.com/PIKACHUIM/IPConfigWork`

---

## 开发与运行

```txt
npm install
npm run dev
```

访问开发服务器：`http://127.0.0.1:8787/`

## 部署

```txt
npm run deploy
```

## 类型生成（Cloudflare Workers）

[参考 Wrangler 文档](https://developers.cloudflare.com/workers/wrangler/commands/#types)

```txt
npm run cf-typegen
```

在实例化 `Hono` 时传入泛型 `CloudflareBindings`：

```ts
// src/index.ts
const app = new Hono<{ Bindings: CloudflareBindings }>()
```
