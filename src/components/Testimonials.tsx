import { testimonials } from "@/content/testimonials";

// Shows real client quotes from src/content/testimonials.ts. A single quote is
// set large on its own; two or more sit in a row of cards.
export default function Testimonials() {
  if (testimonials.length === 0) return null;
  const single = testimonials.length === 1;

  return (
    <section aria-labelledby="testimonials-title" className="bg-white">
      <div className="shell flex flex-col gap-6 py-16 md:gap-10 md:py-24">
        <div className="reveal flex max-w-[640px] flex-col gap-3 md:gap-4">
          <p className="eyebrow text-[11px] text-navy md:text-xs">What clients say</p>
          <h2 id="testimonials-title" className="text-h2 font-bold">
            Fitted once, done right.
          </h2>
        </div>
        <div className={single ? "" : "grid gap-4 md:grid-cols-3 md:gap-5"}>
          {testimonials.map((t) => (
            <figure
              key={`${t.client}-${t.quote.slice(0, 24)}`}
              className={`reveal flex flex-col justify-between rounded-card border border-line bg-frost ${
                single ? "gap-8 p-6 md:p-10" : "gap-5 p-6 md:p-7"
              }`}
            >
              <blockquote
                className={
                  single
                    ? "max-w-[880px] font-display text-[22px] leading-[1.4] font-semibold tracking-[-0.01em] md:text-[28px]"
                    : "text-base leading-[1.6] md:text-[17px]"
                }
              >
                <p>“{t.quote}”</p>
              </blockquote>
              <figcaption className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">{t.name ?? t.client}</span>
                {(t.name || t.role) && (
                  <span className="text-xs text-muted">{[t.role, t.name ? t.client : null].filter(Boolean).join(", ")}</span>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
