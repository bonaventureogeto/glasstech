"use client";

import { useRef, useEffect } from "react";

const projects = [
  {
    caption: "Residential \u00b7 Kirinyaga County",
    title: "Kerugoya Site",
    body: "Windows, balconies and interior glazing for a private residence.",
    gradient: "linear-gradient(135deg, #0e8a75 0%, #12241f 60%, #0b2124 100%)",
  },
  {
    caption: "Commercial \u00b7 Facade",
    title: "Prism Site",
    body: "Curtain-wall glazing and structural glass to a commercial elevation.",
    gradient: "linear-gradient(135deg, #12241f 0%, #0e8a75 40%, #08171c 100%)",
  },
  {
    caption: "Residential \u00b7 Exterior",
    title: "Windows & Balconies",
    body: "Modern glass windows and balcony balustrades for a clean, exquisite look.",
    gradient: "linear-gradient(135deg, #0b2426 0%, #0e8a75 50%, #071619 100%)",
  },
  {
    caption: "Interior \u00b7 Office",
    title: "Partitions",
    body: "Glass partitioning that sub-divides open floor space without closing it in.",
    gradient: "linear-gradient(160deg, #08171c 0%, #12241f 40%, #0e8a75 100%)",
  },
];

export default function WorkRail() {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const isFine = window.matchMedia("(pointer: fine)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || prefersReduced) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const onDown = (e: PointerEvent) => {
      isDown = true;
      rail.style.cursor = "grabbing";
      startX = e.pageX - rail.offsetLeft;
      scrollLeft = rail.scrollLeft;
      rail.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - rail.offsetLeft;
      rail.scrollLeft = scrollLeft - (x - startX);
    };
    const onUp = () => {
      isDown = false;
      rail.style.cursor = "grab";
    };

    rail.style.cursor = "grab";
    rail.addEventListener("pointerdown", onDown);
    rail.addEventListener("pointermove", onMove);
    rail.addEventListener("pointerup", onUp);
    rail.addEventListener("pointercancel", onUp);

    return () => {
      rail.removeEventListener("pointerdown", onDown);
      rail.removeEventListener("pointermove", onMove);
      rail.removeEventListener("pointerup", onUp);
      rail.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className="band" id="work">
      <div className="inner mb-8">
        <div className="max-w-[640px] reveal">
          <p className="eyebrow mb-3">Selected projects</p>
          <h2
            className="font-display text-[clamp(32px,5vw,52px)] leading-[1.08] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-.03em" }}
          >
            A broad spectrum{" "}
            <span className="heading-italic">of glass work.</span>
          </h2>
          <p className="text-[var(--muted)] text-[clamp(15px,1.6vw,17px)] leading-relaxed">
            These tiles are placeholders for real project photography. Each card
            represents a completed job.
          </p>
        </div>
      </div>

      {/* Rail */}
      <div
        ref={railRef}
        className="flex gap-5 overflow-x-auto pb-4 reveal scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          paddingLeft: "var(--pad)",
          paddingRight: "var(--pad)",
        }}
      >
        {projects.map((p, i) => (
          <div
            key={i}
            className="relative shrink-0 rounded-[var(--r)] overflow-hidden group"
            style={{
              flex: `0 0 min(460px, 80vw)`,
              height: "440px",
              scrollSnapAlign: "start",
            }}
          >
            {/* Art layer with parallax */}
            <div
              className="absolute inset-[-10%] transition-transform duration-700 group-hover:scale-[1.03]"
              data-par="0.04"
              style={{ background: p.gradient }}
            >
              {/* Faint grid */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
            </div>

            {/* Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(5,13,12,.85) 0%, rgba(5,13,12,.2) 50%, transparent 100%)",
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <span className="font-mono text-[10px] tracking-[.06em] uppercase text-[var(--edge)] block mb-2">
                {p.caption}
              </span>
              <h3
                className="font-display text-white text-[24px] leading-snug mb-1.5"
                style={{ fontWeight: 700, letterSpacing: "-.02em" }}
              >
                {p.title}
              </h3>
              <p className="text-[var(--muted-2)] text-[14px] leading-relaxed">
                {p.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Hint */}
      <div className="inner mt-5">
        <p className="font-mono text-[11px] tracking-[.04em] text-[var(--muted-2)] flex items-center gap-2 reveal">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          Drag or scroll to explore projects
        </p>
      </div>

    </section>
  );
}
