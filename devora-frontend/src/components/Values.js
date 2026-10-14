"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


const ICONS = {
  heart: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 20s-7-4.35-9.5-8.5C0.7 8.2 2 4.5 5.5 4c2-.3 3.7.7 4.5 2.3.8-1.6 2.5-2.6 4.5-2.3C18 4.5 19.3 8.2 21.5 11.5 19 15.65 12 20 12 20Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  ),
  shield: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  scale: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 3v18M6 7l-3 6a3 3 0 0 0 6 0l-3-6ZM18 7l-3 6a3 3 0 0 0 6 0l-3-6ZM4 21h16M6 7h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  bulb: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 18h6M10 21h4M8 14a4 4 0 1 1 8 0c0 1.5-.7 2.3-1.5 3.1-.5.5-.5 1-.5 1.9h-4c0-.9 0-1.4-.5-1.9C8.7 16.3 8 15.5 8 14Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 2v1.5M4 8h1.5M18.5 8H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  eye: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M2 12s3.5-6.5 10-6.5S22 12 22 12s-3.5 6.5-10 6.5S2 12 2 12Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
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

function ValueCard({ item, index }) {
  const Icon = ICONS[item.icon] || ICONS.heart;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="overflow-hidden rounded-2xl border border-slate/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      <div className="h-1 w-full bg-teal" />
      <div className="p-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal/10 text-teal">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-3 text-base font-semibold text-navy">{item.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-slate">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Values() {
  const { te } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("values")
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-white px-6 py-12">
        <p className="mx-auto max-w-6xl text-sm text-slate">
          {te("Could not load this section. Please try again in a moment.", error)}
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[520px] bg-white" />;

  return (
    <section className="bg-white px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-2">
      <div className="mx-auto max-w-none">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-paper p-5 sm:p-6"
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
          <h2 className="mt-1.5 font-heading text-2xl font-bold leading-tight text-navy sm:text-3xl">
            {data.heading}
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate">{data.subheading}</p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {data.values.map((item, i) => (
              <ValueCard key={item.title} item={item} index={i} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 flex flex-col gap-4 rounded-2xl bg-navy p-6 text-white sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-mono text-xs tracking-widest text-teal">{data.conduct.eyebrow}</p>
              <h3 className="mt-1.5 text-lg font-semibold">{data.conduct.heading}</h3>
              <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-slate">{data.conduct.description}</p>
            </div>

            <motion.a
              href={data.conduct.cta.href}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex w-fit shrink-0 items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
            >
              {data.conduct.cta.label}
              <ArrowIcon />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}