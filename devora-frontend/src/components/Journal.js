"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";


function ArrowIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedArticle({ featured }) {
  const { t } = useLanguage();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={featured.href || "/resources/journal"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="group block"
    >
      <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-navy sm:h-80">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={featured.imageUrl}
          alt={featured.title}
          className="h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105"
          style={{ opacity: hovered ? 0.5 : 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/30" />
        <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
          <span className="w-fit rounded-full border border-white/20 px-3 py-1 text-[11px] font-medium tracking-widest text-teal">
            {featured.category}
          </span>
          <div>
            <p className="text-[11px] uppercase tracking-widest text-slate/60">{t("Featured essay")}</p>
            <h3 className="mt-2 text-xl font-bold leading-snug text-white sm:text-2xl">
              {featured.title}
            </h3>
          </div>
        </div>
        <motion.span
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
          transition={{ duration: 0.25 }}
          className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full bg-teal text-navy sm:bottom-8 sm:right-8"
        >
          <ArrowIcon size={14} />
        </motion.span>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-slate">{featured.excerpt}</p>
      <div className="mt-3 flex items-center gap-2 text-xs text-slate/70">
        <span className="font-medium text-ink">{featured.author}</span>
        <span>· {featured.role}</span>
        <span>· {featured.date}</span>
        <span>· {featured.readTime}</span>
      </div>
    </motion.a>
  );
}

function ArticleRow({ article, index }) {
  return (
    <motion.a
      href={article.href || "/resources/journal"}
      initial={{ opacity: 0, x: 12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group flex items-start justify-between gap-4 border-b border-black/5 py-4 first:pt-0"
    >
      <div>
        <span className="text-[11px] font-medium uppercase tracking-wide text-teal">{article.category}</span>
        <h4 className="mt-1.5 text-sm font-semibold leading-snug text-ink transition-colors group-hover:text-teal">
          {article.title}
        </h4>
        <p className="mt-1.5 text-xs text-slate/60">{article.date} · {article.readTime}</p>
      </div>
      <span className="mt-1 shrink-0 text-slate/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-teal">
        <ArrowIcon />
      </span>
    </motion.a>
  );
}

export default function Journal() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { t, te } = useLanguage();

  useEffect(() => {
    apiFetch("journal")
      .then((res) => {
        if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <section className="bg-white px-6 py-16">
        <p className="mx-auto max-w-6xl text-sm text-red-500">
          {te("Could not load journal. Please try again in a moment.", error)}
        </p>
      </section>
    );
  }
  if (!data) return <section className="h-[600px] bg-white" />;

  const filteredArticles =
    activeCategory === "All"
      ? data.articles
      : data.articles.filter((a) => a.category === activeCategory);

  return (
    <section className="bg-white px-6 py-20 sm:px-10 sm:py-24 lg:px-14">
      <div className="mx-auto max-w-none">
        <div className="flex flex-col gap-4 border-b border-black/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-widest text-teal">{data.eyebrow}</p>
            <h2 className="mt-2 font-heading text-2xl font-bold leading-tight text-ink sm:text-3xl">
              {data.heading}
            </h2>
          </motion.div>

          {data.cta && (
            <a
              href={data.cta.href}
              className="flex w-fit items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-teal"
            >
              {data.cta.label}
              <ArrowIcon />
            </a>
          )}
        </div>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
          <FeaturedArticle featured={data.featured} />

          <div>
            <div className="flex flex-wrap gap-2">
              {data.categories.map((cat) => {
                const isActive = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      isActive
                        ? "border-navy bg-navy text-white"
                        : "border-black/10 text-slate hover:border-black/20 hover:text-ink"
                    }`}
                  >
                    {cat === "All" ? t("All") : cat}
                  </button>
                );
              })}
            </div>

            <div className="mt-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {filteredArticles.map((article, i) => (
                    <ArticleRow key={article.id} article={article} index={i} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}