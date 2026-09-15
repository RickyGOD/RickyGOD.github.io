import Link from 'next/link';
import { entries } from '../../content/reader';
export const metadata={title:'设计随笔'};
export default function Page(){const items=entries('blog');return <section className="page section"><p className="eyebrow">DESIGN JOURNAL</p><h1>设计随笔<span>。</span></h1><p className="page-intro">记录关于地图、玩法与玩家体验的思考。</p>{items.length?<div className="content-grid">{items.map(e=><Link className="content-card" key={e.slug} href={'/blog/'+e.slug}><span className="eyebrow">{e.date}</span><h2>{e.title}</h2><p>{e.summary}</p><span>阅读详情 ↗</span></Link>)}</div>:<div className="empty"><span className="empty-symbol">＋</span><h2>内容正在整理中</h2><p>这里已为后续内容留好位置。<br/>正式发布后将在此展示。</p><Link className="text-link" href="/">返回首页 →</Link></div>}</section>}
