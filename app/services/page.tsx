import Link from 'next/link';
import { PageShell } from '@/components/Chrome';
import { Eyebrow, PageHero } from '@/components/PageHero';
import { ReferencePhoto } from '@/components/ReferencePhoto';
import { visualReferences } from '@/data/visual-references';

const serviceImagery = [
  { photo: visualReferences.interior, label: 'Interior and material reference' },
  { photo: visualReferences.workplace, label: 'Workplace architecture reference' },
  { photo: visualReferences.landscape, label: 'Landscape and context reference' },
];

const services = [
  ['01', 'Architecture', 'Planning, concept design, spatial development, detailing and design coordination.'],
  ['02', 'Interior Design', 'A complete interior language across layout, materials, lighting intent, furniture and detailing.'],
  ['03', 'Commercial Fitout', 'Workplace and commercial interiors translated into coordinated details, materials and site-ready execution.'],
  ['04', 'Landscape Design', 'Landscape thinking that connects arrival, built form, shade, planting and outdoor life.'],
  ['05', 'PMC', 'Project management consultancy to align decisions, consultants, documentation, timelines and execution.'],
  ['06', 'Turnkey', 'A joined-up design and delivery service, coordinating the project from the brief through to handover.'],
];

export default function ServicesPage() {
  return <PageShell>
    <PageHero eyebrow="Services" title={<>Six services.<br /><span className="gradient-text">One responsibility.</span></>} intro="Architecture, interiors, commercial fitout, landscape, PMC and turnkey delivery—connected through one considered design-to-build process." variant={1} />
    <section className="section bg-[var(--paper)]"><div className="container"><Eyebrow>What we do</Eyebrow><div className="mt-8">{services.map(([n,t,d])=><div key={t} className="service-row"><span className="number">{n}</span><h2>{t}</h2><p>{d}</p><span className="text-2xl text-[var(--muted)]">↗</span></div>)}</div></div></section>
    <section className="reference-gallery bg-[var(--paper)]"><div className="container grid md:grid-cols-3 gap-4">{serviceImagery.map(({ photo, label })=><div key={label} className="large-media aspect-[1.25]"><ReferencePhoto src={photo.src} alt={photo.alt} caption={`${label} · Unsplash`} sizes="(max-width: 768px) 100vw, 33vw" /></div>)}</div></section>
    <section className="section bg-[var(--stone)]"><div className="container grid lg:grid-cols-[.75fr_1.25fr] gap-14"><div><Eyebrow>How it comes together</Eyebrow><h2 className="section-title">The client should not have to join the dots.</h2></div><div className="grid sm:grid-cols-2 gap-6">{['Brief + strategy','Architecture + interiors','Landscape + external works','Consultant coordination','Documentation + procurement support','Site-stage decisions'].map((x,i)=><div key={x} className="border-t border-[var(--line)] pt-5"><span className="number">{String(i+1).padStart(2,'0')}</span><div className="mt-2 font-bold text-lg">{x}</div></div>)}</div></div></section>
    <section className="section bg-[var(--ink)] text-white"><div className="container text-center max-w-4xl"><Eyebrow dark>Good projects are collaborative</Eyebrow><h2 className="section-title">The right scope is part of good design.</h2><p className="text-white/55 leading-8 mt-7">The final site can explain exactly where Spaceworks leads, where consultants join, what the client approves and what happens during construction.</p><Link href="/contact" className="editorial-link light mt-9">Talk through your project <span>↗</span></Link></div></section>
  </PageShell>;
}
