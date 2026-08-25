"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales, Locale } from "@/lib/dictionaries";

export default function LanguageSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(next: Locale) {
    if (!pathname) return;
    const segments = pathname.split("/");
    segments[1] = next;
    router.push(segments.join("/") || `/${next}`);
  }

  return (
    <div className="flex border border-line rounded-md overflow-hidden font-mono text-xs">
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          className={`px-2.5 py-1.5 ${
            lang === l ? "bg-accent text-ink" : "text-inkSoft"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
