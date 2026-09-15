import SiteAnchor from '../../../components/SiteAnchor';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { entries } from '../../../content/reader';
export function generateStaticParams(){return entries('blog').map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('blog').find(e=>e.slug===slug);return {title:e?.title||'内容未找到',description:e?.summary};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('blog').find(e=>e.slug===slug);if(!e)notFound();return <article className="article"><Link className="back-link" href="/blog">← 设计随笔</Link><p className="eyebrow">DESIGN JOURNAL / {e.date}</p><h1>{e.title}</h1><p className="page-intro">{e.summary}</p><div className="prose"><MDXRemote source={e.body} components={{a:SiteAnchor}}/></div></article>;}
