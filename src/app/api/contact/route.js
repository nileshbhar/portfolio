import { NextResponse } from "next/server";

// Contact form endpoint.
// Sends through Resend (https://resend.com) using plain fetch, so no SDK is
// needed. When RESEND_API_KEY or CONTACT_TO_EMAIL is missing it returns 503
// with { configured: false } and the form falls back to a pre-filled email.

const MIN_FILL_MS = 3000; // humans take longer than this to fill the form
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

// Light per-instance rate limit (serverless instances are short-lived, so this
// only blunts bursts; add a hosted limiter if spam becomes a problem).
const hits = new Map();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const { name = "", email = "", subject = "", message = "", company = "", startedAt = 0 } = body || {};

  // Spam checks: honeypot field and minimum fill time. Pretend success so bots
  // don't learn which check caught them.
  if (company || (startedAt && Date.now() - Number(startedAt) < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const data = {
    name: String(name).trim(),
    email: String(email).trim(),
    subject: String(subject).trim(),
    message: String(message).trim(),
  };

  if (
    !data.name ||
    !data.subject ||
    data.message.length < 10 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) ||
    Object.entries(LIMITS).some(([k, max]) => data[k].length > max)
  ) {
    return NextResponse.json({ ok: false, error: "Please check the form fields and try again." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  if (!apiKey || !to) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Email delivery is not configured on this site." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`,
        html: `<p><strong>Name:</strong> ${escapeHtml(data.name)}<br/><strong>Email:</strong> ${escapeHtml(
          data.email
        )}</p><p style="white-space:pre-wrap">${escapeHtml(data.message)}</p>`,
      }),
    });

    if (!res.ok) throw new Error(`Resend responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form delivery failed:", err);
    return NextResponse.json({ ok: false, error: "Your message couldn't be sent right now." }, { status: 502 });
  }
}
