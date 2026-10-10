'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ReferencePhoto } from './ReferencePhoto';
import { visualReferences } from '@/data/visual-references';

type Props = { eyebrow: string; title: React.ReactNode; intro: string; variant?: number; dark?: boolean };

export function PageHero({ eyebrow, title, intro, variant = 1, dark = false }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const photo = [visualReferences.courtyard, visualReferences.interior, visualReferences.exterior][(variant - 1) % 3];

  return (
    <section ref={ref} className={`${dark ? 'bg-[var(--ink)] text-white' : 'bg-[var(--stone)] text-[var(--ink)]'} pt-32 md:pt-40 pb-20 md:pb-28 overflow-hidden`}>
      <div className="container grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-20 items-end">
        <div>
          <div className={`eyebrow mb-6 ${dark ? 'text-white/45' : ''}`}>{eyebrow}</div>
          <h1 className="display max-w-5xl">{title}</h1>
          <p className={`mt-9 max-w-2xl text-base md:text-lg leading-8 ${dark ? 'text-white/55' : 'text-[var(--muted)]'}`}>{intro}</p>
        </div>
        <motion.div style={{ y }} className="page-hero-art aspect-[1.02]">
          <ReferencePhoto src={photo.src} alt={photo.alt} caption="Architectural reference · Unsplash" sizes="(max-width: 1024px) 100vw, 42vw" priority />
        </motion.div>
      </div>
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className={`eyebrow mb-4 ${dark ? 'text-white/45' : ''}`}>{children}</div>;
}
