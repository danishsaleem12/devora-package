import { build as buildFaq } from "./serviceFaq";

export const solutionFaq = {
  ecommerce: buildFaq([
    {
      q: "Should we use Shopify or a custom build?",
      a: "Shopify suits most stores that want to launch quickly. Custom makes sense for unusual catalogs, pricing rules, or workflows. We recommend one after understanding your needs.",
    },
    {
      q: "Can you migrate our existing store?",
      a: "Yes. We move products, customers, and orders, and set up redirects so you keep your search rankings.",
    },
    {
      q: "Which payment methods can you support?",
      a: "Cards and common wallets through providers like Stripe. Local payment methods depend on which providers operate in your market, and we check that early.",
    },
    {
      q: "How do you keep the store fast?",
      a: "Lean themes, optimized images, limited third-party scripts, and performance checks before every launch.",
    },
    {
      q: "Can you connect shipping, stock, and accounting tools?",
      a: "Yes. We integrate carriers, inventory, and accounting systems so orders flow through without manual re-entry.",
    },
  ]),
  "ai-dashboards": buildFaq([
    {
      q: "Which data sources can you connect?",
      a: "Most databases, spreadsheets, and SaaS tools that have an API or export. We confirm the specifics for your tools during discovery.",
    },
    {
      q: "How accurate are the AI answers?",
      a: "Answers come from queries run against your actual data and are shown with the numbers behind them, so people can verify them. Like any AI, it can misread an ambiguous question, which is why we test on real questions before rollout and design it to show its work.",
    },
    {
      q: "Is our data safe?",
      a: "Access is controlled by role, connections use least-privilege credentials, and sensitive data stays in your systems where possible. We agree on the details with you before starting.",
    },
    {
      q: "Do we need a data warehouse?",
      a: "Not always. Smaller setups can read directly from your existing databases. A warehouse helps when data is large or comes from many sources.",
    },
    {
      q: "Can we change the dashboards later?",
      a: "Yes. We can set things up so your team can adjust views and filters, and we can add new metrics as your needs change.",
    },
  ]),
  "ai-assistants": buildFaq([
    {
      q: "What content does the assistant learn from?",
      a: "Your help articles, policies, and product documentation, and, with your permission, past support conversations.",
    },
    {
      q: "What happens when it doesn't know the answer?",
      a: "It says so and offers to pass the conversation to a person, rather than guessing.",
    },
    {
      q: "Can it take actions, like checking an order?",
      a: "Yes, once we connect it to the relevant systems. We start with read-only lookups and add actions carefully.",
    },
    {
      q: "How do you measure quality?",
      a: "With test sets built from real customer questions, rerun whenever the content or model changes, plus review of live conversations after launch.",
    },
    {
      q: "Which channels can it run on?",
      a: "Website chat first. Channels like in-app chat or messaging platforms depend on your setup and can be added.",
    },
  ]),
  fintech: buildFaq([
    {
      q: "Do we need a license to run this?",
      a: "Whether you need one depends on what you offer and where. We build the software to support compliance requirements, but regulatory advice should come from a qualified specialist.",
    },
    {
      q: "Why a double-entry ledger?",
      a: "Every movement is recorded as matching debits and credits, so errors surface as imbalances instead of staying hidden.",
    },
    {
      q: "How do you stay accurate when systems fail?",
      a: "Operations are transactional and idempotent, so a retry can't apply twice and a failure can't leave half-finished entries.",
    },
    {
      q: "Can you integrate with banks and payment providers?",
      a: "Usually, depending on what they offer in your country. Some have APIs and others only provide statement files, and we design for both.",
    },
    {
      q: "Can you review our existing ledger?",
      a: "Yes. We can audit the data model and flows, then report where errors could creep in.",
    },
  ]),
};