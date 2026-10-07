"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function WorkforceDiversity() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/workforce-diversity`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[320px] bg-paper" />;

    const { tag, heading, subheading, stats } = data;

    return (
        <section className="bg-paper px-4 py-8 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-navy p-6 sm:p-8 lg:p-10"
            >
                <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                    {tag.toUpperCase()}
                </motion.span>
                <motion.h2 variants={rise} className="mt-2 font-heading text-3xl font-semibold text-white sm:text-4xl">
                    {heading}
                </motion.h2>
                <motion.p variants={rise} className="mt-3 max-w-xl text-sm leading-relaxed text-slate">
                    {subheading}
                </motion.p>

                <motion.div variants={rise} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((s) => (
                        <div
                            key={s.label}
                            className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-6 text-center"
                        >
                            <div className="font-heading text-3xl font-bold text-teal">{s.value}</div>
                            <div className="mt-2 text-xs leading-relaxed text-slate">{s.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    );
}