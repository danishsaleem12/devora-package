"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";

const sections = [
    {
        id: "what-are-cookies",
        title: "What Are Cookies?",
        body: [
            "Cookies are small text files placed on your device when you visit a website. They let a site recognize your browser, remember choices you've made, and understand how you interact with the pages you visit.",
            "Alongside cookies, we may also use related technologies such as pixels, local storage, and tracking tags that serve a similar purpose.",
        ],
    },
    {
        id: "how-we-use-cookies",
        title: "How We Use Cookies",
        body: [
            "We use cookies to keep our Site running smoothly, remember your preferences between visits, understand which pages get used and how, and gauge whether our marketing efforts are actually working.",
            "Some cookies are essential to basic site functions like navigation and security; others are optional and only run with your permission.",
        ],
    },
    {
        id: "types-of-cookies-we-use",
        title: "Types of Cookies We Use",
        subsections: [
            {
                title: "Essential Cookies",
                body: [
                    "These keep the Site functional and secure — things like maintaining your session, preventing fraud, and remembering your cookie preferences. Because the Site can't work properly without them, they're not subject to an opt-out.",
                ],
            },
            {
                title: "Preference Cookies",
                body: [
                    "These remember settings and choices you've made so you don't have to re-enter them each visit. Turning these off won't break the Site, but some conveniences may stop working.",
                ],
            },
            {
                title: "Performance & Analytics Cookies",
                body: [
                    "These help us see how visitors move through the Site — which pages get traffic, where people run into friction, and how we can make navigation better over time.",
                ],
            },
            {
                title: "Marketing Cookies",
                body: [
                    "These help us understand how well our campaigns are performing and tailor what we show you accordingly. They may be set by us or by advertising partners we work with.",
                ],
            },
        ],
    },
    {
        id: "third-party-technologies",
        title: "Third-Party Technologies",
        body: [
            "Some cookies on our Site are placed by third-party services we use — for example, analytics providers or embedded content. These third parties may collect information about your visit according to their own privacy practices, which we don't control.",
        ],
    },
    {
        id: "technologies-currently-in-use",
        title: "Technologies Currently in Use",
        body: [
            "We periodically review and update the specific tools and vendors behind the cookies on our Site. Rather than list exact vendor names here (since they can change), we group them by the categories above so this policy stays accurate as our toolset evolves.",
        ],
    },
    {
        id: "your-cookie-choices",
        title: "Your Cookie Choices",
        body: [
            "Most browsers let you view, manage, and delete cookies through their settings. You can also set your browser to block cookies outright, though doing so may limit some features of the Site.",
            "Where required by law, we'll ask for your consent before setting non-essential cookies, and you'll be able to change your preferences at any time.",
        ],
    },
    {
        id: "how-long-cookies-remain",
        title: "How Long Cookies Remain on Your Device",
        body: [
            "Session cookies are temporary and disappear once you close your browser. Persistent cookies stay on your device for a set period, or until you delete them manually, depending on their purpose.",
        ],
    },
    {
        id: "updates-to-this-policy",
        title: "Updates to This Cookie Policy",
        body: [
            "We may revise this policy from time to time to reflect changes in the technologies we use or in applicable law. The date at the top of this page will always show when it was last updated.",
        ],
    },
    {
        id: "contact-us",
        title: "Contact Us",
        body: [
            "Questions about this Cookie Policy? Reach out to us at hello@devora.com.",
        ],
    },
];

const LAST_UPDATED = "Last Updated: August 11, 2026";

const intro = [
    `This Cookie Policy explains how Devora ("Devora", "we", "our", or "us") uses cookies and related technologies when you visit our website and any related pages (collectively, the "Site").`,
    `This policy works alongside our {privacyPolicy}, which covers how we collect, use, and safeguard personal information more broadly.`,
];

export default function CookiePolicyContent() {
    const { t } = useLanguage();
    const localizedSections = useLocalized(sections);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Header */}
            <div className="bg-navy px-6 py-14 sm:px-12 lg:px-20">
                <span className="text-xs font-medium tracking-wide text-teal">{t("LEGAL")}</span>
                <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">
                    {t("Cookie Policy")}
                </h1>
                <p className="mt-3 text-sm text-slate">{t(LAST_UPDATED)}</p>
            </div>

            {/* Body */}
            <div className="grid gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[220px_1fr] lg:px-20">
                {/* Sidebar nav */}
                <nav className="hidden lg:block">
                    <div className="sticky top-24">
                        <p className="mb-3 text-xs font-medium tracking-wide text-slate">{t("ON THIS PAGE")}</p>
                        <ul className="space-y-2.5 border-l border-black/10 pl-4 text-sm">
                            {localizedSections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="text-slate transition-colors hover:text-ink"
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Content */}
                <div className="max-w-2xl">
                    <div className="space-y-4 text-sm leading-relaxed text-slate">
                        {intro.map((paragraph, i) => {
                            const [before, after] = t(paragraph).split("{privacyPolicy}");
                            return (
                                <p key={i}>
                                    {before}
                                    {after !== undefined && (
                                        <>
                                            <Link href="/privacy-policy" className="text-teal hover:opacity-80">
                                                {t("Privacy Policy")}
                                            </Link>
                                            {after}
                                        </>
                                    )}
                                </p>
                            );
                        })}
                    </div>

                    <div className="mt-10 space-y-10">
                        {localizedSections.map((s) => (
                            <section key={s.id} id={s.id} className="scroll-mt-24">
                                <h2 className="font-heading text-xl font-semibold text-ink">{s.title}</h2>

                                {s.body && (
                                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate">
                                        {s.body.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                )}

                                {s.subsections && (
                                    <div className="mt-5 space-y-5">
                                        {s.subsections.map((sub, i) => (
                                            <div key={i}>
                                                <h3 className="text-sm font-semibold text-ink">{sub.title}</h3>
                                                <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate">
                                                    {sub.body.map((p, j) => (
                                                        <p key={j}>{p}</p>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}