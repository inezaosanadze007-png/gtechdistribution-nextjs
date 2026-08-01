import { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function QualitySection({ dict }: { dict: Dictionary }) {
  return (
    <section id="quality" className="border-t border-line bg-navy text-white scroll-mt-20">
      <div className="max-w-[1180px] mx-auto px-6 py-16">
        <Reveal>
          <div className="mb-10 max-w-[560px]">
            <h2 className="font-display font-bold text-[28px] mb-2.5">{dict.quality.title}</h2>
            <p className="text-white/65 text-[15px]">{dict.quality.sub}</p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.14] rounded-lg overflow-hidden">
          {dict.quality.items.map((it, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="bg-navy px-[18px] py-6 h-full">
                <div className="font-mono text-[11px] text-copper mb-2.5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="font-display font-semibold text-[14.5px] mb-2">{it.t}</div>
                <div className="text-[13px] text-white/65 leading-relaxed">{it.d}</div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.25}>
          <div className="flex flex-wrap gap-3.5 mt-6">
            {dict.quality.certifications.map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 border border-white/[0.18] rounded-full px-4 py-2"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <circle cx="8" cy="8" r="7" fill="none" stroke="#C9862E" strokeWidth="1.4" />
                  <path
                    d="M4.5 8.2 L7 10.5 L11.5 5.5"
                    fill="none"
                    stroke="#C9862E"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="font-mono text-[12.5px]">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap items-center gap-7 mt-6 border border-white/[0.16] rounded-lg px-[22px] py-[18px]">
            <div className="font-mono text-[10.5px] text-copper tracking-[0.06em]">
              {dict.quality.sample.label}
            </div>
            <div className="font-mono text-[13px]">{dict.quality.sample.device}</div>
            <div className="font-mono text-[13px] text-white/85">{dict.quality.sample.read}</div>
            <div className="font-mono text-[13px] text-white/85">{dict.quality.sample.write}</div>
            <div className="font-mono text-[13px] text-white/85">{dict.quality.sample.health}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
