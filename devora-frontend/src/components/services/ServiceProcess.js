"use client";

import { motion } from "framer-motion";
import { useLocalized } from "@/components/LanguageProvider";

function Step({ step, index }) {
    return (
        <div className="group relative pl-14 lg:pl-0 lg:pt-16">
            {/* Node */}
            <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: 0.15 + index * 0.12, ease: "easeOut" }}
                className="absolute left-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-teal/40 bg-navy font-mono text-xs text-teal transition-colors duration-300 group-hover:border-teal group-hover:bg-teal group-hover:text-navy"
            >
                {String(index + 1).padStart(2, "0")}
            </motion.span>

            <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.12, ease: "easeOut" }}
                className="pb-10 lg:pb-0 lg:pr-6"
            >
                <p className="font-mono text-[11px] tracking-widest text-teal/70">
                    STEP {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">{step.description}</p>
            </motion.div>
        </div>
    );
}

export default function ServiceProcess({ service: rawService }) {
  // text is translated from the language catalog (falls back to English)
  const service = useLocalized(rawService);
    const data = service.workflow;
    if (!data?.steps?.length) return null;

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
                <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative">
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

                    <div className="relative mt-16">
                        {/* Vertical line (mobile) */}
                        <motion.span
                            initial={{ scaleY: 0 }}
                            whileInView={{ scaleY: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1.2, ease: "easeInOut" }}
                            className="absolute bottom-6 left-5 top-2 w-px origin-top bg-gradient-to-b from-teal/60 via-white/15 to-transparent lg:hidden"
                        />
                        {/* Horizontal line (desktop) */}
                        <motion.span
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ duration: 1.4, ease: "easeInOut" }}
                            className="absolute left-5 right-0 top-5 hidden h-px origin-left bg-gradient-to-r from-teal/60 via-white/15 to-transparent lg:block"
                        />

                        <div
                            className="grid grid-cols-1 gap-0 lg:gap-6"
                            style={{ gridTemplateColumns: undefined }}
                        >
                            <div className="grid grid-cols-1 lg:[grid-template-columns:repeat(var(--steps),minmax(0,1fr))] lg:gap-6" style={{ "--steps": data.steps.length }}>
                                {data.steps.map((step, i) => (
                                    <Step key={step.title} step={step} index={i} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}