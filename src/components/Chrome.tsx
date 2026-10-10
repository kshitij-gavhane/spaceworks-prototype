'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from 'motion/react';

const navItems = [
  ['Work', '/projects'],
  ['Design', '/design'],
  ['About', '/about'],
  ['Services', '/services'],
  ['Contact', '/contact'],
] as const;

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [arrivalScrollRange, setArrivalScrollRange] = useState(1);
  const [active, setActive] = useState(pathname !== '/');
  const [navigationActive, setNavigationActive] = useState(pathname !== '/');
  const scrollY = useMotionValue(0);
  const isArrival = pathname === '/';
  const logoOpacity = useTransform(scrollY, [arrivalScrollRange * 0.34, arrivalScrollRange * 0.43], [0, 1]);
  const surfaceOpacity = useTransform(scrollY, [arrivalScrollRange * 0.38, arrivalScrollRange * 0.47], [0, 1]);
  const navigationOpacity = useTransform(scrollY, [arrivalScrollRange * 0.43, arrivalScrollRange * 0.53], [0, 1]);

  useLayoutEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
    if (navigation?.type === 'reload') window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const updateArrivalRange = () => {
      const arrival = document.querySelector<HTMLElement>('.arrival');
      const sticky = arrival?.querySelector<HTMLElement>('.arrival-sticky');
      setArrivalScrollRange(arrival ? Math.max(1, arrival.offsetHeight - (sticky?.offsetHeight ?? window.innerHeight)) : window.innerHeight);
    };
    updateArrivalRange();
    window.addEventListener('resize', updateArrivalRange);
    return () => window.removeEventListener('resize', updateArrivalRange);
  }, []);

  useEffect(() => {
    const updateScrollState = () => {
      const currentScrollY = window.scrollY;
      scrollY.set(currentScrollY);
      setActive(!isArrival || currentScrollY >= arrivalScrollRange * 0.33);
      setNavigationActive(!isArrival || currentScrollY >= arrivalScrollRange * 0.43);
    };

    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [arrivalScrollRange, isArrival, scrollY]);

  const fixedOpacity = isArrival ? undefined : 1;

  return (
    <>
      <header className="site-header" aria-hidden={!active} style={{ pointerEvents: active ? 'auto' : 'none' }}>
        <motion.div className="site-header-surface" style={{ opacity: fixedOpacity ?? surfaceOpacity }} />
        <div className="container flex items-center justify-between py-5 md:py-6">
          <motion.div className="site-logo-wrap" style={{ opacity: fixedOpacity ?? logoOpacity }}>
            <Link href="/" className="site-logo" onClick={() => setMenuOpen(false)}>
              <Image src="/logo/spaceworks-logo.svg" alt="Spaceworks — Design & Build" width={916} height={192} className="site-logo-image" priority />
            </Link>
          </motion.div>
          <motion.nav className="site-nav hidden md:flex items-center gap-7 text-[10px] uppercase tracking-[.16em]" style={{ opacity: fixedOpacity ?? navigationOpacity, visibility: navigationActive ? 'visible' : 'hidden' }}>
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className="hover:text-[var(--magenta)] transition-colors">{label}</Link>
            ))}
          </motion.nav>
          <motion.button type="button" onClick={() => setMenuOpen(true)} className="site-menu-trigger md:hidden uppercase tracking-[.16em] text-[10px]" style={{ opacity: fixedOpacity ?? navigationOpacity, visibility: navigationActive ? 'visible' : 'hidden' }}>
            Menu
          </motion.button>
        </div>
      </header>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="menu-overlay"
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0 0 0 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: .7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container w-full">
            <div className="flex items-center justify-between mb-14">
              <Link href="/" onClick={onClose} className="font-bold text-xl tracking-[-.05em]">
                <Image src="/logo/spaceworks-logo.svg" alt="Spaceworks — Design & Build" width={916} height={192} className="menu-logo-image" />
              </Link>
              <button type="button" onClick={onClose} className="uppercase tracking-[.15em] text-[10px]">Close ×</button>
            </div>
            <div className="space-y-2">
              {navItems.map(([label, href], i) => (
                <motion.div key={href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 + i * .07 }}>
                  <Link href={href} onClick={onClose} className="menu-item">
                    <span className="text-xs text-white/40">0{i + 1}</span>{label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 700, damping: 40, mass: .35 });
  const sy = useSpring(y, { stiffness: 700, damping: 40, mass: .35 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (event: MouseEvent) => { x.set(event.clientX); y.set(event.clientY); };
    const enter = () => setActive(true);
    const leave = () => setActive(false);
    window.addEventListener('mousemove', move);
    const bind = () => {
      document.querySelectorAll('[data-cursor]').forEach(node => {
        node.addEventListener('mouseenter', enter);
        node.addEventListener('mouseleave', leave);
      });
    };
    bind();
    return () => {
      window.removeEventListener('mousemove', move);
      document.querySelectorAll('[data-cursor]').forEach(node => {
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
      });
    };
  }, [x, y]);

  return <>
    <motion.div className="cursor-dot" style={{ x, y }} />
    <motion.div className={active ? 'cursor-ring active' : 'cursor-ring'} style={{ x: sx, y: sy }} />
  </>;
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-main">
          <Link href="/" aria-label="Spaceworks home">
            <Image src="/logo/spaceworks-logo.svg" alt="Spaceworks — Design & Build" width={916} height={192} className="footer-logo-image" />
          </Link>
          <div className="footer-social">
            <span className="footer-social-label">Social</span>
            <a className="footer-social-item" href="https://www.instagram.com/spaceworksdesignbuild/" target="_blank" rel="noopener noreferrer"><SocialIcon name="Instagram" /><span>Instagram</span></a>
            <a className="footer-social-item" href="https://www.linkedin.com/company/spaceworks-design-build/" target="_blank" rel="noopener noreferrer"><SocialIcon name="LinkedIn" /><span>LinkedIn</span></a>
            <a className="footer-social-item" href="https://www.facebook.com/spaceworksdesignbuild/" target="_blank" rel="noopener noreferrer"><SocialIcon name="Facebook" /><span>Facebook</span></a>
          </div>
          <div className="footer-bottom">
            <nav className="footer-legal" aria-label="Legal and credits">
              <Link href="/legal#terms">Terms</Link>
              <Link href="/legal#disclaimer">Disclaimer</Link>
              <Link href="/legal#credits">Credits</Link>
            </nav>
            <span>© 2026 Spaceworks. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialIcon({ name }: { name: 'Instagram' | 'LinkedIn' | 'Facebook' }) {
  if (name === 'Instagram') {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle className="social-icon-fill" cx="17.5" cy="6.5" r="1" /></svg>;
  }
  if (name === 'LinkedIn') {
    return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M5 9v10M5 5v.1M10 19v-6a4 4 0 0 1 8 0v6M10 9v10" /></svg>;
  }
  return <svg aria-hidden="true" viewBox="0 0 24 24"><path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.8-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.2V9H7v4h3v8z" /></svg>;
}

export function PageShell({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <div className="page-grain"><CustomCursor /><Header /><main className={dark ? 'bg-[var(--ink)] text-white' : ''}>{children}</main><Footer /></div>;
}
