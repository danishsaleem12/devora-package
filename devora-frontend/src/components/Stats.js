"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function useCountUp(target, start, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame;
    let startTime = null;
    function tick(ts) {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value;
}

function StatCard({ stat, index }) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(stat.value, started, 1200 + index * 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      onViewportEnter={() => setStarted(true)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex-1 rounded-xl border border-slate/15 bg-white px-6 py-5 shadow-sm transition-shadow duration-300 hover:border-teal/40 hover:shadow-md"
    >
      <div className="flex items-baseline gap-1">
        <span className="font-heading text-3xl font-bold text-navy tabular-nums sm:text-4xl">
          {count.toLocaleString()}
        </span>
        <span className="font-heading text-2xl font-bold text-teal sm:text-3xl">{stat.suffix}</span>
      </div>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-widest text-slate/70">{stat.label}</p>
    </motion.div>
  );
}

export default function Stats() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/stats`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-paper px-6 py-16">
        <p className="mx-auto max-w-6xl text-sm text-slate">
          Could not load stats: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[340px] bg-paper" />;

  return (
    <section className="relative overflow-hidden bg-paper px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
      {/* Diagonal line texture — same motif as the navy sections, tuned for a light background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgba(11,30,61,0.025) 0px, rgba(11,30,61,0.025) 1px, transparent 1px, transparent 14px)",
        }}
      />
      <motion.div
        className="pointer-events-none absolute left-1/3 top-0 h-[350px] w-[350px] rounded-full bg-teal/10 blur-[110px]"
        animate={{ x: [0, 40, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl"
        >
          <h2 className="font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl lg:text-4xl">
            {data.headingParts.map((part, i) => (
              <span key={i} className={part.accent ? "text-teal" : "text-navy"}>
                {part.text}
              </span>
            ))}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate">{data.subheading}</p>
        </motion.div>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          {data.stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}