"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ClockIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.6V8l2.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
    );
}

function JournalCard({ article }) {
    return (
        <motion.a
            href={article.href}
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {article.category && (
                    <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-medium text-white">
                        {article.category}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-ink">{article.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{article.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-slate/60">
                    <span>{article.date}</span>
                    <span className="flex items-center gap-1"><ClockIcon /> {article.duration}</span>
                </div>
            </div>
        </motion.a>
    );
}

export default function JournalIndex() {
    const { t, te } = useLanguage();
    const reduce = useReducedMotion();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        apiFetch("journal-articles")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(te("Could not load the journal. Please try again in a moment.", err.message)));
    }, []);

    if (error) {
        return (
            <section className="bg-navy px-6 py-24 text-white">
                <p className="mx-auto max-w-6xl text-sm text-teal">{error}</p>
            </section>
        );
    }
    if (!data) return <section className="min-h-[600px] bg-navy" />;

    const { eyebrow, heading, subheading, categories = [], articles = [] } = data;
    // "All" is compared literally, so it is the one label the backend never translates
    const visible = activeCategory === "All" ? articles : articles.filter((a) => a.category === activeCategory);

    return (
        <>
            <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14">
                <div className="relative mx-auto max-w-3xl text-center">
                    <p className="font-mono text-xs tracking-widest text-teal/80">{eyebrow}</p>
                    <h1 className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl">
                        {heading}
                    </h1>
                    {subheading && (
                        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate">{subheading}</p>
                    )}
                </div>
            </section>

            <section className="bg-[#fafafa] px-4 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeCategory === cat ? "bg-navy text-white" : "bg-white text-slate hover:bg-navy/5"
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
                        {visible.map((a) => (
                            <JournalCard key={a.slug} article={a} />
                        ))}
                    </motion.div>

                    {visible.length === 0 && (
                        <p className="mt-10 text-center text-sm text-slate">{t("No essays in this category yet.")}</p>
                    )}
                </div>
            </section>
        </>
    );
}
