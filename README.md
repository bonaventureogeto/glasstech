# Glasstech & Interior Solutions - Marketing Site

Production marketing site for **Glasstech and Interior Solutions Limited**, an automotive, architectural and interior glass company working from one workshop at Sunrise Centre, Northern Bypass, Nairobi. Live at [www.glasstech.co.ke](https://www.glasstech.co.ke).

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
npm run lint
```

## Stack

- **Next.js 16** (App Router, Turbopack) + TypeScript, every route prerendered as static HTML (`/` and `/reviews` regenerate daily so review dates stay current)
- **Tailwind CSS v4** with the theme defined in CSS (`src/app/globals.css`)
- **next/font** for Figtree and Inter, **next/image** for every photo and poster
- No animation or scroll libraries: motion is CSS plus one IntersectionObserver

## Routes

| Route | What it is |
|-------|------------|
| `/` | Homepage: hero with quote configurator, trusted-for strip, two pillars, services, selected work, process, client videos and six Google reviews, contact, final CTA |
| `/work` | Every photo and clip in `src/content/media.ts`, grouped by category, filterable by Residential / Commercial / Automotive, with a lightbox |
| `/reviews` | Every Google review with text, with the rating and links to read or leave one on Google |
| `/sitemap.xml`, `/robots.txt` | Generated from `src/app/sitemap.ts` and `src/app/robots.ts` |

## Brand

Navy and red, taken from the logo. Tokens live in `@theme` in `src/app/globals.css`; Tailwind's default palette is switched off so only these exist (`bg-navy-deep`, `text-coral`, ...).

| Token | Hex | Use |
|-------|-----|-----|
| `navy` | `#084A77` | Eyebrows and icons on light, navy buttons, structure |
| `navy-deep` | `#062F4D` | Ground for dark sections |
| `navy-panel` | `#073B61` | Hero and dark cards (with the `.mull` window grid) |
| `red` / `red-hover` | `#D03128` / `#B8281F` | Primary CTA only, plus one accent word on light |
| `coral` | `#F0564C` | Accent word on navy, 32px+ only |
| `sky` | `#8EC1EA` | Eyebrows and small labels on navy |
| `ink` / `muted` | `#0B1F30` / `#4F6376` | Text on light |
| `mist` / `mist-muted` | `#CFE0EE` / `#9CB8CF` | Text on navy |
| `frost` / `line` | `#F2F6FA` / `#DCE6EF` | Light sections, borders |

- **Type**: Figtree (600-800) for headings and numbers, Inter (400-700) for everything else. H1 76/42px and H2 48/32px scale fluidly between 768px and 1280px (`text-h1`, `text-h2`).
- **Motif**: `.mull` is the window grid from the logo mark on `navy-panel`; `.mull-grid` is the same lines without a ground, laid over photos; `.mull-light` is the light variant.
- **Components**: `btn` + `btn-red` (WhatsApp and primary actions), `btn-navy` (form submits), `btn-ghost` (on navy), `btn-outline` (everything else), `chip` (filters), `shell` (1280px container). Radius: 10px buttons, 16px cards, 20px feature panels, 999px chips. Every control is at least 44px tall.
- **Contrast**: every text pairing passes WCAG AA (sky on navy-deep 7.2:1, muted on frost 5.7:1, white on red 5.1:1; coral is only used at 26px and above, 3.4:1 or better).

### Logo

`public/brand/` holds three SVGs extracted from the Illustrator master (`NEW GLASSTECH logo.pdf`, not committed): `logo-full.svg` (navy and red, for white), `logo-full-white.svg` (navy parts white, red kept, for navy) and `logo-mark.svg` (the G and building, square). Fills are the PDF's own values, and the window panes are cut out so they show whatever sits behind the logo.

`npm run brand` (`scripts/build-brand-assets.mjs`) regenerates `src/app/favicon.ico` (16/32/48), `public/icon.svg`, `public/apple-touch-icon.png` (180px, mark on white) and `public/og.jpg` (1200x630: white logo on the window grid beside the hero still).

## Business facts

Stats, phone numbers, hours, address and email live in `src/content/site.ts`, which also builds the `LocalBusiness` JSON-LD rendered in `src/app/layout.tsx`. Social profiles, the Taplink page and the Google Maps listing live in `src/content/links.ts`; every external URL is written once, there. Change them there and every section updates.

## Google reviews

The rating and reviews under the client videos (six) and on `/reviews` (all) are copied by hand from the Google Business listing (place id `ChIJ09WJNwINLxgRRN6mpUFDeVs`) into `src/content/reviews.json`. The site makes no requests to Google and needs no API key.

- **Adding a review**: copy it from the listing to the top of `reviews`: the name, the stars, the text exactly as written, Google's "3 days ago" as `relativeTime` and that date as `publishTime` (`YYYY-MM-DD`). Update `rating` and `count` at the top to match the listing.
- **What shows**: reviews without text are left out (28 of the listing's 67 ratings have none), and the rest are sorted by rating, then date. Dates read like Google's ("3 months ago") and are worked out from `publishTime` each day. The homepage shows six, the ones marked `"featured": true` first; move the flag to change them.
- **Dates**: the reviews were copied on 29 October 2026, and `publishTime` was worked out from Google's wording that day, so older ones are approximate ("5 years ago" became 2021-10-29).
- **Structured data**: the `LocalBusiness` JSON-LD deliberately has no `AggregateRating` or `Review`. Google does not show review stars for a business's reviews of itself on its own site (embedded Google reviews included), and its guidelines rule out marking up ratings gathered from another site.

## Media pipeline

All photography and video is Glasstech's own work; there is no stock imagery.

1. **Originals** go in `public/content/` (a mirror of the `glasstech content` folder: about 18 GB of 4K drone and Osmo Pocket footage). It is gitignored and listed in `.vercelignore`, so it is never committed or uploaded.
2. **`scripts/media-manifest.mjs`** is the source of truth: each item's source file, category, project, alt text, trim window and poster frame, which items fill the homepage slots, and the files that are deliberately left out with the reason.
3. **`npm run media`** (`scripts/optimise-media.mjs`, needs `ffmpeg`) writes the optimised files to `public/media/` and regenerates **`src/content/media.ts`** (do not edit that file by hand):
   - images: WebP at max 2000px on the long edge, plus an 800px variant
   - clips: 720p H.264, 30fps, no audio, at most 8s, with WebP posters (1600px and 800px)
   - hero loop: 4:5 crop at 864x1080, 8s with a 1s crossfade so it loops seamlessly, kept under 6 MB (4.8 MB)
   - process loop: 16:9 at 1280x720, 10s crossfaded, kept under 10 MB (1.7 MB)

   It only builds what is missing; `--force` rebuilds and `--only=id,id` limits the run. Without ffmpeg it prints the exact commands to run and leaves missing clips out of `media.ts`, so the site never links to a file that does not exist.

Both loops autoplay muted unless the visitor has asked for reduced motion or is on Save-Data; the hero plays at every screen size, the process loop only from 768px up. Everyone else sees the poster.

### Placeholders to replace before launch

- **Testimonials**: the two client videos in `src/content/testimonials.ts` have empty `client` and `service` fields, so their cards show the video title. Fill them in with the names the clients are happy to use. The YouTube player only loads when a visitor presses play.
- **Project titles**: the camera files have no project names (`DJI_20260714...`), so titles in the manifest are descriptive ("Garden Glass Conservatory", "Apartment Tower Glazing"). Swap in real project names in `projects` in `scripts/media-manifest.mjs`, then `npm run media`.
- **Sectors**: residential/commercial is inferred from the footage; check it per project.
- **Yard aerial** (`yard-aerial`): looks like the Glasstech yard but is described neutrally until confirmed.
- **Automotive**: there is no automotive footage yet, so the automotive pillar shows the plain window grid and the Automotive filter shows a "book a fitting" message. Add automotive items to the manifest when photos exist.
- **Email**: `hello@glasstech.co.ke` is the address on the site; the mailbox is set up by hand in cPanel, so confirm it receives mail.

## Project structure

```
scripts/
  media-manifest.mjs     # media source of truth (edit this)
  optimise-media.mjs     # npm run media
  build-brand-assets.mjs # npm run brand
src/
  app/
    globals.css          # brand tokens, utilities, motion
    layout.tsx           # fonts, metadata, LocalBusiness JSON-LD
    page.tsx             # homepage composition
    work/page.tsx        # /work
    reviews/page.tsx     # /reviews
  lib/
    googleReviews.ts     # reads reviews.json: text-only, sorted, dated
  content/
    site.ts              # business facts and WhatsApp link builder
    links.ts             # social profiles, Taplink, Google Maps listing
    testimonials.ts      # client video testimonials (YouTube Shorts)
    reviews.json         # Google reviews, copied by hand from the listing
    media.ts             # generated media library and homepage picks
    labels.ts            # category and sector labels, filters
  components/            # one file per section, plus Lightbox, LoopVideo, CountUp, icons
public/
  brand/                 # logo SVGs
  media/                 # optimised photos, clips and posters (committed)
  content/               # original camera media (gitignored)
```
