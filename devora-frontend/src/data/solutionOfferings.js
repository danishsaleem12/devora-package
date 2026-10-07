function build({ heading, subheading, items }) {
  return { eyebrow: "WHAT'S INCLUDED", heading, subheading, items };
}

export const solutionOfferings = {
  ecommerce: build({
    heading: "A complete store, not just a theme.",
    subheading: "Everything between your catalog and your first order, on Shopify or custom.",
    items: [
      { icon: "layout", title: "Storefront Design & Build", description: "Brand-true product, collection, and landing pages built mobile first." },
      { icon: "layers", title: "Catalog & Variants", description: "Products, variants, bundles, and collections structured to be easy to browse and easy to manage." },
      { icon: "card", title: "Checkout & Payments", description: "A short checkout with cards, wallets, and the local methods available in your market." },
      { icon: "chart", title: "Admin & Order Management", description: "Panels for managing products, prices, stock, and orders without a developer." },
      { icon: "plug", title: "Shipping, Stock & Accounting", description: "Carriers, inventory, and accounting tools connected so orders flow through without re-entry." },
      { icon: "gauge", title: "Speed & Conversion Tuning", description: "Performance work, search, and funnel improvements guided by real shopper behavior." },
    ],
  }),
  "ai-dashboards": build({
    heading: "One live view of the numbers that matter.",
    subheading: "Connected data, clear metrics, and AI that helps people actually use them.",
    items: [
      { icon: "plug", title: "Data Source Connections", description: "Databases, spreadsheets, and SaaS tools pulled into one place." },
      { icon: "doc", title: "Metric Definitions", description: "Agreed definitions for each metric, so teams stop arguing about whose number is right." },
      { icon: "chart", title: "Live Dashboards", description: "Role-based views that update automatically, from executive overview to daily operations." },
      { icon: "bot", title: "Plain-Language Questions", description: "Ask a question and get an answer with the data behind it." },
      { icon: "gauge", title: "Alerts & Anomaly Detection", description: "Notifications when a metric moves unexpectedly, so you hear about it first." },
      { icon: "shield", title: "Access & Permissions", description: "Control who sees which data, down to the team or customer." },
    ],
  }),
  "ai-assistants": build({
    heading: "An assistant that knows your business.",
    subheading: "Built on your content, measured before launch, and safe to put in front of customers.",
    items: [
      { icon: "doc", title: "Knowledge Base Setup", description: "Your help articles, policies, and product docs prepared for accurate retrieval." },
      { icon: "bot", title: "Chat Assistant", description: "A branded assistant for your site or app that answers in your tone." },
      { icon: "refresh", title: "Human Handoff", description: "Smooth escalation to your team, with the conversation history attached." },
      { icon: "plug", title: "Actions & Lookups", description: "Check order status, book appointments, or update details by connecting to your systems." },
      { icon: "shield", title: "Quality Testing & Guardrails", description: "Test suites and safety checks that keep answers accurate and on-topic." },
      { icon: "chart", title: "Analytics & Improvement", description: "See what customers ask, where it struggles, and what content to add next." },
    ],
  }),
  fintech: build({
    heading: "The core of a financial system, done carefully.",
    subheading: "Accurate ledgers, traceable changes, and reconciliations you can rely on.",
    items: [
      { icon: "layers", title: "Double-Entry Ledger", description: "Accounts and journal entries designed so every transaction balances." },
      { icon: "card", title: "Payment Flows", description: "Collections, payouts, and transfers with proper state tracking and failure handling." },
      { icon: "doc", title: "Audit Trail", description: "Append-only records showing who changed what and when." },
      { icon: "refresh", title: "Reconciliation", description: "Automated matching against provider and bank data, with mismatches flagged for review." },
      { icon: "chart", title: "Reporting & Statements", description: "Balances, statements, and exports for finance and compliance teams." },
      { icon: "shield", title: "Security & Access Control", description: "Role-based permissions, encryption, and approval flows for sensitive actions." },
    ],
  }),
};