import QuoteForm from "@/components/QuoteForm";
import { WhatsAppIcon } from "@/components/icons";
import { lines, links, phones, quoteMessages, telHref, whatsappHref } from "@/content/links";
import { company } from "@/content/company";
import { getGoogleReviews, readAllOnGoogle } from "@/lib/googleReviews";

export default async function Contact() {
  const { count } = await getGoogleReviews();

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line bg-frost">
      <div className="shell grid gap-5 py-16 md:gap-8 md:py-24 lg:grid-cols-12">
        <div className="flex flex-col gap-5 md:gap-8 lg:col-span-6">
          <div className="reveal flex flex-col gap-3 md:gap-4">
            <p className="eyebrow text-[11px] text-navy md:text-xs">Come see us</p>
            <h2 id="contact-title" className="text-h2 font-bold">
              One workshop, <span className="text-red">one standard.</span>
            </h2>
          </div>
          <div className="reveal flex flex-col gap-4 rounded-card border border-line bg-white p-5 md:p-6">
            <div className="flex flex-col gap-1">
              <p className="eyebrow text-[11px] text-navy">{company.workshop.label}</p>
              <h3 className="text-xl font-semibold md:text-[22px]">{company.workshop.name}</h3>
            </div>
            <address className="flex flex-col gap-1 text-sm leading-normal text-muted not-italic">
              <a
                href={links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col self-start py-1 underline decoration-outline underline-offset-4 transition-colors hover:text-red hover:decoration-red"
              >
                {company.workshop.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
                <span className="sr-only">(opens in Google Maps)</span>
              </a>
              <a
                href={links.taplink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center self-start text-navy underline underline-offset-4 transition-colors hover:text-red"
              >
                Save our number and find us on social
              </a>
              <a
                href={links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center self-start text-navy underline underline-offset-4 transition-colors hover:text-red"
              >
                {readAllOnGoogle(count)}
              </a>
              <a href={`mailto:${company.email}`} className="inline-flex min-h-11 items-center self-start font-semibold text-ink hover:text-red">
                {company.email}
              </a>
              <span className="py-1">{company.hours.display}</span>
            </address>
          </div>
          {/* One row per line: call it, or message it on WhatsApp */}
          <ul
            aria-label="Phone numbers"
            className="reveal flex flex-col divide-y divide-line rounded-card border border-line bg-white"
          >
            {lines.map((line) => (
              <li key={line} className="flex items-center justify-between gap-4 px-5 py-3.5 md:px-6">
                <p className="flex min-w-0 flex-col">
                  <span className="eyebrow text-[11px] text-navy">{phones[line].short}</span>
                  <a
                    href={telHref(line)}
                    className="inline-flex min-h-11 items-center self-start text-lg font-semibold text-ink transition-colors hover:text-red"
                  >
                    {phones[line].display}
                  </a>
                </p>
                <a
                  href={whatsappHref(line, quoteMessages[line])}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`WhatsApp the ${phones[line].short.toLowerCase()} team`}
                  className="inline-flex size-11 shrink-0 items-center justify-center rounded-full border border-outline text-navy transition-colors hover:border-red hover:bg-red hover:text-white"
                >
                  <WhatsAppIcon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="reveal on-dark flex flex-col gap-6 rounded-card bg-navy-deep p-6 text-white md:rounded-panel md:p-10 lg:col-span-6">
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-bold tracking-[-0.01em] md:text-[32px]">Get a measured quote</h3>
            <p className="text-sm text-mist md:text-base">
              Send us the job: a photo, rough sizes, your location. We come back with a written quote. Fastest reply is
              on WhatsApp.
            </p>
          </div>
          <QuoteForm />
          <p className="text-[13px] text-mist-muted">
            Typical response within a couple of hours on business days. Or email{" "}
            <a href={`mailto:${company.email}`} className="text-sky underline underline-offset-2 hover:text-white">
              {company.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
