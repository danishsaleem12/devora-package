//src/components/Navbar.js

"use client";

import { useEffect, useRef, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function ChevronIcon({ open }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
            <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function ArrowIcon() {
    return (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
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

function GlobeIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.3" />
            <path
                d="M1 7h12M7 1c1.8 1.7 2.8 3.8 2.8 6s-1 4.3-2.8 6c-1.8-1.7-2.8-3.8-2.8-6S5.2 2.7 7 1Z"
                stroke="currentColor"
                strokeWidth="1.3"
            />
        </svg>
    );
}

// Small helper so hovering the button then moving to the panel
// doesn't cause a flicker-close in the gap between them.
function useHoverIntent(closeDelay = 150) {
    const timeoutRef = useRef(null);
    const [open, setOpen] = useState(false);

    const onEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setOpen(true);
    };

    const onLeave = () => {
        timeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
    };

    useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

    return { open, onEnter, onLeave, setOpen };
}

function MenuDropdown({ menu }) {
    const { open, onEnter, onLeave } = useHoverIntent();

    // Services gets 2 columns (it has 12 items); everything else is a single column.
    const isMultiColumn = menu.label === "Services";

    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm text-slate transition-colors hover:text-white">
                {menu.label}
                <ChevronIcon open={open} />
            </button>

            <div
                className={`absolute left-1/2 top-full -translate-x-1/2 rounded-lg border border-black/5 bg-white p-2 shadow-xl transition-all duration-200 ease-out ${isMultiColumn
                        ? "grid w-[560px] grid-cols-2 gap-x-4"
                        : "w-64"
                    } ${open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0"
                    }`}
            >
                {menu.items.map((item) => (
                    <a
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-ink transition-colors hover:bg-paper"
                    >
                        {item.label}
                        <span className="text-slate transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowIcon />
                        </span>
                    </a>
                ))}
            </div>
        </div>
    );
}

function LanguageDropdown({ languages, activeLang, setActiveLang }) {
    const { open, onEnter, onLeave, setOpen } = useHoverIntent();

    if (!languages || languages.length === 0) return null;

    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-slate transition-colors hover:text-white">
                <GlobeIcon />
                {activeLang?.code}
                <ChevronIcon open={open} />
            </button>

            <div
                className={`absolute right-0 top-full w-40 rounded-lg border border-black/5 bg-white p-2 shadow-xl transition-all duration-200 ease-out ${open
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-1 opacity-0"
                    }`}
            >
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => {
                            setActiveLang(lang);
                            setOpen(false);
                        }}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-ink transition-colors hover:bg-paper"
                    >
                        {lang.label}
                        <span className="text-slate">{lang.code}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function Navbar() {
    const [nav, setNav] = useState(null);
    const [activeLang, setActiveLang] = useState(null);

    useEffect(() => {
        fetch(`${API_URL}/api/navbar`)
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setNav(data);
                if (data.languages && data.languages.length > 0) {
                    setActiveLang(data.languages[0]);
                }
            })
            .catch(() => {
                setNav({
                    logo: "Devora",
                    menus: [],
                    languages: [],
                    cta: { label: "Contact Us", href: "/contact" },
                });
            });
    }, []);

    if (!nav) {
        return <div className="h-20 bg-navy" />;
    }

    return (
        <header className="relative z-50 border-b border-white/10 bg-navy">
            <nav className="flex h-20 items-center justify-between px-20">
                <a href="/" className="font-heading text-2xl font-bold text-white">
                    <span className="text-teal">D</span>evora
                </a>

                <div className="absolute left-1/2 flex -translate-x-1/2 items-center gap-1">
                    {nav.menus.map((menu) => (
                        <MenuDropdown key={menu.label} menu={menu} />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <LanguageDropdown
                        languages={nav.languages}
                        activeLang={activeLang}
                        setActiveLang={setActiveLang}
                    />

                    <a
                        href={nav.cta.href}
                        className="flex items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                    >
                        <ArrowIcon />
                        {nav.cta.label}
                    </a>
                </div>
            </nav>
        </header>
    );
}