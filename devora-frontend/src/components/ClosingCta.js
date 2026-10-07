"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon({ size = 13 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MagneticButton({ children, className, href, primary }) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: relX * 0.25, y: relY * 0.25 });
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 });
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

export default function ClosingCta() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/cta`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-navy px-6 py-14">
        <p className="mx-auto max-w-6xl text-sm text-teal">
          Could not load CTA: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[220px] bg-navy" />;

  return (
    <section className="relative overflow-hidden bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14">
      {/* Slow-sweeping gradient wash, distinct from other sections' static/drifting-blob glows */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background: "linear-gradient(115deg, transparent 20%, rgba(45,212,191,0.12) 45%, transparent 70%)",
          backgroundSize: "200% 200%",
        }}
        animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex max-w-none flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h2 className="font-heading text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
            {data.heading}
            <motion.span
              className="ml-1 inline-block h-[0.9em] w-[3px] translate-y-[2px] bg-teal align-middle"
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            />
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">{data.subheading}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex shrink-0 flex-wrap gap-3"
        >
          <MagneticButton
            href={data.primaryCta.href}
            className="flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-semibold text-navy shadow-lg shadow-teal/20 transition-shadow hover:shadow-teal/30"
          >
            <ArrowIcon />
            {data.primaryCta.label}
          </MagneticButton>

          {data.secondaryCta && (
            <MagneticButton
              href={data.secondaryCta.href}
              className="flex items-center gap-1.5 rounded-md border border-white/20 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              {data.secondaryCta.label}
            </MagneticButton>
          )}
        </motion.div>
      </div>
    </section>
  );
}