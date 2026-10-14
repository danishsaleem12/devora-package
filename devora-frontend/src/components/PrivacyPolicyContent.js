"use client";

import Navbar from "@/components/Navbar";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";
import { CONTACT_EMAIL } from "@/lib/site";

const sections = [
    {
        id: "updates-and-changes",
        title: "Updates and Changes to the Privacy Policy",
        body: [
            "In the event of a change in this policy, a revised Privacy Policy will be posted to our Website, and the 'Updated' date will be changed. If the revised Privacy Policy contains a material change to how we collect or use personal information, notice of the change will be emailed to you or posted on the Website's home page.",
            "Please revisit this page to familiarize yourself with changes to the Privacy Policy. You agree to accept posting of a revised Privacy Policy as described herein as actual notice to you of such revised Privacy Policy. Your continued use of the Services after such posting constitutes the collection and use of your information as described in the then-current Privacy Policy.",
        ],
    },
    {
        id: "information-we-collect",
        title: "Information We Collect",
        body: [
            "We are required by law, regulation or securities reasons to ask for certain personal information in order to provide our Services to you. Devora makes commercially reasonable best efforts to maintain the confidentiality, integrity and security of our clients' personal information. You may choose to provide additional information during subsequent visits to the Site, but keep in mind that some of this information will be required if you wish to partake in the Services.",
            "When visiting our website, we also store every instance of access in a log file. The following data are stored in this process:",
        ],
        list: [
            "Computer or mobile device information",
            "Website from which our domain is accessed and website usage information",
            "Operating system of your computer",
            "Country from which our website is accessed",
            "Name of your internet provider",
            "Name and URL of the data accessed",
            "Date and time of access",
            "IP address of the accessing computer",
        ],
        trailingBody: [
            "Keeping client information secure, and using it only as our Users want us to, are matters of principle for all of us at Devora. With this in mind, here is our commitment to each and every User:",
        ],
        trailingList: [
            "Except as you may otherwise expressly approve, we will limit the collection and use of client and user information to what we believe would be useful to service your accounts, administer our business, or to tell you about our Services;",
            "We will not sell client information to third parties;",
        ],
    },
    {
        id: "how-and-why-we-gather-information",
        title: "How and Why We Gather Information",
        body: [
            "We collect information you provide directly to us, such as when you fill out a contact form, apply for a role, or subscribe to updates. We also collect information automatically as you navigate the Site, using cookies, log files, and similar technologies.",
            "We use this information to operate and improve our Services, respond to inquiries, personalize your experience, and comply with legal obligations.",
        ],
    },
    {
        id: "cookies",
        title: "Cookies",
        body: [
            "Our Site uses cookies to distinguish you from other users, remember your preferences, and understand how the Site is used. You can set your browser to refuse cookies, though some parts of the Site may not function properly as a result.",
        ],
    },
    {
        id: "analytics-and-tracking-technologies",
        title: "Analytics and Tracking Technologies",
        body: [
            "We use third-party analytics services to help us understand how visitors engage with our Site. These services may use cookies and similar technologies to collect information about your use of the Site and other websites.",
        ],
    },
    {
        id: "social-media-services",
        title: "Social Media Services",
        body: [
            "Our Site may include links to our social media profiles. Your interactions with these features are governed by the privacy policies of the companies providing them.",
        ],
    },
    {
        id: "notifications-and-communications",
        title: "Notifications and Communications",
        body: [
            "We may use your contact information to send administrative notices, respond to your inquiries, or, where you've opted in, send updates about our Services.",
        ],
    },
    {
        id: "opt-out-policy",
        title: "Opt-Out Policy",
        body: [
            "You may opt out of receiving promotional communications from us at any time by following the unsubscribe instructions included in those communications, or by contacting us directly.",
        ],
    },
    {
        id: "information-security",
        title: "Information Security",
        body: [
            "We implement reasonable technical and organizational measures designed to protect your personal information. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.",
        ],
    },
    {
        id: "security-notifications",
        title: "Security Notifications",
        body: [
            "In the event of a data breach affecting your personal information, we will notify you and take appropriate steps in accordance with applicable law.",
        ],
    },
    {
        id: "view-and-correct-your-information",
        title: "View and Correct Your Information",
        body: [
            "You may request access to, correction of, or deletion of the personal information we hold about you by contacting us using the details below.",
        ],
    },
    {
        id: "links-to-other-sites",
        title: "Links to Other Sites",
        body: [
            "Our Site may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and encourage you to review their policies directly.",
        ],
    },
    {
        id: "international-visitors",
        title: "International Visitors",
        body: [
            "If you are accessing our Site from outside Pakistan, please be aware that your information may be transferred to, stored, and processed in Pakistan or other countries where our servers or service providers are located.",
        ],
    },
    {
        id: "childrens-privacy",
        title: "Children's Privacy",
        body: [
            "Our Services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If we become aware that we have inadvertently collected such information, we will take steps to delete it.",
        ],
    },
    {
        id: "contact-information",
        title: "Contact Information",
        body: [
            "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at hello@devora.com.",
        ],
    },
];

// Intro paragraphs live here (not inline in the JSX) so they can be translated.
// "{email}" is replaced by the mailto link when rendered.
const intro = [
    `The website ("Site") for Devora LLC ("Devora", "We", "Our", "Us" or "Company") was created to provide software development services (the "Services"). The privacy of our Site visitors is important to us, and in order to protect your personal information we have implemented the following Privacy Policy, with provisions that apply to the collection of data by Devora, its subsidiaries, and its affiliates.`,
    `Our Privacy Policy discloses the type and nature of information we collect and how we use it, as well as the choices you can make about the way your information is collected and used. By exploring and using Devora's Site and Services, and by submitting information to Devora, you signify acceptance of the terms of our Privacy Policy. If you have questions or concerns regarding this statement, you should first contact us at {email}.`,
];

const LAST_UPDATED = "Last Updated: August 8, 2026";

export default function PrivacyPolicyContent() {
    const { t } = useLanguage();
    const localizedSections = useLocalized(sections);

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Header */}
            <div className="bg-navy px-6 py-14 sm:px-12 lg:px-20">
                <span className="text-xs font-medium tracking-wide text-teal">{t("LEGAL")}</span>
                <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">
                    {t("Privacy Policy")}
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
                            const [before, after] = t(paragraph).split("{email}");
                            return (
                                <p key={i}>
                                    {before}
                                    {after !== undefined && (
                                        <>
                                            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:opacity-80">
                                                {CONTACT_EMAIL}
                                            </a>
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

                                <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate">
                                    {s.body.map((p, i) => (
                                        <p key={i}>{p}</p>
                                    ))}
                                </div>

                                {s.list && (
                                    <ul className="mt-3 space-y-1.5">
                                        {s.list.map((item, i) => (
                                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {s.trailingBody && (
                                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate">
                                        {s.trailingBody.map((p, i) => (
                                            <p key={i}>{p}</p>
                                        ))}
                                    </div>
                                )}

                                {s.trailingList && (
                                    <ul className="mt-3 space-y-1.5">
                                        {s.trailingList.map((item, i) => (
                                            <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}