"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ArrowIcon({ size = 12 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 12 12" fill="none">
            <path
                d="M3 9L9 3M9 3H4M9 3V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export default function CareerStages() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/career-stages`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then(setData)
            .catch(() => setData(null));
    }, []);

    if (!data) return <div className="min-h-[400px] bg-white" />;

    const { tag, heading, subheading, stages } = data;

    return (
        <section className="bg-white px-6 py-20 sm:px-12 lg:px-20">
            <span className="mb-4 inline-flex w-fit items-center rounded-full border border-teal/30 bg-teal/10 px-3 py-1 text-sm text-teal">
                {tag}
            </span>
            <h2 className="max-w-xl font-heading text-3xl font-semibold text-ink sm:text-4xl">{heading}</h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-slate">{subheading}</p>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
                {stages.map((stage) => (
                    <div key={stage.number} className="rounded-xl border border-black/10 p-6">
                        <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-full border border-teal/40 text-xs font-medium text-teal">
                            {stage.number}
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-ink">{stage.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate">{stage.description}</p>
                        <a
                            href={stage.href}
                            className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:opacity-80"
                        >
                            {stage.ctaLabel}
                            <ArrowIcon size={12} />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}