"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const cardVariant = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function HiringProcess() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/hiring-process`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="px-4 py-6 sm:px-8 lg:px-12"><div className="min-h-[300px] rounded-3xl bg-navy" /></div>;

    const { tag, heading, steps } = data;

    return (
        <section className="bg-white px-4 py-6 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
                className="rounded-3xl bg-navy p-6 sm:p-8 lg:p-10"
            >
                <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                    {tag}
                </motion.span>
                <motion.h2 variants={rise} className="mt-2 font-heading text-2xl font-semibold text-white sm:text-3xl">
                    {heading}
                </motion.h2>

                <div className="mt-10 grid gap-4 lg:grid-cols-4">
                    {steps.map((s, i) => (
                        <motion.div key={s.number} variants={cardVariant} className="relative">
                            {/* connector dot + line */}
                            <div className="mb-4 flex items-center">
                                <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-teal" />
                                {i < steps.length - 1 && (
                                    <span className="ml-2 hidden h-px flex-1 bg-white/10 lg:block" />
                                )}
                            </div>

                            <div className="h-full rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.06]">
                                <span className="text-xs font-medium text-teal">{s.number}</span>
                                <h3 className="mt-2 text-sm font-semibold text-white">{s.title}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate">{s.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}