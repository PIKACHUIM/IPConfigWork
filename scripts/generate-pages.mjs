import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// 从 public/*.html 生成 shared/pages.ts（内联字符串）。
// 修改 public/index.html、public/check.html 或 public/speed.html 后运行：npm run gen:pages
const idx = readFileSync('public/index.html', 'utf8');
const chk = readFileSync('public/check.html', 'utf8');
const spd = readFileSync('public/speed.html', 'utf8');

function assertSafe(name, html) {
  if (html.includes('`')) throw new Error(name + ' 含有反引号，无法内联为 String.raw');
  if (html.includes('${')) throw new Error(name + ' 含有 ${ ，无法内联为 String.raw');
}
assertSafe('index.html', idx);
assertSafe('check.html', chk);
assertSafe('speed.html', spd);

const BT = '`';
const out =
  '// 本文件由 public/*.html 自动生成，请勿手动修改。\n' +
  '// 页面以内联字符串形式提供，访问 /、/check、/speed 无需 .html 后缀。\n' +
  'export const INDEX_HTML: string = String.raw' + BT + idx + BT + ';\n\n' +
  'export const CHECK_HTML: string = String.raw' + BT + chk + BT + ';\n\n' +
  'export const SPEED_HTML: string = String.raw' + BT + spd + BT + ';\n';

mkdirSync('shared', { recursive: true });
writeFileSync('shared/pages.ts', out, 'utf8');
console.log('generated shared/pages.ts, length =', out.length);
