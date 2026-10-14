// Email sending (SMTP through nodemailer).
//
// Fully optional: if SMTP_* is not set the app still works, emails are simply skipped
// (a line is logged so you can see what would have been sent). Sending NEVER throws and
// is never awaited by request handlers, so a mail problem can't break a form submission.
//
// .env:
//   SMTP_HOST=smtp.gmail.com
//   SMTP_PORT=465                      (465 = SSL, 587 = STARTTLS)
//   SMTP_USER=you@gmail.com
//   SMTP_PASS=app-password
//   MAIL_FROM="Devora <you@gmail.com>"  (optional, defaults to SMTP_USER)
//   ADMIN_NOTIFY_EMAIL=you@gmail.com    (where "new message / new application" alerts go)

let transporter = null;

function isConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getTransporter() {
  if (transporter) return transporter;
  const nodemailer = require("nodemailer"); // loaded lazily so the server still boots if it isn't installed
  const port = Number(process.env.SMTP_PORT) || 587;
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  return transporter;
}

// Header values must be one line (stops header injection through user-supplied text)
const oneLine = (s) => String(s ?? "").replace(/[\r\n]+/g, " ").trim();

async function sendMail({ to, subject, text, replyTo }) {
  if (!to) return false;
  if (!isConfigured()) {
    console.log(`[mail] SMTP not configured, skipped: "${oneLine(subject)}" -> ${oneLine(to)}`);
    return false;
  }
  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: oneLine(to),
      subject: oneLine(subject),
      text,
      ...(replyTo ? { replyTo: oneLine(replyTo) } : {}),
    });
    return true;
  } catch (err) {
    console.error("[mail] send failed:", err.message);
    return false;
  }
}

// Fire and forget
function sendMailInBackground(mail) {
  sendMail(mail).catch(() => {});
}

function adminUrl(path) {
  const origin = (process.env.FRONTEND_URL || "http://localhost:3000").split(",")[0].trim().replace(/\/$/, "");
  return `${origin}${path}`;
}

function notifyAdmin(subject, text, replyTo) {
  sendMailInBackground({ to: process.env.ADMIN_NOTIFY_EMAIL, subject, text, replyTo });
}

module.exports = { sendMail, sendMailInBackground, notifyAdmin, adminUrl, isConfigured };
