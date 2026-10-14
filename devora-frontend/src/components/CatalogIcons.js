// Small inline line icons for the /services, /solutions and /products index cards (24x24, stroke only).
// Keyed by slug. Unknown slugs fall back to a generic icon, so adding a new item never breaks the page.

const PATHS = {
  // services
  "web-development": (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6.5" cy="6.5" r="0.6" />
      <circle cx="9" cy="6.5" r="0.6" />
    </>
  ),
  "full-stack-development": (
    <>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 12.5l9 5 9-5" />
      <path d="M3 17l9 5 9-5" />
    </>
  ),
  "ai-llm-solutions": (
    <>
      <path d="M11 3l1.9 5.1L18 10l-5.1 1.9L11 17l-1.9-5.1L4 10l5.1-1.9L11 3z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7.7-1.8z" />
    </>
  ),
  "saas-product-development": (
    <>
      <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path d="M12 12l8-4.5M12 12v9M12 12L4 7.5" />
    </>
  ),
  "e-commerce-development": (
    <>
      <path d="M3 4h2l2.4 11h10.2L20 8H6.2" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  "ui-ux-design-systems": (
    <>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <circle cx="16.5" cy="16.5" r="3.5" />
    </>
  ),
  "cloud-devops": <path d="M7 18a4 4 0 0 1-.5-7.97A5.5 5.5 0 0 1 17 9a4.5 4.5 0 0 1 .5 9H7z" />,
  "api-integrations": (
    <>
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.3 11l7.4-4M8.3 13l7.4 4" />
    </>
  ),

  // solutions
  ecommerce: (
    <>
      <path d="M4 9l1.5-5h13L20 9" />
      <path d="M4 9h16M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  "ai-dashboards": (
    <>
      <path d="M4 20V11M10 20V4M16 20v-6M21 20H3" />
    </>
  ),
  "ai-assistants": (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </>
  ),
  fintech: (
    <>
      <path d="M6 3h12v18H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </>
  ),

  // products
  "devora-analytics": (
    <>
      <path d="M3 3v18h18" />
      <path d="M7 15l4-5 3 3 5-7" />
    </>
  ),
  "devora-assist": (
    <>
      <path d="M4 5h16v11H9l-5 4V5z" />
      <path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01" />
    </>
  ),
  "devora-commerce-kit": (
    <>
      <path d="M6 8h12l-1 12H7L6 8z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </>
  ),
  "devora-hrm": (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.2" />
      <path d="M17 14c2.3 0 4 1.8 4 4" />
    </>
  ),
  "devora-pos": (
    <>
      <path d="M4 3h16v18l-3-2-2.5 2-2.5-2-2.5 2L7 19l-3 2V3z" />
      <path d="M8 8h8M8 12h8" />
    </>
  ),
};

const FALLBACK = <rect x="4" y="4" width="16" height="16" rx="3" />;

export default function CatalogIcon({ slug, size = 22 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {PATHS[slug] ?? FALLBACK}
    </svg>
  );
}
