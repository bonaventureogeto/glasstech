// Placeholder copy stays bracketed until real client quotes are supplied.
const testimonials = [
  { quote: "[CLIENT QUOTE: residential shower or glazing job, 2 to 3 sentences]", role: "Homeowner, [Area]" },
  { quote: "[CLIENT QUOTE: contractor or developer on a partition or facade job]", role: "Project manager, [Company]" },
  { quote: "[CLIENT QUOTE: fleet or insurance windshield replacement, turnaround time]", role: "Fleet manager, [Company]" },
];

export default function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="bg-white">
      <div className="shell flex flex-col gap-6 py-16 md:gap-10 md:py-24">
        <div className="reveal flex max-w-[640px] flex-col gap-3 md:gap-4">
          <p className="eyebrow text-[11px] text-navy md:text-xs">What clients say</p>
          <h2 id="testimonials-title" className="text-h2 font-bold">
            Fitted once, done right.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {testimonials.map((t) => (
            <figure
              key={t.role}
              className="reveal flex flex-col justify-between gap-5 rounded-card border border-line bg-frost p-6 md:p-7"
            >
              <blockquote className="text-base leading-[1.6] md:text-[17px]">{t.quote}</blockquote>
              <figcaption className="flex items-center gap-3">
                <span className="size-10 shrink-0 rounded-full bg-outline" aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">[Client name]</span>
                  <span className="text-xs text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
