import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/content/site";

export default function FinalCTA() {
  const phone = site.phones[0];
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
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red min-h-[54px] px-[26px] text-[15px]"
          >
            <WhatsAppIcon />
            Quote on WhatsApp
          </a>
          <a href={phone.href} className="btn btn-ghost min-h-[54px] px-[26px] text-[15px]">
            <PhoneIcon size={18} />
            Call {phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
