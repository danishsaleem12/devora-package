"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const SPOTLIGHT_DURATION_MS = 6000;

const TONES = {
  teal: { text: "text-teal", bg: "bg-teal", ring: "ring-teal/40" },
  purple: { text: "text-purple-400", bg: "bg-purple-400", ring: "ring-purple-400/40" },
  blue: { text: "text-blue-400", bg: "bg-blue-400", ring: "ring-blue-400/40" },
  orange: { text: "text-orange-400", bg: "bg-orange-400", ring: "ring-orange-400/40" },
};

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7-11-7Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Waveform({ tone, playing }) {
  const bars = Array.from({ length: 24 });
  return (
    <div className="flex h-6 items-end gap-[3px]">
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className={`w-[2.5px] rounded-full ${tone.bg}`}
          animate={playing ? { height: [4, 18, 4] } : { height: 4 }}
          transition={{
            duration: 0.9 + (i % 4) * 0.15,
            repeat: playing ? Infinity : 0,
            delay: i * 0.04,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function EpisodeCard({ episode, index }) {
  const [hovered, setHovered] = useState(false);
  const tone = TONES[episode.tone] || TONES.teal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col overflow-hidden rounded-xl border border-white/10 transition-all duration-300 ${hovered ? `ring-2 ${tone.ring}` : ""}`}
    >
      <div className="relative h-56 w-full overflow-hidden bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={episode.imageUrl}
          alt={episode.guest}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur-sm">
          {episode.show}
        </span>

        <motion.div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy via-navy/40 to-transparent p-4"
          initial={{ opacity: 0.85 }}
          animate={{ opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <Waveform tone={tone} playing={hovered} />
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={hovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "backOut" }}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-navy ${tone.bg}`}
            >
              <PlayIcon />
            </motion.span>
          </div>
        </motion.div>
      </div>

      <div className="bg-white/[0.03] p-4">
        <h3 className="text-sm font-semibold leading-snug text-white">{episode.title}</h3>
        <p className="mt-2 text-xs text-slate/70">
          <span className="font-medium text-white/80">{episode.guest}</span> · {episode.role}
        </p>
        <p className="mt-1 text-[11px] text-slate/50">{episode.duration}</p>
      </div>
    </motion.div>
  );
}

export default function Podcasts() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/podcasts`)
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    if (!data) return;
    const timer = setInterval(() => {
      setSpotlightIndex((i) => (i + 1) % data.episodes.length);
    }, SPOTLIGHT_DURATION_MS);
    return () => clearInterval(timer);
  }, [data]);

  if (error) {
    return (
      <section className="bg-white p-2 sm:p-3 lg:p-4">
        <p className="text-sm text-red-500">
          Could not load podcasts: {error}. Is the backend running on {API_URL}?
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[640px] bg-white" />;

  const spotlight = data.episodes[spotlightIndex];
  const spotlightTone = TONES[spotlight.tone] || TONES.teal;

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
          className="pointer-events-none absolute -top-24 right-10 h-80 w-80 rounded-full bg-teal/10 blur-[110px]"
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
                {data.heading}
              </h2>
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

          {/* Auto-rotating spotlight bar */}
          <div className="relative mt-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={spotlight.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${spotlightTone.bg} text-navy`}>
                    <PlayIcon />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-widest text-slate/50">
                      Now spotlighting · {spotlight.show}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white sm:text-base">{spotlight.title}</p>
                  </div>
                </div>
                <Waveform tone={spotlightTone} playing={true} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-4 flex gap-1.5">
              {data.episodes.map((ep, i) => (
                <button
                  key={ep.id}
                  onClick={() => setSpotlightIndex(i)}
                  aria-label={`Show episode ${i + 1}`}
                  className={`h-1 flex-1 overflow-hidden rounded-full bg-white/10`}
                >
                  {i === spotlightIndex && (
                    <motion.div
                      key={spotlightIndex}
                      className="h-full bg-teal"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: SPOTLIGHT_DURATION_MS / 1000, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {data.episodes.map((episode, i) => (
              <EpisodeCard key={episode.id} episode={episode} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}