import Link from 'next/link';
import { entries } from '../../content/reader';
export const metadata={title:'AI 探索'};
export default function Page(){const items=entries('lab');return <section className="page section"><p className="eyebrow">TOOLS & EXPERIMENTS</p><h1>AI 探索<span>。</span></h1><p className="page-intro">记录工具探索、自动化流程与实际应用。</p>{items.length?<div className="content-grid">{items.map(e=><Link className="content-card" key={e.slug} href={'/lab/'+e.slug}><span className="eyebrow">{e.date}</span><h2>{e.title}</h2><p>{e.summary}</p><span>阅读详情 ↗</span></Link>)}</div>:<div className="empty"><span className="empty-symbol">＋</span><h2>内容正在整理中</h2><p>这里已为后续内容留好位置。<br/>正式发布后将在此展示。</p><Link className="text-link" href="/">返回首页 →</Link></div>}</section>}
