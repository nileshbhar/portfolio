import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Contact form endpoint. Nothing is stored: each valid submission is sent as
// an email to CONTACT_TO_EMAIL through SMTP (Gmail by default). Replying to
// the email replies to the visitor.
//
// Required environment variables (see .env.example):
//   SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL
// Optional: SMTP_HOST (default smtp.gmail.com), SMTP_PORT (default 465),
//           SMTP_SECURE (default true when port is 465)
//
// If they're missing, the API answers { configured: false } and the form
// offers a pre-filled email link instead, so it never pretends to send.

export const runtime = "nodejs";

const MIN_FILL_MS = 3000; // humans take longer than this to fill the form
const LIMITS = { name: 100, email: 200, subject: 150, message: 5000 };

// Light per-instance rate limit. Serverless instances are short-lived, so this
// only blunts bursts.
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

// Strip line breaks from anything that ends up in a mail header.
function oneLine(s) {
  return s.replace(/[\r\n]+/g, " ").trim();
}

let transporter;
function getTransporter() {
  if (transporter) return transporter;
  const port = Number(process.env.SMTP_PORT || 465);
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  return transporter;
}

function buildEmail({ name, email, subject, message }, meta) {
  const rows = [
    ["Name", escapeHtml(name)],
    ["Email", `<a href="mailto:${escapeHtml(email)}" style="color:#111111;">${escapeHtml(email)}</a>`],
    ["Subject", escapeHtml(subject)],
    ["Sent", escapeHtml(meta.sentAt)],
  ];

  const html = `<!doctype html>
<html>
  <body style="margin:0;padding:24px;background:#f8f8f8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #eaeaea;border-radius:14px;">
      <tr>
        <td style="padding:28px 32px 8px;">
          <p style="margin:0;font-family:ui-monospace,Menlo,monospace;font-size:12px;letter-spacing:1px;color:#777777;">NEW MESSAGE FROM YOUR PORTFOLIO</p>
          <h1 style="margin:10px 0 0;font-size:22px;line-height:1.3;">${escapeHtml(subject)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #eaeaea;">
            ${rows
              .map(
                ([label, value]) => `<tr>
              <td style="padding:10px 0;border-bottom:1px solid #eaeaea;width:90px;font-size:13px;color:#737373;vertical-align:top;">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid #eaeaea;font-size:14px;">${value}</td>
            </tr>`
              )
              .join("")}
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 28px;">
          <p style="margin:0 0 8px;font-size:13px;color:#737373;">Message</p>
          <div style="font-size:15px;line-height:1.65;white-space:pre-wrap;background:#f8f8f8;border-radius:10px;padding:16px 18px;">${escapeHtml(message)}</div>
          <p style="margin:20px 0 0;font-size:12px;color:#999999;">Reply to this email to respond to ${escapeHtml(name)} directly.</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = `New message from your portfolio

Name: ${name}
Email: ${email}
Subject: ${subject}
Sent: ${meta.sentAt}

${message}
`;

  return { html, text };
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
    name: oneLine(String(name)),
    email: oneLine(String(email)),
    subject: oneLine(String(subject)),
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

  const { SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_USER || !SMTP_PASS || !CONTACT_TO_EMAIL) {
    return NextResponse.json(
      { ok: false, configured: false, error: "Email delivery is not configured on this site." },
      { status: 503 }
    );
  }

  const sentAt = new Date().toUTCString();
  const { html, text } = buildEmail(data, { sentAt });

  try {
    await getTransporter().sendMail({
      // Gmail only sends from the authenticated account, so the visitor goes
      // in the display name and Reply-To.
      from: { name: `${data.name} via Portfolio`, address: process.env.CONTACT_FROM_EMAIL || SMTP_USER },
      to: CONTACT_TO_EMAIL,
      replyTo: { name: data.name, address: data.email },
      subject: `[Portfolio] ${data.subject}`,
      text,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form delivery failed:", err?.message || err);
    return NextResponse.json({ ok: false, error: "Your message couldn't be sent right now." }, { status: 502 });
  }
}
