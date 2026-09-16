import Link from 'next/link';
import PortfolioNav from '../../components/PortfolioNav';
import { entries } from '../../content/reader';

export const metadata={title:'作品案例'};

const covers:Record<string,string>={
  'ethereal-ruins':'ruins-overview.webp',
  'gameplay-polish':'polish-after.webp',
  'christmas-snowball':'snow-overview.webp',
  'penetration-system':'penetration-layout.webp',
};

const groups=[
  {no:'01',title:'关卡白盒',english:'LEVEL BLOCKOUT',intro:'从 2D Layout 到 Whitebox，再到美术落地与上线验证。',slugs:['ethereal-ruins','combat-maps','longtu-battle-royale']},
  {no:'02',title:'地图优化',english:'GAMEPLAY POLISH',intro:'诊断已有地图中的可读性、碰撞、掩体与技能通行问题。',slugs:['gameplay-polish']},
  {no:'03',title:'活动模式',english:'LIMITED-TIME MODE',intro:'从规则、地图适配到跨专业制作与验收的完整活动交付。',slugs:['christmas-snowball']},
  {no:'04',title:'系统设计与支持',english:'SYSTEMS & SUPPORT',intro:'与关卡紧密相关的穿射规则、评分反馈与支持类工作。',slugs:['penetration-system','systems-iteration']},
];

export default function Page(){
  const items=entries('work');
  return <div className="case-shell work-index-shell">
    <PortfolioNav active="portfolio"/>
    <section className="work-index">
      <header className="work-index-head">
        <p>SELECTED WORK / 2021—2024</p>
        <h1>作品不是按项目堆放，<br/><span>而是按能力阅读。</span></h1>
        <div>关卡白盒 · 地图优化 · 活动模式 · 系统设计与支持</div>
      </header>
      {groups.map(group=><section className="work-category" key={group.no}>
        <div className="work-category-title"><span>{group.no}</span><div><h2>{group.title}</h2><small>{group.english}</small><p>{group.intro}</p></div></div>
        <div className="work-category-grid">{group.slugs.map(slug=>{const e=items.find(x=>x.slug===slug);if(!e)return null;return <Link className="work-card" key={e.slug} href={'/work/'+e.slug}>
          {covers[e.slug]?<img src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/media/work/'+covers[e.slug]} alt={e.title} loading="lazy"/>:<div className="work-card-placeholder"><span>{group.no}</span><b>{e.title.slice(0,2)}</b></div>}
          <div><small>{group.english}</small><h3>{e.title}</h3><p>{e.summary}</p><span>READ CASE ↗</span></div>
        </Link>})}</div>
      </section>)}
    </section>
  </div>;
}
