//components/RoleDetail.js

"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function PlusIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 1.5V10.5M1.5 6H10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function UploadIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
                d="M12 15V4M12 4L8 8M12 4l4 4M5 16v2a2 2 0 002 2h10a2 2 0 002-2v-2"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function OverviewTab({ role }) {
    return (
        <div className="mt-8 rounded-2xl border border-black/10 p-8">
            <h2 className="font-heading text-lg font-semibold text-ink">Description</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{role.description}</p>

            <h2 className="mt-8 font-heading text-lg font-semibold text-ink">Responsibilities</h2>
            <ul className="mt-3 space-y-2">
                {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {item}
                    </li>
                ))}
            </ul>

            <h2 className="mt-8 font-heading text-lg font-semibold text-ink">Requirements</h2>
            <ul className="mt-3 space-y-2">
                {role.requirements.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Field({ label, required, children }) {
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
                {label}
                {required && <span className="text-teal"> *</span>}
            </label>
            {children}
        </div>
    );
}

const inputClasses =
    "w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal";

function ApplicationTab({ role }) {
    const [submitted, setSubmitted] = useState(false);
    const [willingToWork, setWillingToWork] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="mt-8 rounded-2xl border border-black/10 p-10 text-center">
                <h2 className="font-heading text-lg font-semibold text-ink">Application received</h2>
                <p className="mt-2 text-sm text-slate">
                    Thanks for applying to {role.title}. Our team will review your application and reach out if it's a fit.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-8 space-y-10 rounded-2xl border border-black/10 p-8">
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-lg font-semibold text-ink">Personal information</h2>
                    <button type="button" className="text-xs text-slate hover:text-ink">Clear</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name" required>
                        <input type="text" required className={inputClasses} />
                    </Field>
                    <Field label="Last name" required>
                        <input type="text" required className={inputClasses} />
                    </Field>
                    <Field label="Email" required>
                        <input type="email" required className={inputClasses} />
                    </Field>
                    <Field label="Phone">
                        <div className="flex gap-2">
                            <select className="rounded-md border border-black/10 px-2 text-sm text-ink outline-none focus:border-teal">
                                <option>+92</option>
                                <option>+1</option>
                                <option>+44</option>
                                <option>+971</option>
                            </select>
                            <input type="tel" className={`${inputClasses} flex-1`} />
                        </div>
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Address" required>
                            <input type="text" required placeholder="City, country" className={inputClasses} />
                        </Field>
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-lg font-semibold text-ink">Profile</h2>
                    <button type="button" className="text-xs text-slate hover:text-ink">Clear</button>
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-md border border-black/10 px-4 py-3">
                        <span className="text-sm text-ink">Education (optional)</span>
                        <button type="button" className="flex items-center gap-1 text-sm font-medium text-teal">
                            <PlusIcon /> Add
                        </button>
                    </div>
                    <div className="flex items-center justify-between rounded-md border border-black/10 px-4 py-3">
                        <span className="text-sm text-ink">Experience (optional)</span>
                        <button type="button" className="flex items-center gap-1 text-sm font-medium text-teal">
                            <PlusIcon /> Add
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <Field label="Resume" required>
                    <label className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-black/15 py-10 text-center transition-colors hover:border-teal/50">
                        <span className="text-teal"><UploadIcon /></span>
                        <span className="text-sm text-slate">Choose file or drag and drop here</span>
                        <input type="file" required className="hidden" />
                    </label>
                </Field>
            </section>

            <section>
                <h2 className="mb-4 font-heading text-lg font-semibold text-ink">Details</h2>
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-ink">
                            Are you willing to work on-site during standard business hours? <span className="text-teal">*</span>
                        </label>
                        <div className="flex gap-2">
                            {["Yes", "No"].map((opt) => (
                                <button
                                    key={opt}
                                    type="button"
                                    onClick={() => setWillingToWork(opt)}
                                    className={`rounded-md border px-5 py-2 text-sm font-medium transition-colors ${
                                        willingToWork === opt
                                            ? "border-navy bg-navy text-white"
                                            : "border-black/10 text-slate hover:border-black/20"
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Field label={`How many years of relevant experience do you have for the ${role.title} role?`} required>
                        <textarea rows={2} required className={inputClasses} />
                    </Field>

                    <Field label="Describe a project that best reflects the kind of work you'd do in this role." required>
                        <textarea rows={4} required className={inputClasses} />
                    </Field>
                </div>
            </section>

            <button
                type="submit"
                className="w-full rounded-md bg-teal py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90"
            >
                Submit application
            </button>
        </form>
    );
}

export default function RoleDetail({ slug }) {
    const [role, setRole] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        fetch(`${API_URL}/api/jobs/${slug}`)
            .then((res) => {
                if (res.status === 404) {
                    setNotFound(true);
                    return null;
                }
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((data) => data && setRole(data))
            .catch(() => setNotFound(true));
    }, [slug]);

    if (notFound) {
        return (
            <div className="px-4 py-24 text-center">
                <p className="text-sm text-slate">This role couldn't be found.</p>
                <a href="/careers/roles" className="mt-3 inline-block text-sm font-medium text-teal">
                    Back to all roles
                </a>
            </div>
        );
    }

    if (!role) return <div className="min-h-[600px] bg-white" />;

    return (
        <section className="bg-white px-4 py-16 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl">
                {/* Header */}
                <div className="text-center">
                    <span className="font-heading text-2xl font-bold text-ink">
                        <span className="text-teal">D</span>evora
                    </span>
                    <h1 className="mt-6 font-heading text-2xl font-semibold text-ink sm:text-3xl">{role.title}</h1>
                    <p className="mt-2 text-sm text-slate">
                        {role.workplaceType} · {role.department} · {role.type}
                    </p>
                    <p className="mt-1 text-sm text-slate">{role.location}</p>
                </div>

                {/* Tabs */}
                <div className="mt-8 flex justify-center gap-8 border-b border-black/10">
                    {[
                        { id: "overview", label: "Overview" },
                        { id: "application", label: "Application" },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`relative pb-3 text-sm font-medium transition-colors ${
                                activeTab === tab.id ? "text-ink" : "text-slate hover:text-ink"
                            }`}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-teal" />
                            )}
                        </button>
                    ))}
                </div>

                {activeTab === "overview" ? <OverviewTab role={role} /> : <ApplicationTab role={role} />}

                {activeTab === "overview" && (
                    <div className="mt-8 flex justify-center">
                        <button
                            onClick={() => setActiveTab("application")}
                            className="w-full max-w-xs rounded-md bg-teal py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90 sm:w-auto sm:px-10"
                        >
                            Apply for this job
                        </button>
                    </div>
                )}

                {/* Utility footer */}
                <div className="mt-16 border-t border-black/10 pt-6 text-center">
                    <div className="flex justify-center gap-6 text-sm">
                        <a href="/" className="font-medium text-teal hover:opacity-80">View website</a>
                        <a href="/careers/roles" className="font-medium text-teal hover:opacity-80">View all jobs</a>
                        <a href="/contact" className="font-medium text-teal hover:opacity-80">Help</a>
                    </div>
                    <p className="mt-4 text-xs text-slate">
                        Devora Careers · <a href="/privacy" className="hover:text-ink">Privacy</a> · <a href="/accessibility" className="hover:text-ink">Accessibility</a>
                    </p>
                </div>
            </div>
        </section>
    );
}