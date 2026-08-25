import Link from "next/link";
import { Dictionary, Locale } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function ContactCTA({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section className="border-t border-line bg-surface">
      <div className="max-w-[720px] mx-auto px-6 py-[72px] text-center">
        <Reveal>
          <h2 className="font-display font-bold text-[28px] mb-2.5">{dict.contact.title}</h2>
          <p className="text-inkSoft text-[15px] mb-7">{dict.contact.sub}</p>
          <Link
            href={`/${lang}/contact`}
            className="cta-btn inline-block bg-accent text-bg rounded-md px-7 py-[13px] text-sm font-semibold"
          >
            {dict.contact.button}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
