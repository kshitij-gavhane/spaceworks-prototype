# Finalized Technology Stack — 06 Oct 2026

## Frontend
- Next.js 16.3.8
- React 19.3.0
- TypeScript 7.0.2
- Tailwind CSS 4.3.3

## Motion
- Motion for React 14.0.0
- GSAP 3.15.0
- @gsap/react 2.1.2

## Backend
- Python 3.13+
- FastAPI 0.141.1
- PostgreSQL 16+ (production target)
- SQLAlchemy 2.x
- Uvicorn

## Production direction
- Vercel for Next.js frontend
- DigitalOcean Basic 2GB / 1vCPU / 50GB for FastAPI backend
- Cloudflare DNS/CDN/SSL
- Cloudflare R2 for project media

## Rationale
Motion is now the primary React animation layer because the current Motion package is purpose-built for React, supports scroll/gesture/layout animation, is tree-shakeable, and exposes reduced-motion controls. GSAP remains reserved for complex scroll choreography such as the pinned horizontal project track. This keeps simple interactions out of GSAP while preserving precise sequencing where it matters.
