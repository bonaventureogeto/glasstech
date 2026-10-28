import Image from "next/image";
import Link from "next/link";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  SnapchatIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from "@/components/icons";
import { links, socials, type Social } from "@/content/links";
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

const socialIcons = {
  tiktok: TikTokIcon,
  snapchat: SnapchatIcon,
  facebook: FacebookIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
} satisfies Record<Social, unknown>;

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
            <div className="flex flex-col gap-1">
              {/* One row at every width: below 344px the 44px buttons narrow instead of wrapping. */}
              <ul className="flex gap-1.5 sm:gap-2.5">
                {(Object.keys(socials) as Social[]).map((key) => {
                  const Icon = socialIcons[key];
                  return (
                    <li key={key} className="min-w-0 flex-[0_1_44px]">
                      <a
                        href={socials[key].href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Glasstech on ${socials[key].label}`}
                        className="flex h-11 w-full items-center justify-center rounded-button border border-white/16 text-mist transition-colors hover:border-white hover:text-white"
                      >
                        <Icon />
                      </a>
                    </li>
                  );
                })}
              </ul>
              <a
                href={links.taplink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center self-start text-[13px] text-mist underline underline-offset-4 transition-colors hover:text-white"
              >
                All our links and contacts
              </a>
            </div>
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
              <a
                href={links.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 leading-normal text-mist transition-colors hover:text-white"
              >
                {site.workshop.lines[0]}
                <br />
                {site.workshop.lines.slice(1).join(", ")}
                <span className="sr-only"> (opens in Google Maps)</span>
              </a>
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
