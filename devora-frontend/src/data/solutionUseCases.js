// "Use cases" section for each Solution page. Rendered by components/products/ProductUseCases
// (same shape as productUseCases.js: eyebrow, heading, subheading, items[{ audience, challenge, outcome }]).
export const solutionUseCases = {
  ecommerce: {
    eyebrow: "USE CASES",
    heading: "For stores at every stage.",
    subheading: "Whether you're launching, switching platforms, or scaling up, the solution adapts to where you are.",
    items: [
      { audience: "New online stores", challenge: "Choosing a platform and getting set up feels overwhelming.", outcome: "A store launched on the right platform, ready to sell." },
      { audience: "Stores switching platforms", challenge: "Moving products, customers, and orders risks lost data and downtime.", outcome: "A planned migration with nothing left behind." },
      { audience: "Growing brands", challenge: "Off-the-shelf themes and apps start to hold the store back.", outcome: "Custom features and admin tools that scale with your sales." },
    ],
  },
  "ai-dashboards": {
    eyebrow: "USE CASES",
    heading: "For teams that need to act on their data.",
    subheading: "Clear answers for the people who make decisions every day.",
    items: [
      { audience: "Leadership teams", challenge: "Reports arrive late and tell different stories.", outcome: "One trusted view of the numbers that matter." },
      { audience: "Operations teams", challenge: "Issues surface only after they have caused delays.", outcome: "Live dashboards and alerts that flag changes early." },
      { audience: "Analysts & data teams", challenge: "Hours go into building one-off reports on request.", outcome: "Self-serve dashboards and plain-language questions." },
    ],
  },
  "ai-assistants": {
    eyebrow: "USE CASES",
    heading: "For businesses that want to respond faster.",
    subheading: "Assistants that handle the routine and hand the rest over to your team.",
    items: [
      { audience: "Customer support", challenge: "Repeated questions fill the queue and slow down real issues.", outcome: "Instant answers from your own content, with a human handoff." },
      { audience: "Sales & lead capture", challenge: "Leads go cold when nobody replies after hours.", outcome: "An assistant that qualifies visitors and books the next step." },
      { audience: "Internal teams", challenge: "Staff lose time searching for policies and documents.", outcome: "An assistant that answers questions from your internal knowledge." },
    ],
  },
  fintech: {
    eyebrow: "USE CASES",
    heading: "For products that move money and need to get it right.",
    subheading: "Ledgers and workflows built for accuracy, traceability, and trust.",
    items: [
      { audience: "Fintech startups", challenge: "Balances must be exact from the very first transaction.", outcome: "A double-entry ledger built correctly from day one." },
      { audience: "Finance & operations teams", challenge: "Matching payments to records by hand is slow and error-prone.", outcome: "Daily reconciliation against your providers, with exceptions flagged." },
      { audience: "Compliance & audit teams", challenge: "Reconstructing who changed what takes days.", outcome: "An audit trail on every entry, ready when it is asked for." },
    ],
  },
};
