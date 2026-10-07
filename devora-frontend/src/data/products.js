const PRIMARY_CTA = { label: "Request a demo", href: "/contact" };
const SECONDARY_CTA = { label: "View all products", href: "/products" };
const PARENT = { label: "Products", href: "/products" };

export const products = [
  {
    slug: "devora-analytics",
    title: "Devora Analytics",
    parent: PARENT,
    eyebrow: "DEVORA ANALYTICS",
    headline: "Know what's happening\nin your business, as it happens.",
    subheadline:
      "An analytics platform that brings your data together in one place, with live dashboards, plain-language answers, and alerts when something changes.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "analytics",
      badge: "LIVE",
      lines: ["$ devora-analytics connect", "✓ Data sources connected", "✓ Dashboards live", "✓ Alerts enabled"],
      progressLabel: "SOURCES",
      progressValue: 100,
    },
    highlights: [
      { value: "Live", label: "Dashboards" },
      { value: "Alerts", label: "When metrics shift" },
      { value: "Ask", label: "Questions in plain language" },
    ],
    tagsLabel: "INCLUDES",
    tags: ["Live dashboards", "Alerts", "Exports", "API access"],
  },
  {
    slug: "devora-assist",
    title: "Devora Assist (AI Chat Widget)",
    parent: PARENT,
    eyebrow: "DEVORA ASSIST",
    headline: "An AI chat widget that\nanswers customers on your site.",
    subheadline:
      "Add a branded chat widget to your website. It answers from your own content and hands the conversation to your team when a person is needed.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "assist",
      badge: "LIVE",
      lines: ["$ devora-assist train --source help-center", "✓ Content indexed", "✓ Widget installed", "✓ Human handoff enabled"],
      progressLabel: "TRAINED",
      progressValue: 100,
    },
    highlights: [
      { value: "Your content", label: "Grounded answers" },
      { value: "Handoff", label: "To your team" },
      { value: "Branded", label: "Matches your site" },
    ],
    tagsLabel: "INCLUDES",
    tags: ["Chat widget", "Human handoff", "Conversation analytics", "Content sync"],
  },
  {
    slug: "devora-commerce-kit",
    title: "Devora Commerce Kit",
    parent: PARENT,
    eyebrow: "DEVORA COMMERCE KIT",
    headline: "Everything you need to\nlaunch an online store faster.",
    subheadline:
      "A ready-made foundation for online stores: storefront, cart, checkout, and an admin panel, customized to your brand instead of built from scratch.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "commerce-kit",
      badge: "READY",
      lines: ["$ devora-commerce init", "✓ Storefront scaffolded", "✓ Checkout configured", "✓ Admin panel ready"],
      progressLabel: "SETUP",
      progressValue: 100,
    },
    highlights: [
      { value: "Storefront", label: "Ready to customize" },
      { value: "Checkout", label: "Payments included" },
      { value: "Admin", label: "Panel included" },
    ],
    tagsLabel: "INCLUDES",
    tags: ["Storefront", "Cart & checkout", "Admin panel", "Payments"],
  },
  {
    slug: "devora-hrm",
    title: "Devora HRM",
    parent: PARENT,
    eyebrow: "DEVORA HRM",
    headline: "People management\nwithout the spreadsheets.",
    subheadline:
      "Employee records, leave, attendance, and payroll inputs in one system, with simple approvals and clear reports for HR and managers.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "hrm",
      badge: "SYNC",
      lines: ["$ devora-hrm sync --attendance", "✓ Employee records loaded", "✓ Leave balances updated", "✓ Payroll inputs ready"],
      progressLabel: "SYNCED",
      progressValue: 100,
    },
    highlights: [
      { value: "Records", label: "One source of truth" },
      { value: "Leave", label: "Requests & approvals" },
      { value: "Reports", label: "For HR and managers" },
    ],
    tagsLabel: "INCLUDES",
    tags: ["Employee records", "Leave & attendance", "Approvals", "Reports"],
  },
  {
    slug: "devora-pos",
    title: "Devora POS",
    parent: PARENT,
    eyebrow: "DEVORA POS",
    headline: "A point of sale that\nkeeps up with your counter.",
    subheadline:
      "Fast checkout, live stock counts, and end-of-day reports for shops and restaurants.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "pos",
      badge: "OPEN",
      lines: ["$ devora-pos close-day", "✓ Sales totalled", "✓ Stock updated", "✓ Daily report generated"],
      progressLabel: "CLOSED",
      progressValue: 100,
    },
    highlights: [
      { value: "Fast", label: "Checkout" },
      { value: "Stock", label: "Live counts" },
      { value: "Reports", label: "End of day" },
    ],
    tagsLabel: "INCLUDES",
    tags: ["Checkout", "Inventory", "Receipts", "Daily reports"],
  },
];

export function getAllProducts() {
  return products;
}

export function getProduct(slug) {
  const product = products.find((p) => p.slug === slug);
  if (!product) return null;
  // Section data (features, getting started, etc.) gets merged in here as we add it
  return { ...product };
}