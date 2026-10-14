"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useLanguage, useLocalized } from "@/components/LanguageProvider";
import { CONTACT_EMAIL } from "@/lib/site";

const sections = [
    {
        id: "acceptance-of-these-terms",
        title: "Acceptance of These Terms",
        body: [
            "By visiting or using this website, you agree to be bound by these Terms & Conditions. If you don't agree with any part of them, please don't continue using the Site.",
            "We may update these terms from time to time as our business, products, or legal obligations change. Continuing to use the Site after an update means you accept the revised terms, so it's worth checking back occasionally.",
            "We may also suspend or restrict access to the Site, at our discretion, where we reasonably believe these terms have been breached.",
        ],
    },
    {
        id: "who-these-terms-are-with",
        title: "Who These Terms Are With",
        body: [
            "This website is operated by Devora and its affiliated entities (referred to here as \"Devora\", \"we\", \"our\", or \"us\"). Devora may operate through different legal entities depending on region, and the specific contracting party for any paid engagement will be identified in the signed services agreement for that work — not on this website.",
        ],
    },
    {
        id: "permitted-use-of-the-site",
        title: "Permitted Use of the Site",
        body: [
            "You're welcome to browse the Site and view or download pages for your own personal, non-commercial reference. Beyond that, content on this Site — text, images, layouts, code, and design — may not be copied, redistributed, republished, or used commercially without our prior written permission.",
            "Framing, mirroring, or embedding this Site or its content within another website is not permitted without our written consent.",
        ],
    },
    {
        id: "prohibited-conduct",
        title: "Prohibited Conduct",
        body: [
            "When using this Site, you agree not to:",
        ],
        list: [
            "Attempt to gain unauthorized access to any part of the Site, its systems, or associated accounts",
            "Probe, scan, or test the security of the Site or its infrastructure",
            "Interfere with or disrupt the normal operation or performance of the Site",
            "Scrape, harvest, or systematically extract content — including for the purpose of training AI or machine-learning models — without our written permission",
            "Misrepresent your identity or affiliation when interacting with the Site",
            "Upload or transmit malicious code, viruses, or anything designed to disrupt the Site",
            "Use the Site in any way that violates applicable law",
        ],
        trailingBody: [
            "Automated access, including crawling, is only permitted in line with the rules published in our robots.txt file.",
        ],
    },
    {
        id: "copyright-and-trademark-notice",
        title: "Copyright and Trademark Notice",
        body: [
            "All content on this Site — including our name, logo, graphics, and written material — is protected by copyright and trademark law and belongs to Devora or its licensors. Nothing on this Site should be read as granting you a license to use our branding without permission.",
        ],
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        body: [
            "Devora retains ownership of all intellectual property in the Site itself, along with any tools, templates, or proprietary methods referenced on it. Intellectual property created for a specific client engagement is governed by the terms of that engagement's signed services agreement, not by this page.",
        ],
    },
    {
        id: "third-party-names-marks-and-partner-certifications",
        title: "Third-Party Names, Marks, and Partner Certifications",
        body: [
            "Names, logos, and marks belonging to other companies that appear on this Site — including technology partners and platforms we work with — remain the property of their respective owners. Their appearance here is only to identify the platforms we work with or hold certifications for, and doesn't imply any endorsement of Devora beyond what's explicitly stated.",
            "Any partner tiers, certification counts, or delivery figures referenced on the Site reflect our position at the time of publishing and may change without notice.",
        ],
    },
    {
        id: "our-products-and-applications",
        title: "Our Products and Applications",
        body: [
            "Devora builds and maintains its own software products, some of which may be distributed through third-party marketplaces or app stores. Use of any such product is governed by that product's own terms and privacy notice, not by this page.",
            "Pricing, features, and availability described on this Site are indicative and subject to change without notice.",
        ],
    },
    {
        id: "client-engagements-proposals-and-enquiries",
        title: "Client Engagements, Proposals, and Enquiries",
        body: [
            "Filling out a form, requesting a quote, or otherwise reaching out through this Site doesn't create a client relationship or obligate either party to move forward. Nothing communicated through the Site — including estimates, timelines, or pricing — is binding.",
            "A client relationship only comes into effect once a written services agreement has been signed by both parties. Please avoid sending confidential, sensitive, or personal information through website forms — use the contact channel agreed as part of your engagement instead.",
        ],
    },
    {
        id: "submissions-feedback-and-unsolicited-ideas",
        title: "Submissions, Feedback, and Unsolicited Ideas",
        body: [
            "We're always glad to hear feedback, but please don't send us confidential or proprietary ideas through the Site. Anything you submit to us this way is treated as non-confidential, and by sending it you grant us a broad, royalty-free license to use it however we see fit.",
            "We may already be working on something similar to what you've suggested, and nothing here obligates us to keep unsolicited submissions confidential or to credit or compensate you for them.",
        ],
    },
    {
        id: "case-studies-metrics-and-forward-looking-statements",
        title: "Case Studies, Metrics, and Forward-Looking Statements",
        body: [
            "Case studies, performance figures, and client outcomes shown on the Site reflect results achieved under specific circumstances for that particular client. They're illustrative examples, not guarantees or predictions of what any other engagement will achieve.",
            "Where a figure is marked as approximate or pending confirmation, treat it accordingly. Any statements about our future plans or roadmap are forward-looking and may change.",
        ],
    },
    {
        id: "no-professional-advice",
        title: "No Professional Advice",
        body: [
            "Articles, guides, and other informational content on this Site are provided for general interest only. None of it constitutes legal, financial, tax, security, or other professional advice, and it shouldn't be relied on as a substitute for guidance from a qualified professional familiar with your specific situation.",
        ],
    },
    {
        id: "general-legal-notice-and-liability-disclaimer",
        title: "General Legal Notice and Liability Disclaimer",
        body: [
            "This Site and its content are provided on an \"as is\" basis. While we make reasonable efforts to keep information accurate and current, Devora doesn't guarantee the completeness or accuracy of anything published here, and accepts no responsibility for consequences arising from its use.",
            "The Site may contain links to websites operated by others. We aren't responsible for the content, accuracy, or practices of any site we don't control.",
        ],
    },
    {
        id: "disclaimer-of-warranties",
        title: "Disclaimer of Warranties",
        body: [
            "To the fullest extent allowed by law, Devora disclaims all warranties relating to the Site, whether express or implied — including any implied warranty of merchantability, fitness for a particular purpose, non-infringement, or uninterrupted, error-free operation.",
            "Some jurisdictions don't allow certain warranty exclusions, so parts of this section may not apply to you depending on where you're located.",
        ],
    },
    {
        id: "limitation-of-liability",
        title: "Limitation of Liability",
        body: [
            "To the maximum extent permitted by law, Devora and its affiliated companies, officers, employees, and agents won't be liable for any indirect, incidental, special, consequential, or punitive damages — or for lost profits, revenue, data, or business opportunity — arising from your use of the Site, whether based in contract, tort, negligence, or otherwise, even if we were advised such damages were possible.",
            "Liability arising under a signed services agreement is governed exclusively by that agreement, not by this website.",
        ],
    },
    {
        id: "indemnification",
        title: "Indemnification",
        body: [
            "You agree to indemnify and hold Devora and its affiliated companies harmless against any claim, loss, liability, or expense — including reasonable legal fees — arising from your use of the Site in breach of these Terms, or from your violation of any law or third-party right.",
        ],
    },
    {
        id: "third-party-sites-and-links",
        title: "Third-Party Sites and Links",
        body: [
            "Where the Site links to third-party platforms — including marketplaces, video hosts, or social networks — those links are provided for convenience. Your use of those platforms is governed by their own terms and privacy policies, and Devora has no control over, and accepts no responsibility for, their content or practices.",
        ],
    },
    {
        id: "privacy-and-cookies",
        title: "Privacy and Cookies",
        body: [
            "How we handle personal information is described in our {privacyPolicy}, and our use of cookies and similar technologies is described in our {cookiePolicy}. Both apply to your use of this Site alongside these Terms.",
        ],
    },
    {
        id: "export-controls-and-sanctions",
        title: "Export Controls and Sanctions",
        body: [
            "You may not use the Site, or receive services from Devora, in a way that violates applicable export control laws, economic sanctions, or anti-boycott regulations. By using the Site, you confirm you're not located in, ordinarily resident in, or acting on behalf of any person or territory subject to comprehensive sanctions that would prohibit us from providing services to you.",
        ],
    },
    {
        id: "governing-law-and-jurisdiction",
        title: "Governing Law and Jurisdiction",
        body: [
            "These Terms are governed by the laws of the jurisdiction specified in your applicable services agreement where one exists. For general use of this website outside of a signed agreement, any dispute will be handled in accordance with applicable local law, and we recommend contacting us directly with any questions about jurisdiction before pursuing formal action.",
        ],
    },
    {
        id: "dispute-resolution",
        title: "Dispute Resolution",
        body: [
            "We'd always prefer to resolve concerns informally — if something's gone wrong, please contact us first so we can try to sort it out directly. Where a dispute can't be resolved this way and relates to a signed services agreement, the dispute resolution process set out in that agreement will apply.",
        ],
    },
    {
        id: "changes-to-these-terms",
        title: "Changes to These Terms",
        body: [
            "We may revise these Terms periodically to reflect changes in our services, business practices, or legal requirements. The \"Last Updated\" date at the top of this page will always show when the current version took effect. Continued use of the Site after a change constitutes your acceptance of the updated Terms.",
        ],
    },
    {
        id: "severability",
        title: "Severability",
        body: [
            "If any part of these Terms is found to be unenforceable or invalid under applicable law, that part will be limited or removed to the minimum extent necessary, and the remaining provisions will continue in full force.",
        ],
    },
    {
        id: "entire-agreement",
        title: "Entire Agreement",
        body: [
            "These Terms, together with our Privacy Policy and Cookie Policy, make up the entire agreement between you and Devora regarding use of this Site, and supersede any prior understanding relating to it. They don't replace or override any separately signed services agreement, which governs the relationship for a specific client engagement.",
        ],
    },
    {
        id: "contact-us",
        title: "Contact Us",
        body: [
            "If you have any questions about these Terms & Conditions, reach out to us at {email}.",
        ],
    },
];

const LAST_UPDATED = "Last Updated: August 18, 2026";

// Fills {placeholders} inside a translated sentence with links / text.
function withSlots(text, slots) {
    return text.split(/(\{\w+\})/).map((part, i) => {
        const name = part.match(/^\{(\w+)\}$/)?.[1];
        return name && slots[name] ? <span key={i}>{slots[name]}</span> : part;
    });
}

export default function TermsConditionsContent() {
    const { t } = useLanguage();
    const localizedSections = useLocalized(sections);

    const slots = {
        privacyPolicy: (
            <Link href="/privacy-policy" className="text-teal hover:opacity-80">
                {t("Privacy Policy")}
            </Link>
        ),
        cookiePolicy: (
            <Link href="/cookie-policy" className="text-teal hover:opacity-80">
                {t("Cookie Policy")}
            </Link>
        ),
        email: (
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-teal hover:opacity-80">
                {CONTACT_EMAIL}
            </a>
        ),
    };

    return (
        <div className="flex min-h-screen flex-col bg-white">
            <Navbar />

            {/* Header */}
            <div className="bg-navy px-6 py-14 sm:px-12 lg:px-20">
                <span className="text-xs font-medium tracking-wide text-teal">{t("LEGAL")}</span>
                <h1 className="mt-3 font-heading text-4xl font-semibold text-white sm:text-5xl">
                    {t("Terms & Conditions")}
                </h1>
                <p className="mt-3 text-sm text-slate">{t(LAST_UPDATED)}</p>
            </div>

            {/* Body */}
            <div className="grid gap-10 px-6 py-12 sm:px-12 lg:grid-cols-[240px_1fr] lg:px-20">
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
                        <p>
                            {t(
                                'These Terms & Conditions govern your use of Devora\'s website, located at our primary domain and any linked pages (collectively, the "Site") — including the information published on it and your ability to register interest, subscribe to updates, or contact us through it.'
                            )}
                        </p>
                        <p>
                            {t(
                                "By using the Site, you agree to be legally bound by these Terms and all applicable laws governing its use."
                            )}{" "}
                            <strong className="text-ink">
                                {t(
                                    "These Terms cover use of this website only. Client engagements are governed separately by the services agreement signed for that work, and nothing on this website varies a signed agreement."
                                )}
                            </strong>
                        </p>
                    </div>

                    <div className="mt-10 space-y-10">
                        {localizedSections.map((s) => (
                            <section key={s.id} id={s.id} className="scroll-mt-24">
                                <h2 className="font-heading text-xl font-semibold text-ink">{s.title}</h2>

                                {s.body && (
                                    <div className="mt-3 space-y-3 text-sm leading-relaxed text-slate">
                                        {s.body.map((p, i) => (
                                            <p key={i}>{withSlots(p, slots)}</p>
                                        ))}
                                    </div>
                                )}

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
                            </section>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
