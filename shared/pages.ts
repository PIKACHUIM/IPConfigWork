// 本文件由 public/*.html 自动生成，请勿手动修改。
// 页面以内联字符串形式提供，访问 /、/check、/speed 无需 .html 后缀。
export const INDEX_HTML: string = String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>获取我的IP地址</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #070b14;
      --bg-soft: #0b1220;
      --surface: rgba(255, 255, 255, 0.03);
      --surface-hover: rgba(255, 255, 255, 0.06);
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.14);
      --text: #f2f6fc;
      --text-2: #9aa8bd;
      --text-3: #5c6b82;
      --accent: #38bdf8;
      --accent-2: #6366f1;
      --green: #34d399;
      --yellow: #fbbf24;
      --red: #fb7185;
      --ring-track: rgba(255, 255, 255, 0.07);
      --glow: 0 0 80px rgba(56, 189, 248, 0.16);
      --card-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
      --font-head: 'Space Grotesk', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --header-bg: rgba(10, 15, 28, 0.72);
    }

    :root[data-theme='light'] {
      --bg: #f4f7fb;
      --bg-soft: #ffffff;
      --surface: rgba(15, 23, 42, 0.03);
      --surface-hover: rgba(15, 23, 42, 0.06);
      --border: rgba(15, 23, 42, 0.09);
      --border-strong: rgba(15, 23, 42, 0.16);
      --text: #0f172a;
      --text-2: #475569;
      --text-3: #94a3b8;
      --accent: #0284c7;
      --accent-2: #4f46e5;
      --green: #059669;
      --yellow: #d97706;
      --red: #e11d48;
      --ring-track: rgba(15, 23, 42, 0.08);
      --glow: 0 0 80px rgba(2, 132, 199, 0.12);
      --card-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
      --header-bg: rgba(255, 255, 255, 0.72);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }

    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      transition: background 0.4s ease, color 0.4s ease;
      overflow-x: hidden;
    }

    /* ---- 背景装饰 ---- */
    .bg {
      position: fixed;
      inset: 0;
      z-index: -2;
      pointer-events: none;
      background:
        radial-gradient(1200px 600px at 50% -10%, rgba(56, 189, 248, 0.14), transparent 60%),
        radial-gradient(900px 500px at 90% 110%, rgba(99, 102, 241, 0.14), transparent 60%);
      transition: opacity 0.4s ease;
    }
    :root[data-theme='light'] .bg {
      opacity: 0.55;
    }
    .bg-grid {
      position: fixed;
      inset: 0;
      z-index: -1;
      pointer-events: none;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
      opacity: 0.5;
      transition: background-image 0.4s ease;
    }

    .app {
      max-width: 1080px;
      margin: 0 auto;
      padding: 0 24px 64px;
    }

    /* ---- 顶部工具条 ---- */
    .topbar {
      position: fixed;
      top: 20px;
      right: 28px;
      z-index: 50;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .icon-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      width: 40px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--header-bg);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      color: var(--text-2);
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .icon-btn:hover {
      border-color: var(--border-strong);
      color: var(--text);
      transform: translateY(-1px);
    }
    .icon-btn svg { width: 19px; height: 19px; }
    .theme-toggle .sun { display: none; }
    :root[data-theme='light'] .theme-toggle .sun { display: block; }
    :root[data-theme='light'] .theme-toggle .moon { display: none; }

    .lang-switch {
      display: flex;
      align-items: center;
      height: 40px;
      padding: 3px;
      border-radius: 12px;
      border: 1px solid var(--border);
      background: var(--header-bg);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
    }
    .lang-btn {
      height: 32px;
      padding: 0 12px;
      border: none;
      border-radius: 9px;
      background: transparent;
      color: var(--text-2);
      font-family: var(--font-head);
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .lang-btn.active {
      background: var(--accent);
      color: #04121f;
      box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35);
    }
    :root[data-theme='light'] .lang-btn.active { color: #ffffff; }

    /* ---- 页头 ---- */
    .header {
      padding: 108px 0 32px;
      text-align: center;
      animation: fadeUp 0.7s ease both;
    }
    .logo {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 64px;
      height: 64px;
      border-radius: 18px;
      margin-bottom: 24px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.35);
      color: #04121f;
    }
    :root[data-theme='light'] .logo { color: #ffffff; }
    .logo svg { width: 32px; height: 32px; }
    .header h1 {
      font-family: var(--font-head);
      font-size: clamp(2rem, 5vw, 3.2rem);
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      background: linear-gradient(120deg, var(--text) 30%, var(--accent));
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .header p {
      margin-top: 14px;
      color: var(--text-2);
      font-size: 16px;
    }

    /* ---- TAB 菜单 ---- */
    .tabs {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 5px;
      margin-top: 24px;
      border-radius: 14px;
      border: 1px solid var(--border);
      background: var(--surface);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
    }
    .tab {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 22px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: var(--text-2);
      font-family: var(--font-head);
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.25s ease;
    }
    .tab:hover { color: var(--text); }
    .tab.active {
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      color: #04121f;
      box-shadow: 0 6px 18px rgba(56, 189, 248, 0.35);
    }
    :root[data-theme='light'] .tab.active { color: #ffffff; }
    .tab svg { width: 16px; height: 16px; }

    /* ---- 进度条 ---- */
    .progress {
      max-width: 620px;
      margin: 0 auto 40px;
      animation: fadeUp 0.7s ease 0.1s both;
    }
    .progress-track {
      height: 6px;
      border-radius: 99px;
      background: var(--ring-track);
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      width: 0%;
      border-radius: 99px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
    }
    .progress-text {
      margin-top: 12px;
      text-align: center;
      font-family: var(--font-mono);
      font-size: 13px;
      color: var(--text-3);
    }

    /* ---- 测试卡片 ---- */
    .test-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 22px;
    }
    .test-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 26px;
      box-shadow: var(--card-shadow);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
      animation: fadeUp 0.7s ease both;
    }
    .test-card:nth-child(1) { animation-delay: 0.15s; }
    .test-card:nth-child(2) { animation-delay: 0.25s; }
    .test-card:hover {
      transform: translateY(-4px);
      border-color: var(--border-strong);
      background: var(--surface-hover);
    }

    .test-card-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 22px;
      padding-bottom: 20px;
      border-bottom: 1px solid var(--border);
    }
    .version-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-head);
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 0.02em;
    }
    .version-badge .dot-v {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.18);
    }
    .test-card[data-version='6'] .version-badge .dot-v {
      background: var(--accent-2);
      box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.18);
    }

    .score-ring {
      --p: 0;
      --c: var(--accent);
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: conic-gradient(var(--c) calc(var(--p) * 1%), var(--ring-track) 0);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 7px;
      box-sizing: border-box;
    }
    .score-inner {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: var(--bg-soft);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2px;
      transition: background 0.3s ease;
    }
    .score-num {
      font-family: var(--font-head);
      font-size: 20px;
      font-weight: 700;
      line-height: 1;
    }
    .score-unit {
      font-size: 11px;
      color: var(--text-3);
      transform: translateY(-1px);
    }

    .test-list { display: flex; flex-direction: column; }
    .test-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      padding: 12px 0;
      border-bottom: 1px dashed var(--border);
    }
    .test-row:last-child { border-bottom: none; }
    .test-label {
      font-size: 14px;
      color: var(--text-2);
      white-space: nowrap;
    }
    .test-value {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 500;
      min-height: 22px;
      text-align: right;
    }
    .val-text.mono {
      font-family: var(--font-mono);
      font-size: 13px;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .dot.ok { background: var(--green); box-shadow: 0 0 8px rgba(52, 211, 153, 0.7); }
    .dot.bad { background: var(--red); box-shadow: 0 0 8px rgba(251, 113, 133, 0.7); }
    .dot.wait {
      background: var(--yellow);
      box-shadow: 0 0 8px rgba(251, 191, 36, 0.7);
      animation: pulse 1.2s ease infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(0.8); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ---- 按钮 ---- */
    .actions {
      display: flex;
      justify-content: center;
      margin-top: 36px;
      animation: fadeUp 0.7s ease 0.3s both;
    }
    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 34px;
      border: none;
      border-radius: 14px;
      font-family: var(--font-head);
      font-size: 15px;
      font-weight: 600;
      color: #04121f;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      cursor: pointer;
      box-shadow: 0 8px 24px rgba(56, 189, 248, 0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }
    :root[data-theme='light'] .btn-primary { color: #ffffff; }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 14px 32px rgba(56, 189, 248, 0.45);
    }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary svg { width: 18px; height: 18px; }

    /* ---- 页脚 ---- */
    footer {
      margin-top: 64px;
      text-align: center;
      color: var(--text-3);
      font-size: 13px;
      animation: fadeUp 0.7s ease 0.4s both;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    @media (max-width: 640px) {
      .topbar { top: 14px; right: 16px; }
      .header { padding-top: 96px; }
      .test-card { padding: 20px; }
      .test-row { flex-direction: column; align-items: flex-start; gap: 6px; }
      .test-value { text-align: left; }
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="bg-grid"></div>

  <div class="topbar">
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="zh">中</button>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换主题">
      <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
  </div>

  <div class="app">
    <header class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      </div>
      <h1 data-i18n="header.title">获取我的IP地址</h1>
      <p data-i18n="header.desc">检测您的 IPv4 与 IPv6 连接状态及网络质量</p>
      <nav class="tabs">
        <a href="/" class="tab active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span data-i18n="nav.ip">获取IP地址</span>
        </a>
        <a href="/check" class="tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <span data-i18n="nav.quality">IP质量检测</span>
        </a>
        <a href="/speed" class="tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 12l5-5"/><circle cx="12" cy="12" r="1.5"/></svg>
          <span data-i18n="nav.speed">网速测试</span>
        </a>
      </nav>
    </header>

    <div class="progress">
      <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
      <div class="progress-text" id="progress-text" data-i18n="progress.preparing">准备开始检测...</div>
    </div>

    <div class="test-grid">
      <section class="test-card" data-version="4">
        <div class="test-card-head">
          <div class="version-badge"><span class="dot-v"></span>IPv4</div>
          <div class="score-ring" id="ipv4-ring">
            <div class="score-inner">
              <span class="score-num" id="ipv4-score">--</span><span class="score-unit">分</span>
            </div>
          </div>
        </div>
        <div class="test-list">
          <div class="test-row"><span class="test-label" data-i18n="test.address">IP地址</span><span class="test-value" id="ipv4-address"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.asn">ASN编号</span><span class="test-value" id="ipv4-asn-code"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.isp">运营商</span><span class="test-value" id="ipv4-asn-isp"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.dns">DNS解析</span><span class="test-value" id="ipv4-dns"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.google">谷歌连通性</span><span class="test-value" id="ipv4-google"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.domestic">国内连通性</span><span class="test-value" id="ipv4-domestic"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.international">海外连通性</span><span class="test-value" id="ipv4-international"></span></div>

          <div class="test-row"><span class="test-label" data-i18n="test.outIpAws">亚马逊出口IP</span><span class="test-value" id="ipv4-aws-ip"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.outIpSb">ip.sb出口IP</span><span class="test-value" id="ipv4-ipsb-ip"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.outIpCan">icanhazip出口IP</span><span class="test-value" id="ipv4-icanhazip-ip"></span></div>
        </div>
      </section>

      <section class="test-card" data-version="6">
        <div class="test-card-head">
          <div class="version-badge"><span class="dot-v"></span>IPv6</div>
          <div class="score-ring" id="ipv6-ring">
            <div class="score-inner">
              <span class="score-num" id="ipv6-score">--</span><span class="score-unit">分</span>
            </div>
          </div>
        </div>
        <div class="test-list">
          <div class="test-row"><span class="test-label" data-i18n="test.address">IP地址</span><span class="test-value" id="ipv6-address"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.asn">ASN编号</span><span class="test-value" id="ipv6-asn-code"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.isp">运营商</span><span class="test-value" id="ipv6-asn-isp"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.dns">DNS解析</span><span class="test-value" id="ipv6-dns"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.google">谷歌连通性</span><span class="test-value" id="ipv6-google"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.domestic">国内连通性</span><span class="test-value" id="ipv6-domestic"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.international">海外连通性</span><span class="test-value" id="ipv6-international"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.outIpIpify">ipify出口IP</span><span class="test-value" id="ipv6-ipify-ip"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.outIpIdentme">ident.me出口IP</span><span class="test-value" id="ipv6-identme-ip"></span></div>
          <div class="test-row"><span class="test-label" data-i18n="test.outIpIfconfig">icanhazip出口IP6</span><span class="test-value" id="ipv6-icanhazip-ip"></span></div>

        </div>
      </section>
    </div>

    <div class="actions">
      <button class="btn-primary" id="refresh-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        <span data-i18n="btn.refresh">重新检测</span>
      </button>
    </div>

    <footer>
      <span data-i18n="footer.notice">本站仅提供IP地址查询的功能，不提供其它任何服务，也不与别的网站有任何合作。</span>
      <div style="margin-top: 16px;">
        <a href="https://github.com/PIKACHUIM/IPConfigWork" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>IPConfigWork</span>
        </a>
      </div>
    </footer>
  </div>

  <script>
    (function () {
      'use strict';

      /* ---------- 多语言 ---------- */
      const I18N = {
        zh: {
          'page.title': '获取我的IP地址',
          'header.title': '获取我的IP地址',
          'header.desc': '检测您的 IPv4 与 IPv6 连接状态及网络质量',
          'nav.ip': '获取IP地址',
          'nav.quality': 'IP质量检测',
          'nav.speed': '网速测试',
          'progress.preparing': '准备开始检测...',
          'progress.done': '检测完成',
          'progress.running': '检测进度：{done}/{total}（{percent}%）',
          'test.address': 'IP出口地址',
          'test.asn': 'IP ASN编号',
          'test.isp': '网络运营商',
          'test.dns': 'IP DNS解析',
          'test.domestic': '国内连通性',
          'test.international': '海外连通性',
          'test.google': '谷歌连通性',
          'test.outIpAws': '亚马逊出口',
          'test.outIpSb': 'IP.SB 出口',
          'test.outIpCan': 'ICANHAZIP4',
          'test.outIpIpify': 'IPIFY IPV6',
          'test.outIpIdentme':  'IDENT IPV6',
          'test.outIpIfconfig': 'ICANHAZIP6',
          'score.unit': '分',
          'status.testing': '检测中...',
          'status.calculating': '计算中...',
          'status.reachable': '可达',
          'status.unreachable': '不可达',
          'status.supported': '支持',
          'status.dnsFail': '未正确解析DNS',
          'status.queryFailed': '查询失败',
          'status.connectFailed': '连接失败',
          'status.getFailed': '获取失败',
          'status.unknown': '未知',
          'btn.refresh': '重新检测',
          'footer.notice': '本站仅提供IP地址查询的功能，不提供其它任何服务，也不与别的网站有任何合作。',
          'footer.project': 'IPConfigWork',
          'theme.dark': '切换亮色模式',
          'theme.light': '切换暗色模式'
        },
        en: {
          'page.title': 'Get My IP Address',
          'header.title': 'Get My IP Address',
          'header.desc': 'Check your IPv4 & IPv6 connectivity and network quality',
          'nav.ip': 'Get IP',
          'nav.quality': 'IP Quality',
          'nav.speed': 'Speed Test',
          'progress.preparing': 'Preparing to start...',
          'progress.done': 'Detection complete',
          'progress.running': 'Progress: {done}/{total} ({percent}%)',
          'test.address': 'IP Address',
          'test.asn': 'ASN',
          'test.isp': 'ISP',
          'test.dns': 'DNS',
          'test.domestic': 'Domestic Connectivity',
          'test.international': 'International Connectivity',
          'test.google': 'Google Connectivity',
          'test.outIpAws': 'AWS Outbound IP',
          'test.outIpSb': 'ip.sb Outbound IP',
          'test.outIpCan': 'icanhazip Outbound IP',
          'test.outIpIpify': 'ipify Outbound IP',
          'test.outIpIdentme': 'ident.me Outbound IP',
          'test.outIpIfconfig': 'icanhazip Outbound IP (IPv6)',
          'score.unit': 'pts',
          'status.testing': 'Testing...',
          'status.calculating': 'Calculating...',
          'status.reachable': 'Reachable',
          'status.unreachable': 'Unreachable',
          'status.supported': 'Supported',
          'status.dnsFail': 'DNS resolution failed',
          'status.queryFailed': 'Query failed',
          'status.connectFailed': 'Connection failed',
          'status.getFailed': 'Failed to fetch',
          'status.unknown': 'Unknown',
          'btn.refresh': 'Re-test',
          'footer.notice': 'This site only provides IP address lookup and does not provide any other services or cooperate with any other websites.',
          'footer.project': 'IPConfigWork',
          'theme.dark': 'Switch to light mode',
          'theme.light': 'Switch to dark mode'
        }
      };

      // 优先使用已保存的语言设置，否则根据浏览器语言自动检测
      let currentLang = localStorage.getItem('lang');
      if (!currentLang) {
        const browserLang = navigator.language || navigator.languages[0] || 'zh-CN';
        currentLang = browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
      }

      function t(key, vars) {
        let str = (I18N[currentLang] && I18N[currentLang][key]) || I18N.zh[key] || key;
        if (vars) {
          Object.keys(vars).forEach(function (k) {
            str = str.replace('{' + k + '}', vars[k]);
          });
        }
        return str;
      }

      function applyLanguage() {
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
        document.title = t('page.title');
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
          el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
          btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
        document.querySelectorAll('.score-unit').forEach(function (el) {
          el.textContent = t('score.unit');
        });
        const themeBtn = document.getElementById('theme-toggle');
        themeBtn.title = t(document.documentElement.getAttribute('data-theme') === 'light' ? 'theme.light' : 'theme.dark');
        themeBtn.setAttribute('aria-label', themeBtn.title);
        // 刷新运行时状态文案
        updateProgress();
        updateScores();
      }

      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          currentLang = btn.getAttribute('data-lang');
          localStorage.setItem('lang', currentLang);
          applyLanguage();
        });
      });

      /* ---------- 主题切换 ---------- */
      function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        const btn = document.getElementById('theme-toggle');
        btn.title = t(theme === 'light' ? 'theme.light' : 'theme.dark');
        btn.setAttribute('aria-label', btn.title);
      }

      document.getElementById('theme-toggle').addEventListener('click', function () {
        const current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'light' ? 'dark' : 'light');
      });

      /* ---------- 工具函数 ---------- */
      function escapeHtml(str) {
        return String(str == null ? '' : str)
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
      }

      /* ---------- 检测状态 ---------- */
      const totalTests = 14; // 7 项 × 2 个版本
      let completedTests = 0;
      let ipv4Score = 0;
      let ipv6Score = 0;

      const allTestIds = [
        'ipv4-address', 'ipv4-asn-code', 'ipv4-asn-isp', 'ipv4-dns', 'ipv4-domestic', 'ipv4-international', 'ipv4-google',
        'ipv6-address', 'ipv6-asn-code', 'ipv6-asn-isp', 'ipv6-dns', 'ipv6-domestic', 'ipv6-international', 'ipv6-google'
      ];

      function updateProgress() {
        const percent = Math.round((completedTests / totalTests) * 100);
        document.getElementById('progress-fill').style.width = percent + '%';
        const textEl = document.getElementById('progress-text');
        if (completedTests >= totalTests) {
          textEl.textContent = t('progress.done');
        } else if (completedTests === 0) {
          textEl.textContent = t('progress.preparing');
        } else {
          textEl.textContent = t('progress.running', {
            done: completedTests,
            total: totalTests,
            percent: percent
          });
        }
      }

      function scoreColor(score) {
        if (score >= 80) return 'var(--green)';
        if (score >= 60) return 'var(--accent)';
        if (score >= 40) return 'var(--yellow)';
        return 'var(--red)';
      }

      function updateScores() {
        ['ipv4', 'ipv6'].forEach(function (v) {
          const score = v === 'ipv4' ? ipv4Score : ipv6Score;
          document.getElementById(v + '-score').textContent = score;
          const ring = document.getElementById(v + '-ring');
          ring.style.setProperty('--p', score);
          ring.style.setProperty('--c', scoreColor(score));
        });
      }

      function latencyRGB(latency) {
        // 绿 #34d399 (52,211,153) -> 黄 #fbbf24 (251,191,36)
        // <=300ms 纯绿，之后平滑渐变，>=1500ms 纯黄
        const t = typeof latency === 'number' ? Math.min(1, Math.max(0, (latency - 300) / 1200)) : 0;
        const r = Math.round(52 + (251 - 52) * t);
        const g = Math.round(211 + (191 - 211) * t);
        const b = Math.round(153 + (36 - 153) * t);
        return [r, g, b];
      }

      function updateResult(elementId, success, message, score, mono, latency) {
        const el = document.getElementById(elementId);
        if (el) {
          if (success) {
            const rgb = latencyRGB(latency);
            const c = 'rgb(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ')';
            el.innerHTML = '<span class="dot" style="background:' + c + ';box-shadow:0 0 8px ' + c + '"></span><span class="val-text' + (mono ? ' mono' : '') + '">' + escapeHtml(message) + '</span>';
          } else {
            el.innerHTML = '<span class="dot bad"></span><span class="val-text' + (mono ? ' mono' : '') + '">' + escapeHtml(message) + '</span>';
          }
        }
        if (success) {
          if (elementId.startsWith('ipv4')) ipv4Score += score;
          else if (elementId.startsWith('ipv6')) ipv6Score += score;
        }
        completedTests++;
        updateProgress();
        updateScores();
      }

      function setTesting(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          el.innerHTML = '<span class="dot wait"></span><span class="val-text">' + escapeHtml(t('status.testing')) + '</span>';
        }
      }

      function setCalculating(elementId) {
        const el = document.getElementById(elementId);
        if (el) {
          el.innerHTML = '<span class="dot wait"></span><span class="val-text">' + escapeHtml(t('status.calculating')) + '</span>';
        }
      }

      /* ---------- 服务检测 ---------- */
      function extractIPFromText(text, version) {
        if (version === 4) {
          const m = text.match(/\b(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\b/);
          return m ? m[1] : null;
        }
        const m = text.match(/((?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4})/);
        return m ? m[1] : null;
      }

      function extractIPFromJson(data, version) {
        try {
          const d = typeof data === 'string' ? JSON.parse(data) : data;
          if (!d) return null;
          const candidates = [d.ip, d.query, d.ipv4, d.ipv6, d.client_ip, d.ip_address];
          for (const c of candidates) {
            if (!c) continue;
            if (version === 4 && /^\d{1,3}(\.\d{1,3}){3}$/.test(c)) return c;
            if (version === 6 && c.indexOf(':') !== -1) return c;
          }
        } catch (e) { /* ignore */ }
        return null;
      }

      async function tryService(serviceUrl, version) {
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, 8000);
        const start = performance.now();
        try {
          const response = await fetch(serviceUrl, {
            method: 'GET',
            redirect: 'follow',
            cache: 'no-cache',
            signal: controller.signal
          });
          if (response.status < 200 || response.status >= 400) throw new Error('HTTP ' + response.status);
          const latency = Math.round(performance.now() - start);
          const rawText = await response.text();
          let ip = extractIPFromText(rawText, version);
          if (ip) return { ip: ip, latency: latency };
          ip = extractIPFromJson(rawText, version);
          if (ip) return { ip: ip, latency: latency };
          throw new Error('无法解析IP');
        } finally {
          clearTimeout(timer);
        }
      }

      async function checkReachable(url, timeout) {
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, timeout || 5000);
        const start = performance.now();
        try {
          const resp = await fetch(url, {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-cache',
            redirect: 'follow',
            signal: controller.signal
          });
          return { ok: true, latency: Math.round(performance.now() - start) };
        } catch (e) {
          return { ok: false, latency: null };
        } finally {
          clearTimeout(timer);
        }
      }

      async function getASNInfo(ip) {
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, 10000);
        try {
          const response = await fetch('/api/asn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'ip=' + encodeURIComponent(ip),
            signal: controller.signal
          });
          if (!response.ok) throw new Error('ASN查询失败');
          const text = await response.text();
          return JSON.parse(text);
        } finally {
          clearTimeout(timer);
        }
      }

      async function runVersionTests(version) {
        const prefix = version === 4 ? 'ipv4' : 'ipv6';
        const domesticUrl = version === 4 ? 'https://ipv4.ddnspod.com/' : 'https://ipv6.ddnspod.com/';
        const overseasUrl = version === 4 ? 'https://api.ipify.org/' : 'https://api6.ipify.org/';
        const googleUrl = version === 4 ? 'https://www.google.com/' : 'https://[2001:4860:4860::8888]/';

        const domesticPromise = tryService(domesticUrl, version).then(function (r) {
          updateResult(prefix + '-domestic', true, r.ip + ' · ' + r.latency + 'ms', 20, true, r.latency);
          return r.ip;
        }).catch(function () {
          updateResult(prefix + '-domestic', false, t('status.connectFailed'), 0);
          return null;
        });

        const overseasPromise = tryService(overseasUrl, version).then(function (r) {
          updateResult(prefix + '-international', true, r.ip + ' · ' + r.latency + 'ms', 20, true, r.latency);
          return r.ip;
        }).catch(function () {
          updateResult(prefix + '-international', false, t('status.connectFailed'), 0);
          return null;
        });

        const googlePromise = checkReachable(googleUrl, 5000).then(function (r) {
          const msg = r.ok
            ? t('status.reachable') + (r.latency != null ? ' · ' + r.latency + 'ms' : '')
            : t('status.unreachable');
          updateResult(prefix + '-google', r.ok, msg, r.ok ? 20 : 0, false, r.latency);
        });

        const ip = (await domesticPromise) || (await overseasPromise);
        await googlePromise;

        if (ip) {
          updateResult(prefix + '-address', true, ip, 20, true);
          updateResult(prefix + '-dns', true, t('status.supported'), 20);
          try {
            const asnData = await getASNInfo(ip);
            updateResult(prefix + '-asn-code', true, asnData.ASN || t('status.unknown'), 0, true);
            updateResult(prefix + '-asn-isp', true, asnData.as_info || t('status.unknown'), 0);
          } catch (e) {
            updateResult(prefix + '-asn-code', false, t('status.unknown'), 0);
            updateResult(prefix + '-asn-isp', false, t('status.unknown'), 0);
          }
        } else {
          updateResult(prefix + '-address', false, t('status.getFailed'), 0);
          updateResult(prefix + '-dns', false, t('status.dnsFail'), 0);
          updateResult(prefix + '-asn-code', false, t('status.queryFailed'), 0);
          updateResult(prefix + '-asn-isp', false, t('status.queryFailed'), 0);
        }
      }

      async function fetchOutboundIP(url) {
        const controller = new AbortController();
        const timer = setTimeout(function () { controller.abort(); }, 8000);
        try {
          const resp = await fetch(url, {
            method: 'GET',
            cache: 'no-cache',
            signal: controller.signal
          });
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          const text = (await resp.text()).trim();
          const v6 = text.match(/((?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4})/);
          if (v6) return v6[1];
          const m = text.match(/(\d{1,3}(?:\.\d{1,3}){3})/);
          return m ? m[1] : null;
        } catch (e) {
          return null;
        } finally {
          clearTimeout(timer);
        }
      }

      function setOutboundIP(elId, ip) {
        const el = document.getElementById(elId);
        if (!el) return;
        el.innerHTML = ip
          ? '<span class="dot ok"></span><span class="val-text mono">' + escapeHtml(ip) + '</span>'
          : '<span class="dot bad"></span><span class="val-text">' + escapeHtml(t('status.getFailed')) + '</span>';
      }

      async function updateOutboundIPs() {
        const sources = [
          { url: 'https://checkip.amazonaws.com/', el: 'ipv4-aws-ip' },
          { url: 'https://api.ip.sb/ip', el: 'ipv4-ipsb-ip' },
          { url: 'https://icanhazip.com/', el: 'ipv4-icanhazip-ip' },
          { url: 'https://api6.ipify.org/', el: 'ipv6-ipify-ip' },
          { url: 'https://v6.ident.me/', el: 'ipv6-identme-ip' },
          { url: 'https://ipv6.icanhazip.com/', el: 'ipv6-icanhazip-ip' }
        ];
        await Promise.all(sources.map(function (s) {
          return fetchOutboundIP(s.url).then(function (ip) { setOutboundIP(s.el, ip); });
        }));
      }

      async function runTests() {
        completedTests = 0;
        ipv4Score = 0;
        ipv6Score = 0;
        allTestIds.forEach(setTesting);
        updateProgress();
        updateScores();
        await Promise.all([runVersionTests(4), runVersionTests(6), updateOutboundIPs()]);
        updateProgress();
        updateScores();
      }

      document.getElementById('refresh-btn').addEventListener('click', runTests);

      /* ---------- 初始化 ---------- */
      // 优先使用已保存的主题设置，否则根据系统暗黑模式偏好自动检测
      let savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', savedTheme);
      applyLanguage();
      runTests();
    })();
  </script>
</body>
</html>
`;

export const CHECK_HTML: string = String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>检测我的IP质量</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛡️</text></svg>" type="image/svg+xml">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Noto+Emoji:wght@400&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/flag-icons@6.6.6/css/flag-icons.min.css">
    <style>
        :root {
            --bg: #070b14;
            --bg-soft: #0b1220;
            --surface: rgba(255, 255, 255, 0.03);
            --surface-hover: rgba(255, 255, 255, 0.06);
            --border: rgba(255, 255, 255, 0.08);
            --border-strong: rgba(255, 255, 255, 0.14);
            --text: #f2f6fc;
            --text-2: #9aa8bd;
            --text-3: #5c6b82;
            --accent: #38bdf8;
            --accent-2: #6366f1;
            --green: #34d399;
            --yellow: #fbbf24;
            --red: #fb7185;
            --card-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            --header-bg: rgba(10, 15, 28, 0.72);
            --font-head: 'Space Grotesk', sans-serif;
            --font-body: 'DM Sans', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }
        :root[data-theme='light'] {
            --bg: #f4f7fb;
            --bg-soft: #ffffff;
            --surface: rgba(15, 23, 42, 0.03);
            --surface-hover: rgba(15, 23, 42, 0.06);
            --border: rgba(15, 23, 42, 0.09);
            --border-strong: rgba(15, 23, 42, 0.16);
            --text: #0f172a;
            --text-2: #475569;
            --text-3: #94a3b8;
            --accent: #0284c7;
            --accent-2: #4f46e5;
            --green: #059669;
            --yellow: #d97706;
            --red: #e11d48;
            --card-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
            --header-bg: rgba(255, 255, 255, 0.72);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: var(--font-body);
            background: var(--bg);
            color: var(--text);
            min-height: 100vh;
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            transition: background 0.4s ease, color 0.4s ease;
            overflow-x: hidden;
        }

        .bg {
            position: fixed; inset: 0; z-index: -2; pointer-events: none;
            background:
                radial-gradient(1200px 600px at 50% -10%, rgba(56, 189, 248, 0.13), transparent 60%),
                radial-gradient(900px 500px at 90% 110%, rgba(99, 102, 241, 0.13), transparent 60%);
            transition: opacity 0.4s ease;
        }
        :root[data-theme='light'] .bg { opacity: 0.55; }
        .bg-grid {
            position: fixed; inset: 0; z-index: -1; pointer-events: none;
            background-image:
                linear-gradient(var(--border) 1px, transparent 1px),
                linear-gradient(90deg, var(--border) 1px, transparent 1px);
            background-size: 56px 56px;
            mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
            -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
            opacity: 0.5;
        }

        .app { max-width: 1080px; margin: 0 auto; padding: 0 24px 64px; }

        /* 顶部工具条 */
        .topbar {
            position: fixed; top: 20px; right: 28px; z-index: 50;
            display: flex; align-items: center; gap: 10px;
        }
        .icon-btn {
            display: inline-flex; align-items: center; justify-content: center;
            height: 40px; width: 40px; border-radius: 12px;
            border: 1px solid var(--border); background: var(--header-bg);
            backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
            color: var(--text-2); cursor: pointer; transition: all 0.25s ease;
        }
        .icon-btn:hover { border-color: var(--border-strong); color: var(--text); transform: translateY(-1px); }
        .icon-btn svg { width: 19px; height: 19px; }
        .theme-toggle .sun { display: none; }
        :root[data-theme='light'] .theme-toggle .sun { display: block; }
        :root[data-theme='light'] .theme-toggle .moon { display: none; }

        .lang-switch {
            display: flex; align-items: center; height: 40px; padding: 3px;
            border-radius: 12px; border: 1px solid var(--border); background: var(--header-bg);
            backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
        }
        .lang-btn {
            height: 32px; padding: 0 12px; border: none; border-radius: 9px;
            background: transparent; color: var(--text-2);
            font-family: var(--font-head); font-size: 13px; font-weight: 600;
            cursor: pointer; transition: all 0.25s ease;
        }
        .lang-btn.active { background: var(--accent); color: #04121f; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35); }
        :root[data-theme='light'] .lang-btn.active { color: #ffffff; }

        /* 页头 */
        .header { padding: 108px 0 32px; text-align: center; animation: fadeUp 0.7s ease both; }
        .logo {
            display: inline-flex; align-items: center; justify-content: center;
            width: 64px; height: 64px; border-radius: 18px; margin-bottom: 24px;
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            box-shadow: 0 10px 30px rgba(56, 189, 248, 0.35); color: #04121f;
        }
        :root[data-theme='light'] .logo { color: #ffffff; }
        .logo svg { width: 30px; height: 30px; }
        .header h1 {
            font-family: var(--font-head); font-size: clamp(1.9rem, 4.5vw, 2.8rem);
            font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
            background: linear-gradient(120deg, var(--text) 30%, var(--accent));
            -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .header p { margin-top: 12px; color: var(--text-2); font-size: 16px; }
        .tabs {
            display: inline-flex; align-items: center; gap: 4px; padding: 5px;
            margin-top: 22px; border-radius: 14px; border: 1px solid var(--border);
            background: var(--surface); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .tab {
            display: inline-flex; align-items: center; gap: 8px; padding: 9px 22px;
            border-radius: 10px; border: none; background: transparent; color: var(--text-2);
            font-family: var(--font-head); font-size: 14px; font-weight: 600;
            text-decoration: none; cursor: pointer; transition: all 0.25s ease;
        }
        .tab:hover { color: var(--text); }
        .tab.active {
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: #04121f; box-shadow: 0 6px 18px rgba(56, 189, 248, 0.35);
        }
        :root[data-theme='light'] .tab.active { color: #ffffff; }
        .tab svg { width: 16px; height: 16px; }

        /* 进度 */
        .progress { max-width: 620px; margin: 0 auto 24px; animation: fadeUp 0.7s ease 0.1s both; }
        .progress-track { height: 5px; border-radius: 99px; background: var(--surface-hover); overflow: hidden; }
        .progress-fill {
            height: 100%; width: 0%; border-radius: 99px;
            background: linear-gradient(90deg, var(--accent), var(--accent-2));
            transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
            box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
        }
        .progress-text { margin-top: 10px; text-align: center; font-family: var(--font-mono); font-size: 12.5px; color: var(--text-3); }

        /* 搜索栏 */
        .searchbar {
            display: flex; gap: 10px; align-items: center; margin-bottom: 26px;
            padding: 14px; border-radius: 18px; background: var(--surface);
            border: 1px solid var(--border); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            animation: fadeUp 0.7s ease 0.15s both;
        }
        .searchbar input[type="text"] {
            flex: 1; min-width: 0; padding: 12px 16px; border: 1px solid var(--border);
            border-radius: 12px; background: var(--bg-soft); color: var(--text);
            font-family: var(--font-mono); font-size: 14px; transition: border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .searchbar input[type="text"]::placeholder { color: var(--text-3); }
        .searchbar input[type="text"]:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.18); }
        .version-switch {
            display: flex; gap: 4px; padding: 4px; border-radius: 10px;
            background: var(--bg-soft); border: 1px solid var(--border);
        }
        .version-btn {
            padding: 7px 16px; border: none; border-radius: 7px; background: transparent;
            color: var(--text-2); font-family: var(--font-head); font-size: 13px;
            font-weight: 600; cursor: pointer; transition: all 0.25s ease; white-space: nowrap;
        }
        .version-btn:hover { color: var(--text); }
        .version-btn.active {
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: #04121f; box-shadow: 0 3px 10px rgba(56, 189, 248, 0.3);
        }
        :root[data-theme='light'] .version-btn.active { color: #ffffff; }
        .btn-primary {
            display: inline-flex; align-items: center; gap: 8px; padding: 12px 24px;
            border: none; border-radius: 12px; font-family: var(--font-head); font-size: 14.5px;
            font-weight: 600; color: #04121f; background: linear-gradient(135deg, var(--accent), var(--accent-2));
            cursor: pointer; box-shadow: 0 8px 22px rgba(56, 189, 248, 0.32);
            transition: transform 0.25s ease, box-shadow 0.25s ease; white-space: nowrap;
        }
        :root[data-theme='light'] .btn-primary { color: #ffffff; }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(56, 189, 248, 0.42); }
        .btn-primary:active { transform: translateY(0); }
        .status {
            display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px;
            border-radius: 999px; font-weight: 600; font-size: 13px; border: 1px solid var(--border);
            color: var(--text-2); white-space: nowrap;
        }
        .status.success { color: var(--green); border-color: rgba(52, 211, 153, 0.35); background: rgba(52, 211, 153, 0.1); }
        .status.error { color: var(--red); border-color: rgba(251, 113, 133, 0.35); background: rgba(251, 113, 133, 0.1); }
        .status.testing { color: var(--yellow); border-color: rgba(251, 191, 36, 0.35); background: rgba(251, 191, 36, 0.1); }
        .status.pending { color: var(--text-3); }

        /* 卡片 */
        .card {
            border: 1px solid var(--border); border-radius: 20px; padding: 26px; margin-bottom: 22px;
            background: var(--surface); box-shadow: var(--card-shadow);
            backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
            animation: fadeUp 0.7s ease both; transition: border-color 0.3s ease;
        }
        .card:hover { border-color: var(--border-strong); }
        .card-head {
            display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
            padding-bottom: 16px; border-bottom: 1px solid var(--border);
        }
        .card-head .h2-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(99, 102, 241, 0.12));
            color: var(--accent); font-size: 17px;
        }
        .card-head h2 { font-family: var(--font-head); font-size: 1.08rem; font-weight: 700; letter-spacing: -0.01em; }

        /* ===== 概览卡 ===== */
        .overview-top {
            display: flex; align-items: center; justify-content: space-between; gap: 24px;
            padding: 20px 24px; border-radius: 16px;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(99, 102, 241, 0.06));
            border: 1px solid var(--border); margin-bottom: 22px; flex-wrap: wrap;
        }
        .ip-hero { display: flex; align-items: center; gap: 16px; min-width: 0; flex: 1; }
        .ip-flag { font-size: 42px; line-height: 1; flex-shrink: 0; }
        .ip-hero-body { min-width: 0; }
        .ip-hero-label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-3); font-weight: 600; }
        .ip-hero-value {
            display: flex; align-items: center; gap: 12px;
            font-family: var(--font-mono); font-size: clamp(1.4rem, 3.5vw, 2rem); font-weight: 600;
            color: var(--text); line-height: 1.3; word-break: break-all; letter-spacing: -0.02em;
        }
        .ip-hero-meta { font-size: 13px; color: var(--text-2); margin-top: 4px; }
        .ip-hero-meta .sep { color: var(--text-3); margin: 0 6px; }
        
        /* 综合评分环 */
        .overview-score-ring {
            position: relative; width: 110px; height: 110px; flex-shrink: 0;
        }
        .overview-score-ring svg { transform: rotate(-90deg); }
        .overview-score-ring .ring-bg {
            fill: none; stroke: var(--border); stroke-width: 8;
        }
        .overview-score-ring .ring-fg {
            fill: none; stroke-width: 8; stroke-linecap: round;
            transition: stroke-dashoffset 1s ease, stroke 0.5s ease;
        }
        .overview-score-ring .ring-fg.score-excellent { stroke: #6EE7B7; }
        .overview-score-ring .ring-fg.score-good { stroke: #38BDF8; }
        .overview-score-ring .ring-fg.score-fair { stroke: #FBBF24; }
        .overview-score-ring .ring-fg.score-poor { stroke: #FB7185; }
        .overview-score-text {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            text-align: center;
        }
        .overview-score-num {
            font-size: 28px; font-weight: 700; line-height: 1;
            background: linear-gradient(135deg, var(--accent), #6366F1);
            -webkit-background-clip: text; background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .overview-score-label {
            font-size: 10px; color: var(--text-3); text-transform: uppercase;
            letter-spacing: 0.06em; margin-top: 4px; font-weight: 600;
        }
        
        /* 复制按钮 - 图标样式 */
        .copy-icon {
            display: inline-flex; align-items: center; justify-content: center;
            width: 28px; height: 28px; border-radius: 8px; background: var(--surface-hover);
            border: 1px solid var(--border); color: var(--text-3); cursor: pointer;
            transition: all 0.2s ease; flex-shrink: 0; vertical-align: middle;
        }
        .copy-icon:hover { 
            border-color: var(--accent); color: var(--accent); 
            background: rgba(56, 189, 248, 0.08); transform: translateY(-1px);
        }
        .copy-icon.copied { 
            border-color: var(--green); color: var(--green); 
            background: rgba(110, 231, 183, 0.08);
        }
        .copy-icon svg { width: 14px; height: 14px; }
        
        /* 复制按钮 - 带文本样式（保留用于特殊场景）*/
        .copy-btn {
            display: inline-flex; align-items: center; gap: 6px; padding: 8px 14px;
            border: 1px solid var(--border); border-radius: 10px; background: transparent;
            color: var(--text-2); font-size: 12.5px; font-weight: 600; cursor: pointer;
            transition: all 0.25s ease; font-family: var(--font-body); flex-shrink: 0;
        }
        .copy-btn:hover { border-color: var(--accent); color: var(--accent); }
        .copy-btn.copied { border-color: var(--green); color: var(--green); }
        .copy-btn svg { width: 14px; height: 14px; }

        .overview-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 18px;
        }
        .stat {
            padding: 14px 16px; border-radius: 12px; background: var(--surface-hover);
            border: 1px solid var(--border);
        }
        .stat-label { font-size: 11.5px; color: var(--text-3); font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
        .stat-value { 
            display: flex; align-items: center; gap: 8px; justify-content: space-between;
            font-size: 14.5px; color: var(--text); font-weight: 600; margin-top: 4px; 
            word-break: break-word; font-family: var(--font-mono); 
        }

        .type-chips { display: flex; flex-wrap: wrap; gap: 10px; }
        .chip {
            display: inline-flex; align-items: center; gap: 7px; padding: 7px 14px;
            border-radius: 999px; border: 1px solid var(--border); background: var(--surface);
            font-size: 13px; font-weight: 600; color: var(--text-2);
        }
        .chip .chip-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--text-3); flex-shrink: 0; }
        .chip.ok { color: var(--green); border-color: rgba(52, 211, 153, 0.3); background: rgba(52, 211, 153, 0.08); }
        .chip.ok .chip-dot { background: var(--green); box-shadow: 0 0 8px rgba(52, 211, 153, 0.6); }
        .chip.bad { color: var(--red); border-color: rgba(251, 113, 133, 0.3); background: rgba(251, 113, 133, 0.08); }
        .chip.bad .chip-dot { background: var(--red); box-shadow: 0 0 8px rgba(251, 113, 133, 0.6); }
        .chip.muted { color: var(--text-3); }

        /* ===== 键值对卡片 ===== */
        .kv-grid {
            display: grid; gap: 12px;
            grid-template-columns: repeat(4, minmax(0, 1fr));
        }
        .kv-grid.col-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .kv-grid.col-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .kv-grid.col-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .kv-grid.col-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        .kv-grid.col-6 { grid-template-columns: repeat(6, minmax(0, 1fr)); }
        .kv {
            padding: 11px 14px; border-radius: 12px; background: var(--surface-hover);
            border: 1px solid var(--border); min-width: 0; overflow: hidden;
            transition: border-color 0.25s ease, background 0.25s ease;
        }
        .kv:hover { border-color: var(--border-strong); }
        .kv-label {
            font-size: 10.5px; color: var(--text-3); font-weight: 700;
            text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px;
        }
        .kv-value {
            font-family: var(--font-mono); font-size: 13px; color: var(--text);
            white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            line-height: 1.5; display: block;
        }
        .kv-value.wrap {
            white-space: normal; word-break: break-word; overflow-wrap: anywhere;
        }
        .kv-value.ok { color: var(--green); font-weight: 600; }
        .kv-value.bad { color: var(--red); font-weight: 600; }
        .kv-value.muted, .kv-value.failed { color: var(--text-3); }
        /* 列宽覆盖 */
        .kv.span-2 { grid-column: span 2; }
        .kv.span-3 { grid-column: span 3; }
        .kv.span-4 { grid-column: span 4; }
        .kv.span-5 { grid-column: span 5; }
        .kv.span-6 { grid-column: span 6; }
        @media (max-width: 1024px) {
            .kv-grid.col-6, .kv-grid.col-5 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
            .kv.span-5, .kv.span-6 { grid-column: span 4; }
            .flag-chips.col-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
            .kv-grid, .kv-grid.col-2, .kv-grid.col-3,
            .kv-grid.col-4, .kv-grid.col-5, .kv-grid.col-6 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
            .kv.span-2, .kv.span-3, .kv.span-4, .kv.span-5, .kv.span-6 { grid-column: span 2; }
            .flag-chips, .flag-chips.col-4, .flag-chips.col-5 {
                grid-template-columns: repeat(3, minmax(0, 1fr));
            }
        }
        @media (max-width: 480px) {
            .kv-grid, .kv-grid.col-2, .kv-grid.col-3,
            .kv-grid.col-4, .kv-grid.col-5, .kv-grid.col-6 {
                grid-template-columns: 1fr;
            }
            .flag-chips, .flag-chips.col-4, .flag-chips.col-5 {
                grid-template-columns: repeat(2, minmax(0, 1fr));
            }
        }

        /* ===== 属性标记 chips ===== */
        .flag-chips {
            display: grid; gap: 10px;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        }
        .flag-chips.col-5 { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        .flag-chips.col-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        .flag-chip {
            display: inline-flex; align-items: center; justify-content: space-between; gap: 8px;
            padding: 9px 14px; border-radius: 10px;
            border: 1px solid var(--border); background: var(--surface);
            font-size: 13px; color: var(--text-2); min-width: 0;
            transition: border-color 0.25s ease;
        }
        .flag-chip:hover { border-color: var(--border-strong); }
        .flag-chip .flabel { color: var(--text-2); }
        .flag-chip .fvalue { display: inline-flex; align-items: center; gap: 7px; font-weight: 700; }
        .flag-chip .fvalue::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--text-3); flex-shrink: 0; }
        .flag-chip .fvalue.ok { color: var(--green); }
        .flag-chip .fvalue.ok::before { background: var(--green); box-shadow: 0 0 8px rgba(52, 211, 153, 0.6); }
        .flag-chip .fvalue.bad { color: var(--red); }
        .flag-chip .fvalue.bad::before { background: var(--red); box-shadow: 0 0 8px rgba(251, 113, 133, 0.6); }
        .flag-chip .fvalue.muted { color: var(--text-3); }

        /* ===== 综合风险分数 ===== */
        .overall-score {
            display: flex; align-items: center; justify-content: center; gap: 32px;
            padding: 24px; margin-bottom: 24px; border-radius: 16px;
            background: linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.05));
            border: 1px solid var(--border);
        }
        .overall-ring {
            position: relative; width: 140px; height: 140px; flex-shrink: 0;
        }
        .overall-ring svg { transform: rotate(-90deg); }
        .overall-ring circle {
            fill: none; stroke-width: 12; stroke-linecap: round;
            transition: stroke-dashoffset 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .overall-ring .ring-bg { stroke: var(--surface-hover); }
        .overall-ring .ring-fg { stroke: var(--accent); }
        .overall-ring .ring-fg.low { stroke: var(--green); }
        .overall-ring .ring-fg.mid { stroke: var(--yellow); }
        .overall-ring .ring-fg.high { stroke: var(--red); }
        .overall-ring-text {
            position: absolute; inset: 0; display: flex; flex-direction: column;
            align-items: center; justify-content: center; gap: 2px;
        }
        .overall-ring-score {
            font-family: var(--font-mono); font-size: 36px; font-weight: 700;
            color: var(--text); line-height: 1; letter-spacing: -0.02em;
        }
        .overall-ring-label {
            font-size: 11px; color: var(--text-3); font-weight: 600;
            text-transform: uppercase; letter-spacing: 0.06em;
        }
        .overall-meta { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
        .overall-level {
            font-family: var(--font-head); font-size: 22px; font-weight: 700;
            color: var(--text); letter-spacing: -0.01em;
        }
        .overall-desc {
            font-size: 13.5px; color: var(--text-2); line-height: 1.6;
            max-width: 360px;
        }

        /* ===== 风险评分进度条 ===== */
        .score-list { display: flex; flex-direction: column; }
        .score-row {
            display: grid; grid-template-columns: 140px 1fr 74px 110px; gap: 16px;
            align-items: center; padding: 12px 0; border-bottom: 1px dashed var(--border);
        }
        .score-row:last-child { border-bottom: none; }
        .score-name { font-size: 13.5px; font-weight: 600; color: var(--text-2); font-family: var(--font-head); }
        .score-bar { height: 8px; border-radius: 99px; background: var(--surface-hover); overflow: hidden; }
        .score-bar-fill { height: 100%; width: 0%; border-radius: 99px; transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
        .score-bar-fill.low { background: linear-gradient(90deg, #34d399, #38bdf8); }
        .score-bar-fill.mid { background: linear-gradient(90deg, #fbbf24, #fb923c); }
        .score-bar-fill.high { background: linear-gradient(90deg, #fb7185, #f43f5e); }
        .score-bar-fill.na { background: var(--text-3); opacity: 0.4; }
        .score-num { font-family: var(--font-mono); font-size: 13.5px; color: var(--text); text-align: right; font-weight: 600; }
        .score-risk { font-size: 12.5px; font-weight: 600; text-align: left; padding: 3px 10px; border-radius: 999px; }
        .score-risk.ok { color: var(--green); background: rgba(52, 211, 153, 0.1); }
        .score-risk.warn { color: var(--yellow); background: rgba(251, 191, 36, 0.1); }
        .score-risk.bad { color: var(--red); background: rgba(251, 113, 133, 0.1); }
        .score-risk.muted { color: var(--text-3); background: var(--surface-hover); }

        /* 类型徽章 */
        .type-badge { display: inline-block; padding: 2px 10px; border-radius: 6px; font-weight: 700; font-size: 12px; color: #fff; }
        .type-badge.type-hosting { background: #e11d48; }
        .type-badge.type-business { background: #d97706; }
        .type-badge.type-isp { background: #059669; }
        .type-badge.type-education { background: #2563eb; }
        .type-badge.type-government { background: #7c3aed; }
        .type-badge.type-unknown { background: #64748b; }

        /* ===== 表格 ===== */
        .sub-title {
            color: var(--text-2); font-weight: 700; font-size: 12.5px; margin: 22px 0 10px;
            font-family: var(--font-head); display: flex; align-items: center; gap: 8px;
            text-transform: uppercase; letter-spacing: 0.08em;
        }
        .sub-title:first-child { margin-top: 0; }
        .sub-title::before {
            content: ''; width: 4px; height: 16px; border-radius: 2px;
            background: linear-gradient(180deg, var(--accent), var(--accent-2));
            box-shadow: 0 0 8px rgba(56, 189, 248, 0.45);
        }

        .table-wrap { overflow-x: auto; border: 1px solid var(--border); border-radius: 12px; }
        table { width: 100%; border-collapse: collapse; font-size: 13px; }
        th, td { padding: 11px 14px; border-bottom: 1px solid var(--border); text-align: center; white-space: normal; overflow-wrap: anywhere; word-break: break-word; }
        th {
            background: rgba(56, 189, 248, 0.08); color: var(--text-2);
            font-family: var(--font-head); font-weight: 600; font-size: 12px; letter-spacing: 0.02em;
        }
        td { font-family: var(--font-mono); color: var(--text); }
        tr:last-child td { border-bottom: none; }
        tbody tr:nth-child(even) td { background: var(--surface-hover); }
        tbody tr:hover td { background: var(--surface); }
        .table-wrap.factor-table { min-width: 640px; }
        .factor-table table { min-width: 640px; }

        .ok { color: var(--green); font-weight: 600; }
        .bad { color: var(--red); font-weight: 600; }
        .warn { color: var(--yellow); font-weight: 600; }
        .muted, .failed { color: var(--text-3); }

        /* 地区旗帜 */
        #ip2locationRegion, #ipapiRegion, #ipregistryRegion, #ipqsRegion,
        #scamalyticsRegion, #ipdataRegion, #ipinfoRegion, #ipwhoisRegion {
            font-family: "Noto Emoji", "Apple Color Emoji", "Segoe UI Emoji", sans-serif;
        }
        .fi { vertical-align: -0.1em; margin-right: 6px; }

        .map-container { margin-top: 4px; }
        .map-container iframe { width: 100%; height: 320px; border: 0; border-radius: 14px; display: block; }

        /* ===== 媒体可达性 ===== */
        .media-grid {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
        }
        @media (max-width: 960px) { .media-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 600px) { .media-grid { grid-template-columns: repeat(2, 1fr); } }
        .media-item {
            display: flex; align-items: center; justify-content: space-between; gap: 10px;
            padding: 12px 16px; border-radius: 12px; border: 1px solid var(--border);
            background: var(--surface-hover); transition: border-color 0.3s ease;
        }
        .media-item:hover { border-color: var(--border-strong); }
        .media-name { font-size: 13.5px; font-weight: 600; color: var(--text-2); white-space: nowrap; }
        .media-status {
            font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
            white-space: nowrap; flex-shrink: 0;
        }
        .media-status.ok {
            color: var(--green); background: rgba(52, 211, 153, 0.12);
            border: 1px solid rgba(52, 211, 153, 0.3);
        }
        .media-status.bad {
            color: var(--red); background: rgba(251, 113, 133, 0.12);
            border: 1px solid rgba(251, 113, 133, 0.3);
        }
        .media-status.pending {
            color: var(--text-3); background: var(--surface);
            border: 1px solid var(--border);
        }

        /* ===== IP 版本切换 ===== */
        .version-switch {
            display: inline-flex; align-items: center; gap: 4px; padding: 4px;
            border-radius: 10px; border: 1px solid var(--border);
            background: var(--surface); margin-left: 12px;
        }
        .version-btn {
            padding: 6px 16px; border-radius: 7px; border: none; background: transparent;
            color: var(--text-2); font-size: 13px; font-weight: 600;
            font-family: var(--font-head); cursor: pointer; transition: all 0.25s ease;
        }
        .version-btn:hover { color: var(--text); }
        .version-btn.active {
            background: linear-gradient(135deg, var(--accent), var(--accent-2));
            color: #04121f; box-shadow: 0 4px 12px rgba(56, 189, 248, 0.3);
        }
        :root[data-theme='light'] .version-btn.active { color: #ffffff; }

        .link-icon { margin-left: 6px; text-decoration: none; color: var(--accent); font-size: 0.9em; }
        .link-icon:hover { text-decoration: underline; }
        a { color: var(--accent); text-decoration: none; font-weight: 600; }
        a:hover { text-decoration: underline; }

        .loading {
            display: inline-block; width: 13px; height: 13px;
            border: 2px solid var(--border-strong); border-top: 2px solid var(--accent);
            border-radius: 50%; animation: spin 0.8s linear infinite; vertical-align: middle;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }

        /* 媒体可达 */
        .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
        .media-item {
            display: flex; align-items: center; justify-content: space-between; gap: 8px;
            padding: 12px 14px; border-radius: 12px; background: var(--surface-hover);
            border: 1px solid var(--border);
        }
        .media-name { font-size: 13.5px; font-weight: 600; color: var(--text); }
        .media-status { font-size: 12.5px; font-weight: 600; padding: 3px 10px; border-radius: 999px; }
        .media-status.ok { color: var(--green); background: rgba(52, 211, 153, 0.1); }
        .media-status.warn { color: var(--yellow); background: rgba(251, 191, 36, 0.1); }
        .media-status.slow { color: var(--red); background: rgba(251, 113, 133, 0.1); }
        .media-status.bad { color: var(--red); background: rgba(251, 113, 133, 0.1); }
        .media-status.testing { color: var(--yellow); background: rgba(251, 191, 36, 0.1); }
        .media-status.pending { color: var(--text-3); background: var(--surface); }

        footer {
            margin-top: 40px; text-align: center; color: var(--text-3); font-size: 13px;
            display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; padding: 20px;
            animation: fadeUp 0.7s ease 0.4s both;
        }
        footer a { display: inline-flex; align-items: center; gap: 8px; color: var(--text-2); font-weight: 600; }
        footer a:hover { color: var(--text); }
        footer svg { width: 18px; height: 18px; fill: currentColor; }

        @media (max-width: 768px) {
            .topbar { top: 14px; right: 16px; }
            .header { padding-top: 96px; }
            .card { padding: 20px; }
            .overview-top { padding: 16px; }
            .overview-grid { grid-template-columns: repeat(2, 1fr); }
            .score-row { grid-template-columns: 90px 1fr 58px; grid-template-rows: auto auto; gap: 6px 12px; }
            .score-risk { grid-column: 1 / -1; text-align: center; }
            .searchbar { flex-direction: column; align-items: stretch; }
            .searchbar input[type="text"] { width: 100%; }
            .status { justify-content: center; }
        }
    </style>
</head>
<body>
<div class="bg"></div>
<div class="bg-grid"></div>

<div class="topbar">
    <div class="lang-switch">
        <button class="lang-btn active" data-lang="zh">中</button>
        <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换主题">
        <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
</div>

<div class="app">
    <header class="header">
        <div class="logo">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
        </div>
        <h1 data-i18n="header.title">检测我的IP质量</h1>
        <p data-i18n="header.desc">全面检测您的IP地址质量、风险评分和各项服务可用性</p>
        <nav class="tabs">
            <a href="/" class="tab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                <span data-i18n="nav.ip">获取IP地址</span>
            </a>
            <a href="/check" class="tab active">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
                <span data-i18n="nav.quality">IP质量检测</span>
            </a>
            <a href="/speed" class="tab">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 12l5-5"/><circle cx="12" cy="12" r="1.5"/></svg>
                <span data-i18n="nav.speed">网速测试</span>
            </a>
        </nav>
    </header>

    <div class="progress">
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
        <div class="progress-text" id="progressText" data-i18n="progress.preparing">准备开始检测...</div>
    </div>

    <div class="searchbar">
        <input id="ipInput" type="text" data-i18n-placeholder="input.placeholder" placeholder="输入要检测的 IP（留空使用自动获取）"/>
        <div class="version-switch">
            <button class="version-btn active" data-version="4" data-i18n="version.ipv4">IPv4</button>
            <button class="version-btn" data-version="6" data-i18n="version.ipv6">IPv6</button>
        </div>
        <button id="runBtn" class="btn-primary" data-i18n="btn.run">开始检测</button>
        <span id="status" class="status pending" data-i18n="status.ready">就绪</span>
    </div>

    <!-- 概览 -->
    <section class="card" id="overview">
        <div class="overview-top">
            <div class="ip-hero">
                <span class="ip-flag" id="overviewFlag">🌍</span>
                <div class="ip-hero-body">
                    <div class="ip-hero-label" data-i18n="label.ip">访问 IP</div>
                    <div class="ip-hero-value">
                        <span id="ip">--</span>
                        <button class="copy-icon" id="copyIp" title="复制IP地址">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                    </div>
                    <div class="ip-hero-meta">
                        <span id="asn">--</span>
                        <button class="copy-icon" data-copy="asn" title="复制ASN" style="width: 24px; height: 24px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                        <span class="sep">·</span>
                        <span id="org">--</span>
                        <button class="copy-icon" data-copy="org" title="复制组织" style="width: 24px; height: 24px;">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div class="overview-score-ring">
                <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle class="ring-bg" cx="55" cy="55" r="48" stroke-dasharray="301.59" stroke-dashoffset="0"/>
                    <circle class="ring-fg" id="overviewScoreRing" cx="55" cy="55" r="48" stroke-dasharray="301.59" stroke-dashoffset="301.59"/>
                </svg>
                <div class="overview-score-text">
                    <div class="overview-score-num" id="overviewScoreNum">--</div>
                    <div class="overview-score-label" data-i18n="label.overallQuality">综合质量</div>
                </div>
            </div>
        </div>
        <div class="overview-grid">
            <div class="stat">
                <div class="stat-label" data-i18n="label.city">城市</div>
                <div class="stat-value">
                    <span id="city">--</span>
                    <button class="copy-icon" data-copy="city" title="复制城市">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                </div>
            </div>
            <div class="stat">
                <div class="stat-label" data-i18n="label.timezone">时区</div>
                <div class="stat-value">
                    <span id="timezone">--</span>
                    <button class="copy-icon" data-copy="timezone" title="复制时区">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                </div>
            </div>
            <div class="stat">
                <div class="stat-label" data-i18n="label.coords">坐标</div>
                <div class="stat-value">
                    <span id="coords">--</span>
                    <button class="copy-icon" data-copy="coords" title="复制坐标">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                </div>
            </div>
            <div class="stat">
                <div class="stat-label" data-i18n="label.postal">邮编</div>
                <div class="stat-value">
                    <span id="postal">--</span>
                    <button class="copy-icon" data-copy="postal" title="复制邮编">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <div class="type-chips">
            <span class="chip muted" id="ipType"><span class="chip-dot"></span><span data-i18n="label.ipType">机房IP</span></span>
            <span class="chip muted" id="isVPN"><span class="chip-dot"></span><span data-i18n="label.vpn">VPN</span></span>
            <span class="chip muted" id="isProxy"><span class="chip-dot"></span><span data-i18n="label.proxy">代理</span></span>
            <span class="chip muted" id="isTor"><span class="chip-dot"></span><span data-i18n="label.tor">Tor</span></span>
            <span class="chip muted" id="isAnycast"><span class="chip-dot"></span><span data-i18n="label.anycast">任播IP</span></span>
            <span class="chip muted" id="isMobile"><span class="chip-dot"></span><span data-i18n="label.mobile">移动IP</span></span>
            <span class="chip muted" id="isAnonymous"><span class="chip-dot"></span><span data-i18n="label.anonymous">匿名IP</span></span>
            <span class="chip muted" id="isSatellite"><span class="chip-dot"></span><span data-i18n="label.satellite">卫星IP</span></span>
        </div>
    </section>

    <!-- 风险评分 -->
    <section class="card" id="risk-scores">
        <div class="card-head"><span class="h2-icon">📊</span><h2 data-i18n="sub.riskScore">IP 风险评分</h2></div>
        
        <!-- 综合评分 -->
        <div class="overall-score">
            <div class="overall-ring">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle class="ring-bg" cx="70" cy="70" r="58" stroke-dasharray="364.42" stroke-dashoffset="0"/>
                    <circle class="ring-fg" id="overallRing" cx="70" cy="70" r="58" stroke-dasharray="364.42" stroke-dashoffset="364.42"/>
                </svg>
                <div class="overall-ring-text">
                    <div class="overall-ring-score" id="overallScore">--</div>
                    <div class="overall-ring-label" data-i18n="label.overall">综合评分</div>
                </div>
            </div>
            <div class="overall-meta">
                <div class="overall-level" id="overallLevel" data-i18n="level.calculating">计算中...</div>
                <div class="overall-desc" id="overallDesc" data-i18n="desc.overall">基于 9 个数据源的综合风险评估</div>
            </div>
        </div>

        <div class="score-list">
            <div class="score-row" data-source="ip2location"><div class="score-name">IP2Location</div><div class="score-bar"><div class="score-bar-fill" id="ip2locationBar"></div></div><div class="score-num" id="ip2locationScore">--</div><div class="score-risk muted" id="ip2locationRisk">--</div></div>
            <div class="score-row" data-source="scamalytics"><div class="score-name">SCAMALYTICS</div><div class="score-bar"><div class="score-bar-fill" id="scamalyticsBar"></div></div><div class="score-num" id="scamalyticsScore">--</div><div class="score-risk muted" id="scamalyticsRisk">--</div></div>
            <div class="score-row" data-source="ipapi"><div class="score-name">ipapi</div><div class="score-bar"><div class="score-bar-fill" id="ipapiBar"></div></div><div class="score-num" id="ipapiScore">--</div><div class="score-risk muted" id="ipapiRisk">--</div></div>
            <div class="score-row" data-source="abuseipdb"><div class="score-name">AbuseIPDB</div><div class="score-bar"><div class="score-bar-fill" id="abuseipdbBar"></div></div><div class="score-num" id="abuseipdbScore">--</div><div class="score-risk muted" id="abuseipdbRisk">--</div></div>
            <div class="score-row" data-source="ipqs"><div class="score-name">IPQS</div><div class="score-bar"><div class="score-bar-fill" id="ipqsBar"></div></div><div class="score-num" id="ipqsScore">--</div><div class="score-risk muted" id="ipqsRisk">--</div></div>
            <div class="score-row" data-source="cloudflare"><div class="score-name">Cloudflare</div><div class="score-bar"><div class="score-bar-fill" id="cloudflareBar"></div></div><div class="score-num" id="cloudflareScore">--</div><div class="score-risk muted" id="cloudflareRisk">--</div></div>
            <div class="score-row" data-source="dbip"><div class="score-name">DB-IP</div><div class="score-bar"><div class="score-bar-fill" id="dbipBar"></div></div><div class="score-num" id="dbipScore">--</div><div class="score-risk muted" id="dbipRisk">--</div></div>
            <div class="score-row" data-source="ipregistry"><div class="score-name">ipregistry</div><div class="score-bar"><div class="score-bar-fill" id="ipregistryBar"></div></div><div class="score-num" id="ipregistryScore">--</div><div class="score-risk muted" id="ipregistryRisk">--</div></div>
            <div class="score-row" data-source="ipinfo"><div class="score-name">IPinfo</div><div class="score-bar"><div class="score-bar-fill" id="ipinfoBar"></div></div><div class="score-num" id="ipinfoScore">--</div><div class="score-risk muted" id="ipinfoRisk">--</div></div>
        </div>
    </section>

    <!-- 风险因子 -->
    <section class="card" id="risk-factors">
        <div class="card-head"><span class="h2-icon">🛡️</span><h2 data-i18n="sub.riskFactors">IP 风险详情</h2></div>
        <div class="sub-title" data-i18n="sub.nativeDetection">IP 原生检测</div>
        <div class="table-wrap">
            <table>
                <thead><tr><th data-i18n="th.source">数据源</th><th data-i18n="th.usageType">使用类型</th><th data-i18n="th.companyType">公司类型</th></tr></thead>
                <tbody>
                    <tr><td>IPinfo</td><td id="ipinfoUsageType"></td><td id="ipinfoCompanyType"></td></tr>
                    <tr><td>ipregistry</td><td id="ipregistryUsageType"></td><td id="ipregistryCompanyType"></td></tr>
                    <tr><td>ipapi</td><td id="ipapiUsageType"></td><td id="ipapiCompanyType"></td></tr>
                </tbody>
            </table>
        </div>
        <div class="sub-title" data-i18n="th.riskFactorMatrix">风险因子矩阵</div>
        <div class="table-wrap factor-table">
            <table>
                <thead><tr><th data-i18n="th.source">数据源</th><th data-i18n="th.region">地区</th><th data-i18n="th.proxy">代理</th><th data-i18n="th.vpn">VPN</th><th data-i18n="th.tor">Tor</th><th data-i18n="th.server">服务器</th><th data-i18n="th.abuse2">滥用</th><th data-i18n="th.robot">机器人</th></tr></thead>
                <tbody>
                    <tr><td>IP2Location</td><td id="ip2locationRegion"></td><td id="ip2locationProxy"></td><td id="ip2locationVPN"></td><td id="ip2locationTor"></td><td id="ip2locationDC"></td><td id="ip2locationAbuser"></td><td id="ip2locationRobot"></td></tr>
                    <tr><td>ipapi</td><td id="ipapiRegion"></td><td id="ipapiProxy"></td><td id="ipapiVPN"></td><td id="ipapiTor"></td><td id="ipapiDC"></td><td id="ipapiAbuser"></td><td id="ipapiRobot"></td></tr>
                    <tr><td>ipregistry</td><td id="ipregistryRegion"></td><td id="ipregistryProxy"></td><td id="ipregistryVPN"></td><td id="ipregistryTor"></td><td id="ipregistryDC"></td><td id="ipregistryAbuser"></td><td id="ipregistryRobot"></td></tr>
                    <tr><td>IPQS</td><td id="ipqsRegion"></td><td id="ipqsProxy"></td><td id="ipqsVPN"></td><td id="ipqsTor"></td><td id="ipqsDC"></td><td id="ipqsAbuser"></td><td id="ipqsRobot"></td></tr>
                    <tr><td>SCAMALYTICS</td><td id="scamalyticsRegion"></td><td id="scamalyticsProxy"></td><td id="scamalyticsVPN"></td><td id="scamalyticsTor"></td><td id="scamalyticsDC"></td><td id="scamalyticsAbuser"></td><td id="scamalyticsRobot"></td></tr>
                    <tr><td>ipdata</td><td id="ipdataRegion"></td><td id="ipdataProxy"></td><td id="ipdataVPN"></td><td id="ipdataTor"></td><td id="ipdataDC"></td><td id="ipdataAbuser"></td><td id="ipdataRobot"></td></tr>
                    <tr><td>IPinfo</td><td id="ipinfoRegion"></td><td id="ipinfoProxy"></td><td id="ipinfoVPN"></td><td id="ipinfoTor"></td><td id="ipinfoDC"></td><td id="ipinfoAbuser"></td><td id="ipinfoRobot"></td></tr>
                    <tr><td>IPWHOIS</td><td id="ipwhoisRegion"></td><td id="ipwhoisProxy"></td><td id="ipwhoisVPN"></td><td id="ipwhoisTor"></td><td id="ipwhoisDC"></td><td id="ipwhoisAbuser"></td><td id="ipwhoisRobot"></td></tr>
                    <tr><td>IPPure</td><td id="ippureRegion"></td><td id="ippureProxy"></td><td id="ippureVPN"></td><td id="ippureTor"></td><td id="ippureDC"></td><td id="ippureAbuser"></td><td id="ippureRobot"></td></tr>
                </tbody>
            </table>
        </div>
    </section>

    <!-- 位置地图 -->
    <section class="card" id="location">
        <div class="card-head"><span class="h2-icon">📍</span><h2 data-i18n="sub.physical">物理位置</h2></div>
        <div class="map-container" id="mapContainer">
            <iframe id="mapFrame" width="100%" height="320" frameborder="0" style="border:0; border-radius:14px; display:none;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <div id="mapFallback" style="display:none; text-align:center; padding:60px 20px; color:var(--text-3);"></div>
        </div>
    </section>

    <!-- 网络归属 -->
    <section class="card" id="network">
        <div class="card-head"><span class="h2-icon">🏢</span><h2 data-i18n="sub.networkCenter">网络归属</h2></div>
        <div class="kv-grid col-3">
            <div class="kv span-3"><div class="kv-label" data-i18n="th.provider">提供商名称</div><div class="kv-value wrap" id="companyName">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.domain">域名</div><div class="kv-value" id="companyDomain">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.type">类型</div><div class="kv-value" id="companyTypeRow">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.network">网络</div><div class="kv-value" id="abuseNetwork">--</div></div>
            <div class="kv span-2"><div class="kv-label" data-i18n="th.contact">联系信息</div><div class="kv-value wrap" id="abuseName">--</div></div>
            <div class="kv"><div class="kv-label">Email</div><div class="kv-value" id="abuseEmail">--</div></div>
        </div>
    </section>

    <!-- IP 详细信息 -->
    <section class="card" id="ip-detail">
        <div class="card-head"><span class="h2-icon">🔍</span><h2 data-i18n="sub.detail">IP 详细信息</h2></div>

        <div class="sub-title" data-i18n="th.flags">属性标记</div>
        <div class="flag-chips col-5">
            <div class="flag-chip"><span class="flabel" data-i18n="th.bogon">保留IP</span><span class="fvalue" id="ipapiIsBogon">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.mobileNet">移动网络</span><span class="fvalue" id="ipapiIsMobile">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.satelliteNet">卫星网络</span><span class="fvalue" id="ipapiIsSatellite">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.crawler">爬虫</span><span class="fvalue" id="ipapiIsCrawler">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.datacenter">数据中心</span><span class="fvalue" id="ipapiIsDatacenter">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.tor">洋葱路由</span><span class="fvalue" id="ipapiIsTor">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.proxy">代理</span><span class="fvalue" id="ipapiIsProxy">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.vpn">VPN</span><span class="fvalue" id="ipapiIsVPN">--</span></div>
            <div class="flag-chip"><span class="flabel" data-i18n="th.abuser">滥用</span><span class="fvalue" id="ipapiIsAbuser">--</span></div>
        </div>

        <div class="sub-title" data-i18n="sub.basic">基础信息</div>
        <div class="kv-grid col-4">
            <div class="kv span-2"><div class="kv-label" data-i18n="th.name">数据中心名称</div><div class="kv-value wrap" id="ipapiDCName">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.domain">域名</div><div class="kv-value" id="ipapiDCDomain">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.type">类型</div><div class="kv-value" id="ipapiCompanyTypeDetail">--</div></div>
            <div class="kv span-2"><div class="kv-label" data-i18n="th.network">网络</div><div class="kv-value wrap" id="ipapiDCNetwork">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.riskScore">风险分</div><div class="kv-value" id="ipapiCompanyAbuserScore">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.whois">WHOIS</div><div class="kv-value" id="ipapiCompanyWhois">--</div></div>
            <div class="kv span-2"><div class="kv-label" data-i18n="th.org">滥用组织</div><div class="kv-value wrap" id="ipapiAbuseName">--</div></div>
            <div class="kv span-2"><div class="kv-label">滥用联系</div><div class="kv-value wrap" id="ipapiAbuseEmail">--</div></div>
        </div>

        <div class="sub-title" data-i18n="sub.asn">自治系统</div>
        <div class="kv-grid col-4">
            <div class="kv"><div class="kv-label">ASN</div><div class="kv-value" id="ipapiASN">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.route">路由</div><div class="kv-value" id="ipapiASNRoute">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.type">类型</div><div class="kv-value" id="ipapiASNType">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.riskScore">风险分</div><div class="kv-value" id="ipapiASNAbuserScore">--</div></div>
            <div class="kv span-2"><div class="kv-label" data-i18n="th.org">组织</div><div class="kv-value wrap" id="ipapiASNOrg">--</div></div>
            <div class="kv span-2"><div class="kv-label" data-i18n="th.desc">描述</div><div class="kv-value wrap" id="ipapiASNDescr">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.domain">域名</div><div class="kv-value" id="ipapiASNDomain">--</div></div>
            <div class="kv"><div class="kv-label">Abuse</div><div class="kv-value" id="ipapiASNAbuse">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.country">国家</div><div class="kv-value" id="ipapiASNCountry">--</div></div>
            <div class="kv"><div class="kv-label">RIR</div><div class="kv-value" id="ipapiASNRIR">--</div></div>
        </div>

        <div class="sub-title" data-i18n="sub.location">地理位置</div>
        <div class="kv-grid col-4">
            <div class="kv"><div class="kv-label" data-i18n="th.country">国家</div><div class="kv-value" id="ipapiCountry">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.state">州/省</div><div class="kv-value" id="ipapiState">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.city">城市</div><div class="kv-value" id="ipapiCity">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.zip">邮编</div><div class="kv-value" id="ipapiZip">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.latitude">纬度</div><div class="kv-value" id="ipapiLatitude">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.longitude">经度</div><div class="kv-value" id="ipapiLongitude">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.timezone">时区</div><div class="kv-value" id="ipapiTimezone">--</div></div>
            <div class="kv"><div class="kv-label" data-i18n="th.currency">货币</div><div class="kv-value" id="ipapiCurrencyCode">--</div></div>
        </div>
    </section>

    <!-- 媒体可达 -->
    <section class="card" id="media">
        <div class="card-head"><span class="h2-icon">🌐</span><h2 data-i18n="card.media">网站可达性</h2></div>
        <div class="media-grid" style="grid-template-columns: repeat(4, 1fr);">
            <div class="media-item"><span class="media-name">TikTok</span><span class="media-status pending" id="mediaTikTok">--</span></div>
            <div class="media-item"><span class="media-name">Disney+</span><span class="media-status pending" id="mediaDisney">--</span></div>
            <div class="media-item"><span class="media-name">Netflix</span><span class="media-status pending" id="mediaNetflix">--</span></div>
            <div class="media-item"><span class="media-name">YouTube</span><span class="media-status pending" id="mediaYouTube">--</span></div>
            <div class="media-item"><span class="media-name">Prime Video</span><span class="media-status pending" id="mediaPrime">--</span></div>
            <div class="media-item"><span class="media-name">Spotify</span><span class="media-status pending" id="mediaSpotify">--</span></div>
            <div class="media-item"><span class="media-name">ChatGPT</span><span class="media-status pending" id="mediaChatGPT">--</span></div>
            <div class="media-item"><span class="media-name">Steam</span><span class="media-status pending" id="mediaSteam">--</span></div>
            <div class="media-item"><span class="media-name">Telegram</span><span class="media-status pending" id="mediaTelegram">--</span></div>
            <div class="media-item"><span class="media-name">GitHub</span><span class="media-status pending" id="mediaGitHub">--</span></div>
            <div class="media-item"><span class="media-name">Wikipedia</span><span class="media-status pending" id="mediaWikipedia">--</span></div>
            <div class="media-item"><span class="media-name">Google</span><span class="media-status pending" id="mediaGoogle">--</span></div>
        </div>
    </section>

    <!-- 手动输入提示 -->
    <section class="card" id="mediaManualNotice" style="display:none">
        <div class="card-head"><span class="h2-icon">🌐</span><h2 data-i18n="card.media">网站可达性</h2></div>
        <div class="chip bad"><span class="chip-dot"></span><span data-i18n="media.unavailable">手动输入时不可用</span></div>
    </section>
</div>

<footer>
    <p class="notice" data-i18n="footer.notice">本站仅提供IP地址查询的功能，不提供其它任何服务，也不与别的网站有任何合作。</p>
    <a href="https://github.com/PIKACHUIM/IPConfigWork" target="_blank" rel="noopener noreferrer" aria-label="GitHub 仓库">
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
        <span>GitHub</span>
    </a>
</footer>

<script>
(function () {
    'use strict';

    var I18N = {
        zh: {
            'page.title': '检测我的IP质量',
            'header.title': '检测我的IP质量',
            'header.desc': '全面检测您的IP地址质量、风险评分和各项服务可用性',
            'nav.ip': '获取IP地址',
            'nav.quality': 'IP质量检测',
            'nav.speed': '网速测试',
            'progress.preparing': '准备开始检测...',
            'progress.gettingIP': '正在获取IP地址...',
            'progress.fetching': '正在并行获取ASN/IP信息/质量与风险...',
            'progress.analyzing': '正在分析地址属性...',
            'progress.scoring': '正在计算风险评分...',
            'progress.factors': '正在检测风险因子...',
            'progress.calculating': '正在计算综合评分...',
            'progress.done': '检测完成！',
            'input.placeholder': '输入要检测的 IP（留空使用自动获取）',
            'btn.run': '开始检测',
            'btn.copy': '复制',
            'btn.copied': '已复制',
            'status.ready': '就绪',
            'status.testing': '检测中...',
            'status.done': '完成',
            'status.failed': '失败',
            'card.media': '网站可达性',
            'label.ip': '访问 IP',
            'label.city': '城市',
            'label.timezone': '时区',
            'label.coords': '坐标',
            'label.postal': '邮编',
            'label.ipType': '机房IP',
            'label.vpn': 'VPN',
            'label.proxy': '代理',
            'label.tor': 'Tor',
            'label.anycast': '任播IP',
            'label.mobile': '移动IP',
            'label.anonymous': '匿名IP',
            'label.satellite': '卫星IP',
            'label.overallQuality': '综合质量',
            'label.overall': '综合评分',
            'level.calculating': '计算中...',
            'level.excellent': '优秀',
            'level.good': '良好',
            'level.fair': '一般',
            'level.poor': '较差',
            'level.bad': '极差',
            'desc.overall': '基于 10 个数据源的综合风险评估',
            'version.ipv4': 'IPv4',
            'version.ipv6': 'IPv6',
            'sub.basic': '基础信息',
            'sub.networkCenter': '网络归属',
            'sub.contact': '联系信息',
            'sub.physical': '物理位置',
            'sub.detail': 'IP 详细信息',
            'sub.datacenter': '数据中心',
            'sub.abuse': '滥用投诉',
            'sub.asn': '自治系统',
            'sub.location': '位置信息',
            'sub.riskScore': 'IP 风险评分',
            'sub.riskFactors': 'IP 风险详情',
            'sub.nativeDetection': 'IP 原生检测',
            'th.provider': '提供商名称',
            'th.domain': '域名',
            'th.type': '类型',
            'th.org': '组织',
            'th.phone': '电话',
            'th.address': '地址',
            'th.network': '网络',
            'th.name': '名称',
            'th.riskScore': '风险分',
            'th.whois': 'WHOIS',
            'th.route': '路由',
            'th.desc': '描述',
            'th.country': '国家',
            'th.active': '活跃',
            'th.updated': '更新',
            'th.eu': '欧盟',
            'th.callingCode': '区号',
            'th.currency': '货币',
            'th.continent': '洲',
            'th.countryCode': '国家码',
            'th.state': '州/省',
            'th.city': '城市',
            'th.latitude': '纬度',
            'th.longitude': '经度',
            'th.zip': '邮编',
            'th.timezone': '时区',
            'th.localTime': '本地时间',
            'th.dst': '夏令时',
            'th.bogon': '保留IP',
            'th.mobileNet': '移动网络',
            'th.satelliteNet': '卫星网络',
            'th.crawler': '爬虫',
            'th.datacenter': '数据中心',
            'th.tor': '洋葱路由',
            'th.proxy': '代理',
            'th.vpn': 'VPN',
            'th.abuser': '滥用',
            'th.flags': '属性标记',
            'th.riskFactorMatrix': '风险因子矩阵',
            'th.source': '数据源',
            'th.usageType': '使用类型',
            'th.companyType': '公司类型',
            'th.region': '地区',
            'th.server': '服务器',
            'th.abuse2': '滥用',
            'th.robot': '机器人',
            'th.contact': '联系信息',
            'media.unavailable': '手动输入时不可用',
            'footer.notice': '本站仅提供IP地址查询的功能，不提供其它任何服务，也不与别的网站有任何合作。',
            'yes': '是',
            'no': '否',
            'unknown': '未知',
            'reachable': '可达',
            'unreachable': '不可达',
            'queryFailed': '查询失败',
            'notConfigured': '未配置',
            'type.hosting': '机房',
            'type.business': '商业',
            'type.isp': '家宽',
            'type.education': '教育',
            'type.government': '政府',
            'risk.low': '低风险',
            'risk.lowmid': '较低风险',
            'risk.mid': '中风险',
            'risk.medium': '中风险',
            'risk.high': '高风险',
            'risk.veryHigh': '极高风险',
            'risk.suspicious': '可疑IP',
            'risk.risky': '存在风险',
            'risk.block': '建议封禁',
            'risk.unknown': '未知',
            'risk.queryFailed': '查询失败',
            'view': '查看',
            'map.unavailable': '无法获取位置信息',
            'visitSite': '访问被检测的网站',
            'theme.dark': '切换亮色模式',
            'theme.light': '切换暗色模式'
        },
        en: {
            'page.title': 'Check My IP Quality',
            'header.title': 'Check My IP Quality',
            'header.desc': 'Comprehensive IP quality, risk score and service availability check',
            'nav.ip': 'Get IP',
            'nav.quality': 'IP Quality',
            'nav.speed': 'Speed Test',
            'progress.preparing': 'Preparing to start...',
            'progress.gettingIP': 'Getting IP address...',
            'progress.fetching': 'Fetching ASN / IP info / quality & risk in parallel...',
            'progress.analyzing': 'Analyzing address attributes...',
            'progress.scoring': 'Calculating risk scores...',
            'progress.factors': 'Detecting risk factors...',
            'progress.calculating': 'Calculating overall score...',
            'progress.done': 'Detection complete!',
            'input.placeholder': 'Enter an IP to check (leave empty to auto-detect)',
            'btn.run': 'Start Check',
            'btn.copy': 'Copy',
            'btn.copied': 'Copied',
            'status.ready': 'Ready',
            'status.testing': 'Checking...',
            'status.done': 'Done',
            'status.failed': 'Failed',
            'card.media': 'Media Reachability',
            'label.ip': 'Your IP',
            'label.city': 'City',
            'label.timezone': 'Timezone',
            'label.coords': 'Coordinates',
            'label.postal': 'Postal Code',
            'label.ipType': 'Hosting IP',
            'label.vpn': 'VPN',
            'label.proxy': 'Proxy',
            'label.tor': 'Tor',
            'label.anycast': 'Anycast IP',
            'label.mobile': 'Mobile IP',
            'label.anonymous': 'Anonymous IP',
            'label.satellite': 'Satellite IP',
            'label.overallQuality': 'Overall Quality',
            'label.overall': 'Overall Score',
            'level.calculating': 'Calculating...',
            'level.excellent': 'Excellent',
            'level.good': 'Good',
            'level.fair': 'Fair',
            'level.poor': 'Poor',
            'level.bad': 'Bad',
            'desc.overall': 'Comprehensive risk assessment based on 10 data sources',
            'version.ipv4': 'IPv4',
            'version.ipv6': 'IPv6',
            'sub.basic': 'Basic Info',
            'sub.networkCenter': 'Network',
            'sub.contact': 'Contact Info',
            'sub.physical': 'Physical Location',
            'sub.detail': 'IP Details',
            'sub.datacenter': 'Datacenter',
            'sub.abuse': 'Abuse Reports',
            'sub.asn': 'Autonomous System',
            'sub.location': 'Location',
            'sub.riskScore': 'IP Risk Score',
            'sub.riskFactors': 'IP Risk Factors',
            'sub.nativeDetection': 'Native IP Detection',
            'th.provider': 'Provider',
            'th.domain': 'Domain',
            'th.type': 'Type',
            'th.org': 'Organization',
            'th.phone': 'Phone',
            'th.address': 'Address',
            'th.network': 'Network',
            'th.name': 'Name',
            'th.riskScore': 'Risk Score',
            'th.whois': 'WHOIS',
            'th.route': 'Route',
            'th.desc': 'Description',
            'th.country': 'Country',
            'th.active': 'Active',
            'th.updated': 'Updated',
            'th.eu': 'EU',
            'th.callingCode': 'Calling Code',
            'th.currency': 'Currency',
            'th.continent': 'Continent',
            'th.countryCode': 'Country Code',
            'th.state': 'State',
            'th.city': 'City',
            'th.latitude': 'Latitude',
            'th.longitude': 'Longitude',
            'th.zip': 'Postal',
            'th.timezone': 'Timezone',
            'th.localTime': 'Local Time',
            'th.dst': 'DST',
            'th.bogon': 'Bogon',
            'th.mobileNet': 'Mobile',
            'th.satelliteNet': 'Satellite',
            'th.crawler': 'Crawler',
            'th.datacenter': 'Datacenter',
            'th.tor': 'Tor',
            'th.proxy': 'Proxy',
            'th.vpn': 'VPN',
            'th.abuser': 'Abuser',
            'th.flags': 'Flags',
            'th.riskFactorMatrix': 'Risk Factor Matrix',
            'th.source': 'Source',
            'th.usageType': 'Usage Type',
            'th.companyType': 'Company Type',
            'th.region': 'Region',
            'th.server': 'Server',
            'th.abuse2': 'Abuser',
            'th.robot': 'Bot',
            'th.contact': 'Contact',
            'media.unavailable': 'Unavailable for manual input',
            'footer.notice': 'This site only provides IP address lookup and does not provide any other services or cooperate with any other websites.',
            'yes': 'Yes',
            'no': 'No',
            'unknown': 'Unknown',
            'reachable': 'Reachable',
            'unreachable': 'Unreachable',
            'queryFailed': 'Query failed',
            'notConfigured': 'Not configured',
            'type.hosting': 'Hosting',
            'type.business': 'Business',
            'type.isp': 'ISP',
            'type.education': 'Education',
            'type.government': 'Government',
            'risk.low': 'Low risk',
            'risk.lowmid': 'Low-Mid risk',
            'risk.mid': 'Mid risk',
            'risk.medium': 'Medium risk',
            'risk.high': 'High risk',
            'risk.veryHigh': 'Very high risk',
            'risk.suspicious': 'Suspicious IP',
            'risk.risky': 'Risky',
            'risk.block': 'Recommend blocking',
            'risk.unknown': 'Unknown',
            'risk.queryFailed': 'Query failed',
            'view': 'View',
            'map.unavailable': 'Location unavailable',
            'visitSite': 'Visit the checked site',
            'theme.dark': 'Switch to light mode',
            'theme.light': 'Switch to dark mode'
        }
    };

    // 优先使用已保存的语言设置，否则根据浏览器语言自动检测
    var currentLang = localStorage.getItem('lang');
    if (!currentLang) {
        var browserLang = navigator.language || navigator.languages[0] || 'zh-CN';
        currentLang = browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
    }
    var initialized = false;

    function t(key) {
        return (I18N[currentLang] && I18N[currentLang][key]) || I18N.zh[key] || key;
    }

    function riskI18n(text) {
        var map = {
            '低风险': 'risk.low', '中风险': 'risk.medium', '高风险': 'risk.high', '极高风险': 'risk.veryHigh',
            '可疑IP': 'risk.suspicious', '存在风险': 'risk.risky', '建议封禁': 'risk.block',
            '未知': 'risk.unknown', '查询失败': 'risk.queryFailed'
        };
        var str = String(text == null ? '' : text);
        return map[str] ? t(map[str]) : (str || t('unknown'));
    }

    function applyLanguage() {
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
        document.title = t('page.title');
        document.querySelectorAll('[data-i18n]').forEach(function (el) {
            el.textContent = t(el.getAttribute('data-i18n'));
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
            el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
        });
        document.querySelectorAll('.lang-btn').forEach(function (btn) {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
        });
        var themeBtn = document.getElementById('theme-toggle');
        themeBtn.title = t(document.documentElement.getAttribute('data-theme') === 'light' ? 'theme.light' : 'theme.dark');
        themeBtn.setAttribute('aria-label', themeBtn.title);
        if (initialized) { run().catch(function () {}); }
    }

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            currentLang = btn.getAttribute('data-lang');
            localStorage.setItem('lang', currentLang);
            applyLanguage();
        });
    });

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        var btn = document.getElementById('theme-toggle');
        btn.title = t(theme === 'light' ? 'theme.light' : 'theme.dark');
        btn.setAttribute('aria-label', btn.title);
    }
    document.getElementById('theme-toggle').addEventListener('click', function () {
        applyTheme(document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });

    /* 工具 */
    function setText(el, text, cls) {
        if (!el) return;
        el.textContent = text == null ? '' : text;
        if (cls) {
            ['ok', 'bad', 'warn', 'muted', 'failed'].forEach(function (c) { el.classList.remove(c); });
            el.classList.add(cls);
        }
    }
    function yesNo(val) {
        if (val === true || val === 'true') return { t: t('yes'), c: 'bad' };
        if (val === false || val === 'false') return { t: t('no'), c: 'ok' };
        return { t: t('unknown'), c: 'muted' };
    }
    function escapeHtml(str) {
        return String(str == null ? '' : str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    var selectedVersion = 4;
    var els = {
        ip: document.getElementById('ip'),
        asn: document.getElementById('asn'),
        org: document.getElementById('org'),
        coords: document.getElementById('coords'),
        city: document.getElementById('city'),
        timezone: document.getElementById('timezone'),
        postal: document.getElementById('postal'),
        ipType: document.getElementById('ipType'),
        isVPN: document.getElementById('isVPN'),
        isProxy: document.getElementById('isProxy'),
        isTor: document.getElementById('isTor'),
        isAnycast: document.getElementById('isAnycast'),
        isMobile: document.getElementById('isMobile'),
        isAnonymous: document.getElementById('isAnonymous'),
        isSatellite: document.getElementById('isSatellite'),
        overviewFlag: document.getElementById('overviewFlag'),
        copyIp: document.getElementById('copyIp'),
        media: {
            TikTok: document.getElementById('mediaTikTok'),
            Disney: document.getElementById('mediaDisney'),
            Netflix: document.getElementById('mediaNetflix'),
            YouTube: document.getElementById('mediaYouTube'),
            Prime: document.getElementById('mediaPrime'),
            Spotify: document.getElementById('mediaSpotify'),
            ChatGPT: document.getElementById('mediaChatGPT'),
            Steam: document.getElementById('mediaSteam'),
            Telegram: document.getElementById('mediaTelegram'),
            GitHub: document.getElementById('mediaGitHub'),
            Wikipedia: document.getElementById('mediaWikipedia'),
            Google: document.getElementById('mediaGoogle')
        },
        status: document.getElementById('status'),
        ipInput: document.getElementById('ipInput'),
        runBtn: document.getElementById('runBtn'),
        companyName: document.getElementById('companyName'),
        companyDomain: document.getElementById('companyDomain'),
        companyTypeRow: document.getElementById('companyTypeRow'),
        abuseName: document.getElementById('abuseName'),
        abuseEmail: document.getElementById('abuseEmail'),
        abusePhone: document.getElementById('abusePhone'),
        abuseAddress: document.getElementById('abuseAddress'),
        abuseNetwork: document.getElementById('abuseNetwork')
    };

    var MEDIA_SITES = {
        TikTok: 'https://www.tiktok.com/',
        Disney: 'https://www.disneyplus.com/',
        Netflix: 'https://www.netflix.com/',
        YouTube: 'https://www.youtube.com/',
        Prime: 'https://www.primevideo.com/',
        Spotify: 'https://open.spotify.com/',
        ChatGPT: 'https://chat.openai.com/',
        Steam: 'https://store.steampowered.com/',
        Telegram: 'https://web.telegram.org/',
        GitHub: 'https://github.com/',
        Wikipedia: 'https://www.wikipedia.org/',
        Google: 'https://www.google.com/'
    };

    function addMediaLinks() {
        Object.keys(MEDIA_SITES).forEach(function (name) {
            var statusEl = els.media[name];
            if (!statusEl) return;
            var item = statusEl.parentElement;
            var nameEl = item.querySelector('.media-name');
            if (!nameEl) return;
            if (nameEl.querySelector('a.link-icon')) return;
            var a = document.createElement('a');
            a.href = MEDIA_SITES[name];
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.className = 'link-icon';
            a.title = t('visitSite');
            a.textContent = '🔗';
            nameEl.appendChild(a);
        });
    }

    var progressFill = document.getElementById('progressFill');
    var progressText = document.getElementById('progressText');
    var currentProgress = 0;
    var totalSteps = 15;

    function updateProgress(message, increment) {
        if (increment === undefined) increment = 1;
        currentProgress += increment;
        var percentage = Math.min((currentProgress / totalSteps) * 100, 100);
        if (progressFill) progressFill.style.width = percentage + '%';
        if (progressText) progressText.textContent = message;
    }
    function resetProgress() {
        currentProgress = 0;
        if (progressFill) progressFill.style.width = '0%';
        if (progressText) progressText.textContent = t('progress.preparing');
    }

    function toDMS(lat, lon) {
        function convertSingle(value, pos, neg) {
            var v = Math.abs(value);
            var deg = Math.floor(v);
            var minFloat = (v - deg) * 60;
            var min = Math.floor(minFloat);
            var sec = Math.round((minFloat - min) * 60);
            return deg + '°' + min + '′' + sec + '″' + (value >= 0 ? pos : neg);
        }
        return convertSingle(lon, 'E', 'W') + ', ' + convertSingle(lat, 'N', 'S');
    }

    async function fetchJSON(url, timeoutMs) {
        try {
            var controller = new AbortController();
            var timer = setTimeout(function () { controller.abort(); }, timeoutMs || 8000);
            var resp = await fetch(url, { method: 'GET', mode: 'cors', headers: { 'Accept': 'application/json' }, signal: controller.signal });
            clearTimeout(timer);
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            return await resp.json();
        } catch (e) {
            console.warn('API调用失败: ' + url, e);
            return null;
        }
    }

    function matchesIPVersion(value, version) {
        var text = String(value || '').trim();
        return version === 6 ? text.indexOf(':') !== -1 : /^\d{1,3}(?:\.\d{1,3}){3}$/.test(text);
    }

    async function getPublicIP() {
        var endpoint = selectedVersion === 6 ? 'https://api6.ipify.org/?format=json' : 'https://api.ipify.org/?format=json';
        try {
            var response = await fetch(endpoint, { headers: { 'Accept': 'application/json' } });
            var data = await response.json();
            if (data && matchesIPVersion(data.ip, selectedVersion)) return data.ip;
        } catch (e) {}
        throw new Error('无法获取公网IP');
    }

    async function getIPInfo(ip) {
        // 走 Worker 代理：后端 /api/ip-info 已内置 ipinfo → ip-api.com → ipwho.is 三级回退
        try {
            var resp = await fetch('/api/ip-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ ip: ip })
            });
            if (resp.ok) {
                var d = await resp.json();
                if (d && d.source && d.source !== 'error' && d.source !== 'fallback') {
                    // 兼容后端不同数据源返回的 asn 结构（ipinfo 为对象，其余为字符串）
                    var asnObj = (typeof d.asn === 'object' && d.asn) ? d.asn : null;
                    var asnName = asnObj ? (asnObj.name || asnObj.org || '') : (typeof d.asn === 'string' ? d.asn : (d.org || d.isp || ''));
                    return {
                        source: d.source,
                        ip: d.ip || ip,
                        asn: asnObj ? asnObj : { asn: '', name: asnName, domain: '', route: '', type: '' },
                        org: d.org || d.isp || '',
                        country: d.country || '',
                        countryCode: d.countryCode || '',
                        region: d.region || '',
                        city: d.city || '',
                        postal: d.postal || '',
                        lat: d.lat != null ? d.lat : null,
                        lon: d.lon != null ? d.lon : null,
                        timezone: d.timezone || '',
                        company: d.company || null,
                        abuse: d.abuse || null,
                        privacy: d.privacy || null,
                        is_anycast: d.is_anycast,
                        is_mobile: d.is_mobile,
                        is_anonymous: d.is_anonymous,
                        is_satellite: d.is_satellite,
                        is_hosting: d.hosting != null ? d.hosting : (d.is_hosting != null ? d.is_hosting : null),
                        proxy: d.proxy,
                        hosting: d.hosting
                    };
                }
            }
        } catch (e) {}
        return null;
    }

    async function getASN(ip) {
        // 走 Worker 代理：后端 /api/asn 已内置 ipinfo → ip-api.com → ipwho.is 三级回退
        try {
            var resp = await fetch('/api/asn', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ ip: ip })
            });
            if (resp.ok) {
                var data = await resp.json();
                if (data && data.ASN && data.ASN !== '未知') {
                    return { asn: data.ASN, org: data.as_info || t('unknown') };
                }
            }
        } catch (e) {}
        return { asn: t('unknown'), org: t('unknown') };
    }

    async function getIpapi(ip) {
        // 并行请求：直连 api.ipapi.is（主源）+ Worker 代理（后端已合并完整字段）
        // 代理返回 raw+fallback 合并结果，能补全免费版缺失的 datacenter/company/abuse 等字段
        var proxyPromise = (async function () {
            try {
                var resp = await fetch('/api/ipapi', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({ ip: ip })
                });
                if (resp.ok) {
                    var j = await resp.json();
                    if (j && !j.error && !j.error_code) return j;
                }
            } catch (e) {}
            return null;
        })();

        var directPromise = fetchJSON('https://api.ipapi.is/?q=' + encodeURIComponent(ip), 4000);

        var results = await Promise.allSettled([directPromise, proxyPromise]);
        var direct = results[0].status === 'fulfilled' ? results[0].value : null;
        var proxied = results[1].status === 'fulfilled' ? results[1].value : null;

        // 合并：直连优先，代理补全缺失字段（与后端 mergeIPAPIResults 同思路）
        var data = mergeIpapiData(direct, proxied);

        if (data && !data.error && !data.error_code) {
            var raw = adaptIpapiMinimal(data);
            return {
                is_proxy: raw.is_proxy, is_vpn: raw.is_vpn, is_tor: raw.is_tor,
                is_datacenter: raw.is_datacenter, is_abuser: raw.is_abuser, is_crawler: raw.is_crawler,
                company: { abuser_score: raw.company.abuser_score, type: raw.company.type },
                asn: { type: raw.asn.type }, raw: raw
            };
        }

        // 最后兜底：ipwho.is 单源（ipinfo 已限流，风险标志由后端 /api/ip-quality 补充）
        try {
            var whois = await fetchJSON('https://ipwho.is/' + encodeURIComponent(ip));
            if (!whois || !whois.success) return null;

            var conn = whois.connection || {};
            var tz = whois.timezone || {};
            var adapted = {
                is_bogon: false,
                is_mobile: false,
                is_satellite: false,
                is_crawler: false,
                is_datacenter: false,
                is_tor: false,
                is_proxy: (whois.security && whois.security.proxy) === true,
                is_vpn: (whois.security && whois.security.vpn) === true,
                is_abuser: false,
                datacenter: { datacenter: '', domain: conn.domain || '', network: '' },
                company: {
                    abuser_score: '',
                    type: '',
                    whois: '',
                    name: conn.org || '',
                    domain: conn.domain || ''
                },
                abuse: { name: '', address: '', email: '', phone: '' },
                asn: {
                    asn: conn.asn != null ? conn.asn : '',
                    abuser_score: '',
                    route: '',
                    descr: conn.isp || conn.org || '',
                    country: whois.country_code || '',
                    active: null,
                    org: conn.org || '',
                    domain: conn.domain || '',
                    abuse: '',
                    type: '',
                    updated: '',
                    rir: '',
                    whois: ''
                },
                location: {
                    is_eu_member: whois.is_eu != null ? whois.is_eu : null,
                    calling_code: whois.calling_code || '',
                    currency_code: '',
                    continent: whois.continent || '',
                    country: whois.country || '',
                    country_code: whois.country_code || '',
                    state: whois.region || '',
                    city: whois.city || '',
                    latitude: whois.latitude != null ? whois.latitude : null,
                    longitude: whois.longitude != null ? whois.longitude : null,
                    zip: whois.postal || '',
                    timezone: (tz && tz.id) || '',
                    local_time: (tz && tz.current_time) || '',
                    is_dst: (tz && tz.is_dst != null) ? tz.is_dst : null
                },
                rir: ''
            };
            return { raw: adapted };
        } catch (e) { return null; }
    }

    // 合并直连结果（api.ipapi.is）与代理结果（后端 raw+fallback 合并），
    // 与后端 mergeIPAPIResults 同思路：直连优先，代理补全缺失字段。
    function mergeIpapiData(direct, proxied) {
        if (!direct && !proxied) return null;
        if (direct && (!direct.error && !direct.error_code) && !proxied) return direct;
        if (!direct || direct.error || direct.error_code) return proxied;

        var out = Object.assign({}, proxied || {}, direct);
        var truthyFlags = ['is_bogon', 'is_mobile', 'is_satellite', 'is_crawler', 'is_datacenter', 'is_tor', 'is_proxy', 'is_vpn', 'is_abuser'];
        var nested = ['datacenter', 'company', 'abuse', 'asn', 'location'];

        // 嵌套对象：代理骨架 + 直连子字段覆盖
        for (var i = 0; i < nested.length; i++) {
            var key = nested[i];
            var dv = direct[key];
            if (dv && typeof dv === 'object') {
                var base = (proxied && typeof proxied[key] === 'object' && proxied[key]) || {};
                out[key] = Object.assign({}, base, dv);
            }
        }
        // 风险标志 OR
        for (var j = 0; j < truthyFlags.length; j++) {
            var k = truthyFlags[j];
            out[k] = (direct[k] === true) || (proxied && proxied[k] === true);
        }
        // 扁平字段同步到嵌套
        if (direct.company_name && (!out.company || !out.company.name)) {
            out.company = out.company || {};
            out.company.name = direct.company_name;
        }
        if (direct.asn_org && (!out.asn || !out.asn.org)) {
            out.asn = out.asn || {};
            out.asn.org = direct.asn_org;
        }
        if (direct.asn_num != null && (!out.asn || out.asn.asn == null)) {
            out.asn = out.asn || {};
            out.asn.asn = direct.asn_num;
        }
        return out;
    }

    // 将 api.ipapi.is 的返回（可能是免费精简字段，也可能是完整嵌套结构）统一适配成
    // fillIpapiDetail 期望的完整结构。精简版只有 company_name/asn_num/asn_org/cc/lat/lon，
    // 完整版才有 company/asn/abuse/datacenter/location 等嵌套对象。
    function adaptIpapiMinimal(data) {
        var d = data || {};
        var company = d.company || {};
        var asn = d.asn || {};
        var abuse = d.abuse || {};
        var dc = d.datacenter || {};
        var loc = d.location || {};
        return {
            is_bogon: d.is_bogon === true,
            is_mobile: d.is_mobile === true,
            is_satellite: d.is_satellite === true,
            is_crawler: d.is_crawler === true,
            is_datacenter: d.is_datacenter === true,
            is_tor: d.is_tor === true,
            is_proxy: d.is_proxy === true,
            is_vpn: d.is_vpn === true,
            is_abuser: d.is_abuser === true,
            datacenter: {
                datacenter: dc.datacenter || '',
                domain: dc.domain || '',
                network: dc.network || ''
            },
            company: {
                abuser_score: company.abuser_score || '',
                type: company.type || '',
                whois: company.whois || '',
                name: company.name || d.company_name || '',
                domain: company.domain || ''
            },
            abuse: {
                name: abuse.name || '',
                address: abuse.address || '',
                email: abuse.email || '',
                phone: abuse.phone || ''
            },
            asn: {
                asn: (asn.asn != null ? asn.asn : (d.asn_num || '')).toString(),
                abuser_score: asn.abuser_score || '',
                route: asn.route || '',
                descr: asn.descr || '',
                country: asn.country || '',
                active: asn.active,
                org: asn.org || d.asn_org || '',
                domain: asn.domain || '',
                abuse: asn.abuse || '',
                type: asn.type || '',
                updated: asn.updated || '',
                rir: asn.rir || '',
                whois: asn.whois || ''
            },
            location: {
                is_eu_member: loc.is_eu_member,
                calling_code: loc.calling_code || '',
                currency_code: loc.currency_code || '',
                continent: loc.continent || '',
                country: loc.country || '',
                country_code: loc.country_code || d.cc || '',
                state: loc.state || '',
                city: loc.city || '',
                latitude: loc.latitude != null ? loc.latitude : (d.lat != null ? d.lat : ''),
                longitude: loc.longitude != null ? loc.longitude : (d.lon != null ? d.lon : ''),
                zip: loc.zip || '',
                timezone: loc.timezone || '',
                local_time: loc.local_time || '',
                is_dst: loc.is_dst
            },
            rir: d.rir || ''
        };
    }

    // ============ 多源字段级优先级合并 ============
    // 将多个并行查询的结果，按「接口可用优先级」逐字段合并，供 fillIpapiDetail 使用。
    // 优先级（从高到低）：
    //   1. ipapi.raw  —— api.ipapi.is（最权威风险标志 + 完整字段，免费版精简时字段少）
    //   2. ipInfo     —— ipinfo.io（完整 company/abuse/asn/location）
    //   3. quality    —— 后端 /api/ip-quality 多源聚合（风险标志 OR 兜底）
    // 规则：
    //   - 字符串/数字字段：按优先级取第一个非空值
    //   - 布尔风险标志：多源取 OR（任一源判定为风险即为风险，避免漏报）
    function mergeIpapiDetail(ipapi, ipInfo, quality) {
        var b = (ipapi && ipapi.raw) || {};

        // 将 ipInfo 转成与 raw 一致的结构
        var ii = {};
        if (ipInfo) {
            var asnObj = (typeof ipInfo.asn === 'object' && ipInfo.asn) ? ipInfo.asn : null;
            var asnName = asnObj ? (asnObj.name || asnObj.org || '') : (ipInfo.org || '');
            var privacy = ipInfo.privacy || {};
            var company = ipInfo.company || {};
            var abuse = ipInfo.abuse || {};
            ii = {
                is_bogon: null,
                is_mobile: ipInfo.is_mobile,
                is_satellite: ipInfo.is_satellite,
                is_crawler: null,
                is_datacenter: ipInfo.is_hosting != null ? ipInfo.is_hosting : privacy.hosting,
                is_tor: privacy.tor,
                is_proxy: privacy.proxy != null ? privacy.proxy : ipInfo.proxy,
                is_vpn: privacy.vpn,
                is_abuser: null,
                datacenter: { datacenter: '', domain: company.domain || '', network: abuse.network || '' },
                company: {
                    abuser_score: '',
                    type: company.type || '',
                    whois: '',
                    name: company.name || '',
                    domain: company.domain || ''
                },
                abuse: {
                    name: abuse.name || '',
                    address: abuse.address || '',
                    email: abuse.email || '',
                    phone: abuse.phone || ''
                },
                asn: {
                    asn: asnObj ? (asnObj.asn != null ? asnObj.asn : '') : '',
                    abuser_score: '',
                    route: asnObj ? (asnObj.route || '') : '',
                    descr: asnName || '',
                    country: '',
                    active: null,
                    org: asnName || '',
                    domain: asnObj ? (asnObj.domain || '') : '',
                    abuse: '',
                    type: asnObj ? (asnObj.type || '') : '',
                    updated: '',
                    rir: '',
                    whois: ''
                },
                location: {
                    is_eu_member: null,
                    calling_code: '',
                    currency_code: '',
                    continent: '',
                    country: ipInfo.country || '',
                    country_code: ipInfo.countryCode || '',
                    state: ipInfo.region || '',
                    city: ipInfo.city || '',
                    latitude: ipInfo.lat,
                    longitude: ipInfo.lon,
                    zip: ipInfo.postal || '',
                    timezone: ipInfo.timezone || '',
                    local_time: '',
                    is_dst: null
                },
                rir: ''
            };
        }

        // quality 聚合风险标志（OR 兜底）
        var qf = {};
        if (quality) {
            var srcNames = ['ip2location', 'scamalytics', 'ipapi', 'ipregistry', 'ipqs', 'ipdata', 'ipinfo', 'ipwhois', 'dbip', 'cloudflare', 'ippure'];
            var anyTrue = function (key) {
                for (var i = 0; i < srcNames.length; i++) {
                    var s = quality[srcNames[i]];
                    if (s && (s[key] === true || s[key] === 'true')) return true;
                }
                return false;
            };
            qf.is_proxy = anyTrue('proxy');
            qf.is_vpn = anyTrue('vpn');
            qf.is_tor = anyTrue('tor');
            qf.is_datacenter = anyTrue('server') || anyTrue('datacenter');
            qf.is_abuser = anyTrue('abuser');
            qf.is_crawler = anyTrue('robot');
        }

        var isEmpty = function (v) { return v === undefined || v === null || v === ''; };
        var pickStr = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (!isEmpty(arguments[i])) return arguments[i];
            }
            return '';
        };
        var mergeBool = function () {
            for (var i = 0; i < arguments.length; i++) {
                var v = arguments[i];
                if (v === true || v === 'true' || v === 1 || v === '1') return true;
            }
            return false;
        };
        var pickAny = function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined && arguments[i] !== null && arguments[i] !== '') return arguments[i];
            }
            return null;
        };

        var b_dc = b.datacenter || {}, ii_dc = ii.datacenter || {};
        var b_co = b.company || {}, ii_co = ii.company || {};
        var b_ab = b.abuse || {}, ii_ab = ii.abuse || {};
        var b_as = b.asn || {}, ii_as = ii.asn || {};
        var b_loc = b.location || {}, ii_loc = ii.location || {};

        var merged = {
            is_bogon: mergeBool(b.is_bogon, ii.is_bogon),
            is_mobile: mergeBool(b.is_mobile, ii.is_mobile),
            is_satellite: mergeBool(b.is_satellite, ii.is_satellite),
            is_crawler: mergeBool(b.is_crawler, ii.is_crawler),
            is_datacenter: mergeBool(b.is_datacenter, ii.is_datacenter, qf.is_datacenter),
            is_tor: mergeBool(b.is_tor, ii.is_tor, qf.is_tor),
            is_proxy: mergeBool(b.is_proxy, ii.is_proxy, qf.is_proxy),
            is_vpn: mergeBool(b.is_vpn, ii.is_vpn, qf.is_vpn),
            is_abuser: mergeBool(b.is_abuser, ii.is_abuser, qf.is_abuser),
            datacenter: {
                datacenter: pickStr(b_dc.datacenter, ii_dc.datacenter),
                domain: pickStr(b_dc.domain, ii_dc.domain),
                network: pickStr(b_dc.network, ii_dc.network)
            },
            company: {
                abuser_score: pickStr(b_co.abuser_score, ii_co.abuser_score),
                type: pickStr(b_co.type, ii_co.type),
                whois: pickStr(b_co.whois, ii_co.whois),
                name: pickStr(b_co.name, ii_co.name),
                domain: pickStr(b_co.domain, ii_co.domain)
            },
            abuse: {
                name: pickStr(b_ab.name, ii_ab.name),
                address: pickStr(b_ab.address, ii_ab.address),
                email: pickStr(b_ab.email, ii_ab.email),
                phone: pickStr(b_ab.phone, ii_ab.phone)
            },
            asn: {
                asn: pickStr(b_as.asn, ii_as.asn),
                abuser_score: pickStr(b_as.abuser_score, ii_as.abuser_score),
                route: pickStr(b_as.route, ii_as.route),
                descr: pickStr(b_as.descr, ii_as.descr),
                country: pickStr(b_as.country, ii_as.country),
                active: pickAny(b_as.active, ii_as.active),
                org: pickStr(b_as.org, ii_as.org),
                domain: pickStr(b_as.domain, ii_as.domain),
                abuse: pickStr(b_as.abuse, ii_as.abuse),
                type: pickStr(b_as.type, ii_as.type),
                updated: pickStr(b_as.updated, ii_as.updated),
                rir: pickStr(b_as.rir, ii_as.rir),
                whois: pickStr(b_as.whois, ii_as.whois)
            },
            location: {
                is_eu_member: pickAny(b_loc.is_eu_member, ii_loc.is_eu_member),
                calling_code: pickStr(b_loc.calling_code, ii_loc.calling_code),
                currency_code: pickStr(b_loc.currency_code, ii_loc.currency_code),
                continent: pickStr(b_loc.continent, ii_loc.continent),
                country: pickStr(b_loc.country, ii_loc.country),
                country_code: pickStr(b_loc.country_code, ii_loc.country_code),
                state: pickStr(b_loc.state, ii_loc.state),
                city: pickStr(b_loc.city, ii_loc.city),
                latitude: pickAny(b_loc.latitude, ii_loc.latitude),
                longitude: pickAny(b_loc.longitude, ii_loc.longitude),
                zip: pickStr(b_loc.zip, ii_loc.zip),
                timezone: pickStr(b_loc.timezone, ii_loc.timezone),
                local_time: pickStr(b_loc.local_time, ii_loc.local_time),
                is_dst: pickAny(b_loc.is_dst, ii_loc.is_dst)
            },
            rir: pickStr(b.rir, ii.rir)
        };

        // 交叉补充：某些字段主源缺失时，从已合并的其它字段推导
        var mm_asn = merged.asn, mm_co = merged.company, mm_ab = merged.abuse, mm_dc = merged.datacenter, mm_loc = merged.location;
        if (!mm_asn.country && mm_loc.country_code) mm_asn.country = mm_loc.country_code;
        if (!mm_asn.type && mm_co.type) mm_asn.type = mm_co.type;
        if (!mm_asn.domain && mm_co.domain) mm_asn.domain = mm_co.domain;
        if (!mm_asn.abuse && mm_ab.name) mm_asn.abuse = mm_ab.name;
        if (!mm_co.name && mm_asn.org) mm_co.name = mm_asn.org;
        if (!mm_co.domain && mm_asn.domain) mm_co.domain = mm_asn.domain;
        if (!mm_ab.name && mm_co.name) mm_ab.name = mm_co.name;
        if (!mm_dc.network && mm_asn.route) mm_dc.network = mm_asn.route;
        if (!mm_dc.domain && mm_co.domain) mm_dc.domain = mm_co.domain;

        return merged;
    }

    function fillIpapiDetail(raw) {
        if (!raw) return;
        var truthy = function (v) { return v === true || v === 'true' || v === 1 || v === '1'; };
        var yesNoText = function (v) { return truthy(v) ? t('yes') : t('no'); };
        var yesNoClass = function (v) { return truthy(v) ? 'bad' : 'ok'; };
        var setYN = function (id, v) {
            var el = document.getElementById(id);
            if (el) setText(el, yesNoText(v), yesNoClass(v));
        };
        setYN('ipapiIsBogon', raw.is_bogon);
        setYN('ipapiIsMobile', raw.is_mobile);
        setYN('ipapiIsSatellite', raw.is_satellite);
        setYN('ipapiIsCrawler', raw.is_crawler);
        setYN('ipapiIsDatacenter', raw.is_datacenter);
        setYN('ipapiIsTor', raw.is_tor);
        setYN('ipapiIsProxy', raw.is_proxy);
        setYN('ipapiIsVPN', raw.is_vpn);
        setYN('ipapiIsAbuser', raw.is_abuser);

        setText(document.getElementById('ipapiDCName'), raw.datacenter && raw.datacenter.datacenter || '');
        setText(document.getElementById('ipapiDCDomain'), raw.datacenter && raw.datacenter.domain || '');
        setText(document.getElementById('ipapiDCNetwork'), raw.datacenter && raw.datacenter.network || '');
        setText(document.getElementById('ipapiCompanyAbuserScore'), raw.company && raw.company.abuser_score || '');
        setText(document.getElementById('ipapiCompanyTypeDetail'), raw.company && raw.company.type || '');
        var companyWhois = document.getElementById('ipapiCompanyWhois');
        if (companyWhois) {
            var cw = raw.company && raw.company.whois || '';
            companyWhois.innerHTML = cw ? '<a href="' + escapeHtml(cw.trim()) + '" target="_blank">' + t('view') + '</a>' : '';
        }

        setText(document.getElementById('ipapiAbuseName'), raw.abuse && raw.abuse.name || '');
        setText(document.getElementById('ipapiAbuseAddress'), raw.abuse && raw.abuse.address || '');
        setText(document.getElementById('ipapiAbuseEmail'), raw.abuse && raw.abuse.email || '');
        setText(document.getElementById('ipapiAbusePhone'), raw.abuse && raw.abuse.phone || '');

        setText(document.getElementById('ipapiASN'), (raw.asn && raw.asn.asn != null ? raw.asn.asn : '').toString());
        setText(document.getElementById('ipapiASNAbuserScore'), raw.asn && raw.asn.abuser_score || '');
        setText(document.getElementById('ipapiASNRoute'), raw.asn && raw.asn.route || '');
        setText(document.getElementById('ipapiASNDescr'), raw.asn && raw.asn.descr || '');
        setText(document.getElementById('ipapiASNCountry'), raw.asn && raw.asn.country || '');
        setText(document.getElementById('ipapiASNActive'), raw.asn && raw.asn.active === true ? t('yes') : raw.asn && raw.asn.active === false ? t('no') : '');
        setText(document.getElementById('ipapiASNOrg'), raw.asn && raw.asn.org || '');
        setText(document.getElementById('ipapiASNDomain'), raw.asn && raw.asn.domain || '');
        setText(document.getElementById('ipapiASNAbuse'), raw.asn && raw.asn.abuse || '');
        setText(document.getElementById('ipapiASNType'), raw.asn && raw.asn.type || '');
        setText(document.getElementById('ipapiASNUpdated'), raw.asn && raw.asn.updated || '');
        setText(document.getElementById('ipapiASNRIR'), (raw.asn && raw.asn.rir || raw.rir || ''));
        var asnWhois = document.getElementById('ipapiASNWhois');
        if (asnWhois) {
            var aw = raw.asn && raw.asn.whois || '';
            asnWhois.innerHTML = aw ? '<a href="' + escapeHtml(aw.trim()) + '" target="_blank">' + t('view') + '</a>' : '';
        }

        var loc = raw.location || {};
        setText(document.getElementById('ipapiIsEU'), loc.is_eu_member === true ? t('yes') : loc.is_eu_member === false ? t('no') : '');
        setText(document.getElementById('ipapiCallingCode'), loc.calling_code || '');
        setText(document.getElementById('ipapiCurrencyCode'), loc.currency_code || '');
        setText(document.getElementById('ipapiContinent'), loc.continent || '');
        setText(document.getElementById('ipapiCountry'), loc.country || '');
        setText(document.getElementById('ipapiCountryCode'), loc.country_code || '');
        setText(document.getElementById('ipapiState'), loc.state || '');
        setText(document.getElementById('ipapiCity'), loc.city || '');
        setText(document.getElementById('ipapiLatitude'), (loc.latitude != null ? String(loc.latitude) : ''));
        setText(document.getElementById('ipapiLongitude'), (loc.longitude != null ? String(loc.longitude) : ''));
        setText(document.getElementById('ipapiZip'), loc.zip || '');
        setText(document.getElementById('ipapiTimezone'), loc.timezone || '');
        setText(document.getElementById('ipapiLocalTime'), loc.local_time || '');
        setText(document.getElementById('ipapiIsDST'), loc.is_dst === true ? t('yes') : loc.is_dst === false ? t('no') : '');
    }

    async function getIpwhois(ip) {
        try {
            var data = await fetchJSON('https://ipwho.is/' + ip);
            if (data && data.success) return { security: data.security || {} };
            return null;
        } catch (e) { return null; }
    }

    async function getIPPure(ip) {
        try {
            var url = ip ? 'https://my.ippure.com/v1/info?ip=' + encodeURIComponent(ip) : 'https://my.ippure.com/v1/info';
            var data = await fetchJSON(url);
            if (data && data.ip) {
                return {
                    ip: data.ip,
                    asn: data.asn || null,
                    asOrganization: data.asOrganization || null,
                    country: data.country || null,
                    countryCode: data.countryCode || null,
                    region: data.region || null,
                    regionCode: data.regionCode || null,
                    city: data.city || null,
                    timezone: data.timezone || null,
                    longitude: data.longitude || null,
                    latitude: data.latitude || null,
                    postalCode: data.postalCode || null,
                    fraudScore: data.fraudScore != null ? data.fraudScore : null,
                    isResidential: data.isResidential != null ? data.isResidential : null,
                    isBroadcast: data.isBroadcast != null ? data.isBroadcast : null,
                    userAgent: data.userAgent || null
                };
            }
            return null;
        } catch (e) { return null; }
    }

    async function getIpregistryClient(ip) {
        try {
            var url = 'https://api.ipregistry.co/' + encodeURIComponent(ip) + '?hostname=true&key=tryout';
            var resp = await fetch(url, { method: 'GET', mode: 'cors', headers: { 'Accept': 'application/json' } });
            if (resp.ok) {
                var data = await resp.json();
                var security = data.security || {};
                return {
                    countryCode: (data.location && data.location.country && data.location.country.code) || data.country_code || null,
                    proxy: security.is_public_proxy === true || security.is_proxy === true,
                    vpn: security.is_vpn === true,
                    tor: (security.is_tor === true) || (security.is_tor_exit === true),
                    relay: false,
                    server: security.is_datacenter === true || security.is_cloud_provider === true,
                    datacenter: security.is_datacenter === true || security.is_cloud_provider === true,
                    abuser: security.is_threat === true || security.is_abuser === true,
                    robot: false,
                    usageType: (data.connection && data.connection.type || t('unknown')),
                    companyType: (data.company && data.company.type || t('unknown')),
                    score: null, risk: null
                };
            }
        } catch (e) {}
        return null;
    }

    function getFlagIconHTML(countryCode) {
        if (!countryCode) return '🌍 ' + t('unknown');
        var orig = String(countryCode).trim().toUpperCase();
        var map = { 'UK': 'gb', 'GB': 'gb', 'EU': 'eu', 'XK': 'xk', 'HK': 'hk', 'MO': 'mo', 'TW': 'tw' };
        var norm = (map[orig] || orig).toLowerCase();
        if (/^[a-z]{2}$/.test(norm)) {
            return '<span class="fi fi-' + norm + '"></span>[' + orig + ']';
        }
        return getCountryEmoji(orig) + ' [' + orig + ']';
    }

    function getCountryEmoji(countryCode) {
        if (!countryCode) return '🌍';
        var cc = String(countryCode).trim().toUpperCase();
        var special = { 'UK': '🇬🇧', 'EU': '🇪🇺', 'XK': '🇽🇰', 'HK': '🇭🇰' };
        if (special[cc]) return special[cc];
        if (cc.length !== 2) return '🌍';
        var A = 0x1F1E6, base = 0x41;
        var c0 = cc.codePointAt(0), c1 = cc.codePointAt(1);
        if (c0 < base || c0 > 0x5A || c1 < base || c1 > 0x5A) return '🌍';
        return String.fromCodePoint(A + (c0 - base), A + (c1 - base));
    }

    async function checkReachable(url, timeout) {
        if (timeout === undefined) timeout = 5000;
        var controller = new AbortController();
        var timer = setTimeout(function () { try { controller.abort(); } catch (e) {} }, timeout);
        var start = performance.now();
        try {
            var resp = await fetch(url, { method: 'GET', mode: 'no-cors', cache: 'no-cache', redirect: 'follow', signal: controller.signal });
            return { ok: true, latency: Math.round(performance.now() - start) };
        } catch (e) { return { ok: false, latency: null }; }
        finally { clearTimeout(timer); }
    }

    async function fillSiteReachability() {
        var results = await Promise.allSettled(
            Object.keys(MEDIA_SITES).map(async function (name) {
                var r = await checkReachable(MEDIA_SITES[name], 5000);
                return { name: name, ok: r.ok, latency: r.latency };
            })
        );
        results.forEach(function (result) {
            if (result.status === 'fulfilled') {
                var name = result.value.name, ok = result.value.ok, latency = result.value.latency;
                if (els.media[name]) {
                    var label = ok
                        ? t('reachable') + (latency != null ? ' · ' + latency + 'ms' : '')
                        : t('unreachable');
                    els.media[name].textContent = label;
                    if (ok) {
                        var t2 = typeof latency === 'number' ? Math.min(1, Math.max(0, (latency - 300) / 1200)) : 0;
                        var r = Math.round(52 + (251 - 52) * t2);
                        var g = Math.round(211 + (191 - 211) * t2);
                        var b = Math.round(153 + (36 - 153) * t2);
                        els.media[name].className = 'media-status';
                        els.media[name].style.color = 'rgb(' + r + ',' + g + ',' + b + ')';
                        els.media[name].style.background = 'rgba(' + r + ',' + g + ',' + b + ',0.12)';
                        els.media[name].style.borderColor = 'rgba(' + r + ',' + g + ',' + b + ',0.3)';
                    } else {
                        els.media[name].className = 'media-status bad';
                        els.media[name].style.color = '';
                        els.media[name].style.background = '';
                        els.media[name].style.borderColor = '';
                    }
                }
            }
        });
    }

    async function getIPQuality(ip) {
        try {
            var response = await fetch('/api/ip-quality', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({ ip: ip })
            });
            if (response.ok) return await response.json();
            return null;
        } catch (e) { return null; }
    }

    function fillMultiSourceAttributes(q) {
        if (!q) return;
        function mapUsageType(type) {
            switch (type && type.toLowerCase ? type.toLowerCase() : '') {
                case 'hosting': return '<span class="type-badge type-hosting">' + t('type.hosting') + '</span>';
                case 'business': return '<span class="type-badge type-business">' + t('type.business') + '</span>';
                case 'isp': return '<span class="type-badge type-isp">' + t('type.isp') + '</span>';
                case 'education': return '<span class="type-badge type-education">' + t('type.education') + '</span>';
                case 'government': return '<span class="type-badge type-government">' + t('type.government') + '</span>';
                default: return null;
            }
        }
        var setPair = function (usageEl, companyEl, item) {
            if (!item) {
                if (usageEl) setText(usageEl, t('queryFailed'), 'failed');
                if (companyEl) setText(companyEl, t('queryFailed'), 'failed');
                return;
            }
            var usage = (item && item.usageType) || t('unknown');
            var company = (item && item.companyType) || t('unknown');
            var usageHTML = mapUsageType(usage);
            var companyHTML = mapUsageType(company);
            if (usageEl) usageEl.innerHTML = usageHTML || escapeHtml(item.usageTypeRaw || usage);
            if (companyEl) companyEl.innerHTML = companyHTML || escapeHtml(item.companyTypeRaw || company);
        };
        setPair(document.getElementById('ipinfoUsageType'), document.getElementById('ipinfoCompanyType'), q.ipinfo);
        setPair(document.getElementById('ipregistryUsageType'), document.getElementById('ipregistryCompanyType'), q.ipregistry);
        setPair(document.getElementById('ipapiUsageType'), document.getElementById('ipapiCompanyType'), q.ipapi);
    }

    function fillMultiSourceScores(q) {
        if (!q) return;
        var validScores = [];
        var rows = document.querySelectorAll('.score-row');
        rows.forEach(function (row) {
            var prefix = row.getAttribute('data-source');
            var item = q[prefix];
            var numEl = row.querySelector('.score-num');
            var barEl = row.querySelector('.score-bar-fill');
            var riskEl = row.querySelector('.score-risk');
            if (!numEl || !barEl || !riskEl) return;
            if (!item) {
                numEl.textContent = '--';
                barEl.style.width = '0%';
                barEl.className = 'score-bar-fill na';
                var errMsg = q.errors && q.errors[prefix];
                var notCfg = errMsg && errMsg.indexOf('未配置') !== -1;
                riskEl.textContent = notCfg ? t('notConfigured') : t('queryFailed');
                riskEl.className = 'score-risk muted';
                return;
            }
            var scoreStr = item.score != null ? String(item.score) : null;
            // 后端各源返回的是「风险分」（0-100，越高越危险），这里反转为「安全分」（越高越安全）
            var riskNum = scoreStr == null ? NaN : parseFloat(scoreStr.replace('%', ''));
            var num = isNaN(riskNum) ? NaN : Math.min(100, Math.max(0, 100 - riskNum));
            numEl.textContent = isNaN(num) ? t('unknown') : String(Math.round(num));
            var pct = isNaN(num) ? 0 : num;
            barEl.style.width = pct + '%';
            var cls = 'na';
            if (!isNaN(num)) {
                validScores.push(num);
                if (num >= 90) cls = 'low';
                else if (num >= 60) cls = 'mid';
                else cls = 'high';
            }
            barEl.className = 'score-bar-fill ' + cls;
            riskEl.textContent = riskI18n(item.risk);
            var rcls = 'muted';
            if (!isNaN(num)) {
                if (num >= 90) rcls = 'ok';
                else if (num >= 60) rcls = 'warn';
                else rcls = 'bad';
            }
            riskEl.className = 'score-risk ' + rcls;
        });

        var overallScoreEl = document.getElementById('overallScore');
        var overallLevelEl = document.getElementById('overallLevel');
        var overallRingEl = document.getElementById('overallRing');
        if (validScores.length > 0) {
            var avgScore = validScores.reduce(function (a, b) { return a + b; }, 0) / validScores.length;
            var roundedScore = Math.round(avgScore);
            if (overallScoreEl) overallScoreEl.textContent = roundedScore;

            var level = '', levelClass = '';
            if (roundedScore >= 90) { level = t('risk.low'); levelClass = 'ok'; }
            else if (roundedScore >= 60) { level = t('risk.lowmid'); levelClass = 'ok'; }
            else if (roundedScore >= 40) { level = t('risk.mid'); levelClass = 'warn'; }
            else { level = t('risk.high'); levelClass = 'bad'; }

            if (overallLevelEl) {
                overallLevelEl.textContent = level;
                overallLevelEl.className = 'overall-level ' + levelClass;
            }

            var circumference = 364.42;
            var offset = circumference - (roundedScore / 100) * circumference;
            if (overallRingEl) {
                overallRingEl.style.strokeDashoffset = offset;
                overallRingEl.className = 'ring-fg ' + (roundedScore >= 90 ? 'low' : roundedScore >= 60 ? 'mid' : 'high');
            }
        } else {
            if (overallScoreEl) overallScoreEl.textContent = '--';
            if (overallLevelEl) {
                overallLevelEl.textContent = t('level.calculating');
                overallLevelEl.className = 'overall-level muted';
            }
        }
    }

    function fillMultiSourceFactors(q) {
        if (!q) return;
        var yn = yesNo;
        var set = function (id, text, cls) { setText(document.getElementById(id), text, cls); };
        function fillRow(prefix, item) {
            var regionCell = document.getElementById(prefix + 'Region');
            if (!item) {
                var errMsg = q.errors && q.errors[prefix];
                var label = (errMsg && errMsg.indexOf('未配置') !== -1) ? t('notConfigured') : t('queryFailed');
                if (regionCell) { regionCell.textContent = label; regionCell.className = 'failed'; }
                set(prefix + 'Proxy', label, 'failed');
                set(prefix + 'VPN', label, 'failed');
                set(prefix + 'Tor', label, 'failed');
                set(prefix + 'DC', label, 'failed');
                set(prefix + 'Abuser', label, 'failed');
                set(prefix + 'Robot', label, 'failed');
                return;
            }
            if (regionCell) {
                try {
                    regionCell.innerHTML = item.countryCode ? getFlagIconHTML(item.countryCode) : '🌍 ' + t('unknown');
                } catch (e) {
                    regionCell.textContent = item.countryCode ? String(item.countryCode) : t('unknown');
                }
            }
            var p = yn(item.proxy), v = yn(item.vpn), tt = yn(item.tor), d = yn(item.datacenter || item.server), a = yn(item.abuser), r = yn(item.robot);
            set(prefix + 'Proxy', p.t, p.c);
            set(prefix + 'VPN', v.t, v.c);
            set(prefix + 'Tor', tt.t, tt.c);
            set(prefix + 'DC', d.t, d.c);
            set(prefix + 'Abuser', a.t, a.c);
            set(prefix + 'Robot', r.t, r.c);
        }
        var sources = ['ip2location', 'ipapi', 'ipregistry', 'ipqs', 'scamalytics', 'ipdata', 'ipinfo', 'ipwhois', 'ippure'];
        sources.forEach(function (prefix) {
            try {
                fillRow(prefix, q[prefix]);
            } catch (e) {
                console.warn('fillRow 失败:', prefix, e);
                set(prefix + 'Proxy', t('queryFailed'), 'failed');
                set(prefix + 'VPN', t('queryFailed'), 'failed');
                set(prefix + 'Tor', t('queryFailed'), 'failed');
                set(prefix + 'DC', t('queryFailed'), 'failed');
                set(prefix + 'Abuser', t('queryFailed'), 'failed');
                set(prefix + 'Robot', t('queryFailed'), 'failed');
            }
        });
    }

    function updateMapDisplay(lat, lon) {
        var mapFrame = document.getElementById('mapFrame');
        var mapContainer = document.getElementById('mapContainer');
        var mapFallback = document.getElementById('mapFallback');
        if (!mapFrame || !mapContainer) return;

        // 过滤无效坐标（0,0 或非有限数字）
        var latNum = parseFloat(lat);
        var lonNum = parseFloat(lon);
        var valid = isFinite(latNum) && isFinite(lonNum) && !(latNum === 0 && lonNum === 0);

        if (valid) {
            var dLat = 0.05, dLon = 0.05;
            var left = (lonNum - dLon).toFixed(6), bottom = (latNum - dLat).toFixed(6);
            var right = (lonNum + dLon).toFixed(6), top = (latNum + dLat).toFixed(6);
            var osm = 'https://www.openstreetmap.org/export/embed.html?bbox=' + left + '%2C' + bottom + '%2C' + right + '%2C' + top + '&layer=mapnik&marker=' + latNum + ',' + lonNum;
            mapFrame.src = osm;
            mapFrame.style.display = 'block';
            if (mapFallback) mapFallback.style.display = 'none';
        } else {
            mapFrame.style.display = 'none';
            if (mapFallback) {
                mapFallback.textContent = '🗺️ ' + t('map.unavailable');
                mapFallback.style.display = 'block';
            }
        }
    }

    function setChip(el, val) {
        if (!el) return;
        if (val === true || val === 'true' || val === 1 || val === '1') {
            el.className = 'chip bad';
        } else if (val === false || val === 'false' || val === 0 || val === '0') {
            el.className = 'chip ok';
        } else {
            el.className = 'chip muted';
        }
    }

    async function run() {
        resetProgress();
        if (els.status) {
            els.status.innerHTML = '<span class="loading"></span> ' + t('status.testing');
            els.status.className = 'status testing';
        }

        updateProgress(t('progress.gettingIP'));
        var manualIP = (els.ipInput.value || '').trim();
        var ip = manualIP || '';
        if (!ip) {
            try {
                var clientResp = await fetch('/api/client-ip', { headers: { 'Accept': 'application/json' } });
                if (clientResp.ok) {
                    var clientData = await clientResp.json();
                    var clientIP = (clientData && (clientData.ip || clientData.clientIP || clientData.ipv4)) || '';
                    if (matchesIPVersion(clientIP, selectedVersion)) ip = clientIP;
                }
            } catch (e) {}
        }
        if (!ip) {
            try {
                var apiUrl = selectedVersion === 6 ? 'https://api6.ipify.org/?format=json' : 'https://api.ipify.org/?format=json';
                var resp = await fetch(apiUrl, { headers: { 'Accept': 'application/json' } });
                if (resp.ok) {
                    var publicData = await resp.json();
                    var publicIP = (publicData && publicData.ip) || '';
                    if (matchesIPVersion(publicIP, selectedVersion)) ip = publicIP;
                }
            } catch (e) {}
        }
        if (!ip) { try { ip = await getPublicIP(); } catch (e) {} }
        setText(els.ip, ip || '--');

        updateProgress(t('progress.fetching'));
        var mediaCard = document.getElementById('media');
        var mediaNotice = document.getElementById('mediaManualNotice');
        var useManualIP = !!manualIP;
        var reachabilityPromise = Promise.resolve();
        if (useManualIP) {
            if (mediaCard) mediaCard.style.display = 'none';
            if (mediaNotice) mediaNotice.style.display = 'block';
        } else {
            if (mediaCard) mediaCard.style.display = 'block';
            if (mediaNotice) mediaNotice.style.display = 'none';
            Object.keys(els.media).forEach(function (name) {
                if (!els.media[name]) return;
                els.media[name].innerHTML = '<span class="loading"></span>';
                els.media[name].className = 'media-status testing';
                els.media[name].style.color = '';
                els.media[name].style.background = '';
                els.media[name].style.borderColor = '';
            });
            reachabilityPromise = fillSiteReachability();
            addMediaLinks();
        }

        var results = await Promise.allSettled([getASN(ip), getIPInfo(ip), getIPQuality(ip), getIpapi(ip), getIpregistryClient(ip), getIPPure(ip)]);
        var asnInfo = results[0].status === 'fulfilled' ? results[0].value : { asn: t('unknown'), org: t('unknown') };
        var ipInfo = results[1].status === 'fulfilled' ? results[1].value : null;
        var quality = results[2].status === 'fulfilled' ? results[2].value : null;
        var ipapi = results[3].status === 'fulfilled' ? results[3].value : null;
        var ipregistryFront = results[4].status === 'fulfilled' ? results[4].value : null;
        var ippure = results[5].status === 'fulfilled' ? results[5].value : null;

        // ASN信息备用：如果getASN失败，从IPPure获取
        if ((!asnInfo || asnInfo.asn === t('unknown')) && ippure && ippure.asn) {
            asnInfo = {
                asn: 'AS' + ippure.asn,
                org: ippure.asOrganization || t('unknown')
            };
        }

        setText(els.asn, asnInfo.asn);
        setText(els.org, asnInfo.org);

        var mergedQuality = (function () {
            var base = quality ? Object.assign({}, quality) : {};
            if (ipregistryFront) base.ipregistry = ipregistryFront;
            if (ipInfo) {
                base.ipinfo = {
                    countryCode: ipInfo.countryCode || ipInfo.country || '',
                    proxy: (ipInfo.privacy && ipInfo.privacy.proxy) != null ? ipInfo.privacy.proxy : (ipInfo.is_anonymous != null ? ipInfo.is_anonymous : null),
                    vpn: (ipInfo.privacy && ipInfo.privacy.vpn) != null ? ipInfo.privacy.vpn : null,
                    tor: (ipInfo.privacy && ipInfo.privacy.tor) != null ? ipInfo.privacy.tor : null,
                    relay: (ipInfo.privacy && ipInfo.privacy.relay) != null ? ipInfo.privacy.relay : null,
                    server: (ipInfo.privacy && ipInfo.privacy.hosting) != null ? ipInfo.privacy.hosting : (ipInfo.is_hosting != null ? ipInfo.is_hosting : null),
                    datacenter: (ipInfo.privacy && ipInfo.privacy.hosting) != null ? ipInfo.privacy.hosting : (ipInfo.is_hosting != null ? ipInfo.is_hosting : null),
                    abuser: null, robot: null,
                    usageType: (ipInfo.asn && ipInfo.asn.type) || (ipInfo.company && ipInfo.company.type) || '',
                    companyType: (ipInfo.company && ipInfo.company.type) || '',
                    score: null, risk: null
                };
            }
            if (ippure) {
                base.ippure = {
                    countryCode: ippure.countryCode || '',
                    proxy: null,
                    vpn: null,
                    tor: null,
                    relay: null,
                    server: ippure.isResidential === false,
                    datacenter: ippure.isResidential === false,
                    abuser: null,
                    robot: null,
                    usageType: '',
                    companyType: '',
                    score: ippure.fraudScore,
                    risk: ippure.fraudScore != null ? (ippure.fraudScore >= 75 ? 'high' : ippure.fraudScore >= 50 ? 'medium' : 'low') : null
                };
            }
            return base;
        })();

        var lat = null, lon = null, city = '', tz = '', postal = '';
        if (ipInfo && ipInfo.lat != null && ipInfo.lon != null) {
            lat = ipInfo.lat; lon = ipInfo.lon;
            city = ipInfo.city || ''; tz = ipInfo.timezone || ''; postal = ipInfo.postal || '';
        }
        // 坐标兜底：ipInfo 无坐标时，从 ipapi 的 location 取经纬度
        if (lat == null || lon == null) {
            var locSrc = ipapi && ipapi.raw && ipapi.raw.location;
            if (locSrc && locSrc.latitude != null && locSrc.longitude != null) {
                lat = parseFloat(locSrc.latitude); lon = parseFloat(locSrc.longitude);
            }
        }
        // 第三优先级：从 IPPure 获取坐标和城市信息
        if (lat == null || lon == null) {
            if (ippure && ippure.latitude != null && ippure.longitude != null) {
                lat = parseFloat(ippure.latitude); lon = parseFloat(ippure.longitude);
                if (!city && ippure.city) city = ippure.city;
                if (!tz && ippure.timezone) tz = ippure.timezone;
                if (!postal && ippure.postalCode) postal = ippure.postalCode;
            }
        }
        setText(els.coords, (lat != null && lon != null) ? toDMS(lat, lon) : '--');
        var region = ipInfo && ipInfo.region || '';
        setText(els.city, city + (region ? ' · ' + region : '') || '--');
        setText(els.timezone, tz || '--');
        setText(els.postal, postal || '--');
        if (els.overviewFlag) {
            els.overviewFlag.textContent = ipInfo && ipInfo.countryCode ? getCountryEmoji(ipInfo.countryCode) : '🌍';
        }

        // 多源字段级优先级合并：ipapi > ipinfo > quality，逐字段取第一个可用值
        var mergedDetail = mergeIpapiDetail(ipapi, ipInfo, quality);
        fillIpapiDetail(mergedDetail);

        var truthy = function (v) { return v === true || v === 'true' || v === 1 || v === '1'; };
        function anyTrue() {
            for (var i = 0; i < arguments.length; i++) if (truthy(arguments[i])) return true;
            return false;
        }
        var mg = mergedQuality;
        var dcFromQuality = anyTrue(
            mg && mg.ip2location && mg.ip2location.server, mg && mg.ip2location && mg.ip2location.datacenter,
            mg && mg.ipapi && mg.ipapi.server, mg && mg.ipapi && mg.ipapi.datacenter,
            mg && mg.ipregistry && mg.ipregistry.server, mg && mg.ipregistry && mg.ipregistry.datacenter,
            mg && mg.ipqs && mg.ipqs.server, mg && mg.ipqs && mg.ipqs.datacenter,
            mg && mg.scamalytics && mg.scamalytics.server, mg && mg.scamalytics && mg.scamalytics.datacenter,
            mg && mg.ipdata && mg.ipdata.server, mg && mg.ipdata && mg.ipdata.datacenter,
            mg && mg.ipinfo && mg.ipinfo.server, mg && mg.ipinfo && mg.ipinfo.datacenter,
            mg && mg.ipwhois && mg.ipwhois.server, mg && mg.ipwhois && mg.ipwhois.datacenter,
            mg && mg.ippure && mg.ippure.server, mg && mg.ippure && mg.ippure.datacenter
        );
        var typeStr1 = ((ipInfo && ipInfo.asn && ipInfo.asn.type) || '').toLowerCase();
        var typeStr2 = ((ipInfo && ipInfo.company && ipInfo.company.type) || '').toLowerCase();
        var dcFromIPInfo = typeStr1 === 'hosting' || typeStr1 === 'datacenter' || typeStr1 === 'dc' || typeStr2 === 'hosting' || typeStr2 === 'datacenter' || typeStr2 === 'dc';
        var isDC = dcFromQuality || dcFromIPInfo;
        if (quality == null && !dcFromIPInfo) {
            setChip(els.ipType, null);
        } else {
            setChip(els.ipType, isDC);
        }
        
        // VPN/Proxy/Tor 检测（从多源聚合）
        var isVPN = anyTrue(
            mergedDetail.is_vpn,
            mg && mg.ipinfo && mg.ipinfo.vpn,
            mg && mg.ipregistry && mg.ipregistry.vpn,
            mg && mg.ipapi && mg.ipapi.vpn,
            mg && mg.ipqs && mg.ipqs.vpn,
            mg && mg.ipdata && mg.ipdata.vpn,
            mg && mg.ip2location && mg.ip2location.vpn
        );
        var isProxy = anyTrue(
            mergedDetail.is_proxy,
            mg && mg.ipinfo && mg.ipinfo.proxy,
            mg && mg.ipregistry && mg.ipregistry.proxy,
            mg && mg.ipapi && mg.ipapi.proxy,
            mg && mg.ipqs && mg.ipqs.proxy,
            mg && mg.ipdata && mg.ipdata.proxy,
            mg && mg.ip2location && mg.ip2location.proxy
        );
        var isTor = anyTrue(
            mergedDetail.is_tor,
            mg && mg.ipinfo && mg.ipinfo.tor,
            mg && mg.ipregistry && mg.ipregistry.tor,
            mg && mg.ipapi && mg.ipapi.tor,
            mg && mg.ipqs && mg.ipqs.tor,
            mg && mg.ipdata && mg.ipdata.tor,
            mg && mg.ip2location && mg.ip2location.tor
        );
        
        setChip(els.isVPN, isVPN);
        setChip(els.isProxy, isProxy);
        setChip(els.isTor, isTor);
        setChip(els.isAnycast, ipInfo && ipInfo.is_anycast);
        setChip(els.isMobile, ipInfo && ipInfo.is_mobile);
        setChip(els.isAnonymous, ipInfo && ipInfo.is_anonymous);
        setChip(els.isSatellite, ipInfo && ipInfo.is_satellite);

        updateProgress(t('progress.analyzing'));
        // 网络归属：从合并结果（ipapi > ipinfo > quality）多源取值，不再单一依赖 ipinfo
        var mdCompany = (mergedDetail && mergedDetail.company) || {};
        var mdAbuse = (mergedDetail && mergedDetail.abuse) || {};
        var mdAsn = (mergedDetail && mergedDetail.asn) || {};
        var mdDC = (mergedDetail && mergedDetail.datacenter) || {};
        setText(els.companyName, mdCompany.name || mdAsn.org || t('unknown'));
        setText(els.companyDomain, mdCompany.domain || mdAsn.domain || mdDC.domain || t('unknown'));
        setText(els.companyTypeRow, mdCompany.type || mdAsn.type || t('unknown'));
        setText(els.abuseName, mdAbuse.name || mdAsn.abuse || mdCompany.name || t('unknown'));
        setText(els.abuseEmail, mdAbuse.email || t('unknown'));
        setText(els.abusePhone, mdAbuse.phone || t('unknown'));
        setText(els.abuseAddress, mdAbuse.address || t('unknown'));
        setText(els.abuseNetwork, mdDC.network || mdAsn.route || t('unknown'));
        try { fillMultiSourceAttributes(mergedQuality); } catch (e) { console.warn('fillMultiSourceAttributes:', e); }

        updateProgress(t('progress.scoring'));
        try { fillMultiSourceScores(mergedQuality); } catch (e) { console.warn('fillMultiSourceScores:', e); }

        updateProgress(t('progress.factors'));
        try { fillMultiSourceFactors(mergedQuality); } catch (e) { console.warn('fillMultiSourceFactors:', e); }

        await reachabilityPromise;

        updateMapDisplay(lat, lon);
        
        // 计算综合评分
        updateProgress(t('progress.calculating'));
        calculateOverallScore(mergedQuality, mergedDetail, isDC, isVPN, isProxy, isTor);

        updateProgress(t('progress.done'), totalSteps - currentProgress);
        if (els.status) {
            els.status.innerHTML = '✅ ' + t('status.done');
            els.status.className = 'status success';
        }
    }
    
    // 计算综合评分（IP风险 + 网站可达性）
    function calculateOverallScore(mergedQuality, mergedDetail, isDC, isVPN, isProxy, isTor) {
        var overallScoreNum = document.getElementById('overallScoreNum');
        var overallScoreRing = document.getElementById('overallScoreRing');
        
        // ========== 1. IP风险评分（0-100，越高越好）==========
        var riskScore = 100;
        
        // 统计各数据源的风险判断数量，用于多源验证
        var riskCounters = {
            dc: 0, vpn: 0, proxy: 0, tor: 0, 
            abuser: 0, crawler: 0, mobile: 0, satellite: 0
        };
        var totalSources = 0;
        
        if (mergedQuality) {
            var sources = ['ip2location', 'ipapi', 'ipregistry', 'ipqs', 'scamalytics', 'ipdata', 'ipinfo', 'ipwhois', 'ippure'];
            sources.forEach(function(src) {
                var item = mergedQuality[src];
                if (item && item.countryCode) { // 有效数据源
                    totalSources++;
                    if (item.datacenter || item.server) riskCounters.dc++;
                    if (item.vpn) riskCounters.vpn++;
                    if (item.proxy) riskCounters.proxy++;
                    if (item.tor) riskCounters.tor++;
                    if (item.abuser) riskCounters.abuser++;
                    if (item.robot) riskCounters.crawler++;
                }
            });
        }
        
        // 计算多源确认比例（需要至少2个数据源响应）
        var minSources = Math.max(2, Math.floor(totalSources * 0.3)); // 至少30%数据源确认
        
        // 【高危风险项】多源确认后重度扣分
        // Tor洋葱路由：极高风险，多源确认扣40分，单源扣25分
        if (riskCounters.tor >= minSources) {
            riskScore -= 40;
        } else if (isTor || riskCounters.tor > 0) {
            riskScore -= 25;
        }
        
        // VPN：高风险，多源确认扣35分，单源扣20分
        if (riskCounters.vpn >= minSources) {
            riskScore -= 35;
        } else if (isVPN || riskCounters.vpn > 0) {
            riskScore -= 20;
        }
        
        // 代理服务器：高风险，多源确认扣35分，单源扣20分
        if (riskCounters.proxy >= minSources) {
            riskScore -= 35;
        } else if (isProxy || riskCounters.proxy > 0) {
            riskScore -= 20;
        }
        
        // 【中危风险项】
        // 机房IP：中风险，多源确认扣25分，单源扣12分
        if (riskCounters.dc >= minSources) {
            riskScore -= 25;
        } else if (isDC || riskCounters.dc > 0) {
            riskScore -= 12;
        }
        
        // 滥用记录：中风险，多源确认扣30分，单源扣15分
        if (riskCounters.abuser >= minSources) {
            riskScore -= 30;
        } else if (mergedDetail && mergedDetail.is_abuser) {
            riskScore -= 15;
        }
        
        // 【低危风险项】
        // 爬虫IP：低风险，多源确认扣15分，单源扣8分
        if (riskCounters.crawler >= minSources) {
            riskScore -= 15;
        } else if (mergedDetail && mergedDetail.is_crawler) {
            riskScore -= 8;
        }
        
        // 匿名IP：中风险，扣20分
        if (mergedDetail && mergedDetail.is_anonymous) riskScore -= 20;
        
        // 移动网络和卫星网络不扣分：这些是正常的网络类型，不属于风险
        // if (mergedDetail && mergedDetail.is_mobile) riskScore -= 0;
        // if (mergedDetail && mergedDetail.is_satellite) riskScore -= 0;
        
        // 保留IP（Bogon）：严重问题，扣50分
        if (mergedDetail && mergedDetail.is_bogon) riskScore -= 50;
        
        // 参考多源风险评分
        var validScores = [];
        if (mergedQuality) {
            var sources = ['ip2location', 'ipapi', 'ipregistry', 'ipqs', 'scamalytics', 'ipdata', 'ipinfo', 'ippure'];
            sources.forEach(function(src) {
                var item = mergedQuality[src];
                if (item && item.score != null && item.countryCode) { // 确保是有效数据源
                    var scoreStr = String(item.score).replace('%', '');
                    var riskNum = parseFloat(scoreStr);
                    if (!isNaN(riskNum) && riskNum >= 0 && riskNum <= 100) {
                        // 风险分转为安全分
                        var safetyScore = 100 - riskNum;
                        validScores.push(safetyScore);
                    }
                }
            });
        }
        
        // 如果有多源评分（至少2个），与本地计算加权平均
        // 数据源越多，越信任多源评分
        if (validScores.length >= 2) {
            var avgSourceScore = validScores.reduce(function(a, b) { return a + b; }, 0) / validScores.length;
            var sourceWeight = Math.min(0.7, 0.3 + validScores.length * 0.05); // 2源=0.4，5源=0.55，8源=0.7
            riskScore = Math.round(riskScore * (1 - sourceWeight) + avgSourceScore * sourceWeight);
        }
        
        riskScore = Math.min(100, Math.max(0, riskScore));
        
        // ========== 2. 网站可达性评分（0-100，越高越好）==========
        var reachScore = 0;
        var reachCount = 0;
        var unreachCount = 0;
        var siteScores = [];
        
        Object.keys(MEDIA_SITES).forEach(function(name) {
            var el = els.media[name];
            if (el && el.textContent) {
                var text = el.textContent;
                var isReachable = text.indexOf(t('reachable')) !== -1 || text.indexOf('ms') !== -1;
                var isUnreachable = text.indexOf(t('unreachable')) !== -1 || text.indexOf(t('blocked')) !== -1;
                
                if (isReachable) {
                    reachCount++;
                    // 提取延迟并计算评分
                    var match = text.match(/(\d+)ms/);
                    if (match) {
                        var latency = parseInt(match[1]);
                        // 新延迟评分逻辑：
                        // 可达即为80分（基础分）
                        // 延迟 ≤200ms: 80-100分（根据延迟线性递增）
                        // 延迟 >200ms: 开始扣分，最低40分
                        var latencyScore;
                        if (latency <= 200) {
                            // 延迟越低，分数越高：0ms=100分，200ms=80分
                            latencyScore = 100 - (latency / 200) * 20;
                        } else if (latency < 500) {
                            // 200-500ms：80分线性递减到60分
                            latencyScore = 80 - ((latency - 200) / 300) * 20;
                        } else if (latency < 1000) {
                            // 500-1000ms：60分线性递减到50分
                            latencyScore = 60 - ((latency - 500) / 500) * 10;
                        } else {
                            // 超过1000ms：40分（严重延迟但仍可达）
                            latencyScore = 40;
                        }
                        siteScores.push(latencyScore);
                    } else {
                        siteScores.push(80); // 可达但无延迟数据，给80分
                    }
                } else if (isUnreachable) {
                    unreachCount++;
                    siteScores.push(0); // 不可达记0分
                }
            }
        });
        
        // 计算可达性评分
        var totalSites = reachCount + unreachCount;
        if (siteScores.length > 0) {
            reachScore = siteScores.reduce(function(a, b) { return a + b; }, 0) / siteScores.length;
            // 不可达惩罚：每个不可达网站额外扣5分
            reachScore -= unreachCount * 5;
        } else {
            reachScore = 50; // 无测试数据，给中等分
        }
        
        reachScore = Math.min(100, Math.max(0, reachScore));
        
        // ========== 3. 综合评分 ==========
        // 权重：IP干净程度70%，延迟可达性30%
        var finalScore = Math.round(riskScore * 0.70 + reachScore * 0.30);
        finalScore = Math.min(100, Math.max(0, finalScore));
        
        // 更新UI
        if (overallScoreNum) {
            overallScoreNum.textContent = finalScore;
        }
        
        if (overallScoreRing) {
            var circumference = 301.59;
            var offset = circumference - (finalScore / 100) * circumference;
            overallScoreRing.style.strokeDashoffset = offset;
            
            // 根据分数设置颜色（更严格的评级）
            var scoreClass = '';
            if (finalScore >= 85) scoreClass = 'score-excellent';      // 优秀：85+
            else if (finalScore >= 70) scoreClass = 'score-good';      // 良好：70-84
            else if (finalScore >= 50) scoreClass = 'score-fair';      // 一般：50-69
            else scoreClass = 'score-poor';                             // 较差：<50
            
            overallScoreRing.className = 'ring-fg ' + scoreClass;
        }
        
        // 调试信息（开发环境可用）
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('评分详情:', {
                风险评分: riskScore,
                可达性评分: reachScore,
                综合评分: finalScore,
                数据源数量: totalSources,
                风险确认: riskCounters,
                多源评分数量: validScores.length,
                网站可达: reachCount + '/' + totalSites
            });
        }
    }

    /* 版本切换 */
    document.querySelectorAll('.version-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            selectedVersion = parseInt(btn.getAttribute('data-version'));
            document.querySelectorAll('.version-btn').forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');
        });
    });

    if (els.runBtn) {
        els.runBtn.addEventListener('click', function () {
            run().catch(function (err) {
                if (els.status) {
                    els.status.innerHTML = '❌ ' + t('status.failed') + ': ' + (err && err.message || t('unknown'));
                    els.status.className = 'status error';
                }
            });
        });
    }

    // 通用复制功能
    function setupCopyButton(btn, targetId) {
        btn.addEventListener('click', function () {
            var targetEl = document.getElementById(targetId);
            if (!targetEl) return;
            var text = (targetEl.textContent || '').trim();
            if (!text || text === '--') return;
            
            navigator.clipboard.writeText(text).then(function () {
                btn.classList.add('copied');
                // 显示对勾图标
                var originalHTML = btn.innerHTML;
                btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                
                setTimeout(function () {
                    btn.classList.remove('copied');
                    btn.innerHTML = originalHTML;
                }, 1600);
            }).catch(function () {});
        });
    }

    // IP复制按钮
    els.copyIp.addEventListener('click', function () {
        var text = (els.ip.textContent || '').trim();
        if (!text || text === '--') return;
        navigator.clipboard.writeText(text).then(function () {
            els.copyIp.classList.add('copied');
            var originalHTML = els.copyIp.innerHTML;
            els.copyIp.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
            setTimeout(function () {
                els.copyIp.classList.remove('copied');
                els.copyIp.innerHTML = originalHTML;
            }, 1600);
        }).catch(function () {});
    });

    // 绑定所有data-copy按钮
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        var targetId = btn.getAttribute('data-copy');
        setupCopyButton(btn, targetId);
    });

    /* 初始化 */
    // 优先使用已保存的主题设置，否则根据系统暗黑模式偏好自动检测
    var savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', savedTheme);
    applyLanguage();
    initialized = true;
    run().catch(function () {});
})();
</script>
<footer>
    <div style="margin-top: 16px;">
        <a href="https://github.com/PIKACHUIM/IPConfigWork" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px;">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
            <span>IPConfigWork</span>
        </a>
    </div>
</footer>
</body>
</html>
`;

export const SPEED_HTML: string = String.raw`<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>网速测试</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --bg: #070b14;
      --bg-soft: #0b1220;
      --surface: rgba(255, 255, 255, 0.03);
      --surface-hover: rgba(255, 255, 255, 0.06);
      --surface-solid: #0d1626;
      --border: rgba(255, 255, 255, 0.08);
      --border-strong: rgba(255, 255, 255, 0.16);
      --text: #f2f6fc;
      --text-2: #9aa8bd;
      --text-3: #5c6b82;
      --accent: #38bdf8;
      --accent-2: #6366f1;
      --green: #34d399;
      --yellow: #fbbf24;
      --red: #fb7185;
      --ring-track: rgba(255, 255, 255, 0.07);
      --glow: 0 0 80px rgba(56, 189, 248, 0.16);
      --card-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
      --font-head: 'Space Grotesk', sans-serif;
      --font-body: 'DM Sans', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --header-bg: rgba(10, 15, 28, 0.72);
    }

    :root[data-theme='light'] {
      --bg: #f4f7fb;
      --bg-soft: #ffffff;
      --surface: rgba(15, 23, 42, 0.03);
      --surface-hover: rgba(15, 23, 42, 0.06);
      --surface-solid: #ffffff;
      --border: rgba(15, 23, 42, 0.09);
      --border-strong: rgba(15, 23, 42, 0.18);
      --text: #0f172a;
      --text-2: #475569;
      --text-3: #94a3b8;
      --accent: #0284c7;
      --accent-2: #4f46e5;
      --green: #059669;
      --yellow: #d97706;
      --red: #e11d48;
      --ring-track: rgba(15, 23, 42, 0.08);
      --glow: 0 0 80px rgba(2, 132, 199, 0.12);
      --card-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
      --header-bg: rgba(255, 255, 255, 0.72);
    }

    * { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }

    body {
      font-family: var(--font-body);
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      transition: background 0.4s ease, color 0.4s ease;
      overflow-x: hidden;
    }

    .bg {
      position: fixed; inset: 0; z-index: -2; pointer-events: none;
      background:
        radial-gradient(1200px 600px at 50% -10%, rgba(56, 189, 248, 0.14), transparent 60%),
        radial-gradient(900px 500px at 90% 110%, rgba(99, 102, 241, 0.14), transparent 60%);
      transition: opacity 0.4s ease;
    }
    :root[data-theme='light'] .bg { opacity: 0.55; }
    .bg-grid {
      position: fixed; inset: 0; z-index: -1; pointer-events: none;
      background-image:
        linear-gradient(var(--border) 1px, transparent 1px),
        linear-gradient(90deg, var(--border) 1px, transparent 1px);
      background-size: 56px 56px;
      mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
      -webkit-mask-image: radial-gradient(ellipse 90% 60% at 50% 0%, black 30%, transparent 75%);
      opacity: 0.5;
    }

    .app { max-width: 1080px; margin: 0 auto; padding: 0 24px 64px; }

    .topbar {
      position: fixed; top: 20px; right: 28px; z-index: 60;
      display: flex; align-items: center; gap: 10px;
    }
    .icon-btn {
      display: inline-flex; align-items: center; justify-content: center;
      height: 40px; width: 40px; border-radius: 12px;
      border: 1px solid var(--border); background: var(--header-bg);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
      color: var(--text-2); cursor: pointer; transition: all 0.25s ease;
    }
    .icon-btn:hover { border-color: var(--border-strong); color: var(--text); transform: translateY(-1px); }
    .icon-btn svg { width: 19px; height: 19px; }
    .theme-toggle .sun { display: none; }
    :root[data-theme='light'] .theme-toggle .sun { display: block; }
    :root[data-theme='light'] .theme-toggle .moon { display: none; }

    .lang-switch {
      display: flex; align-items: center; height: 40px; padding: 3px;
      border-radius: 12px; border: 1px solid var(--border); background: var(--header-bg);
      backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    }
    .lang-btn {
      height: 32px; padding: 0 12px; border: none; border-radius: 9px;
      background: transparent; color: var(--text-2);
      font-family: var(--font-head); font-size: 13px; font-weight: 600; cursor: pointer;
      transition: all 0.25s ease;
    }
    .lang-btn.active { background: var(--accent); color: #04121f; box-shadow: 0 4px 14px rgba(56, 189, 248, 0.35); }
    :root[data-theme='light'] .lang-btn.active { color: #ffffff; }

    .header { padding: 108px 0 32px; text-align: center; animation: fadeUp 0.7s ease both; }
    .logo {
      display: inline-flex; align-items: center; justify-content: center;
      width: 64px; height: 64px; border-radius: 18px; margin-bottom: 24px;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      box-shadow: 0 10px 30px rgba(56, 189, 248, 0.35); color: #04121f;
    }
    :root[data-theme='light'] .logo { color: #ffffff; }
    .logo svg { width: 32px; height: 32px; }
    .header h1 {
      font-family: var(--font-head); font-size: clamp(2rem, 5vw, 3rem);
      font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
      background: linear-gradient(120deg, var(--text) 30%, var(--accent));
      -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    }
    .header p { margin-top: 14px; color: var(--text-2); font-size: 16px; }

    .tabs {
      display: inline-flex; align-items: center; gap: 4px; padding: 5px; margin-top: 24px;
      border-radius: 14px; border: 1px solid var(--border); background: var(--surface);
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    }
    .tab {
      display: inline-flex; align-items: center; gap: 8px; padding: 9px 22px;
      border-radius: 10px; border: none; background: transparent; color: var(--text-2);
      font-family: var(--font-head); font-size: 14px; font-weight: 600;
      text-decoration: none; cursor: pointer; transition: all 0.25s ease;
    }
    .tab:hover { color: var(--text); }
    .tab.active { background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #04121f; box-shadow: 0 6px 18px rgba(56, 189, 248, 0.35); }
    :root[data-theme='light'] .tab.active { color: #ffffff; }
    .tab svg { width: 16px; height: 16px; }

    /* ---------- 自定义下拉 ---------- */
    .node-panel { width: 100%; margin: 0 auto 28px; animation: fadeUp 0.7s ease 0.1s both; position: relative; z-index: 40; }
    .node-panel > label {
      display: block; font-family: var(--font-head); font-size: 13px; font-weight: 600;
      color: var(--text-2); margin-bottom: 10px; letter-spacing: 0.02em;
    }
    .node-panel > label:not(:first-child) { margin-top: 18px; }
    .node-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .node-col > label { display: block; font-family: var(--font-head); font-size: 13px; font-weight: 600; color: var(--text-2); margin-bottom: 10px; letter-spacing: 0.02em; }
    .select-wrap { position: relative; }
    .select-trigger {
      display: flex; align-items: center; gap: 12px; width: 100%;
      min-height: 56px; padding: 8px 16px; border-radius: 20px;
      border: 1px solid var(--border); background: var(--surface);
      cursor: pointer; transition: all 0.25s ease; text-align: left;
      backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
    }
    .select-trigger:hover, .select-trigger.open { border-color: var(--accent); background: var(--surface-hover); }
    .select-trigger .flag { font-size: 24px; line-height: 1; flex-shrink: 0; }
    .select-trigger .info { flex: 1; min-width: 0; }
    .select-trigger .info .name {
      font-family: var(--font-head); font-weight: 600; font-size: 15px; color: var(--text);
      white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .select-trigger .info .group { font-size: 12px; color: var(--text-3); margin-top: 1px; }
    .select-trigger .chevron {
      width: 20px; height: 20px; color: var(--text-3); flex-shrink: 0;
      transition: transform 0.25s ease;
    }
    .select-trigger.open .chevron { transform: rotate(180deg); color: var(--accent); }

    .badge {
      display: inline-flex; align-items: center; gap: 4px; flex-shrink: 0;
      font-family: var(--font-head); font-size: 10.5px; font-weight: 700;
      padding: 3px 8px; border-radius: 99px; letter-spacing: 0.02em; line-height: 1.2;
    }
    .badge.direct { background: rgba(52, 211, 153, 0.15); color: var(--green); }
    .badge.proxy { background: rgba(56, 189, 248, 0.15); color: var(--accent); }
    :root[data-theme='light'] .badge.direct { background: rgba(5, 150, 105, 0.12); color: #059669; }
    :root[data-theme='light'] .badge.proxy { background: rgba(2, 132, 199, 0.12); color: #0284c7; }

    .select-dropdown {
      position: absolute; top: calc(100% + 8px); left: 0; right: 0;
      border-radius: 20px; border: 1px solid var(--border-strong);
      background: var(--surface-solid); box-shadow: 0 24px 60px rgba(0, 0, 0, 0.5);
      backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
      max-height: 380px; overflow-y: auto; padding: 8px;
      display: none; animation: dropIn 0.22s ease both;
      overscroll-behavior: contain;
    }
    .select-dropdown.open { display: block; }
    :root[data-theme='light'] .select-dropdown { box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18); }

    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-8px) scale(0.98); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    .opt-group-label {
      padding: 10px 12px 6px; font-family: var(--font-head); font-size: 11px;
      font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-3);
    }
    .opt-group-label:first-child { padding-top: 6px; }
    .opt {
      display: flex; align-items: center; gap: 12px; width: 100%;
      padding: 10px 12px; border-radius: 11px; border: none; background: transparent;
      cursor: pointer; transition: background 0.15s ease; text-align: left;
    }
    .opt:hover { background: var(--surface-hover); }
    .opt.selected { background: rgba(56, 189, 248, 0.12); }
    :root[data-theme='light'] .opt.selected { background: rgba(2, 132, 199, 0.1); }
    .opt .flag { font-size: 20px; line-height: 1; flex-shrink: 0; }
    .opt .info { flex: 1; min-width: 0; }
    .opt .info .name { font-size: 14px; color: var(--text); font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .opt .info .sub { font-size: 11.5px; color: var(--text-3); margin-top: 1px; }
    .opt .check {
      width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
      display: inline-flex; align-items: center; justify-content: center;
      color: var(--accent); opacity: 0; transition: opacity 0.15s ease;
    }
    .opt.selected .check { opacity: 1; }
    .opt .check svg { width: 20px; height: 20px; }

    .select-dropdown::-webkit-scrollbar { width: 8px; }
    .select-dropdown::-webkit-scrollbar-thumb { background: var(--border-strong); border-radius: 99px; }
    .select-dropdown::-webkit-scrollbar-track { background: transparent; }

    .node-hint { margin-top: 10px; font-size: 12.5px; color: var(--text-3); text-align: center; }

    /* ---------- 指标卡片 ---------- */
    .metrics { width: 100%; margin: 0 auto 28px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
    .metric {
      background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
      padding: 26px; box-shadow: var(--card-shadow); backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px); text-align: center;
      transition: transform 0.3s ease, border-color 0.3s ease;
      animation: fadeUp 0.7s ease both;
    }
    .metric:nth-child(1) { animation-delay: 0.15s; }
    .metric:nth-child(2) { animation-delay: 0.22s; }
    .metric:nth-child(3) { animation-delay: 0.29s; }
    .metric:nth-child(4) { animation-delay: 0.36s; }
    .metric:hover { transform: translateY(-3px); border-color: var(--border-strong); }
    .metric .m-label {
      font-size: 12.5px; color: var(--text-3); font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 10px;
    }
    .metric .m-value {
      font-family: var(--font-mono); font-size: 30px; font-weight: 600; line-height: 1.15;
      color: var(--text); white-space: nowrap;
    }
    .metric .m-sub { margin-top: 6px; font-size: 12px; color: var(--text-3); min-height: 18px; }
    .metric .m-value.accent { color: var(--accent); }
    .metric .m-value.green { color: var(--green); }

    /* ---------- 进度 ---------- */
    .progress { width: 100%; max-width: 620px; margin: 22px auto 28px; animation: fadeUp 0.7s ease 0.1s both; }
    .progress-track { height: 5px; border-radius: 99px; background: var(--ring-track); overflow: hidden; }
    .progress-fill {
      height: 100%; width: 0%; border-radius: 99px;
      background: linear-gradient(90deg, var(--accent), var(--accent-2));
      transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      box-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
    }
    .progress-text { margin-top: 12px; text-align: center; font-family: var(--font-mono); font-size: 13px; color: var(--text-3); }

    /* ---------- 按钮 ---------- */
    .actions { display: flex; justify-content: center; animation: fadeUp 0.7s ease 0.3s both; }
    .btn-primary {
      display: inline-flex; align-items: center; gap: 10px; padding: 15px 38px;
      border: none; border-radius: 14px; font-family: var(--font-head); font-size: 15px;
      font-weight: 600; color: #04121f; background: linear-gradient(135deg, var(--accent), var(--accent-2));
      cursor: pointer; box-shadow: 0 8px 24px rgba(56, 189, 248, 0.35);
      transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
    }
    :root[data-theme='light'] .btn-primary { color: #ffffff; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 32px rgba(56, 189, 248, 0.45); }
    .btn-primary:active { transform: translateY(0); }
    .btn-primary:disabled { opacity: 0.55; cursor: not-allowed; transform: none; }
    .btn-primary svg { width: 18px; height: 18px; }

    footer { margin-top: 56px; text-align: center; color: var(--text-3); font-size: 13px; animation: fadeUp 0.7s ease 0.4s both; }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
    footer .edu-links { margin-top: 14px; display: flex; flex-wrap: wrap; justify-content: center; gap: 8px 16px; }
    footer .edu-links a { font-size: 12.5px; color: var(--text-2); }
    footer .edu-links a:hover { color: var(--accent); }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 860px) {
      .metrics { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 640px) {
      .topbar { top: 14px; right: 16px; }
      .header { padding-top: 96px; }
      .metrics { grid-template-columns: 1fr 1fr; gap: 12px; }
      .metric .m-value { font-size: 24px; }
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="bg-grid"></div>

  <div class="topbar">
    <div class="lang-switch">
      <button class="lang-btn active" data-lang="zh">中</button>
      <button class="lang-btn" data-lang="en">EN</button>
    </div>
    <button class="icon-btn theme-toggle" id="theme-toggle" aria-label="切换主题" title="切换主题">
      <svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      <svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
    </button>
  </div>

  <div class="app">
    <header class="header">
      <div class="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 12l5-5"/><circle cx="12" cy="12" r="1.5"/></svg>
      </div>
      <h1 data-i18n="header.title">网速测试</h1>
      <p data-i18n="header.desc">选择测试节点，测量下载 / 上传速度与延迟、抖动</p>
      <nav class="tabs">
        <a href="/" class="tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          <span data-i18n="nav.ip">获取IP地址</span>
        </a>
        <a href="/check" class="tab">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
          <span data-i18n="nav.quality">IP质量检测</span>
        </a>
        <a href="/speed" class="tab active">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9"/><path d="M12 12l5-5"/><circle cx="12" cy="12" r="1.5"/></svg>
          <span data-i18n="nav.speed">网速测试</span>
        </a>
      </nav>

      <div class="progress">
        <div class="progress-track"><div class="progress-fill" id="progress-fill"></div></div>
        <div class="progress-text" id="progress-text" data-i18n="progress.preparing">准备开始测试...</div>
      </div>
    </header>

    <section class="node-panel">
      <div class="node-row">
        <div class="node-col">
          <label data-i18n="node.downloadLabel">下载节点（100MB）</label>
          <div class="select-wrap" id="download-select"></div>
        </div>
        <div class="node-col">
          <label data-i18n="node.uploadLabel">上传节点</label>
          <div class="select-wrap" id="upload-select"></div>
        </div>
      </div>
      <div class="node-hint" data-i18n="node.hint">全部节点均支持浏览器直连测速，结果反映你到该节点的真实链路质量</div>
    </section>

    <div class="metrics">
      <div class="metric">
        <div class="m-label" data-i18n="metric.latency">延迟 Latency</div>
        <div class="m-value accent" id="m-latency">--</div>
        <div class="m-sub" id="m-latency-sub"></div>
      </div>
      <div class="metric">
        <div class="m-label" data-i18n="metric.jitter">抖动 Jitter</div>
        <div class="m-value" id="m-jitter">--</div>
        <div class="m-sub" data-i18n="metric.jitterSub">标准差</div>
      </div>
      <div class="metric">
        <div class="m-label" data-i18n="metric.download">下载速度</div>
        <div class="m-value green" id="m-download">--</div>
        <div class="m-sub" id="m-download-sub"></div>
      </div>
      <div class="metric">
        <div class="m-label" data-i18n="metric.upload">上传速度</div>
        <div class="m-value" id="m-upload">--</div>
        <div class="m-sub" id="m-upload-sub"></div>
      </div>
    </div>

    <div class="actions">
      <button class="btn-primary" id="run-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        <span data-i18n="btn.run">开始测试</span>
      </button>
    </div>

    <footer>
      <span data-i18n="footer.notice">本站仅提供IP地址查询与网络测速功能，不提供其它任何服务，也不与别的网站有任何合作。</span>
      <div class="edu-links">
        <span data-i18n="footer.edu">教育网测速站：</span>
        <a href="http://test.ustc.edu.cn/" target="_blank" rel="noopener">中科大 IPv4</a>
        <a href="http://test6.ustc.edu.cn/" target="_blank" rel="noopener">中科大 IPv6</a>
        <a href="https://test.nju.edu.cn/" target="_blank" rel="noopener">南京大学</a>
        <a href="http://speed.nuaa.edu.cn/" target="_blank" rel="noopener">南京航空航天大学</a>
        <a href="http://speedtest.sec.edu.cn/" target="_blank" rel="noopener">CERNET</a>
      </div>
      <div style="margin-top: 16px;">
        <a href="https://github.com/PIKACHUIM/IPConfigWork" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 6px;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span>IPConfigWork</span>
        </a>
      </div>
    </footer>
  </div>

  <script>
    (function () {
      'use strict';

      /* ---------- 多语言 ---------- */
      var I18N = {
        zh: {
          'page.title': '网速测试',
          'header.title': '网速测试',
          'header.desc': '选择测试节点，测量下载 / 上传速度与延迟、抖动',
          'nav.ip': '获取IP地址',
          'nav.quality': 'IP质量检测',
          'nav.speed': '网速测试',
          'node.downloadLabel': '下载节点（100MB）',
          'node.uploadLabel': '上传节点',
          'node.hint': '全部节点均支持浏览器直连测速，结果反映你到该节点的真实链路质量',
          'metric.latency': '延迟 Latency',
          'metric.jitter': '抖动 Jitter',
          'metric.jitterSub': '标准差',
          'metric.download': '下载速度',
          'metric.download.sub': '已下载',
          'metric.upload': '上传速度',
          'metric.upload.sub': '已上传',
          'progress.preparing': '准备开始测试...',
          'progress.ping': '正在测量延迟与抖动...',
          'progress.download': '正在测试下载速度...',
          'progress.upload': '正在测试上传速度...',
          'progress.done': '测试完成',
          'status.testing': '测试中...',
          'status.failed': '失败',
          'status.pingFailed': '无法测通',
          'btn.run': '开始测试',
          'btn.running': '测试中...',
          'footer.notice': '本站仅提供IP地址查询与网络测速功能，不提供其它任何服务，也不与别的网站有任何合作。',
          'footer.edu': '教育网测速站：',
          'footer.project': 'IPConfigWork',
          'badge.direct': '直连',
          'badge.proxy': '代理',
          'theme.dark': '切换亮色模式',
          'theme.light': '切换暗色模式',
          'region.anycast': '全球 Anycast',
          'region.asia': '亚洲',
          'region.europe': '欧洲',
          'region.nawest': '北美 · 美西',
          'region.naeast': '北美 · 美东/中部',
          'region.southamerica': '南美',
          'region.oceania': '大洋洲',
          'node.cloudflare': 'Cloudflare 全球',
          'node.hongkong': '中国香港',
          'node.singapore': '新加坡',
          'node.tokyo': '日本东京',
          'node.frankfurt': '德国法兰克福',
          'node.amsterdam': '荷兰阿姆斯特丹',
          'node.london': '英国伦敦',
          'node.paris': '法国巴黎',
          'node.madrid': '西班牙马德里',
          'node.milan': '意大利米兰',
          'node.stockholm': '瑞典斯德哥尔摩',
          'node.losangeles': '洛杉矶',
          'node.seattle': '西雅图',
          'node.newyork': '纽约',
          'node.miami': '迈阿密',
          'node.ashburn': '阿什本（弗吉尼亚）',
          'node.chicago': '芝加哥',
          'node.dallas': '达拉斯',
          'node.toronto': '多伦多（加拿大）',
          'node.saopaulo': '圣保罗（巴西）',
          'node.sydney': '悉尼（澳大利亚）'
        },
        en: {
          'page.title': 'Speed Test',
          'header.title': 'Speed Test',
          'header.desc': 'Pick a node to measure download / upload speed, latency and jitter',
          'nav.ip': 'Get IP',
          'nav.quality': 'IP Quality',
          'nav.speed': 'Speed Test',
          'node.downloadLabel': 'Download node (100MB)',
          'node.uploadLabel': 'Upload node',
          'node.hint': 'All nodes support direct browser speed test, reflecting the real path quality to that node',
          'metric.latency': 'Latency',
          'metric.jitter': 'Jitter',
          'metric.jitterSub': 'std. deviation',
          'metric.download': 'Download',
          'metric.download.sub': 'downloaded',
          'metric.upload': 'Upload',
          'metric.upload.sub': 'uploaded',
          'progress.preparing': 'Preparing...',
          'progress.ping': 'Measuring latency & jitter...',
          'progress.download': 'Testing download speed...',
          'progress.upload': 'Testing upload speed...',
          'progress.done': 'Test complete',
          'status.testing': 'Testing...',
          'status.failed': 'Failed',
          'status.pingFailed': 'Unreachable',
          'btn.run': 'Start Test',
          'btn.running': 'Testing...',
          'footer.notice': 'This site only provides IP lookup and network speed test; it provides no other services nor cooperates with any other website.',
          'footer.edu': 'Campus networks: ',
          'footer.project': 'IPConfigWork',
          'badge.direct': 'Direct',
          'badge.proxy': 'Proxy',
          'theme.dark': 'Switch to light mode',
          'theme.light': 'Switch to dark mode',
          'region.anycast': 'Global Anycast',
          'region.asia': 'Asia',
          'region.europe': 'Europe',
          'region.nawest': 'North America · West',
          'region.naeast': 'North America · East/Central',
          'region.southamerica': 'South America',
          'region.oceania': 'Oceania',
          'node.cloudflare': 'Cloudflare Global',
          'node.hongkong': 'Hong Kong',
          'node.singapore': 'Singapore',
          'node.tokyo': 'Tokyo, Japan',
          'node.frankfurt': 'Frankfurt, Germany',
          'node.amsterdam': 'Amsterdam, Netherlands',
          'node.london': 'London, UK',
          'node.paris': 'Paris, France',
          'node.madrid': 'Madrid, Spain',
          'node.milan': 'Milan, Italy',
          'node.stockholm': 'Stockholm, Sweden',
          'node.losangeles': 'Los Angeles',
          'node.seattle': 'Seattle',
          'node.newyork': 'New York',
          'node.miami': 'Miami',
          'node.ashburn': 'Ashburn (Virginia)',
          'node.chicago': 'Chicago',
          'node.dallas': 'Dallas',
          'node.toronto': 'Toronto, Canada',
          'node.saopaulo': 'São Paulo, Brazil',
          'node.sydney': 'Sydney, Australia'
        }
      };

      // 优先使用已保存的语言设置，否则根据浏览器语言自动检测
      var currentLang = localStorage.getItem('lang');
      if (!currentLang) {
        var browserLang = navigator.language || navigator.languages[0] || 'zh-CN';
        currentLang = browserLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
      }

      function t(key) {
        return (I18N[currentLang] && I18N[currentLang][key]) || I18N.zh[key] || key;
      }

      /* ---------- 下载测速节点（仅 100MB，支持 CORS 直连） ---------- */
      var DOWNLOAD_NODES = [
        { group: 'region.anycast', items: [
          { flag: '☁️', nameKey: 'node.cloudflare', sub: 'Anycast · 100MB', type: 'direct', url: 'https://speed.cloudflare.com/__down?bytes=104857600' }
        ]},
        { group: 'region.asia', items: [
          { flag: '🇭🇰', nameKey: 'node.hongkong', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://hkg.download.datapacket.com/100mb.bin' },
          { flag: '🇸🇬', nameKey: 'node.singapore', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://sgp.download.datapacket.com/100mb.bin' },
          { flag: '🇯🇵', nameKey: 'node.tokyo', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://tyo.download.datapacket.com/100mb.bin' }
        ]},
        { group: 'region.europe', items: [
          { flag: '🇩🇪', nameKey: 'node.frankfurt', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://fra.download.datapacket.com/100mb.bin' },
          { flag: '🇳🇱', nameKey: 'node.amsterdam', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://ams.download.datapacket.com/100mb.bin' },
          { flag: '🇬🇧', nameKey: 'node.london', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://lon.download.datapacket.com/100mb.bin' },
          { flag: '🇫🇷', nameKey: 'node.paris', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://par.download.datapacket.com/100mb.bin' },
          { flag: '🇪🇸', nameKey: 'node.madrid', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://mad.download.datapacket.com/100mb.bin' },
          { flag: '🇮🇹', nameKey: 'node.milan', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://mil.download.datapacket.com/100mb.bin' },
          { flag: '🇸🇪', nameKey: 'node.stockholm', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://sto.download.datapacket.com/100mb.bin' }
        ]},
        { group: 'region.nawest', items: [
          { flag: '🇺🇸', nameKey: 'node.losangeles', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://lax.download.datapacket.com/100mb.bin' },
          { flag: '🇺🇸', nameKey: 'node.seattle', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://sea.download.datapacket.com/100mb.bin' }
        ]},
        { group: 'region.naeast', items: [
          { flag: '🇺🇸', nameKey: 'node.newyork', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://nyc.download.datapacket.com/100mb.bin' },
          { flag: '🇺🇸', nameKey: 'node.miami', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://mia.download.datapacket.com/100mb.bin' },
          { flag: '🇺🇸', nameKey: 'node.ashburn', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://ash.download.datapacket.com/100mb.bin' },
          { flag: '🇺🇸', nameKey: 'node.chicago', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://chi.download.datapacket.com/100mb.bin' },
          { flag: '🇺🇸', nameKey: 'node.dallas', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://dal.download.datapacket.com/100mb.bin' },
          { flag: '🇨🇦', nameKey: 'node.toronto', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://tor.download.datapacket.com/100mb.bin' }
        ]},
        { group: 'region.southamerica', items: [
          { flag: '🇧🇷', nameKey: 'node.saopaulo', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://sao.download.datapacket.com/100mb.bin' }
        ]},
        { group: 'region.oceania', items: [
          { flag: '🇦🇺', nameKey: 'node.sydney', sub: 'CDN77 · 100MB', type: 'direct', url: 'https://syd.download.datapacket.com/100mb.bin' }
        ]}
      ];

      /* ---------- 上传测速节点 ---------- */
      var UPLOAD_NODES = [
        { group: 'region.anycast', items: [
          { flag: '☁️', nameKey: 'node.cloudflare', sub: 'Worker · 100MB', type: 'direct', url: '/api/upload' }
        ]}
      ];

      var DOWNLOAD_FLAT = [];
      for (var gi = 0; gi < DOWNLOAD_NODES.length; gi++) {
        for (var ni = 0; ni < DOWNLOAD_NODES[gi].items.length; ni++) {
          var it = DOWNLOAD_NODES[gi].items[ni];
          DOWNLOAD_FLAT.push({ group: DOWNLOAD_NODES[gi].group, flag: it.flag, nameKey: it.nameKey, sub: it.sub, type: it.type, url: it.url, ping: it.ping || it.url });
        }
      }

      var UPLOAD_FLAT = [];
      for (var gi = 0; gi < UPLOAD_NODES.length; gi++) {
        for (var ni = 0; ni < UPLOAD_NODES[gi].items.length; ni++) {
          var it = UPLOAD_NODES[gi].items[ni];
          UPLOAD_FLAT.push({ group: UPLOAD_NODES[gi].group, flag: it.flag, nameKey: it.nameKey, sub: it.sub, type: it.type, url: it.url, ping: 'https://speed.cloudflare.com/__down?bytes=0' });
        }
      }

      /* ---------- 自定义下拉（下载） ---------- */
      var downloadSelectedIdx = 0;
      var uploadSelectedIdx = 0;

      function renderSelect(containerID, nodes, flat, selectedIdx, onChange) {
        var container = document.getElementById(containerID);
        container.innerHTML = '';

        var trigger = document.createElement('div');
        trigger.className = 'select-trigger';
        trigger.innerHTML =
          '<span class="flag"></span>' +
          '<div class="info"><div class="name"></div><div class="group"></div></div>' +
          '<span class="badge"></span>' +
          '<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';

        var dropdown = document.createElement('div');
        dropdown.className = 'select-dropdown';

        function updateTrigger() {
          var node = flat[selectedIdx];
          trigger.querySelector('.flag').textContent = node.flag;
          trigger.querySelector('.name').textContent = t(node.nameKey);
          trigger.querySelector('.group').textContent = t(node.group);
          var badge = trigger.querySelector('.badge');
          badge.className = 'badge ' + node.type;
          badge.textContent = t(node.type === 'direct' ? 'badge.direct' : 'badge.proxy');
          var opts = dropdown.querySelectorAll('.opt');
          for (var i = 0; i < opts.length; i++) {
            opts[i].classList.toggle('selected', i === selectedIdx);
          }
        }

        function renderDropdown() {
          dropdown.innerHTML = '';
          var flatIdx = 0;
          for (var i = 0; i < nodes.length; i++) {
            var label = document.createElement('div');
            label.className = 'opt-group-label';
            label.textContent = t(nodes[i].group);
            dropdown.appendChild(label);
            for (var j = 0; j < nodes[i].items.length; j++) {
              (function (idx) {
                var node = flat[idx];
                var opt = document.createElement('button');
                opt.type = 'button';
                opt.className = 'opt' + (idx === selectedIdx ? ' selected' : '');
                opt.innerHTML =
                  '<span class="flag">' + node.flag + '</span>' +
                  '<div class="info"><div class="name"></div><div class="sub"></div></div>' +
                  '<span class="badge ' + node.type + '"></span>' +
                  '<span class="check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>';
                opt.querySelector('.name').textContent = t(node.nameKey);
                opt.querySelector('.sub').textContent = node.sub;
                opt.querySelector('.badge').textContent = t(node.type === 'direct' ? 'badge.direct' : 'badge.proxy');
                opt.addEventListener('click', function () {
                  selectedIdx = idx;
                  updateTrigger();
                  closeDropdown();
                  if (onChange) onChange(idx);
                });
                dropdown.appendChild(opt);
              })(flatIdx);
              flatIdx++;
            }
          }
        }

        function openDropdown() {
          dropdown.classList.add('open');
          trigger.classList.add('open');
        }
        function closeDropdown() {
          dropdown.classList.remove('open');
          trigger.classList.remove('open');
        }

        trigger.addEventListener('click', function (e) {
          e.stopPropagation();
          if (dropdown.classList.contains('open')) closeDropdown();
          else openDropdown();
        });

        document.addEventListener('click', function (e) {
          if (!trigger.contains(e.target) && !dropdown.contains(e.target)) closeDropdown();
        });
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') closeDropdown();
        });

        renderDropdown();
        updateTrigger();

        container.appendChild(trigger);
        container.appendChild(dropdown);

        return { updateTrigger: updateTrigger, renderDropdown: renderDropdown };
      }

      var downloadSelect = renderSelect('download-select', DOWNLOAD_NODES, DOWNLOAD_FLAT, downloadSelectedIdx, function (idx) {
        downloadSelectedIdx = idx;
      });

      var uploadSelect = renderSelect('upload-select', UPLOAD_NODES, UPLOAD_FLAT, uploadSelectedIdx, function (idx) {
        uploadSelectedIdx = idx;
      });

      /* ---------- 语言/主题切换时刷新下拉 ---------- */
      function refreshDropdownLabels() {
        downloadSelect.renderDropdown();
        downloadSelect.updateTrigger();
        uploadSelect.renderDropdown();
        uploadSelect.updateTrigger();
      }

      function applyLanguage() {
        document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
        document.title = t('page.title');
        var els = document.querySelectorAll('[data-i18n]');
        for (var i = 0; i < els.length; i++) {
          els[i].textContent = t(els[i].getAttribute('data-i18n'));
        }
        var btns = document.querySelectorAll('.lang-btn');
        for (var j = 0; j < btns.length; j++) {
          if (btns[j].getAttribute('data-lang') === currentLang) btns[j].classList.add('active');
          else btns[j].classList.remove('active');
        }
        var themeBtn = document.getElementById('theme-toggle');
        var theme = document.documentElement.getAttribute('data-theme');
        themeBtn.title = t(theme === 'light' ? 'theme.light' : 'theme.dark');
        themeBtn.setAttribute('aria-label', themeBtn.title);
        refreshDropdownLabels();
        updateRunBtn();
      }

      var langBtns = document.querySelectorAll('.lang-btn');
      for (var li = 0; li < langBtns.length; li++) {
        langBtns[li].addEventListener('click', function () {
          currentLang = this.getAttribute('data-lang');
          localStorage.setItem('lang', currentLang);
          applyLanguage();
        });
      }

      /* ---------- 主题 ---------- */
      function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        var btn = document.getElementById('theme-toggle');
        btn.title = t(theme === 'light' ? 'theme.light' : 'theme.dark');
        btn.setAttribute('aria-label', btn.title);
      }
      document.getElementById('theme-toggle').addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme');
        applyTheme(current === 'light' ? 'dark' : 'light');
      });

      /* ---------- 工具 ---------- */
      var DOWNLOAD_SIZE = 104857600; // 100 MiB
      var UPLOAD_SIZE = 100 * 1024 * 1024; // 100 MiB，上传测速数据量
      var PING_COUNT = 8;

      function fmtMs(v) { return Math.round(v) + ' ms'; }

      function fmtSpeed(bytesPerSec) {
        if (!isFinite(bytesPerSec) || bytesPerSec <= 0) return '--';
        var mbps = bytesPerSec * 8 / 1000000;
        if (mbps >= 1) return mbps.toFixed(2) + ' Mbps';
        var kbps = bytesPerSec * 8 / 1000;
        return kbps.toFixed(1) + ' Kbps';
      }

      function fmtBytes(v) {
        if (v >= 1048576) return (v / 1048576).toFixed(1) + ' MB';
        if (v >= 1024) return (v / 1024).toFixed(1) + ' KB';
        return v + ' B';
      }

      function setMetric(id, value, className, sub) {
        var el = document.getElementById(id);
        if (el) {
          el.textContent = value;
          el.className = 'm-value' + (className ? ' ' + className : '');
        }
        var subEl = document.getElementById(id + '-sub');
        if (subEl && sub != null) subEl.textContent = sub;
      }

      function setProgress(pct, text) {
        var fill = document.getElementById('progress-fill');
        fill.style.width = Math.max(0, Math.min(100, pct)) + '%';
        document.getElementById('progress-text').textContent = text;
      }

      var running = false;
      function updateRunBtn() {
        var btn = document.getElementById('run-btn');
        btn.disabled = running;
        var span = btn.querySelector('span');
        if (span) span.textContent = t(running ? 'btn.running' : 'btn.run');
      }

      /* ---------- 延迟 / 抖动 ---------- */
      function pingOnce(node) {
        var t0 = performance.now();
        var target;
        if (node.type === 'direct') {
          // 直连：浏览器直接请求（带 Range 只测 TTFB，随后取消 body）
          target = fetch(node.ping, {
            cache: 'no-store',
            referrerPolicy: 'origin',
            headers: { 'Range': 'bytes=0-0' }
          }).then(function (resp) {
            if (resp.body) resp.body.cancel();
            return performance.now() - t0;
          });
        } else {
          // 代理：经本站 Worker
          target = fetch('/api/ping?url=' + encodeURIComponent(node.ping), { cache: 'no-store' })
            .then(function (resp) {
              if (resp.ok) return performance.now() - t0;
              throw new Error('HTTP ' + resp.status);
            });
        }
        return target.catch(function () { return -1; });
      }

      function measurePing(node) {
        var samples = [];
        function loop(i) {
          if (i >= PING_COUNT) return Promise.resolve();
          return pingOnce(node).then(function (dt) {
            if (dt > 0) samples.push(dt);
            return loop(i + 1);
          });
        }
        return loop(0).then(function () {
          if (samples.length < 3) throw new Error('ping failed');
          var sum = 0;
          for (var i = 0; i < samples.length; i++) sum += samples[i];
          var avg = sum / samples.length;
          var varSum = 0;
          for (var k = 0; k < samples.length; k++) {
            var d = samples[k] - avg;
            varSum += d * d;
          }
          var std = Math.sqrt(varSum / samples.length);
          return { latency: avg, jitter: std, count: samples.length };
        });
      }

      /* ---------- 下载测速（直连或代理，流式读取） ---------- */
      function testDownload(node) {
        var target;
        if (node.type === 'direct') {
          target = node.url; // 直连
        } else {
          target = '/api/download?url=' + encodeURIComponent(node.url); // 代理
        }
        return fetch(target, { cache: 'no-store', referrerPolicy: 'origin' })
          .then(function (resp) {
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            var reader = resp.body.getReader();
            var total = 0;
            var start = performance.now();
            var lastTime = start;
            var lastBytes = 0;
            var peak = 0;

            function read() {
              return reader.read().then(function (res) {
                if (res.done) {
                  var elapsed = (performance.now() - start) / 1000;
                  var avg = elapsed > 0 ? total / elapsed : 0;
                  return { bytes: total, avg: avg, peak: peak, seconds: elapsed };
                }
                total += res.value.length;
                var now = performance.now();
                var dt = (now - lastTime) / 1000;
                if (dt >= 0.5) {
                  var cur = (total - lastBytes) / dt;
                  if (cur > peak) peak = cur;
                  lastTime = now;
                  lastBytes = total;
                  var pct = (total / DOWNLOAD_SIZE) * 100;
                  setProgress(15 + pct * 0.7, t('progress.download') + ' ' + fmtSpeed(cur) + ' · ' + fmtBytes(total));
                  setMetric('m-download', fmtSpeed(cur), 'green', fmtBytes(total) + ' / ~100MB');
                }
                return read();
              });
            }
            return read();
          });
      }

      /* ---------- 上传测速（Cloudflare __up 直连，全球 Anycast；失败回退本站 Worker） ---------- */
      function testUpload() {
        var blob = new Blob([new Uint8Array(UPLOAD_SIZE)]);
        setMetric('m-upload', t('status.testing'), '', '');

        return new Promise(function (resolve, reject) {
          var start = performance.now();

          function attemptUpload(url) {
            return new Promise(function (res, rej) {
              var xhr = new XMLHttpRequest();
              xhr.open('POST', url, true);
              xhr.setRequestHeader('Content-Type', 'application/octet-stream');
              // 移除 Cache-Control，避免 Cloudflare CORS preflight 失败

              var progressCount = 0;
              xhr.upload.onprogress = function (e) {
                progressCount++;
                if (e.lengthComputable && e.loaded > 0) {
                  var now = performance.now();
                  var elapsed = (now - start) / 1000;
                  if (elapsed > 0) {
                    var currentSpeed = e.loaded / elapsed;
                    var progress = Math.floor(e.loaded / e.total * 100);
                    console.log('[Upload Progress]', progressCount, 'loaded:', e.loaded, 'total:', e.total, 'speed:', fmtSpeed(currentSpeed), 'progress:', progress + '%');
                    setMetric('m-upload', fmtSpeed(currentSpeed), 'purple', t('metric.upload.sub') + ' (' + progress + '%)');
                  }
                }
              };

              xhr.onloadstart = function () {
                console.log('[Upload Start]', url);
              };

              xhr.onload = function () {
                console.log('[Upload Complete] status:', xhr.status, 'progress events:', progressCount);
                if (xhr.status >= 200 && xhr.status < 300) {
                  var elapsed = (performance.now() - start) / 1000;
                  var speed = elapsed > 0 ? UPLOAD_SIZE / elapsed : 0;
                  res({ bytes: UPLOAD_SIZE, speed: speed, seconds: elapsed });
                } else {
                  rej(new Error('HTTP ' + xhr.status));
                }
              };

              xhr.onerror = function () { 
                console.log('[Upload Error]', url);
                rej(new Error('Network error')); 
              };
              xhr.ontimeout = function () { 
                console.log('[Upload Timeout]', url);
                rej(new Error('Timeout')); 
              };
              
              console.log('[Upload Sending]', UPLOAD_SIZE, 'bytes to', url);
              xhr.send(blob);
            });
          }

          // 优先 Cloudflare 直连；失败回退本站 Worker
          attemptUpload('https://speed.cloudflare.com/__up')
            .then(resolve)
            .catch(function (err) {
              console.log('[Upload Fallback] Cloudflare failed, trying local:', err.message);
              start = performance.now(); // 重置计时
              return attemptUpload('/api/upload').then(resolve).catch(reject);
            });
        });
      }

      /* ---------- 主流程 ---------- */
      var phase = 'ping';

      function run() {
        if (running) return;
        running = true;
        updateRunBtn();
        
        var downloadNode = DOWNLOAD_FLAT[downloadSelectedIdx];
        var uploadNode = UPLOAD_FLAT[uploadSelectedIdx];

        phase = 'ping';

        setMetric('m-latency', t('status.testing'), 'accent', '');
        setMetric('m-jitter', '--', '', t('metric.jitterSub'));
        setMetric('m-download', '--', 'green', '');
        setMetric('m-upload', '--', '', '');
        setProgress(2, t('progress.ping'));

        measurePing(downloadNode)
          .then(function (ping) {
            phase = 'download';
            setMetric('m-latency', fmtMs(ping.latency), 'accent', ping.count + ' 次采样');
            setMetric('m-jitter', fmtMs(ping.jitter), '', t('metric.jitterSub'));
            setProgress(15, t('progress.download'));
            return testDownload(downloadNode);
          })
          .then(function (dl) {
            phase = 'upload';
            setMetric('m-download', fmtSpeed(dl.avg), 'green', fmtBytes(dl.bytes) + ' · ' + dl.seconds.toFixed(1) + 's');
            setProgress(88, t('progress.upload'));
            return testUpload();
          })
          .then(function (up) {
            setMetric('m-upload', fmtSpeed(up.speed), '', fmtBytes(up.bytes) + ' · ' + up.seconds.toFixed(1) + 's');
            setProgress(100, t('progress.done'));
          })
          .catch(function (err) {
            var msg = (err && err.message) || t('status.failed');
            if (phase === 'ping') {
              setMetric('m-latency', t('status.failed'), '', '');
              setMetric('m-jitter', '--', '', t('metric.jitterSub'));
            }
            if (phase === 'ping' || phase === 'download') {
              setMetric('m-download', t('status.failed'), '', msg);
            }
            if (phase === 'upload') {
              setMetric('m-upload', t('status.failed'), '', msg);
            }
            setProgress(0, t('status.failed') + ': ' + msg);
          })
          .then(function () {
            running = false;
            updateRunBtn();
          });
      }

      document.getElementById('run-btn').addEventListener('click', run);

      /* ---------- 初始化 ---------- */
      // 优先使用已保存的主题设置，否则根据系统暗黑模式偏好自动检测
      var savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        savedTheme = prefersDark ? 'dark' : 'light';
      }
      document.documentElement.setAttribute('data-theme', savedTheme);
      downloadSelect.renderDropdown();
      downloadSelect.updateTrigger();
      uploadSelect.renderDropdown();
      uploadSelect.updateTrigger();
      applyLanguage();
      setProgress(0, t('progress.preparing'));
    })();
  </script>
</body>
</html>
`;
