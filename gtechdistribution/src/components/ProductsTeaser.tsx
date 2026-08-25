import { Dictionary, Locale } from "@/lib/dictionaries";
import Reveal from "./Reveal";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function ProductsTeaser({ dict, lang }: { dict: Dictionary; lang: Locale }) {
  return (
    <section id="products-teaser" className="max-w-[1180px] mx-auto px-6 py-16 scroll-mt-20">
      <Reveal>
        <div className="mb-10 max-w-[560px]">
          <h2 className={`font-display font-bold text-[28px] ${dict.products.sub ? "mb-2.5" : ""}`}>{dict.products.title}</h2>
          {dict.products.sub ? <p className="text-inkSoft text-[15px]">{dict.products.sub}</p> : null}
        </div>
      </Reveal>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {dict.products.items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <ProductCard product={p} specLabel={dict.products.spec} quoteLabel={dict.products.quote} />
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.2}>
        <div className="mt-6 border-l-2 border-copper pl-3.5 text-[13px] text-inkSoft">
          {dict.products.ramNote}
        </div>
      </Reveal>
      <Reveal delay={0.25}>
        <Link
          href={`/${lang}/products`}
          className="inline-block mt-6 font-mono text-[13px] text-navy border-b border-navy"
        >
          {dict.nav.products} →
        </Link>
      </Reveal>
    </section>
  );
}
