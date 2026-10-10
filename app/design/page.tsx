import Link from 'next/link';
import { motion } from 'motion/react';
import { PageShell } from '@/components/Chrome';
import { Eyebrow, PageHero } from '@/components/PageHero';
import { ReferencePhoto } from '@/components/ReferencePhoto';
import { visualReferences } from '@/data/visual-references';

const principles = [
  ['01', 'We start with the site', 'Orientation, light, climate, access, neighbours and the life already happening there become design inputs—not footnotes.'],
  ['02', 'We design in layers', 'Plan first. Then thresholds, light, material, furniture, landscape and the details that make a space feel resolved.'],
  ['03', 'We make decisions visible', 'A client should understand what is being decided, why it matters and what the next decision unlocks.'],
  ['04', 'We design for the build', 'Details are tested against actual construction, coordination, sequencing and maintenance—not just a render.'],
];

export default function DesignPage() {
  return <PageShell>
    <PageHero eyebrow="Design / The Spaceworks Method" title={<>We design spaces.<br /><span className="gradient-text">Not images.</span></>} intro="Our design page should be the clearest expression of why Spaceworks is different: thoughtful enough for architecture, practical enough for construction, and clear enough for a client to trust." variant={2} />

    <section className="section bg-[var(--paper)]">
      <div className="container grid lg:grid-cols-[.8fr_1.2fr] gap-14">
        <div><Eyebrow>The point of view</Eyebrow><h2 className="section-title">Beautiful is the result.<br />Clarity is the method.</h2></div>
        <div className="body-copy max-w-3xl space-y-6"><p>We believe the strongest projects feel inevitable in hindsight. The plan makes sense. The light has somewhere to go. Materials age well. The landscape belongs to the architecture. And the build team knows what is supposed to happen.</p><p>That does not happen by adding more decoration. It happens by making better decisions earlier.</p></div>
      </div>
    </section>

    <section className="section bg-[var(--ink)] text-white">
      <div className="container"><Eyebrow dark>Four principles</Eyebrow><h2 className="section-title max-w-4xl">A different studio needs a different operating system.</h2>
        <div className="mt-16 border-t border-white/15">{principles.map(([n,t,d]) => <div key={n} className="design-principle"><span className="number text-white/35">{n}</span><h3>{t}</h3><p>{d}</p></div>)}</div>
      </div>
    </section>

    <section className="section bg-[var(--stone)]">
      <div className="container grid lg:grid-cols-[.9fr_1.1fr] gap-10 items-start">
        <div className="large-media aspect-[.9]"><ReferencePhoto src={visualReferences.interior.src} alt={visualReferences.interior.alt} caption="Material and light reference · Unsplash" sizes="(max-width: 1024px) 100vw, 40vw" /></div>
        <div className="lg:pl-10"><Eyebrow>What we actually resolve</Eyebrow><h2 className="section-title">From the first line to the last detail.</h2>
          <div className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-8">
            {['Site + brief', 'Planning + zoning', 'Concept + massing', 'Spatial planning', 'Material + palette', 'Lighting intent', 'Landscape relationship', 'Working drawings', 'Consultant coordination', 'Site-stage decisions'].map((x, i) => <div key={x} className="border-t border-[var(--line)] pt-4"><span className="number">{String(i + 1).padStart(2,'0')}</span><div className="mt-2 font-bold tracking-[-.02em]">{x}</div></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="section bg-[var(--stone-2)]">
      <div className="container grid lg:grid-cols-[1fr_1fr] gap-14">
        <div><Eyebrow>Trust through transparency</Eyebrow><h2 className="section-title">You should never have to guess what happens next.</h2></div>
        <div className="space-y-5">
          {['Brief confirmed', 'Scope and priorities aligned', 'Concept direction presented', 'Design developed + coordinated', 'Build documentation prepared', 'Site-stage decisions managed'].map((step, i) => <div key={step} className="flex items-center gap-5 border-b border-[var(--line)] pb-5"><span className="number">{String(i + 1).padStart(2,'0')}</span><span className="text-lg md:text-xl font-bold tracking-[-.03em]">{step}</span></div>)}
        </div>
      </div>
    </section>

    <section className="section bg-[var(--paper)]">
      <div className="container text-center max-w-4xl"><Eyebrow>Designed differently</Eyebrow><h2 className="section-title">The website can be expressive.<br />The process should be dependable.</h2><p className="body-copy mt-7 mx-auto max-w-2xl">That tension is the brand: creative on the outside, disciplined underneath.</p><Link href="/projects" className="editorial-link mt-10">See the work <span>↗</span></Link></div>
    </section>
  </PageShell>;
}
