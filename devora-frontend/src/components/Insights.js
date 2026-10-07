"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const TAG_STYLES = {
  BLOG: "bg-teal/10 text-teal",
  GUIDE: "bg-blue-500/10 text-blue-600",
  UPDATE: "bg-purple-500/10 text-purple-600",
};

function ArrowIcon({ size = 14 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InsightCard({ item, index }) {
  const tagStyle = TAG_STYLES[item.tag] || TAG_STYLES.BLOG;

  return (
    <motion.a
      href={item.href}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate/5">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${tagStyle}`}>
            {item.tag}
          </span>
          <span className="text-xs text-slate/60">{item.meta}</span>
        </div>

        <h3 className="mt-4 text-lg font-semibold leading-snug text-navy">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate">{item.description}</p>

        <span className="mt-5 flex items-center gap-1.5 text-sm font-medium text-teal transition-all duration-300 group-hover:gap-2.5">
          {item.cta}
          <ArrowIcon />
        </span>
      </div>
    </motion.a>
  );
}

export default function Insights() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/insights`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="border-t border-slate/10 bg-white px-6 py-16">
        <p className="mx-auto max-w-6xl text-sm text-slate">
          Could not load insights: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[560px] border-t border-slate/10 bg-white" />;

  return (
    <section className="border-t border-slate/10 bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
      <div className="mx-auto max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
            <h2 className="mt-2 font-heading text-3xl font-bold leading-tight text-navy sm:text-4xl">
              {data.heading}
            </h2>
          </div>

          <a
            href={data.viewAllHref}
            className="flex w-fit items-center gap-1.5 text-sm font-medium text-navy transition-all hover:gap-2.5"
          >
            View all insights
            <ArrowIcon />
          </a>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((item, i) => (
            <InsightCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}