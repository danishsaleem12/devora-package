"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const TONES = {
  teal: { text: "text-teal", bar: "bg-teal" },
  purple: { text: "text-purple-400", bar: "bg-purple-400" },
  blue: { text: "text-blue-400", bar: "bg-blue-400" },
  orange: { text: "text-orange-400", bar: "bg-orange-400" },
};

const ICONS = {
  award: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8.5 12.5 7 21l5-2.5 5 2.5-1.5-8.5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  spark: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2v6M12 16v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M2 12h6M16 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
};

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useCountUp(target, start, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let frame;
    let startTime = null;
    function tick(ts) {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}

function PlatformRow({ platform, index }) {
  const tone = TONES[platform.tone] || TONES.teal;
  const [started, setStarted] = useState(false);
  const count = useCountUp(platform.count, started, 1200 + index * 150);
  const pct = Math.min((platform.count / platform.max) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={() => setStarted(true)}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-white/20"
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-white">{platform.name}</span>
        <span className={`font-heading text-xl font-bold tabular-nums ${tone.text}`}>
          {count}
          <span className="text-sm">+</span>
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        {started && (
          <motion.div
            className={`h-full rounded-full ${tone.bar}`}
            initial={{ width: "0%" }}
            whileInView={{ width: `${pct}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
          />
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-slate/70">{platform.description}</p>
    </motion.div>
  );
}

function BadgeChip({ badge, index }) {
  const Icon = ICONS[badge.icon] || ICONS.award;
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="group relative flex items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5"
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative text-teal">
        <Icon className="h-4 w-4" />
      </span>
      <span className="relative text-xs font-medium text-white/80">{badge.name}</span>
    </motion.div>
  );
}

export default function Credentials() {
  const { t, te } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("credentials")
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
        <p className="text-sm text-red-500">{te("Could not load credentials. Please try again in a moment.", error)}</p>
      </section>
    );
  }
  if (!data) return <section className="h-[520px] bg-[#fafafa]" />;

  return (
    <section className="bg-white p-2 sm:p-3 lg:p-4">
      <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1526] p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />
        <motion.div
          className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-teal/10 blur-[100px]"
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative text-white">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="max-w-xl"
            >
              <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
              <h2 className="mt-2 font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                {data.headingParts.map((part, i) => (
                  <span key={i} className={part.accent ? "text-teal" : "text-white"}>
                    {part.text}{" "}
                  </span>
                ))}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{data.subheading}</p>
            </motion.div>

            {data.cta && (
              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                href={data.cta.href}
                className="flex w-fit items-center gap-1.5 rounded-md bg-white px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
              >
                {data.cta.label}
                <ArrowIcon />
              </motion.a>
            )}
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {data.platforms.map((platform, i) => (
              <PlatformRow key={platform.name} platform={platform} index={i} />
            ))}
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <p className="font-mono text-[11px] tracking-widest text-slate/50">{t("RECOGNIZED BY")}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {data.badges.map((badge, i) => (
                <BadgeChip key={badge.name} badge={badge} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}