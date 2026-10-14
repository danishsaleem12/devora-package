"use client";

import { motion } from "framer-motion";
import { useLocalized } from "@/components/LanguageProvider";

const ICONS = {
    layout: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 9h18M9 9v11" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    code: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    gauge: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M4 17a8 8 0 1 1 16 0M12 17l4-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    search: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" />
            <path d="M20 20l-4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    doc: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M6 3h8l4 4v14H6V3ZM14 3v4h4M9 12h6M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    wrench: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
    server: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <rect x="3" y="4" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <rect x="3" y="14" width="18" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
            <path d="M7 7h.01M7 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    database: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <ellipse cx="12" cy="6" rx="8" ry="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    shield: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3ZM9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    layers: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M12 3 3 8l9 5 9-5-9-5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M3 12l9 5 9-5M3 16l9 5 9-5" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
    rocket: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M12 3c3 1.5 5 4.5 5 8l-2 3H9l-2-3c0-3.5 2-6.5 5-8ZM9 14l-2 5 4-2M15 14l2 5-4-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="9" r="1.5" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    bot: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <rect x="5" y="8" width="14" height="11" rx="3" stroke="currentColor" strokeWidth="1.6" />
            <path d="M12 8V5M9.5 13h.01M14.5 13h.01M9 16h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="12" cy="4" r="1" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    refresh: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M20 11a8 8 0 0 0-14-4M4 5v3h3M4 13a8 8 0 0 0 14 4M20 19v-3h-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    chart: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M4 20V10M12 20V4M20 20v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    ),
    card: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <rect x="3" y="6" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
            <path d="M3 10h18M7 15h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
    ),
    cart: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M3 4h2l2.5 11h10l2-8H6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="19" r="1.2" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="17" cy="19" r="1.2" stroke="currentColor" strokeWidth="1.6" />
        </svg>
    ),
    plug: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0V8ZM12 16v5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    palette: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M12 3a9 9 0 1 0 0 18c1.5 0 2-1 1.5-2-.6-1.2.2-2.5 1.6-2.5H17a4 4 0 0 0 4-4c0-5-4-9.5-9-9.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M7.5 12h.01M10 7.5h.01M15 7.5h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
    ),
    cloud: (p) => (
        <svg viewBox="0 0 24 24" fill="none" {...p}>
            <path d="M7 18a4 4 0 0 1-.6-7.96A5 5 0 0 1 16 8.1 4.5 4.5 0 0 1 17.5 18H7Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
    ),
};

function OfferingCard({ item, index }) {
    const Icon = ICONS[item.icon] || ICONS.layers;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-teal/30 hover:shadow-xl sm:p-7"
        >
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-teal/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative flex items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 text-teal transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                </span>
                <span className="font-mono text-xs text-slate/40">{String(index + 1).padStart(2, "0")}</span>
            </div>

            <h3 className="relative mt-6 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-slate">{item.description}</p>
        </motion.div>
    );
}

export default function ServiceOfferings({ service: rawService }) {
  // text is translated from the language catalog (falls back to English)
  const service = useLocalized(rawService);
    const data = service.offerings;
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

                    <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.items.map((item, i) => (
                            <OfferingCard key={item.title} item={item} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}