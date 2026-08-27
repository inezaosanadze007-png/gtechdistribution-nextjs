"use client";

import { useState, FormEvent } from "react";
import { Dictionary, Locale } from "@/lib/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

// Quote requests go straight from the visitor's browser to Web3Forms, which
// forwards them to the inbox the access key was issued to. This has to be a
// client-side call: Web3Forms rejects server-to-server submissions on the free
// plan ("Use our API in client side..."), so routing it through our own API
// route fails with a 403 no matter how the key is configured.
//
// The access key is public by design — Web3Forms' own docs put it in a hidden
// input in the page HTML. It only lets someone send mail TO this inbox, never
// read anything. It lives in NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY rather than in
// the source so it stays out of git history, which is permanent.
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function ContactForm({
  form,
  productOptions,
  initialProduct = "",
  lang,
}: {
  form: Dictionary["contactPage"]["form"];
  productOptions: { id: string; name: string }[];
  initialProduct?: string;
  lang: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ACCESS_KEY) {
      // A misconfigured deploy must not look like a delivered request.
      console.error("Contact form not configured: NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is required.");
      setStatus("error");
      return;
    }

    setStatus("submitting");

    const data = new FormData(e.currentTarget);
    const selectedId = String(data.get("productInterest") ?? "");
    const name = String(data.get("name") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Quote request — ${name}${company ? ` (${company})` : ""}`,
          from_name: "GTechDistribution website",
          // So a reply from Outlook goes straight back to the person asking.
          replyto: data.get("email"),
          botcheck: data.get("botcheck") ? true : false,
          Name: name,
          Email: data.get("email"),
          Company: company || "—",
          // Send the product name — it is what the recipient actually reads.
          Product: productOptions.find((p) => p.id === selectedId)?.name ?? "—",
          Language: lang,
          Message: String(data.get("message") ?? "").trim() || "—",
        }),
      });

      // Web3Forms answers 200 with {success: false} for a rejected submission,
      // so the body has to be checked too — response.ok alone lets it through.
      const result = (await response.json().catch(() => null)) as {
        success?: boolean;
        message?: string;
      } | null;

      if (!response.ok || !result?.success) {
        console.error(`Web3Forms rejected the message (${response.status}): ${result?.message ?? "no response body"}`);
        setStatus("error");
        return;
      }

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
      {/* Honeypot: hidden from people, filled in by bots. Web3Forms discards any
          submission where botcheck is set, which keeps spam off the free plan's
          250-a-month allowance. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: "none" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="name">
            {form.name}
          </label>
          <input
            id="name"
            name="name"
            required
            className="w-full border border-field rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
          />
        </div>
        <div>
          <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="company">
            {form.company}
          </label>
          <input
            id="company"
            name="company"
            className="w-full border border-field rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
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
          className="w-full border border-field rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
        />
      </div>

      <div>
        <label className="block text-[12.5px] text-inkSoft mb-1.5" htmlFor="productInterest">
          {form.productInterest}
        </label>
        <select
          id="productInterest"
          name="productInterest"
          defaultValue={initialProduct}
          className="w-full border border-field rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
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
          className="w-full border border-field rounded-md px-3.5 py-2.5 text-[14px] bg-surface"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-[13.5px] text-alert">
          {form.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="cta-btn bg-accent text-ink rounded-md px-7 py-3 text-sm font-semibold disabled:opacity-60"
      >
        {status === "submitting" ? form.submitting : form.submit}
      </button>
    </form>
  );
}
