import { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function IndustriesSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="industries" className="max-w-[1180px] mx-auto px-6 py-16 scroll-mt-20">
      <Reveal>
        <h2 className="font-display font-bold text-[28px] mb-8">{dict.industries.title}</h2>
      </Reveal>
      <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-4">
        {dict.industries.items.map((it, i) => (
          <Reveal key={i} delay={i * 0.06}>
            <div className="border-l-2 border-copper pl-3.5 h-full">
              <div className="font-display font-semibold text-[14.5px] mb-1.5">{it.t}</div>
              <div className="text-[12.5px] text-inkSoft leading-snug">{it.d}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
