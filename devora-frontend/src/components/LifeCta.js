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
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function LifeCta() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/life-cta`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[320px] bg-paper" />;

    const { heading, body, ctaLabel, ctaHref } = data;

    return (
        <section className="bg-paper px-4 py-8 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-navy px-6 py-16 text-center sm:px-8 lg:px-12"
            >
                <motion.h2 variants={rise} className="mx-auto max-w-2xl font-heading text-3xl font-semibold text-white sm:text-4xl">
                    {heading}
                </motion.h2>
                <motion.p variants={rise} className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate">
                    {body}
                </motion.p>
                <motion.div variants={rise} className="mt-8">
                    <a
                        href={ctaHref}
                        className="inline-flex items-center gap-1.5 rounded-md bg-white px-5 py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                    >
                        {ctaLabel}
                        <ArrowIcon />
                    </a>
                </motion.div>
            </motion.div>
        </section>
    );
}