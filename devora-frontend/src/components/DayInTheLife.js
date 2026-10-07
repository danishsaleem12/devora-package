"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function MomentCard({ m }) {
    return (
        <motion.div variants={rise} className="flex flex-col items-center text-center">
            <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 text-[10px] font-medium text-teal">
                {m.time}
            </span>

            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-gradient-to-br from-navy to-teal/20">
                {/* Replace with <img src={m.src} alt={m.title} className="h-full w-full object-cover" /> */}
            </div>

            <h3 className="mt-3 text-sm font-medium text-ink">{m.title}</h3>
            <p className="mt-1 text-xs text-slate">{m.caption}</p>
        </motion.div>
    );
}

export default function DayInTheLife() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/day-in-the-life`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[420px] bg-white" />;

    const { tag, heading, subheading, moments } = data;

    return (
        <section className="bg-white px-4 py-16 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.span variants={rise} className="text-xs font-medium tracking-wide text-teal">
                    {tag.toUpperCase()}
                </motion.span>
                <motion.h2 variants={rise} className="mt-2 max-w-2xl font-heading text-3xl font-semibold text-ink sm:text-4xl">
                    {heading}
                </motion.h2>
                <motion.p variants={rise} className="mt-3 max-w-2xl text-sm leading-relaxed text-slate">
                    {subheading}
                </motion.p>

                <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-7 lg:gap-4">
                    {moments.map((m) => (
                        <MomentCard key={m.id} m={m} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}