"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import CatalogIcon from "@/components/CatalogIcons";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const rise = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Index page used by /services, /solutions and /products.
 * The pages themselves stay server components (so they can export `metadata`);
 * this client part translates the text and renders the card grid.
 *
 * items: [{ slug, title, description }]
 */
export default function CatalogList({ eyebrow, heading, intro, basePath, items }) {
  const { t } = useLanguage();

  return (
    <main className="relative flex-1 overflow-hidden bg-navy px-6 py-16 text-white sm:px-10 sm:py-20 lg:px-16 xl:px-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          {eyebrow && <p className="font-mono text-xs tracking-widest text-teal">{t(eyebrow)}</p>}
          <h1 className="mt-3 font-heading text-4xl font-bold leading-tight sm:text-5xl">{t(heading)}</h1>
          {intro && <p className="mt-4 text-base leading-relaxed text-slate sm:text-lg">{t(intro)}</p>}
        </motion.div>

        <motion.ul
          variants={container}
          initial="hidden"
          animate="show"
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {items.map((item, i) => (
            <motion.li key={item.slug} variants={rise} className="h-full">
              <Link
                href={`${basePath}/${item.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-300 hover:border-teal/40 hover:bg-white/[0.06] sm:p-7"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-teal/25 to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal/30 bg-teal/10 text-teal">
                    <CatalogIcon slug={item.slug} />
                  </span>
                  <span className="font-mono text-xs text-slate/70">{String(i + 1).padStart(2, "0")}</span>
                </div>

                <h2 className="relative mt-6 font-heading text-xl font-semibold text-white">{t(item.title)}</h2>
                {item.description && (
                  <p className="relative mt-2 line-clamp-3 text-sm leading-relaxed text-slate">{t(item.description)}</p>
                )}

                <span className="relative mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-teal">
                  {t("Learn more")}
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowIcon />
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:flex-row sm:items-center sm:p-8"
        >
          <div>
            <h3 className="font-heading text-lg font-semibold text-white">{t("Not sure where to start?")}</h3>
            <p className="mt-1 text-sm text-slate">
              {t("Tell us what you're building and we'll point you to the right fit.")}
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 rounded-lg bg-teal px-5 py-2.5 text-sm font-semibold text-navy transition-opacity hover:opacity-90"
          >
            {t("Talk to us")}
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
