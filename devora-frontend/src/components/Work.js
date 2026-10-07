"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const TONES = {
  teal: { text: "text-teal", bg: "bg-teal/10", border: "border-teal/30", bar: "bg-teal", dot: "bg-teal" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-400/30", bar: "bg-purple-400", dot: "bg-purple-400" },
  blue: { text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-400/30", bar: "bg-blue-400", dot: "bg-blue-400" },
  orange: { text: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-400/30", bar: "bg-orange-400", dot: "bg-orange-400" },
};

const ICONS = {
  chat: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 5h16v11H8l-4 4V5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  globe: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  ),
  cart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 5h2l2.4 12.2a2 2 0 0 0 2 1.8h7.2a2 2 0 0 0 2-1.6L21 9H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="21" r="1.4" fill="currentColor" />
      <circle cx="17" cy="21" r="1.4" fill="currentColor" />
    </svg>
  ),
  chart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 20V10M11 20V4M18 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
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

function useCountUp(target, start, decimals = 0, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    let startTime = null;
    const factor = Math.pow(10, decimals);
    function tick(ts) {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target * factor) / factor);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, decimals, duration]);

  return value;
}

/* ---------------- Tech stack marquee ---------------- */

function StackMarquee({ items }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative mt-10 overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />
      <motion.div
        className="flex w-max items-center gap-4"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((item, i) => {
          const tone = TONES[item.tone] || TONES.teal;
          return (
            <span
              key={item.name + i}
              className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/25 hover:text-white"
            >
              <span className={`h-1.5 w-1.5 rounded-full ${tone.dot}`} />
              {item.name}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ---------------- Case study card ---------------- */

function CaseStudyCard({ item, index }) {
  const tone = TONES[item.tone] || TONES.teal;
  const Icon = ICONS[item.icon] || ICONS.chat;
  const [started, setStarted] = useState(false);
  const count = useCountUp(item.metric.number, started, item.metric.decimals ?? 0, 1200 + index * 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      onViewportEnter={() => setStarted(true)}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative flex w-[320px] shrink-0 flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg shadow-black/20 transition-shadow duration-300 hover:shadow-2xl sm:w-[360px]"
    >
      <div className={`h-1 w-full ${tone.bar}`} />

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between">
          <span className={`flex h-10 w-10 items-center justify-center rounded-lg ${tone.bg} ${tone.text}`}>
            <Icon className="h-5 w-5" />
          </span>
          <span className={`rounded-full border px-3 py-1 text-[11px] font-medium tracking-wide ${tone.text} ${tone.bg} ${tone.border}`}>
            {item.category}
          </span>
        </div>

        <h3 className="mt-5 text-lg font-semibold leading-snug text-ink">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">{item.summary}</p>

        <div className="mt-auto flex items-end justify-between border-t border-black/5 pt-5">
          <div>
            <p className={`font-heading text-2xl font-bold tabular-nums ${tone.text}`}>
              {count.toLocaleString(undefined, {
                minimumFractionDigits: item.metric.decimals ?? 0,
                maximumFractionDigits: item.metric.decimals ?? 0,
              })}
              {item.metric.suffix}
            </p>
            <p className="mt-0.5 max-w-[9rem] text-[11px] uppercase leading-snug tracking-wide text-slate/60">
              {item.metric.label}
            </p>
          </div>
          <span className="flex items-center gap-1 text-xs font-medium text-ink/50 transition-all duration-300 group-hover:gap-2 group-hover:text-ink">
            Read case study
            <ArrowIcon />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------------- Draggable carousel ---------------- */

function CaseStudyCarousel({ items }) {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = trackRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }

  function scrollBy(amount) {
    trackRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        onScroll={updateScrollState}
        className="flex gap-5 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <CaseStudyCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <div className="mt-2 flex items-center justify-end gap-3">
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollBy(-380)}
          disabled={!canScrollLeft}
          aria-label="Scroll left"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/60 transition-colors hover:border-white/40 hover:text-white disabled:opacity-30"
        >
          <span className="rotate-180"><ArrowIcon size={14} /></span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollBy(380)}
          disabled={!canScrollRight}
          aria-label="Scroll right"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-teal bg-teal text-navy transition-opacity hover:opacity-90 disabled:opacity-30"
        >
          <ArrowIcon size={14} />
        </motion.button>
      </div>
    </div>
  );
}

/* ---------------- Main component ---------------- */

export default function Work() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/work`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-navy px-6 py-16">
        <p className="mx-auto max-w-6xl text-sm text-teal">
          Could not load work section: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[700px] bg-navy" />;

  return (
    <section className="bg-navy px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
      {/* Tech stack marquee block */}
      <div className="mx-auto max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.stack.eyebrow}</p>
          <h2 className="mt-2 max-w-lg text-xl font-semibold leading-snug text-white sm:text-2xl">
            {data.stack.heading}
          </h2>
        </motion.div>

        <StackMarquee items={data.stack.items} />
      </div>

      {/* Case studies block */}
      <div className="mx-auto mt-20 max-w-none sm:mt-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="font-mono text-xs tracking-widest text-teal">{data.caseStudies.eyebrow}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl">
              {data.caseStudies.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{data.caseStudies.subheading}</p>
          </motion.div>

          {data.caseStudies.cta && (
            <motion.a
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={data.caseStudies.cta.href}
              className="flex w-fit items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
            >
              {data.caseStudies.cta.label}
              <ArrowIcon />
            </motion.a>
          )}
        </div>

        <div className="mt-10">
          <CaseStudyCarousel items={data.caseStudies.items} />
        </div>
      </div>
    </section>
  );
}