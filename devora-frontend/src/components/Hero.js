//src/components/Hero.js

"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AUTO_ADVANCE_MS = 7000;

/* ---------------- Icons ---------------- */

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function ChevronLeft() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function ChevronRight() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
const ICONS = {
    chart: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    cloud: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M7 18a4 4 0 0 1-.6-7.96A5 5 0 0 1 16 8.1 4.5 4.5 0 0 1 17.5 18H7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    ),
    cube: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <path d="M4 7.5 12 12l8-4.5M12 12v9" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    ),
    flag: (props) => (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <path d="M5 21V4M5 5h13l-3 4 3 4H5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
    ),
};

/* ---------------- Shared floating background particles ---------------- */

function AmbientParticles() {
    const dots = [
        { top: "12%", left: "8%", size: 3, delay: 0 },
        { top: "70%", left: "5%", size: 2, delay: 1.2 },
        { top: "25%", left: "92%", size: 2.5, delay: 0.6 },
        { top: "80%", left: "88%", size: 3, delay: 1.8 },
        { top: "45%", left: "50%", size: 2, delay: 2.4 },
    ];
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {dots.map((d, i) => (
                <motion.span
                    key={i}
                    className="absolute rounded-full bg-teal/40"
                    style={{ top: d.top, left: d.left, width: d.size, height: d.size }}
                    animate={{ opacity: [0.2, 0.9, 0.2], y: [0, -14, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
                />
            ))}
        </div>
    );
}

/* ---------------- Visual variants ---------------- */

function TerminalVisual({ visual }) {
    const lines = visual?.lines || [];
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="w-full max-w-md rounded-xl border border-white/10 bg-[#0b1220] shadow-2xl"
        >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
                <span className="flex items-center gap-2 rounded-full bg-teal/10 px-2.5 py-1 text-[11px] font-medium text-teal">
                    <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-teal"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    {visual?.badge || "LIVE"}
                </span>
                <span className="text-[11px] text-slate/60">zsh</span>
            </div>
            <div className="flex items-center gap-1.5 px-4 pt-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-slate/60">{visual?.fileName || "terminal"}</span>
            </div>
            <div className="space-y-2.5 px-4 py-5 font-mono text-[13px]">
                {lines.map((line, i) => (
                    <motion.p
                        key={line + i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.35, duration: 0.4 }}
                        className={i === 0 ? "text-white" : "text-teal/90"}
                    >
                        {line}
                    </motion.p>
                ))}
            </div>
            <div className="flex items-center gap-3 border-t border-white/10 px-4 py-3">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                        className="h-full rounded-full bg-teal"
                        initial={{ width: "0%" }}
                        animate={{ width: `${visual?.progressValue || 0}%` }}
                        transition={{ delay: 1.6, duration: 1.1, ease: "easeOut" }}
                    />
                </div>
                <span className="text-[11px] text-slate/60">
                    {visual?.progressLabel || "STATUS"} · {visual?.progressValue || 0}%
                </span>
            </div>
        </motion.div>
    );
}

function GraphicVisual({ visual }) {
    const icons = visual?.icons?.length ? visual.icons : ["chart", "cloud", "cube"];
    return (
        <div className="relative flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
            <motion.div
                className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-teal/40 via-blue-500/30 to-purple-500/30 blur-2xl"
                animate={{ scale: [1, 1.08, 1], rotate: [0, 8, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                initial={{ scale: 0.7, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 6 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative h-48 w-48 rounded-3xl bg-gradient-to-br from-teal via-blue-500 to-purple-600 shadow-2xl sm:h-56 sm:w-56"
            />
            {icons.map((key, i) => {
                const Icon = ICONS[key] || ICONS.chart;
                const angle = (i / icons.length) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                return (
                    <motion.span
                        key={key + i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
                        transition={{
                            opacity: { delay: 0.4 + i * 0.15, duration: 0.4 },
                            scale: { delay: 0.4 + i * 0.15, duration: 0.4 },
                            y: { duration: 4, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" },
                        }}
                        style={{ transform: `translate(${x}px, ${y}px)` }}
                        className="absolute flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-navy text-teal shadow-lg"
                    >
                        <Icon className="h-5 w-5" />
                    </motion.span>
                );
            })}
        </div>
    );
}

function DashboardVisual({ visual }) {
    const bars = visual?.bars || [20, 30, 25, 40, 55, 65, 70];
    const max = Math.max(...bars);
    return (
        <div className="relative w-full max-w-md">
            <motion.div
                initial={{ opacity: 0, y: -14 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5 }}
                className="ml-auto w-56 rounded-xl border border-white/10 bg-[#0b1220] p-4 shadow-xl"
            >
                <p className="text-[11px] font-medium text-slate/70">{visual?.scoreLabel || "SCORE"}</p>
                <svg viewBox="0 0 160 40" className="mt-2 h-10 w-full">
                    <motion.polyline
                        points="0,30 20,20 40,25 60,10 80,18 100,8 120,15 140,5 160,12"
                        fill="none"
                        stroke="#2dd4bf"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
                    />
                </svg>
                <p className="mt-2 text-[11px] text-slate/60">{visual?.scoreCaption}</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative z-10 -mt-6 w-64 rounded-xl border border-black/5 bg-white p-4 shadow-2xl"
            >
                <div className="flex items-center justify-between">
                    <p className="text-[11px] font-medium text-slate">{visual?.chartLabel || "GROWTH"}</p>
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2 }}
                        className="text-[11px] font-semibold text-teal"
                    >
                        {visual?.chartChange}
                    </motion.span>
                </div>
                <div className="mt-3 flex h-16 items-end gap-1.5">
                    {bars.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 0 }}
                            animate={{ height: `${(v / max) * 100}%` }}
                            transition={{ delay: 0.35 + i * 0.08, duration: 0.5, ease: "easeOut" }}
                            className={`flex-1 rounded-sm ${i >= bars.length - 3 ? "bg-teal" : "bg-navy/15"}`}
                        />
                    ))}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-3">
                    <div>
                        <p className="text-base font-bold text-ink">{visual?.stat1?.value}</p>
                        <p className="text-[11px] text-slate">{visual?.stat1?.label}</p>
                    </div>
                    <div>
                        <p className="text-base font-bold text-ink">{visual?.stat2?.value}</p>
                        <p className="text-[11px] text-slate">{visual?.stat2?.label}</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function AudioVisual({ visual }) {
    const bars = Array.from({ length: 28 });
    return (
        <div className="flex flex-col items-center gap-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative flex h-56 w-56 items-center justify-center rounded-full border border-dashed border-white/20"
            >
                <motion.span
                    className="absolute inset-0 rounded-full border border-teal/30"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                    className="absolute top-1.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-teal"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    style={{ transformOrigin: "0 108px" }}
                />
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-white/5 text-center text-xs font-bold uppercase tracking-wide text-white">
                    {visual?.showName || "Podcast"}
                </div>
            </motion.div>
            <div className="flex h-10 items-end gap-1">
                {bars.map((_, i) => (
                    <motion.span
                        key={i}
                        className="w-1 rounded-full bg-teal/80"
                        animate={{ height: [6, 30, 6] }}
                        transition={{ duration: 1 + (i % 5) * 0.1, repeat: Infinity, delay: i * 0.05, ease: "easeInOut" }}
                    />
                ))}
            </div>
        </div>
    );
}

function PhotoVisual({ visual }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-md overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={visual?.imageUrl} alt={visual?.alt || ""} className="h-72 w-full object-cover sm:h-80" />
        </motion.div>
    );
}

function SlideVisual({ slide }) {
    switch (slide.layout) {
        case "terminal": return <TerminalVisual visual={slide.visual} />;
        case "graphic": return <GraphicVisual visual={slide.visual} />;
        case "dashboard": return <DashboardVisual visual={slide.visual} />;
        case "audio": return <AudioVisual visual={slide.visual} />;
        case "photo": return <PhotoVisual visual={slide.visual} />;
        default: return null;
    }
}

/* ---------------- Main component ---------------- */

export default function Hero() {
    const { t, te } = useLanguage();
    const [slides, setSlides] = useState(null);
    const [featuredIn, setFeaturedIn] = useState([]);
    const [error, setError] = useState(null);
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const [paused, setPaused] = useState(false);
    const touchStartX = useRef(null);

    useEffect(() => {
        apiFetch("hero")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setSlides(data.slides || []);
                setFeaturedIn(data.featuredIn || []);
            })
            .catch((err) =>
                setError(te("Could not load hero content. Please try again in a moment.", err.message))
            );
    }, []);

    useEffect(() => {
        if (!slides || slides.length < 2 || paused) return;
        const timer = setInterval(() => {
            setDirection(1);
            setIndex((i) => (i + 1) % slides.length);
        }, AUTO_ADVANCE_MS);
        return () => clearInterval(timer);
    }, [slides, paused, index]);

    function goTo(newIndex) {
        setDirection(newIndex > index ? 1 : -1);
        setIndex(newIndex);
    }
    function next() {
        if (!slides) return;
        setDirection(1);
        setIndex((i) => (i + 1) % slides.length);
    }
    function prev() {
        if (!slides) return;
        setDirection(-1);
        setIndex((i) => (i - 1 + slides.length) % slides.length);
    }
    function onTouchStart(e) {
        touchStartX.current = e.touches[0].clientX;
    }
    function onTouchEnd(e) {
        if (touchStartX.current === null) return;
        const delta = e.changedTouches[0].clientX - touchStartX.current;
        if (delta > 50) prev();
        else if (delta < -50) next();
        touchStartX.current = null;
    }

    if (error) {
        return (
            <section className="bg-navy px-6 py-24 text-white">
                <div className="mx-auto max-w-6xl">
                    <p className="max-w-md text-sm text-teal">{error}</p>
                </div>
            </section>
        );
    }

    if (!slides) {
        return <section className="h-[640px] bg-navy" />;
    }

    const slide = slides[index];

    const textVariants = {
        enter: (dir) => ({ opacity: 0, x: dir > 0 ? 50 : -50 }),
        center: { opacity: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, x: dir > 0 ? -50 : 50 }),
    };
    const visualVariants = {
        enter: (dir) => ({ opacity: 0, scale: 0.9, x: dir > 0 ? 40 : -40 }),
        center: { opacity: 1, scale: 1, x: 0 },
        exit: (dir) => ({ opacity: 0, scale: 0.9, x: dir > 0 ? -40 : 40 }),
    };

    return (
        <section
            className="relative overflow-hidden bg-navy px-8 py-20 text-white sm:py-24 lg:px-16 xl:px-24"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
        >
            <AmbientParticles />

            <div className="relative mx-auto max-w-[1600px]">
                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`text-${slide.id}`}
                            custom={direction}
                            variants={textVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="w-full max-w-xl shrink-0"
                        >
                            {slide.eyebrow && (
                                <motion.p
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="font-mono text-xs tracking-widest text-teal/80"
                                >
                                    {slide.eyebrow}
                                </motion.p>
                            )}
                            <h1 className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
                                {slide.headline}
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.4 }}
                                className="mt-6 max-w-xl text-base leading-relaxed text-slate"
                            >
                                {slide.subheadline}
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.4 }}
                                className="mt-8 flex flex-wrap gap-4"
                            >
                                {slide.primaryCta && (
                                    <motion.a
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        href={slide.primaryCta.href}
                                        className="flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                                    >
                                        <ArrowIcon />
                                        {slide.primaryCta.label}
                                    </motion.a>
                                )}
                                {slide.secondaryCta && (
                                    <motion.a
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.97 }}
                                        href={slide.secondaryCta.href}
                                        className="flex items-center gap-1.5 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                    >
                                        {slide.secondaryCta.label}
                                    </motion.a>
                                )}
                            </motion.div>
                        </motion.div>
                    </AnimatePresence>

                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={`visual-${slide.id}`}
                            custom={direction}
                            variants={visualVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="flex w-full justify-center lg:w-auto lg:justify-end"
                        >
                            <SlideVisual slide={slide} />
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="mt-16 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                    {featuredIn.length > 0 && (
                        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
                            <span className="text-[11px] font-medium tracking-widest text-slate/60">{t("AS SEEN IN")}</span>
                            {featuredIn.map((name, i) => (
                                <motion.span
                                    key={name}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 * i }}
                                    className="text-sm font-semibold text-white/70"
                                >
                                    {name}
                                </motion.span>
                            ))}
                        </div>
                    )}

                    {slides.length > 1 && (
                        <div className="flex items-center gap-3 self-end sm:self-auto">
                            <div className="mr-2 hidden items-center gap-1.5 sm:flex">
                                {slides.map((s, i) => (
                                    <button
                                        key={s.id}
                                        onClick={() => goTo(i)}
                                        aria-label={t("Go to slide {n}").replace("{n}", i + 1)}
                                        className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-teal" : "w-1.5 bg-white/20"}`}
                                    />
                                ))}
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={prev}
                                aria-label={t("Previous slide")}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                            >
                                <ChevronLeft />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={next}
                                aria-label={t("Next slide")}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-teal text-teal transition-colors hover:bg-teal hover:text-navy"
                            >
                                <ChevronRight />
                            </motion.button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}