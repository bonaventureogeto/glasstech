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
| `/` | Homepage: hero with quote configurator, trusted-for strip, two pillars, services, selected work, process, Jeff Koinange's feature video, client videos and six Google reviews, contact, final CTA |
| `/work` | Jeff Koinange's feature video, then every photo and clip in `src/content/media.ts`, grouped by category, filterable by Residential / Commercial / Automotive (all ten automotive photos), with a lightbox |
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

Stats, hours, address and email live in `src/content/company.ts`, which also holds `SITE_URL`. Phone numbers, social profiles, the Taplink page and the Google Maps listing live in `src/content/links.ts`; every number and external URL is written once, there. Change them there and every section updates. `src/lib/structuredData.ts` builds the homepage's `LocalBusiness` JSON-LD from both.

The hero's first figure is **80+ years of combined experience**: the client has not confirmed it as years trading. The number and its label are `stats.experienceYears` and `stats.experienceLabel` in `company.ts`, and the hero and the homepage meta description both read them, so if the client confirms the stronger claim, changing that one label updates both.

### Phone lines

There are two lines, `phones.architectural` (+254 714 498 682) and `phones.automotive` (+254 726 019 644) in `links.ts`, each with a label. Which number serves which trade is still to be confirmed with the client (`TODO(confirm with client)` there); swapping them is a change to that one object.

| Where | Goes to |
|-------|---------|
| Header phone link, "Call now" in the phone bar, the final CTA's call button | Architectural |
| "Get a quote" (header), "Quote on WhatsApp" (hero, final CTA), the floating WhatsApp button, "WhatsApp quote" (phone bar) | A chooser: "Architectural quote" or "Automotive quote", each with its own prefilled message (`QuoteChooser`, built on `<details>`) |
| Phone menu | "Architectural quote" and "Automotive quote" buttons, then a call button (architectural) |
| Quote configurator | Automotive glass to the automotive line, every other service to the architectural line |
| Pillar cards | 01 "Book a fitting": automotive. 02 "Start a project": architectural |
| Contact | Both lines as labelled rows, each with a `tel:` link and a WhatsApp link; the quote form's "Send on WhatsApp" and "Call the workshop" follow its "Building or interior glass" / "Vehicle glass" choice (building by default) |
| Footer, under the final CTA | Both lines, labelled |
| LocalBusiness JSON-LD | Both under `telephone`, and one `ContactPoint` each (`contactType` "sales", Kenya, English and Swahili) |

## Google reviews

Every rating, count and review on the site comes from one function, `getGoogleReviews()` in `src/lib/googleReviews.ts`: the rating row and buttons under the client videos, the reviews link in Contact, `/reviews` (the page and its meta description) and the `AggregateRating` in the homepage's LocalBusiness JSON-LD.

- **Rating and count**: live from the Places API (place id `ChIJ09WJNwINLxgRRN6mpUFDeVs`, `rating` and `userRatingCount`) when `GOOGLE_PLACES_API_KEY` is set, cached for a day like the pages; otherwise `googleRating` and `googleRatingCount` from `src/content/reviews.json`. The rating shows to one decimal place.
- **One number**: the count is always Google's rating count, never the number of reviews in the file. The site lists only reviews with text (star-only ratings have none to show), so the link to `/reviews` carries no number ("More reviews"), `/reviews` says why it lists fewer, and every link to the listing reads "Read all {count} reviews on Google".
- **Refreshing the fallback**: `npm run reviews` (`scripts/fetch-reviews.mjs`, needs the key in `.env.local`, see `.env.example`) writes Google's rating and count into `reviews.json`, adds the reviews with text the API returns that are not in the file yet (it returns five at most), and replaces the worked-back dates of copied reviews with Google's exact ones. It checks the result before writing (a rating of 1 to 5, a count no lower than the reviews with text). `npm run reviews -- --check` runs the checks without writing and, with a key, fails if the saved rating or count is out of date.
- **Adding a review by hand**: copy it from the listing to the top of `reviews`: the name, the stars, the text exactly as written, Google's "3 days ago" as `relativeTime` and that date as `publishTime` (`YYYY-MM-DD`). Update `googleRating` and `googleRatingCount` at the top to match the listing.
- **What shows**: reviews without text are left out, and the rest are sorted by rating, then date. Dates read like Google's ("3 months ago") and are worked out from `publishTime` each day. The homepage shows six, the ones marked `"featured": true` first; move the flag to change them.
- **Dates**: the hand-copied reviews were copied on 29 October 2026, and `publishTime` was worked out from Google's wording that day, so older ones are approximate ("5 years ago" became 2021-10-29) until `npm run reviews` corrects them.
- **Structured data**: the homepage's LocalBusiness JSON-LD carries an `AggregateRating` with the same rating and count (requested in the November 2026 feedback round). Google's review snippet guidelines exclude both a business's ratings of itself (LocalBusiness and Organization) and ratings gathered from another site, so it will not earn review stars, and Search Console may report it as structured data that breaks the guidelines. If it does, delete the `aggregateRating` block in `localBusiness()` in `src/lib/structuredData.ts`.

## Media pipeline

All photography and video is Glasstech's own work; there is no stock imagery.

1. **Originals** go in `public/content/` (a mirror of the `glasstech content` folder: about 18 GB of 4K drone and Osmo Pocket footage). It is gitignored and listed in `.vercelignore`, so it is never committed or uploaded. Small photo sets are committed instead and referenced with a `repo:` path: `images/` (earlier project photos) and `automotive/` (ten WhatsApp photos of windshield and rear-windscreen jobs, 2.5 MB).
2. **`scripts/media-manifest.mjs`** is the source of truth: each item's source file, category, project, alt text, trim window and poster frame, which items fill the homepage slots (pillar backgrounds, the automotive service card's image strip, the bento tiles for each filter), and the files that are deliberately left out with the reason.
3. **`npm run media`** (`scripts/optimise-media.mjs`, needs `ffmpeg`) writes the optimised files to `public/media/` and regenerates **`src/content/media.ts`** (do not edit that file by hand):
   - images: WebP at max 2000px on the long edge, plus an 800px variant
   - clips: 720p H.264, 30fps, no audio, at most 8s, with WebP posters (1600px and 800px)
   - hero loop: 4:5 crop at 864x1080, 8s with a 1s crossfade so it loops seamlessly, kept under 6 MB (4.8 MB)
   - process loop: 16:9 at 1280x720, 10s crossfaded, kept under 10 MB (1.7 MB)
   - feature videos (`category: "feature"`): the whole clip with its sound, H.264 at 1080p max, re-encoded until it is under 12 MB. 1080p is only kept if it fits at CRF 26 or better; otherwise 720p at a lower CRF looks sharper for the same bytes. iPhone HDR (HLG) footage is tone mapped to SDR with macOS `avconvert` first, or it plays back grey and flat. The poster is a chosen frame (`poster` in seconds), plus a 24px blurred copy inlined in `media.ts` that fills the frame around vertical footage

   It only builds what is missing; `--force` rebuilds and `--only=id,id` limits the run. Without ffmpeg it prints the exact commands to run and leaves missing clips out of `media.ts`, so the site never links to a file that does not exist.

Both loops autoplay muted unless the visitor has asked for reduced motion or is on Save-Data; the hero plays at every screen size, the process loop only from 768px up. Everyone else sees the poster.

### Jeff Koinange's feature

`jeff-koinange.MOV` (repo root, gitignored: 146 MB of iPhone 4K HDR) is encoded to `public/media/video/jeff-koinange-feature.mp4` (720x1280, 46s, with sound, 11.4 MB). It never autoplays: `FeatureVideo` shows the poster and a play button, then mounts a native `<video>` with controls in place. It plays first in "What clients say", across the full width (4:5 on phones, 16:9 from 768px; the footage is vertical, so it sits on a blurred copy of its poster), and at the top of `/work`. One video plays at a time: starting it unloads a playing client Short, starting a Short or a `/work` lightbox clip pauses it. Both pages carry its `VideoObject` JSON-LD. `jeff-koinange-2.mp4` is a 576x1024 second angle of the same moment and is not used; to swap it in, point the manifest item's `source` at it and run `npm run media -- --force --only=jeff-koinange-feature`.

### Placeholders to replace before launch

- **Testimonials**: the two client videos in `src/content/testimonials.ts` have empty `client` and `service` fields, so their cards show the video title. Fill them in with the names the clients are happy to use. The YouTube player only loads when a visitor presses play.
- **Project titles**: the camera files have no project names (`DJI_20260714...`), so titles in the manifest are descriptive ("Garden Glass Conservatory", "Apartment Tower Glazing"). Swap in real project names in `projects` in `scripts/media-manifest.mjs`, then `npm run media`.
- **Sectors**: residential/commercial is inferred from the footage; check it per project.
- **Yard aerial** (`yard-aerial`): looks like the Glasstech yard but is described neutrally until confirmed.
- **Automotive number plates**: the ten automotive photos show customers' plates (KDK 350R on the Land Cruiser behind pillar card 01, and others on /work). Blur them before launch if the clients have not agreed to appear.
- **Email**: `hello@glasstech.co.ke` is the address on the site; the mailbox is set up by hand in cPanel, so confirm it receives mail.

## Project structure

```
scripts/
  media-manifest.mjs     # media source of truth (edit this)
  optimise-media.mjs     # npm run media
  fetch-reviews.mjs      # npm run reviews
  build-brand-assets.mjs # npm run brand
src/
  app/
    globals.css          # brand tokens, utilities, motion
    layout.tsx           # fonts, metadata, LocalBusiness JSON-LD
    page.tsx             # homepage composition
    work/page.tsx        # /work
    reviews/page.tsx     # /reviews
  lib/
    googleReviews.ts     # rating, count and reviews: live Places API, else reviews.json
    structuredData.ts    # JSON-LD builders, typed with schema-dts
  content/
    company.ts           # business facts, SITE_URL and stats
    links.ts             # phone lines and WhatsApp links, social profiles, Taplink, Google Maps listing
    testimonials.ts      # client video testimonials (YouTube Shorts)
    reviews.json         # Google rating, count and reviews (npm run reviews refreshes it)
    media.ts             # generated media library and homepage picks
    labels.ts            # category and sector labels, filters
  components/            # one file per section, plus FeatureVideo, Lightbox, LoopVideo, CountUp, JsonLd, icons
public/
  brand/                 # logo SVGs
  media/                 # optimised photos, clips and posters (committed)
  content/               # original camera media (gitignored)
```
