"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
                d="M2.5 6.2L4.8 8.5L9.5 3.5"
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
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Benefits() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        apiFetch("benefits")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[400px] bg-paper" />;

    const { tag, heading, categories } = data;

    return (
        <section className="bg-paper">
            {/* Abstract banner instead of a stock photo strip */}
            <div className="h-16 w-full bg-[linear-gradient(120deg,#0a1628_0%,#0d3b3e_45%,#2dd4bf_100%)] sm:h-20" />

            <div className="px-4 py-10 sm:px-8 lg:px-12">
                <motion.div
                    variants={reduce ? undefined : container}
                    initial={reduce ? undefined : "hidden"}
                    whileInView={reduce ? undefined : "show"}
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                        {tag}
                    </motion.span>
                    <motion.h2 variants={rise} className="mt-2 font-heading text-3xl font-semibold text-ink sm:text-4xl">
                        {heading}
                    </motion.h2>

                    <div className="mt-8 grid gap-4 lg:grid-cols-3">
                        {categories.map((cat) => (
                            <motion.div key={cat.title} variants={rise} className="rounded-2xl bg-white p-6">
                                <h3 className="text-base font-semibold text-ink">{cat.title}</h3>
                                <div className="mt-3 divide-y divide-black/5 border-t border-black/5">
                                    {cat.items.map((item) => (
                                        <div
                                            key={item}
                                            className="group flex items-center gap-2.5 py-3 transition-colors"
                                        >
                                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                                                <CheckIcon />
                                            </span>
                                            <span className="text-sm text-slate transition-colors group-hover:text-ink">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}