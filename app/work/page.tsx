import Link from 'next/link';
import PortfolioNav from '../../components/PortfolioNav';
import { entries } from '../../content/reader';

export const metadata={title:'作品案例'};

const covers:Record<string,string>={
  'ethereal-ruins':'bomb-blockout-overview.webp',
  'combat-maps':'heatwave-v3-overview.webp',
  'longtu-battle-royale':'longtu-market-overview.webp',
  'gameplay-polish':'polish-after.webp',
  'christmas-snowball':'snow-overview.webp',
  'penetration-system':'penetration-layout.webp',
  'systems-iteration':'penetration-materials-overview.webp',
};

const groups=[
  {no:'01',title:'爆破模式关卡白盒',english:'BOMB-SITE LEVEL BLOCKOUT',intro:'以虚灵遗迹为主案例，从 2D Layout、整体白盒到包点、中路机制与美术交付。',slugs:['ethereal-ruins']},
  {no:'02',title:'其他关卡设计',english:'OTHER LEVEL DESIGN',intro:'投掷炸弹娱乐模式白盒、TDM 平面设计，以及龙图大逃杀据点与开放区域。',slugs:['combat-maps']},
  {no:'03',title:'活动模式',english:'LIMITED-TIME MODE',intro:'从规则、地图适配到跨专业制作与验收的完整活动交付。',slugs:['christmas-snowball']},
  {no:'04',title:'关卡相关系统设计',english:'LEVEL DESIGN SYSTEMS',intro:'不同材质的弹孔与命中反馈，以及训练场评分和成长反馈。',slugs:['systems-iteration']},
];

export default function Page(){
  const items=entries('work');
  return <div className="case-shell work-index-shell">
    <PortfolioNav active="portfolio"/>
    <section className="work-index">
      <header className="work-index-head">
        <p>SELECTED WORK / 2021—2024</p>
        <h1>作品不是按项目堆放，<br/><span>而是按能力阅读。</span></h1>
        <div>爆破模式关卡白盒 · 其他关卡设计 · 活动模式 · 关卡相关系统设计</div>
      </header>
      {groups.map(group=><section className="work-category" key={group.no}>
        <div className="work-category-title"><span>{group.no}</span><div><h2>{group.title}</h2><small>{group.english}</small><p>{group.intro}</p></div></div>
        <div className="work-category-grid">{group.slugs.map(slug=>{const e=items.find(x=>x.slug===slug);if(!e)return null;return <Link className={'work-card work-card-'+e.slug} key={e.slug} href={'/work/'+e.slug}>
          {covers[e.slug]?<img src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/media/work/'+covers[e.slug]} alt={e.title} loading="lazy"/>:<div className="work-card-placeholder"><span>{group.no}</span><b>{e.title.slice(0,2)}</b></div>}
          <div><small>{group.english}</small><h3>{e.title}</h3><p>{e.summary}</p><span>READ CASE ↗</span></div>
        </Link>})}</div>
      </section>)}
    </section>
  </div>;
}
