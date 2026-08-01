import { Dictionary } from "@/lib/dictionaries";
import Reveal from "./Reveal";

export default function Hero({ dict }: { dict: Dictionary }) {
  const stats: [string, string][] = [
    [dict.hero.stat1, dict.hero.stat1Label],
    [dict.hero.stat2, dict.hero.stat2Label],
    [dict.hero.stat3, dict.hero.stat3Label],
  ];

  return (
    <section className="max-w-[1180px] mx-auto px-6 pt-[72px] pb-14">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div>
            <div className="font-mono text-xs tracking-[0.08em] text-copper mb-4">
              {dict.hero.eyebrow}
            </div>
            <h1 className="font-display font-bold text-[38px] md:text-[44px] leading-[1.12] tracking-tight mb-5">
              {dict.hero.title}
            </h1>
            <p className="text-inkSoft text-base leading-relaxed max-w-[480px] mb-8">
              {dict.hero.sub}
            </p>
            <div className="flex gap-3 mb-11">
              <a
                href="#products-teaser"
                className="cta-btn bg-navy text-white rounded-md px-[22px] py-[13px] text-sm font-semibold"
              >
                {dict.cta.viewProducts}
              </a>
              <a
                href="../contact"
                className="cta-btn bg-transparent border border-line rounded-md px-[22px] py-[13px] text-sm font-semibold"
              >
                {dict.cta.quote}
              </a>
            </div>
            <div className="flex gap-8 border-t border-line pt-6">
              {stats.map(([v, l], i) => (
                <div key={i}>
                  <div className="font-mono font-medium text-[15px] text-navy">{v}</div>
                  <div className="text-xs text-inkSoft mt-0.5">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <svg viewBox="0 0 420 340" className="w-full h-auto">
            <rect x="60" y="90" width="300" height="160" rx="6" fill="#FFFFFF" stroke="#E2E5EA" strokeWidth="1.5" />
            <rect x="80" y="115" width="120" height="14" rx="2" fill="#1B2A41" opacity="0.9" />
            <rect x="80" y="140" width="80" height="8" rx="2" fill="#E2E5EA" />
            <rect x="80" y="155" width="100" height="8" rx="2" fill="#E2E5EA" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect
                key={i}
                x={220 + i * 12}
                y="115"
                width="6"
                height="40"
                fill={i % 2 === 0 ? "#C9862E" : "#1B2A41"}
                opacity="0.85"
              />
            ))}
            <line x1="80" y1="190" x2="340" y2="190" className="trace-line" />
            <line x1="80" y1="205" x2="300" y2="205" className="trace-line" />
            <line x1="80" y1="220" x2="320" y2="220" className="trace-line" />
            <circle cx="340" cy="190" r="3" className="trace-dot" />
            <circle cx="300" cy="205" r="3" className="trace-dot" />
            <circle cx="320" cy="220" r="3" className="trace-dot" />
            <text x="80" y="238" fontFamily="IBM Plex Mono" fontSize="9" fill="#4A5568">
              NVMe · PCIe Gen4 x4 · 4TB
            </text>
            <line x1="60" y1="90" x2="20" y2="60" className="trace-line" />
            <line x1="360" y1="90" x2="400" y2="60" className="trace-line" />
            <circle cx="20" cy="60" r="3" className="trace-dot" />
            <circle cx="400" cy="60" r="3" className="trace-dot" />
          </svg>
        </Reveal>
      </div>
    </section>
  );
}
