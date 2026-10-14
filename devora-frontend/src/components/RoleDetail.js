//components/RoleDetail.js

"use client";

import Link from "next/link";
import { API_URL, apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useRef, useState } from "react";


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
    const { t } = useLanguage();
    return (
        <div className="mt-8 rounded-2xl border border-black/10 p-8">
            <h2 className="font-heading text-lg font-semibold text-ink">{t("Description")}</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate">{role.description}</p>

            <h2 className="mt-8 font-heading text-lg font-semibold text-ink">{t("Responsibilities")}</h2>
            <ul className="mt-3 space-y-2">
                {role.responsibilities.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-slate">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal" />
                        {item}
                    </li>
                ))}
            </ul>

            <h2 className="mt-8 font-heading text-lg font-semibold text-ink">{t("Requirements")}</h2>
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
    const { t } = useLanguage();
    return (
        <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">
                {t(label)}
                {required && <span className="text-teal"> *</span>}
            </label>
            {children}
        </div>
    );
}

const inputClasses =
    "w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-teal";

function ApplicationTab({ role }) {
    const { t } = useLanguage();
    const [submitted, setSubmitted] = useState(false);
    const [willingToWork, setWillingToWork] = useState(null);
    const [resumeName, setResumeName] = useState("");
    const [resumeFile, setResumeFile] = useState(null);
    const [sending, setSending] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [showEducation, setShowEducation] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [fileKey, setFileKey] = useState(0); // changing it resets the file input
    const formRef = useRef(null);

    // "Clear" in Personal information: empties those fields
    const clearPersonal = () => {
        const form = formRef.current;
        if (!form) return;
        ["firstName", "lastName", "email", "phone", "address"].forEach((name) => {
            if (form.elements[name]) form.elements[name].value = "";
        });
        if (form.elements.phoneCode) form.elements.phoneCode.selectedIndex = 0;
    };

    // "Clear" in Profile: closes the Education / Experience boxes (their text is discarded) and removes the chosen resume
    const clearProfile = () => {
        setShowEducation(false);
        setShowHistory(false);
        setResumeName("");
        setResumeFile(null);
        setFileKey((k) => k + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sending) return;

        if (!willingToWork) {
            setSubmitError("Please answer the on-site question.");
            return;
        }

        setSending(true);
        setSubmitError("");

        const f = new FormData(e.currentTarget);
        const phoneNumber = String(f.get("phone") || "").trim();
        // multipart (not JSON) so the resume file can travel with the form
        const payload = new FormData();
        const fields = {
            jobSlug: role.slug,
            firstName: f.get("firstName"),
            lastName: f.get("lastName"),
            email: f.get("email"),
            phone: phoneNumber ? `${f.get("phoneCode")} ${phoneNumber}` : "",
            address: f.get("address"),
            willingToWorkOnsite: willingToWork,
            education: f.get("education") || "",
            workHistory: f.get("workHistory") || "",
            experience: f.get("experience"),
            projectDescription: f.get("projectDescription"),
            website: f.get("website"), // hidden honeypot, must be empty
        };
        for (const [key, value] of Object.entries(fields)) payload.append(key, value ?? "");
        if (resumeFile) payload.append("resume", resumeFile);

        try {
            const res = await fetch(`${API_URL}/api/applications`, {
                method: "POST", // no Content-Type header: the browser adds the multipart boundary itself
                body: payload,
            });
            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Something went wrong. Please try again.");
            }
            setSubmitted(true);
        } catch (err) {
            setSubmitError(
                err instanceof TypeError ? "Could not reach the server. Please try again." : err.message
            );
        } finally {
            setSending(false);
        }
    };

    if (submitted) {
        return (
            <div className="mt-8 rounded-2xl border border-black/10 p-10 text-center">
                <h2 className="font-heading text-lg font-semibold text-ink">{t("Application received")}</h2>
                <p className="mt-2 text-sm text-slate">
                    {t("Thanks for applying to {title}. Our team will review your application and reach out if it's a fit.").replace("{title}", role.title)}
                </p>
            </div>
        );
    }

    return (
        <form ref={formRef} onSubmit={handleSubmit} className="relative mt-8 space-y-10 overflow-hidden rounded-2xl border border-black/10 p-8">
            {/* Honeypot: hidden from people, bots fill it in. Must stay empty. */}
            <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />
            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-lg font-semibold text-ink">{t("Personal information")}</h2>
                    <button type="button" onClick={clearPersonal} className="text-xs text-slate hover:text-ink">{t("Clear")}</button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="First name" required>
                        <input type="text" name="firstName" required maxLength={80} className={inputClasses} />
                    </Field>
                    <Field label="Last name" required>
                        <input type="text" name="lastName" required maxLength={80} className={inputClasses} />
                    </Field>
                    <Field label="Email" required>
                        <input type="email" name="email" required maxLength={160} className={inputClasses} />
                    </Field>
                    <Field label="Phone">
                        <div className="flex gap-2">
                            <select name="phoneCode" className="rounded-md border border-black/10 px-2 text-sm text-ink outline-none focus:border-teal">
                                <option>+92</option>
                                <option>+1</option>
                                <option>+44</option>
                                <option>+971</option>
                            </select>
                            <input type="tel" name="phone" maxLength={30} className={`${inputClasses} flex-1`} />
                        </div>
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Address" required>
                            <input type="text" name="address" required maxLength={200} placeholder={t("City, country")} className={inputClasses} />
                        </Field>
                    </div>
                </div>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-heading text-lg font-semibold text-ink">{t("Profile")}</h2>
                    <button type="button" onClick={clearProfile} className="text-xs text-slate hover:text-ink">{t("Clear")}</button>
                </div>
                <div className="space-y-3">
                    {[
                        { key: "education", label: "Education (optional)", placeholder: "Degree, school, years", open: showEducation, setOpen: setShowEducation },
                        { key: "workHistory", label: "Experience (optional)", placeholder: "Roles, companies, years", open: showHistory, setOpen: setShowHistory },
                    ].map((item) => (
                        <div key={item.key} className="rounded-md border border-black/10 px-4 py-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-ink">{t(item.label)}</span>
                                <button
                                    type="button"
                                    onClick={() => item.setOpen((v) => !v)}
                                    className="flex items-center gap-1 text-sm font-medium text-teal"
                                >
                                    {item.open ? t("Remove") : (<><PlusIcon /> {t("Add")}</>)}
                                </button>
                            </div>
                            {item.open && (
                                <textarea
                                    name={item.key}
                                    rows={3}
                                    maxLength={1500}
                                    placeholder={t(item.placeholder)}
                                    className={`${inputClasses} mt-3`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <Field label="Resume (PDF, DOC or DOCX, up to 5 MB)">
                    <label className="mt-1.5 flex cursor-pointer flex-col items-center gap-2 rounded-lg border-2 border-dashed border-black/15 py-10 text-center transition-colors hover:border-teal/50">
                        <span className="text-teal"><UploadIcon /></span>
                        <span className="text-sm text-slate">{resumeName || t("Choose file or drag and drop here")}</span>
                        <input
                            key={fileKey}
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                if (file && file.size > 5 * 1024 * 1024) {
                                    setSubmitError("Your resume is too large. The limit is 5 MB.");
                                    e.target.value = "";
                                    return;
                                }
                                setSubmitError("");
                                setResumeFile(file);
                                setResumeName(file?.name || "");
                            }}
                        />
                    </label>
                </Field>
            </section>

            <section>
                <h2 className="mb-4 font-heading text-lg font-semibold text-ink">{t("Details")}</h2>
                <div className="space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-ink">
                            {t("Are you willing to work on-site during standard business hours?")} <span className="text-teal">*</span>
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
                                    {t(opt)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <Field label={t("How many years of relevant experience do you have for the {title} role?").replace("{title}", role.title)} required>
                        <textarea name="experience" rows={2} required maxLength={500} className={inputClasses} />
                    </Field>

                    <Field label={t("Describe a project that best reflects the kind of work you'd do in this role.")} required>
                        <textarea name="projectDescription" rows={4} required maxLength={3000} className={inputClasses} />
                    </Field>
                </div>
            </section>

            {submitError && (
                <p role="alert" className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {t(submitError)}
                </p>
            )}

            <button
                type="submit"
                disabled={sending}
                className="w-full rounded-md bg-teal py-3 text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {sending ? t("Sending…") : t("Submit application")}
            </button>
        </form>
    );
}

export default function RoleDetail({ slug }) {
    const { t } = useLanguage();
    const [role, setRole] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    useEffect(() => {
        apiFetch(`jobs/${slug}`)
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
                <p className="text-sm text-slate">{t("This role couldn't be found.")}</p>
                <Link href="/careers/roles" className="mt-3 inline-block text-sm font-medium text-teal">
                    {t("Back to all roles")}
                </Link>
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
                            {t(tab.label)}
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
                            {t("Apply for this job")}
                        </button>
                    </div>
                )}

                {/* Utility footer */}
                <div className="mt-16 border-t border-black/10 pt-6 text-center">
                    <div className="flex justify-center gap-6 text-sm">
                        <Link href="/" className="font-medium text-teal hover:opacity-80">{t("View website")}</Link>
                        <Link href="/careers/roles" className="font-medium text-teal hover:opacity-80">{t("View all jobs")}</Link>
                        <Link href="/contact" className="font-medium text-teal hover:opacity-80">{t("Help")}</Link>
                    </div>
                    <p className="mt-4 text-xs text-slate">
                        {t("Devora Careers")} · <Link href="/privacy-policy" className="hover:text-ink">{t("Privacy")}</Link> · <Link href="/accessibility" className="hover:text-ink">{t("Accessibility")}</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}