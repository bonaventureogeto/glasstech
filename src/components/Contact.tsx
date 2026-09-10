"use client";

/* Icons */
const PinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" /><circle cx="12" cy="9" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
  </svg>
);
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--edge-deep)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const branches = [
  {
    name: "Mombasa Road",
    tag: "Main branch",
    address: "Piranha Centre, Mombasa Road, Nairobi",
    phones: [
      { display: "+254 714 498 682", href: "tel:+254714498682" },
      { display: "+254 726 019 644", href: "tel:+254726019644" },
    ],
    hours: "Mon\u2013Fri 8:00\u201316:30 \u00b7 Sat 8:00\u201314:00",
  },
  {
    name: "Kirinyaga Road",
    tag: "Second branch",
    address: "Kirinyaga Road, Nairobi CBD",
    phones: [{ display: "+254 726 019 644", href: "tel:+254726019644" }],
    hours: "Mon\u2013Fri 8:00\u201316:30 \u00b7 Sat 8:00\u201314:00",
  },
];

export default function Contact() {
  return (
    <section className="band" id="contact">
      <div className="inner">
        {/* Header */}
        <div className="mb-12 max-w-[600px] reveal">
          <p className="eyebrow mb-3">Come see us</p>
          <h2
            className="font-display text-[clamp(32px,5vw,52px)] leading-[1.08] mb-4"
            style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
          >
            Two branches,{" "}
            <span className="text-[var(--edge-deep)]">one standard.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 min-[820px]:grid-cols-[1fr_380px] gap-6">
          {/* Branch cards */}
          <div className="flex flex-col gap-4">
            {branches.map((b) => (
              <div
                key={b.name}
                className="group rounded-[var(--r)] p-6 transition-all duration-300 hover:-translate-y-[3px]"
                style={{
                  border: "1px solid var(--line)",
                  background: "var(--paper)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--edge)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "var(--line)";
                }}
              >
                <div className="flex items-baseline gap-3 mb-4">
                  <h3
                    className="font-display text-[20px]"
                    style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
                  >
                    {b.name}
                  </h3>
                  <span
                    className="text-[10px] font-medium tracking-[.06em] uppercase px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(8,74,119,.08)",
                      color: "var(--edge-deep)",
                    }}
                  >
                    {b.tag}
                  </span>
                </div>

                <div className="space-y-2.5 text-[14px]">
                  <div className="flex items-start gap-2.5">
                    <PinIcon />
                    <span className="text-[var(--muted)]">{b.address}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <PhoneIcon />
                    <span>
                      {b.phones.map((ph, i) => (
                        <span key={ph.href}>
                          {i > 0 && " \u00b7 "}
                          <a
                            href={ph.href}
                            className="text-[var(--ink)] no-underline hover:text-[var(--edge-deep)] transition-colors"
                          >
                            {ph.display}
                          </a>
                        </span>
                      ))}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ClockIcon />
                    <span className="text-[var(--muted)]">{b.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact card */}
          <div
            className="rounded-[var(--r)] p-8 reveal"
            data-d="2"
            style={{ background: "var(--ink)" }}
          >
            <div>
              <h3
                className="font-display text-white text-[24px] leading-snug mb-3"
                style={{ fontWeight: 700, letterSpacing: "-0.01em" }}
              >
                Get a <span className="text-[var(--edge)]">quote</span> today
              </h3>
              <p className="text-[var(--muted-2)] text-[14.5px] leading-relaxed mb-6">
                Send us the job — a photo, rough sizes, your location — and
                we&apos;ll come back with a measured quote. Fastest reply is on
                WhatsApp.
              </p>

              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/254714498682?text=Hi%20Glasstech%2C%20I%27d%20like%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-xl text-[14px] font-medium no-underline text-white transition-colors"
                  style={{ background: "var(--edge-deep)" }}
                >
                  <WhatsAppIcon />
                  Message on WhatsApp
                </a>
                <a
                  href="tel:+254714498682"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-medium no-underline text-white transition-colors"
                  style={{ border: "1px solid var(--glass-line)" }}
                >
                  Call the workshop
                </a>
                <a
                  href="mailto:hello@glasstechandinteriors.com"
                  className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-[14px] font-medium no-underline text-white transition-colors"
                  style={{ border: "1px solid var(--glass-line)" }}
                >
                  Email us
                </a>
              </div>

              <p className="text-[10px] font-medium tracking-[.06em] text-[var(--muted-2)] mt-5">
                Typical response within a couple of hours, business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
