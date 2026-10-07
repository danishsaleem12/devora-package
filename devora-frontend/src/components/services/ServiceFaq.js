"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function FaqItem({ item, index, isOpen, onToggle }) {
    const panelId = `faq-panel-${index}`;

    return (
        <div className="border-b border-black/10 first:border-t">
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left"
            >
                <span
                    className={`text-base font-semibold transition-colors duration-200 sm:text-lg ${isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                        }`}
                >
                    {item.q}
                </span>
                <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen
                            ? "rotate-45 border-teal bg-teal text-white"
                            : "border-black/10 bg-white text-slate group-hover:border-teal/40 group-hover:text-teal"
                        }`}
                >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path d="M6 2v8M2 6h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                </span>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        id={panelId}
                        role="region"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <p className="max-w-2xl pb-6 text-sm leading-relaxed text-slate sm:text-base">{item.a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function ServiceFaq({ service }) {
    const data = service.faq;
    const [openIndex, setOpenIndex] = useState(0);

    if (!data?.items?.length) return null;

    // FAQ structured data for search engines
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: data.items.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
    };

    return (
        <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
            />
            <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-black/5 bg-[#f4f5f7] p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative grid gap-12 text-ink lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
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
                        <p className="mt-4 max-w-sm text-base leading-relaxed text-slate">{data.subheading}</p>

                        <div className="mt-8 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                            <p className="text-sm font-semibold text-ink">Still have a question?</p>
                            <p className="mt-1 text-sm text-slate">We reply to every message.</p>
                            <motion.a
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                href="/contact"
                                className="mt-4 flex w-fit items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy"
                            >
                                <ArrowIcon />
                                Ask us directly
                            </motion.a>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-60px" }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        {data.items.map((item, i) => (
                            <FaqItem
                                key={item.q}
                                item={item}
                                index={i}
                                isOpen={openIndex === i}
                                onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}