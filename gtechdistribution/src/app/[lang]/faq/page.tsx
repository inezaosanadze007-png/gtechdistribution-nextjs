import { getDictionary, Locale } from "@/lib/dictionaries";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";

export default async function FaqPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <div className="max-w-[800px] mx-auto px-6 py-16">
      <Reveal>
        <div className="mb-10">
          <h1 className="font-display font-bold text-[32px] mb-2.5">{dict.faq.title}</h1>
          <p className="text-inkSoft text-[15px]">{dict.faq.sub}</p>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <FaqAccordion items={dict.faq.items} />
      </Reveal>
    </div>
  );
}
