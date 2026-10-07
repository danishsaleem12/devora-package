"use client";

import { motion } from "framer-motion";

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ReasonCard({ reason, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 2) * 0.08 + Math.floor(index / 2) * 0.08, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-teal/30 sm:p-7"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-teal/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            <span className="relative font-mono text-xs text-teal/80">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="relative mt-4 text-lg font-semibold text-white">{reason.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-slate">{reason.description}</p>
        </motion.div>
    );
}

function QuoteIcon() {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-teal/60">
            <path d="M9 7H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2c0 2-1 3-3 3M19 7h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2c0 2-1 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

export default function ServiceWhy({ service }) {
    const data = service.why;
    if (!data?.reasons?.length) return null;

    const hasStats = data.stats?.length > 0;
    const hasTestimonial = Boolean(data.testimonial?.quote);

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
                <div className="pointer-events-none absolute -bottom-40 right-1/4 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.5 }}
                            className="lg:sticky lg:top-8 lg:self-start"
                        >
                            <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
                            <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                                {data.heading}
                            </h2>
                            <p className="mt-4 max-w-md text-base leading-relaxed text-slate">{data.subheading}</p>
                            <motion.a
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                href="/contact"
                                className="mt-8 flex w-fit items-center gap-1.5 rounded-md border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
                            >
                                Talk to our team
                                <ArrowIcon />
                            </motion.a>
                        </motion.div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {data.reasons.map((reason, i) => (
                                <ReasonCard key={reason.title} reason={reason} index={i} />
                            ))}
                        </div>
                    </div>

                    {hasStats && (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5 }}
                            className="mt-14 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 sm:grid-cols-3 lg:grid-cols-4"
                        >
                            {data.stats.map((s) => (
                                <div key={s.label}>
                                    <p className="font-heading text-3xl font-bold text-teal">{s.value}</p>
                                    <p className="mt-1 text-[11px] uppercase tracking-widest text-slate/70">{s.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    )}

                    {hasTestimonial && (
                        <motion.figure
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 0.5 }}
                            className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:p-10"
                        >
                            <QuoteIcon />
                            <blockquote className="mt-4 max-w-3xl font-heading text-xl font-semibold leading-snug text-white sm:text-2xl">
                                {data.testimonial.quote}
                            </blockquote>
                            <figcaption className="mt-6 text-sm">
                                <span className="font-medium text-white">{data.testimonial.name}</span>
                                {data.testimonial.role && (
                                    <span className="text-slate"> · {data.testimonial.role}</span>
                                )}
                            </figcaption>
                        </motion.figure>
                    )}
                </div>
            </div>
        </section>
    );
}