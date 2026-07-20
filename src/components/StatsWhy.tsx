const stats = [
  { n: 12, suffix: "+", label: "Years in glass" },
  { n: 2, suffix: "", label: "Nairobi branches" },
  { n: 50, suffix: "+", label: "Specialists on the floor" },
  { n: 48, suffix: "h", label: "Typical turnaround" },
];

const whyItems = [
  {
    title: "Quality first",
    tagline: "Glass we\u2019d fit in our own homes",
    body: "We source from vetted manufacturers with a real track record, so what arrives on site is what was promised in the quote.",
  },
  {
    title: "Service that shows up",
    tagline: "One team, inquiry to install",
    body: "The same people who quote the job see it through delivery and fitting \u2014 you\u2019re never handed off to a stranger.",
  },
  {
    title: "Experience that counts",
    tagline: "Cars and buildings, daily",
    body: "Years across automotive and architectural glass means fewer callbacks and a cleaner finish, first time.",
  },
];

export default function StatsWhy() {
  return (
    <section className="band dark" style={{ paddingTop: 0 }}>
      <div className="inner">
        {/* Stats row */}
        <div className="grid grid-cols-2 min-[820px]:grid-cols-4 gap-8 mb-20 reveal">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="pl-5 reveal"
              style={{ borderLeft: "1px solid var(--glass-line)" }}
              data-d={String(i + 1)}
            >
              <span
                className="font-display text-[clamp(40px,6vw,64px)] font-bold text-white leading-none block mb-2"
                style={{ letterSpacing: "-.03em" }}
                data-count-target={s.n}
                data-count-suffix={s.suffix}
              >
                {s.n}
                <span className="text-[var(--edge)]">{s.suffix}</span>
              </span>
              <span className="font-mono text-[11px] tracking-[.06em] uppercase text-[var(--muted-2)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Why columns */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-3 gap-8">
          {whyItems.map((w, i) => (
            <div
              key={w.title}
              className="pt-5 reveal"
              style={{ borderTop: "2px solid var(--edge)" }}
              data-d={String(i + 1)}
            >
              <h3
                className="font-display text-white text-[20px] leading-snug mb-1.5"
                style={{ fontWeight: 700, letterSpacing: "-.01em" }}
              >
                {w.title}
              </h3>
              <p className="text-[var(--edge)] text-[13px] font-medium mb-3">
                {w.tagline}
              </p>
              <p className="text-[var(--muted-2)] text-[14.5px] leading-relaxed">
                {w.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
