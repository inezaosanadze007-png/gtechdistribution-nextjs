import { getDictionary, Locale } from "@/lib/dictionaries";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import ProductsTeaser from "@/components/ProductsTeaser";
import QualitySection from "@/components/QualitySection";
import IndustriesSection from "@/components/IndustriesSection";
import ContactCTA from "@/components/ContactCTA";

export default async function HomePage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);

  return (
    <>
      <Hero dict={dict} />
      <WhyUs dict={dict} />
      <ProductsTeaser dict={dict} lang={params.lang} />
      <QualitySection dict={dict} />
      <IndustriesSection dict={dict} />
      <ContactCTA dict={dict} lang={params.lang} />
    </>
  );
}
