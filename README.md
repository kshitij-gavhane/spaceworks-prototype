# Spaceworks Design & Build — Prototype V3

Light, architectural multi-page prototype for the Spaceworks Design & Build website. The home arrival layers a locally optimized architectural sketch behind the supplied Spaceworks brand mark; scrolling shrinks the mark and lets the persistent site header take over.

## Finalized stack

- Next.js 16.3.8
- React 19.3.0
- TypeScript 7.0.2
- Tailwind CSS 4.3.3
- Motion 14.0.0 for React UI motion/gestures
- GSAP 3.15.0 + @gsap/react 2.1.2 for scroll choreography
- Python 3.13 + FastAPI 0.141.1 backend
- PostgreSQL for production data

The arrival artwork is bundled locally as optimized WebP assets for fast loading and straightforward replacement.

## Run frontend

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Run backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

## Interaction checklist

- Continuous pinned arrival with a scroll-revealed architectural sketch and a seamless handoff into the introduction section
- Gentle cursor parallax and a scroll-linked wordmark handoff to the header logo, followed by staged navigation
- Parallax hero media
- Project index hover preview
- Horizontal selected-work scroll on desktop
- Photo/drawing direction placeholder
- Before/after drag slider
- Design-to-build timeline
- Custom cursor on pointer devices
- Fullscreen mobile menu
- Smart enquiry form prototype
- Reduced-motion support

## Site architecture

The prototype is now multi-page rather than a single landing page:

- `/` — animated arrival + practice introduction + trust story
- `/design` — dedicated design philosophy, method, deliverables and transparency
- `/projects` — project index
- `/projects/[slug]` — project case-study template
- `/about` — practice positioning and trust story
- `/services` — service breakdown + how disciplines connect
- `/contact` — enquiry flow

The copy deliberately avoids invented awards, client logos, testimonials or performance claims. When real evidence arrives, the site can use it as the trust layer.

## Next implementation phase

1. Replace dummy artwork with optimized WebP/AVIF project photography and real drawings.
2. Replace placeholder project/about copy with approved client content.
3. Wire enquiry form to FastAPI and PostgreSQL.
4. Add real logo treatment and final typography after brand/content approval.
5. Add authentic team, testimonials, completed-project facts and consultant relationships where available.
6. Run responsive/browser QA and Lighthouse/performance pass.
