import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const MAX_LENGTHS = {
  name: 120,
  email: 180,
  phone: 40,
  company: 160,
  website: 240,
  helpType: 120,
  message: 4000,
};

function clean(value = "", max = 1000) {
  return String(value).trim().slice(0, max);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isEmail(value = "") {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function looksLikeSpam({ name, email, phone, website, helpType, message }) {
  const text = `${name} ${email} ${phone} ${website} ${helpType} ${message}`.toLowerCase();

  const obviousSpam =
    /(crypto|forex|casino|viagra|loan|backlink|seo package|telegram|whatsapp)/i.test(text);

  const tooManyLinks = (message.match(/https?:\/\//gi) || []).length > 2;

  return obviousSpam || tooManyLinks;
}

function getAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || process.env.ALLOWED_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
}

export default async function handler(req, res) {
  // No cookies are read or written by this endpoint.
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const allowedOrigins = getAllowedOrigins();
  const origin = req.headers.origin;

  if (allowedOrigins.length && origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({
      ok: false,
      error: "Invalid origin",
      receivedOrigin: origin,
    });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};

    // Honeypot: real users never see this field. Return success without sending.
    if (clean(body.referralCode, 200)) {
      return res.status(200).json({ ok: true });
    }

    const loadedAt = Number(body.loadedAt || 0);
    const elapsed = Date.now() - loadedAt;

    // Bots often submit instantly. Return success without sending.
    if (!loadedAt || elapsed < 2500) {
      return res.status(200).json({ ok: true });
    }

    const name = clean(body.name, MAX_LENGTHS.name);
    const email = clean(body.email, MAX_LENGTHS.email);
    const phone = clean(body.phone, MAX_LENGTHS.phone);
    const company = clean(body.company, MAX_LENGTHS.company);
    const website = clean(body.website, MAX_LENGTHS.website);
    const helpType = clean(body.helpType, MAX_LENGTHS.helpType);
    const message = clean(body.message, MAX_LENGTHS.message);
    const consent = Boolean(body.consent);

    if (!name || !email || !phone || !helpType || !message) {
      return res.status(400).json({ ok: false, error: "Name, email, phone, help type, and decision problem are required." });
    }

    if (!isEmail(email)) {
      return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
    }

    if (!consent) {
      return res.status(400).json({ ok: false, error: "Please acknowledge the privacy notice." });
    }

    if (looksLikeSpam({ name, email, phone, website, helpType, message })) {
      return res.status(200).json({ ok: true });
    }

    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5">
        <h2>New Signalcraft contact form submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company || "Not provided")}</p>
        <p><strong>Website:</strong> ${escapeHtml(website || "Not provided")}</p>
        <p><strong>Help type:</strong> ${escapeHtml(helpType)}</p>
        <hr />
        <p><strong>Decision problem:</strong></p>
        <p>${escapeHtml(message).replaceAll("\n", "<br />")}</p>
      </div>
    `;

    await resend.emails.send({
      from: process.env.CONTACT_FROM,
      to: process.env.CONTACT_TO || "signalcraftanalytics@gmail.com",
      reply_to: email,
      subject: `Signalcraft discovery call request from ${name}`,
      html,
      text: [
        "New Signalcraft contact form submission",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Company: ${company || "Not provided"}`,
        `Website: ${website || "Not provided"}`,
        `Help type: ${helpType}`,
        "",
        "Decision problem:",
        message,
      ].join("\n"),
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({ ok: false, error: "Something went wrong. Please email directly." });
  }
}
