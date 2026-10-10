import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageShell } from '@/components/Chrome';
import { ReferencePhoto } from '@/components/ReferencePhoto';
import { projects } from '@/data/projects';
import { Eyebrow } from '@/components/PageHero';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return <PageShell>
    <section className="pt-32 md:pt-40 pb-16 bg-[var(--ink)] text-white"><div className="container"><Eyebrow dark>Concept study / {project.type}</Eyebrow><div className="grid lg:grid-cols-[1fr_.42fr] gap-12 items-end"><h1 className="display max-w-5xl">{project.title}</h1><p className="text-sm leading-7 text-white/55">An illustrative direction for exploring space, light and material—not a completed Spaceworks commission.</p></div></div></section>
    <section className="bg-[var(--ink)] text-white pb-20 md:pb-28"><div className="container"><div className="large-media aspect-[1.7]"><ReferencePhoto src={project.image} alt={project.imageAlt} caption="Illustrative reference photography · Unsplash" sizes="(max-width: 768px) 100vw, 90vw" priority /></div></div></section>
    <section className="section bg-[var(--paper)]"><div className="container grid lg:grid-cols-[.75fr_1.25fr] gap-14"><div><Eyebrow>Project idea</Eyebrow><h2 className="section-title">A place shaped by context, use and material.</h2></div><div className="body-copy max-w-3xl space-y-6"><p>{project.excerpt}</p><p>This concept study uses curated reference photography to explore atmosphere and design direction. Replace it with approved project photography and details when available.</p></div></div></section>
    <section className="section bg-[var(--stone)]"><div className="container"><Eyebrow>Project layers</Eyebrow><div className="grid md:grid-cols-3 gap-6 mt-8">{[['01','Design intent','Respond to the site, brief and people who will use the space.'],['02','Material language','Balance tactile character, longevity and practical performance.'],['03','Built resolution','Coordinate details so the design intent carries through to delivery.']].map(([n,title,text])=><div key={title} className="border-t border-[var(--line)] pt-5"><span className="number">{n}</span><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="body-copy text-sm mt-3">{text}</p></div>)}</div></div></section>
    <section className="section bg-[var(--paper)]"><div className="container flex flex-col md:flex-row justify-between gap-6 items-start"><Link href="/projects" className="editorial-link">← Back to projects</Link><Link href="/contact" className="editorial-link">Discuss a similar project <span>↗</span></Link></div></section>
  </PageShell>;
}
