import LoopVideo from "@/components/LoopVideo";
import { processLoop } from "@/content/media";

const steps = [
  {
    title: "Inquiry and site visit",
    body: "Tell us the job. We come out, look at the opening and talk through options and glass types.",
  },
  {
    title: "Measure and quote",
    body: "Exact measurements on site, then a clear written quote: spec, thickness, treatment and price.",
  },
  {
    title: "Cut, temper and polish",
    body: "Glass is cut to size, toughened or laminated as needed, and edges polished in the workshop.",
  },
  {
    title: "Deliver and install",
    body: "Our fitters deliver and install, check the seal and clean the glass before we leave.",
  },
];

const reasons = [
  {
    kicker: "Quality first",
    title: "Glass we'd fit in our own homes",
    body: "Sourced from vetted manufacturers, so what arrives on site is what was promised in the quote.",
  },
  {
    kicker: "Service that shows up",
    title: "One team, inquiry to install",
    body: "The people who quote the job see it through to fitting. You're never handed to a stranger.",
  },
  {
    kicker: "Experience that counts",
    title: "Cars and buildings, daily",
    body: "Years across both trades means fewer callbacks and a cleaner finish, first time.",
  },
];

export default function Process() {
  return (
    <section id="process" aria-labelledby="process-title" className="on-dark bg-navy-deep text-white">
      <div className="shell flex flex-col gap-7 py-16 md:gap-14 md:py-24">
        <div className="reveal grid gap-3 md:grid-cols-12 md:items-end md:gap-8">
          <div className="flex flex-col gap-3 md:col-span-7 md:gap-4">
            <p className="eyebrow text-[11px] text-sky md:text-xs">How a job runs</p>
            <h2 id="process-title" className="text-h2 font-bold">
              Measured, made, <span className="text-coral">mounted.</span>
            </h2>
          </div>
          <p className="text-[15px] text-mist md:col-span-5 md:text-[17px] md:leading-[1.65]">
            A straight line from your first message to glass that&apos;s fitted and cleaned down. No surprises in the
            middle.
          </p>
        </div>

        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className="reveal flex gap-4 border-t border-white/18 pt-[18px] md:flex-col md:gap-3.5 md:pt-6"
            >
              <span className="flex-[0_0_44px] font-display text-[26px] leading-none font-bold text-coral md:flex-none md:text-[40px]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-1.5 md:gap-3.5">
                <h3 className="text-lg font-semibold tracking-[-0.01em] md:text-[22px]">{s.title}</h3>
                <p className="text-sm leading-[1.55] text-mist md:text-[15px] md:leading-[1.6]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="grid gap-5 lg:grid-cols-12">
          {processLoop ? (
            <LoopVideo
              loop={processLoop}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="reveal relative aspect-video rounded-[18px] lg:col-span-5 lg:aspect-auto lg:min-h-80"
            />
          ) : (
            <div className="mull aspect-video rounded-[18px] lg:col-span-5 lg:aspect-auto lg:min-h-80" aria-hidden="true" />
          )}
          <ul className="grid gap-5 md:grid-cols-3 lg:col-span-7">
            {reasons.map((r) => (
              <li
                key={r.kicker}
                className="reveal flex flex-col gap-3 rounded-card border border-white/10 bg-white/5 p-6"
              >
                <p className="eyebrow text-[11px] text-sky">{r.kicker}</p>
                <h3 className="text-[19px] leading-[1.25] font-semibold">{r.title}</h3>
                <p className="text-sm text-mist">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
