"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const TONES = {
  teal: { text: "text-teal", bg: "bg-teal", glow: "bg-teal/15" },
  purple: { text: "text-purple-400", bg: "bg-purple-400", glow: "bg-purple-500/15" },
  blue: { text: "text-blue-400", bg: "bg-blue-400", glow: "bg-blue-500/15" },
  orange: { text: "text-orange-400", bg: "bg-orange-400", glow: "bg-orange-500/15" },
};

function QuoteMark() {
  return (
    <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
      <path
        d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0L14 3.2C9.6 4.4 7.2 7.2 6.8 11.2H14V24H0ZM18 24V14.4C18 6.4 22.8 1.2 30.8 0L32 3.2C27.6 4.4 25.2 7.2 24.8 11.2H32V24H18Z"
        fill="currentColor"
      />
    </svg>
  );
}

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonials`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-white p-2 sm:p-3 lg:p-4">
        <p className="text-sm text-red-500">
          Could not load testimonials: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[520px] bg-white" />;

  const active = data.testimonials[activeIndex];
  const tone = TONES[active.tone] || TONES.teal;

  return (
    <section className="bg-white p-2 sm:p-3 lg:p-4">
      <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-white/10 bg-navy p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <motion.div
          key={active.tone}
          className={`pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full ${tone.glow} blur-[100px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{
            opacity: { duration: 0.6 },
            x: { duration: 13, repeat: Infinity, ease: "easeInOut" },
            y: { duration: 13, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        <div className="relative text-white">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
            <h2 className="mt-2 max-w-xl font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
              {data.heading}
            </h2>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 sm:p-10"
              >
                <span className={tone.text}>
                  <QuoteMark />
                </span>
                <p className="mt-6 text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  “{active.quote}”
                </p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-navy ${tone.bg}`}>
                    {initials(active.name)}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{active.name}</p>
                    <p className="text-xs text-slate">{active.role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-row gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
              {data.testimonials.map((t, i) => {
                const isActive = i === activeIndex;
                const tTone = TONES[t.tone] || TONES.teal;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveIndex(i)}
                    className={`group flex w-full min-w-[220px] shrink-0 items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-300 lg:min-w-0 ${
                      isActive
                        ? "border-white/20 bg-white/[0.06]"
                        : "border-white/5 bg-transparent hover:border-white/15 hover:bg-white/[0.03]"
                    }`}
                  >
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-navy transition-transform duration-300 ${
                        isActive ? `${tTone.bg} scale-100` : "scale-90 bg-white/15 text-white/70"
                      }`}
                    >
                      {initials(t.name)}
                    </span>
                    <span className="min-w-0">
                      <span className={`block truncate text-sm font-medium ${isActive ? "text-white" : "text-white/60"}`}>
                        {t.name}
                      </span>
                      <span className="block truncate text-xs text-slate/60">{t.company}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}