"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { apiGet } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { getRelatedWorkIds } from "@/data/serviceRelatedWork";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WorkCard({ study, index }) {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        href={study.href}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-xl"
      >
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={study.imageUrl}
            alt={study.client}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/0 to-transparent" />
          <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between">
            <span className="text-sm font-semibold text-white">{study.client}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium text-white/90">
              {study.industry}
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-lg font-semibold leading-snug text-ink">{study.headline}</h3>

          <div className="mt-5 flex gap-6 border-t border-black/5 pt-5">
            {[study.stat1, study.stat2].filter(Boolean).map((stat) => (
              <div key={stat.label}>
                <p className="font-heading text-xl font-bold text-ink">{stat.value}</p>
                <p className="mt-0.5 text-xs text-slate">{stat.label}</p>
              </div>
            ))}
          </div>

          <span className="mt-auto flex items-center gap-1.5 pt-6 text-sm font-medium text-teal">
            {t("Read case study")}
            <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              <ArrowIcon />
            </span>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ServiceRelatedWork({ service }) {
  const { t } = useLanguage();
  const [studies, setStudies] = useState([]);

  const ids = getRelatedWorkIds(service?.slug);

  useEffect(() => {
    if (!ids.length) return;
    let ignore = false;
    apiGet("case-studies")
      .then((data) => {
        if (ignore) return;
        const all = data.caseStudies ?? [];
        // keep the order defined in serviceRelatedWork.js
        setStudies(ids.map((id) => all.find((s) => s.id === id)).filter(Boolean));
      })
      .catch(() => {}); // section simply stays hidden if the backend is unreachable
    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [service?.slug]);

  if (!studies.length) return null;

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
        <div className="relative text-ink">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <p className="font-mono text-xs tracking-widest text-teal">{t("RELATED WORK")}</p>
              <h2 className="mt-3 font-heading text-3xl font-bold leading-tight sm:text-4xl">
                {t("See it in practice.")}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {t("Real projects with the numbers behind them, from the same kind of work.")}
              </p>
            </motion.div>

            <Link
              href="/resources/case-studies"
              className="flex shrink-0 items-center gap-1.5 text-sm font-medium text-teal hover:underline"
            >
              {t("View all case studies")}
              <ArrowIcon />
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {studies.map((study, i) => (
              <WorkCard key={study.id} study={study} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
