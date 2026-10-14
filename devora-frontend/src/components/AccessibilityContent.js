// src/components/AccessibilityContent.js

"use client";

import Link from "next/link";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";

// English source text. The translations live in the backend catalogs
// (devora-backend/i18n/translations/<code>/accessibility.json), keyed by this exact English text.
const LAST_UPDATED = "Last updated: September 6, 2026";

const INTRO =
    "We believe everyone should be able to explore careers at Devora and apply for a role, regardless of ability. This page outlines our approach to accessibility and how to reach us if something isn't working for you.";

const sections = [
    {
        title: "1. Our Commitment",
        body: [
            "Devora is committed to making our careers site usable by everyone, including people with disabilities. We aim to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA.",
        ],
    },
    {
        title: "2. What We're Doing",
        body: [
            "We design with sufficient color contrast, keyboard navigability, and clear focus states.",
            "We use semantic HTML and labeled form fields so our application forms work well with screen readers.",
            "We respect reduced-motion preferences — if your device or browser is set to reduce motion, our site's animations are minimized or disabled automatically.",
            "We're continuing to test and improve accessibility across the site on an ongoing basis.",
        ],
    },
    {
        title: "3. Known Limitations",
        body: [
            "Some areas of our site are still being improved for full accessibility compliance. If you encounter a barrier, please let us know so we can prioritize a fix.",
        ],
    },
    {
        title: "4. Feedback",
        body: [
            "If you experience any difficulty accessing content or using features on this site, we want to hear from you. Contact us at hello@devora.com, and include the page and a description of the issue.",
            "We aim to respond to accessibility feedback within a reasonable timeframe and address issues as quickly as possible.",
        ],
    },
    {
        title: "5. Alternative Access",
        body: [
            "If you're unable to complete a job application through our online form due to an accessibility barrier, contact us and we'll help you apply through an alternative method.",
        ],
    },
];

export default function AccessibilityContent() {
    const { t } = useLanguage();
    const localizedSections = useLocalized(sections);

    return (
        <section className="bg-white px-4 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl">
                <span className="font-heading text-2xl font-bold text-ink">
                    <span className="text-teal">D</span>evora
                </span>

                <h1 className="mt-6 font-heading text-3xl font-semibold text-ink sm:text-4xl">
                    {t("Accessibility Statement")}
                </h1>
                <p className="mt-2 text-sm text-slate">{t(LAST_UPDATED)}</p>

                <p className="mt-6 text-sm leading-relaxed text-slate">{t(INTRO)}</p>

                <div className="mt-10 divide-y divide-black/10 border-t border-black/10">
                    {localizedSections.map((s, index) => (
                        <div key={sections[index].title} className="py-8">
                            <h2 className="font-heading text-lg font-semibold text-ink">{s.title}</h2>
                            <div className="mt-3 space-y-3">
                                {s.body.map((p, i) => (
                                    <p key={i} className="text-sm leading-relaxed text-slate">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 border-t border-black/10 pt-6 text-center">
                    <div className="flex justify-center gap-6 text-sm">
                        <Link href="/" className="font-medium text-teal hover:opacity-80">{t("View website")}</Link>
                        <Link href="/careers/roles" className="font-medium text-teal hover:opacity-80">{t("View all jobs")}</Link>
                        <Link href="/contact" className="font-medium text-teal hover:opacity-80">{t("Help")}</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
