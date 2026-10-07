// app/privacy/page.js

export const metadata = {
    title: "Privacy Policy | Devora",
    description: "How Devora collects, uses, and protects your personal information.",
};

const sections = [
    {
        title: "1. Information We Collect",
        body: [
            "When you apply for a role or otherwise interact with our careers site, we may collect: your name, email address, phone number, address, resume/CV, work experience, education history, and any other information you choose to submit through our application forms.",
            "We also automatically collect limited technical information such as your browser type, device type, and pages visited, to help us understand how our site is used.",
        ],
    },
    {
        title: "2. How We Use Your Information",
        body: [
            "We use the information you provide to evaluate your application, contact you about roles, and manage our recruiting process.",
            "We may also use aggregated, non-identifying data to improve our careers site and hiring process.",
            "We do not sell your personal information to third parties.",
        ],
    },
    {
        title: "3. How We Share Your Information",
        body: [
            "Your application information is shared internally with hiring managers and team members involved in the recruiting process.",
            "We may share information with service providers who help us operate our recruiting systems (e.g., applicant tracking tools), under confidentiality obligations.",
            "We may disclose information if required by law or to protect our legal rights.",
        ],
    },
    {
        title: "4. Data Retention",
        body: [
            "We retain application data for as long as necessary to evaluate your candidacy and, where permitted, to consider you for future roles.",
            "You may request deletion of your data at any time by contacting us using the details below.",
        ],
    },
    {
        title: "5. Cookies & Tracking",
        body: [
            "Our site may use cookies or similar technologies to remember basic preferences and understand site usage. You can control cookies through your browser settings.",
        ],
    },
    {
        title: "6. Your Rights",
        body: [
            "Depending on your location, you may have the right to access, correct, or delete your personal information, or to object to certain processing.",
            "To exercise these rights, contact us at the email address below.",
        ],
    },
    {
        title: "7. Security",
        body: [
            "We take reasonable technical and organizational measures to protect your information. However, no method of transmission or storage is completely secure.",
        ],
    },
    {
        title: "8. Changes to This Policy",
        body: [
            "We may update this policy from time to time. The 'Last updated' date below reflects the most recent revision.",
        ],
    },
    {
        title: "9. Contact Us",
        body: [
            "If you have questions about this policy or how we handle your data, contact us at privacy@devora.example.",
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <section className="bg-white px-4 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl">
                <span className="font-heading text-2xl font-bold text-ink">
                    <span className="text-teal">D</span>evora
                </span>

                <h1 className="mt-6 font-heading text-3xl font-semibold text-ink sm:text-4xl">
                    Privacy Policy
                </h1>
                <p className="mt-2 text-sm text-slate">Last updated: September 6, 2026</p>

                <p className="mt-6 text-sm leading-relaxed text-slate">
                    This policy explains how Devora collects, uses, and protects the personal
                    information you share with us through our careers site, including when you
                    apply for a role.
                </p>

                <div className="mt-10 divide-y divide-black/10 border-t border-black/10">
                    {sections.map((s) => (
                        <div key={s.title} className="py-8">
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
                        <a href="/" className="font-medium text-teal hover:opacity-80">View website</a>
                        <a href="/careers/roles" className="font-medium text-teal hover:opacity-80">View all jobs</a>
                        <a href="/contact" className="font-medium text-teal hover:opacity-80">Help</a>
                    </div>
                </div>
            </div>
        </section>
    );
}