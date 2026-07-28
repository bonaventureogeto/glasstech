"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

const projects = [
  {
    caption: "Commercial \u00b7 Glass Partitions",
    title: "Mombasa Road Site",
    body: "Full-height glass partitions and windows for a commercial warehouse space.",
    image: "/images/glass-1.jpeg",
  },
  {
    caption: "Interior \u00b7 Shower Enclosures",
    title: "Frameless Shower Cubicles",
    body: "Frameless and semi-frameless glass shower enclosures with quality hardware.",
    image: "/images/glass-2.jpeg",
  },
  {
    caption: "Interior \u00b7 Office Partitioning",
    title: "Office Glass Partitions",
    body: "Floor-to-ceiling glass partitions that open up office floor plans with natural light.",
    image: "/images/glass-3.jpeg",
  },
  {
    caption: "Residential \u00b7 Kirinyaga County",
    title: "Kerugoya Lodge",
    body: "Full glass enclosure walls for a thatched-roof lodge with panoramic views.",
    image: "/images/glass-4.jpeg",
  },
  {
    caption: "Residential \u00b7 Exterior",
    title: "Thatched Roof Residence",
    body: "Timber-framed glass walls wrapping an entire residence with seamless views.",
    image: "/images/glass-5.jpeg",
  },
  {
    caption: "Residential \u00b7 Windows & Glazing",
    title: "Hillside Estate",
    body: "Multi-unit residential glazing with timber frames and extensive glass facade work.",
    image: "/images/glass-6.jpeg",
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
            From office partitions to full residential glazing — every project
            measured, cut and fitted by our team.
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
            {/* Photo layer with parallax */}
            <div
              className="absolute inset-[-10%] transition-transform duration-700 group-hover:scale-[1.03]"
            >
              <Image
                src={p.image}
                alt={p.title}
                fill
                className="object-cover"
                sizes="(max-width: 820px) 80vw, 460px"
              />
            </div>

            {/* Scrim */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to top, rgba(6,11,23,.85) 0%, rgba(6,11,23,.2) 50%, transparent 100%)",
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
