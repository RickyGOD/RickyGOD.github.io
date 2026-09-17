import Link from 'next/link';
import PortfolioNav from '../../components/PortfolioNav';
import SiteAnchor from '../../components/SiteAnchor';
import {career} from '../../content/career';

export const metadata={title:'关于我'};

export default function About(){
  return <div className="case-shell archive-shell">
    <PortfolioNav active="about"/>
    <article className="case-document archive-document about-archive-document">
      <div className="case-topline"><Link href="/#about">← 返回首页 About</Link></div>
      <header className="case-hero-copy">
        <h1>刘博 <span>Ricky</span></h1>
        <div>3 年以上 FPS/TPS 关卡策划经验，覆盖 Concept、2D Layout、白盒、测试迭代、美术落地及上线验收。</div>
      </header>
      <div className="about-archive-timeline">{[career[1],career[0],career[2]].map((item,index)=><section key={item.id}>
        <span>{String(index+1).padStart(2,'0')} / {item.period}</span>
        <div><h2>{item.company}</h2><small>{item.role}</small><p>{item.details}</p><SiteAnchor href={item.href}>{item.link} ↗</SiteAnchor></div>
      </section>)}</div>
      <div className="about-archive-contact">
        <p>GET IN TOUCH / 随时到岗</p>
        <a href="tel:17701055564">17701055564</a>
        <a href="mailto:404291277@qq.com">404291277@qq.com</a>
        <SiteAnchor href="/resume/ricky-level-designer.pdf" download="刘博_关卡策划_简历.pdf">下载中文简历 ↓</SiteAnchor>
      </div>
      <footer className="case-footer"><Link href="/#portfolio">← 返回 Portfolio</Link><Link href="/work">查看全部作品 ↗</Link></footer>
    </article>
  </div>;
}
