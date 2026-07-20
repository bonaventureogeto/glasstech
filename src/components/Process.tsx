const steps = [
  {
    num: "01",
    title: "Inquiry & site visit",
    body: "Tell us the job. We come out, look at the opening and talk through options and glass types.",
  },
  {
    num: "02",
    title: "Measure & quote",
    body: "Exact measurements on site, then a clear written quote \u2014 spec, thickness, treatment and price.",
  },
  {
    num: "03",
    title: "Cut, temper & polish",
    body: "Glass is cut to size, toughened or laminated as needed, and edges polished in the workshop.",
  },
  {
    num: "04",
    title: "Deliver & install",
    body: "Our fitters deliver and install, check the seal and clean the glass before we leave.",
  },
];

export default function Process() {
  return (
    <section className="band dark" id="process">
      <div className="inner">
        {/* Header */}
        <div className="mb-12 max-w-[600px] reveal">
          <p className="eyebrow eyebrow-light mb-3">How a job runs</p>
          <h2
            className="font-display text-white text-[clamp(32px,5vw,52px)] leading-[1.08] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-.03em" }}
          >
            Measured, made,{" "}
            <span className="heading-italic">mounted.</span>
          </h2>
          <p className="text-[var(--muted-2)] text-[clamp(15px,1.6vw,17px)] leading-relaxed">
            A straight line from your first message to glass that&apos;s fitted and
            cleaned down. No surprises in the middle.
          </p>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 min-[480px]:grid-cols-2"
          style={{ gap: "1px", background: "var(--glass-line)" }}
        >
          {steps.map((s, i) => (
            <div
              key={s.num}
              className="p-8 reveal"
              style={{ background: "var(--ink)" }}
              data-d={String((i % 2) + 1)}
            >
              <span className="font-mono text-[32px] font-bold text-[var(--edge)] block mb-4 opacity-30">
                {s.num}
              </span>
              <h3
                className="font-display text-white text-[20px] leading-snug mb-3"
                style={{ fontWeight: 700, letterSpacing: "-.01em" }}
              >
                {s.title}
              </h3>
              <p className="text-[var(--muted-2)] text-[14.5px] leading-relaxed">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
