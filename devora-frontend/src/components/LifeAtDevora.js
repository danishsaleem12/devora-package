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

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LifeAtDevora() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/life-at-devora`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="px-4 py-6 sm:px-8 lg:px-12"><div className="min-h-[500px] rounded-3xl bg-navy" /></div>;

    const { tag, heading, subheading, ctaLabel, ctaHref, stories } = data;

    return (
        <section className="bg-white px-4 py-6 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl bg-navy p-6 sm:p-8 lg:p-10"
            >
                <motion.span
                    variants={rise}
                    className="mb-3 inline-flex w-fit items-center rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-sm text-teal"
                >
                    {tag}
                </motion.span>

                <motion.h2 variants={rise} className="max-w-xl font-heading text-3xl font-semibold text-white sm:text-4xl">
                    {heading}
                </motion.h2>

                <motion.p variants={rise} className="mt-2 max-w-lg text-sm leading-relaxed text-slate">
                    {subheading}
                </motion.p>

                <motion.div variants={rise} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stories.map((story) => (
                        <div key={story.name} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                            <div className="flex aspect-[4/5] items-center justify-center bg-gradient-to-br from-teal/20 to-navy">
                                <span className="font-heading text-4xl font-semibold text-teal">{story.initials}</span>
                            </div>
                            <div className="p-4">
                                <p className="text-sm leading-relaxed text-slate">{story.quote}</p>
                                <div className="mt-3 border-t border-white/10 pt-3">
                                    <div className="text-sm font-medium text-white">{story.name}</div>
                                    <div className="text-xs text-slate">{story.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <motion.div variants={rise} className="mt-6">
                    <a
                        href={ctaHref}
                        className="inline-flex items-center gap-1.5 rounded-md border border-teal/40 px-4 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-teal/10"
                    >
                        {ctaLabel}
                        <ArrowIcon />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}