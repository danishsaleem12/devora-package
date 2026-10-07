const PRIMARY_CTA = { label: "Start a project", href: "/contact" };
const SECONDARY_CTA = { label: "View our work", href: "/portfolio" };
import { offerings } from "./serviceOfferings";
import { workflows } from "./serviceWorkflow";
import { techStacks } from "./serviceTechStack";
import { whyDevora } from "./serviceWhy";
import { faqs } from "./serviceFaq";
import { ctas } from "./serviceCta";

export const services = [
  {
    slug: "web-development",
    title: "Web Development",
    eyebrow: "WEB DEVELOPMENT",
    headline: "Fast, accessible websites\nbuilt to convert.",
    subheadline:
      "We design and build modern websites and web apps on Next.js and React: performance-first, SEO-ready, and easy for your team to maintain.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "web-app",
      badge: "BUILD",
      lines: ["$ npm run build", "✓ Compiled successfully", "✓ Lighthouse score: 98", "✓ Deployed to production"],
      progressLabel: "DEPLOY",
      progressValue: 100,
    },
    highlights: [
      { value: "95+", label: "Lighthouse target" },
      { value: "<2s", label: "Load time goal" },
      { value: "100%", label: "Responsive" },
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    eyebrow: "FULL-STACK DEVELOPMENT",
    headline: "One team, from database\nto interface.",
    subheadline:
      "Frontend, backend, database, and deployment handled by a single team, so nothing gets lost between handoffs and everything ships together.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "docker-compose",
      badge: "LIVE",
      lines: ["$ docker compose up", "✓ API server running", "✓ Database connected", "✓ Auth & roles configured"],
      progressLabel: "SERVICES",
      progressValue: 100,
    },
    highlights: [
      { value: "1 team", label: "End-to-end ownership" },
      { value: "0", label: "Handoff gaps" },
      { value: "Secure", label: "Auth by default" },
    ],
    tags: ["Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    slug: "ai-llm-solutions",
    title: "AI & LLM Solutions",
    eyebrow: "AI & LLM SOLUTIONS",
    headline: "AI that works inside\nyour product.",
    subheadline:
      "From chat assistants to retrieval pipelines and workflow automation, we integrate LLMs with proper evaluation, guardrails, and cost control.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "eval-suite",
      badge: "EVAL",
      lines: ["$ python eval.py --suite assistant", "✓ Test cases passed", "✓ Guardrails active", "✓ Latency within budget"],
      progressLabel: "QUALITY",
      progressValue: 92,
    },
    highlights: [
      { value: "RAG", label: "Grounded answers" },
      { value: "Evals", label: "Measured quality" },
      { value: "Guardrails", label: "Safe by design" },
    ],
    tags: ["LLM APIs", "RAG", "Vector DBs", "Python"],
  },
  {
    slug: "saas-product-development",
    title: "SaaS & Product Development",
    eyebrow: "SAAS & PRODUCT DEVELOPMENT",
    headline: "From first idea to\npaying customers.",
    subheadline:
      "We build SaaS products the right way: multi-tenant architecture, subscription billing, and an MVP you can put in front of real users quickly.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "release",
      badge: "SHIP",
      lines: ["$ git push origin main", "✓ Multi-tenant schema migrated", "✓ Billing webhooks verified", "✓ Release v1.0 is live"],
      progressLabel: "LAUNCH",
      progressValue: 100,
    },
    highlights: [
      { value: "MVP", label: "Built to validate fast" },
      { value: "Multi-tenant", label: "Ready to scale" },
      { value: "Billing", label: "Subscriptions built in" },
    ],
    tags: ["Next.js", "Node.js", "Stripe", "PostgreSQL"],
  },
  {
    slug: "e-commerce-development",
    title: "E-Commerce Development",
    eyebrow: "E-COMMERCE DEVELOPMENT",
    headline: "Stores built to sell,\nnot just to look good.",
    subheadline:
      "Shopify or fully custom, we build fast storefronts with smooth checkout, secure payments, and admin tools your team will enjoy using.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "storefront",
      badge: "LIVE",
      lines: ["$ npm run build", "✓ Catalog synced", "✓ Payments verified", "✓ Checkout flow tested"],
      progressLabel: "CHECKOUT",
      progressValue: 96,
    },
    highlights: [
      { value: "Shopify", label: "& custom builds" },
      { value: "Secure", label: "Payments" },
      { value: "Admin", label: "Panel included" },
    ],
    tags: ["Shopify", "Next.js", "Stripe", "Node.js"],
  },
  {
    slug: "ui-ux-design-systems",
    title: "UI/UX & Design Systems",
    eyebrow: "UI/UX & DESIGN SYSTEMS",
    headline: "Design systems your\nteam actually uses.",
    subheadline:
      "Research-led interface design and component libraries that keep your product consistent, accessible, and fast to extend.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "design-tokens",
      badge: "SYNC",
      lines: ["$ figma export --tokens", "✓ Components documented", "✓ Design tokens synced", "✓ Accessibility audit: AA"],
      progressLabel: "COVERAGE",
      progressValue: 88,
    },
    highlights: [
      { value: "WCAG AA", label: "Accessibility target" },
      { value: "Tokens", label: "One source of truth" },
      { value: "Docs", label: "For every component" },
    ],
    tags: ["Figma", "Storybook", "Tailwind", "Design tokens"],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    eyebrow: "CLOUD & DEVOPS",
    headline: "Ship faster. Stay up.\nSleep better.",
    subheadline:
      "Infrastructure as code, automated pipelines, and monitoring that catches problems before your users do.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "infra",
      badge: "DEPLOY",
      lines: ["$ terraform apply", "✓ Infrastructure provisioned", "✓ CI/CD pipeline green", "✓ Monitoring & alerts live"],
      progressLabel: "PIPELINE",
      progressValue: 100,
    },
    highlights: [
      { value: "IaC", label: "Repeatable infrastructure" },
      { value: "CI/CD", label: "Automated releases" },
      { value: "24/7", label: "Monitoring & alerts" },
    ],
    tags: ["AWS", "Docker", "Terraform", "GitHub Actions"],
  },
  {
    slug: "api-integrations",
    title: "API & Integrations",
    eyebrow: "API & INTEGRATIONS",
    headline: "APIs that connect\neverything cleanly.",
    subheadline:
      "We design well-documented APIs and wire up the third-party tools you rely on: payments, CRMs, messaging, and internal systems.",
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    visual: {
      fileName: "api-check",
      badge: "200 OK",
      lines: ["$ curl -i /api/v1/orders", "✓ Webhooks verified", "✓ Rate limits enforced", "✓ OpenAPI docs published"],
      progressLabel: "UPTIME",
      progressValue: 99,
    },
    highlights: [
      { value: "REST", label: "& GraphQL" },
      { value: "Webhooks", label: "Verified & retried" },
      { value: "OpenAPI", label: "Documented" },
    ],
    tags: ["REST", "GraphQL", "Webhooks", "OpenAPI"],
  },
];

export function getAllServices() {
  return services;
}

export function getService(slug) {
  const service = services.find((s) => s.slug === slug);
  if (!service) return null;
  return {
    ...service,
    offerings: offerings[slug] ?? null,
    workflow: workflows[slug] ?? null,
    techStack: techStacks[slug] ?? null,
    why: whyDevora[slug] ?? null,
    faq: faqs[slug] ?? null,
    cta: ctas[slug] ?? null,
  };
}