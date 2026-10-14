"use client";

import { motion } from "framer-motion";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";

export default function ProductUseCases({ product: rawProduct }) {
  const { t } = useLanguage();
  // text is translated from the language catalog (falls back to English)
  const product = useLocalized(rawProduct);
    const data = product.useCases;
    if (!data?.items?.length) return null;

    return (
        <section className="bg-[#fafafa] p-2 sm:p-3 lg:p-4">
            <div className="relative mx-auto max-w-none overflow-hidden rounded-[2rem] border border-black/5 bg-[#f4f5f7] p-5 shadow-sm sm:p-6 lg:p-8 xl:p-10">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

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

                    <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
                        {data.items.map((item, i) => (
                            <motion.article
                                key={item.audience}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-60px" }}
                                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
                                whileHover={{ y: -4 }}
                                className="group flex flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-colors duration-300 hover:border-teal/40"
                            >
                                <span className="font-mono text-[11px] tracking-widest text-teal/70">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <h3 className="mt-3 text-lg font-semibold text-ink">{item.audience}</h3>

                                <div className="mt-5 space-y-4">
                                    <div>
                                        <p className="font-mono text-[10px] tracking-widest text-slate/70">{t("THE CHALLENGE")}</p>
                                        <p className="mt-1.5 text-sm leading-relaxed text-slate">{item.challenge}</p>
                                    </div>
                                    <div className="border-t border-black/5 pt-4">
                                        <p className="font-mono text-[10px] tracking-widest text-teal">{t("WITH DEVORA")}</p>
                                        <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink">{item.outcome}</p>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}