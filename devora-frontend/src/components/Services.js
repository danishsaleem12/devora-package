//src/components/Services.js

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const ACCENTS = {
    teal: { text: "text-teal", glow: "from-teal/30", ring: "group-hover:ring-teal/40" },
    purple: { text: "text-purple-400", glow: "from-purple-500/30", ring: "group-hover:ring-purple-400/40" },
    blue: { text: "text-blue-400", glow: "from-blue-500/30", ring: "group-hover:ring-blue-400/40" },
    orange: { text: "text-orange-400", glow: "from-orange-500/30", ring: "group-hover:ring-orange-400/40" },
};

function ArrowIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const ICONS = {
    layers: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
    spark: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 2v6M12 16v6M4.2 4.2l4.2 4.2M15.6 15.6l4.2 4.2M2 12h6M16 12h6M4.2 19.8l4.2-4.2M15.6 8.4l4.2-4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    grid: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    shift: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M4 7h13M17 7l-3-3M17 7l-3 3M20 17H7M7 17l3-3M7 17l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    server: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    trend: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M3 17l6-6 4 4 8-8M21 7h-5v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
};

function ServiceCard({ item, index }) {
    const accent = ACCENTS[item.accent] || ACCENTS.teal;
    const Icon = ICONS[item.icon] || ICONS.layers;
    const isLarge = item.size === "large";

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 sm:p-7 ${isLarge ? "sm:col-span-2" : ""
                }`}
        >
            <div
                className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br ${accent.glow} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
            />

            <div className="relative flex items-start justify-between">
                <span className={`flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ${accent.text} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-white/20">{String(index + 1).padStart(2, "0")}</span>
            </div>

            <h3 className="relative mt-6 text-lg font-semibold text-white">{item.title}</h3>
            <p className="relative mt-2 max-w-md text-sm leading-relaxed text-slate">{item.description}</p>

            <div className="relative mt-5 flex items-center gap-1.5 text-xs font-medium text-white/0 transition-all duration-300 group-hover:text-white/70">
                Learn more
                <span className="translate-x-0 transition-transform duration-300 group-hover:translate-x-1">
                    <ArrowIcon />
                </span>
            </div>
        </motion.div>
    );
}

export default function Services() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/services`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message));
    }, []);

    if (error) return null;
    if (!data) return <section className="h-[600px] bg-navy" />;

    return (
        <section className="relative overflow-hidden bg-navy px-6 py-24 text-white sm:px-10 sm:py-28 lg:px-14">
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "48px 48px",
                }}
            />

            <div className="relative mx-auto max-w-none">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="max-w-xl"
                    >
                        <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            {data.heading}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate">{data.subheading}</p>
                    </motion.div>

                    {data.cta && (
                        <motion.a
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            href={data.cta.href}
                            className="flex w-fit items-center gap-1.5 rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                        >
                            {data.cta.label}
                            <ArrowIcon />
                        </motion.a>
                    )}
                </div>

                <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {data.items.map((item, i) => (
                        <ServiceCard key={item.id} item={item} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}