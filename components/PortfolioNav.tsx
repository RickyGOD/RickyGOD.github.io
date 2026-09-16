import Link from 'next/link';
import SiteAnchor from './SiteAnchor';

export default function PortfolioNav({active='portfolio'}:{active?:'about'|'portfolio'}){
  return <header className="case-nav">
    <Link className="case-wordmark" href="/#about" aria-label="返回首页">
      <strong>RICKY</strong>
      <span>刘博 / LEVEL DESIGNER</span>
    </Link>
    <nav aria-label="作品页导航">
      <Link href="/#about">Home</Link>
      <Link href="/#about" aria-current={active==='about'?'page':undefined}>About</Link>
      <Link href="/#portfolio" aria-current={active==='portfolio'?'page':undefined}>Portfolio</Link>
      <SiteAnchor className="case-resume" href="/resume/ricky-level-designer.pdf" download="刘博_关卡策划_简历.pdf">Resume Download <span>↓</span></SiteAnchor>
    </nav>
  </header>;
}
