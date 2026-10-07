//src/components/Footer.js

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

/**
 * Footer.js
 *
 * Reads its column data from the same shape your backend already returns:
 *   GET /api/navbar   -> { logo, menus: [{ label, items: [{label, href}] }] }
 *
 * FALLBACK_MENUS mirrors your content.route.js /navbar payload exactly, so the
 * footer still renders correctly on first paint (or if the API call fails) —
 * swap API_BASE below for your real host if it isn't same-origin.
 */

const API_BASE = ""; // e.g. "http://localhost:5000" — leave "" if same-origin

const FALLBACK_MENUS = [
  {
    label: "Services",
    items: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "Full-Stack Development", href: "/services/full-stack-development" },
      { label: "AI & LLM Solutions", href: "/services/ai-llm-solutions" },
      { label: "SaaS & Product Development", href: "/services/saas-product-development" },
      { label: "E-Commerce Development", href: "/services/e-commerce-development" },
      { label: "UI/UX & Design Systems", href: "/services/ui-ux-design-systems" },
      { label: "Cloud & DevOps", href: "/services/cloud-devops" },
      { label: "API & Integrations", href: "/services/api-integrations" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "E-Commerce (Shopify & Custom)", href: "/solutions/ecommerce" },
      { label: "AI Dashboards", href: "/solutions/ai-dashboards" },
      { label: "AI Customer Assistants", href: "/solutions/ai-assistants" },
      { label: "Fintech & Ledger Systems", href: "/solutions/fintech" },
    ],
  },
  {
    label: "Products",
    items: [
      { label: "Devora Analytics", href: "/products/devora-analytics" },
      { label: "Devora Assist (AI Chat Widget)", href: "/products/devora-assist" },
      { label: "Devora Commerce Kit", href: "/products/devora-commerce-kit" },
      { label: "Devora HRM", href: "/products/devora-hrm" },
      { label: "Devora POS", href: "/products/devora-pos" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Devora Journal", href: "/resources/journal" },
      { label: "Blogs", href: "/resources/blogs" },
      { label: "Podcasts", href: "/resources/podcasts" },
      { label: "Research & Guides", href: "/resources/research-guides" },
      { label: "Case Studies", href: "/resources/case-studies" },
      { label: "News & Media", href: "/resources/news-media" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Life at Devora", href: "/life-at-devora" },
      // { label: "Campus Ambassador", href: "/campus-ambassador" },
      // { label: "Partner Programme", href: "/partner-programme" },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/m-danish-489a8b259",
  },
  {
    label: "GitHub",
    href: "https://github.com/danishsaleem12",
  },
  {
    label: "WhatsApp",
    href:
      "https://wa.me/923186039286?text=" +
      encodeURIComponent("Hi! I found you through the Devora website and I'd like to talk about a project."),
  },
  {
    label: "Email",
    href:
      "mailto:mdanishsaleem52@gmail.com?subject=" +
      encodeURIComponent("Project enquiry from the Devora website"),
  },
];

function ChevronIcon({ open }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      className={`shrink-0 transition-transform duration-300 ease-out ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M2.5 4.25L6 7.75L9.5 4.25"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FooterColumn({ label, items, isOpen, onToggle }) {
  return (
    <div className="border-b border-white/10 py-4 md:border-none md:py-0">
      <button
        type="button"
        onClick={onToggle}
        className="group flex w-full items-center justify-between text-left"
        aria-expanded={isOpen}
      >
        <span className="text-[13px] font-semibold tracking-wide text-white transition-colors duration-200 group-hover:text-[#D9A85C]">
          {label}
        </span>
        <span
          className={`flex h-5 w-5 items-center justify-center rounded-full text-white/50 transition-all duration-200 group-hover:bg-white/10 group-hover:text-white ${isOpen ? "" : ""
            }`}
        >
          <ChevronIcon open={isOpen} />
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out ${isOpen ? "mt-3.5 grid-rows-[1fr] opacity-100" : "mt-0 grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="flex flex-col gap-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group/link inline-flex items-center text-[12px] text-white/55 transition-all duration-200 hover:translate-x-1 hover:text-[#D9A85C]"
                >
                  <span className="mr-0 h-px w-0 bg-[#D9A85C] transition-all duration-200 group-hover/link:mr-1.5 group-hover/link:w-2" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [menus, setMenus] = useState(FALLBACK_MENUS);
  const [openIndexes, setOpenIndexes] = useState(() => new Set(FALLBACK_MENUS.map((_, i) => i)));

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const navRes = await fetch(`${API_BASE}/api/navbar`);
        const navData = await navRes.json();
        if (!cancelled) {
          if (Array.isArray(navData?.menus) && navData.menus.length) {
            setMenus(navData.menus);
            setOpenIndexes(new Set(navData.menus.map((_, i) => i)));
          }
        }
      } catch {
        // Silently keep fallback content — footer must never break the page.
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  function toggleIndex(i) {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(i)) {
        next.delete(i);
      } else {
        next.add(i);
      }
      return next;
    });
  }

  const year = new Date().getFullYear();

  return (
    <footer className="mt-6 bg-[#0B0C0F] text-white/80 md:mt-8">
      {/* Link columns */}
      <div className="w-full px-6 pt-10 pb-8 sm:px-10 md:py-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-5 md:gap-x-10 xl:gap-x-12">
          {menus.map((menu, i) => (
            <FooterColumn
              key={menu.label}
              label={menu.label}
              items={menu.items}
              isOpen={openIndexes.has(i)}
              onToggle={() => toggleIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Brand + offices */}
      <div className="w-full border-t border-white/10 px-6 py-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <span className="text-base font-semibold tracking-tight text-white">Devora</span>
            <p className="mt-1.5 max-w-xs text-[12px] leading-relaxed text-white/45">
              A software studio for teams who'd rather ship than wait.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-[12px] text-white/45 sm:grid-cols-2">
            <div>
              <p className="mb-1 font-medium text-white/70">Say hello</p>
              <a
                href="mailto:hello@devora.com"
                className="transition-colors hover:text-[#D9A85C]"
              >
                hello@devora.com
              </a>
            </div>
            <div>
              <p className="mb-1 font-medium text-white/70">Follow along</p>
              <ul className="flex flex-col gap-1">
                {SOCIALS.map((s) => {
                  const isWeb = s.href.startsWith("http");
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="transition-colors hover:text-[#D9A85C]"
                      >
                        {s.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="flex w-full flex-col gap-2 px-6 py-4 text-[11px] text-white/40 sm:px-10 md:flex-row md:items-center md:justify-between lg:px-16 xl:px-24">
          <p>© {year} Devora. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5">
            <Link href="/privacy-policy" className="hover:text-white/70">
              Privacy Policy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white/70">
              Cookie Policy
            </Link>
            <Link href="/terms" className="hover:text-white/70">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}