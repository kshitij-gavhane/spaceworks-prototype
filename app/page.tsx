'use client';

import Link from 'next/link';
import { projects } from '@/data/projects';
import { PageShell } from '@/components/Chrome';
import { Eyebrow } from '@/components/PageHero';
import { ArrivalScene } from '@/components/ArrivalScene';
import { impactStats } from '@/data/impact-stats';
import { ReferencePhoto } from '@/components/ReferencePhoto';

export default function Home() {
  return (
    <PageShell>
      <ArrivalScene />

      <section id="introduction" className="section bg-[var(--paper)] relative">
        <div className="container grid lg:grid-cols-[.8fr_1.2fr] gap-14 items-start">
          <div><h2 className="section-title">From a first line<br />to a lived-in place.</h2></div>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
            {[
              ['01', 'One conversation', 'Architecture, interiors, site decisions and execution stay joined from the earliest brief.'],
              ['02', 'A clear process', 'We make scope, decisions, details and next steps visible rather than mysterious.'],
              ['03', 'Designed to be built', 'Every good idea is tested against material, construction, cost and the rhythm of a real site.'],
              ['04', 'Made for its context', 'Light, climate, routines and landscape lead the work—not a passing visual trend.'],
            ].map(([n, title, text]) => (
              <div key={n} className="trust-card"><div className="number">{n}</div><h3>{title}</h3><p>{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-strip" aria-label="Spaceworks at a glance">
        <div className="container capability-grid">
          {impactStats.map(({ value, label }) => (
            <div key={label}><span>{value}</span><p>{label}</p></div>
          ))}
        </div>
      </section>

      <section className="section bg-[var(--stone)]">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div><Eyebrow>Visual studies</Eyebrow><h2 className="section-title">Space, light, material.</h2><p className="mt-4 max-w-lg text-sm leading-6 text-[var(--muted)]">Concept studies paired with illustrative reference photography—not completed Spaceworks projects.</p></div>
            <Link href="/projects" className="editorial-link">Open project index <span>↗</span></Link>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((p, i) => (
              <Link data-cursor href={`/projects/${p.slug}`} key={p.slug} className="group">
                <div className="project-media aspect-[1.35]"><ReferencePhoto src={p.image} alt={p.imageAlt} caption="Illustrative reference · Unsplash" sizes="(max-width: 768px) 100vw, 50vw" /></div>
                <div className="flex justify-between gap-4 mt-4 items-baseline"><div><div className="text-xl md:text-2xl font-bold tracking-[-.04em] group-hover:translate-x-2 transition-transform">{p.title}</div><div className="mt-1 text-[10px] uppercase tracking-[.14em] text-[var(--muted)]">Concept study / {p.type}</div></div><span className="text-[var(--muted)]">0{i + 1}</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-[var(--ink)] text-white">
        <div className="container grid lg:grid-cols-[1.1fr_.9fr] gap-14 items-start">
          <div><Eyebrow dark>Our promise</Eyebrow><h2 className="section-title">Less theatre.<br /><span className="text-white/35">More ownership.</span></h2></div>
          <div className="space-y-8 text-white/55 leading-8 text-base md:text-lg">
            <p>We do not need to look like every architecture studio online. The website should feel considered, but the deeper difference is operational: how clearly we think, how carefully we document, and how responsibly we carry a design into the build.</p>
            <p>That is the story Spaceworks should tell—before a client ever sends an enquiry.</p>
            <Link href="/design" className="editorial-link light">Enter the design page <span>→</span></Link>
          </div>
        </div>
      </section>

      <section className="section bg-[var(--stone-2)]">
        <div className="container grid lg:grid-cols-[.7fr_1.3fr] gap-12">
          <div><Eyebrow>A better enquiry</Eyebrow><h2 className="section-title">Start with context, not a sales pitch.</h2></div>
          <div className="grid md:grid-cols-3 gap-6">
            {['Tell us what exists.', 'Tell us what should change.', 'We shape the next step.'].map((text, i) => <div key={text} className="border-t border-[var(--line)] pt-5"><div className="number">0{i + 1}</div><div className="mt-3 font-bold text-xl tracking-[-.03em]">{text}</div></div>)}
            <div className="md:col-span-3 mt-3"><Link href="/contact" className="editorial-link">Start a project conversation <span>↗</span></Link></div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
