import { NextRequest, NextResponse } from "next/server";

// Quote requests are delivered by email through Resend. Called with fetch
// rather than an SDK so the project stays dependency-free.
//
// This runs server-side on purpose: the API key is a real secret, unlike the
// public key of the form-relay service used previously. That service was
// dropped because it mangled non-ASCII — Georgian arrived as "???" — which is
// fatal for a site whose primary language is Georgian.
//
// Required environment variable:
//   RESEND_API_KEY — from https://resend.com (Settings -> API Keys).
// Optional overrides:
//   QUOTE_FROM_EMAIL — sender; must be on a domain verified in Resend.
//   QUOTE_TO_EMAIL   — where quote requests land.

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.QUOTE_FROM_EMAIL || "GTechDistribution <quotes@mygeotech.online>";
const TO = process.env.QUOTE_TO_EMAIL || "Gtech.distribution@outlook.com";

/** Single-line field: collapse newlines so they can't be smuggled into the subject. */
function line(value: unknown, maxLength = 200): string {
  if (typeof value !== "string") return "";
  return value.replace(/[\r\n]+/g, " ").trim().slice(0, maxLength);
}

/** Multi-line field: keep the author's line breaks, just bound the length. */
function block(value: unknown, maxLength = 5000): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

/** The submitted values land in an HTML email, so they must not be able to carry markup. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    // Fail loudly in the server log, quietly to the visitor — a misconfigured
    // deploy must not look like a delivered request.
    console.error("Contact form not configured: RESEND_API_KEY is required.");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;

  // Honeypot: only a bot fills this in. Answer as if it were delivered so the
  // sender learns nothing, but send no mail.
  if (body.botcheck) return NextResponse.json({ ok: true });

  const name = line(body.name, 120);
  const email = line(body.email, 200);
  const company = line(body.company, 120);
  const productInterest = line(body.productInterest, 120);
  const message = block(body.message);
  const locale = line(body.locale, 5) || "ka";

  if (!name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const rows: [string, string][] = [
    ["Name", name],
    ["Email", email],
    ["Company", company || "—"],
    ["Product", productInterest || "—"],
    ["Language", locale],
  ];

  const html = `<!doctype html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0a1526;">
  <h2 style="margin:0 0 16px;font-size:18px;">Quote request from the website</h2>
  <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;font-size:14px;">
    ${rows
      .map(
        ([label, value]) =>
          `<tr><td style="padding:4px 16px 4px 0;color:#5b6879;">${label}</td><td style="padding:4px 0;">${escapeHtml(
            value
          )}</td></tr>`
      )
      .join("\n    ")}
  </table>
  <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e2e6ec;font-size:14px;white-space:pre-wrap;">${escapeHtml(
    message || "—"
  )}</div>
</body></html>`;

  const text = [...rows.map(([label, value]) => `${label}: ${value}`), "", message || "—"].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: TO,
        subject: `Quote request — ${name}${company ? ` (${company})` : ""}`,
        // So a reply from Outlook goes straight back to the person asking.
        reply_to: email,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error(`Resend rejected the message (${response.status}): ${detail || "no response body"}`);
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Could not reach Resend:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
