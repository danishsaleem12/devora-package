"use client";

import { apiFetch } from "@/lib/api";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";


const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function SpaceCard({ s }) {
    return (
        <motion.div variants={rise} className="overflow-hidden rounded-xl border border-black/10 bg-white">
            <div className="aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-navy to-teal/20">
                {/* Replace with <img src={s.src} alt={s.title} className="h-full w-full object-cover" /> */}
            </div>
            <div className="px-4 py-3">
                <h3 className="text-sm font-semibold text-ink">{s.title}</h3>
                <p className="mt-0.5 text-xs text-slate">{s.caption}</p>
            </div>
        </motion.div>
    );
}

export default function SpacesAmenities() {
    const [data, setData] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        apiFetch("spaces-amenities")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[600px] bg-paper" />;

    const { tag, heading, subheading, spaces } = data;

    return (
        <section className="bg-paper px-4 py-16 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.15 }}
                className="rounded-3xl border border-black/10 bg-white p-6 sm:p-8 lg:p-10"
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

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {spaces.map((s) => (
                        <SpaceCard key={s.id} s={s} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
}