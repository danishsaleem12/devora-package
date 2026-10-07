"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LifeAtDevoraHero() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/life-at-devora-hero`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[45vh] bg-navy" />;

    const { tag, headline, subheadline, primaryCta, secondaryCta, stats } = data;

    const handleAnchorClick = (e, href) => {
        if (href?.startsWith("#")) {
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <section className="relative flex min-h-[45vh] items-center overflow-hidden bg-navy px-6 py-8 sm:px-12 lg:px-20">
            <div
                aria-hidden
                className="pointer-events-none absolute -top-24 right-0 h-[280px] w-[280px] rounded-full bg-teal/10 blur-3xl"
            />

            <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="relative grid w-full items-center gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10"
            >
                {/* Left column */}
                <div>
                    <motion.span
                        variants={rise}
                        className="mb-3 inline-flex w-fit items-center rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-xs text-teal"
                    >
                        {tag}
                    </motion.span>

                    <motion.h1
                        variants={rise}
                        className="whitespace-pre-line font-heading text-2xl font-bold leading-[1.15] text-white sm:text-3xl"
                    >
                        {headline}
                    </motion.h1>

                    <motion.p variants={rise} className="mt-3 max-w-sm text-sm leading-relaxed text-slate">
                        {subheadline}
                    </motion.p>

                    <motion.div variants={rise} className="mt-5 flex flex-wrap items-center gap-3">
                        <a
                            href={primaryCta.href}
                            onClick={(e) => handleAnchorClick(e, primaryCta.href)}
                            className="flex items-center gap-1.5 rounded-md bg-teal px-4 py-2 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                        >
                            <ArrowIcon />
                            {primaryCta.label}
                        </a>
                        <a
                            href={secondaryCta.href}
                            onClick={(e) => handleAnchorClick(e, secondaryCta.href)}
                            className="flex items-center gap-2 rounded-md border border-white/15 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/5"
                        >
                            {secondaryCta.label}
                            <ArrowIcon />
                        </a>
                    </motion.div>

                    <motion.div variants={rise} className="mt-6 flex gap-8 border-t border-white/10 pt-4">
                        {stats.map((s) => (
                            <div key={s.label}>
                                <div className="font-heading text-lg font-bold text-white">{s.value}</div>
                                <div className="mt-1 max-w-[8rem] text-xs leading-relaxed text-slate">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right column — single image, capped size */}
                <motion.div
                    variants={rise}
                    className="ml-auto aspect-[4/3] w-full max-w-xs overflow-hidden rounded-xl bg-gradient-to-br from-teal/25 to-white/5 sm:max-w-sm"
                >
                    {/* Replace with <img src="/life-at-devora.jpg" alt="Life at Devora" className="h-full w-full object-cover" /> */}
                </motion.div>
            </motion.div>
        </section>
    );
}