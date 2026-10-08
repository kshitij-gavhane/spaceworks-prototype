# Spaceworks Design & Build — Animated Prototype

Production-direction prototype for the Spaceworks Design & Build website.

## Finalized stack

- Next.js 16.3.8
- React 19.3.0
- TypeScript 7.0.2
- Tailwind CSS 4.3.3
- Motion 14.0.0 for React UI motion/gestures
- GSAP 3.15.0 + @gsap/react 2.1.2 for scroll choreography
- Python 3.13 + FastAPI 0.141.1 backend
- PostgreSQL for production data

The current frontend prototype intentionally uses local editable SVG artwork instead of remote stock photos so the first build stays fast and asset replacement is straightforward.

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

- Cinematic hero intro
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

## Next implementation phase

1. Replace dummy artwork with optimized WebP/AVIF project photography.
2. Add project detail routes and structured project data.
3. Wire enquiry form to FastAPI and PostgreSQL.
4. Add real logo treatment and final typography after brand/content approval.
5. Run responsive/browser QA and Lighthouse/performance pass.
