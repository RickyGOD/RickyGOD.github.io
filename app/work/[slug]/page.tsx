import SiteAnchor from '../../../components/SiteAnchor';
import Link from 'next/link';
import DesignFlow from '../../../components/DesignFlow';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { entries } from '../../../content/reader';
export function generateStaticParams(){return entries('work').map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('work').find(e=>e.slug===slug);return {title:e?.title||'内容未找到',description:e?.summary};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('work').find(e=>e.slug===slug);if(!e)notFound();const headings=[...e.body.matchAll(/^## (.+)$/gm)].map(m=>m[1]);let index=0;const body=e.body.replace(/^## (.+)$/gm,(_,title)=>`<h2 id="section-${++index}">${title}</h2>`);return <article className="article"><Link className="back-link" href="/work">← 全部作品</Link><p className="eyebrow">SELECTED WORK / 内容整理于 {e.date}</p><h1>{e.title}</h1><p className="page-intro">{e.summary}</p><nav className="case-toc" aria-label="案例目录"><strong>本页内容</strong>{headings.map((title,i)=><SiteAnchor key={title} href={`#section-${i+1}`}>{title}</SiteAnchor>)}</nav><div className="prose"><MDXRemote source={body} components={{DesignFlow,a:SiteAnchor}}/></div></article>;}
