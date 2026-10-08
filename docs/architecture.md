# Technical Architecture

## Frontend

Next.js App Router renders the marketing site and project routes. The UI is componentized around reusable sections and data-driven project entries.

## Motion strategy

Motion for React handles declarative UI transitions and gestures. GSAP + ScrollTrigger handles long-form scroll choreography such as the desktop horizontal project track. CSS handles simple transitions.

## Backend

FastAPI is intentionally minimal for the marketing site. It will own enquiry APIs and future CMS/data APIs. PostgreSQL is the production datastore once dynamic content is enabled.

## Media

Production photos should be stored in object storage (Cloudflare R2 or S3) and served through CDN. Original images should be converted to AVIF/WebP and delivered responsively.
