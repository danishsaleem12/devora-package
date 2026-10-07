"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function useCountUp(target, start, duration = 1400) {
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

function StatBlock({ stat, index }) {
  const [started, setStarted] = useState(false);
  const count = useCountUp(stat.value, started, 1200 + index * 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onAnimationComplete={() => setStarted(true)}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
      className="border-l border-white/10 pl-4 first:border-l-0 first:pl-0"
    >
      <div className="flex items-baseline gap-0.5">
        <span className="font-heading text-3xl font-bold text-white tabular-nums">{count}</span>
        <span className="font-heading text-xl font-bold text-teal">{stat.suffix}</span>
      </div>
      <p className="mt-1 text-xs text-slate/60">{stat.label}</p>
    </motion.div>
  );
}

/* Abstract orbiting-nodes visual — original, not a 3D wireframe */
function OrbitVisual() {
  const nodes = [
    { size: 14, radius: 140, duration: 18, delay: 0, tone: "bg-teal" },
    { size: 10, radius: 100, duration: 14, delay: 0.5, tone: "bg-purple-400" },
    { size: 12, radius: 175, duration: 22, delay: 1, tone: "bg-blue-400" },
    { size: 8, radius: 60, duration: 10, delay: 0.3, tone: "bg-orange-400" },
  ];

  return (
    <div className="relative flex h-[380px] w-[380px] items-center justify-center sm:h-[440px] sm:w-[440px]">
      {[140, 100, 175, 60].map((r, i) => (
        <span key={i} className="absolute rounded-full border border-white/10" style={{ width: r * 2, height: r * 2 }} />
      ))}

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 flex h-28 w-28 items-center justify-center rounded-2xl bg-gradient-to-br from-teal via-blue-500 to-purple-600 shadow-2xl"
      >
        <span className="font-heading text-2xl font-bold text-white">D</span>
      </motion.div>

      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ width: node.radius * 2, height: node.radius * 2 }}
          animate={{ rotate: 360 }}
          transition={{ duration: node.duration, repeat: Infinity, ease: "linear", delay: node.delay }}
        >
          <span
            className={`absolute left-1/2 top-0 -translate-x-1/2 rounded-full shadow-lg ${node.tone}`}
            style={{ width: node.size, height: node.size }}
          />
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/about`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-navy px-6 py-24 text-white">
        <p className="mx-auto max-w-6xl text-sm text-teal">
          Could not load about page: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="min-h-[640px] bg-navy" />;

  return (
    <section className="relative overflow-hidden bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14">
      <motion.div
        className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex max-w-none flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl shrink-0"
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
          <h1 className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
            {data.heading}
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate">{data.subheading}</p>

          {data.primaryCta && (
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={data.primaryCta.href}
              className="mt-8 inline-flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-navy"
            >
              <ArrowIcon />
              {data.primaryCta.label}
            </motion.a>
          )}

          <div className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4 sm:gap-4">
            {data.stats.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} index={i} />
            ))}
          </div>

          {data.trustedBy && (
            <div className="mt-10">
              <p className="text-[11px] font-medium tracking-widest text-slate/50">TRUSTED BY</p>
              <div className="mt-4 flex flex-wrap gap-3">
                {data.trustedBy.map((name, i) => (
                  <motion.span
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.08 }}
                    className="rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-white/60"
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex w-full justify-center lg:w-auto"
        >
          <OrbitVisual />
        </motion.div>
      </div>
    </section>
  );
}