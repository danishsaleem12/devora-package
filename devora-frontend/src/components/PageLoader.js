"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Dancing_Script } from "next/font/google";

// Same script font as the navbar logo, so the loader hands off seamlessly
// (next/font self-hosts it and dedupes the file with Navbar's copy)
const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

/**
 * PageLoader
 * ---------------------------------------------------------------
 * Full-screen intro shown once per browser session (sessionStorage).
 * - Progress ring + % counter that waits for the real window "load" event
 *   (never finishes before the page is actually ready, and never hangs
 *   longer than MAX_MS)
 * - Cycling tech words, floating gradient blobs, orbiting dot
 * - Two-layer "curtain" exit that slides up and reveals the site
 * - Locks page scroll while visible, respects prefers-reduced-motion
 *
 * Mount once in app/layout.js (inside <body>, above {children}).
 */

const SESSION_KEY = "portfolio-loader-seen";
const MIN_MS = 2400; // minimum time the loader stays on screen
const MAX_MS = 6000; // safety net: always leave after this long
const WORDS = ["Web Apps", "Next.js", "Express", "MongoDB", "AI Automation"];

// Progress ring geometry
const RING_R = 70;
const RING_C = 2 * Math.PI * RING_R;

// Smooth "curtain" easing
const CURTAIN_EASE = [0.76, 0, 0.24, 1];

// Curved bottom edge applied while the curtain lifts (same units on both
// ends so framer-motion can interpolate it smoothly)
const FLAT_EDGE = "0vw 0vh";
const CURVED_EDGE = "50vw 12vh";

export default function PageLoader() {
  // Start as `true` so the server-rendered HTML already contains the loader
  // (no flash of the site before it appears).
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);

  // Skip entirely if the visitor already saw it this session
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      /* storage blocked - just show the loader */
    }
    if (seen) setLoading(false);
  }, []);

  // Drive the progress + lock scroll while loading
  useEffect(() => {
    if (!loading) return undefined;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const minMs = reduced ? 600 : MIN_MS;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    let pageReady = document.readyState === "complete";
    const onLoad = () => {
      pageReady = true;
    };
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let raf;
    let finishTimer;

    const finish = () => {
      setProgress(100);
      // Hold on 100% for a beat, then lift the curtain
      finishTimer = setTimeout(() => {
        try {
          sessionStorage.setItem(SESSION_KEY, "1");
        } catch {
          /* ignore */
        }
        setLoading(false);
      }, 350);
    };

    const tick = (now) => {
      const elapsed = now - start;
      const timeP = Math.min(elapsed / minMs, 1);
      const eased = 1 - Math.pow(1 - timeP, 3); // ease-out cubic

      // Hold at 92% until the page has truly loaded
      const target = pageReady ? eased * 100 : Math.min(eased * 100, 92);
      const rounded = Math.round(target);
      // Returning the same value skips the re-render, so this stays cheap
      setProgress((prev) => (rounded > prev ? rounded : prev));

      if ((pageReady && timeP >= 1) || elapsed >= MAX_MS) {
        finish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(finishTimer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = previousOverflow;
    };
  }, [loading]);

  // Cycle the tech words under the name
  useEffect(() => {
    if (!loading) return undefined;
    const id = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 650);
    return () => clearInterval(id);
  }, [loading]);

  const name = "Devora".split("");

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          role="status"
          aria-label="Loading Devora"
        >
          {/* Back curtain (dark) - lifts slightly after the front one */}
          <motion.div
            className="absolute inset-0 bg-[#111827]"
            style={{
              borderBottomLeftRadius: FLAT_EDGE,
              borderBottomRightRadius: FLAT_EDGE,
            }}
            exit={{
              y: "-100%",
              borderBottomLeftRadius: CURVED_EDGE,
              borderBottomRightRadius: CURVED_EDGE,
              transition: { duration: 0.95, delay: 0.14, ease: CURTAIN_EASE },
            }}
          />

          {/* Front curtain (cream) - holds all the loader content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#f6f4ee]"
            style={{
              borderBottomLeftRadius: FLAT_EDGE,
              borderBottomRightRadius: FLAT_EDGE,
            }}
            exit={{
              y: "-100%",
              borderBottomLeftRadius: CURVED_EDGE,
              borderBottomRightRadius: CURVED_EDGE,
              transition: { duration: 0.95, ease: CURTAIN_EASE },
            }}
          >
            {/* Soft grid texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.35]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(17,24,39,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(17,24,39,0.06) 1px, transparent 1px)",
                backgroundSize: "44px 44px",
                maskImage: "radial-gradient(circle at center, black 25%, transparent 75%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 25%, transparent 75%)",
              }}
            />

            {/* Floating gradient blobs */}
            <motion.div
              aria-hidden
              className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#fbbf24]/40 blur-3xl"
              animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute -right-20 bottom-1/4 h-80 w-80 rounded-full bg-[#f472b6]/35 blur-3xl"
              animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full bg-[#38bdf8]/25 blur-3xl"
              animate={{ scale: [1, 1.25, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Content (fades + shrinks before the curtain lifts) */}
            <motion.div
              className="relative z-10 flex flex-col items-center px-6 text-center"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.35 } }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {/* Progress ring with monogram */}
              <div className="relative h-[168px] w-[168px]">
                {/* Pulsing glow */}
                <motion.div
                  aria-hidden
                  className="absolute inset-4 rounded-full bg-gradient-to-br from-[#f472b6]/40 to-[#fbbf24]/40 blur-xl"
                  animate={{ scale: [1, 1.18, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />

                <svg viewBox="0 0 168 168" className="absolute inset-0 -rotate-90">
                  <defs>
                    <linearGradient id="loaderRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#fbbf24" />
                    </linearGradient>
                  </defs>
                  {/* Track */}
                  <circle cx="84" cy="84" r={RING_R} fill="none" stroke="rgba(17,24,39,0.08)" strokeWidth="5" />
                  {/* Progress */}
                  <circle
                    cx="84"
                    cy="84"
                    r={RING_R}
                    fill="none"
                    stroke="url(#loaderRingGradient)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={RING_C}
                    strokeDashoffset={RING_C * (1 - progress / 100)}
                    style={{ transition: "stroke-dashoffset 0.2s linear" }}
                  />
                </svg>

                {/* Orbiting dot */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
                >
                  <span className="absolute left-1/2 top-[7px] h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#111827] shadow-[0_0_12px_rgba(244,114,182,0.8)]" />
                </motion.div>

                {/* Monogram */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`${dancingScript.className} text-7xl text-[#111827]`}>
                    D<span className="text-[#f472b6]">.</span>
                  </span>
                </div>
              </div>

              {/* Name, letter by letter */}
              <h1 className="mt-8 flex items-baseline gap-3 text-3xl font-extrabold tracking-tight text-[#111827] sm:text-4xl">
                <span className="text-gray-500 font-semibold">Hi, I&apos;m</span>
                <span className="flex">
                  {name.map((letter, i) => (
                    <motion.span
                      key={i}
                      className="inline-block bg-gradient-to-br from-[#f472b6] to-[#fbbf24] bg-clip-text text-transparent"
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: "easeOut" }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              </h1>

              {/* Cycling tech words */}
              <p className="mt-3 flex h-6 items-center gap-2 text-sm font-medium text-gray-500">
                <span>Building with</span>
                <span className="relative inline-flex h-6 min-w-[7.5rem] items-center justify-start overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={WORDS[wordIndex]}
                      className="absolute left-0 font-semibold text-[#111827]"
                      initial={{ y: 16, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -16, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      {WORDS[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </p>
            </motion.div>

            {/* Bottom bar: counter + label + thin progress line */}
            <div className="absolute inset-x-0 bottom-0 z-10">
              <div className="flex items-end justify-between px-6 pb-5 sm:px-10">
                <span className="text-5xl font-extrabold tabular-nums leading-none tracking-tight text-[#111827] sm:text-6xl">
                  {String(progress).padStart(3, "0")}
                </span>
                <span className="pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
                  Loading Devora
                </span>
              </div>
              <div className="h-1.5 w-full bg-[#111827]/10">
                <div
                  className="h-full bg-gradient-to-r from-[#f472b6] to-[#fbbf24]"
                  style={{ width: `${progress}%`, transition: "width 0.2s linear" }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}