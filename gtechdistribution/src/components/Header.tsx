import Link from "next/link";
import { Dictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  const navItems: { key: keyof Dictionary["nav"]; href: string }[] = [
    { key: "why", href: `/${lang}#why` },
    { key: "products", href: `/${lang}/products` },
    { key: "quality", href: `/${lang}#quality` },
    { key: "industries", href: `/${lang}#industries` },
    { key: "faq", href: `/${lang}/faq` },
    { key: "contact", href: `/${lang}/contact` },
  ];

  return (
    <header className="border-b border-line bg-bg/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1180px] mx-auto flex items-center justify-between px-6 py-[18px]">
        <Link href={`/${lang}`} className="flex items-center gap-2.5">
          <span className="relative block w-[30px] h-[30px] border-2 border-ink/70">
            <span className="absolute inset-[6px] bg-accent" />
          </span>
          <span className="font-display font-bold text-[17px] tracking-tight">
            GTech<span className="text-accent">Distribution</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-inkSoft">
          {navItems.map((item) => (
            <Link key={item.key} href={item.href} className="nav-link">
              {dict.nav[item.key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3.5">
          <LanguageSwitcher lang={lang} />
          <Link
            href={`/${lang}/contact`}
            className="cta-btn bg-accent text-bg rounded-md px-4 py-2 text-[13px] font-semibold"
          >
            {dict.cta.quote}
          </Link>
        </div>
      </div>
    </header>
  );
}
