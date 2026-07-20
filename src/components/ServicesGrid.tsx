const services = [
  {
    num: "01",
    title: "Glass shower cubicles",
    body: "Frameless and semi-frameless enclosures cut to your bathroom, with polished edges and quality hardware.",
    spec: "8\u201310mm \u00b7 Toughened \u00b7 Frameless",
  },
  {
    num: "02",
    title: "Office partitioning",
    body: "Single and double-glazed glass partitions that open up floor plans while keeping noise where it belongs.",
    spec: "Acoustic \u00b7 Framed / butt-joint",
  },
  {
    num: "03",
    title: "Building glass supply",
    body: "Float, toughened, laminated and low-iron glass supplied by the sheet to contractors and fabricators.",
    spec: "Wholesale \u00b7 Cut to size",
  },
  {
    num: "04",
    title: "Balconies & railings",
    body: "Structural glass balustrades and Juliet balconies engineered to hold, finished to look effortless.",
    spec: "Laminated \u00b7 Spigot / channel",
  },
  {
    num: "05",
    title: "Automotive glass",
    body: "Windshield replacement, chip repair and side glass for private vehicles, fleets and insurance claims.",
    spec: "OEM-grade \u00b7 Same-day",
  },
  {
    num: "06",
    title: "Repair & maintenance",
    body: "Re-sealing, re-glazing, hardware swaps and breakage call-outs \u2014 for the glass you already have.",
    spec: "Call-out \u00b7 Warranty work",
  },
];

export default function ServicesGrid() {
  return (
    <section className="band" id="services">
      <div className="inner">
        {/* Header */}
        <div className="mb-12 max-w-[600px] reveal">
          <p className="eyebrow mb-3">What we make &amp; fit</p>
          <h2
            className="font-display text-[clamp(32px,5vw,52px)] leading-[1.08] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-.03em" }}
          >
            Products &amp; <span className="heading-italic">services</span>
          </h2>
          <p className="text-[var(--muted)] text-[clamp(15px,1.6vw,17px)] leading-relaxed">
            Every job starts with a real measurement and ends with a clean, safe
            install — no guesswork, no leftover mess.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 min-[540px]:grid-cols-2 min-[820px]:grid-cols-3"
          style={{
            gap: "1px",
            background: "var(--line)",
          }}
        >
          {services.map((s, i) => (
            <div
              key={s.num}
              className="group relative bg-[var(--paper)] p-7 min-[820px]:p-8 reveal"
              data-d={String((i % 3) + 1)}
            >
              {/* Left hover bar */}
              <div
                className="absolute left-0 top-0 w-[3px] h-full origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-500"
                style={{
                  background: "var(--edge)",
                  transitionTimingFunction: "var(--e-out)",
                }}
              />

              <span className="font-mono text-[11px] text-[var(--muted-2)] tracking-[.04em] mb-4 block">
                {s.num}
              </span>
              <h3
                className="font-display text-[20px] leading-snug mb-3"
                style={{ fontWeight: 700, letterSpacing: "-.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-[var(--muted)] text-[14.5px] leading-relaxed mb-4">
                {s.body}
              </p>
              <span className="font-mono text-[11px] tracking-[.04em] text-[var(--edge-deep)]">
                {s.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
