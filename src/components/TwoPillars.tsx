const pillars = [
  {
    num: "01",
    kicker: "Automotive glass",
    title: (
      <>
        Back on the road, <span className="heading-italic">same day</span>
      </>
    ),
    body: "Windshield replacement, chip and crack repair, side and rear glass \u2014 for private cars, fleets and insurance jobs.",
    chips: ["Windshields", "Chip repair", "Side & rear", "Fleet / insurance"],
    link: { label: "Book a fitting", href: "#contact" },
  },
  {
    num: "02",
    kicker: "Architectural & interior",
    title: (
      <>
        From shower screens <span className="heading-italic">to facades</span>
      </>
    ),
    body: "Toughened and laminated glass supplied, fabricated and installed for homes, offices and developments across Kenya.",
    chips: ["Shower cubicles", "Partitions", "Facades", "Balconies"],
    link: { label: "Start a project", href: "#contact" },
  },
];

export default function TwoPillars() {
  return (
    <section className="band" id="about">
      <div className="inner">
        {/* Header */}
        <div className="mb-12 max-w-[640px] reveal">
          <p className="eyebrow mb-3">Two trades, one workshop</p>
          <h2
            className="font-display text-[clamp(32px,5vw,52px)] leading-[1.08] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-.03em" }}
          >
            Whatever needs glass,{" "}
            <span className="heading-italic">we cut it.</span>
          </h2>
          <p className="text-[var(--muted)] text-[clamp(15px,1.6vw,17px)] leading-relaxed">
            We run two arms out of the same fabrication floor — vehicle glass and
            architectural glass — so the same standard of measuring, cutting and
            fitting shows up on a saloon car and a six-storey facade.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 min-[820px]:grid-cols-2 gap-5">
          {pillars.map((p, idx) => (
            <div
              key={p.num}
              className="rounded-[var(--r)] reveal"
              data-d={idx + 1}
              style={{
                background: "var(--ink)",
                minHeight: "380px",
              }}
            >
              {/* Content */}
              <div className="flex flex-col justify-end h-full p-8 min-[820px]:p-10">
                <span className="font-mono text-[11px] tracking-[.08em] uppercase text-[var(--edge)] mb-3">
                  {p.num} — {p.kicker}
                </span>
                <h3
                  className="font-display text-white text-[clamp(22px,3vw,30px)] leading-[1.15] mb-3"
                  style={{ fontWeight: 700, letterSpacing: "-.02em" }}
                >
                  {p.title}
                </h3>
                <p className="text-[var(--muted-2)] text-[15px] leading-relaxed mb-5 max-w-[400px]">
                  {p.body}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {p.chips.map((c) => (
                    <span
                      key={c}
                      className="font-mono text-[10px] tracking-[.04em] uppercase px-3 py-1.5 rounded-full"
                      style={{
                        background: "rgba(255,255,255,.06)",
                        color: "var(--muted-2)",
                        border: "1px solid rgba(255,255,255,.08)",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link.href}
                  className="inline-flex items-center gap-2 text-[var(--edge)] text-[14px] font-medium no-underline group/link"
                >
                  {p.link.label}
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                    &rarr;
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
