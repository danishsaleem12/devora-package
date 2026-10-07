//src/components/Capabilities.js

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const TAB_DURATION_MS = 5500;

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function useCountUp(target, active, duration = 1200) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!active) {
            setValue(0);
            return;
        }
        let start = null;
        let frame;
        function tick(ts) {
            if (start === null) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * target));
            if (progress < 1) frame = requestAnimationFrame(tick);
        }
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [active, target, duration]);

    return value;
}

function TabPreview({ tab }) {
    const count = useCountUp(tab.stat.value, true);

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-2xl border border-black/5 bg-navy p-8 text-white shadow-xl sm:p-10"
        >
            <p className="text-sm leading-relaxed text-slate">{tab.description}</p>

            <div className="mt-8 flex items-end gap-1.5">
                <span className="font-heading text-5xl font-bold text-teal tabular-nums">
                    {count}
                </span>
                <span className="pb-1.5 font-heading text-2xl font-bold text-teal">
                    {tab.stat.suffix}
                </span>
            </div>
            <p className="mt-1 text-xs uppercase tracking-widest text-slate/60">
                {tab.stat.label}
            </p>

            <ul className="mt-8 space-y-3 border-t border-white/10 pt-6">
                {tab.points.map((point, i) => (
                    <motion.li
                        key={point}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.12, duration: 0.35 }}
                        className="flex items-start gap-3 text-sm text-white/90"
                    >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                            <CheckIcon />
                        </span>
                        {point}
                    </motion.li>
                ))}
            </ul>
        </motion.div>
    );
}

export default function Capabilities() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        fetch(`${API_URL}/api/capabilities`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) => setError(err.message));
    }, []);

    useEffect(() => {
        if (!data || paused) return;
        const timer = setInterval(() => {
            setActiveIndex((i) => (i + 1) % data.tabs.length);
        }, TAB_DURATION_MS);
        return () => clearInterval(timer);
    }, [data, paused, activeIndex]);

    if (error) return null;
    if (!data) {
        return <section className="h-[560px] bg-white" />;
    }

    const activeTab = data.tabs[activeIndex];

    return (
        <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
            <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-black/5 bg-[#f4f5f7] p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
                {/* Section identity: dot grid + soft glows, contained within the panel */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-500/5 blur-3xl" />

                <div className="relative text-ink">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            {data.heading}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate">{data.subheading}</p>
                    </motion.div>

                    <div
                        className="mt-14 flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-16"
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                    >
                        <div className="flex w-full max-w-xs shrink-0 flex-col gap-1">
                            {data.tabs.map((tab, i) => {
                                const isActive = i === activeIndex;
                                return (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveIndex(i)}
                                        className={`group relative flex items-start gap-4 rounded-lg px-3 text-left transition-colors ${i === 0 ? "pb-4 pt-0" : "py-4"
                                            }`}
                                    >
                                        <span
                                            className={`font-mono text-sm leading-none transition-colors ${isActive ? "text-teal" : "text-slate/40 group-hover:text-slate"
                                                }`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="flex-1">
                                            <span
                                                className={`block text-base font-semibold leading-none transition-colors ${isActive ? "text-ink" : "text-slate group-hover:text-ink"
                                                    }`}
                                            >
                                                {tab.title}
                                            </span>
                                            {isActive && (
                                                <span className="relative mt-3 block h-0.5 w-full overflow-hidden rounded-full bg-black/5">
                                                    {!paused && (
                                                        <motion.span
                                                            key={activeIndex}
                                                            className="absolute inset-y-0 left-0 rounded-full bg-teal"
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: "100%" }}
                                                            transition={{ duration: TAB_DURATION_MS / 1000, ease: "linear" }}
                                                        />
                                                    )}
                                                    {paused && <span className="absolute inset-y-0 left-0 w-full rounded-full bg-teal/40" />}
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="w-full lg:max-w-2xl">
                            <AnimatePresence mode="wait">
                                <TabPreview key={activeTab.id} tab={activeTab} />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}