import { site } from "@/content/site";

const stats = site.stats.map((s) => ({ n: s.value, suffix: s.suffix, label: s.label }));

export default function HeroStats() {
  return (
    <section
      className="band dark"
      style={{ paddingTop: "clamp(48px, 6vw, 72px)", paddingBottom: "clamp(48px, 6vw, 72px)" }}
    >
      <div className="inner">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((s) => (
            <div
              key={s.label}
              className="pl-5 reveal"
              style={{ borderLeft: "1px solid var(--glass-line)" }}
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
