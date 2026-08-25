"use client";

import { useState } from "react";
import { Dictionary } from "@/lib/dictionaries";

export default function FaqAccordion({ items }: { items: Dictionary["faq"]["items"] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="border-b border-line">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left py-5 gap-4"
            >
              <span className="font-display font-semibold text-[15.5px]">{item.q}</span>
              <span
                className="font-mono text-accentText text-lg leading-none shrink-0 transition-transform"
                style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
              >
                +
              </span>
            </button>
            <div
              className="overflow-hidden transition-[max-height] duration-300"
              style={{ maxHeight: isOpen ? "240px" : "0px" }}
            >
              <p className="text-inkSoft text-[14px] leading-relaxed pb-5 max-w-[680px]">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
