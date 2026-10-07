//src/components/RolesListing.js

"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
const PAGE_SIZE = 4;

function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    );
}

function ChevronIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function CloseIcon() {
    return (
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
    );
}

function FilterSelect({ label, value, options, onChange }) {
    return (
        <div className="relative">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full appearance-none rounded-md border border-black/10 bg-white px-3.5 py-2.5 pr-8 text-sm text-ink outline-none transition-colors hover:border-black/20 focus:border-teal"
            >
                <option value="">{label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>
                        {opt}
                    </option>
                ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate">
                <ChevronIcon />
            </span>
        </div>
    );
}

export default function RolesListing() {
    const [data, setData] = useState(null);
    const [search, setSearch] = useState("");
    const [workplaceType, setWorkplaceType] = useState("");
    const [location, setLocation] = useState("");
    const [department, setDepartment] = useState("");
    const [workType, setWorkType] = useState("");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        fetch(`${API_URL}/api/jobs`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((jobs) =>
                setData({
                    heading: "Careers at Devora",
                    subheading:
                        "We're building product teams for startups and enterprises worldwide. Here's what we're currently hiring for.",
                    listHeading: "Job Openings",
                    roles: jobs,
                })
            )
            .catch(() => setData(null));
    }, []);

    const options = useMemo(() => {
        if (!data) return { workplaceTypes: [], locations: [], departments: [], workTypes: [] };
        const uniq = (arr) => [...new Set(arr)];
        return {
            workplaceTypes: uniq(data.roles.map((r) => r.workplaceType)),
            locations: uniq(data.roles.map((r) => r.location)),
            departments: uniq(data.roles.map((r) => r.department)),
            workTypes: uniq(data.roles.map((r) => r.type)),
        };
    }, [data]);

    const filteredRoles = useMemo(() => {
        if (!data) return [];
        return data.roles.filter((r) => {
            if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
            if (workplaceType && r.workplaceType !== workplaceType) return false;
            if (location && r.location !== location) return false;
            if (department && r.department !== department) return false;
            if (workType && r.type !== workType) return false;
            return true;
        });
    }, [data, search, workplaceType, location, department, workType]);

    const activeFilters = [
        workplaceType && { key: "workplaceType", label: workplaceType, clear: () => setWorkplaceType("") },
        location && { key: "location", label: location, clear: () => setLocation("") },
        department && { key: "department", label: department, clear: () => setDepartment("") },
        workType && { key: "workType", label: workType, clear: () => setWorkType("") },
    ].filter(Boolean);

    const clearAll = () => {
        setSearch("");
        setWorkplaceType("");
        setLocation("");
        setDepartment("");
        setWorkType("");
        setVisibleCount(PAGE_SIZE);
    };

    if (!data) return <div className="min-h-[600px] bg-white" />;

    const visibleRoles = filteredRoles.slice(0, visibleCount);
    const hasMore = visibleCount < filteredRoles.length;

    return (
        <section className="bg-white px-4 py-16 sm:px-8 lg:px-12">
            {/* Header */}
            <div className="mx-auto max-w-2xl text-center">
                <span className="font-heading text-2xl font-bold text-ink">
                    <span className="text-teal">D</span>evora
                </span>
                <h1 className="mt-6 font-heading text-3xl font-semibold text-ink sm:text-4xl">{data.heading}</h1>
                <p className="mt-4 text-sm leading-relaxed text-slate">{data.subheading}</p>
            </div>

            <h2 className="mt-16 text-center font-heading text-2xl font-semibold text-ink">{data.listHeading}</h2>

            {/* Search + filters */}
            <div className="mx-auto mt-8 max-w-4xl">
                <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search jobs..."
                        className="w-full rounded-md border border-black/10 py-3 pl-10 pr-4 text-sm text-ink outline-none transition-colors focus:border-teal"
                    />
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <FilterSelect label="Workplace type" value={workplaceType} options={options.workplaceTypes} onChange={setWorkplaceType} />
                    <FilterSelect label="Location" value={location} options={options.locations} onChange={setLocation} />
                    <FilterSelect label="Department" value={department} options={options.departments} onChange={setDepartment} />
                    <FilterSelect label="Work type" value={workType} options={options.workTypes} onChange={setWorkType} />
                </div>

                {activeFilters.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        {activeFilters.map((f) => (
                            <span
                                key={f.key}
                                className="flex items-center gap-1.5 rounded-full bg-paper px-3 py-1 text-xs text-ink"
                            >
                                {f.label}
                                <button onClick={f.clear} className="text-slate hover:text-ink">
                                    <CloseIcon />
                                </button>
                            </span>
                        ))}
                        <button onClick={clearAll} className="ml-auto text-xs font-medium text-teal hover:opacity-80">
                            Clear filters
                        </button>
                    </div>
                )}
            </div>

            {/* Role list */}
            <div className="mx-auto mt-8 max-w-4xl divide-y divide-black/10 border-t border-black/10">
                <AnimatePresence mode="popLayout">
                    {visibleRoles.map((role) => (
                        <motion.a
                            key={role.slug}
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            href={`/careers/roles/${role.slug}`}
                            className="group grid grid-cols-1 gap-1.5 py-5 sm:grid-cols-[1.6fr_0.8fr_1.2fr_1.2fr_0.7fr] sm:items-center sm:gap-4"
                        >
                            <div>
                                <h3 className="text-sm font-semibold text-teal group-hover:underline">{role.title}</h3>
                                <p className="mt-0.5 text-xs text-slate">{role.postedAgo}</p>
                            </div>
                            <span className="text-sm font-medium text-ink">{role.workplaceType}</span>
                            <span className="text-sm text-teal">{role.location}</span>
                            <span className="text-sm text-teal">{role.department}</span>
                            <span className="text-xs text-slate">{role.type}</span>
                        </motion.a>
                    ))}
                </AnimatePresence>

                {filteredRoles.length === 0 && (
                    <p className="py-10 text-center text-sm text-slate">No roles match those filters right now.</p>
                )}
            </div>

            {hasMore && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                        className="rounded-md bg-teal px-6 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                    >
                        Show more
                    </button>
                </div>
            )}

            {/* Utility footer row */}
            <div className="mx-auto mt-16 max-w-4xl border-t border-black/10 pt-6 text-center">
                <div className="flex justify-center gap-6 text-sm">
                    <a href="/" className="font-medium text-teal hover:opacity-80">View website</a>
                    <a href="/contact" className="font-medium text-teal hover:opacity-80">Help</a>
                </div>
                <p className="mt-4 text-xs text-slate">
                    Devora Careers · <a href="/privacy" className="hover:text-ink">Privacy</a> · <a href="/accessibility" className="hover:text-ink">Accessibility</a>
                </p>
            </div>
        </section>
    );
}