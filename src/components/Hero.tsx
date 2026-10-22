import Configurator from "@/components/Configurator";
import CountUp from "@/components/CountUp";
import LoopVideo from "@/components/LoopVideo";
import { CheckIcon, WhatsAppIcon } from "@/components/icons";
import { heroLoop } from "@/content/media";
import { site, whatsappLink } from "@/content/site";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="mull on-dark text-white">
      {/* On phones the copy column dissolves (display: contents) so the media panel
          can sit between the buttons and the stats; from lg it is a grid column. */}
      <div className="shell flex flex-col gap-[22px] pt-12 pb-7 lg:grid lg:grid-cols-12 lg:items-end lg:gap-8 lg:pt-24 lg:pb-14">
        <div className="contents lg:col-span-7 lg:flex lg:flex-col lg:gap-7">
          <p className="eyebrow inline-flex items-center gap-2.5 text-[11px] text-sky md:text-xs">
            <span className="size-2 shrink-0 rounded-full bg-coral" aria-hidden="true" />
            Automotive · Architectural · Interior glass
          </p>
          <h1 id="hero-title" className="text-h1 font-bold">
            From windshields to <span className="text-coral">curtain walls.</span>
          </h1>
          <p className="max-w-[560px] text-base text-mist md:text-[19px]">
            Precision-cut glass for Kenya&apos;s cars, homes and buildings. Measured on site, fabricated to spec, fitted
            by people who do this every day.
          </p>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:gap-3.5">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-red min-h-[52px] px-6 text-[15px] md:min-h-[54px]"
            >
              <WhatsAppIcon />
              Quote on WhatsApp
            </a>
            <a href="#work" className="btn btn-ghost min-h-[52px] px-6 text-[15px] md:min-h-[54px]">
              See our work
            </a>
          </div>
          <dl className="order-2 grid grid-cols-3 gap-3 border-t border-line-dark pt-4 md:flex md:gap-8 lg:order-none lg:pt-3">
            {site.stats.map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-0.5">
                <dt className="text-xs text-mist-muted md:text-[13px]">{s.label}</dt>
                <dd className="font-display text-2xl leading-tight font-bold md:text-[30px]">
                  <CountUp value={s.value} />
                  {s.suffix && <span className="text-coral">{s.suffix}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="order-1 lg:order-none lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-white/14 bg-navy lg:aspect-[4/5] lg:rounded-card">
            {heroLoop && (
              <LoopVideo
                loop={heroLoop}
                priority
                playOnPhones
                sizes="(min-width: 1280px) 490px, (min-width: 1024px) 40vw, 100vw"
                className="absolute inset-0"
              />
            )}
            <div className="absolute inset-x-3.5 bottom-3.5 flex items-center gap-3 rounded-xl border border-white/12 bg-navy-deep/90 px-3.5 py-3 lg:inset-x-5 lg:bottom-5">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-button bg-coral text-ink">
                <CheckIcon size={20} />
              </span>
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">Measured on site, every job</span>
                <span className="text-xs text-mist-muted">Written quote with spec, thickness and price</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-navy-deep pb-7 min-[880px]:bg-transparent min-[880px]:pb-10">
        <div className="shell">
          <Configurator />
        </div>
      </div>
    </section>
  );
}
