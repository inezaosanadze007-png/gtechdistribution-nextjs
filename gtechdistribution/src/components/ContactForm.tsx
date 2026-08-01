"use client";

import { useState, FormEvent } from "react";
import { Dictionary } from "@/lib/dictionaries";

type Status = "idle" | "submitting" | "success";

export default function ContactForm({
  form,
  productOptions,
}: {
  form: Dictionary["contactPage"]["form"];
  productOptions: { id: string; name: string }[];
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    // NOTE: this is a front-end-only placeholder. Wire this up to a real
    // endpoint (e.g. an API route that sends email, or a service like
    // Formspree / Resend) before going live.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("success");
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
