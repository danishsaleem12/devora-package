"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

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

function TerminalVisual({ visual }) {
    const lines = visual?.lines || [];
    return (
        <div className="relative w-full max-w-md">
            <motion.div
                className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal/25 via-blue-500/15 to-purple-500/15 blur-3xl"
                animate={{ scale: [1, 1.06, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                initial={{ opacity: 0, y: 20, rotate: -1 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                whileHover={{ y: -4 }}
                className="relative rounded-xl border border-white/10 bg-[#0b1220] shadow-2xl"
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
                            transition={{ delay: 0.5 + i * 0.35, duration: 0.4 }}
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
                            transition={{ delay: 1.8, duration: 1.1, ease: "easeOut" }}
                        />
                    </div>
                    <span className="text-[11px] text-slate/60">
                        {visual?.progressLabel || "STATUS"} · {visual?.progressValue || 0}%
                    </span>
                </div>
            </motion.div>
        </div>
    );
}

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: "easeOut" },
});

export default function ServiceHero({ service }) {
    const { eyebrow, headline, subheadline, primaryCta, secondaryCta, visual, highlights = [], tags = [], title, tagsLabel } = service;
    const parent = service.parent ?? { label: "Services", href: "/services" };

    return (
        <section className="relative overflow-hidden bg-navy px-8 py-20 text-white sm:py-24 lg:px-16 xl:px-24">
            <AmbientParticles />

            <div className="relative mx-auto max-w-[1600px]">
                {/* Breadcrumb */}
                <motion.nav {...fadeUp(0)} aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-xs text-slate">
                    <Link href="/" className="transition-colors hover:text-white">Home</Link>
                    <span className="text-white/20">/</span>
                    <Link href={parent.href} className="transition-colors hover:text-white">{parent.label}</Link>
                    <span className="text-white/20">/</span>
                    <span className="text-white/80">{title}</span>
                </motion.nav>

                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                    <div className="w-full max-w-xl shrink-0">
                        {eyebrow && (
                            <motion.p {...fadeUp(0.05)} className="font-mono text-xs tracking-widest text-teal/80">
                                {eyebrow}
                            </motion.p>
                        )}
                        <motion.h1
                            {...fadeUp(0.12)}
                            className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl lg:text-[3.25rem]"
                        >
                            {headline}
                        </motion.h1>
                        <motion.p {...fadeUp(0.2)} className="mt-6 max-w-xl text-base leading-relaxed text-slate">
                            {subheadline}
                        </motion.p>
                        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap gap-4">
                            {primaryCta && (
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    href={primaryCta.href}
                                    className="flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                                >
                                    <ArrowIcon />
                                    {primaryCta.label}
                                </motion.a>
                            )}
                            {secondaryCta && (
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    href={secondaryCta.href}
                                    className="flex items-center gap-1.5 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                >
                                    {secondaryCta.label}
                                </motion.a>
                            )}
                        </motion.div>
                    </div>

                    <div className="flex w-full justify-center lg:w-auto lg:justify-end">
                        <TerminalVisual visual={visual} />
                    </div>
                </div>

                {/* Bottom bar: highlights + tech tags */}
                <motion.div
                    {...fadeUp(0.45)}
                    className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 lg:flex-row lg:items-center lg:justify-between"
                >
                    <div className="grid grid-cols-3 gap-6 sm:gap-10">
                        {highlights.map((h) => (
                            <div key={h.label}>
                                <p className="font-heading text-xl font-bold text-white sm:text-2xl">{h.value}</p>
                                <p className="mt-1 text-[11px] uppercase tracking-widest text-slate/70">{h.label}</p>
                            </div>
                        ))}
                    </div>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="mr-2 text-[11px] font-medium tracking-widest text-slate/60">{tagsLabel ?? "BUILT WITH"}</span>
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
}