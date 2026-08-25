import { NextRequest, NextResponse } from "next/server";

// Quote requests from the contact form are emailed through Resend's REST API.
// Called with fetch rather than the SDK so the project stays dependency-free.
//
// Required environment variables:
//   RESEND_API_KEY       — API key from resend.com
//   CONTACT_FROM_EMAIL   — sender, on a domain verified in Resend
//                          (e.g. "GTechDistribution <quotes@gtechdistribution.com>")
// Optional:
//   CONTACT_TO_EMAIL     — recipient; defaults to the address below

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_RECIPIENT = "Gtech.distribution@outlook.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT;

  if (!apiKey || !from) {
    // Fail loudly in the server log, quietly to the visitor — a misconfigured
    // deploy must not look like a delivered request.
    console.error(
      "Contact form not configured: RESEND_API_KEY and CONTACT_FROM_EMAIL are both required."
    );
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const body = (payload ?? {}) as Record<string, unknown>;
  const name = line(body.name, 120);
  const email = line(body.email, 200);
  const company = line(body.company, 120);
  const productInterest = line(body.productInterest, 120);
  const message = block(body.message);
  const locale = line(body.locale, 5) || "ka";

  if (!name || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  const text = [
    `Name:     ${name}`,
    `Email:    ${email}`,
    `Company:  ${company || "—"}`,
    `Product:  ${productInterest || "—"}`,
    `Language: ${locale}`,
    "",
    "Message:",
    message || "—",
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        // So a reply from Outlook goes straight back to the person asking.
        reply_to: email,
        subject: `Quote request — ${name}${company ? ` (${company})` : ""}`,
        text,
      }),
    });

    if (!response.ok) {
      console.error(
        `Resend rejected the message (${response.status}): ${await response.text()}`
      );
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Could not reach Resend:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
