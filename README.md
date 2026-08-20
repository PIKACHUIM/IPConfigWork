<div align="center">

# 🌐 IPConfig Worker

**专业的 IP 地址检测与质量评估平台**

[![Deploy to Cloudflare Workers](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?logo=cloudflare&logoColor=white)](https://deploy.workers.cloudflare.com/?url=https://github.com/PIKACHUIM/IPConfigWork)
[![EdgeOne Pages](https://img.shields.io/badge/Deploy-EdgeOne%20Pages-0066FF?logo=tencentcloud&logoColor=white)](https://edgeone.ai/pages/new?project-name=ipconfig-worker&repository-url=https://github.com/PIKACHUIM/IPConfigWork)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

[🚀 在线演示](https://ipaddr.524228.xyz) · [📖 部署文档](#-部署方法) · [🔌 API 文档](#-api-文档)

---

### ✨ 核心功能

🔍 **IP 地址检测** · 📊 **质量评分** · 🛡️ **风险分析** · 🌍 **全球连通性测试**

</div>

> **声明**：本项目仅提供 IP 地址查询服务，不提供任何其他服务，也不与任何第三方网站合作。

---

## 📋 功能特性

<table>
<tr>
<td width="50%">

### 🔍 IP 地址查询

- **双栈检测**：自动识别 IPv4/IPv6 地址
- **国内外连通性**：测试国内（DNSPod）和海外（Ipify）可达性
- **Google 连通性**：验证 IPv4/IPv6 访问 Google 服务
- **ASN 信息**：运营商、组织、AS 编号查询
- **地理位置**：精确定位城市、时区、坐标

</td>
<td width="50%">

### 📊 IP 质量评分

- **🎯 综合评分系统**（0-100 分）
  - IP 风险评分（70% 权重）
  - 网络可达性评分（30% 权重）
- **多源数据整合**：集成 10+ 权威数据源
- **智能风险识别**：VPN/代理/Tor/数据中心检测
- **实时评级**：优秀/良好/一般/较差四级分类

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ 风险分析

- **多维度风险聚合**：
  - 🏢 数据中心 IP 检测
  - 🔒 VPN/代理/Tor 识别
  - 🤖 爬虫/滥用记录检测
  - 🎭 匿名 IP 判定
- **风险评分可视化**：直观展示风险等级
- **详细报告**：完整的风险因子分析

</td>
<td width="50%">

### 🌍 媒体可达性测试

并行检测全球主流媒体服务：

- 📹 **视频平台**：Netflix、Disney+、YouTube、Prime Video
- 🎵 **音乐服务**：Spotify
- 💬 **社交媒体**：TikTok
- 🤖 **AI 服务**：ChatGPT
- 🎌 **区域服务**：动画疯（台湾）

</td>
</tr>
</table>

---

## 🖼️ 界面预览

### IP 地址查询页面

**检测内容：**
- ✅ IPv4/IPv6 地址双栈检测
  - 国内线路：`ipv4.ddnspod.com` / `ipv6.ddnspod.com`
  - 海外线路：`api.ipify.org` / `api6.ipify.org`
- ✅ Google 可达性测试
  - IPv4：`https://www.google.com/`
  - IPv6：`https://[2001:4860:4860::8888]/`
- ✅ ASN 信息查询（运营商、组织）

<div align="center">
  <img src="img/20251015-103914.png" alt="IP地址查询界面" width="90%">
</div>

### IP 质量评估页面

**功能亮点：**
- 📍 **地理信息卡片**：IP、ASN、坐标地图、城市、时区、邮编
- 🏷️ **IP 类型识别**：机房/任播/移动/匿名/卫星
- 📞 **联系信息**：公司与滥用举报联系方式
- 📊 **原始数据展示**：`api.ipapi.is` 完整字段渲染
- 🎯 **综合评分系统**：0-100 分智能评分

<div align="center">
  <img src="img/20251015-103740.png" alt="IP质量评估界面" width="90%">
</div>

---

## 🎯 综合评分机制

### 评分公式

```
综合评分 = IP风险评分 × 70% + 可达性评分 × 30%
```

### 1️⃣ IP 风险评分（满分 100 分，占比 70%）

从 100 分基准开始，根据风险因素扣分：

<table>
<thead>
  <tr>
    <th width="25%">风险类型</th>
    <th width="15%">扣分</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>🏢 数据中心 IP</td>
    <td><strong>-35分</strong></td>
    <td>⚠️ <strong>严重风险</strong>：机房 IP 常被用于自动化操作</td>
  </tr>
  <tr>
    <td>🔒 VPN</td>
    <td><strong>-30分</strong></td>
    <td>⚠️ <strong>严重风险</strong>：匿名化工具</td>
  </tr>
  <tr>
    <td>🌐 代理 (Proxy)</td>
    <td><strong>-30分</strong></td>
    <td>⚠️ <strong>严重风险</strong>：流量中转节点</td>
  </tr>
  <tr>
    <td>🧅 Tor 洋葱路由</td>
    <td><strong>-40分</strong></td>
    <td>🚨 <strong>极高风险</strong>：暗网匿名网络</td>
  </tr>
  <tr>
    <td>🤖 爬虫 (Crawler)</td>
    <td><strong>-25分</strong></td>
    <td>⚠️ <strong>高风险</strong>：自动化工具</td>
  </tr>
  <tr>
    <td>⚠️ 滥用记录 (Abuser)</td>
    <td><strong>-30分</strong></td>
    <td>⚠️ <strong>高风险</strong>：历史恶意行为</td>
  </tr>
  <tr>
    <td>🎭 匿名 IP</td>
    <td><strong>-20分</strong></td>
    <td>⚠️ <strong>中等风险</strong>：隐藏真实身份</td>
  </tr>
  <tr>
    <td>🚫 保留 IP (Bogon)</td>
    <td><strong>-50分</strong></td>
    <td>🚨 <strong>极严重</strong>：非法或保留地址段</td>
  </tr>
  <tr>
    <td>📱 移动网络</td>
    <td><strong>0分</strong></td>
    <td>✅ 正常网络类型，不扣分</td>
  </tr>
  <tr>
    <td>🛰️ 卫星网络</td>
    <td><strong>0分</strong></td>
    <td>✅ 正常网络类型，不扣分</td>
  </tr>
</tbody>
</table>

> **💡 数据源整合**：综合 `ipinfo.io`、`ipapi.is`、`IP2Location`、`Scamalytics`、`ipregistry`、`IPData`、`IPWhois`、`DB-IP`、`AbuseIPDB`、`Cloudflare` 等 **10+ 权威数据源**，通过多数表决机制确保准确性。

### 2️⃣ 可达性评分（满分 100 分，占比 30%）

**检测目标**：Google、Baidu、ChatGPT

**评分规则**：

| 延迟范围 | 评分 | 说明 |
|---------|------|------|
| **≤200ms** | 80-100分 | 🟢 优秀：延迟越低分数越高<br>• 0ms → 100分<br>• 100ms → 90分<br>• 200ms → 80分 |
| **200-500ms** | 60-80分 | 🔵 良好：线性递减 |
| **500-1000ms** | 50-60分 | 🟠 一般：线性递减 |
| **>1000ms** | 40分 | 🟠 较差：严重延迟但仍可达 |
| **不可达** | 0分 | 🔴 不可用 |

> **基础分**：只要能连通任一目标网站，即可获得 **80 分基础分**，延迟表现决定额外加分/扣分。

### 3️⃣ 最终评分等级

<table>
<thead>
  <tr>
    <th width="20%">分数范围</th>
    <th width="15%">等级</th>
    <th width="15%">标识</th>
    <th>说明</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><strong>80-100 分</strong></td>
    <td><strong>优秀</strong></td>
    <td>🟢 绿色</td>
    <td>IP 干净且网络畅通，无风险因素</td>
  </tr>
  <tr>
    <td><strong>60-79 分</strong></td>
    <td><strong>良好</strong></td>
    <td>🔵 蓝色</td>
    <td>轻微风险或网络延迟，整体可用</td>
  </tr>
  <tr>
    <td><strong>40-59 分</strong></td>
    <td><strong>一般</strong></td>
    <td>🟠 橙色</td>
    <td>存在明显风险或网络问题</td>
  </tr>
  <tr>
    <td><strong>0-39 分</strong></td>
    <td><strong>较差</strong></td>
    <td>🔴 红色</td>
    <td>高风险 IP 或网络不可达</td>
  </tr>
</tbody>
</table>

### 📊 评分示例

<details>
<summary><strong>💚 家宽用户</strong>（非 VPN、延迟 50ms）</summary>

- **IP 风险评分**：100 分（无风险因素）
- **可达性评分**：95 分（低延迟）
- **综合评分**：`100 × 0.7 + 95 × 0.3 = 98.5 分`
- **评级**：🟢 **优秀**

</details>

<details>
<summary><strong>💙 机房 IP</strong>（Datacenter、延迟 30ms）</summary>

- **IP 风险评分**：65 分（-35 分数据中心扣分）
- **可达性评分**：98 分（极低延迟）
- **综合评分**：`65 × 0.7 + 98 × 0.3 = 75 分`
- **评级**：🔵 **良好**

</details>

<details>
<summary><strong>🧡 VPN 用户</strong>（VPN、延迟 150ms）</summary>

- **IP 风险评分**：70 分（-30 分 VPN 扣分）
- **可达性评分**：87 分（中等延迟）
- **综合评分**：`70 × 0.7 + 87 × 0.3 = 75 分`
- **评级**：🔵 **良好**

</details>

---

## 🛡️ IP 风险详情页面

**功能特性：**
- 🔗 **多源风险聚合**：整合 10+ 数据源的风险评估
- 📊 **详细评分展示**：各数据源独立评分与综合评分
- 🏷️ **使用类型分析**：公司类型、用途类型、国家代码
- 🎬 **媒体可达性测试**：并行检查 TikTok、Disney+、Netflix、YouTube、Prime Video、Spotify、ChatGPT、动画疯

<div align="center">
  <img src="img/20251015-103805.png" alt="IP风险详情页面" width="90%">
</div>

---

## 🚀 部署方法

### ⚡ 一键部署

<table>
<tr>
<td align="center" width="33%">

#### Cloudflare Workers
**全球边缘网络**

[![Deploy](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/PIKACHUIM/IPConfigWork)

部署后配置环境变量

</td>
<td align="center" width="33%">

#### EdgeOne Functions
**国际站（海外）**

[![Deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?project-name=ipconfig-worker&repository-url=https://github.com/PIKACHUIM/IPConfigWork&build-command=npm%20run%20build-eo&install-command=npm%20install&output-directory=public&root-directory=./)

腾讯云边缘函数

</td>
<td align="center" width="33%">

#### EdgeOne Functions
**中国站（国内）**

[![Deploy](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://console.cloud.tencent.com/edgeone/pages/new?project-name=ipconfig-worker&repository-url=https://github.com/PIKACHUIM/IPConfigWork&build-command=npm%20run%20build-eo&install-command=npm%20install&output-directory=public&root-directory=./)

腾讯云边缘函数

</td>
</tr>
</table>

> **📌 部署后配置**：登录对应平台后台配置环境变量，详见[手动部署](#手动部署)章节。

### 🛠️ 手动部署

<details>
<summary><strong>Cloudflare Workers 部署</strong></summary>

**部署命令：**
```bash
npm run deploy
# 或
npm run deploy-cf
```

**配置文件**：`wrangler.jsonc`
- `main`: `src/index.ts`
- `site.bucket`: `./public`
- `compatibility_flags`: `["nodejs_compat"]`

</details>

<details>
<summary><strong>EdgeOne Pages 部署</strong></summary>

**部署命令：**
```bash
npm run deploy-eo
```

**配置文件**：`edgeone.json`
- 根路径重写：`/index.html`

</details>

<details>
<summary><strong>Node.js 自托管部署</strong></summary>

**构建：**
```bash
npm run build-js
```

**运行：**
```bash
npm run deploy-js
# 执行 node dist/bundle.js
```

</details>

### 🔑 环境变量配置

| 变量名 | 必需 | 说明 |
|--------|------|------|
| `ABUSEIPDB_KEY` | ✅ 必需 | 用于 AbuseIPDB 滥用记录查询 |
| `IP2LOCATION_KEY` | ⚪ 可选 | 用于 IP2Location 官方接口（可选） |

**Cloudflare 配置方式：**

```bash
# 推荐：使用密钥管理（安全）
wrangler secret put ABUSEIPDB_KEY
wrangler secret put IP2LOCATION_KEY

# 或在 wrangler.jsonc 的 vars 中设置（参考 wrangler.encrypt.jsonc）
```

---

## 🧪 本地调试

### Cloudflare Workers 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问
# http://127.0.0.1:8787/
# http://127.0.0.1:8787/index.html
# http://127.0.0.1:8787/check.html
```

### 前端静态预览（可选）

```bash
# 在项目根目录运行
python -m http.server 8000

# 访问
# http://localhost:8000/public/index.html
# http://localhost:8000/public/check.html
```

---

## 📡 API 文档

### `POST /api/asn`

**查询 IP 的 ASN 信息**

```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ip=8.8.8.8" \
  https://your-domain.com/api/asn
```

**响应示例：**
```json
{
  "ASN": "AS15169",
  "as_info": "GOOGLE",
  "as_domain": "Google LLC"
}
```

**数据源**：优先 `ip-api.com`，失败回退 `ipwho.is`

---

### `POST /api/ip-info`

**查询 IP 的详细信息**

```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ip=1.1.1.1" \
  https://your-domain.com/api/ip-info
```

**响应字段：**
- `source`：数据源
- `ip`、`asn`、`isp`、`org`
- `country`、`countryCode`、`region`、`city`、`postal`
- `lat`、`lon`、`timezone`
- `company`、`abuse`（来自 ipinfo.io）
- `privacy`：`vpn`、`proxy`、`tor`、`relay`、`hosting`

**数据源优先级**：`ipinfo.io → ip-api.com → ipwho.is`

---

### `GET /api/ip-info`

**自动检测客户端 IP 并查询**

自动根据请求头推断客户端 IP：

**优先级**：`CF-Connecting-IP → X-Forwarded-For → True-Client-IP → X-Real-IP`

---

### `POST /api/ip-quality`

**IP 质量评估（多源聚合）**

```bash
curl -X POST \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "ip=8.8.4.4" \
  https://your-domain.com/api/ip-quality
```

**响应结构：**
```json
{
  "ip": "8.8.4.4",
  "ipinfo": { ... },
  "ipapi": { ... },
  "ip2location": { ... },
  "scamalytics": { ... },
  "ipregistry": { ... },
  "ipdata": { ... },
  "ipwhois": { ... },
  "dbip": { ... },
  "abuseipdb": { ... },
  "cloudflare": { ... },
  "errors": []
}
```

**每个数据源可能包含**：
- `countryCode`、`proxy`、`vpn`、`tor`、`relay`
- `server`、`datacenter`、`abuser`、`robot`
- `usageType`、`companyType`、`score`、`risk`

---

### `GET /api/client-ip`

**获取客户端 IP**

```bash
curl https://your-domain.com/api/client-ip
```

**响应：**
```json
{
  "ip": "203.0.113.1"
}
```

---

## 🔌 数据源

本项目整合以下权威数据源：

| 数据源 | 功能 |
|--------|------|
| **ipinfo.io** | 基础信息、公司与 Abuse、隐私标记（VPN/代理/Tor/中继/托管） |
| **ip-api.com** | 基础信息、代理/托管检测 |
| **ipwho.is** | 基础信息与连接信息 |
| **api.ipapi.is** | 详细字段与风险评分 |
| **IP2Location** | 风险评分与数据中心/代理标记 |
| **Scamalytics** | 欺诈分与风险等级 |
| **ipregistry** | 用途类型（演示使用 `tryout` Key） |
| **IPPure** | 公共 API，无需密钥，提供风险评分、住宅/数据中心判定 |
| **IPData** | 补充评分与安全标记 |
| **IPWhois** | 补充评分与安全标记 |
| **DB-IP** | 补充评分与安全标记 |
| **AbuseIPDB** | 滥用记录查询 |
| **Cloudflare** | 补充评分与安全标记 |

---

## ⚠️ 注意事项

- **速率限制**：部分外部接口存在速率或区域访问限制，可能会出现无法查询的情况
- **媒体可达性**：采用 `no-cors` 请求，仅判定是否可达，不涉及登录或区域解锁
- **容错处理**：后端查询失败时，API 返回默认结构以保持前端可用（例如 `/api/asn` 返回 "未知"）

---

## 📚 引用资料

1. [xykt/IPQuality: IP质量检测脚本](https://github.com/xykt/IPQuality)
2. [IP111 - 显示查询自己的IP地址](https://ip111.cn/)
3. [IPv6 测试](https://test-ipv6.com/index.html.zh_CN)

---

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

<div align="center">

**如果这个项目对你有帮助，欢迎 Star ⭐**

Made with ❤️ by [PIKACHUIM](https://github.com/PIKACHUIM)

</div>
