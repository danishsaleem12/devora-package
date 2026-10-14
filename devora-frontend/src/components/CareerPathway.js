//src/components/CareerPathway.js

"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const step = {
    hidden: { opacity: 0, scale: 0.6 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

function PathwayStep({ step: s }) {
    return (
        <motion.div variants={step} className="group relative flex flex-1 flex-col items-center">
            {/* Detail tooltip — appears on hover */}
            <div className="pointer-events-none absolute -top-3 w-48 -translate-y-full rounded-lg border border-black/10 bg-white p-3 text-center opacity-0 shadow-lg transition-all duration-200 group-hover:-translate-y-[calc(100%+10px)] group-hover:opacity-100">
                <p className="text-xs leading-relaxed text-slate">{s.detail}</p>
            </div>

            <motion.div
                whileHover={{ scale: 1.12 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-white shadow-md"
                style={{
                    background: `linear-gradient(135deg, #0d3b3e ${100 - s.number * 12}%, #2dd4bf ${s.number * 20}%)`,
                }}
            >
                <span className="font-heading text-base font-semibold text-white">{s.number}</span>
            </motion.div>

            <h3 className="mt-4 text-center text-sm font-medium text-ink">{s.title}</h3>
            <p className="mt-1 text-xs text-slate">{s.years}</p>
        </motion.div>
    );
}

export default function CareerPathway() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        apiFetch("career-pathway")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[300px] bg-white" />;

    const { tag, heading, steps } = data;

    return (
        <section className="bg-white px-4 py-6 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.3 }}
            >
                <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                    {tag}
                </motion.span>
                <motion.h2 variants={rise} className="mt-2 font-heading text-3xl font-semibold text-ink sm:text-4xl">
                    {heading}
                </motion.h2>

                <div className="relative mt-14 flex items-start">
                    <div className="absolute left-0 right-0 top-7 h-px bg-black/10" aria-hidden />
                    {steps.map((s) => (
                        <PathwayStep key={s.number} step={s} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}