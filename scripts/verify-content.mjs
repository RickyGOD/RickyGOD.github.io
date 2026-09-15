import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const base='http://127.0.0.1:3001';
const checks={'/':'系统与杂项','/about':'祥明大学','/work':'圣诞','/work/ethereal-ruins':'白盒与整体布局','/work/gameplay-polish':'画面与碰撞一致','/work/penetration-system':'弹痕','/blog/space-risk-reward':'风险','/blog/visual-rules':'视觉','/work/combat-maps':'射程','/work/christmas-snowball':'最终打包','/work/systems-iteration':'热力图','/work/longtu-battle-royale':'通用房屋','/blog/readable-combat-spaces':'墙面标色','/lab/commerce-agent-workflows':'2026'};
for(const [path,needle] of Object.entries(checks)){const r=await fetch(base+path);assert.equal(r.status,200,path);const text=await r.text();assert.ok(text.includes(needle),path+needle);}
const pdf=Buffer.from(await (await fetch(base+'/resume/ricky-level-designer.pdf')).arrayBuffer());assert.ok(pdf.equals(fs.readFileSync('public/resume/ricky-level-designer.pdf')));const r={result:'PASS',routes:Object.keys(checks),pdfBytes:pdf.length,pdfSHA256:crypto.createHash('sha256').update(pdf).digest('hex')};fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/content-qa.json',JSON.stringify(r,null,2));console.log(r);
