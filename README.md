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

Fonts are loaded via `next/font/google` in `src/app/layout.tsx`:
- **Bricolage Grotesque** (display headings)
- **Fraunces** (italic accent in headings)
- **Inter** (body text)
- **Space Mono** (eyebrows, specs, labels)

## Placeholder Content to Replace Before Launch

The following items are unverified or placeholder and must be replaced with real data:

- **Email address**: `hello@glasstechandinteriors.com` - unverified, appears in Contact section and Footer
- **Kirinyaga Road address**: "Kirinyaga Road, Nairobi CBD" - approximate, needs exact street address
- **All statistics**: `12+ Years`, `2 Nairobi branches`, `500+ Jobs delivered`, `50+ Specialists`, `48h Turnaround` - all unverified
- **Project tiles** (Work section): All four project cards use CSS gradients as placeholder art - replace with real project photography
- **Social proof card** (Hero): The `5k+` count and avatar stack are placeholder - replace with real testimonial data
- **Social media URLs**: Verify all four social links resolve to the correct profiles

## Project Structure

```
src/
  app/
    globals.css      # Design tokens, utility classes, grain overlay
    layout.tsx       # Root layout, font loading, meta tags
    page.tsx         # Page composition
  components/
    Nav.tsx          # Floating glass pill nav with mobile menu
    Hero.tsx         # Hero with facade, blooms, cursor light
    Configurator.tsx # Quote configurator bar (WhatsApp integration)
    Marquee.tsx      # Infinite scrolling service marquee
    TwoPillars.tsx   # Automotive + Architectural cards
    ServicesGrid.tsx # 6-cell services grid
    WorkRail.tsx     # Horizontal drag-to-scroll project rail
    Process.tsx      # 4-step process grid
    StatsWhy.tsx     # Stats counters + why columns
    Contact.tsx      # Branch cards + contact card
    FinalCTA.tsx     # Final call-to-action
    Footer.tsx       # 4-column footer
    MotionSystem.tsx # Lenis, observers, count-ups, parallax, magnetic
```
