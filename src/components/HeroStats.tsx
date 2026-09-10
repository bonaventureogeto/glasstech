const stats = [
  { n: 12, suffix: "+", label: "Years in glass" },
  { n: 2, suffix: "", label: "Nairobi branches" },
  { n: 50, suffix: "+", label: "Specialists on the floor" },
  { n: 48, suffix: "h", label: "Typical turnaround" },
  { n: 50, suffix: "+", label: "Glass professionals" },
  { n: 10, suffix: "K+", label: "Completed projects" },
  { n: 170, suffix: "K+", label: "Hours of experience" },
];

export default function HeroStats() {
  return (
    <section
      className="band dark"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="inner">
        <div className="grid grid-cols-2 min-[600px]:grid-cols-4 min-[1024px]:grid-cols-7 gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="pl-5 reveal"
              style={{ borderLeft: "1px solid var(--glass-line)" }}
              data-d={String((i % 7) + 1)}
            >
              <span
                className="font-display text-[clamp(36px,5vw,56px)] font-bold text-white leading-none block mb-2"
                style={{ letterSpacing: "-0.01em" }}
                data-count-target={s.n}
                data-count-suffix={s.suffix}
              >
                {s.n}
                <span className="text-[var(--edge)]">{s.suffix}</span>
              </span>
              <span className="text-[11px] font-medium tracking-[.1em] uppercase text-[var(--muted-2)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
