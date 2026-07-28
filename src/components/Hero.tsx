"use client";

import { useEffect, useRef } from "react";

/* ── WhatsApp SVG ─────────────────────────── */
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const cursor = cursorRef.current;
    if (!hero || !cursor) return;

    // Fine pointer check
    const isFinePonter = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePonter || prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      cursor.style.left = `${e.clientX - rect.left}px`;
      cursor.style.top = `${e.clientY - rect.top}px`;
      cursor.style.opacity = "1";
    };
    const onLeave = () => {
      cursor.style.opacity = "0";
    };

    hero.addEventListener("mousemove", onMove);
    hero.addEventListener("mouseleave", onLeave);
    return () => {
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-hidden flex items-end"
      style={{ background: "var(--ink)" }}
    >
      {/* Sky */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 60% at 80% 15%, rgba(208,49,40,.10) 0%, transparent 70%),
            radial-gradient(ellipse 50% 50% at 15% 60%, rgba(59,150,216,.08) 0%, transparent 60%),
            linear-gradient(178deg, #060c1a 0%, #0a1528 46%, #060b17 100%)
          `,
        }}
      />

      {/* Facade */}
      <div
        className="absolute top-[8%] bottom-[12%] left-[32%] right-0 hidden min-[820px]:block"
        data-par="0.06"
        style={{
          transform: "perspective(1400px) rotateY(-26deg) rotateX(3deg) scale(1.15)",
          transformOrigin: "left center",
          background: `
            radial-gradient(circle 28px at 65% 25%, rgba(208,49,40,.30) 0%, transparent 100%),
            radial-gradient(circle 22px at 78% 42%, rgba(208,49,40,.22) 0%, transparent 100%),
            radial-gradient(circle 20px at 52% 58%, rgba(208,49,40,.18) 0%, transparent 100%),
            radial-gradient(circle 25px at 85% 72%, rgba(208,49,40,.25) 0%, transparent 100%),
            radial-gradient(circle 18px at 60% 80%, rgba(59,150,216,.18) 0%, transparent 100%),
            linear-gradient(180deg, rgba(12,21,38,.6) 0%, rgba(12,21,38,.3) 100%),
            repeating-linear-gradient(90deg, transparent 0px, transparent 76px, rgba(255,255,255,.06) 76px, rgba(255,255,255,.06) 78px),
            repeating-linear-gradient(0deg, transparent 0px, transparent 58px, rgba(255,255,255,.04) 58px, rgba(255,255,255,.04) 60px),
            #0a1426
          `,
          mask: "linear-gradient(100deg, transparent 0%, #000 22%, #000 100%)",
          WebkitMask: "linear-gradient(100deg, transparent 0%, #000 22%, #000 100%)",
          borderRadius: "4px",
        }}
      >
        {/* Light sweep */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(110deg, transparent 40%, rgba(255,255,255,.07) 50%, transparent 60%)",
            animation: "facadeSweep 9s ease-in-out infinite",
          }}
        />
      </div>

      {/* Bloom circles */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full opacity-30"
        style={{
          background: "var(--edge)",
          filter: "blur(70px)",
          top: "20%",
          left: "10%",
          animation: "bloomDrift1 14s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute w-[200px] h-[200px] rounded-full opacity-20"
        style={{
          background: "var(--warm)",
          filter: "blur(70px)",
          top: "30%",
          right: "20%",
          animation: "bloomDrift2 18s ease-in-out infinite alternate",
        }}
      />

      {/* Foreground pane */}
      <div
        className="absolute hidden min-[1020px]:block"
        style={{
          bottom: "5%",
          left: "-3%",
          width: "260px",
          height: "380px",
          transform: "rotate(-8deg)",
          background: "linear-gradient(160deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.02) 100%)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          borderRadius: "6px",
          border: "1px solid rgba(255,255,255,.06)",
        }}
      >
        {/* Float-glass edge strip */}
        <div
          className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full"
          style={{
            background: "var(--edge)",
            boxShadow: "0 0 16px var(--edge), 0 0 4px var(--edge)",
          }}
        />
      </div>

      {/* Cursor light */}
      <div
        ref={cursorRef}
        className="absolute w-[220px] h-[220px] rounded-full pointer-events-none opacity-0 transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          background: "radial-gradient(circle, rgba(59,150,216,.15) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 50% 50%, transparent 50%, rgba(6,11,23,.6) 100%),
            linear-gradient(to top, rgba(6,11,23,.5) 0%, transparent 30%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full" style={{ padding: `clamp(100px, 14vh, 160px) var(--pad) clamp(160px, 18vh, 220px)` }}>
        <div className="inner">
          {/* Geo label */}
          <div className="absolute top-[100px] right-[var(--pad)] hidden min-[1020px]:block font-mono text-[10px] tracking-[.1em] uppercase text-[var(--muted-2)] load-fade" style={{ transitionDelay: "200ms" }}>
            Nairobi &middot; &minus;1.2921&deg;, 36.8219&deg; &middot; EST. GLASS
          </div>

          {/* Social proof card */}
          <div className="absolute top-[130px] right-[var(--pad)] hidden min-[1020px]:block load-fade" style={{ transitionDelay: "700ms", width: "min(300px, 34vw)" }}>
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,.06)",
                border: "1px solid rgba(255,255,255,.1)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
              }}
            >
              {/* Gradient photo area with grid */}
              <div
                className="h-[100px] relative"
                style={{
                  background: "linear-gradient(135deg, var(--ink-3), var(--ink-2))",
                }}
              >
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />
              </div>
              <div className="p-4 -mt-5">
                {/* Avatar stack */}
                <div className="flex items-center mb-3">
                  {[
                    "linear-gradient(135deg, #3b96d8, #084a77)",
                    "linear-gradient(135deg, #d03128, #a82520)",
                    "linear-gradient(135deg, #084a77, #060b17)",
                    "linear-gradient(135deg, #a82520, #d03128)",
                  ].map((bg, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-[var(--ink)]"
                      style={{ background: bg, marginLeft: i > 0 ? "-8px" : 0 }}
                    />
                  ))}
                  <div
                    className="h-8 px-2.5 rounded-full flex items-center text-[11px] font-mono font-bold text-[var(--edge)] -ml-2"
                    style={{
                      background: "rgba(59,150,216,.12)",
                      border: "1px solid rgba(59,150,216,.2)",
                    }}
                  >
                    5k+
                  </div>
                </div>
                <p className="text-[13px] font-medium text-white leading-snug">Trusted work</p>
                <p className="text-[12px] text-[var(--muted-2)] mt-0.5">Homes &amp; sites across Kenya</p>
              </div>
            </div>
          </div>

          {/* Eyebrow */}
          <p className="eyebrow eyebrow-light mb-5 load-fade" style={{ transitionDelay: "100ms" }}>
            Automotive &middot; Architectural &middot; Interior Glass
          </p>

          {/* H1 */}
          <h1
            className="font-display text-white leading-[1.02] mb-6"
            style={{
              fontSize: "clamp(46px, 8vw, 104px)",
              fontWeight: 800,
              letterSpacing: "-.04em",
              maxWidth: "820px",
            }}
          >
            <span className="block overflow-hidden">
              <span className="block load-mask" style={{ transitionDelay: "150ms" }}>
                From windshields
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="block load-mask" style={{ transitionDelay: "240ms" }}>
                to <span className="heading-italic">curtain walls.</span>
              </span>
            </span>
          </h1>

          {/* Lead */}
          <p
            className="text-[var(--muted-2)] max-w-[540px] text-[clamp(15px,1.8vw,18px)] leading-relaxed mb-8 load-fade"
            style={{ transitionDelay: "350ms" }}
          >
            Precision-cut, professionally installed glass for Kenya&apos;s cars, homes and buildings — measured on site, fabricated to spec, fitted by people who do this every day.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-10 load-fade" style={{ transitionDelay: "450ms" }}>
            <a
              href="https://wa.me/254714498682?text=Hi%20Glasstech%2C%20I%27d%20like%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="magnetic inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-[15px] font-medium no-underline transition-colors"
              style={{ background: "var(--edge-deep)", color: "white" }}
            >
              <WhatsAppIcon />
              Quote on WhatsApp
            </a>
            <a
              href="#work"
              className="magnetic inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-[15px] font-medium no-underline text-white transition-colors"
              style={{ border: "1px solid var(--glass-line)" }}
            >
              See our work
            </a>
          </div>

          {/* Stat capsules */}
          <div className="flex flex-wrap gap-3">
            {[
              { n: 12, suffix: "+", label: "Years in glass", delay: "550ms" },
              { n: 2, suffix: "", label: "Nairobi branches", delay: "630ms" },
              { n: 500, suffix: "+", label: "Jobs delivered", delay: "710ms" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex items-center gap-3 px-4 py-2.5 rounded-full load-fade"
                style={{
                  background: "rgba(255,255,255,.06)",
                  border: "1px solid rgba(255,255,255,.08)",
                  transitionDelay: s.delay,
                }}
              >
                {/* Conic gradient disc */}
                <div
                  className="w-[44px] h-[44px] rounded-full shrink-0"
                  style={{
                    background: `conic-gradient(from 180deg, var(--edge), var(--edge-deep), var(--ink-3), var(--edge))`,
                  }}
                />
                <div>
                  <span
                    className="text-white text-[22px] font-bold font-display"
                    style={{ letterSpacing: "-.02em" }}
                    data-count-target={s.n}
                    data-count-suffix={s.suffix}
                  >
                    {s.n}{s.suffix}
                  </span>
                  <span className="block text-[11px] font-mono uppercase tracking-wider text-[var(--muted-2)]">
                    {s.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes facadeSweep {
          0%, 100% { transform: translateX(-60%); }
          50% { transform: translateX(60%); }
        }
        @keyframes bloomDrift1 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(30px, -20px); }
        }
        @keyframes bloomDrift2 {
          0% { transform: translate(0, 0); }
          100% { transform: translate(-20px, 25px); }
        }
        @media (prefers-reduced-motion: reduce) {
          div[style*="animation"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
