"use client";

import { useRef } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import QuoteChooser from "@/components/QuoteChooser";
import { ChevronDownIcon, CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { company } from "@/content/company";
import { lines, phones, quoteMessages, quoteOptions, telHref, whatsappHref } from "@/content/links";

const links = [
  { label: "Work", href: "/#work" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

// The header bar has no phone number: its quote button asks which line. The
// phone menu ends with a call button for the architectural line.
const phone = phones.architectural;

export default function Nav() {
  const menu = useRef<HTMLDialogElement>(null);
  const close = () => menu.current?.close();

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/94 backdrop-blur-[14px]">
      <nav aria-label="Main" className="shell flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/#top" aria-label="Glasstech and Interior Solutions, home" className="flex min-h-11 items-center">
          <Logo />
        </Link>

        <ul className="hidden items-center gap-1 min-[920px]:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-ink transition-colors hover:text-red"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 md:gap-3">
          <QuoteChooser
            placement="below-end"
            className="max-[379px]:hidden"
            buttonClassName="btn btn-red min-h-11 gap-1.5 px-3.5 text-[13px] md:gap-2 md:px-[18px] md:text-sm"
          >
            Get a quote
            <ChevronDownIcon size={16} className="hidden transition-transform group-open:rotate-180 md:block" />
          </QuoteChooser>
          <button
            type="button"
            onClick={() => menu.current?.showModal()}
            aria-label="Open menu"
            aria-haspopup="dialog"
            className="inline-flex size-11 items-center justify-center rounded-button text-ink min-[920px]:hidden"
          >
            <MenuIcon size={22} />
          </button>
        </div>
      </nav>

      <dialog
        ref={menu}
        aria-label="Menu"
        onClick={(e) => e.target === menu.current && close()}
        className="menu-panel fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-[min(100vw,420px)] max-w-none bg-white p-0 text-ink"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <Logo compact />
            <button
              type="button"
              onClick={close}
              aria-label="Close menu"
              className="inline-flex size-11 items-center justify-center rounded-button text-ink"
            >
              <CloseIcon size={22} />
            </button>
          </div>

          <ul className="flex flex-col px-5 pt-4">
            {links.map((l) => (
              <li key={l.href} className="border-b border-line">
                <Link
                  href={l.href}
                  onClick={close}
                  className="flex min-h-14 items-center font-display text-[28px] font-semibold tracking-[-0.01em] text-ink hover:text-red"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-auto flex flex-col gap-3 px-5 pt-8 pb-[calc(24px+env(safe-area-inset-bottom))]">
            {lines.map((line) => (
              <a
                key={line}
                href={whatsappHref(line, quoteMessages[line])}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="btn btn-red min-h-[52px] text-[15px]"
              >
                <WhatsAppIcon />
                {quoteOptions[line].title}
              </a>
            ))}
            <a href={telHref("architectural")} className="btn btn-outline min-h-[52px] text-[15px]">
              <PhoneIcon size={18} />
              Call {phone.display}
            </a>
            <p className="pt-1 text-center text-[13px] text-muted">{company.hours.display}</p>
          </div>
        </div>
      </dialog>
    </header>
  );
}
