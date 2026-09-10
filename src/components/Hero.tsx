"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import Image from "next/image";

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

function checkCanAutoplay(): boolean {
  if (typeof window === "undefined") return false;
  const isWide = window.matchMedia("(min-width: 768px)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
  const saveData = conn?.saveData === true;
  return isWide && !prefersReduced && !saveData;
}

const subscribeNoop = () => () => {};

function useCanAutoplay() {
  return useSyncExternalStore(subscribeNoop, checkCanAutoplay, () => false);
}

export default function Hero() {
  const canAutoplay = useCanAutoplay();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (canAutoplay && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked — poster image will show
      });
    }
  }, [canAutoplay]);

  return (
    <section className="relative min-h-[100svh] overflow-hidden flex items-end">
      {/* Background layer */}
      <div className="absolute inset-0">
        {/* Fallback gradient (always present behind image/video) */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(178deg, #060c1a 0%, #0a1528 46%, #060b17 100%)",
          }}
        />

        {/* Video or poster image */}
        {canAutoplay ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/video/hero-facade-poster.jpg"
            aria-hidden="true"
          >
            <source src="/video/hero-facade.webm" type="video/webm" />
            <source src="/video/hero-facade.mp4" type="video/mp4" />
          </video>
        ) : (
          <Image
            src="/video/hero-facade-poster.jpg"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
            aria-hidden="true"
          />
        )}

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(5,13,12,.55) 0%, rgba(5,13,12,.35) 40%, rgba(5,13,12,.75) 100%)",
          }}
        />

        {/* Soft brand-green radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 30% 70%, rgba(59,150,216,.08) 0%, transparent 70%)",
          }}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            boxShadow: "inset 0 0 120px 40px rgba(5,13,12,.4)",
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full"
        style={{
          padding: `clamp(100px, 14vh, 160px) var(--pad) clamp(160px, 18vh, 220px)`,
        }}
      >
        <div className="inner">
          {/* Eyebrow */}
          <p
            className="eyebrow eyebrow-light mb-5 load-fade"
            style={{ transitionDelay: "100ms" }}
          >
            Automotive &middot; Architectural &middot; Interior Glass
          </p>

          {/* H1 */}
          <h1
            className="font-display text-white leading-[1.05] mb-6"
            style={{
              fontSize: "clamp(42px, 7.5vw, 92px)",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              maxWidth: "820px",
            }}
          >
            <span className="block overflow-hidden">
              <span
                className="block load-mask"
                style={{ transitionDelay: "150ms" }}
              >
                From windshields
              </span>
            </span>
            <span className="block overflow-hidden">
              <span
                className="block load-mask"
                style={{ transitionDelay: "240ms" }}
              >
                to{" "}
                <span className="text-[var(--edge-deep)]">curtain walls.</span>
              </span>
            </span>
          </h1>

          {/* Lead */}
          <p
            className="text-[var(--muted-2)] max-w-[540px] text-[clamp(15px,1.8vw,18px)] leading-relaxed mb-8 load-fade"
            style={{ transitionDelay: "350ms" }}
          >
            Precision-cut, professionally installed glass for Kenya&apos;s cars,
            homes and buildings — measured on site, fabricated to spec, fitted by
            people who do this every day.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-3 load-fade"
            style={{ transitionDelay: "450ms" }}
          >
            <a
              href="https://wa.me/254714498682?text=Hi%20Glasstech%2C%20I%27d%20like%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[15px] font-medium no-underline transition-colors"
              style={{ background: "var(--edge-deep)", color: "white" }}
            >
              <WhatsAppIcon />
              Quote on WhatsApp
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-medium no-underline text-white transition-colors"
              style={{ border: "1px solid var(--glass-line)" }}
            >
              See our work
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
