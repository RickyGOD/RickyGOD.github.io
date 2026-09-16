import CaseMedia from '../../../components/CaseMedia';
import DesignFlow from '../../../components/DesignFlow';
import PortfolioNav from '../../../components/PortfolioNav';
import SiteAnchor from '../../../components/SiteAnchor';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {MDXRemote} from 'next-mdx-remote/rsc';
import {entries} from '../../../content/reader';

export function generateStaticParams(){return entries('work').map(e=>({slug:e.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const e=entries('work').find(e=>e.slug===slug);return {title:e?.title||'内容未找到',description:e?.summary};}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const e=entries('work').find(e=>e.slug===slug);
  if(!e)notFound();
  const hero=e.body.trim().match(/^(?:<CaseMedia[^\n]+\/>|<div className="media-pair">[\s\S]*?<\/div>)/)?.[0]||'';
  let index=0;
  const body=e.body.replace(hero,'').replace(/^## (.+)$/gm,(_,title)=>`<h2 id="section-${++index}">${title}</h2>`);
  return <div className="case-shell">
    <PortfolioNav active="portfolio"/>
    <article className={e.body.includes('<CaseMedia')?'case-document media-article':'case-document'}>
      <div className="case-topline"><Link href="/#portfolio">← 返回作品分类</Link></div>
      <header className="case-hero-copy">
        <h1>{e.title}</h1>
        <div>{e.summary}</div>
      </header>
      {hero&&<div className="case-hero-media"><MDXRemote source={hero} components={{CaseMedia}}/></div>}
      <div className="prose"><MDXRemote source={body} components={{DesignFlow,a:SiteAnchor,CaseMedia}}/></div>
      <footer className="case-footer"><Link href="/#portfolio">← 返回 Portfolio</Link><Link href="/work">查看全部作品 ↗</Link></footer>
    </article>
  </div>;
}
