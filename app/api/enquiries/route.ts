import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

export const runtime = "nodejs";

const fields = ["name", "email", "phone", "arrival", "departure", "guests", "room", "message", "source"] as const;
type EnquiryField = (typeof fields)[number];

function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
  } as Record<string, string>)[character]);
}

async function sendEnquiryEmail(enquiry: Record<EnquiryField, string>, idempotencyKey: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.ENQUIRY_RECEIVER_EMAIL;
  if (!apiKey || !from || !to) throw new Error("Email notification is not configured.");

  const row = (label: string, value: string): [string, string] => [label, value];
  const rows: Array<[string, string]> = [
    row("Name", enquiry.name), row("Email", enquiry.email),
    row("Phone", enquiry.phone), row("Arrival", enquiry.arrival), row("Departure", enquiry.departure),
    row("Guests", enquiry.guests), row("Room", enquiry.room), row("Message", enquiry.message),
    row("Source", enquiry.source),
  ].filter(([, value]) => value.length > 0);
  const text = rows.map(([label, value]) => `${label}: ${value}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;color:#172b40;max-width:640px;margin:0 auto;padding:24px"><p style="margin:0 0 6px;color:#9a6a2d;font-size:12px;letter-spacing:1px">HOTEL ORCHID BODHGAYA</p><h2 style="margin:0 0 20px;font-size:22px">New website enquiry</h2><table style="width:100%;border-collapse:collapse;border-top:1px solid #e6e0d5">${rows.map(([label, value]) =>
    `<tr><th align="left" valign="top" style="width:155px;padding:10px 12px 10px 0;border-bottom:1px solid #e6e0d5;font-size:13px">${escapeHtml(label)}</th><td style="padding:10px 0;border-bottom:1px solid #e6e0d5;font-size:14px;line-height:1.5">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`
  ).join("")}</table></div>`;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "New Website Enquiry - Hotel Orchid Bodhgaya",
      text,
      html,
      ...(enquiry.email ? { reply_to: enquiry.email } : {}),
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Resend did not accept the notification.");
}

export async function POST(request: Request) {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
  if (!scriptUrl || !process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL || !process.env.ENQUIRY_RECEIVER_EMAIL) {
    return NextResponse.json({ error: "Enquiry service is not configured." }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid enquiry data." }, { status: 400 });
  }
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return NextResponse.json({ error: "Invalid enquiry data." }, { status: 400 });
  }

  const input = body as Record<string, unknown>;
  const requestId = clean(input.requestId, 100);
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(requestId)) {
    return NextResponse.json({ error: "Invalid submission identifier. Please refresh and try again." }, { status: 400 });
  }
  if (clean(input.website, 200)) {
    // Silently accept bot submissions without forwarding them to the sheet.
    return NextResponse.json({ ok: true });
  }

  const enquiry = Object.fromEntries(fields.map((field) => [field, clean(input[field], field === "message" ? 3000 : 300)])) as Record<EnquiryField, string>;
  if (!enquiry.name || (!enquiry.email && !enquiry.phone)) {
    return NextResponse.json({ error: "Please provide your name and an email address or phone number." }, { status: 400 });
  }
  if (enquiry.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enquiry.email)) {
    return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  }
  if (enquiry.phone && !/^[0-9+()\-\s]{7,20}$/.test(enquiry.phone)) {
    return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });
  }
  if (enquiry.source === "Contact page" && !enquiry.email) {
    return NextResponse.json({ error: "Please provide your email address." }, { status: 400 });
  }
  if (enquiry.source.startsWith("Homepage") && (!enquiry.phone || !enquiry.arrival || !enquiry.guests)) {
    return NextResponse.json({ error: "Please provide your phone number, arrival date, and number of guests." }, { status: 400 });
  }
  if (enquiry.source === "Homepage booking form" && !enquiry.departure) {
    return NextResponse.json({ error: "Please provide your departure date." }, { status: 400 });
  }
  if (enquiry.arrival && !isValidDate(enquiry.arrival)) {
    return NextResponse.json({ error: "Please provide a valid arrival date." }, { status: 400 });
  }
  if (enquiry.departure && !isValidDate(enquiry.departure)) {
    return NextResponse.json({ error: "Please provide a valid departure date." }, { status: 400 });
  }
  if (enquiry.arrival && enquiry.departure && enquiry.departure < enquiry.arrival) {
    return NextResponse.json({ error: "Departure date must be after arrival date." }, { status: 400 });
  }
  enquiry.source ||= "Website enquiry";
  const submittedAt = new Date().toISOString();
  const idempotencyKey = createHash("sha256")
    .update(`${requestId}:${JSON.stringify(enquiry)}`)
    .digest("hex");

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...enquiry, submittedAt, idempotencyKey }),
      cache: "no-store",
      redirect: "follow",
    });
    const result: unknown = await response.json();
    if (!response.ok || !result || typeof result !== "object" || (result as { ok?: unknown }).ok !== true) {
      console.error("Google Sheets enquiry endpoint returned an unsuccessful response.");
      return NextResponse.json({ error: "We could not save your enquiry. Please try again." }, { status: 502 });
    }

    try {
      await sendEnquiryEmail(enquiry, idempotencyKey);
    } catch {
      console.error("Enquiry was saved to Sheets, but its email notification failed.");
      return NextResponse.json({
        error: "Your enquiry was saved, but its email notification could not be sent. Please contact the hotel directly if you need immediate help.",
      }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    console.error("Google Sheets enquiry request failed.");
    return NextResponse.json({ error: "We could not confirm that your enquiry was saved. Please try again." }, { status: 502 });
  }
}
