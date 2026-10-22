import QuoteForm from "@/components/QuoteForm";
import { site } from "@/content/site";

export default function Contact() {
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
              <p className="eyebrow text-[11px] text-navy">{site.workshop.label}</p>
              <h3 className="text-xl font-semibold md:text-[22px]">{site.workshop.name}</h3>
            </div>
            <address className="flex flex-col gap-1 text-sm leading-normal text-muted not-italic">
              <span className="py-1">
                {site.workshop.street}, {site.workshop.city}
              </span>
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className="inline-flex min-h-11 items-center self-start font-semibold text-ink hover:text-red">
                  {p.display}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center self-start font-semibold text-ink hover:text-red">
                {site.email}
              </a>
              <span className="py-1">{site.hours.display}</span>
            </address>
          </div>
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
            <a href={`mailto:${site.email}`} className="text-sky underline underline-offset-2 hover:text-white">
              {site.email}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
