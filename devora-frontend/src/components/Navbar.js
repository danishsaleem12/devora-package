//src/components/Navbar.js

"use client";

import { apiFetch } from "@/lib/api";
import { useLanguage } from "@/components/LanguageProvider";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";


/* ----------------------------- Icons ----------------------------- */

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

// Hamburger <-> X icon (animated via transforms)
function BurgerIcon({ open }) {
    return (
        <span className="relative block h-4 w-5">
            <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-200 ${open ? "top-1.5 rotate-45" : "top-0"
                    }`}
            />
            <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-white transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"
                    }`}
            />
            <span
                className={`absolute left-0 h-0.5 w-5 rounded bg-white transition-all duration-200 ${open ? "top-1.5 -rotate-45" : "top-3"
                    }`}
            />
        </span>
    );
}

/* ----------------------------- Hooks ----------------------------- */

// Small helper so hovering the button then moving to the panel
// doesn't cause a flicker-close in the gap between them.
// Also exposes `toggle` so touch devices (tablets) can tap to open/close.
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

    const toggle = () => setOpen((prev) => !prev);

    useEffect(() => () => timeoutRef.current && clearTimeout(timeoutRef.current), []);

    return { open, onEnter, onLeave, setOpen, toggle };
}

/* ------------------------ Desktop dropdowns ------------------------ */

function MenuDropdown({ menu }) {
    const { open, onEnter, onLeave, toggle } = useHoverIntent();

    // Menus with many items (Services has 8) get 2 columns; the rest are a single column.
    const isMultiColumn = menu.items.length > 6;

    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button
                onClick={toggle}
                aria-expanded={open}
                className="flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm text-slate transition-colors hover:text-white"
            >
                {menu.label}
                <ChevronIcon open={open} />
            </button>

            <div
                className={`absolute left-1/2 top-full -translate-x-1/2 rounded-lg border border-black/5 bg-white p-2 shadow-xl transition-all duration-200 ease-out ${isMultiColumn ? "grid w-[560px] grid-cols-2 gap-x-4" : "w-64"
                    } ${open
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-1 opacity-0"
                    }`}
            >
                {menu.items.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className="group flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-ink transition-colors hover:bg-paper"
                    >
                        {item.label}
                        <span className="text-slate transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                            <ArrowIcon />
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

function LanguageDropdown({ languages, activeLang, setActiveLang }) {
    const { open, onEnter, onLeave, setOpen, toggle } = useHoverIntent();
    const { t } = useLanguage();

    if (!languages || languages.length === 0) return null;

    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            <button
                onClick={toggle}
                aria-expanded={open}
                aria-label={t("Language")}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm text-slate transition-colors hover:text-white"
            >
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
                        aria-current={activeLang?.code === lang.code ? "true" : undefined}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm transition-colors hover:bg-paper ${activeLang?.code === lang.code ? "font-medium text-teal" : "text-ink"
                            }`}
                    >
                        {lang.label}
                        <span className={activeLang?.code === lang.code ? "text-teal" : "text-slate"}>{lang.code}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}

/* ------------------------- Mobile drawer ------------------------- */

// One accordion section per top-level menu
function MobileAccordion({ menu, isOpen, onToggle, onNavigate }) {
    return (
        <div className="border-b border-white/10">
            <button
                onClick={onToggle}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between py-4 text-left text-base font-medium text-white"
            >
                {menu.label}
                <ChevronIcon open={isOpen} />
            </button>

            {/* grid-rows trick = smooth height animation without measuring */}
            <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
            >
                <div className="overflow-hidden">
                    <ul className="pb-3">
                        {menu.items.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onNavigate}
                                    tabIndex={isOpen ? 0 : -1}
                                    className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-slate transition-colors hover:bg-white/5 hover:text-white"
                                >
                                    {item.label}
                                    <ArrowIcon />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function MobileMenu({ nav, open, activeLang, setActiveLang, onClose }) {
    const { t } = useLanguage();
    // Only one accordion open at a time
    const [openSection, setOpenSection] = useState(null);

    // Collapse sections whenever the drawer closes
    useEffect(() => {
        if (!open) setOpenSection(null);
    }, [open]);

    return (
        <div
            id="mobile-menu"
            className={`fixed inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] overflow-y-auto bg-navy px-6 pb-10 transition-all duration-300 ease-out lg:hidden ${open
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-2 opacity-0"
                }`}
        >
            <div className="mx-auto max-w-xl">
                {/* Menu sections */}
                <div className="border-t border-white/10">
                    {nav.menus.map((menu) => (
                        <MobileAccordion
                            key={menu.label}
                            menu={menu}
                            isOpen={openSection === menu.label}
                            onToggle={() =>
                                setOpenSection((prev) => (prev === menu.label ? null : menu.label))
                            }
                            onNavigate={onClose}
                        />
                    ))}
                </div>

                {/* Language switcher as pills */}
                {nav.languages && nav.languages.length > 0 && (
                    <div className="mt-6">
                        <div className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate">
                            <GlobeIcon />
                            {t("Language")}
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {nav.languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => setActiveLang(lang)}
                                    className={`rounded-md border px-3.5 py-2 text-sm transition-colors ${activeLang?.code === lang.code
                                        ? "border-teal bg-teal/10 text-teal"
                                        : "border-white/10 text-slate hover:text-white"
                                        }`}
                                >
                                    {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Full-width CTA */}
                <Link
                    href={nav.cta.href}
                    onClick={onClose}
                    className="mt-8 flex w-full items-center justify-center gap-1.5 rounded-md bg-teal px-4 py-3.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                >
                    <ArrowIcon />
                    {t(nav.cta.label)}
                </Link>
            </div>
        </div>
    );
}

/* ----------------------------- Navbar ----------------------------- */

export default function Navbar() {
    const [nav, setNav] = useState(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { lang, setLang, t } = useLanguage();

    // The active language comes from the language provider, so the choice is shared with the whole site
    const activeLang =
        nav?.languages?.find((l) => l.code.toLowerCase() === lang) ?? nav?.languages?.[0] ?? null;
    const setActiveLang = (language) => setLang(language.code);

    // Fetch navbar data from the backend (falls back to a minimal navbar on error)
    useEffect(() => {
        apiFetch("navbar")
            .then((res) => {
                if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setNav(data);
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

    // Lock page scroll while the mobile drawer is open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    // Close the drawer on Escape, and auto-close if the viewport grows to desktop size
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
        const mq = window.matchMedia("(min-width: 1024px)"); // matches Tailwind `lg`
        const onChange = (e) => e.matches && setMobileOpen(false);

        window.addEventListener("keydown", onKey);
        mq.addEventListener("change", onChange);
        return () => {
            window.removeEventListener("keydown", onKey);
            mq.removeEventListener("change", onChange);
        };
    }, []);

    if (!nav) {
        return <div className="h-20 bg-navy" />;
    }

    return (
        <header className="relative z-50 border-b border-white/10 bg-navy">
            {/* Responsive horizontal padding: tight on phones, roomy on large screens */}
            <nav className="flex h-20 items-center justify-between px-6 md:px-10 xl:px-20">
                <Link href="/" className="font-heading text-2xl font-bold text-white">
                    <span className="text-teal">D</span>evora
                </Link>

                {/* Desktop menu (hidden below lg) */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
                    {nav.menus.map((menu) => (
                        <MenuDropdown key={menu.label} menu={menu} />
                    ))}
                </div>

                {/* Desktop right side (hidden below lg) */}
                <div className="hidden items-center gap-3 lg:flex">
                    <LanguageDropdown
                        languages={nav.languages}
                        activeLang={activeLang}
                        setActiveLang={setActiveLang}
                    />

                    <Link
                        href={nav.cta.href}
                        className="flex items-center gap-1.5 rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
                    >
                        <ArrowIcon />
                        {t(nav.cta.label)}
                    </Link>
                </div>

                {/* Hamburger button (visible below lg only) */}
                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label={mobileOpen ? t("Close menu") : t("Open menu")}
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                    className="flex h-10 w-10 items-center justify-center rounded-md transition-colors hover:bg-white/5 lg:hidden"
                >
                    <BurgerIcon open={mobileOpen} />
                </button>
            </nav>

            {/* Mobile drawer */}
            <MobileMenu
                nav={nav}
                open={mobileOpen}
                activeLang={activeLang}
                setActiveLang={setActiveLang}
                onClose={() => setMobileOpen(false)}
            />
        </header>
    );
}