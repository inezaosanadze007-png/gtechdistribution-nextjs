"use client";

import { useState, FormEvent } from "react";
import { Dictionary, Locale } from "@/lib/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({
  form,
  productOptions,
  lang,
}: {
  form: Dictionary["contactPage"]["form"];
  productOptions: { id: string; name: string }[];
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const data = new FormData(e.currentTarget);
    const selectedId = String(data.get("productInterest") ?? "");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          // Send the product name — it is what the recipient actually reads.
          productInterest:
            productOptions.find((p) => p.id === selectedId)?.name ?? "",
          message: data.get("message"),
          locale: lang,
        }),
      });

      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-line rounded-lg px-6 py-8 bg-surface text-[15px] text-ink">
        {form.success}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="name">
            {form.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full border border-line rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
          />
        </div>
        <div>
          <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="company">
            {form.company}
          </label>
          <input
            id="company"
            name="company"
            className="w-full border border-line rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
          />
        </div>
      </div>

      <div>
        <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="email">
          {form.email}
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
        />
      </div>

      <div>
        <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="productInterest">
          {form.productInterest}
        </label>
        <select
          id="productInterest"
          name="productInterest"
          defaultValue=""
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
        >
          <option value="" disabled>
            {form.productInterestPlaceholder}
          </option>
          {productOptions.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="message">
          {form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={form.messagePlaceholder}
          className="w-full border border-line rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-[13.5px] text-copper">
          {form.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-btn bg-navy text-white rounded-md px-7 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? form.submitting : form.submit}
      </button>
    </form>
  );
}
