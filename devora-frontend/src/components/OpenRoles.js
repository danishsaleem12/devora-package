//src/components/OpenRoles.js

"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function OpenRoles() {
    const { t } = useLanguage();
    const [data, setData] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        apiFetch("jobs")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((jobs) =>
                setData({
                    tag: "Open roles",
                    heading: "Find your next role at Devora",
                    filters: ["All", "Engineering", "AI & Data", "Design", "Cloud & DevOps"],
                    ctaLabel: "Explore positions",
                    ctaHref: "/careers/roles",
                    roles: jobs.map((job) => ({
                        slug: job.slug,
                        title: job.title,
                        postedAgo: job.postedAgo,
                        location: job.workplaceType,
                        place: job.location,
                        team: job.department,
                        type: job.type,
                        category: job.category,
                    })),
                })
            )
            .catch(() => setData(null));
    }, []);

    const MAX_VISIBLE = 4;

    const filteredRoles = useMemo(() => {
        if (!data) return [];
        const matches =
            // job categories arrive already translated from the API, so accept the English or the translated name
            activeFilter === "All"
                ? data.roles
                : data.roles.filter((r) => r.category === activeFilter || r.category === t(activeFilter));
        return matches.slice(0, MAX_VISIBLE);
    }, [data, activeFilter, t]);

    if (!data) return <div className="min-h-[500px] bg-white" />;

    const { tag, heading, filters, ctaLabel, ctaHref } = data;

    return (
        <section className="bg-white px-4 py-10 sm:px-8 lg:px-12">
            <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                    <span className="text-xs font-medium tracking-wide text-teal">{t(tag)}</span>
                    <h2 className="mt-2 font-heading text-3xl font-semibold text-ink sm:text-4xl">{t(heading)}</h2>
                </div>

                <div className="flex flex-wrap gap-2">
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${activeFilter === f
                                ? "border-navy bg-navy text-white"
                                : "border-black/10 text-slate hover:border-black/20 hover:text-ink"
                                }`}
                        >
                            {t(f)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
                <AnimatePresence mode="popLayout">
                    {filteredRoles.map((role) => (
                        <motion.a
                            key={role.slug}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            href={`/careers/roles/${role.slug}`}
                            className="group grid grid-cols-1 gap-2 py-5 sm:grid-cols-[1.6fr_0.8fr_1fr_1fr_0.6fr_auto] sm:items-center sm:gap-4"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-ink">{role.title}</h3>
                                <p className="mt-0.5 text-xs text-slate">{role.postedAgo}</p>
                            </div>
                            <span className="text-sm text-slate">{role.location}</span>
                            <span className="text-sm text-slate">{role.place}</span>
                            <span className="text-sm text-teal">{role.team}</span>
                            <span className="text-xs text-slate/70">{role.type}</span>
                            <span className="text-ink transition-transform group-hover:translate-x-1 sm:justify-self-end">
                                <ArrowIcon size={14} />
                            </span>
                        </motion.a>
                    ))}
                </AnimatePresence>
            </div>

            <div className="mt-10 flex justify-center">
                <a
                    href={ctaHref}
                    className="inline-flex items-center gap-1.5 rounded-md border border-teal/40 px-5 py-2.5 text-sm font-medium text-teal transition-colors hover:bg-teal/10"
                >
                    {t(ctaLabel)}
                    <ArrowIcon />
                </a>
            </div>
        </section>
    );
}