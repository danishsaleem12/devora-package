"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

function ProjectCard({ project }) {
    return (
        <motion.a
            href={project.href || "#"}
            variants={rise}
            whileHover={{ y: -4 }}
            className="group block overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-xl transition-shadow hover:shadow-2xl"
        >
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
                {project.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-teal/90 px-3 py-1 text-[11px] font-medium text-navy">
                        {project.tag}
                    </span>
                )}
            </div>
            <div className="p-6">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="font-heading text-lg font-semibold text-white">{project.title}</h3>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors group-hover:border-teal group-hover:text-teal">
                        <ArrowIcon />
                    </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-slate">{project.description}</p>
                {project.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                            <span key={t} className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate/80">
                                {t}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.a>
    );
}

export default function Portfolio() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeFilter, setActiveFilter] = useState("All");
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/portfolio`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load portfolio: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    if (error) {
        return (
            <section className="bg-navy px-6 py-24 text-white">
                <div className="mx-auto max-w-6xl">
                    <p className="max-w-md text-sm text-teal">{error}</p>
                </div>
            </section>
        );
    }

    if (!data) {
        return <section className="min-h-[640px] bg-navy" />;
    }

    const { eyebrow, heading, subheading, filters, projects } = data;
    const filterList = filters?.length ? ["All", ...filters] : ["All"];
    const filteredProjects =
        activeFilter === "All" ? projects : projects.filter((p) => p.tag === activeFilter);

    return (
        <>
            {/* Header */}
            <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14">
                <motion.div
                    className="pointer-events-none absolute -right-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
                    animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                />
                <div className="relative mx-auto max-w-3xl text-center">
                    <motion.p
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-mono text-xs tracking-widest text-teal/80"
                    >
                        {eyebrow}
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-4 font-heading text-4xl font-bold leading-[1.1] sm:text-5xl"
                    >
                        {heading}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
                    >
                        {subheading}
                    </motion.p>
                </div>
            </section>

            {/* Filters + Grid */}
            <section className="bg-[#fafafa] px-4 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {filterList.map((f) => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeFilter === f
                                        ? "bg-navy text-white"
                                        : "bg-white text-slate hover:bg-navy/5"
                                }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeFilter}
                            variants={reduce ? undefined : container}
                            initial={reduce ? undefined : "hidden"}
                            animate={reduce ? undefined : "show"}
                            className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {filteredProjects.map((project) => (
                                <ProjectCard key={project.id} project={project} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-navy px-6 py-16 text-center text-white sm:py-20">
                <h2 className="font-heading text-2xl font-bold sm:text-3xl">Got a project in mind?</h2>
                <p className="mx-auto mt-3 max-w-md text-sm text-slate">
                    Let&apos;s talk about what you&apos;re building and how we can help ship it.
                </p>
                <motion.a
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                >
                    <ArrowIcon />
                    Start a Project
                </motion.a>
            </section>
        </>
    );
}