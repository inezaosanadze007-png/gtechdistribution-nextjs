import Link from "next/link";
import { Dictionary, Locale } from "@/lib/dictionaries";

type Product = Dictionary["products"]["items"][number];

export default function ProductCard({
  product,
  quoteLabel,
  lang,
}: {
  product: Product;
  quoteLabel: string;
  lang: Locale;
}) {
  return (
    <div className="hover-lift border border-line rounded-lg bg-surface overflow-hidden h-full flex flex-col">
      <div className="px-[18px] pt-6 pb-4 border-b border-line">
        <div className="inline-block font-mono text-[9.5px] text-accentText border border-accentSoft bg-accentSoft rounded px-[7px] py-[3px] mb-3">
          {product.tag}
        </div>
        <div className="font-display font-semibold text-[15.5px] mb-1">{product.name}</div>
        <div className="font-mono text-[11px] text-inkSoft">{product.iface}</div>
      </div>
      <div className="px-[18px] py-4 flex-1 flex flex-col">
        <div className="text-[11px] text-inkSoft mb-0.5">Capacity</div>
        <div className="font-mono text-[12.5px] mb-3">{product.capacity}</div>
        <div className="text-[11px] text-inkSoft mb-0.5">Performance</div>
        <div className="font-mono text-[12.5px] mb-4 leading-snug">{product.perf}</div>
        <div className="mt-auto">
          {/* The quote request opens the contact form with this product already
              chosen, so the visitor never re-picks what they just clicked. */}
          <Link
            href={`/${lang}/contact?product=${product.id}`}
            className="cta-btn block w-full text-center bg-accent text-ink rounded-md py-2 text-[11.5px] font-semibold"
          >
            {quoteLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
