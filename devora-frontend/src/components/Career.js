//src/components/Career.js

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function PlayIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2.5 1.5L8 5L2.5 8.5V1.5Z" fill="currentColor" />
        </svg>
    );
}

function CompassIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M13 7l-2 5-3 1 2-5 3-1z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
                d="M4 9.5L10 4l6 5.5M6 8.5V16h8V8.5"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

// One orchestrated entrance for the whole hero — everything else stays still.
const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function LearningBar({ value, label, caption }) {
    const reduce = useReducedMotion();
    return (
        <div>
            <div className="mb-2 flex items-baseline justify-between">
                <span className="text-xs text-slate">{label}</span>
                <span className="font-heading text-lg font-semibold text-white">{value}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                    className="h-full rounded-full bg-teal"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${value}%` }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={reduce ? { duration: 0 } : { duration: 1, ease: "easeOut", delay: 0.2 }}
                />
            </div>
            <p className="mt-2 text-xs leading-relaxed text-slate">{caption}</p>
        </div>
    );
}

export default function Career() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/career`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[600px] bg-navy" />;

    const { tag, headline, subheadline, primaryCta, secondaryCta, stats, growthCard, hybridCard, learningCard, quote } = data;

    return (
        <section className="relative overflow-hidden bg-navy px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 right-0 h-[560px] w-[560px] rounded-full bg-teal/10 blur-3xl"
            />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative grid gap-16 lg:grid-cols-2 lg:gap-12"
            >
                {/* Left column */}
                <div className="flex flex-col justify-center">
                    <motion.span
                        variants={rise}
                        className="mb-5 inline-flex w-fit items-center rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-sm text-teal"
                    >
                        {tag}
                    </motion.span>

                    <motion.h1
                        variants={rise}
                        className="whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] text-white sm:text-5xl"
                    >
                        {headline}
                    </motion.h1>

                    <motion.p variants={rise} className="mt-6 max-w-md text-base leading-relaxed text-slate">
                        {subheadline}
                    </motion.p>

                    <motion.div variants={rise} className="mt-8 flex flex-wrap items-center gap-3">
                        <a
                            href={primaryCta.href}
                            className="flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                        >
                            <ArrowIcon />
                            {primaryCta.label}
                        </a>
                        <a
                            href={secondaryCta.href}
                            className="flex items-center gap-2 rounded-md border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <PlayIcon />
                            </span>
                            {secondaryCta.label}
                        </a>
                    </motion.div>

                    <motion.div variants={rise} className="mt-12 flex gap-10 border-t border-white/10 pt-6">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div className="font-heading text-2xl font-bold text-white">{s.value}</div>
                                <div className="mt-1 text-xs text-slate">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right column — card cluster */}
                <motion.div variants={rise} className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/15 text-teal">
                            <CompassIcon />
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-white">{growthCard.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate">{growthCard.body}</p>
                        <div className="mt-4 flex gap-2">
                            {growthCard.tags.map((t) => (
                                <span key={t} className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-teal/15 text-teal">
                            <HomeIcon />
                        </div>
                        <h4 className="text-sm font-semibold text-white">{hybridCard.title}</h4>
                        <p className="mt-1 text-xs leading-relaxed text-slate">{hybridCard.detail}</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <LearningBar value={learningCard.value} label={learningCard.label} caption={learningCard.caption} />
                    </div>

                    <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-6">
                        <p className="text-sm leading-relaxed text-white">"{quote.text}"</p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-teal/20" />
                            <div>
                                <div className="text-sm font-medium text-white">{quote.name}</div>
                                <div className="text-xs text-slate">{quote.role}</div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}