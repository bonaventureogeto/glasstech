import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { site } from "@/content/site";

const serviceLinks = [
  "Glass shower cubicles",
  "Office partitioning",
  "Building glass supply",
  "Balconies and railings",
  "Automotive glass",
  "Repair and maintenance",
];

const companyLinks = [
  { label: "Our work", href: "/work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const socialIcons = { Facebook: FacebookIcon, X: XIcon, Instagram: InstagramIcon, LinkedIn: LinkedInIcon };

const link = "inline-flex min-h-11 min-w-11 items-center text-mist transition-colors hover:text-white";
const heading = "eyebrow mb-1 text-[11px] text-sky";

export default function Footer() {
  return (
    <footer className="on-dark border-t border-white/8 bg-navy-deep pb-[calc(76px+env(safe-area-inset-bottom))] text-mist md:pb-0">
      <div className="shell flex flex-col gap-10 pt-10 pb-8 md:gap-12 md:pt-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-5">
            <Image
              src="/brand/logo-full-white.svg"
              alt="Glasstech and Interior Solutions Limited"
              width={150}
              height={209}
              className="h-auto w-[120px] md:w-[150px]"
            />
            <p className="max-w-[380px] text-sm text-mist-muted">
              A registered private limited company dealing in automotive and building glass across Kenya: supplied,
              fabricated and fitted.
            </p>
            <ul className="flex gap-2.5">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.label];
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Glasstech on ${s.label}`}
                      className="inline-flex size-11 items-center justify-center rounded-button border border-white/16 text-mist transition-colors hover:border-white hover:text-white"
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <nav aria-labelledby="footer-services" className="text-sm lg:col-span-2">
            <h2 id="footer-services" className={heading}>
              Services
            </h2>
            <ul>
              {serviceLinks.map((label) => (
                <li key={label}>
                  <Link href="/#services" className={link}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company" className="text-sm lg:col-span-2">
            <h2 id="footer-company" className={heading}>
              Company
            </h2>
            <ul>
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={link}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-sm sm:col-span-2 lg:col-span-3">
            <h2 className={heading}>Contact</h2>
            <address className="flex flex-col not-italic">
              <span className="py-2.5 leading-normal">
                {site.workshop.street}
                <br />
                {site.workshop.city}, {site.workshop.country}
              </span>
              {site.phones.map((p) => (
                <a key={p.href} href={p.href} className={link}>
                  {p.display}
                </a>
              ))}
              <a href={`mailto:${site.email}`} className={`${link} break-all`}>
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/8 pt-6 text-xs text-mist-muted md:flex-row md:justify-between md:gap-4">
          <p>© {new Date().getFullYear()} Glasstech &amp; Interior Solutions Limited. All rights reserved.</p>
          <p>Nairobi, Kenya · Automotive &amp; architectural glass</p>
        </div>
      </div>
    </footer>
  );
}
