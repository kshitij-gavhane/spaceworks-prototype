'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { projects, type Project } from '@/data/projects';
import { ArchitectureArtwork } from './ArchitectureArtwork';

gsap.registerPlugin(useGSAP);

const navItems = [
  ['Projects', '#projects'],
  ['About', '#about'],
  ['Services', '#services'],
  ['Approach', '#approach'],
  ['Contact', '#contact'],
] as const;

function Header({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-[70] mix-blend-difference text-white">
      <div className="container flex items-center justify-between py-7">
        <a href="#top" className="font-bold tracking-[-.04em] text-xl">SPACEWORKS</a>
        <nav className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[.15em]">
          {navItems.map(([label, href]) => <a key={href} href={href} className="hover:opacity-60 transition-opacity">{label}</a>)}
        </nav>
        <button type="button" onClick={onMenu} className="md:hidden uppercase tracking-[.15em] text-[11px]">Menu</button>
      </div>
    </header>
  );
}

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: 0.35 });
  const [active, setActive] = useState(false);
  useEffect(() => {
    const move = (e: MouseEvent) => { x.set(e.clientX); y.set(e.clientY); };
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    window.addEventListener('mousemove', move);
    const nodes = document.querySelectorAll('[data-cursor]');
    nodes.forEach(n => { n.addEventListener('mouseenter', enter); n.addEventListener('mouseleave', leave); });
    return () => { window.removeEventListener('mousemove', move); nodes.forEach(n => { n.removeEventListener('mouseenter', enter); n.removeEventListener('mouseleave', leave); }); };
  }, [x, y]);
  return <><motion.div className="cursor-dot" style={{ x, y }} /><motion.div className={active ? 'cursor-ring active' : 'cursor-ring'} style={{ x: sx, y: sy }} /></>;
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <AnimatePresence>
    {open && <motion.div className="menu-overlay" initial={{ clipPath: 'inset(100% 0 0 0)' }} animate={{ clipPath: 'inset(0 0 0 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: .7, ease: [0.76,0,0.24,1] }}>
      <div className="container w-full">
        <div className="flex items-center justify-between mb-16">
          <span className="font-bold text-xl">SPACEWORKS</span>
          <button onClick={onClose} className="uppercase tracking-[.15em] text-[11px]">Close ×</button>
        </div>
        <div className="space-y-3">
          {navItems.map(([label, href], i) => <motion.a key={href} href={href} onClick={onClose} className="menu-item" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .07 }}><span className="text-xs text-white/40">0{i+1}</span>{label}</motion.a>)}
        </div>
      </div>
    </motion.div>}
  </AnimatePresence>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-kicker', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .7, delay: .2, ease: 'power3.out' });
      gsap.fromTo('.hero-word', { yPercent: 120, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.15, stagger: .1, delay: .25, ease: 'power4.out' });
      gsap.fromTo('.hero-media', { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, delay: .25, ease: 'power4.inOut' });
    }, ref);
    return () => ctx.revert();
  }, { scope: ref });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0,1], [0,180]);
  return <section id="top" ref={ref} className="relative min-h-screen bg-[#131210] text-white overflow-hidden">
    <div className="absolute inset-0 opacity-[.08] bg-[radial-gradient(circle_at_65%_35%,#ef1e67,transparent_28%),radial-gradient(circle_at_78%_55%,#f47724,transparent_25%)]" />
    <div className="container relative z-10 min-h-screen grid lg:grid-cols-[1.1fr_.9fr] gap-10 items-center pt-28 pb-16">
      <div>
        <div className="hero-kicker eyebrow text-white/50 mb-7">Pune · India / Design & Build</div>
        <div className="overflow-hidden"><div className="hero-word display">SPACES</div></div>
        <div className="overflow-hidden"><div className="hero-word display">DESIGNED TO</div></div>
        <div className="overflow-hidden"><div className="hero-word display gradient-text">BELONG.</div></div>
        <p className="mt-8 max-w-2xl text-white/60 text-sm md:text-base leading-7">Architecture, interiors, landscape and project management brought together as one considered design-and-build practice.</p>
        <a data-cursor href="#projects" className="inline-flex mt-10 items-center gap-3 text-[11px] uppercase tracking-[.16em]">Explore selected work <span className="text-xl">↓</span></a>
      </div>
      <motion.div style={{ y }} className="hero-media aspect-[.84] lg:aspect-[.82] rounded-sm">
        <ArchitectureArtwork variant={1} label="Dummy architectural hero image" />
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end text-white text-[10px] uppercase tracking-[.14em] z-10"><span>01 / 06</span><span>Courtyard House</span></div>
      </motion.div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/15" />
  </section>;
}

function ProjectIndex() {
  const [hovered, setHovered] = useState<Project | null>(projects[0]);
  return <section className="section" id="projects">
    <div className="container">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div><div className="eyebrow mb-4">Selected works</div><h2 className="section-title max-w-4xl">A project-first portfolio with editorial pacing.</h2></div>
        <p className="body-copy max-w-sm">Hover the index. The preview follows the work rather than competing with it.</p>
      </div>
      <div className="relative">
        <div className="hidden md:block absolute right-0 top-0 w-[360px] aspect-[4/3] project-media sticky top-24" data-cursor>
          <AnimatePresence mode="wait"><motion.div key={hovered?.slug} className="absolute inset-0" initial={{ opacity:0, scale:1.05 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:.98 }} transition={{ duration:.5 }}><ArchitectureArtwork variant={(projects.findIndex(p=>p.slug===hovered?.slug)%3)+1} label="Project preview"/><div className="absolute left-4 bottom-4 text-white text-[11px] uppercase tracking-[.13em]">View project →</div></motion.div></AnimatePresence>
        </div>
        <div className="md:pr-[430px]">
          {projects.map((p, i) => <a key={p.slug} href={`#project-${p.slug}`} data-cursor className="project-row group" onMouseEnter={() => setHovered(p)}>
            <span className="number">0{i+1}</span><span className="project-name text-2xl md:text-4xl font-bold tracking-[-.04em]">{p.title}</span><span className="location text-[11px] uppercase tracking-[.14em] text-[var(--muted)]">{p.location.split(',')[0]}</span><span className="text-xl group-hover:text-[var(--magenta)] transition-colors">↗</span>
          </a>)}
        </div>
      </div>
    </div>
  </section>;
}

function HorizontalWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current || window.innerWidth < 900) return;
    const track = trackRef.current;
    const distance = track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, { x: -distance, ease: 'none', scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: () => `+=${distance + 650}`, scrub: 1, pin: true, anticipatePin: 1, invalidateOnRefresh: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, { scope: sectionRef });
  return <section ref={sectionRef} className="bg-[#131210] text-white py-20 md:py-0 overflow-hidden">
    <div className="container pt-20 pb-10 md:pt-24"><div className="eyebrow text-white/45 mb-4">Selected works / horizontal story</div><h2 className="text-4xl md:text-6xl tracking-[-.045em] font-bold">Let the work take over.</h2></div>
    <div className="horizontal-wrap md:min-h-[650px] md:flex md:items-center"><div ref={trackRef} className="horizontal-track container px-0 md:w-max md:max-w-none py-10 md:py-0">
      {projects.slice(0,4).map((p,i)=><article key={p.slug} id={`project-${p.slug}`} className="horizontal-card" data-cursor>
        <div className="project-media aspect-[1.42] rounded-sm"><ArchitectureArtwork variant={(i%3)+1} label={`${p.title} dummy image`} /></div>
        <div className="flex justify-between mt-4 items-baseline"><div><div className="font-bold text-xl md:text-2xl">{p.title}</div><div className="text-white/45 text-xs mt-1 uppercase tracking-[.14em]">{p.location} / {p.type}</div></div><span className="text-white/55 text-xs">0{i+1} / 04</span></div>
      </article>)}
    </div></div>
  </section>;
}

function Disciplines() {
  const services = ['Architecture','Interior Design','Landscape','Project Management Consultancy'];
  return <section className="section" id="services"><div className="container"><div className="eyebrow mb-5">Four disciplines</div><div className="grid md:grid-cols-[.65fr_1.35fr] gap-10 items-start"><h2 className="section-title">One studio,<br/>from idea<br/>to execution.</h2><div>{services.map((s,i)=><div key={s} className="group py-6 md:py-8 border-b border-[var(--line)] flex items-center justify-between" data-cursor><div className="flex items-baseline gap-4"><span className="number">0{i+1}</span><span className="text-3xl md:text-5xl font-bold tracking-[-.05em] group-hover:translate-x-2 transition-transform">{s}</span></div><span className="text-2xl text-[var(--muted)] group-hover:text-[var(--magenta)] transition-colors">↗</span></div>)}</div></div></div></section>;
}

function Approach() {
  return <section className="section bg-[var(--soft)]" id="about">
    <div className="container grid lg:grid-cols-[.9fr_1.1fr] gap-14 items-start">
      <div><div className="eyebrow mb-5">About Spaceworks</div><h2 className="section-title">Context first.<br/>Character always.</h2></div>
      <div><p className="body-copy max-w-2xl">Spaceworks Design & Build is a multidisciplinary practice based in Pune. We look at the site, the people, the light, the climate and the everyday rituals that make a place feel like itself.</p><div className="grid md:grid-cols-3 gap-8 mt-14"><div><div className="text-4xl font-bold">01</div><div className="font-bold mt-2">Context</div><div className="body-copy text-sm mt-2">Read the site before drawing on it.</div></div><div><div className="text-4xl font-bold">02</div><div className="font-bold mt-2">Materiality</div><div className="body-copy text-sm mt-2">Let texture, shade and craft do the talking.</div></div><div><div className="text-4xl font-bold">03</div><div className="font-bold mt-2">Function</div><div className="body-copy text-sm mt-2">Make beauty useful and useful feel beautiful.</div></div></div></div>
    </div>
  </section>;
}

function DesignBuildTimeline() {
  const steps = ['Understand','Concept','Design','Develop','Build','Deliver'];
  return <section className="section bg-[#171612] text-white" id="approach"><div className="container"><div className="eyebrow text-white/45 mb-5">Our process</div><h2 className="section-title max-w-3xl">From idea to built space,<br/><span className="text-white/35">one continuous story.</span></h2><div className="mt-16 border-t border-white/15">{steps.map((s,i)=><div key={s} className="py-7 border-b border-white/15 flex gap-7 md:gap-14 items-center"><span className={i===0?'text-[var(--pink)]':'text-white/35'}>{String(i+1).padStart(2,'0')}</span><span className="text-2xl md:text-4xl font-bold tracking-[-.04em]">{s}</span><span className="hidden md:block text-white/45 body-copy text-sm ml-auto max-w-md">{['Read the site, brief and intent.','Shape the idea into a clear direction.','Resolve space, light and material.','Coordinate details and buildability.','Bring the design to life on site.','Handover a place made to last.'][i]}</span></div>)}</div></div></section>;
}

function BeforeAfter() {
  const [v, setV] = useState(56);
  return <section className="section" id="design-build"><div className="container"><div className="eyebrow mb-5">Design & build</div><div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"><h2 className="section-title">Show the transformation.</h2><p className="body-copy max-w-sm">A before/after story works especially well for renovation and interior projects.</p></div><div className="before-after rounded-sm" data-cursor><div className="after"><ArchitectureArtwork variant={3} label="After dummy project image"/></div><div className="before" style={{width:`${v}%`}}><div className="absolute inset-0 grayscale brightness-75"><ArchitectureArtwork variant={1} label="Before dummy project image"/></div></div><div className="handle" style={{left:`${v}%`}}/><label className="absolute left-5 bottom-5 text-white text-[10px] uppercase tracking-[.14em]">Before</label><label className="absolute right-5 bottom-5 text-white text-[10px] uppercase tracking-[.14em]">After</label><input aria-label="Before and after slider" type="range" min="0" max="100" value={v} onChange={e=>setV(Number(e.target.value))} className="absolute inset-0 opacity-0 cursor-ew-resize" /></div></div></section>;
}

function Enquiry() {
  const [sent, setSent] = useState(false);
  return <section className="section bg-[#131210] text-white" id="contact"><div className="container grid lg:grid-cols-[1fr_1fr] gap-16 items-start"><div><div className="eyebrow text-white/45 mb-5">Start a project</div><h2 className="section-title">Tell us about the space.</h2><p className="body-copy text-white/50 mt-7 max-w-lg">Architecture, interiors, landscape or design & build. Share the context and intent; we’ll take it from there.</p><div className="mt-12 space-y-2 text-white/70"><div>Pune, Maharashtra</div><div>+91 87220 41212</div></div></div><form onSubmit={(e)=>{e.preventDefault();setSent(true)}} className="space-y-7">{sent ? <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-2xl font-bold">Thank you. Your enquiry is captured in the prototype.</motion.div> : <><Field label="Name"/><Field label="Email" type="email"/><Field label="Phone"/><div><label className="text-[10px] uppercase tracking-[.14em] text-white/40">Project type</label><select className="w-full bg-transparent border-b border-white/20 py-4 outline-none"><option className="text-black">Architecture</option><option className="text-black">Interior Design</option><option className="text-black">Landscape</option><option className="text-black">Design & Build</option><option className="text-black">Project Management Consultancy</option></select></div><Field label="Location"/><Field label="Message" textarea/><button data-cursor className="inline-flex items-center gap-3 mt-2 text-[11px] uppercase tracking-[.15em] border-b border-white/50 pb-2 hover:border-[var(--magenta)]">Start conversation <span className="text-xl">↗</span></button></>}</form></div></section>;
}
function Field({ label, type='text', textarea=false }: {label:string;type?:string;textarea?:boolean}){return <div><label className="text-[10px] uppercase tracking-[.14em] text-white/40">{label}</label>{textarea?<textarea rows={3} className="w-full bg-transparent border-b border-white/20 py-4 outline-none resize-none"/>:<input type={type} className="w-full bg-transparent border-b border-white/20 py-4 outline-none"/>}</div>}

function Footer(){return <footer className="bg-[var(--stone)] py-10"><div className="container flex flex-col md:flex-row justify-between gap-6"><div><div className="font-bold tracking-[-.04em] text-xl">SPACEWORKS</div><div className="text-xs text-[var(--muted)] mt-2">DESIGN & BUILD · PUNE, INDIA</div></div><div className="text-[11px] uppercase tracking-[.14em] text-[var(--muted)]">© 2026 Spaceworks Design & Build</div></div></footer>}

export default function Site(){const [menuOpen,setMenuOpen]=useState(false);return <div className="page-grain"><CustomCursor/><Header onMenu={()=>setMenuOpen(true)}/><MenuOverlay open={menuOpen} onClose={()=>setMenuOpen(false)}/><Hero/><ProjectIndex/><HorizontalWorks/><Disciplines/><Approach/><DesignBuildTimeline/><BeforeAfter/><Enquiry/><Footer/></div>}
