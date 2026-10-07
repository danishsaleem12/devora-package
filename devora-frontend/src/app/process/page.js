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
function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.2L4.8 8.5L9.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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

/* ---------------- Timeline step ---------------- */

function ProcessStep({ step, index, isLast }) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-6 sm:gap-10"
        >
            {/* Rail: number + connecting line */}
            <div className="flex flex-col items-center">
                <motion.span
                    initial={{ scale: 0.6, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-teal/30 bg-navy font-mono text-lg font-bold text-teal shadow-lg"
                >
                    {step.number}
                </motion.span>
                {!isLast && (
                    <div className="relative mt-2 w-px flex-1 overflow-hidden bg-black/10">
                        <motion.div
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-px bg-teal/50"
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className={`w-full pb-16 ${isLast ? "" : ""}`}>
                <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-heading text-2xl font-bold text-ink sm:text-[1.75rem]">
                        {step.title}
                    </h3>
                    {step.duration && (
                        <span className="rounded-full bg-teal/10 px-3 py-1 text-[11px] font-medium tracking-wide text-teal">
                            {step.duration}
                        </span>
                    )}
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
                    {step.description}
                </p>

                {step.deliverables?.length > 0 && (
                    <div className={`mt-6 grid gap-2.5 sm:grid-cols-2 ${isEven ? "" : ""}`}>
                        {step.deliverables.map((item) => (
                            <div key={item} className="flex items-start gap-2.5">
                                <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                                    <CheckIcon />
                                </span>
                                <span className="text-sm text-slate">{item}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}

/* ---------------- Principle card ---------------- */

function PrincipleCard({ principle }) {
    return (
        <motion.div variants={rise} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="text-base font-semibold text-ink">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate">{principle.description}</p>
        </motion.div>
    );
}

/* ---------------- Main page ---------------- */

export default function Process() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/process`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load process page: ${err.message}. Is the backend running on ${API_URL}?`)
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

    const { eyebrow, heading, subheading, stats, steps, principlesHeading, principles } = data;

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
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
                    >
                        {subheading}
                    </motion.p>

                    {stats?.length > 0 && (
                        <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
                            {stats.map((stat) => (
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

            {/* Timeline */}
            <section className="bg-[#fafafa] px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
                <div className="mx-auto max-w-3xl">
                    {steps.map((step, i) => (
                        <ProcessStep key={step.id} step={step} index={i} isLast={i === steps.length - 1} />
                    ))}
                </div>
            </section>

            {/* Principles */}
            {principles?.length > 0 && (
                <section className="bg-paper px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
                    <motion.div
                        variants={reduce ? undefined : container}
                        initial={reduce ? undefined : "hidden"}
                        whileInView={reduce ? undefined : "show"}
                        viewport={{ once: true, amount: 0.2 }}
                        className="mx-auto max-w-6xl"
                    >
                        <motion.h2
                            variants={rise}
                            className="font-heading text-3xl font-semibold text-ink sm:text-4xl"
                        >
                            {principlesHeading || "How we keep it consistent"}
                        </motion.h2>
                        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {principles.map((p) => (
                                <PrincipleCard key={p.title} principle={p} />
                            ))}
                        </div>
                    </motion.div>
                </section>
            )}

            {/* CTA */}
            <section className="bg-navy px-6 py-16 text-center text-white sm:py-20">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">Ready to see it in action?</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-slate">
                    Let&apos;s walk through how this process would apply to your project.
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