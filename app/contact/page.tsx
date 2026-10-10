'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { PageShell } from '@/components/Chrome';
import { Eyebrow } from '@/components/PageHero';
import { ReferencePhoto } from '@/components/ReferencePhoto';
import { visualReferences } from '@/data/visual-references';

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  return <PageShell>
    <section className="pt-32 md:pt-40 pb-24 bg-[var(--ink)] text-white"><div className="container grid lg:grid-cols-[.9fr_1.1fr] gap-16 items-start"><div><Eyebrow dark>Start a project</Eyebrow><h1 className="display">Let’s talk about <span className="gradient-text">what you’re building.</span></h1><p className="mt-8 max-w-lg text-white/55 leading-8">Tell us what exists, what needs to change and where the project is. The first conversation is about fit and clarity—not a hard sell.</p><div className="mt-12 space-y-2 text-white/70"><div>Pune, Maharashtra</div><div>+91 87220 41212</div><div className="text-white/45">Email will be added on the final domain</div></div><div className="large-media aspect-[1.6] mt-10"><ReferencePhoto src={visualReferences.workplace.src} alt={visualReferences.workplace.alt} caption="Architectural reference · Unsplash" sizes="(max-width: 1024px) 100vw, 40vw" priority /></div></div>
      <form onSubmit={e=>{e.preventDefault();setSent(true)}} className="space-y-7">{sent ? <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-2xl font-bold max-w-md">Thank you. Your enquiry prototype is working. In production this form will connect to the Spaceworks backend.</motion.div> : <><Field label="Name"/><Field label="Email" type="email"/><Field label="Phone"/><Field label="Project location"/><div><label className="text-[10px] uppercase tracking-[.14em] text-white/40">What do you need?</label><select className="w-full bg-transparent border-b border-white/20 py-4 outline-none"><option className="text-black">Architecture</option><option className="text-black">Interior Design</option><option className="text-black">Commercial Fitout</option><option className="text-black">Landscape Design</option><option className="text-black">PMC</option><option className="text-black">Turnkey</option></select></div><Field label="Tell us a little about the project" textarea/><button data-cursor className="inline-flex items-center gap-3 mt-2 text-[11px] uppercase tracking-[.15em] border-b border-white/50 pb-2 hover:border-[var(--magenta)]">Send enquiry <span className="text-xl">↗</span></button></>}</form>
    </div></section>
    <section className="section bg-[var(--stone)]"><div className="container grid md:grid-cols-3 gap-6">{['What happens after you enquire?', '1. We understand the brief.', '2. We clarify the next decision.', '3. You choose whether to proceed.'].map((x,i)=><div key={x} className={`${i===0?'md:col-span-1':''} border-t border-[var(--line)] pt-5`}><span className="number">{i===0?'TRUST':String(i).padStart(2,'0')}</span><div className="mt-3 text-lg font-bold">{x}</div></div>)}</div></section>
  </PageShell>;
}

function Field({ label, type='text', textarea=false }: { label:string; type?:string; textarea?:boolean }) {
  return <div><label className="text-[10px] uppercase tracking-[.14em] text-white/40">{label}</label>{textarea ? <textarea rows={4} className="w-full bg-transparent border-b border-white/20 py-4 outline-none resize-none"/> : <input type={type} className="w-full bg-transparent border-b border-white/20 py-4 outline-none"/>}</div>;
}
