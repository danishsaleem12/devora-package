export const techStacks = {
  "web-development": {
    eyebrow: "TECH STACK",
    heading: "Modern tools, chosen for speed and longevity.",
    subheading: "A proven stack that keeps pages fast and codebases easy to maintain.",
    groups: [
      {
        label: "Frontend",
        items: [
          { name: "Next.js", note: "Server rendering and routing that keeps pages fast and SEO-friendly." },
          { name: "React", note: "Component-based UI that stays maintainable as the site grows." },
          { name: "Tailwind CSS", note: "Consistent styling without bloated stylesheets." },
        ],
      },
      {
        label: "Content & Data",
        items: [
          { name: "Headless CMS", note: "Lets your team edit content without a developer." },
          { name: "Node.js", note: "Lightweight backend for forms, APIs, and integrations." },
          { name: "REST & GraphQL", note: "Clean data delivery to any page or app." },
        ],
      },
      {
        label: "Quality & Delivery",
        items: [
          { name: "TypeScript", note: "Catches mistakes before they reach your visitors." },
          { name: "Lighthouse", note: "Performance and accessibility checks on every release." },
          { name: "GitHub Actions", note: "Automated tests and deployments." },
        ],
      },
    ],
  },
  "full-stack-development": {
    eyebrow: "TECH STACK",
    heading: "One coherent stack from browser to database.",
    subheading: "Consistent tooling across layers means fewer surprises and faster delivery.",
    groups: [
      {
        label: "Frontend",
        items: [
          { name: "Next.js", note: "Routing, rendering, and performance out of the box." },
          { name: "React", note: "Reusable components shared across the product." },
          { name: "Tailwind CSS", note: "Fast, consistent interface styling." },
        ],
      },
      {
        label: "Backend",
        items: [
          { name: "Node.js", note: "One language across frontend and backend." },
          { name: "Express", note: "Simple, well-understood API layer." },
          { name: "JWT & sessions", note: "Secure, stateless authentication patterns." },
        ],
      },
      {
        label: "Data & Deployment",
        items: [
          { name: "MongoDB", note: "Flexible documents for fast-changing data." },
          { name: "PostgreSQL", note: "Relational integrity where the data demands it." },
          { name: "Docker", note: "Identical environments from laptop to production." },
        ],
      },
    ],
  },
  "ai-llm-solutions": {
    eyebrow: "TECH STACK",
    heading: "The right model for each job, with guardrails around it.",
    subheading: "Tooling for building, measuring, and safely running AI features.",
    groups: [
      {
        label: "Models & APIs",
        items: [
          { name: "LLM provider APIs", note: "We pick the model per task instead of using one for everything." },
          { name: "Embeddings", note: "Turn your content into searchable meaning." },
          { name: "Tool calling", note: "Lets assistants take real actions in your systems." },
        ],
      },
      {
        label: "Retrieval & Data",
        items: [
          { name: "Vector databases", note: "Fast semantic search across your documents." },
          { name: "RAG pipelines", note: "Chunking and ranking tuned to your content." },
          { name: "Python", note: "Data processing and evaluation tooling." },
        ],
      },
      {
        label: "Quality & Safety",
        items: [
          { name: "Eval suites", note: "Repeatable tests that show whether changes help." },
          { name: "Guardrails", note: "Checks on inputs and outputs to keep answers safe and on-topic." },
          { name: "Tracing", note: "Visibility into cost, latency, and failures." },
        ],
      },
    ],
  },
  "saas-product-development": {
    eyebrow: "TECH STACK",
    heading: "A foundation that survives your first thousand customers.",
    subheading: "Boring, reliable technology where it counts, with room to grow.",
    groups: [
      {
        label: "Product",
        items: [
          { name: "Next.js", note: "Marketing site and app in one codebase." },
          { name: "TypeScript", note: "Safer refactors as the product changes." },
          { name: "Tailwind CSS", note: "Rapid UI iteration with a consistent look." },
        ],
      },
      {
        label: "Backend & Data",
        items: [
          { name: "Node.js", note: "Fast to build, easy to hire for." },
          { name: "PostgreSQL", note: "Strong integrity for tenants, plans, and invoices." },
          { name: "Redis", note: "Caching and queues for responsive features." },
        ],
      },
      {
        label: "Billing & Growth",
        items: [
          { name: "Stripe", note: "Subscriptions, trials, and invoicing handled reliably." },
          { name: "OAuth & SSO", note: "Sign-in options business customers expect." },
          { name: "Product analytics", note: "See what users do, not just what they say." },
        ],
      },
    ],
  },
  "e-commerce-development": {
    eyebrow: "TECH STACK",
    heading: "Platforms and payments you can trust with revenue.",
    subheading: "Chosen for speed, security, and easy day-to-day management.",
    groups: [
      {
        label: "Storefront",
        items: [
          { name: "Shopify", note: "Mature platform when you want to launch fast." },
          { name: "Next.js", note: "Custom storefronts with excellent page speed." },
          { name: "Tailwind CSS", note: "Tidy, consistent product and checkout pages." },
        ],
      },
      {
        label: "Commerce Backend",
        items: [
          { name: "Node.js", note: "Custom logic for pricing, orders, and fulfilment." },
          { name: "MongoDB", note: "Flexible product catalogs and variants." },
          { name: "Admin panels", note: "Manage products and orders without a developer." },
        ],
      },
      {
        label: "Payments & Operations",
        items: [
          { name: "Stripe", note: "Cards and wallets with strong fraud tooling." },
          { name: "Webhooks", note: "Reliable order and payment status updates." },
          { name: "Shipping & stock APIs", note: "Keep carriers and inventory in sync." },
        ],
      },
    ],
  },
  "ui-ux-design-systems": {
    eyebrow: "TECH STACK",
    heading: "Design tools that connect directly to code.",
    subheading: "The goal is zero gap between what is designed and what ships.",
    groups: [
      {
        label: "Design",
        items: [
          { name: "Figma", note: "Shared design files, prototypes, and feedback in one place." },
          { name: "Prototyping", note: "Clickable flows to test ideas before building." },
          { name: "User testing", note: "Real observations instead of opinions." },
        ],
      },
      {
        label: "Design Systems",
        items: [
          { name: "Design tokens", note: "One source of truth for color, type, and spacing." },
          { name: "Storybook", note: "Living documentation for every component." },
          { name: "Tailwind CSS", note: "Tokens applied consistently across screens." },
        ],
      },
      {
        label: "Quality",
        items: [
          { name: "WCAG audits", note: "Checks against accessibility standards, with fixes." },
          { name: "Automated a11y tests", note: "Catch regressions on every change." },
          { name: "Visual regression tests", note: "Spot unintended UI changes early." },
        ],
      },
    ],
  },
  "cloud-devops": {
    eyebrow: "TECH STACK",
    heading: "Automation-first tooling with full visibility.",
    subheading: "Everything versioned, repeatable, and observable.",
    groups: [
      {
        label: "Cloud",
        items: [
          { name: "AWS", note: "Broad, mature services for most workloads." },
          { name: "Managed platforms", note: "Less operational burden for smaller teams." },
          { name: "CDN & edge", note: "Faster delivery to users everywhere." },
        ],
      },
      {
        label: "Automation",
        items: [
          { name: "Terraform", note: "Infrastructure defined in code and reviewed like code." },
          { name: "GitHub Actions", note: "Build, test, and deploy on every merge." },
          { name: "Docker", note: "Consistent builds and runtime environments." },
        ],
      },
      {
        label: "Observability",
        items: [
          { name: "Metrics & dashboards", note: "A clear view of system health." },
          { name: "Error tracking", note: "Know about failures before users report them." },
          { name: "Log aggregation", note: "Searchable history when something goes wrong." },
        ],
      },
    ],
  },
  "api-integrations": {
    eyebrow: "TECH STACK",
    heading: "Standards-based tooling that other teams can adopt easily.",
    subheading: "Open formats and predictable behavior over clever shortcuts.",
    groups: [
      {
        label: "Interfaces",
        items: [
          { name: "REST", note: "Familiar, cache-friendly, and broadly supported." },
          { name: "GraphQL", note: "Flexible queries when clients need different shapes of data." },
          { name: "OpenAPI", note: "Machine-readable contracts and generated docs." },
        ],
      },
      {
        label: "Runtime",
        items: [
          { name: "Node.js", note: "Efficient handling of many concurrent requests." },
          { name: "Express", note: "Minimal, well-understood service layer." },
          { name: "Message queues", note: "Smooth out spikes and retry failed work." },
        ],
      },
      {
        label: "Reliability",
        items: [
          { name: "Webhooks", note: "Signed, retried, and idempotent event delivery." },
          { name: "Rate limiting", note: "Protects your platform from abuse and overload." },
          { name: "Contract tests", note: "Catch breaking changes before consumers do." },
        ],
      },
    ],
  },
};