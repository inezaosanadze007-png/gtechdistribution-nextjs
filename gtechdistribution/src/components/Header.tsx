"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { key: keyof Dictionary["nav"]; href: string }[] = [
    { key: "why", href: `/${lang}#why` },
    { key: "products", href: `/${lang}/products` },
    { key: "quality", href: `/${lang}#quality` },
    { key: "industries", href: `/${lang}#industries` },
    { key: "faq", href: `/${lang}/faq` },
    { key: "contact", href: `/${lang}/contact` },
  ];

  // Close menu on Escape key press
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between px-6 py-[18px]">
        <Link
          href={`/${lang}`}
          className="flex items-center gap-2.5 shrink-0"
          onClick={() => setIsOpen(false)}
        >
          <span className="relative block w-[30px] h-[30px] border-2 border-ink/70">
            <span className="absolute inset-[6px] bg-accent" />
          </span>
          <span className="font-display font-bold text-[17px] tracking-tight">
            GTech<span className="text-accentText">Distribution</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-inkSoft">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="nav-link">
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        {/* Right action items */}
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <LanguageSwitcher lang={lang} />
          
          <Link
            href={`/${lang}/contact`}
            className="hidden sm:inline-flex cta-btn bg-accent text-ink rounded-md px-4 py-2 text-[13px] font-semibold"
          >
            {dict.cta.quote}
          </Link>

          {/* Mobile hamburger / close button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-line text-ink hover:text-accentText hover:border-accent transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Panel */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden border-t border-line bg-bg/95 backdrop-blur px-6 py-4 flex flex-col gap-3 font-medium text-inkSoft shadow-lg"
        >
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="py-1.5 text-[15px] hover:text-accentText transition-colors"
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </nav>

          <div className="pt-3 border-t border-line/60 flex flex-col gap-2.5 sm:hidden">
            <Link
              href={`/${lang}/contact`}
              onClick={() => setIsOpen(false)}
              className="cta-btn text-center bg-accent text-ink rounded-md px-4 py-2 text-[13px] font-semibold"
            >
              {dict.cta.quote}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
