"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------- Mini bar chart (reused pattern from Hero's DashboardVisual) ---------------- */

function MiniBars({ bars }) {
    const max = Math.max(...bars);
    return (
        <div className="flex h-10 items-end gap-1">
            {bars.map((v, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${(v / max) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: "easeOut" }}
                    className={`flex-1 rounded-sm ${i >= bars.length - 2 ? "bg-teal" : "bg-navy/15"}`}
                />
            ))}
        </div>
    );
}

/* ---------------- Case study card ---------------- */

function CaseStudyCard({ study }) {
    return (
        <motion.a
            href={study.href || "#"}
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
            <div className="relative aspect-[16/9] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={study.imageUrl}
                    alt={study.client}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{study.client}</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white/80">
                        {study.industry}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                    <h3 className="max-w-[75%] font-heading text-lg font-semibold leading-snug text-ink">
                        {study.headline}
                    </h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-slate transition-colors group-hover:border-teal group-hover:text-teal">
                        <ArrowIcon />
                    </span>
                </div>

                <div className="mt-5 flex items-end justify-between gap-4">
                    <div>
                        <p className="font-heading text-3xl font-bold text-teal">{study.resultValue}</p>
                        <p className="mt-0.5 text-[11px] uppercase tracking-widest text-slate/60">
                            {study.resultLabel}
                        </p>
                    </div>
                    {study.bars?.length > 0 && <div className="w-24"><MiniBars bars={study.bars} /></div>}
                </div>

                {(study.stat1 || study.stat2) && (
                    <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4">
                        {study.stat1 && (
                            <div>
                                <p className="text-base font-bold text-ink">{study.stat1.value}</p>
                                <p className="text-[11px] text-slate">{study.stat1.label}</p>
                            </div>
                        )}
                        {study.stat2 && (
                            <div>
                                <p className="text-base font-bold text-ink">{study.stat2.value}</p>
                                <p className="text-[11px] text-slate">{study.stat2.label}</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </motion.a>
    );
}

/* ---------------- Main page ---------------- */

export default function CaseStudies() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/case-studies`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load case studies: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

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

    const { eyebrow, heading, subheading, aggregateStats, caseStudies } = data;

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
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
                    >
                        {subheading}
                    </motion.p>

                    {aggregateStats?.length > 0 && (
                        <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                            {aggregateStats.map((stat) => (
                                <div key={stat.label}>
                                    <p className="font-heading text-2xl font-bold text-teal sm:text-3xl">
                                        {stat.value}
                                    </p>
                                    <p className="mt-1 text-[11px] leading-snug text-slate/70">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Grid */}
            <section className="bg-[#fafafa] px-4 py-14 sm:px-8 lg:px-12">
                <motion.div
                    variants={reduce ? undefined : container}
                    initial={reduce ? undefined : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={{ once: true, amount: 0.1 }}
                    className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {caseStudies.map((study) => (
                        <CaseStudyCard key={study.id} study={study} />
                    ))}
                </motion.div>
            </section>

            {/* CTA */}
            <section className="bg-navy px-6 py-16 text-center text-white sm:py-20">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">Want numbers like these?</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-slate">
                    Tell us what you're building and we'll show you what to measure from day one.
                </p>
                <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                >
                    <ArrowIcon />
                    Start a Project
                </motion.a>
            </section>
        </>
    );
}