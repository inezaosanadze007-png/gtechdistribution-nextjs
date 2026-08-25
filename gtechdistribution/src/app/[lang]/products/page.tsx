import { getDictionary, Locale } from "@/lib/dictionaries";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";

export default async function ProductsPage({ params }: { params: { lang: Locale } }) {
  const dict = await getDictionary(params.lang);
  const th = dict.productsPage.tableHeaders;
  const ramTh = dict.productsPage.ram.tableHeaders;

  return (
    <div className="max-w-[1180px] mx-auto px-6 py-16">
      <Reveal>
        <div className="mb-10 max-w-[640px]">
          <h1 className="font-display font-bold text-[32px] mb-2.5">{dict.productsPage.title}</h1>
          <p className="text-inkSoft text-[15px]">{dict.productsPage.sub}</p>
        </div>
      </Reveal>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-14">
        {dict.products.items.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <ProductCard product={p} quoteLabel={dict.products.quote} />
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="overflow-x-auto border border-line rounded-lg mb-20">
          <table className="w-full text-left border-collapse text-[13px] min-w-[720px]">
            <thead>
              <tr className="bg-navy text-white">
                {[th.model, th.interface, th.controller, th.flash, th.capacity, th.read, th.write, th.temp, th.size].map(
                  (h) => (
                    <th key={h} className="px-4 py-3 font-display font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="font-mono">
              {dict.products.items.map((p, i) => {
                const [read, write] = p.perf.split(" / ");
                return (
                  <tr key={p.id} className={i % 2 === 0 ? "bg-surface" : "bg-bg"}>
                    <td className="px-4 py-3 whitespace-nowrap font-display font-medium">{p.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.iface}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.controller}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.flash}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.capacity}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{read}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{write}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.temp}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{p.size}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>

      <Reveal>
        <div className="mb-10 max-w-[640px]">
          <h2 className="font-display font-bold text-[26px] mb-2.5">{dict.productsPage.ramTitle}</h2>
          <p className="text-inkSoft text-[15px]">{dict.productsPage.ramSub}</p>
        </div>
      </Reveal>

      <Reveal>
        <div className="overflow-x-auto border border-line rounded-lg">
          <table className="w-full text-left border-collapse text-[13px] min-w-[640px]">
            <thead>
              <tr className="bg-navy text-white">
                {[ramTh.model, ramTh.capacity, ramTh.frequency, ramTh.voltage, ramTh.temp, ramTh.size].map((h) => (
                  <th key={h} className="px-4 py-3 font-display font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-mono">
              {dict.productsPage.ram.items.map((r, i) => (
                <tr key={r.model} className={i % 2 === 0 ? "bg-surface" : "bg-bg"}>
                  <td className="px-4 py-3 whitespace-nowrap font-display font-medium">{r.model}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.capacity}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.frequency}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.voltage}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.temp}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{r.size}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  );
}
