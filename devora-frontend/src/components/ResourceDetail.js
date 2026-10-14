"use client";

import Link from "next/link";
import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function ArrowLeft() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M11 7H3m0 0l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <span className="h-1 w-1 rounded-full bg-white/30" />;
}

export default function ResourceDetail({ type, id }) {
  const { t } = useLanguage();
  const [item, setItem] = useState(null);
  const [state, setState] = useState("loading"); // loading | ready | missing | error

  useEffect(() => {
    let cancelled = false;
    apiFetch(`resources/${type}/${id}`)
      .then((res) => {
        if (res.status === 404) throw new Error("missing");
        if (!res.ok) throw new Error("error");
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;
        setItem(data);
        setState("ready");
      })
      .catch((err) => {
        if (!cancelled) setState(err.message === "missing" ? "missing" : "error");
      });
    return () => {
      cancelled = true;
    };
  }, [type, id]);

  if (state === "loading") return <section className="min-h-[70vh] bg-navy" />;

  if (state !== "ready") {
    return (
      <section className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center">
        <h1 className="font-heading text-3xl font-bold text-ink">
          {state === "missing" ? t("We couldn't find that page") : t("Something went wrong")}
        </h1>
        <p className="mt-3 max-w-md text-sm text-slate">
          {state === "missing"
            ? t("It may have moved or no longer exists.")
            : t("We couldn't load this page right now. Please try again in a moment.")}
        </p>
        <Link href="/resources/blogs" className="mt-6 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy hover:opacity-90">
          {t("Browse the blog")}
        </Link>
      </section>
    );
  }

  const {
    eyebrow, show, title, summary, category, author, authorRole, guest, guestRole,
    date, readTime, duration, imageUrl, sections = [], takeaways = [], stats = [],
    listenOn = [], related = [], back,
  } = item;

  const isPodcast = type === "podcasts";
  const byline = isPodcast ? guest : author;
  const bylineRole = isPodcast ? guestRole : authorRole;
  const length = duration || readTime;

  return (
    <article>
      {/* ---------------- Hero ---------------- */}
      <section className="relative overflow-hidden bg-navy px-6 pb-14 pt-12 text-white sm:px-10 lg:px-14">
        <motion.div
          className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-teal/10 blur-[120px]"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative mx-auto max-w-3xl">
          {back && (
            <Link href={back.href} className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors hover:text-teal">
              <ArrowLeft /> {t(back.label)}
            </Link>
          )}

          <p className="mt-8 font-mono text-xs tracking-widest text-teal/80">
            {[eyebrow, show].filter(Boolean).join("  ·  ")}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.15] sm:text-5xl">{title}</h1>
          {summary && <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{summary}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/60">
            {category && <span className="rounded-full border border-white/20 px-3 py-1 text-teal">{category}</span>}
            {byline && (
              <span>
                <span className="font-medium text-white/90">{isPodcast ? `${t("With")} ${byline}` : byline}</span>
                {bylineRole ? ` · ${bylineRole}` : ""}
              </span>
            )}
            {date && <><Dot /><span>{date}</span></>}
            {length && <><Dot /><span>{length}</span></>}
          </div>

          {isPodcast && listenOn.length > 0 && (
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-xs uppercase tracking-widest text-white/40">{t("Listen on")}</span>
              {listenOn.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-teal hover:text-teal"
                >
                  {p.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Body ---------------- */}
      <section className="bg-white px-6 pb-16 sm:px-10 lg:px-14">
        <div className="mx-auto max-w-3xl">
          {imageUrl && (
            <div className="-mt-6 overflow-hidden rounded-2xl shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imageUrl} alt={title} className="aspect-[16/8] w-full object-cover" />
            </div>
          )}

          {stats.length > 0 && (
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl border border-black/10 p-5 text-center">
                  <p className="font-heading text-3xl font-bold text-teal">{s.value}</p>
                  <p className="mt-1 text-xs text-slate">{s.label}</p>
                </div>
              ))}
            </div>
          )}

          <div className="mt-10 space-y-8">
            {sections.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="font-heading text-xl font-semibold text-ink sm:text-2xl">{section.heading}</h2>
                )}
                <div className={`space-y-4 ${section.heading ? "mt-3" : ""}`}>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-base leading-relaxed text-slate">{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {takeaways.length > 0 && (
            <div className="mt-12 rounded-2xl border border-teal/30 bg-teal/5 p-6 sm:p-8">
              <h2 className="font-heading text-lg font-semibold text-ink">{t("Key takeaways")}</h2>
              <ul className="mt-4 space-y-3">
                {takeaways.map((k) => (
                  <li key={k} className="flex gap-3 text-sm leading-relaxed text-ink">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                    {k}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* ---------------- Related ---------------- */}
      {related.length > 0 && (
        <section className="bg-paper px-6 py-16 sm:px-10 lg:px-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="font-heading text-2xl font-bold text-ink">{t("Keep reading")}</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={r.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.imageUrl} alt={r.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    {r.category && <span className="text-[11px] font-medium uppercase tracking-wide text-teal">{r.category}</span>}
                    <h3 className="mt-1.5 flex-1 font-heading text-base font-semibold leading-snug text-ink">{r.title}</h3>
                    <p className="mt-3 flex items-center justify-between text-xs text-slate/70">
                      <span>{r.meta}</span>
                      <span className="text-teal transition-transform group-hover:translate-x-1"><ArrowRight /></span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------------- CTA ---------------- */}
      <section className="bg-navy px-6 py-16 text-center text-white sm:px-10">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">{t("Got something worth building?")}</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
          {t("Tell us what you're stuck on. We'll tell you honestly if we're the right fit.")}
        </p>
        <Link href="/contact" className="mt-6 inline-block rounded-md bg-teal px-6 py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90">
          {t("Start a Conversation")}
        </Link>
      </section>
    </article>
  );
}
