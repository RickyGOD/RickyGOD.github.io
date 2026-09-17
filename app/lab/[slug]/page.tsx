import SiteAnchor from '../../../components/SiteAnchor';
import PortfolioNav from '../../../components/PortfolioNav';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {entries} from '../../../content/reader';

export function generateStaticParams(){return entries('lab').map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('lab').find(e=>e.slug===slug);return {title:e?.title||'内容未找到',description:e?.summary};}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const e=entries('lab').find(e=>e.slug===slug);
  if(!e)notFound();
  return <div className="case-shell archive-shell">
    <PortfolioNav active="portfolio"/>
    <article className="case-document archive-document">
      <div className="case-topline"><Link href="/lab">← 返回 AI 探索</Link></div>
      <header className="case-hero-copy"><h1>{e.title}</h1><div>{e.summary}</div></header>
      <div className="prose archive-prose"><MDXRemote source={e.body} components={{a:SiteAnchor}}/></div>
      <footer className="case-footer"><Link href="/#portfolio">← 返回 Portfolio</Link><Link href="/lab">查看全部探索 ↗</Link></footer>
    </article>
  </div>;
}
