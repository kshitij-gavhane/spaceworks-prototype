import Link from 'next/link';
import { PageShell } from '@/components/Chrome';
import { ReferencePhoto } from '@/components/ReferencePhoto';
import { Eyebrow, PageHero } from '@/components/PageHero';
import { projects } from '@/data/projects';

export default function ProjectsPage() {
  return <PageShell>
    <PageHero eyebrow="Visual studies" title={<>Spaces in<br /><span className="gradient-text">consideration.</span></>} intro="Conceptual directions exploring architecture, interiors and landscape. The curated photographs are visual references, not a record of completed Spaceworks commissions." variant={1} />
    <section className="section bg-[var(--paper)]"><div className="container"><div className="flex justify-between items-end mb-12"><div><Eyebrow>Concept studies</Eyebrow><h2 className="section-title">Ideas for living well.</h2></div><div className="text-[10px] uppercase tracking-[.15em] text-[var(--muted)]">Illustrative references · Unsplash</div></div>
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-14">{projects.map((p,i) => <Link key={p.slug} href={`/projects/${p.slug}`} data-cursor className="group"><div className="project-media aspect-[1.35]"><ReferencePhoto src={p.image} alt={p.imageAlt} caption="Visual reference · not a Spaceworks project" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="flex justify-between mt-4 gap-6"><div><h3 className="text-2xl md:text-3xl font-bold tracking-[-.04em] group-hover:translate-x-2 transition-transform">{p.title}</h3><div className="text-[10px] mt-2 uppercase tracking-[.14em] text-[var(--muted)]">Concept study / {p.type}</div></div><span className="number">{String(i+1).padStart(2,'0')}</span></div></Link>)}</div>
    </div></section>
  </PageShell>;
}
