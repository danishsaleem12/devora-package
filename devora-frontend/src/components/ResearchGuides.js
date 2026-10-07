"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

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
function DownloadIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8m0 0 3-3m-3 3-3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function DocIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M4 1.5h5l3 3v10H4v-13Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M9 1.5V4.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
    );
}
function CloseIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M3 3l10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------- Email-gate modal ---------------- */

function EmailGateModal({ guide, onClose }) {
    const [email, setEmail] = useState("");
    const [unlocked, setUnlocked] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setUnlocked(true);
    }

    if (!guide) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 px-4 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.25 }}
                className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            >
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-slate transition-colors hover:bg-black/5 hover:text-ink"
                >
                    <CloseIcon />
                </button>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/10 text-teal">
                    <DocIcon />
                </span>
                <h3 className="mt-4 font-heading text-xl font-bold text-ink">{guide.title}</h3>

                {unlocked ? (
                    <div className="mt-5">
                        <p className="text-sm text-slate">You&apos;re in — your download is ready.</p>
                        <motion.a
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            href={guide.href || "#"}
                            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                        >
                            <DownloadIcon />
                            Download {guide.format || "PDF"}
                        </motion.a>
                    </div>
                ) : (
                    <>
                        <p className="mt-2 text-sm leading-relaxed text-slate">
                            Enter your email and we&apos;ll unlock the download — no spam, just this.
                        </p>
                        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
                            <input
                                type="email"
                                required
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@company.com"
                                className="w-full rounded-md border border-black/10 px-4 py-3 text-sm text-ink placeholder:text-slate/50 focus:border-teal focus:outline-none"
                            />
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                className="flex items-center justify-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                            >
                                Get the guide
                                <ArrowIcon />
                            </motion.button>
                        </form>
                    </>
                )}
            </motion.div>
        </div>
    );
}

/* ---------------- Featured guide ---------------- */

function FeaturedGuide({ guide, onDownload }) {
    if (!guide) return null;
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="grid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm lg:grid-cols-2"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={guide.imageUrl} alt={guide.title} className="h-full w-full object-cover" />
                {guide.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-[11px] font-medium text-navy">
                        {guide.tag}
                    </span>
                )}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="text-[11px] font-medium uppercase tracking-widest text-teal">Featured guide</span>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    {guide.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">{guide.description}</p>
                <div className="mt-5 flex items-center gap-2 text-xs text-slate/60">
                    <DocIcon />
                    <span>{guide.pages ? `${guide.pages} pages` : guide.format}</span>
                    <span className="h-1 w-1 rounded-full bg-slate/40" />
                    <span>{guide.format || "PDF"}</span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onDownload(guide)}
                    className="mt-6 flex w-fit items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                >
                    <DownloadIcon />
                    Download free
                </motion.button>
            </div>
        </motion.div>
    );
}

/* ---------------- Guide card ---------------- */

function GuideCard({ guide, onDownload }) {
    return (
        <motion.div
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={guide.imageUrl}
                    alt={guide.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {guide.tag && (
                    <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-2.5 py-1 text-[11px] font-medium text-white">
                        {guide.tag}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-ink">{guide.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{guide.description}</p>

                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate/60">
                        <DocIcon />
                        {guide.pages ? `${guide.pages} pages` : guide.format || "PDF"}
                    </span>
                    <button
                        onClick={() => onDownload(guide)}
                        className="flex items-center gap-1.5 text-xs font-medium text-teal transition-opacity hover:opacity-70"
                    >
                        <DownloadIcon />
                        Download
                    </button>
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
            <p className="font-mono text-xs tracking-widest text-teal/80">RESEARCH & GUIDES</p>
            <h3 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
                Get every new guide first.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                We publish a new guide every few weeks — no spam, just the download link when it's ready.
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

export default function ResearchGuides() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [activeGuide, setActiveGuide] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/research-guides`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load research guides: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    const {
        eyebrow = "RESEARCH & GUIDES",
        heading = "Frameworks and playbooks\nworth keeping on hand.",
        subheading = "",
        categories = [],
        featured = null,
        guides = [],
    } = data || {};

    const categoryList = useMemo(
        () => (categories.length ? ["All", ...categories] : ["All"]),
        [categories]
    );

    const filteredGuides = useMemo(
        () => (activeCategory === "All" ? guides : guides.filter((g) => g.tag === activeCategory)),
        [guides, activeCategory]
    );

    const visibleGuides = filteredGuides.slice(0, visibleCount);
    const hasMore = visibleCount < filteredGuides.length;

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
                    className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
                    animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
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
                </div>
            </section>

            {/* Featured + grid */}
            <section className="bg-[#fafafa] px-4 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <FeaturedGuide guide={featured} onDownload={setActiveGuide} />

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        {categoryList.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeCategory === cat
                                        ? "bg-navy text-white"
                                        : "bg-white text-slate hover:bg-navy/5"
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
                        {visibleGuides.map((guide) => (
                            <GuideCard key={guide.id} guide={guide} onDownload={setActiveGuide} />
                        ))}
                    </motion.div>

                    {visibleGuides.length === 0 && (
                        <p className="mt-10 text-center text-sm text-slate">No guides in this category yet.</p>
                    )}

                    {hasMore && (
                        <div className="mt-10 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                className="rounded-md border border-navy/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal"
                            >
                                Load more guides
                            </motion.button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <NewsletterCta />
                </div>
            </section>

            <AnimatePresence>
                {activeGuide && <EmailGateModal guide={activeGuide} onClose={() => setActiveGuide(null)} />}
            </AnimatePresence>
        </>
    );
}