"use client";

const items = [
  "Windshields & auto glass",
  "Shower cubicles",
  "Office partitioning",
  "Building glass supply",
  "Balconies & railings",
  "Mirrors & splashbacks",
  "Repair & maintenance",
];

export default function Marquee() {
  const track = items.map((item, i) => (
    <span key={i} className="flex items-center gap-6 shrink-0">
      <span className="font-mono text-[clamp(12px,1.4vw,14px)] uppercase tracking-[.06em] text-[var(--ink)] whitespace-nowrap">
        {item}
      </span>
      <span className="text-[var(--edge-deep)] text-[14px] font-mono" aria-hidden="true">/</span>
    </span>
  ));

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{ borderColor: "var(--line)" }}
    >
      <div
        className="flex gap-6 marquee-track"
        style={{ width: "max-content" }}
      >
        <div className="flex gap-6 shrink-0 marquee-inner">{track}</div>
        <div className="flex gap-6 shrink-0 marquee-inner" aria-hidden="true">{track}</div>
      </div>

      <style jsx>{`
        .marquee-inner {
          animation: marqueeScroll 30s linear infinite;
        }
        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-inner {
            animation-play-state: paused;
          }
        }
      `}</style>
    </div>
  );
}
