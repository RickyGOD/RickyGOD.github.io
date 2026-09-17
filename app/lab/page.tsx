import Link from 'next/link';
import PortfolioNav from '../../components/PortfolioNav';
import {entries} from '../../content/reader';

export const metadata={title:'AI 探索'};

export default function Page(){
  const items=entries('lab');
  return <div className="case-shell archive-shell">
    <PortfolioNav active="portfolio"/>
    <section className="work-index archive-index">
      <header className="work-index-head">
        <p>TOOLS & EXPERIMENTS / RICKY LIU</p>
        <h1>AI 探索<span>。</span></h1>
        <div>记录工具探索、自动化流程与实际应用。</div>
      </header>
      {items.length?<div className="archive-grid">{items.map((e,index)=><Link className="archive-card" key={e.slug} href={'/lab/'+e.slug}>
        <span>{String(index+1).padStart(2,'0')} / {e.date}</span>
        <h2>{e.title}</h2>
        <p>{e.summary}</p>
        <b>阅读详情 ↗</b>
      </Link>)}</div>:<div className="archive-empty">内容正在整理中</div>}
    </section>
  </div>;
}
