import { getDictionary, Locale } from "@/lib/dictionaries";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: { product?: string };
}) {
  const dict = await getDictionary(params.lang);
  const productOptions = dict.products.items.map((p) => ({ id: p.id, name: p.name }));

  // ?product= comes from the quote buttons on the product cards. Ignore an id
  // that no longer matches a product so the form falls back to the placeholder.
  const requested = searchParams?.product ?? "";
  const initialProduct = productOptions.some((p) => p.id === requested) ? requested : "";

  return (
    <div className="max-w-[1000px] mx-auto px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-[560px]">
          <h1 className="font-display font-bold text-[32px] mb-2.5">{dict.contactPage.title}</h1>
          <p className="text-inkSoft text-[15px]">{dict.contactPage.sub}</p>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-[1.4fr_1fr] gap-12">
        <Reveal delay={0.1}>
          <ContactForm
            form={dict.contactPage.form}
            productOptions={productOptions}
            initialProduct={initialProduct}
            lang={params.lang}
          />
        </Reveal>

        <Reveal delay={0.15}>
          <div className="border-l-2 border-accent pl-5">
            <div className="font-display font-semibold text-[15px] mb-3">
              {dict.contactPage.details.title}
            </div>
            <div className="font-mono text-[13px] text-inkSoft space-y-2">
              <div>{dict.contactPage.details.email}</div>
              <div>{dict.contactPage.details.phone}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
