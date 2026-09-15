import SiteAnchor from '../../../components/SiteAnchor';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { entries } from '../../../content/reader';
export function generateStaticParams(){return entries('lab').map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('lab').find(e=>e.slug===slug);return {title:e?.title||'内容未找到',description:e?.summary};}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('lab').find(e=>e.slug===slug);if(!e)notFound();return <article className="article"><p className="eyebrow">TOOLS & EXPERIMENTS / {e.date}</p><h1>{e.title}</h1><p className="page-intro">{e.summary}</p><div className="prose"><MDXRemote source={e.body} components={{a:SiteAnchor}}/></div></article>;}
