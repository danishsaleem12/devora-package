"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";


function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

const CARD_TONES = [
  { text: "text-teal", ring: "hover:ring-teal/40", glow: "bg-teal/20", dot: "bg-teal" },
  { text: "text-purple-500", ring: "hover:ring-purple-400/40", glow: "bg-purple-400/20", dot: "bg-purple-400" },
  { text: "text-blue-500", ring: "hover:ring-blue-400/40", glow: "bg-blue-400/20", dot: "bg-blue-400" },
  { text: "text-orange-500", ring: "hover:ring-orange-400/40", glow: "bg-orange-400/20", dot: "bg-orange-400" },
];

function ClientLogoCard({ name, index }) {
  const tone = CARD_TONES[index % CARD_TONES.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className={`group relative flex h-24 items-center justify-center gap-3 overflow-hidden rounded-xl border border-black/5 bg-white px-6 shadow-sm ring-1 ring-transparent transition-all duration-300 hover:shadow-lg ${tone.ring}`}
    >
      <span
        className={`pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-400 group-hover:opacity-100 ${tone.glow}`}
      />
      <span className={`relative h-2 w-2 shrink-0 rounded-full transition-transform duration-300 group-hover:scale-125 ${tone.dot}`} />
      <span className="relative text-lg font-semibold tracking-tight text-ink/60 transition-colors duration-300 group-hover:text-ink">
        {name}
      </span>
    </motion.div>
  );
}

function CityCard({ city, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="group relative h-72 overflow-hidden rounded-2xl sm:h-80"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={city.imageUrl}
        alt={city.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/20 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + index * 0.1, duration: 0.4 }}
        className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-white/95 px-4 py-3 backdrop-blur-sm transition-transform duration-300 group-hover:-translate-y-1"
      >
        <div>
          <p className="text-sm font-semibold text-ink">{city.name}</p>
          <p className="mt-0.5 text-xs text-slate/70">{city.detail}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
          <PinIcon />
        </span>
      </motion.div>
    </motion.div>
  );
}

export default function Presence() {
  const { te } = useLanguage();
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiFetch("presence")
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-white px-6 py-16">
        <p className="mx-auto max-w-6xl text-sm text-red-500">
          {te("Could not load presence section. Please try again in a moment.", error)}
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[900px] bg-white" />;

  return (
    <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
      <div className="mx-auto max-w-none">
        {/* Clients block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs tracking-widest text-teal">{data.clients.eyebrow}</p>
          <h2 className="mt-2 max-w-lg font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {data.clients.heading}
          </h2>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {data.clients.logos.map((name, i) => (
            <ClientLogoCard key={name} name={name} index={i} />
          ))}
        </div>

        {/* Global presence block */}
        <div className="mt-20 sm:mt-24">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl"
          >
            <p className="font-mono text-xs tracking-widest text-teal">{data.locations.eyebrow}</p>
            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {data.locations.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{data.locations.subheading}</p>
          </motion.div>

          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {data.locations.cities.map((city, i) => (
              <CityCard key={city.name} city={city} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}