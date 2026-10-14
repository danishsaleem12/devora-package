"use client";

import { API_URL, apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const ICONS = {
  briefcase: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  handshake: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2 12l4-4 4 4-4 4-4-4Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M10 12l3 3 5-5-3-3M13 15l2 2M15 13l2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function ArrowIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FieldInput({ placeholder, type = "text", required, name, span }) {
  const { t } = useLanguage();
  return (
    <input
      type={type}
      name={name}
      placeholder={t(placeholder) + (required ? " *" : "")}
      required={required}
      className={`w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate/50 outline-none transition-colors focus:border-teal ${span ? "sm:col-span-2" : ""}`}
    />
  );
}

export default function Contact() {
  const { t, te } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    apiFetch("contact")
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setSubmitError("");

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries()); // includes the hidden "website" honeypot

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      // a network failure surfaces as "Failed to fetch": show a friendly message instead
      setSubmitError(
        err instanceof TypeError ? "Could not reach the server. Please try again." : err.message
      );
    } finally {
      setSending(false);
    }
  }

  if (error) {
    return (
      <section className="bg-navy px-6 py-24 text-white">
        <p className="mx-auto max-w-6xl text-sm text-teal">
          {te("Could not load contact page. Please try again in a moment.", error)}
        </p>
      </section>
    );
  }
  if (!data) return <section className="min-h-[600px] bg-navy" />;

  return (
    <section className="relative overflow-hidden bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14">
      <motion.div
        className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-teal/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto grid max-w-none gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col justify-center"
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
          <h1 className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
            {data.heading}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate">{data.subheading}</p>

          {data.partneredBy && (
            <div className="mt-14 border-t border-white/10 pt-8">
              <p className="text-[11px] font-medium tracking-widest text-slate/50">{data.partneredBy.label}</p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                {data.partneredBy.logos.map((logo) => (
                  <span key={logo} className="text-sm font-semibold text-white/60">{logo}</span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Right column: form */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/15 text-teal">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-white">{t("Message sent")}</h3>
                <p className="mt-1.5 max-w-xs text-sm text-slate">
                  {t("Thanks for reaching out — we'll get back to you within a business day.")}
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Honeypot: hidden from people, bots fill it in. Must stay empty. */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-0 w-0 opacity-0"
                />
                <FieldInput placeholder="First Name" required name="firstName" />
                <FieldInput placeholder="Last Name" name="lastName" />
                <FieldInput placeholder="Business email" type="email" required name="email" />
                <FieldInput placeholder="Phone" type="tel" name="phone" />
                <FieldInput placeholder="Company" required name="company" />

                <select
                  name="lookingFor"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-colors focus:border-teal"
                >
                  <option value="" disabled className="text-slate">{t("I am looking for *")}</option>
                  {data.form.lookingForOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-ink">{opt}</option>
                  ))}
                </select>

                <textarea
                  name="message"
                  placeholder={t("Tell us more about your project")}
                  rows={4}
                  className="w-full resize-none rounded-lg border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-slate/50 outline-none transition-colors focus:border-teal sm:col-span-2"
                />

                {submitError && (
                  <p role="alert" className="rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 sm:col-span-2">
                    {t(submitError)}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={{ scale: sending ? 1 : 1.01 }}
                  whileTap={{ scale: sending ? 1 : 0.98 }}
                  className="rounded-lg bg-teal px-5 py-3.5 text-sm font-semibold text-navy transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                >
                  {sending ? t("Sending…") : data.form.submitLabel}
                </motion.button>
              </form>
            )}
          </div>

          {data.quickLinks && (
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {data.quickLinks.map((link) => {
                const Icon = ICONS[link.icon] || ICONS.briefcase;
                return (
                  <a
                    key={link.title}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] p-4 transition-colors hover:border-white/20 hover:bg-white/[0.04]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-teal">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">{link.title}</p>
                        <p className="text-xs text-slate/60">{link.subtitle}</p>
                      </div>
                    </div>
                    <span className="text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white/70">
                      <ArrowIcon />
                    </span>
                  </a>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}