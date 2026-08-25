import { NextRequest, NextResponse } from "next/server";

// Quote requests from the contact form are delivered through Web3Forms, which
// forwards them to the inbox that the access key was issued to. Called with
// fetch rather than an SDK so the project stays dependency-free.
//
// Required environment variable:
//   WEB3FORMS_ACCESS_KEY — get one at https://web3forms.com by entering
//                          Gtech.distribution@outlook.com; the key arrives by
//                          email. The recipient is fixed to that address, so
//                          there is nothing else to configure.

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
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
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    // Fail loudly in the server log, quietly to the visitor — a misconfigured
    // deploy must not look like a delivered request.
    console.error("Contact form not configured: WEB3FORMS_ACCESS_KEY is required.");
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

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Quote request — ${name}${company ? ` (${company})` : ""}`,
        from_name: "GTechDistribution website",
        // So a reply from Outlook goes straight back to the person asking.
        replyto: email,
        Name: name,
        Email: email,
        Company: company || "—",
        Product: productInterest || "—",
        Language: locale,
        Message: message || "—",
      }),
    });

    // Web3Forms answers 200 with {success: false} for a bad key, so the body
    // has to be checked too — response.ok alone would let failures through.
    const result = (await response.json().catch(() => null)) as {
      success?: boolean;
      message?: string;
    } | null;

    if (!response.ok || !result?.success) {
      console.error(
        `Web3Forms rejected the message (${response.status}): ${
          result?.message ?? "no response body"
        }`
      );
      return NextResponse.json({ error: "send_failed" }, { status: 502 });
    }
  } catch (error) {
    console.error("Could not reach Web3Forms:", error);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
