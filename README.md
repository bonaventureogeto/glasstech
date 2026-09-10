# Glasstech & Interior Solutions - Marketing Site

Production marketing site for **Glasstech & Interior Solutions Limited**, a Nairobi-based automotive and architectural glass company.

## Getting Started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

## Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** (CSS-based config)
- **Lenis** for momentum smooth scroll
- No external images or CDN dependencies

## Design Tokens

All design tokens are defined as CSS custom properties in `src/app/globals.css` and mirrored into Tailwind's theme via `@theme inline` in the same file.

Key tokens: `--ink`, `--edge`, `--edge-deep`, `--warm`, `--frost`, `--paper`, `--pad`, `--maxw`.

## Fonts

Loaded via `next/font/google` in `src/app/layout.tsx`:

- **Archivo** (weights 500, 600, 700) -- all headings (h1, h2, h3), stat numbers, and display text. CSS variable: `--font-archivo`. Mapped to `--font-display` in Tailwind theme.
- **Inter** (weights 400, 500, 600) -- body text, buttons, nav links, labels, eyebrows, and everything else. CSS variable: `--font-inter`. Mapped to `--font-body` in Tailwind theme.

Heading letter-spacing is set to `-0.01em` throughout. Eyebrows and labels use Inter at 500/600 weight, 11-12px, `letter-spacing: 0.1em`, uppercase.

## Image & Video Assets

All assets are stored locally in `/public/`. No external hotlinking.

### Hero video (`/public/video/`)

| File | Status | Subject |
|------|--------|---------|
| `hero-facade.mp4` | Present | Glass buildings with cloudy sky, ~4.3 MB, 720p. Source: Mixkit (free commercial license) |
| `hero-facade.webm` | **Missing -- needs conversion** | WebM version of the hero video for smaller file size. Convert with: `ffmpeg -i hero-facade.mp4 -c:v libvpx-vp9 -b:v 1M -an hero-facade.webm` |
| `hero-facade-poster.jpg` | Present | Glass building facade still from Pexels. Used as video poster and fallback image on mobile/reduced-motion |

The hero video autoplays only on screens >= 768px wide, when the user has not set `prefers-reduced-motion`, and when Save-Data is not active. Otherwise the poster image is shown as a static background.

### Section images (`/public/images/`)

| File | Status | Alt text | Subject / source |
|------|--------|----------|------------------|
| `pillar-automotive.jpg` | Present | Auto glass technician fitting a car windshield | Car windshield / auto glass close-up. Pexels photo 2265634 |
| `pillar-architectural.jpg` | Present | Modern building clad in architectural glass | Modern glass curtain-wall facade. Pexels photo 162539 |
| `work-kerugoya.jpg` | Present | Residential home with floor-to-ceiling glazing | Modern luxury house with glass windows. Pexels photo 35361412 |
| `work-prism.jpg` | Present | Commercial glass curtain-wall facade | Modern multistory building with glass windows. Pexels photo 8529658 |
| `work-windows-balconies.jpg` | Present | Frameless glass balcony balustrade | Glass railing on a balcony. Pexels photo 10420335 |
| `work-partitions.jpg` | Present | Office interior divided by glass partitions | Stylish office interior with glass walls. Pexels photo 3801167 |
| `proof-interior.jpg` | Present | Frameless glass shower enclosure in a modern bathroom | Clear glass shower room. Pexels photo 271631 |
| `why-workshop.jpg` | **Missing -- optional** | Glass being cut and polished in the workshop | Suggested search: "glass cutting workshop" on Pexels/Unsplash |

### Existing project photos (`/public/images/glass-*.jpeg`)

These are the original project photos used in the Work Rail section:
- `glass-1.jpeg` through `glass-6.jpeg` -- actual Glasstech project photos

### Brand assets (`/public/images/`)

| File | Purpose |
|------|---------|
| `logo-mark.png` | Logo mark (red G + navy building), used in nav and footer |
| `logo-full.png` | Full logo with wordmark |
| `glasstech-logo-transparent.png` | Logo on transparent background |

### Icons & OG

| File | Status | Notes |
|------|--------|-------|
| `/src/app/favicon.ico` | Present | Auto-detected by Next.js App Router |
| `/public/icon.svg` | Present | SVG favicon, simplified logo mark |
| `/public/apple-touch-icon.png` | Present | Copy of logo-mark.png (ideally replace with a 180x180 version) |
| `/public/og.jpg` | **Placeholder** | Currently uses the hero poster image. Replace with a 1200x630 composited image featuring the wordmark and tagline "Automotive & architectural glass, Nairobi" |

To drop in an official logo SVG, place it at `/public/brand/logo.svg` and update the Nav and Footer components to reference it.

## Project Structure

```
src/
  app/
    globals.css      # Design tokens, utility classes
    layout.tsx       # Root layout, font loading, meta tags
    page.tsx         # Page composition
  components/
    Nav.tsx          # Floating glass pill nav with mobile menu
    Hero.tsx         # Hero with background video, poster fallback
    Configurator.tsx # Quote configurator bar (WhatsApp integration)
    Marquee.tsx      # Infinite scrolling service marquee
    TwoPillars.tsx   # Automotive + Architectural cards with photos
    ServicesGrid.tsx # 6-cell services grid
    WorkRail.tsx     # Horizontal drag-to-scroll project rail
    Process.tsx      # 4-step process grid
    StatsWhy.tsx     # Stats counters + why columns
    Contact.tsx      # Branch cards + contact card
    FinalCTA.tsx     # Final call-to-action
    Footer.tsx       # 4-column footer
    MotionSystem.tsx # Lenis, observers, count-ups
```

## Placeholder Content to Replace Before Launch

The following items are unverified or placeholder and must be replaced with real data:

- **Email address**: `hello@glasstechandinteriors.com` -- unverified, appears in Contact section and Footer
- **Kirinyaga Road address**: "Kirinyaga Road, Nairobi CBD" -- approximate, needs exact street address
- **All statistics**: `12+ Years`, `2 Nairobi branches`, `500+ Jobs delivered`, `50+ Specialists`, `48h Turnaround` -- all unverified
- **Social proof card** (removed in current build): The `5k+` count and avatar stack were placeholder
- **Social media URLs**: Verify all four social links resolve to the correct profiles
- **OG image** (`/public/og.jpg`): Currently a stock photo placeholder -- replace with branded composite
- **WebM video** (`/public/video/hero-facade.webm`): Not yet generated -- convert from mp4 for smaller file size
- **Apple touch icon** (`/public/apple-touch-icon.png`): Currently full logo mark -- ideally resize to 180x180
- **Domain**: `metadataBase` in layout.tsx is set to `https://glasstechandinteriors.com` -- confirm this is the production domain
