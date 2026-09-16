import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:3001';
const checks={
  '/':['韩国读研','网易游戏','龙图游戏','17701055564','404291277@qq.com','深圳 / SHENZHEN'],
  '/work':'作品不是按项目堆放',
  '/work/ethereal-ruins':'动态中路',
  '/work/gameplay-polish':'画面与碰撞一致',
  '/work/christmas-snowball':'圣诞打雪仗',
  '/work/penetration-system':'玩家需要预测结果',
  '/work/systems-iteration':'评分与成长反馈子系统',
  '/lab/ai-agent-workflows':'韩国祥明大学游戏设计专业硕士阶段学习'
};

for(const [path,needles] of Object.entries(checks)){
  const r=await fetch(base+path);
  assert.equal(r.status,200,path);
  const text=await r.text();
  for(const needle of Array.isArray(needles)?needles:[needles]){
    assert.ok(text.includes(needle),path+' missing '+needle);
  }
  if(path==='/') assert.ok(!text.includes('电商实践'),'/ still contains removed commerce experience');
}

const assets=[
  '/resume/ricky-level-designer.pdf',
  '/media/profile/netease-badge-shell-public.jpg',
  '/media/work/snowball-demo.mp4'
];
const assetResults={};
for(const path of assets){
  const response=await fetch(base+path);
  assert.equal(response.status,200,path);
  const bytes=Buffer.from(await response.arrayBuffer());
  const source=fs.readFileSync('public'+path);
  assert.ok(bytes.equals(source),path+' does not match public source');
  assetResults[path]={
    bytes:bytes.length,
    sha256:crypto.createHash('sha256').update(bytes).digest('hex')
  };
}
const result={
  result:'PASS',
  routes:Object.keys(checks),
  assets:assetResults
};
fs.mkdirSync('output',{recursive:true});
fs.writeFileSync('output/content-qa.json',JSON.stringify(result,null,2));
console.log(result);
