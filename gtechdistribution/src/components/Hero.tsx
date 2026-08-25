import Image from "next/image";
import { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function Hero({ dict }: { dict: Dictionary }) {
  const stats: [string, string][] = [
    [dict.hero.stat1, dict.hero.stat1Label],
    [dict.hero.stat2, dict.hero.stat2Label],
    [dict.hero.stat3, dict.hero.stat3Label],
  ];

  return (
    <section className="relative isolate overflow-hidden">
      {/* Decorative: the headline carries the meaning, so this stays out of
          the accessibility tree. priority — it is the largest paint on load. */}
      <Image
        src="/images/hero-circuit.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div className="hero-scrim absolute inset-0 -z-10" />

      <div className="max-w-[1180px] mx-auto px-6 pt-[104px] pb-[88px] md:pt-[136px] md:pb-[116px]">
        <Reveal>
          <div className="max-w-[620px]">
            <div className="font-mono text-xs tracking-[0.14em] uppercase text-accent mb-5">
              {dict.hero.eyebrow}
            </div>
            <h1 className="font-display font-bold text-[38px] md:text-[52px] leading-[1.08] tracking-tight mb-5">
              {dict.hero.title}
            </h1>
            <p className="text-inkSoft text-base md:text-[17px] leading-relaxed max-w-[520px] mb-9">
              {dict.hero.sub}
            </p>
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href="#products-teaser"
                className="cta-btn bg-accent text-bg rounded-md px-[22px] py-[13px] text-sm font-semibold"
              >
                {dict.cta.viewProducts}
              </a>
              <a
                href="../contact"
                className="cta-btn bg-bg/40 backdrop-blur border border-line hover:border-accent text-ink rounded-md px-[22px] py-[13px] text-sm font-semibold"
              >
                {dict.cta.quote}
              </a>
            </div>
            <div className="flex flex-wrap gap-x-10 gap-y-5 border-t border-line pt-6">
              {stats.map(([v, l], i) => (
                <div key={i}>
                  <div className="font-mono font-medium text-[15px] text-accent">{v}</div>
                  <div className="text-xs text-inkSoft mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
