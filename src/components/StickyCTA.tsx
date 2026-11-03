import QuoteChooser from "@/components/QuoteChooser";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { phones, telHref } from "@/content/links";

// Floating WhatsApp button from tablet up; a two-button bar pinned to the
// bottom of the screen on phones. Both WhatsApp buttons ask which quote: the
// floating one opens the choice above itself, the bar a sheet across its width.
export default function StickyCTA() {
  return (
    <aside aria-label="Quick contact">
      <div className="fixed right-6 bottom-6 z-30 hidden md:block">
        <QuoteChooser
          placement="above-end"
          label="Get a quote on WhatsApp"
          buttonClassName="btn-red inline-flex size-14 cursor-pointer items-center justify-center rounded-full shadow-[0_12px_30px_rgb(0_0_0/0.3)]"
        >
          <WhatsAppIcon size={26} />
        </QuoteChooser>
      </div>

      <div className="on-dark fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2.5 border-t border-white/10 bg-navy-deep/94 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[14px] md:hidden">
        <a href={telHref("architectural")} className="btn btn-ghost">
          <PhoneIcon size={16} />
          <span className="sr-only">{phones.architectural.label}: </span>
          Call now
        </a>
        <QuoteChooser placement="sheet" buttonClassName="btn btn-red w-full px-3">
          <WhatsAppIcon size={16} />
          WhatsApp quote
        </QuoteChooser>
      </div>
    </aside>
  );
}
