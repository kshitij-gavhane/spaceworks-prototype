import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Spaceworks Design & Build — Architecture, Interiors & Landscape',
  description: 'A multidisciplinary design and build practice based in Pune.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
