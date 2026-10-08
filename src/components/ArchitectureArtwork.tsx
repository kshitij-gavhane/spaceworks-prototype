'use client';

import { motion } from 'motion/react';

type Props = { variant?: number; label?: string };

export function ArchitectureArtwork({ variant = 1, label }: Props) {
  const palette = [
    { wall: '#e2ddd2', stone: '#b9ad99', dark: '#68635b', ground: '#78806f', accent: '#ed6b4c' },
    { wall: '#ece6dc', stone: '#c8bead', dark: '#746b60', ground: '#82786c', accent: '#ef754c' },
    { wall: '#f0ece5', stone: '#cec5b7', dark: '#65625c', ground: '#6f7b6c', accent: '#f27b43' },
  ][(variant - 1) % 3];

  return (
    <motion.svg className="architecture-svg" viewBox="0 0 900 620" preserveAspectRatio="xMidYMid slice" aria-label={label} initial={{ scale: 1.03 }} whileHover={{ scale: 1.07 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
      <rect width="900" height="620" fill="#eee9df" />
      <rect x="70" y="125" width="735" height="355" rx="10" fill={palette.stone} />
      <rect x="145" y="185" width="585" height="295" fill={palette.wall} />
      <rect x="195" y="230" width="150" height="250" fill={palette.dark} />
      <rect x="395" y="215" width="250" height="120" fill="#978d80" />
      <rect x="410" y="360" width="235" height="120" fill="#81776b" />
      <path d="M0 565 C150 470 270 535 395 485 C520 435 665 505 900 420 V620 H0Z" fill={palette.ground} />
      <circle cx="760" cy="105" r="42" fill={palette.accent} opacity=".95" />
      <motion.path d="M120 505 L780 505" stroke="#433f38" strokeWidth="7" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: .9 }} />
      <motion.g animate={{ y: [0, -4, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <circle cx="290" cy="170" r="8" fill="#c8bba7" />
        <circle cx="325" cy="158" r="6" fill="#b8ab98" />
      </motion.g>
    </motion.svg>
  );
}
