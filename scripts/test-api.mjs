#!/usr/bin/env node

/**
 * 测试 /api/ip-quality 接口
 * 用于验证原生检测数据（ipinfo/ipregistry/ipapi 的 usageType 和 companyType）是否正常返回
 */

const testIP = process.argv[2] || '8.8.8.8';
const apiUrl = process.env.API_URL || 'http://localhost:8787';

console.log('═══════════════════════════════════════════════');
console.log('测试 IP 质量检测 API');
console.log('═══════════════════════════════════════════════');
console.log('测试 IP:', testIP);
console.log('API 地址:', apiUrl);
console.log('');

async function testAPI() {
    try {
        const url = `${apiUrl}/api/ip-quality`;
        console.log('📡 发送请求到:', url);
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ ip: testIP })
        });

        console.log('📊 响应状态:', response.status, response.statusText);
        console.log('');

        if (!response.ok) {
            const text = await response.text();
            console.error('❌ API 错误:', text);
            return;
        }

        const data = await response.json();
        
        // 检查原生检测所需的三个数据源
        console.log('🔍 原生检测数据验证:');
        console.log('─────────────────────────────────────────────');
        
        const sources = ['ipinfo', 'ipregistry', 'ipapi'];
        
        sources.forEach(source => {
            const item = data[source];
            console.log(`\n📌 ${source.toUpperCase()}:`);
            
            if (!item) {
                console.log('  ❌ 数据源不存在');
                if (data.errors && data.errors[source]) {
                    console.log('  ⚠️  错误信息:', data.errors[source]);
                }
                return;
            }
            
            console.log('  ✓ 数据源存在');
            console.log('  - usageType:', item.usageType || '(空)');
            console.log('  - usageTypeRaw:', item.usageTypeRaw || '(空)');
            console.log('  - companyType:', item.companyType || '(空)');
            console.log('  - companyTypeRaw:', item.companyTypeRaw || '(空)');
            console.log('  - countryCode:', item.countryCode || '(空)');
            console.log('  - proxy:', item.proxy);
            console.log('  - vpn:', item.vpn);
            console.log('  - datacenter:', item.datacenter);
        });
        
        console.log('\n─────────────────────────────────────────────');
        console.log('📊 所有数据源状态:');
        console.log('─────────────────────────────────────────────');
        
        const allSources = ['ip2location', 'ipapi', 'ipregistry', 'ipqs', 'scamalytics', 'ipdata', 'ipinfo', 'ipwhois', 'dbip', 'abuseipdb', 'cloudflare'];
        
        allSources.forEach(src => {
            const item = data[src];
            const hasError = data.errors && data.errors[src];
            const status = item ? '✓ 成功' : (hasError ? '✗ 失败: ' + data.errors[src] : '✗ 无数据');
            console.log(`  ${src.padEnd(15)} ${status}`);
        });
        
        console.log('\n═══════════════════════════════════════════════');
        console.log('✅ 测试完成');
        
        // 判断原生检测是否可用
        const hasNativeData = sources.some(src => {
            const item = data[src];
            return item && (item.usageType || item.companyType);
        });
        
        if (hasNativeData) {
            console.log('✅ 原生检测数据可用');
        } else {
            console.log('⚠️  原生检测数据不可用 - 需要启用后端回退机制');
        }
        
    } catch (error) {
        console.error('❌ 测试失败:', error.message);
        console.error(error);
    }
}

testAPI();
