import Link from 'next/link';
import PortfolioNav from '../../components/PortfolioNav';
import {entries} from '../../content/reader';

export const metadata={title:'设计随笔'};

export default function Page(){
  const items=entries('blog');
  return <div className="case-shell archive-shell">
    <PortfolioNav active="portfolio"/>
    <section className="work-index archive-index">
      <header className="work-index-head">
        <p>DESIGN JOURNAL / RICKY LIU</p>
        <h1>设计随笔<span>。</span></h1>
        <div>记录地图、玩法与玩家体验相关的设计思考。</div>
      </header>
      {items.length?<div className="archive-grid">{items.map((e,index)=><Link className="archive-card" key={e.slug} href={'/blog/'+e.slug}>
        <span>{String(index+1).padStart(2,'0')} / {e.date}</span>
        <h2>{e.title}</h2>
        <p>{e.summary}</p>
        <b>阅读详情 ↗</b>
      </Link>)}</div>:<div className="archive-empty">内容正在整理中</div>}
    </section>
  </div>;
}
