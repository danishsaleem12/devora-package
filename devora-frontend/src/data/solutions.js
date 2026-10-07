const PRIMARY_CTA = { label: "Start a project", href: "/contact" };
const SECONDARY_CTA = { label: "View our work", href: "/portfolio" };
const PARENT = { label: "Solutions", href: "/solutions" };
import { problems } from "./solutionProblems";
import { solutionOfferings } from "./solutionOfferings";
import { solutionWorkflows } from "./solutionWorkflow";
import { solutionTech } from "./solutionTech";
import { solutionWhy } from "./solutionWhy";
import { solutionFaq } from "./solutionFaq";
import { solutionCtas } from "./solutionCta";

export const solutions = [
  {
    slug: "ecommerce",
    title: "E-Commerce (Shopify & Custom)",
    parent: PARENT,
    eyebrow: "E-COMMERCE (SHOPIFY & CUSTOM)",
    headline: "Stores built to sell,\nShopify or custom.",
    subheadline:
      "A complete store solution: catalog, checkout, payments, and the admin tools your team needs to run it day to day, on the platform that fits your business.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "store-sync",
      badge: "LIVE",
      lines: ["$ sync --catalog --inventory", "✓ Catalog synced", "✓ Stock levels updated", "✓ Orders flowing to fulfilment"],
      progressLabel: "SYNC",
      progressValue: 100,
    },
    highlights: [
      { value: "Shopify", label: "Or fully custom" },
      { value: "Secure", label: "Payments" },
      { value: "Admin", label: "Panel included" },
    ],
    tags: ["Shopify", "Next.js", "Stripe", "Node.js"],
  },
  {
    slug: "ai-dashboards",
    title: "AI Dashboards",
    parent: PARENT,
    eyebrow: "AI DASHBOARDS",
    headline: "Dashboards that answer\nquestions, not just show charts.",
    subheadline:
      "Bring your scattered data into one live view, with AI that explains what changed, flags anomalies, and answers questions in plain language.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "dashboard",
      badge: "LIVE",
      lines: ["$ dashboard refresh --live", "✓ Data sources connected", "✓ Metrics refreshed", "✓ Anomaly alerts enabled"],
      progressLabel: "SOURCES",
      progressValue: 100,
    },
    highlights: [
      { value: "Live", label: "Data from your sources" },
      { value: "Alerts", label: "When metrics shift" },
      { value: "Ask", label: "Questions in plain language" },
    ],
    tags: ["Next.js", "Python", "PostgreSQL", "LLM APIs"],
  },
  {
    slug: "ai-assistants",
    title: "AI Customer Assistants",
    parent: PARENT,
    eyebrow: "AI CUSTOMER ASSISTANTS",
    headline: "Customer assistants that\nresolve issues, not deflect them.",
    subheadline:
      "Assistants trained on your own help content and policies, with clear handoff to your team when a person is needed.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "assistant-eval",
      badge: "EVAL",
      lines: ["$ assistant test --suite support", "✓ Knowledge base indexed", "✓ Human handoff configured", "✓ Guardrails active"],
      progressLabel: "QUALITY",
      progressValue: 94,
    },
    highlights: [
      { value: "Your data", label: "Grounded answers" },
      { value: "Human", label: "Handoff built in" },
      { value: "Tested", label: "Before it talks to customers" },
    ],
    tags: ["LLM APIs", "RAG", "Vector DBs", "Node.js"],
  },
  {
    slug: "fintech",
    title: "Fintech & Ledger Systems",
    parent: PARENT,
    eyebrow: "FINTECH & LEDGER SYSTEMS",
    headline: "Ledgers you can trust,\nbalanced to the cent.",
    subheadline:
      "Double-entry ledgers, payment flows, and reconciliation built for accuracy and auditability from the first transaction.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "ledger",
      badge: "AUDIT",
      lines: ["$ ledger reconcile --daily", "✓ Double-entry balanced", "✓ Audit trail written", "✓ Reconciliation complete"],
      progressLabel: "BALANCED",
      progressValue: 100,
    },
    highlights: [
      { value: "Double-entry", label: "Accounting model" },
      { value: "Audit", label: "Trail on every entry" },
      { value: "Reconciled", label: "Against your providers" },
    ],
    tags: ["Node.js", "PostgreSQL", "Ledger design", "Audit logging"],
  },
];

export function getAllSolutions() {
  return solutions;
}

export function getSolution(slug) {
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return null;
  return {
    ...solution,
    problem: problems[slug] ?? null,
    offerings: solutionOfferings[slug] ?? null,
    workflow: solutionWorkflows[slug] ?? null,
    techStack: solutionTech[slug] ?? null,
    why: solutionWhy[slug] ?? null,
    faq: solutionFaq[slug] ?? null,
    cta: solutionCtas[slug] ?? null,
  };
}