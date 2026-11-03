import QuoteChooser from "@/components/QuoteChooser";
import { ChevronDownIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { phones, telHref } from "@/content/links";

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="mull on-dark text-white">
      <div className="shell flex flex-col items-center gap-6 py-20 text-center md:py-28">
        <p className="eyebrow reveal text-[11px] text-sky md:text-xs">Ready when you are</p>
        <h2 id="cta-title" className="reveal max-w-[820px] text-cta font-bold">
          Let&apos;s get your <span className="text-coral">glass</span> sorted.
        </h2>
        <p className="reveal max-w-[560px] text-base text-mist md:text-lg">
          Windshield, shower screen or an entire facade. Same measured, professional job every time.
        </p>
        <div className="reveal flex w-full flex-col justify-center gap-3 pt-2 sm:w-auto sm:flex-row sm:gap-3.5">
          <QuoteChooser
            placement="below-center"
            buttonClassName="btn btn-red min-h-[54px] w-full px-[26px] text-[15px] sm:w-auto"
          >
            <WhatsAppIcon />
            Quote on WhatsApp
            <ChevronDownIcon size={16} className="transition-transform group-open:rotate-180" />
          </QuoteChooser>
          <a href={telHref("architectural")} className="btn btn-ghost min-h-[54px] px-[26px] text-[15px]">
            <PhoneIcon size={18} />
            <span className="sr-only">{phones.architectural.label}: </span>
            Call {phones.architectural.display}
          </a>
        </div>
        <p className="reveal text-sm text-mist">
          {phones.automotive.label}:{" "}
          <a href={telHref("automotive")} className="font-semibold text-white underline underline-offset-4 hover:text-sky">
            {phones.automotive.display}
          </a>
        </p>
      </div>
    </section>
  );
}
