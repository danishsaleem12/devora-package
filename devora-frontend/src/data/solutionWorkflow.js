function build({ heading, subheading, steps }) {
  return { eyebrow: "HOW IT WORKS", heading, subheading, steps };
}

export const solutionWorkflows = {
  ecommerce: build({
    heading: "From catalog to first order.",
    subheading: "Planned around your products and your customers' path to checkout.",
    steps: [
      { title: "Plan the store", description: "Catalog structure, platform choice, and integrations mapped out up front." },
      { title: "Design", description: "Storefront and product page designs focused on clarity and trust." },
      { title: "Build & integrate", description: "Storefront, admin tools, and payment, shipping, and stock connections." },
      { title: "Test checkout", description: "Every payment path, edge case, and device tested before real customers arrive." },
      { title: "Launch & improve", description: "Go live, watch the funnel, and improve what the data points to." },
    ],
  }),
  "ai-dashboards": build({
    heading: "From scattered data to a live view.",
    subheading: "We start with the questions your team needs answered, not with charts.",
    steps: [
      { title: "Map your data", description: "Identify where the data lives, how clean it is, and how it should be connected." },
      { title: "Define the metrics", description: "Agree on what each number means and who relies on it." },
      { title: "Build the dashboards", description: "Role-based views, reviewed with real users as they take shape." },
      { title: "Add AI & alerts", description: "Plain-language questions and anomaly alerts, tested against real scenarios." },
      { title: "Roll out & refine", description: "Train the team, collect feedback, and adjust what people actually use." },
    ],
  }),
  "ai-assistants": build({
    heading: "From help docs to a trusted assistant.",
    subheading: "Nothing talks to customers until it has been tested on real questions.",
    steps: [
      { title: "Gather your content", description: "Collect help articles, policies, and past conversations, and fill the gaps." },
      { title: "Prototype", description: "A working assistant on your content, to check feasibility quickly." },
      { title: "Test with real questions", description: "Measure accuracy, tone, and failure cases against questions customers really ask." },
      { title: "Launch with handoff", description: "Go live with guardrails, usage limits, and a clear path to a human." },
      { title: "Monitor & improve", description: "Track quality and unanswered questions, and update content as the business changes." },
    ],
  }),
  fintech: build({
    heading: "Designed for accuracy from day one.",
    subheading: "The data model comes first, because everything else depends on it.",
    steps: [
      { title: "Model the money flows", description: "Map how money moves, who touches it, and what must be recorded." },
      { title: "Design the ledger", description: "Accounts, entries, and rules for how balances are produced." },
      { title: "Build & integrate", description: "Payment providers, banks, and internal systems connected with proper failure handling." },
      { title: "Verify & audit", description: "Automated tests, reconciliation checks, and security review before real funds move." },
      { title: "Launch & monitor", description: "Staged rollout with alerts for mismatches and unusual activity." },
    ],
  }),
};