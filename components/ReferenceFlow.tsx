'use client';

import Link from 'next/link';
import {useEffect, useState} from 'react';
import SiteAnchor from './SiteAnchor';
import {career} from '../content/career';
import './reference-flow.css';

const projectGroups = [
  {no:'01',title:'爆破模式关卡白盒',english:'BOMB-SITE LEVEL BLOCKOUT',summary:'虚灵遗迹｜2D Layout、整体白盒、A/B 包点与动态中路',note:'从全局路线到局部交战空间，完整展示原创爆破地图如何从 2D Layout 推进到 Whitebox、机制验证与美术交付。',href:'/work/ethereal-ruins',image:'/media/work/bomb-blockout-overview.webp',imageAlt:'虚灵遗迹完整三维白盒鸟瞰',tags:['虚灵遗迹','2D Layout','A/B 包点']},
  {no:'02',title:'其他关卡设计',english:'OTHER LEVEL DESIGN',summary:'投掷炸弹娱乐模式｜TDM Layout｜龙图大逃杀据点',note:'用不同尺度的项目补充能力宽度：投掷炸弹娱乐模式白盒、团队竞技平面设计，以及大逃杀据点与开放区域。',href:'/work/combat-maps',image:'/media/work/heatwave-v3-overview.webp',imageAlt:'投掷炸弹娱乐模式白盒鸟瞰',tags:['投掷娱乐模式','TDM Layout','大逃杀据点']},
  {no:'03',title:'活动模式',english:'LIMITED-TIME MODE',summary:'圣诞打雪仗｜规则、地图适配、投掷体验与完整上线交付',note:'从玩法规则到地图改造、跨专业跟进和跑测验收，独立推进一个完整限时模式。',href:'/work/christmas-snowball',image:'/media/work/snow-overview.webp',imageAlt:'圣诞打雪仗场景总览',tags:['规则设计','地图适配','上线交付']},
  {no:'04',title:'关卡相关系统设计',english:'LEVEL DESIGN SYSTEMS',summary:'材质弹孔与命中反馈｜训练场评分与成长反馈',note:'用水泥、金属和木材的弹孔差异建立材质辨识，并展示训练场评分子系统如何提供成长反馈。',href:'/work/systems-iteration',image:'/media/work/penetration-materials-overview.webp',imageAlt:'水泥、金属与木材的弹孔反馈方案',tags:['弹孔反馈','材质辨识','训练评分']},
] as const;

const aboutCareer = career;

const badgeDragScript=`(()=>{
  const init=()=>{
    document.querySelectorAll('.career-badge[data-badge]').forEach((el)=>{
      if(el.dataset.dragReady==='1')return;
      el.dataset.dragReady='1';
      let dragging=false,startX=0,startY=0,baseX=0,baseY=0;
      const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
      el.addEventListener('mousedown',(event)=>{
        if(event.button!==0)return;
        event.preventDefault();
        dragging=true;startX=event.clientX;startY=event.clientY;
        baseX=Number(el.dataset.dragX||0);baseY=Number(el.dataset.dragY||0);
        el.classList.add('is-dragging');
        document.documentElement.classList.add('badge-is-dragging');
      });
      window.addEventListener('mousemove',(event)=>{
        if(!dragging)return;
        const x=clamp(baseX+event.clientX-startX,-135,135);
        const y=clamp(baseY+event.clientY-startY,-95,135);
        el.dataset.dragX=String(x);el.dataset.dragY=String(y);
        el.style.setProperty('--drag-x',x+'px');
        el.style.setProperty('--drag-y',y+'px');
      });
      window.addEventListener('mouseup',()=>{
        if(!dragging)return;dragging=false;el.classList.remove('is-dragging');
        document.documentElement.classList.remove('badge-is-dragging');
      });
    });
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();`;

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
            <div className="career-badge-stack" aria-label="职业经历工牌展示，可拖动工牌查看">
              <div className="career-badge career-badge-longtu" data-badge="longtu" aria-label="龙图游戏履历卡，可拖动">
                <div className="career-badge-motion">
                  <span className="career-lanyard">LONGTU GAMES</span>
                  <div className="career-card"><small>01 / CAREER</small><strong>龙图游戏</strong><b>LONGTU GAMES</b><p>刘博 · 关卡策划</p><time>2021.04 — 2021.12</time></div>
                </div>
              </div>
              <div className="career-badge career-badge-study" data-badge="study" aria-label="阶段进修履历卡，可拖动">
                <div className="career-badge-motion">
                  <span className="career-lanyard">GRADUATE STUDY</span>
                  <div className="career-card"><small>03 / STUDY</small><strong>阶段进修</strong><b>SANGMYUNG · GAME DESIGN</b><p>游戏设计硕士阶段学习</p><time>2025.02 — 2026.07</time></div>
                </div>
              </div>
              <div className="career-badge career-badge-netease" data-badge="netease" aria-label="网易游戏工牌，可拖动">
                <div className="career-badge-motion">
                  <span className="career-lanyard netease-lanyard">NETEASE</span>
                  <span className="netease-clip" aria-hidden="true"><i/><b/></span>
                  <div className="netease-shell">
                    <div className="netease-card netease-card-photo-replica">
                      <img className="netease-card-reference" src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+'/media/profile/netease-badge-card-clean.jpg'} alt="刘博网易员工卡样式"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <script dangerouslySetInnerHTML={{__html:badgeDragScript}}/>
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

          <aside className="about-side about-side-contact-only">
            <div className="about-status-card" aria-label="当前求职状态">
              <span>PROFILE / CURRENT</span>
              <div><small>TARGET</small><strong>关卡策划 / LEVEL DESIGNER</strong></div>
              <div><small>FOCUS</small><strong>PVP MAP · GAMEPLAY POLISH</strong></div>
              <div><small>TOOLS</small><strong>UE4 · AI AGENT · CODEX</strong></div>
              <div><small>STATUS</small><strong>已离职 - 随时到岗</strong></div>
            </div>
            <div className="about-contact-card" aria-label="联系方式">
              <span>CONTACT / CURRENT</span>
              <a href="tel:17701055564"><b>☎</b><div><small>PHONE</small><strong>17701055564</strong></div></a>
              <a href="mailto:404291277@qq.com"><b>✉</b><div><small>EMAIL</small><strong>404291277@qq.com</strong></div></a>
                            <i>AVAILABLE FOR FULL-TIME LEVEL DESIGN</i>
            </div>
          </aside>
        </div>
      </section>

      <section className="flow-projects" id="portfolio" aria-label="作品分类">
        <div className="portfolio-watermark" aria-hidden="true">PORTFOLIO</div>
        <header className="portfolio-head"><p>SELECTED WORK / 2021—2024</p><h2>按工作类型查看作品</h2><span>爆破模式关卡白盒、其他关卡设计、活动模式，以及关卡相关系统设计。</span></header>
        <div className="portfolio-layout">
          <div className="project-table" onPointerLeave={()=>setPreview(0)}>{projectGroups.map((group,i)=><Link href={group.href} key={group.no} className={'project-row '+(preview===i?'is-active':'')} onPointerEnter={()=>setPreview(i)} onFocus={()=>setPreview(i)}><span className="project-no">{group.no}</span><span className="project-title"><strong>{group.title}</strong><small>{group.english}</small><em>{group.summary}</em></span><span className="project-arrow">↗</span></Link>)}</div>
          <div className={'project-preview project-preview-'+projectGroups[preview].no} aria-live="polite"><div className="preview-image"><img key={projectGroups[preview].image} src={(process.env.NEXT_PUBLIC_BASE_PATH||'')+projectGroups[preview].image} alt={projectGroups[preview].imageAlt}/><span>{projectGroups[preview].no}</span></div><p>{projectGroups[preview].note}</p><div>{projectGroups[preview].tags.map(tag=><span key={tag}>{tag}</span>)}</div><Link href={projectGroups[preview].href}>打开该板块 <span>↗</span></Link></div>
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
