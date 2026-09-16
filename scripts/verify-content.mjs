import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
const base='http://127.0.0.1:3001';
const checks={'/':'网易经历置于最前层','/about':'祥明大学','/work':'关卡白盒','/work/ethereal-ruins':'动态中路：让时间改变枪线','/work/gameplay-polish':'画面与碰撞一致','/work/penetration-system':'反馈：让结果一眼可读','/blog/space-risk-reward':'风险','/blog/visual-rules':'视觉','/work/combat-maps':'射程','/work/christmas-snowball':'最终打包','/work/systems-iteration':'训练场：仅评分与成长反馈子系统','/work/longtu-battle-royale':'通用房屋','/blog/readable-combat-spaces':'墙面标色','/lab/commerce-agent-workflows':'2026'};
for(const [path,needle] of Object.entries(checks)){const r=await fetch(base+path);assert.equal(r.status,200,path);const text=await r.text();assert.ok(text.includes(needle),path+needle);}
const assets=['/resume/ricky-level-designer.pdf','/media/profile/netease-badge-card-clean.jpg','/media/work/snowball-demo.mp4'];
const assetResults={};
for(const path of assets){const response=await fetch(base+path);assert.equal(response.status,200,path);const bytes=Buffer.from(await response.arrayBuffer());const source=fs.readFileSync('public'+path);assert.ok(bytes.equals(source),path+' does not match public source');assetResults[path]={bytes:bytes.length,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};}
const r={result:'PASS',routes:Object.keys(checks),assets:assetResults};fs.mkdirSync('output',{recursive:true});fs.writeFileSync('output/content-qa.json',JSON.stringify(r,null,2));console.log(r);
