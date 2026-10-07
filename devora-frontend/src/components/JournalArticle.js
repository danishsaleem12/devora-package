"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* =========================================================================
   ICONS
   ========================================================================= */

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function PlayIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2.5v11l10-5.5-10-5.5Z" />
        </svg>
    );
}
function PauseIcon({ size = 16 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
            <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" />
            <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" />
        </svg>
    );
}
function ChevronDown({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function QuoteMark() {
    return (
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
            <path
                d="M0 22V13.6C0 6.4 4.2 1.4 11.4 0L12.8 3.4C8.4 4.8 6 7.6 6 11.2H12V22H0ZM16 22V13.6C16 6.4 20.2 1.4 27.4 0L28.8 3.4C24.4 4.8 22 7.6 22 11.2H28V22H16Z"
                fill="currentColor"
            />
        </svg>
    );
}
function ShareIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 8v6h8V8M8 1v9M5 4l3-3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function LinkIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path
                d="M7 9a3 3 0 0 0 4.5.3l1.7-1.7a3 3 0 0 0-4.2-4.2L8 4.4M9 7a3 3 0 0 0-4.5-.3L2.8 8.4a3 3 0 0 0 4.2 4.2L8 11.6"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.6V8l2.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    );
}
function ArrowUp() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const PLATFORM_ICONS = {
    spotify: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.7.7 0 0 1-1 .2c-2.7-1.7-6.1-2-10.1-1.1a.7.7 0 0 1-.3-1.4c4.4-1 8.1-.6 11.2 1.3a.7.7 0 0 1 .2 1Zm1.2-2.8a.9.9 0 0 1-1.2.3c-3.1-1.9-7.8-2.5-11.5-1.3a.9.9 0 0 1-.5-1.7c4.2-1.3 9.4-.7 13 1.4a.9.9 0 0 1 .2 1.3Zm.1-2.9C14.5 8.6 8.9 8.4 5.6 9.4a1 1 0 0 1-.6-2c3.8-1.2 10-1 14 1.5a1 1 0 0 1-1.1 1.8Z" />
        </svg>
    ),
    apple: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2Zm3.4 13.9c-.5.9-1 1.7-1.9 1.7-.8 0-1.1-.5-2-.5s-1.2.5-2 .5c-.8 0-1.5-.8-2-1.6-1.1-1.7-1.9-4.7-.8-6.8.5-1 1.5-1.7 2.5-1.7.8 0 1.3.5 2 .5s1.1-.5 2-.5c.9 0 1.8.5 2.4 1.3-2.1 1.2-1.8 4.3.4 5.2-.2.7-.4 1.3-.6 1.9ZM13.9 6c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.6.6-1 1.6-.9 2.6 1 .1 2-.5 2.5-1.2Z" />
        </svg>
    ),
    youtube: (props) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
            <path d="M22 12s0-3.2-.4-4.7c-.3-.9-.9-1.6-1.8-1.9C18.3 5 12 5 12 5s-6.3 0-7.8.4c-.9.3-1.5 1-1.8 1.9C2 8.8 2 12 2 12s0 3.2.4 4.7c.3.9.9 1.6 1.8 1.9C5.7 19 12 19 12 19s6.3 0 7.8-.4c.9-.3 1.5-1 1.8-1.9.4-1.5.4-4.7.4-4.7ZM10 15.2V8.8L15.5 12 10 15.2Z" />
        </svg>
    ),
};

/* =========================================================================
   ANIMATION VARIANTS
   ========================================================================= */

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* =========================================================================
   WAVEFORM VISUAL (reprises the audio-episode motif from Hero.js)
   ========================================================================= */

function Waveform({ seed = [], playing }) {
    const bars = seed.length
        ? seed
        : Array.from({ length: 48 }, (_, i) => 8 + ((i * 37) % 26));

    return (
        <div className="flex h-16 w-full items-center gap-[3px]">
            {bars.map((h, i) => (
                <motion.span
                    key={i}
                    className="w-full flex-1 rounded-full bg-teal/70"
                    style={{ minWidth: 2 }}
                    animate={
                        playing
                            ? { height: [`${h * 0.4}%`, `${h}%`, `${h * 0.4}%`] }
                            : { height: `${Math.max(h * 0.3, 8)}%` }
                    }
                    transition={
                        playing
                            ? { duration: 0.9 + (i % 6) * 0.08, repeat: Infinity, delay: i * 0.02, ease: "easeInOut" }
                            : { duration: 0.3 }
                    }
                />
            ))}
        </div>
    );
}

/* =========================================================================
   STICKY AUDIO PLAYER BAR
   ========================================================================= */

function AudioPlayerBar({ meta }) {
    const [playing, setPlaying] = useState(false);
    const [progress, setProgress] = useState(0.18);

    useEffect(() => {
        if (!playing) return;
        const timer = setInterval(() => {
            setProgress((p) => (p >= 1 ? 1 : p + 0.004));
        }, 250);
        return () => clearInterval(timer);
    }, [playing]);

    return (
        <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="sticky top-0 z-30 border-b border-white/10 bg-navy/95 px-4 py-3 backdrop-blur sm:px-8 lg:px-14"
        >
            <div className="mx-auto flex max-w-4xl items-center gap-4">
                <button
                    onClick={() => setPlaying((p) => !p)}
                    aria-label={playing ? "Pause" : "Play"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal text-navy transition-transform hover:scale-105"
                >
                    {playing ? <PauseIcon /> : <PlayIcon />}
                </button>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">{meta?.title}</p>
                    <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            className="h-full rounded-full bg-teal"
                            style={{ width: `${progress * 100}%` }}
                        />
                    </div>
                </div>
                <span className="hidden shrink-0 font-mono text-[11px] text-slate/60 sm:block">
                    {meta?.duration}
                </span>
            </div>
        </motion.div>
    );
}

/* =========================================================================
   TABLE OF CONTENTS (scrollspy)
   ========================================================================= */

function TableOfContents({ sections, activeId, onJump }) {
    if (!sections?.length) return null;
    return (
        <nav className="sticky top-24 hidden w-56 shrink-0 lg:block">
            <p className="text-[11px] font-medium uppercase tracking-widest text-slate/50">In this episode</p>
            <ul className="mt-4 space-y-3 border-l border-black/5 pl-4">
                {sections.map((s) => {
                    const isActive = s.id === activeId;
                    return (
                        <li key={s.id}>
                            <button
                                onClick={() => onJump(s.id)}
                                className={`text-left text-sm transition-colors ${
                                    isActive ? "font-medium text-teal" : "text-slate hover:text-ink"
                                }`}
                            >
                                {s.heading}
                            </button>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

/* =========================================================================
   PULL QUOTE + STAT CALLOUT
   ========================================================================= */

function PullQuote({ quote, attribution }) {
    return (
        <motion.blockquote
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative my-10 rounded-2xl border border-black/5 bg-white px-8 py-8 shadow-sm sm:px-10"
        >
            <span className="absolute -top-3 left-8 text-teal/30">
                <QuoteMark />
            </span>
            <p className="font-heading text-xl font-semibold leading-snug text-ink sm:text-2xl">{quote}</p>
            {attribution && <p className="mt-4 text-sm text-slate">— {attribution}</p>}
        </motion.blockquote>
    );
}

function StatCallout({ stats }) {
    if (!stats?.length) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="my-10 grid gap-4 rounded-2xl bg-navy p-6 text-white sm:grid-cols-3 sm:p-8"
        >
            {stats.map((stat) => (
                <div key={stat.label}>
                    <p className="font-heading text-3xl font-bold text-teal">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-slate/70">{stat.label}</p>
                </div>
            ))}
        </motion.div>
    );
}

/* =========================================================================
   KEY TAKEAWAYS
   ========================================================================= */

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function KeyTakeaways({ items }) {
    if (!items?.length) return null;
    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-2xl border border-black/5 bg-[#fafafa] p-6 sm:p-8"
        >
            <p className="text-[11px] font-medium uppercase tracking-widest text-teal">Key takeaways</p>
            <ul className="mt-4 space-y-3">
                {items.map((item) => (
                    <motion.li key={item} variants={rise} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                            <CheckIcon />
                        </span>
                        <span className="text-sm leading-relaxed text-slate">{item}</span>
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

/* =========================================================================
   TRANSCRIPT ACCORDION
   ========================================================================= */

function TranscriptAccordion({ transcript }) {
    const [open, setOpen] = useState(false);
    if (!transcript?.length) return null;

    return (
        <div className="mt-14 rounded-2xl border border-black/5 bg-white">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between px-6 py-5 text-left sm:px-8"
            >
                <span>
                    <span className="block font-heading text-lg font-semibold text-ink">Read the transcript</span>
                    <span className="block text-xs text-slate/60">{transcript.length} segments · lightly edited for clarity</span>
                </span>
                <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-slate">
                    <ChevronDown />
                </motion.span>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden border-t border-black/5"
                    >
                        <div className="max-h-[480px] space-y-5 overflow-y-auto px-6 py-6 sm:px-8">
                            {transcript.map((line, i) => (
                                <div key={i} className="flex gap-4">
                                    <span className="w-12 shrink-0 pt-0.5 font-mono text-[11px] text-teal/70">
                                        {line.time}
                                    </span>
                                    <div>
                                        <p className="text-xs font-semibold text-ink">{line.speaker}</p>
                                        <p className="mt-1 text-sm leading-relaxed text-slate">{line.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* =========================================================================
   AUTHOR CARD
   ========================================================================= */

function AuthorCard({ author }) {
    if (!author) return null;
    return (
        <div className="mt-14 flex items-start gap-4 rounded-2xl border border-black/5 bg-[#fafafa] p-6 sm:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={author.avatarUrl}
                alt={author.name}
                className="h-14 w-14 shrink-0 rounded-full object-cover"
            />
            <div>
                <p className="font-heading text-base font-semibold text-ink">{author.name}</p>
                <p className="text-xs text-slate/60">{author.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate">{author.bio}</p>
            </div>
        </div>
    );
}

/* =========================================================================
   SHARE BAR
   ========================================================================= */

function ShareBar() {
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        if (typeof window !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href).catch(() => {});
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    }

    return (
        <div className="flex items-center gap-2">
            <span className="hidden text-[11px] uppercase tracking-widest text-slate/50 sm:block">Share</span>
            <button
                onClick={handleCopy}
                className="flex h-8 items-center gap-1.5 rounded-full border border-black/10 px-3 text-xs text-slate transition-colors hover:border-teal hover:text-teal"
            >
                <LinkIcon />
                {copied ? "Copied" : "Copy link"}
            </button>
            <button
                aria-label="Share"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-slate transition-colors hover:border-teal hover:text-teal"
            >
                <ShareIcon />
            </button>
        </div>
    );
}

/* =========================================================================
   RELATED EPISODE CARD
   ========================================================================= */

function RelatedCard({ episode }) {
    return (
        <motion.a
            href={episode.href || "#"}
            variants={rise}
            whileHover={{ y: -4 }}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-lg"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={episode.imageUrl}
                    alt={episode.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                <span className="absolute bottom-3 right-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/80">
                    {episode.duration}
                </span>
            </div>
            <div className="p-5">
                <h4 className="font-heading text-base font-semibold leading-snug text-white">{episode.title}</h4>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{episode.excerpt}</p>
                <span className="mt-3 flex items-center gap-1.5 text-xs font-medium text-teal opacity-0 transition-opacity group-hover:opacity-100">
                    Listen now <ArrowIcon size={10} />
                </span>
            </div>
        </motion.a>
    );
}

/* =========================================================================
   NEWSLETTER CTA
   ========================================================================= */

function NewsletterCta() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    }

    return (
        <div className="rounded-2xl bg-navy p-8 text-white sm:p-10">
            <p className="font-mono text-xs tracking-widest text-teal/80">DEVORA UNSCRIPTED</p>
            <h3 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
                New episodes, straight to your inbox.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                No spam, no drip campaigns — just an email whenever we publish something worth fifteen minutes.
            </p>
            {submitted ? (
                <p className="mt-6 text-sm text-teal">You&apos;re on the list — first episode lands in your inbox soon.</p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate/50 focus:border-teal focus:outline-none"
                    />
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                    >
                        Subscribe
                        <ArrowIcon />
                    </motion.button>
                </form>
            )}
        </div>
    );
}

/* =========================================================================
   BACK TO TOP
   ========================================================================= */

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        function onScroll() {
            setVisible(window.scrollY > 900);
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    aria-label="Back to top"
                    className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-teal text-navy shadow-xl"
                >
                    <ArrowUp />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */

export default function JournalArticle() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeSection, setActiveSection] = useState(null);
    const [playing, setPlaying] = useState(false);
    const reduce = useReducedMotion();
    const sectionRefs = useRef({});

    useEffect(() => {
        fetch(`${API_URL}/api/journal`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((json) => {
                setData(json);
                setActiveSection(json?.sections?.[0]?.id ?? null);
            })
            .catch((err) =>
                setError(`Could not load journal entry: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    useEffect(() => {
        if (!data?.sections?.length) return;
        function onScroll() {
            let current = data.sections[0].id;
            for (const s of data.sections) {
                const el = sectionRefs.current[s.id];
                if (el && el.getBoundingClientRect().top < 160) {
                    current = s.id;
                }
            }
            setActiveSection(current);
        }
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [data]);

    const platformBadges = useMemo(() => {
        if (!data?.listenOn) return [];
        return data.listenOn;
    }, [data]);

    function jumpTo(id) {
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (error) {
        return (
            <section className="bg-navy px-6 py-24 text-white">
                <div className="mx-auto max-w-6xl">
                    <p className="max-w-md text-sm text-teal">{error}</p>
                </div>
            </section>
        );
    }

    if (!data) {
        return <section className="min-h-[800px] bg-navy" />;
    }

    const {
        meta = {},
        waveform = [],
        listenOn = [],
        keyTakeaways = [],
        sections = [],
        transcript = [],
        author = null,
        relatedEpisodes = [],
    } = data;

    return (
        <>
            {/* Sticky mini player, appears once user is scrolled past hero */}
            <AudioPlayerBar meta={{ title: meta?.title, duration: meta?.duration }} />

            {/* ---------------- Hero ---------------- */}
            <section className="relative overflow-hidden bg-navy px-6 pb-16 pt-14 text-white sm:px-10 lg:px-14">
                <motion.div
                    className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative mx-auto max-w-4xl">
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-xs tracking-widest text-teal/80"
                    >
                        {meta?.eyebrow}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 whitespace-pre-line font-heading text-3xl font-bold leading-[1.15] sm:text-5xl"
                    >
                        {meta?.title}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-5 max-w-2xl text-base leading-relaxed text-slate"
                    >
                        {meta?.subtitle}
                    </motion.p>

                    <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate/60">
                        <span>{meta?.author}</span>
                        <span className="h-1 w-1 rounded-full bg-slate/40" />
                        <span>{meta?.publishedAt}</span>
                        <span className="h-1 w-1 rounded-full bg-slate/40" />
                        <span className="flex items-center gap-1.5">
                            <ClockIcon /> {meta?.duration}
                        </span>
                    </div>

                    {/* Player card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-5">
                            <button
                                onClick={() => setPlaying((p) => !p)}
                                aria-label={playing ? "Pause" : "Play"}
                                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-teal text-navy transition-transform hover:scale-105"
                            >
                                {playing ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
                            </button>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-white">{meta?.title}</p>
                                <p className="text-xs text-slate/60">{meta?.showName || "DEVORA UNSCRIPTED"}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <Waveform seed={waveform} playing={playing} />
                        </div>

                        {platformBadges.length > 0 && (
                            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                                <span className="text-[11px] uppercase tracking-widest text-slate/50">Listen on</span>
                                {platformBadges.map((p) => {
                                    const Icon = PLATFORM_ICONS[p.id] || PLATFORM_ICONS.spotify;
                                    return (
                                        <a
                                            key={p.id}
                                            href={p.href || "#"}
                                            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs text-white/80 transition-colors hover:border-teal hover:text-teal"
                                        >
                                            <Icon className="h-3.5 w-3.5" />
                                            {p.label}
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* ---------------- Body: TOC + long-form content ---------------- */}
            <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto flex max-w-5xl gap-12">
                    <TableOfContents sections={sections} activeId={activeSection} onJump={jumpTo} />

                    <article className="w-full max-w-2xl">
                        <KeyTakeaways items={keyTakeaways} />

                        {sections.map((section) => (
                            <div
                                key={section.id}
                                ref={(el) => (sectionRefs.current[section.id] = el)}
                                className="mt-14 scroll-mt-28"
                            >
                                <h2 className="font-heading text-2xl font-bold text-ink sm:text-[1.75rem]">
                                    {section.heading}
                                </h2>
                                <div className="mt-5 space-y-5">
                                    {section.paragraphs?.map((p, i) => (
                                        <p key={i} className="text-base leading-relaxed text-slate">
                                            {p}
                                        </p>
                                    ))}
                                </div>

                                {section.pullQuote && (
                                    <PullQuote quote={section.pullQuote.quote} attribution={section.pullQuote.attribution} />
                                )}
                                {section.statCallout && <StatCallout stats={section.statCallout} />}
                                {section.image && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.97 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.5 }}
                                        className="my-10 overflow-hidden rounded-2xl border border-black/5"
                                    >
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={section.image.url} alt={section.image.alt || ""} className="w-full object-cover" />
                                        {section.image.caption && (
                                            <p className="bg-[#fafafa] px-4 py-2.5 text-xs text-slate/60">
                                                {section.image.caption}
                                            </p>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        ))}

                        <TranscriptAccordion transcript={transcript} />
                        <AuthorCard author={author} />

                        <div className="mt-10 flex items-center justify-between border-t border-black/5 pt-6">
                            <ShareBar />
                        </div>
                    </article>
                </div>
            </section>

            {/* ---------------- Related episodes ---------------- */}
            {relatedEpisodes?.length > 0 && (
                <section className="bg-navy px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                    <div className="mx-auto max-w-5xl">
                        <div className="flex items-center justify-between">
                            <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">
                                More from the journal
                            </h2>
                            <a href="/resources" className="flex items-center gap-1.5 text-sm font-medium text-teal">
                                View all <ArrowIcon size={10} />
                            </a>
                        </div>
                        <motion.div
                            variants={reduce ? undefined : container}
                            initial={reduce ? undefined : "hidden"}
                            whileInView={reduce ? undefined : "show"}
                            viewport={{ once: true, amount: 0.2 }}
                            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {relatedEpisodes.map((ep) => (
                                <RelatedCard key={ep.id} episode={ep} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ---------------- Newsletter ---------------- */}
            <section className="bg-[#fafafa] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <NewsletterCta />
                </div>
            </section>

            <BackToTop />
        </>
    );
}