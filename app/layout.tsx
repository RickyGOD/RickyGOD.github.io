import SiteAnchor from '../components/SiteAnchor';
import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
export const metadata: Metadata = { title: {default:'刘博 Ricky · 关卡策划',template:'%s · Ricky'}, description:'刘博 Ricky 的射击游戏关卡设计作品、设计随笔与 AI 工具探索。' };
export default function Layout({children}:{children:React.ReactNode}) {return <html lang="zh-CN"><body><header className="header"><Link href="/" className="brand"><span className="brand-mark">R<span>·</span></span><span>RICKY<span className="brand-sub">LEVEL DESIGNER</span></span></Link><nav aria-label="主导航"><Link href="/work">作品</Link><Link href="/blog">设计随笔</Link><Link href="/lab">AI 探索</Link><SiteAnchor href="/resume/ricky-level-designer.pdf" download>简历</SiteAnchor><Link href="/about">关于我 <span className="arrow">↗</span></Link></nav></header><main>{children}</main><footer><Link href="/">刘博 Ricky <span> / LEVEL DESIGNER</span></Link><span>保持好奇，继续探索。 <i className="dot"/></span><span>© {new Date().getFullYear()} RICKY</span></footer></body></html>}
