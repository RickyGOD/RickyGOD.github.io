'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import SiteAnchor from './SiteAnchor';
import {career} from '../content/career';
import './reference-flow.css';

const projectGroups = [
  {no:'01',title:'关卡白盒',english:'LEVEL BLOCKOUT',summary:'原创爆破地图「虚灵遗迹」｜TDM 完整地图｜龙图大逃杀据点',note:'从 2D Layout、Whitebox 到美术落地，重点展示路线、枪线、包点和空间迭代。',href:'/work/ethereal-ruins',image:'/media/work/ruins-overview.webp',imageAlt:'虚灵遗迹白盒鸟瞰',tags:['虚灵遗迹','TDM','大逃杀据点']},
  {no:'02',title:'地图优化',english:'GAMEPLAY POLISH',summary:'既有地图诊断｜战斗可读性｜碰撞、掩体与英雄技能空间',note:'不是重做地图，而是定位已有空间的问题，再通过结构、尺度和场景表达修正体验。',href:'/work/gameplay-polish',image:'/media/work/polish-after.webp',imageAlt:'地图掩体结构调整后画面',tags:['空间诊断','Metrics','可读性']},
  {no:'03',title:'活动模式',english:'LIMITED-TIME MODE',summary:'圣诞打雪仗｜规则、地图适配、投掷体验与完整上线交付',note:'从玩法规则到地图改造、跨专业跟进和跑测验收，独立推进一个完整限时模式。',href:'/work/christmas-snowball',image:'/media/work/snow-overview.webp',imageAlt:'圣诞打雪仗场景总览',tags:['规则设计','地图适配','上线交付']},
  {no:'04',title:'系统设计与支持',english:'SYSTEMS & SUPPORT',summary:'穿射规则与反馈｜训练场评分子系统｜地图相关支持工作',note:'只保留与关卡强相关的系统工作：把规则转译为空间约束，再用清晰反馈降低学习成本。',href:'/work/systems-iteration',image:'/media/work/penetration-layout.webp',imageAlt:'Layout 中的穿射设计标记',tags:['穿射系统','评分反馈','关卡支持']},
] as const;

const aboutCareer = [career[1], career[0], career[2]];

export default function ReferenceFlow(){
  const [reduced,setReduced]=useState(false);
  const [preview,setPreview]=useState(0);
  const [active,setActive]=useState<'about'|'portfolio'>('about');

  useEffect(()=>{
    const query=matchMedia('(prefers-reduced-motion: reduce)');
    const sync=()=>setReduced(query.matches);
    sync();
    query.addEventListener('change',sync);
    return()=>query.removeEventListener('change',sync);
  },[]);

  useEffect(()=>{
    const sync=()=>{
      const portfolio=document.getElementById('portfolio');
      setActive(portfolio&&window.scrollY>=portfolio.offsetTop-window.innerHeight*.42?'portfolio':'about');
    };
    sync();
    window.addEventListener('scroll',sync,{passive:true});
    window.addEventListener('resize',sync);
    return()=>{
      window.removeEventListener('scroll',sync);
      window.removeEventListener('resize',sync);
    };
  },[]);

  const go=(section:'about'|'portfolio')=>{
    setActive(section);
    document.getElementById(section)?.scrollIntoView({behavior:reduced?'auto':'smooth'});
  };

  const goHome=()=>{
    setActive('about');
    document.getElementById('about')?.scrollIntoView({behavior:reduced?'auto':'smooth'});
  };

  return <div className={'reference-flow '+(reduced?'flow-reduced':'')}>
    <header className="flow-nav">
      <button className="flow-logo" onClick={goHome} aria-label="返回首页"><strong>RICKY</strong><span>刘博 / LEVEL DESIGNER</span></button>
      <nav aria-label="页面导航">
        <SiteAnchor href="#about" onClick={e=>{e.preventDefault();goHome()}}>Home</SiteAnchor>
        <SiteAnchor href="#about" onClick={e=>{e.preventDefault();go('about')}} aria-current={active==='about'?'location':undefined}>About</SiteAnchor>
        <SiteAnchor href="#portfolio" onClick={e=>{e.preventDefault();go('portfolio')}} aria-current={active==='portfolio'?'location':undefined}>Portfolio</SiteAnchor>
        <SiteAnchor className="flow-resume" href="/resume/ricky-level-designer.pdf" download="刘博_关卡策划_简历.pdf">Resume Download <span>↓</span></SiteAnchor>
      </nav>
    </header>

    <div id="home">
      <section id="about" className="flow-about" aria-label="About 个人介绍">
        <div className="about-halo" aria-hidden="true"/>
        <div className="paper-dossier reference-about-card">
          <div className="about-badge-panel">
            <span className="about-panel-index">CAREER BADGES / 01—03</span>
            <div className="about-speed-lines" aria-hidden="true"/>
            <div className="career-badge-stack" aria-label="职业经历工牌展示">
              <div className="career-badge career-badge-longtu" aria-hidden="true">
                <span className="career-lanyard">LONGTU GAMES</span>
                <div className="career-card"><small>01 / CAREER</small><strong>龙图游戏</strong><b>LONGTU GAMES</b><p>刘博 · 关卡策划</p><time>2021.04 — 2021.12</time></div>
              </div>
              <div className="career-badge career-badge-study" aria-hidden="true">
                <span className="career-lanyard">SANGMYUNG</span>
                <div className="career-card"><small>03 / STUDY</small><strong>韩国读研</strong><b>SANGMYUNG</b><p>Game Design · 硕士阶段</p><time>2025.02 — 2026.07</time></div>
              </div>
              <div className="career-badge career-badge-netease">
                <img src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/media/profile/netease-badge-shell-public.jpg'} alt="刘博网易工牌与红色工牌外壳实拍，员工编号已模糊"/>
              </div>
            </div>
            <div className="badge-verified"><strong>刘博 Ricky</strong><span>NETEASE · LONGTU · SANGMYUNG</span><small>CAREER / STUDY ARCHIVE</small></div>
          </div>

          <main className="about-copy">
            <div className="about-title-row">
              <div><span>PERSONAL DOSSIER / 2026</span><h1>ABOUT ME</h1></div>
              <b>DOSSIER NO.<br/>R-001 ▥ ▥▥▥</b>
            </div>
            <p className="about-role-strip">LEVEL DESIGN · FPS / TPS · SHOOTER GAMES</p>
            <p className="about-hello">HI! I’M RICKY</p>
            <p className="about-copy-intro">3 年以上 FPS/TPS 关卡策划经验，参与网易英雄战术射击与 TPS 大逃杀项目。专注 PVP 地图设计，覆盖 Concept、2D Layout、白盒、Gameplay 迭代、美术落地及上线验收。</p>

            <section className="experience-sheet" aria-labelledby="experience-title">
              <div className="experience-title"><h2 id="experience-title">Experience</h2><span>CAREER / STUDY</span></div>
              {aboutCareer.map((item,index)=><article className={'experience-row experience-'+item.id} key={item.id}>
                <div className="experience-row-head"><div><small>0{index+1}</small><strong>{item.company}</strong><span>{item.role}</span></div><time>{item.period}</time></div>
                <p>{item.details}</p>
              </article>)}
            </section>
          </main>

          <aside className="about-side">
            <div className="profile-polaroid reference-polaroid">
              <div><img src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/media/profile/netease-portrait.jpg'} alt="刘博个人照片"/></div>
              <p>Ricky / 刘博</p>
              <small>LEVEL DESIGNER</small>
            </div>
            <div className="about-contact-card" aria-label="联系方式">
              <span>CONTACT / CURRENT</span>
              <a href="tel:17701055564"><b>☎</b><div><small>PHONE</small><strong>17701055564</strong></div></a>
              <a href="mailto:404291277@qq.com"><b>✉</b><div><small>EMAIL</small><strong>404291277@qq.com</strong></div></a>
              <div className="about-location"><b>⌖</b><div><small>LOCATION</small><strong>深圳 / SHENZHEN</strong></div></div>
              <i>AVAILABLE FOR FULL-TIME LEVEL DESIGN</i>
            </div>
          </aside>
        </div>
      </section>

      <section className="flow-projects" id="portfolio" aria-label="作品分类">
        <div className="portfolio-watermark" aria-hidden="true">PORTFOLIO</div>
        <header className="portfolio-head"><p>SELECTED WORK / 2021—2024</p><h2>按工作类型查看作品</h2><span>关卡白盒、地图优化、活动模式，以及系统与支持类工作。</span></header>
        <div className="portfolio-layout">
          <div className="project-table" onPointerLeave={()=>setPreview(0)}>{projectGroups.map((group,i)=><Link href={group.href} key={group.no} className={'project-row '+(preview===i?'is-active':'')} onPointerEnter={()=>setPreview(i)} onFocus={()=>setPreview(i)}><span className="project-no">{group.no}</span><span className="project-title"><strong>{group.title}</strong><small>{group.english}</small><em>{group.summary}</em></span><span className="project-arrow">↗</span></Link>)}</div>
          <div className="project-preview" aria-live="polite"><div className="preview-image"><img key={projectGroups[preview].image} src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+projectGroups[preview].image} alt={projectGroups[preview].imageAlt}/><span>{projectGroups[preview].no}</span></div><p>{projectGroups[preview].note}</p><div>{projectGroups[preview].tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={projectGroups[preview].href}>打开该板块 <span>↗</span></Link></div>
        </div>
        <nav className="content-links" aria-label="更多内容"><Link href="/work">全部作品</Link><Link href="/blog">设计随笔</Link><Link href="/lab">AI 探索</Link><Link href="/about">个人资料</Link></nav>
      </section>

      <section className="flow-contact flow-contact-simple" id="contact" aria-label="联系方式">
        <div className="contact-dossier"><div><p>CONTACT / LEVEL DESIGNER</p><h2>想继续聊地图，<br/><span>直接联系我。</span></h2><small>FPS / TPS · LEVEL DESIGN · PORTFOLIO / RESUME</small></div><div className="contact-lines"><SiteAnchor href="tel:17701055564"><span>PHONE</span><strong>17701055564</strong><i>↗</i></SiteAnchor><SiteAnchor href="mailto:404291277@qq.com"><span>EMAIL</span><strong>404291277@qq.com</strong><i>↗</i></SiteAnchor><SiteAnchor href="/resume/ricky-level-designer.pdf" download="刘博_关卡策划_简历.pdf"><span>RESUME</span><strong>下载中文简历</strong><i>↓</i></SiteAnchor></div></div>
        <div className="flow-end"><span>© RICKY / 刘博</span><button onClick={()=>go('about')}>BACK TO TOP ↑</button><span>LEVEL DESIGNER PORTFOLIO</span></div>
      </section>
    </div>
  </div>
}
