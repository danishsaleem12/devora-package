"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

/* ---------------- Icons ---------------- */

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function ExternalIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 3h5v5M8.5 3.5 3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function DownloadIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v8m0 0 3-3m-3 3-3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function FileIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M4 1.5h5l3 3v10H4v-13Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M9 1.5V4.5h3" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
        </svg>
    );
}
function MailIcon() {
    return (
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <rect x="2" y="3.5" width="12" height="9" rx="1.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M2.5 4.5 8 9l5.5-4.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const rise = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ---------------- As seen in ---------------- */

function AsSeenIn({ names }) {
    if (!names?.length) return null;
    return (
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {names.map((name, i) => (
                <motion.span
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-sm font-semibold text-white/60"
                >
                    {name}
                </motion.span>
            ))}
        </div>
    );
}

/* ---------------- Press release row ---------------- */

function PressReleaseRow({ release, isLast }) {
    return (
        <motion.a
            href={release.href || "#"}
            variants={rise}
            whileHover={{ x: 4 }}
            className={`group flex items-start justify-between gap-6 py-6 ${isLast ? "" : "border-b border-black/5"}`}
        >
            <div>
                <p className="font-mono text-xs tracking-widest text-teal">{release.date}</p>
                <h3 className="mt-2 font-heading text-lg font-semibold leading-snug text-ink sm:text-xl">
                    {release.title}
                </h3>
                {release.excerpt && (
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate">{release.excerpt}</p>
                )}
            </div>
            <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-slate transition-colors group-hover:border-teal group-hover:text-teal">
                <ArrowIcon />
            </span>
        </motion.a>
    );
}

/* ---------------- Coverage card ---------------- */

function CoverageCard({ item }) {
    return (
        <motion.a
            href={item.href || "#"}
            target="_blank"
            rel="noopener noreferrer"
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
            {item.imageUrl && (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            )}
            <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                        {item.publication}
                    </span>
                    <span className="text-slate/40 transition-colors group-hover:text-teal">
                        <ExternalIcon />
                    </span>
                </div>
                <h3 className="mt-3 font-heading text-base font-semibold leading-snug text-ink">{item.title}</h3>
                {item.excerpt && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{item.excerpt}</p>
                )}
                <p className="mt-4 text-xs text-slate/50">{item.date}</p>
            </div>
        </motion.a>
    );
}

/* ---------------- Media kit item ---------------- */

function MediaKitItem({ item }) {
    return (
        <motion.a
            href={item.href || "#"}
            variants={rise}
            whileHover={{ y: -3 }}
            className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-teal/40"
        >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal/10 text-teal">
                <FileIcon />
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-slate/60">
                    {item.format}{item.fileSize ? ` · ${item.fileSize}` : ""}
                </p>
            </div>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white/60 transition-colors group-hover:border-teal group-hover:text-teal">
                <DownloadIcon />
            </span>
        </motion.a>
    );
}

/* ---------------- Media contact ---------------- */

function MediaContact({ contact }) {
    if (!contact) return null;
    return (
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-black/5 bg-[#fafafa] p-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
                {contact.avatarUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={contact.avatarUrl} alt={contact.name} className="h-14 w-14 rounded-full object-cover" />
                )}
                <div>
                    <p className="font-heading text-base font-semibold text-ink">{contact.name}</p>
                    <p className="text-xs text-slate/60">{contact.role}</p>
                </div>
            </div>
            {contact.email && (
                <motion.a
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-1.5 rounded-md bg-navy px-5 py-3 text-sm font-medium text-white"
                >
                    <MailIcon />
                    {contact.email}
                </motion.a>
            )}
        </div>
    );
}

/* ---------------- Main component ---------------- */

export default function NewsMedia() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/news-media`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load news & media: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    const {
        eyebrow = "NEWS & MEDIA",
        heading = "What's happening at Devora\nand what people are saying.",
        subheading = "",
        asSeenIn = [],
        pressReleases = [],
        coverage = [],
        mediaKit = [],
        contact = null,
    } = data || {};

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

    return (
        <>
            {/* Header */}
            <section className="relative overflow-hidden bg-navy px-6 py-20 text-white sm:px-10 sm:py-24 lg:px-14">
                <motion.div
                    className="pointer-events-none absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-teal/10 blur-[120px]"
                    animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
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
                        className="mt-4 whitespace-pre-line font-heading text-4xl font-bold leading-[1.1] sm:text-5xl"
                    >
                        {heading}
                    </motion.h1>
                    {subheading && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate"
                        >
                            {subheading}
                        </motion.p>
                    )}

                    {asSeenIn.length > 0 && (
                        <div className="mt-12 border-t border-white/10 pt-8">
                            <p className="mb-5 text-[11px] font-medium tracking-widest text-slate/50">AS SEEN IN</p>
                            <AsSeenIn names={asSeenIn} />
                        </div>
                    )}
                </div>
            </section>

            {/* Press releases */}
            {pressReleases.length > 0 && (
                <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                    <div className="mx-auto max-w-3xl">
                        <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">Press releases</h2>
                        <motion.div
                            variants={reduce ? undefined : container}
                            initial={reduce ? undefined : "hidden"}
                            whileInView={reduce ? undefined : "show"}
                            viewport={{ once: true, amount: 0.1 }}
                            className="mt-6"
                        >
                            {pressReleases.map((release, i) => (
                                <PressReleaseRow
                                    key={release.id}
                                    release={release}
                                    isLast={i === pressReleases.length - 1}
                                />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Media coverage */}
            {coverage.length > 0 && (
                <section className="bg-[#fafafa] px-4 py-16 sm:px-8 sm:py-20 lg:px-12">
                    <div className="mx-auto max-w-6xl">
                        <h2 className="font-heading text-2xl font-bold text-ink sm:text-3xl">In the media</h2>
                        <motion.div
                            variants={reduce ? undefined : container}
                            initial={reduce ? undefined : "hidden"}
                            whileInView={reduce ? undefined : "show"}
                            viewport={{ once: true, amount: 0.1 }}
                            className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                        >
                            {coverage.map((item) => (
                                <CoverageCard key={item.id} item={item} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Media kit */}
            {mediaKit.length > 0 && (
                <section className="bg-navy px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="font-heading text-2xl font-bold text-white sm:text-3xl">Media kit</h2>
                        <p className="mt-2 max-w-xl text-sm text-slate">
                            Logos, product screenshots, and brand guidelines for press and partners.
                        </p>
                        <motion.div
                            variants={reduce ? undefined : container}
                            initial={reduce ? undefined : "hidden"}
                            whileInView={reduce ? undefined : "show"}
                            viewport={{ once: true, amount: 0.2 }}
                            className="mt-8 grid gap-4 sm:grid-cols-2"
                        >
                            {mediaKit.map((item) => (
                                <MediaKitItem key={item.id} item={item} />
                            ))}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Contact */}
            <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto max-w-3xl">
                    <MediaContact contact={contact} />
                </div>
            </section>
        </>
    );
}