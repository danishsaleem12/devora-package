"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PAGE_SIZE = 6;

/* ---------------- Icons ---------------- */

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}
function ClockIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6.2" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 4.6V8l2.6 1.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
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

/* ---------------- Featured post ---------------- */

function FeaturedPost({ post }) {
    if (!post) return null;
    return (
        <motion.a
            href={post.href || "#"}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="group grid overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl lg:grid-cols-2"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {post.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-teal px-3 py-1 text-[11px] font-medium text-navy">
                        {post.tag}
                    </span>
                )}
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                <span className="text-[11px] font-medium uppercase tracking-widest text-teal">Featured</span>
                <h2 className="mt-3 font-heading text-2xl font-bold leading-snug text-ink sm:text-3xl">
                    {post.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate sm:text-base">{post.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-xs text-slate/60">
                    <span>{post.author}</span>
                    <span className="h-1 w-1 rounded-full bg-slate/40" />
                    <span>{post.date}</span>
                    <span className="h-1 w-1 rounded-full bg-slate/40" />
                    <span className="flex items-center gap-1"><ClockIcon /> {post.readTime}</span>
                </div>
                <span className="mt-6 flex items-center gap-1.5 text-sm font-medium text-teal">
                    Read the post <ArrowIcon />
                </span>
            </div>
        </motion.a>
    );
}

/* ---------------- Blog card ---------------- */

function BlogCard({ post }) {
    return (
        <motion.a
            href={post.href || "#"}
            variants={rise}
            whileHover={{ y: -4 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
        >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {post.tag && (
                    <span className="absolute left-4 top-4 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-medium text-white">
                        {post.tag}
                    </span>
                )}
            </div>
            <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold leading-snug text-ink">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate">{post.excerpt}</p>
                <div className="mt-5 flex items-center justify-between border-t border-black/5 pt-4 text-xs text-slate/60">
                    <span>{post.author}</span>
                    <span className="flex items-center gap-1"><ClockIcon /> {post.readTime}</span>
                </div>
            </div>
        </motion.a>
    );
}

/* ---------------- Newsletter CTA ---------------- */

function NewsletterCta() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        if (!email) return;
        setSubmitted(true);
    }

    return (
        <div className="rounded-2xl bg-navy p-8 text-white sm:p-10">
            <p className="font-mono text-xs tracking-widest text-teal/80">THE DEVORA BLOG</p>
            <h3 className="mt-3 font-heading text-2xl font-bold sm:text-3xl">
                New posts, straight to your inbox.
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">
                No spam — just an email whenever we publish something worth reading.
            </p>
            {submitted ? (
                <p className="mt-6 text-sm text-teal">You&apos;re on the list.</p>
            ) : (
                <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        className="w-full rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate/50 focus:border-teal focus:outline-none"
                    />
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        className="flex shrink-0 items-center justify-center gap-1.5 rounded-md bg-teal px-5 py-3 text-sm font-medium text-navy"
                    >
                        Subscribe
                        <ArrowIcon />
                    </motion.button>
                </form>
            )}
        </div>
    );
}

/* ---------------- Main component ---------------- */

export default function BlogIndex() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const reduce = useReducedMotion();

    useEffect(() => {
        fetch(`${API_URL}/api/blogs`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch((err) =>
                setError(`Could not load blog posts: ${err.message}. Is the backend running on ${API_URL}?`)
            );
    }, []);

    const {
        eyebrow = "INSIGHTS & UPDATES",
        heading = "Ideas on design, engineering,\nand building without breaking things.",
        subheading = "",
        categories = [],
        featured = null,
        posts = [],
    } = data || {};

    const categoryList = useMemo(
        () => (categories.length ? ["All", ...categories] : ["All"]),
        [categories]
    );

    const filteredPosts = useMemo(
        () => (activeCategory === "All" ? posts : posts.filter((p) => p.tag === activeCategory)),
        [posts, activeCategory]
    );

    const visiblePosts = filteredPosts.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPosts.length;

    function handleCategoryChange(cat) {
        setActiveCategory(cat);
        setVisibleCount(PAGE_SIZE);
    }

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
                </div>
            </section>

            {/* Featured + grid */}
            <section className="bg-[#fafafa] px-4 py-14 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <FeaturedPost post={featured} />

                    <div className="mt-12 flex flex-wrap items-center justify-center gap-2">
                        {categoryList.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    activeCategory === cat
                                        ? "bg-navy text-white"
                                        : "bg-white text-slate hover:bg-navy/5"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <motion.div
                        key={activeCategory}
                        variants={reduce ? undefined : container}
                        initial={reduce ? undefined : "hidden"}
                        animate={reduce ? undefined : "show"}
                        className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                    >
                        {visiblePosts.map((post) => (
                            <BlogCard key={post.id} post={post} />
                        ))}
                    </motion.div>

                    {visiblePosts.length === 0 && (
                        <p className="mt-10 text-center text-sm text-slate">No posts in this category yet.</p>
                    )}

                    {hasMore && (
                        <div className="mt-10 flex justify-center">
                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                                className="rounded-md border border-navy/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-teal hover:text-teal"
                            >
                                Load more posts
                            </motion.button>
                        </div>
                    )}
                </div>
            </section>

            {/* Newsletter */}
            <section className="bg-white px-6 py-16 sm:px-10 sm:py-20 lg:px-14">
                <div className="mx-auto max-w-4xl">
                    <NewsletterCta />
                </div>
            </section>
        </>
    );
}