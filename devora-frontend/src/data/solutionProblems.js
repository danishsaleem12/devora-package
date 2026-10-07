function build({ heading, subheading, items }) {
  return { eyebrow: "THE PROBLEM", heading, subheading, items };
}

export const problems = {
  ecommerce: build({
    heading: "Most online stores leak revenue in the same few places.",
    subheading: "These are the problems we hear about most from store owners.",
    items: [
      {
        title: "Slow, cluttered storefronts",
        description: "Heavy themes and too many apps make pages slow, and shoppers leave before they see a product.",
        fix: "A lean storefront with only what the store needs, tuned for speed on mobile.",
      },
      {
        title: "Checkout friction",
        description: "Extra steps, limited payment options, and confusing errors push buyers away at the last moment.",
        fix: "A short, tested checkout with the payment methods your customers actually use.",
      },
      {
        title: "Back-office busywork",
        description: "Updating stock, prices, and orders across systems by hand eats hours and causes mistakes.",
        fix: "Admin tools and integrations that keep catalog, stock, and orders in sync automatically.",
      },
    ],
  }),
  "ai-dashboards": build({
    heading: "Having data isn't the same as understanding it.",
    subheading: "Most teams are not short on numbers. They're short on clarity.",
    items: [
      {
        title: "Data scattered across tools",
        description: "Sales, marketing, and operations numbers live in different places, so nobody sees the whole picture.",
        fix: "One dashboard connected to your sources, with consistent definitions for every metric.",
      },
      {
        title: "Reports that are stale on arrival",
        description: "By the time a weekly report is assembled, the moment to act on it has passed.",
        fix: "Live data with alerts when something moves, instead of waiting for the next report.",
      },
      {
        title: "Answers need an analyst",
        description: "Simple questions turn into requests that wait days for someone with the skills to answer them.",
        fix: "Ask in plain language and get an answer with the numbers behind it, so people can check it.",
      },
    ],
  }),
  "ai-assistants": build({
    heading: "Support teams answer the same questions all day.",
    subheading: "The routine work crowds out the cases that really need a person.",
    items: [
      {
        title: "Repeat questions crowd out real work",
        description: "Order status, policies, and how-to questions take time that complex cases need.",
        fix: "An assistant that handles the routine questions using your own help content.",
      },
      {
        title: "Generic bots frustrate customers",
        description: "Chatbots that don't know your business give vague answers and trap people in loops.",
        fix: "Answers grounded in your documents, with a clear admission when it doesn't know.",
      },
      {
        title: "Hard to trust what it says",
        description: "Teams worry about wrong answers reaching customers, with no way to measure quality.",
        fix: "Test suites, guardrails, and easy handoff to a person, so quality is measured before and after launch.",
      },
    ],
  }),
  fintech: build({
    heading: "In financial software, small errors become big problems.",
    subheading: "Accuracy and traceability can't be added later.",
    items: [
      {
        title: "Balances that don't add up",
        description: "Spreadsheets and ad-hoc tables drift apart, and finding the difference takes days.",
        fix: "A double-entry ledger where every movement has two sides, so imbalances can't hide.",
      },
      {
        title: "No clear audit trail",
        description: "When someone asks who changed what and when, the answer is scattered or missing.",
        fix: "Append-only records with timestamps and actors on every entry.",
      },
      {
        title: "Reconciliation by hand",
        description: "Matching your records against payment providers and banks eats time every month.",
        fix: "Automated reconciliation that flags mismatches for review instead of searching for them.",
      },
    ],
  }),
};