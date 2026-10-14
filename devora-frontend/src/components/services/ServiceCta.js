"use client";

import { motion } from "framer-motion";
import { useLocalized } from "@/components/LanguageProvider";

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function AmbientParticles() {
    const dots = [
        { top: "14%", left: "6%", size: 3, delay: 0 },
        { top: "72%", left: "4%", size: 2, delay: 1.2 },
        { top: "22%", left: "94%", size: 2.5, delay: 0.6 },
        { top: "82%", left: "90%", size: 3, delay: 1.8 },
        { top: "50%", left: "48%", size: 2, delay: 2.4 },
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

export default function ServiceCta({ service: rawService }) {
  // text is translated from the language catalog (falls back to English)
  const service = useLocalized(rawService);
    const data = service.cta;
    if (!data) return null;

    return (
        <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
            <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-14">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                    }}
                />
                <motion.div
                    className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-teal/30 via-blue-500/15 to-transparent blur-3xl"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <AmbientParticles />

                <div className="relative grid items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="max-w-xl font-heading text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
                            {data.heading}
                        </h2>
                        <p className="mt-5 max-w-lg text-base leading-relaxed text-slate">{data.subheading}</p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            {data.primaryCta && (
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    href={data.primaryCta.href}
                                    className="flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                                >
                                    <ArrowIcon />
                                    {data.primaryCta.label}
                                </motion.a>
                            )}
                            {data.secondaryCta && (
                                <motion.a
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    href={data.secondaryCta.href}
                                    className="flex items-center gap-1.5 rounded-md border border-white/30 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
                                >
                                    {data.secondaryCta.label}
                                </motion.a>
                            )}
                        </div>
                    </motion.div>

                    {data.nextSteps?.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8"
                        >
                            <p className="font-mono text-xs tracking-widest text-teal/80">{data.nextStepsLabel}</p>
                            <ol className="mt-6 space-y-6">
                                {data.nextSteps.map((step, i) => (
                                    <motion.li
                                        key={step.title}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + i * 0.12 }}
                                        className="flex items-start gap-4"
                                    >
                                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-teal/40 font-mono text-xs text-teal">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold text-white">{step.title}</p>
                                            <p className="mt-1 text-sm leading-relaxed text-slate">{step.description}</p>
                                        </div>
                                    </motion.li>
                                ))}
                            </ol>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}