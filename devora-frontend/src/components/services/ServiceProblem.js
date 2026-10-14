"use client";

import { motion } from "framer-motion";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";

function CheckIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 6.5L5 9L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ProblemCard({ item, index }) {
  const { t } = useLanguage();
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            whileHover={{ y: -4 }}
            className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-white/20 sm:p-7"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br from-orange-500/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <span className="relative font-mono text-xs text-orange-400">
                {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="relative mt-4 text-lg font-semibold text-white">{item.title}</h3>
            <p className="relative mt-2 flex-1 text-sm leading-relaxed text-slate">{item.description}</p>

            {item.fix && (
                <div className="relative mt-6 border-t border-white/10 pt-5">
                    <p className="font-mono text-[10px] tracking-widest text-teal/80">{t("HOW WE FIX IT")}</p>
                    <p className="mt-2 flex items-start gap-2.5 text-sm leading-relaxed text-white/85">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal">
                            <CheckIcon />
                        </span>
                        {item.fix}
                    </p>
                </div>
            )}
        </motion.div>
    );
}

export default function ServiceProblem({ service: rawService }) {
  // text is translated from the language catalog (falls back to English)
  const service = useLocalized(rawService);
    const data = service.problem;
    if (!data?.items?.length) return null;

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
                <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

                <div className="relative">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.5 }}
                        className="max-w-2xl"
                    >
                        <p className="font-mono text-xs tracking-widest text-orange-400">{data.eyebrow}</p>
                        <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                            {data.heading}
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate">{data.subheading}</p>
                    </motion.div>

                    <div
                        className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:[grid-template-columns:repeat(var(--cols),minmax(0,1fr))]"
                        style={{ "--cols": Math.min(data.items.length, 4) }}
                    >
                        {data.items.map((item, i) => (
                            <ProblemCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}