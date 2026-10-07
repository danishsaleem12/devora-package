"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PAGE_SIZE = 6;

/* ---------------- Icons ---------------- */

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function PlayIcon({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2.5v11l10-5.5-10-5.5Z" />
        </svg>
    );
}
function PauseIcon({ size = 14 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 16 16" fill="currentColor">
            <rect x="3.5" y="2.5" width="3" height="11" rx="0.5" />
            <rect x="9.5" y="2.5" width="3" height="11" rx="0.5" />
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.6V8l2.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
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

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------- Waveform (shared motif with Hero + Journal) ---------------- */

function Waveform({ seed = [], playing, compact = false }) {
    const bars = seed.length ? seed : Array.from({ length: compact ? 20 : 40 }, (_, i) => 8 + ((i * 37) % 26));
    return (
        <div className={`flex items-center gap-[2px] ${compact ? "h-6" : "h-12"}`}>
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

/* ---------------- Featured episode player ---------------- */

function FeaturedEpisode({ episode }) {
    const [playing, setPlaying] = useState(false);
    if (!episode) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-2xl"
        >
            <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={episode.imageUrl} alt={episode.title} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent lg:bg-gradient-to-r" />
                    {episode.episodeNumber && (
                        <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-[11px] font-medium text-navy">
                            EP {episode.episodeNumber}
                        </span>
                    )}
                </div>
                <div className="flex flex-col justify-center p-6 text-white sm:p-8 lg:p-10">
                    <span className="text-[11px] font-medium uppercase tracking-widest text-teal">
                        Latest episode
                    </span>
                    <h2 className="mt-3 font-heading text-2xl font-bold leading-snug sm:text-3xl">
                        {episode.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">{episode.excerpt}</p>

                    <div className="mt-6 flex items-center gap-4">
                        <button
                            onClick={() => setPlaying((p) => !p)}
                            aria-label={playing ? "Pause" : "Play"}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal text-navy transition-transform hover:scale-105"
                        >
                            {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
                        </button>
                        <div className="flex-1">
                            <Waveform seed={episode.waveform} playing={playing} />
                        </div>
                        <span className="shrink-0 font-mono text-[11px] text-slate/60">{episode.duration}</span>
                    </div>

                    <a href={episode.href || "#"} className="mt-6 flex items-center gap-1.5 text-sm font-medium text-teal">
                        View episode details <ArrowIcon />
                    </a>
                </div>
            </div>
        </motion.div>
    );
}

/* ---------------- Episode card ---------------- */

function EpisodeCard({ episode }) {
    const [playing, setPlaying] = useState(false);

    return (
        <motion.div
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-lg"
        >
            <a href={episode.href || "#"} className="relative aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={episode.imageUrl}
                    alt={episode.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                {episode.episodeNumber && (
                    <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] font-medium text-white/80">
                        EP {episode.episodeNumber}
                    </span>
                )}
                {episode.tag && (
                    <span className="absolute right-3 top-3 rounded-full bg-teal/90 px-2.5 py-1 text-[11px] font-medium text-navy">
                        {episode.tag}
                    </span>
                )}
            </a>
            <div className="p-5">
                <h3 className="font-heading text-base font-semibold leading-snug text-white">{episode.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate">{episode.excerpt}</p>

                <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                    <button
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Pause" : "Play"}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors hover:bg-teal hover:text-navy"
                    >
                        {playing ? <PauseIcon size={11} /> : <PlayIcon size={11} />}
                    </button>
                    <div className="flex-1">
                        <Waveform seed={episode.waveform} playing={playing} compact />
                    </div>
                    <span className="shrink-0 font-mono text-[11px] text-slate/60">{episode.duration}</span>
                </div>
            </div>
        </motion.div>
    );
}

/* ---------------- Newsletter CTA ---------------- */

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
                No spam — just an email whenever we publish something worth fifteen minutes.
            </p>
            {submitted ? (
                <p className="mt-6 text-sm text-teal">You&apos;re on the list.</p>
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

/* ---------------- Main component ---------------- */

export default function PodcastIndex() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/podcasts`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load podcast episodes: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    const {
        eyebrow = "DEVORA UNSCRIPTED",
        heading = "Conversations on building\nwithout cutting corners.",
        subheading = "",
        listenOn = [],
        categories = [],
        featured = null,
        episodes = [],
    } = data || {};

    const categoryList = useMemo(
        () => (categories.length ? ["All", ...categories] : ["All"]),
        [categories]
    );

    const filteredEpisodes = useMemo(
        () => (activeCategory === "All" ? episodes : episodes.filter((e) => e.tag === activeCategory)),
        [episodes, activeCategory]
    );

    const visibleEpisodes = filteredEpisodes.slice(0, visibleCount);
    const hasMore = visibleCount < filteredEpisodes.length;

    function handleCategoryChange(cat) {
        setActiveCategory(cat);
        setVisibleCount(PAGE_SIZE);
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
        return <section className="min-h-[640px] bg-navy" />;
    }

    return (
        <>
            {/* Header */}
            <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14">
                <motion.div
                    className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative mx-auto max-w-3xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-xs tracking-widest text-teal/80"
                    >
                        {eyebrow}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl"
                    >
                        {heading}
                    </motion.h1>
                    {subheading && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
                        >
                            {subheading}
                        </motion.p>
                    )}

                    {listenOn.length > 0 && (
                        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                            {listenOn.map((p) => {
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
                </div>
            </section>

            {/* Featured + grid */}
            <section className="bg-navy px-4 pb-20 pt-4 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <FeaturedEpisode episode={featured} />

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        {categoryList.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeCategory === cat
                                        ? "bg-teal text-navy"
                                        : "bg-white/5 text-slate hover:bg-white/10"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeCategory}
                        variants={reduce ? undefined : container}
                        initial={reduce ? undefined : "hidden"}
                        animate={reduce ? undefined : "show"}
                        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {visibleEpisodes.map((episode) => (
                            <EpisodeCard key={episode.id} episode={episode} />
                        ))}
                    </motion.div>

                    {visibleEpisodes.length === 0 && (
                        <p className="mt-10 text-center text-sm text-slate">No episodes in this category yet.</p>
                    )}

                    {hasMore && (
                        <div className="mt-10 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                className="rounded-md border border-white/15 px-6 py-3 text-sm font-medium text-white transition-colors hover:border-teal hover:text-teal"
                            >
                                Load more episodes
                            </motion.button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-[#fafafa] px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <NewsletterCta />
                </div>
            </section>
        </>
    );
}