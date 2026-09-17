import fs from 'node:fs';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

const base=process.env.QA_BASE_URL||'http://127.0.0.1:3001';
const checks={
  '/':['韩国祥明大学','网易游戏','龙图游戏','17701055564','404291277@qq.com','现居深圳','爆破模式关卡白盒','其他关卡设计','关卡相关系统设计'],
  '/work':['作品不是按项目堆放','爆破模式关卡白盒','其他关卡设计','活动模式','关卡相关系统设计'],
  '/about':['case-shell','case-nav','刘博','随时到岗'],
  '/blog':['case-shell','case-nav','设计随笔'],
  '/blog/space-risk-reward':['case-shell','case-nav','返回设计随笔'],
  '/lab':['case-shell','case-nav','AI 探索'],
  '/work/ethereal-ruins':['虚灵遗迹｜爆破模式关卡白盒','动态中路','bomb-layout-overview.webp','bomb-a-site.webp'],
  '/work/combat-maps':['其他关卡设计｜娱乐模式与龙图','投掷炸弹娱乐模式','集市哨岗','P1 据点','P2 据点','异形巢穴','longtu-nest-interior.webp'],
  '/work/longtu-battle-royale':['龙图｜大逃杀关卡白盒图集','集市哨岗','P1 据点','P2 据点','异形巢穴','longtu-p1-layout.webp','longtu-nest-interior.webp'],
  '/work/gameplay-polish':'画面与碰撞一致',
  '/work/christmas-snowball':['圣诞打雪仗｜活动模式','一句话玩法','snowball-attack-demo.mp4','snowball-snowman-demo.mp4','从规则到上线'],
  '/work/penetration-system':'玩家需要预测结果',
  '/work/systems-iteration':['关卡相关系统设计｜穿射与训练','不同材质弹孔方案页','材质与穿射反馈','训练场评分反馈','penetration-materials-overview.webp'],
  '/lab/ai-agent-workflows':['case-shell','case-nav','韩国祥明大学游戏设计专业硕士阶段学习']
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
  '/media/work/snowball-demo.mp4',
  '/media/work/snowball-demo-poster.jpg',
  '/media/work/snowball-attack-demo.mp4',
  '/media/work/snowball-snowman-demo.mp4',
  '/media/work/bomb-blockout-overview.webp',
  '/media/work/heatwave-v3-overview.webp',
  '/media/work/longtu-nest-overview.webp',
  '/media/work/longtu-p1-layout.webp',
  '/media/work/snowball-buff-gifts.webp',
  '/media/work/penetration-wood.webp',
  '/media/work/penetration-materials-overview.webp',
  '/media/work/bomb-mid-animation.webp',
  '/media/work/wall-readability-demo.mp4'
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
