import { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function WhyUs({ dict }: { dict: Dictionary }) {
  return (
    <section id="why" className="border-t border-line bg-surface scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-[560px]">
            <h2 className="font-display font-bold text-[28px] mb-2.5">{dict.why.title}</h2>
            <p className="text-inkSoft text-[15px]">{dict.why.sub}</p>
          </div>
        </Reveal>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
          {dict.why.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="hover-lift border border-line rounded-lg px-[18px] py-[22px] h-full">
                <div className="font-mono text-[11px] text-accent mb-3.5">{it.n}</div>
                <div className="font-display font-semibold text-[15px] mb-2">{it.t}</div>
                <div className="text-[13.5px] text-inkSoft leading-relaxed">{it.d}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
