'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { PointerEvent } from 'react';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { withBasePath } from '@/lib/paths';

const mapProgress = (value: number, start: number, end: number, from: number, to: number) => {
  const progress = Math.min(1, Math.max(0, (value - start) / (end - start)));
  return from + (to - from) * progress;
};

export function ArrivalScene() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [handoffTransform, setHandoffTransform] = useState({ scale: 0.15, x: -40, y: -32 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1440);
  const pointerX = useSpring(0, { stiffness: 70, damping: 24, mass: 0.8 });
  const pointerY = useSpring(0, { stiffness: 70, damping: 24, mass: 0.8 });
  const wordmarkScale = mapProgress(scrollProgress, 0, .38, 1, handoffTransform.scale);
  const wordmarkX = mapProgress(scrollProgress, 0, .38, 0, handoffTransform.x);
  const wordmarkY = mapProgress(scrollProgress, 0, .38, 0, handoffTransform.y);
  const wordmarkOpacity = 1 - mapProgress(scrollProgress, .35, .46, 0, 1);
  const veilOpacity = .3 - mapProgress(scrollProgress, .34, .52, 0, .3);
  const progressOpacity = 1 - mapProgress(scrollProgress, .5, .7, 0, 1);
  const sketchMaskReveal = mapProgress(scrollProgress, .34, .5, 0, 1);
  const initialMaskStart = viewportWidth <= 520 ? 29 : viewportWidth <= 900 ? 39 : 47;
  const maskStart = initialMaskStart * (1 - sketchMaskReveal);
  const maskEnd = maskStart + 6 * (1 - sketchMaskReveal);
  const sketchMask = `linear-gradient(to bottom, transparent 0 ${maskStart}%, #000 ${maskEnd}%, #000 100%)`;
  const gridX = useTransform(pointerX, [-1, 1], [5, -5]);
  const gridY = useTransform(pointerY, [-1, 1], [4, -4]);
  const sketchX = useTransform(pointerX, [-1, 1], [8, -8]);
  const sketchY = useTransform(pointerY, [-1, 1], [6, -6]);

  useEffect(() => {
    const updateScrollProgress = () => {
      const section = ref.current;
      if (!section) return;
      const sticky = section.querySelector<HTMLElement>('.arrival-sticky');
      if (!sticky) return;

      setViewportWidth(window.innerWidth);
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollRange = section.offsetHeight - sticky.offsetHeight;
      const progress = scrollRange > 0 ? (window.scrollY - sectionTop) / scrollRange : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    updateScrollProgress();
    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useLayoutEffect(() => {
    const updateHandoff = () => {
      const copy = ref.current?.querySelector<HTMLElement>('.arrival-copy');
      const mark = ref.current?.querySelector<HTMLElement>('.arrival h1 img');
      const sticky = ref.current?.querySelector<HTMLElement>('.arrival-sticky');
      const headerMark = document.querySelector<HTMLElement>('.site-logo-image');
      if (!copy || !mark || !sticky || !headerMark || mark.offsetWidth === 0) return;

      const offsetWithin = (element: HTMLElement, ancestor: HTMLElement) => {
        let left = 0;
        let top = 0;
        let current: HTMLElement | null = element;
        while (current && current !== ancestor) {
          left += current.offsetLeft;
          top += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }
        return current ? { left, top } : null;
      };

      const copyOffset = offsetWithin(copy, sticky);
      const markOffset = offsetWithin(mark, copy);
      if (!copyOffset || !markOffset) return;

      const stickyRect = sticky.getBoundingClientRect();
      const headerRect = headerMark.getBoundingClientRect();
      const scale = headerRect.width / mark.offsetWidth;
      const originX = copy.offsetWidth * .5;
      const originY = copy.offsetHeight * .25;
      setHandoffTransform({
        scale,
        x: headerRect.left - stickyRect.left - copyOffset.left - scale * markOffset.left - (1 - scale) * originX,
        y: headerRect.top - stickyRect.top - copyOffset.top - scale * markOffset.top - (1 - scale) * originY,
      });
    };

    updateHandoff();
    window.addEventListener('resize', updateHandoff);
    return () => window.removeEventListener('resize', updateHandoff);
  }, []);

  const movePerspective = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 2 - 1);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 2 - 1);
  };

  const resetPerspective = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <section
      ref={ref}
      className="arrival"
      id="arrival"
      aria-label="Spaceworks design and build introduction"
      onPointerMove={movePerspective}
      onPointerLeave={resetPerspective}
    >
      <div className="arrival-sticky">
        <motion.div className="arrival-grid" style={{ x: reduceMotion ? 0 : gridX, y: reduceMotion ? 0 : gridY }} aria-hidden="true" />
        <div className="arrival-sketch" style={{ maskImage: sketchMask, WebkitMaskImage: sketchMask }} aria-hidden="true">
          <motion.div className="arrival-sketch-art" style={{ x: reduceMotion ? 0 : sketchX, y: reduceMotion ? 0 : sketchY }}>
            <object type="image/svg+xml" data={withBasePath('/sketch-rise.svg')} aria-label="Animated architectural sketch" />
          </motion.div>
        </div>
        <motion.div className="arrival-veil" style={{ opacity: veilOpacity }} aria-hidden="true" />
        <motion.div className="arrival-copy" style={{ scale: wordmarkScale, x: wordmarkX, y: wordmarkY, opacity: wordmarkOpacity }}>
          <h1><Image src={withBasePath('/logo/spaceworks-logo.svg')} alt="SPACEWORKS — Design & Build" width={916} height={192} priority /></h1>
          <p className="arrival-services">Architecture <i>·</i> Interior Design <i>·</i> Commercial Fitout <i>·</i> Landscape Design <i>·</i> PMC <i>·</i> Turnkey</p>
          <Link href="#introduction" className="arrival-scroll" tabIndex={0}>Scroll to explore <span>↓</span></Link>
        </motion.div>
        <motion.div className="arrival-progress" style={{ opacity: progressOpacity }} aria-hidden="true"><span /> Ground / Frame / Finish</motion.div>
      </div>
    </section>
  );
}
