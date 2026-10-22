import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { site, whatsappLink } from "@/content/site";

// Floating WhatsApp button from tablet up; a two-button bar pinned to the
// bottom of the screen on phones.
export default function StickyCTA() {
  return (
    <aside aria-label="Quick contact">
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Glasstech on WhatsApp"
        className="btn-red fixed right-6 bottom-6 z-30 hidden size-14 items-center justify-center rounded-full shadow-[0_12px_30px_rgb(0_0_0/0.3)] md:inline-flex"
      >
        <WhatsAppIcon size={26} />
      </a>

      <div className="on-dark fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2.5 border-t border-white/10 bg-navy-deep/94 px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur-[14px] md:hidden">
        <a href={site.phones[0].href} className="btn btn-ghost">
          <PhoneIcon size={16} />
          Call now
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-red">
          <WhatsAppIcon size={16} />
          WhatsApp quote
        </a>
      </div>
    </aside>
  );
}
