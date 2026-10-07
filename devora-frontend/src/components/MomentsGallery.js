"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const AUTOPLAY_DELAY = 3500;
const SCROLL_RESET_DELAY = 450;

function ChevronLeftIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 3.5L5 8l5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ChevronRightIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3.5L11 8l-5 4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const rise = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function MomentsGallery() {
    const [data, setData] = useState(null);
    const scrollRef = useRef(null);
    const timerRef = useRef(null);
    const resetTimerRef = useRef(null);
    const currentRef = useRef(1); // index within the cloned/extended list
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/moments-gallery`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    // Build an extended list: [lastItem, ...realItems, firstItem] for a seamless loop
    const extended = data
        ? [data.moments[data.moments.length - 1], ...data.moments, data.moments[0]]
        : [];

    const scrollToSlide = useCallback((index, behavior = "smooth") => {
        const el = scrollRef.current;
        if (!el) return;
        const cards = el.querySelectorAll("[data-card]");
        const card = cards[index];
        if (!card) return;
        el.scrollTo({ left: card.offsetLeft, behavior });
    }, []);

    // After the smooth scroll settles, if we've landed on a clone, silently
    // jump (no animation) to the matching real slide so it loops forever.
    const settleAfterScroll = useCallback(() => {
        clearTimeout(resetTimerRef.current);
        resetTimerRef.current = setTimeout(() => {
            const realCount = extended.length - 2;
            if (currentRef.current === 0) {
                currentRef.current = realCount;
                scrollToSlide(realCount, "auto");
            } else if (currentRef.current === extended.length - 1) {
                currentRef.current = 1;
                scrollToSlide(1, "auto");
            }
        }, SCROLL_RESET_DELAY);
    }, [extended.length, scrollToSlide]);

    const goNext = useCallback(() => {
        currentRef.current += 1;
        scrollToSlide(currentRef.current);
        settleAfterScroll();
    }, [scrollToSlide, settleAfterScroll]);

    const goPrev = useCallback(() => {
        currentRef.current -= 1;
        scrollToSlide(currentRef.current);
        settleAfterScroll();
    }, [scrollToSlide, settleAfterScroll]);

    // Autoplay
    useEffect(() => {
        if (!data || reduce) return;
        timerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
        return () => clearInterval(timerRef.current);
    }, [data, reduce, goNext]);

    const pauseAutoplay = () => clearInterval(timerRef.current);
    const resumeAutoplay = () => {
        clearInterval(timerRef.current);
        if (!reduce) timerRef.current = setInterval(goNext, AUTOPLAY_DELAY);
    };

    const handleNextClick = () => {
        pauseAutoplay();
        goNext();
        resumeAutoplay();
    };

    const handlePrevClick = () => {
        pauseAutoplay();
        goPrev();
        resumeAutoplay();
    };

    // Position the strip on the first real slide once mounted
    useEffect(() => {
        if (!data) return;
        const raf = requestAnimationFrame(() => scrollToSlide(1, "auto"));
        return () => cancelAnimationFrame(raf);
    }, [data, scrollToSlide]);

    if (!data) return <div className="min-h-[420px] bg-paper" />;

    const { tag, heading, subheading } = data;

    return (
        <section id="highlights" className="bg-paper px-4 py-16 sm:px-8 lg:px-12">
            <motion.div
                variants={reduce ? undefined : container}
                initial={reduce ? undefined : "hidden"}
                whileInView={reduce ? undefined : "show"}
                viewport={{ once: true, amount: 0.2 }}
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

                {/* Carousel */}
                <motion.div
                    variants={rise}
                    className="relative mt-8"
                    onMouseEnter={pauseAutoplay}
                    onMouseLeave={resumeAutoplay}
                >
                    <button
                        type="button"
                        onClick={handlePrevClick}
                        aria-label="Previous"
                        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-ink shadow-md transition-colors hover:bg-black/5"
                    >
                        <ChevronLeftIcon />
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    >
                        {extended.map((m, i) => (
                            <div
                                key={`${m.id}-${i}`}
                                data-card
                                className="relative aspect-[4/5] w-[70%] shrink-0 snap-start overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-teal/20 sm:w-[45%] lg:w-[calc((100%-4*1rem)/5)]"
                            >
                                {/* Replace with <img src={m.src} alt={m.label} className="h-full w-full object-cover" /> */}
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                    <span className="text-sm font-medium text-white">{m.label}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={handleNextClick}
                        aria-label="Next"
                        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white text-ink shadow-md transition-colors hover:bg-black/5"
                    >
                        <ChevronRightIcon />
                    </button>
                </motion.div>
            </motion.div>
        </section>
    );
}