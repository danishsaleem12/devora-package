"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function InclusionStats() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        apiFetch("inclusion-stats")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="px-4 py-6 sm:px-8 lg:px-12"><div className="min-h-[200px] rounded-3xl bg-navy" /></div>;

    const { tag, heading, subheading, stats } = data;

    return (
        <section className="bg-white px-4 py-6 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-3xl bg-navy p-6 sm:p-8 lg:p-10"
            >
                <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
                    <div>
                        <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                            {tag}
                        </motion.span>
                        <motion.h2
                            variants={rise}
                            className="mt-2 whitespace-pre-line font-heading text-2xl font-semibold leading-tight text-white sm:text-3xl"
                        >
                            {heading}
                        </motion.h2>
                        <motion.p variants={rise} className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                            {subheading}
                        </motion.p>
                    </div>

                    <motion.div variants={rise} className="grid grid-cols-2 gap-3">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:bg-white/[0.06]"
                            >
                                <div className="font-heading text-xl font-semibold text-teal">{stat.value}</div>
                                <div className="mt-1 text-xs leading-snug text-slate">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}