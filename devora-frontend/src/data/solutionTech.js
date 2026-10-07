export const solutionTech = {
  ecommerce: {
    eyebrow: "TECH & INTEGRATIONS",
    heading: "Platforms and payments you can trust with revenue.",
    subheading: "Chosen for speed, security, and easy day-to-day management.",
    groups: [
      {
        label: "Platform",
        items: [
          { name: "Shopify", note: "Mature platform when you want to launch fast." },
          { name: "Next.js", note: "Custom storefronts with excellent page speed." },
          { name: "Node.js", note: "Custom logic for pricing, orders, and fulfilment." },
        ],
      },
      {
        label: "Payments & Checkout",
        items: [
          { name: "Stripe", note: "Cards and wallets with strong fraud tooling." },
          { name: "Wallets & local methods", note: "Added where providers support them in your market." },
          { name: "Webhooks", note: "Reliable order and payment status updates." },
        ],
      },
      {
        label: "Operations",
        items: [
          { name: "Shipping carrier APIs", note: "Rates, labels, and tracking without copy-pasting." },
          { name: "Inventory & ERP sync", note: "Stock levels that match reality across channels." },
          { name: "Accounting tools", note: "Orders and payouts flowing into your books." },
        ],
      },
    ],
  },
  "ai-dashboards": {
    eyebrow: "TECH & INTEGRATIONS",
    heading: "Reliable data plumbing, with AI on top.",
    subheading: "The dependable parts first, then the intelligent ones.",
    groups: [
      {
        label: "Data",
        items: [
          { name: "PostgreSQL", note: "Reliable storage and fast queries across your data." },
          { name: "Source connectors", note: "Databases, spreadsheets, and SaaS tools via their APIs." },
          { name: "Python pipelines", note: "Cleaning and combining data on a schedule." },
        ],
      },
      {
        label: "Interface",
        items: [
          { name: "Next.js", note: "Fast, responsive dashboards in the browser." },
          { name: "Charting libraries", note: "Clear visuals chosen for readability, not decoration." },
          { name: "Role-based access", note: "Each person sees the data they should." },
        ],
      },
      {
        label: "AI",
        items: [
          { name: "LLM APIs", note: "Turn plain-language questions into checked queries." },
          { name: "Answer verification", note: "Every answer shows the numbers behind it." },
          { name: "Anomaly detection", note: "Statistical checks that flag unusual movements." },
        ],
      },
    ],
  },
  "ai-assistants": {
    eyebrow: "TECH & INTEGRATIONS",
    heading: "Grounded in your content, connected to your tools.",
    subheading: "Everything the assistant says traces back to something you wrote.",
    groups: [
      {
        label: "Models",
        items: [
          { name: "LLM provider APIs", note: "Model chosen per task for quality, speed, and cost." },
          { name: "Embeddings", note: "Turn your content into searchable meaning." },
          { name: "Tool calling", note: "Lets the assistant look things up and take approved actions." },
        ],
      },
      {
        label: "Knowledge",
        items: [
          { name: "Vector databases", note: "Fast semantic search across your documents." },
          { name: "RAG pipelines", note: "Chunking and ranking tuned to your content." },
          { name: "Content sync", note: "Stays current as your help content changes." },
        ],
      },
      {
        label: "Channels & Safety",
        items: [
          { name: "Web chat widget", note: "Branded chat for your site or app." },
          { name: "Helpdesk integrations", note: "Handoff into the tools your team already uses." },
          { name: "Guardrails & evals", note: "Checks that keep answers accurate and on-topic." },
        ],
      },
    ],
  },
  fintech: {
    eyebrow: "TECH & INTEGRATIONS",
    heading: "Conservative technology for systems that hold money.",
    subheading: "Proven tools, strict data integrity, and nothing clever where it doesn't belong.",
    groups: [
      {
        label: "Core",
        items: [
          { name: "Node.js", note: "Well-understood runtime with a mature ecosystem." },
          { name: "PostgreSQL", note: "Transactions and constraints that protect data integrity." },
          { name: "Double-entry model", note: "An account and entry structure where every transaction balances." },
        ],
      },
      {
        label: "Integrations",
        items: [
          { name: "Payment providers", note: "Collections and payouts with proper state tracking." },
          { name: "Bank & statement feeds", note: "Imports for reconciliation; availability varies by country and bank." },
          { name: "Webhooks & idempotency", note: "Retries that can never double-apply a payment." },
        ],
      },
      {
        label: "Security & Compliance",
        items: [
          { name: "Audit logging", note: "Append-only records of every change." },
          { name: "Roles & approvals", note: "Sensitive actions need the right people to sign off." },
          { name: "Encryption", note: "In transit and at rest." },
        ],
      },
    ],
  },
};