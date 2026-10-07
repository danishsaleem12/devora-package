import { build as buildWhy } from "./serviceWhy";

export const solutionWhy = {
  ecommerce: buildWhy({
    heading: "A store partner who watches your conversion rate.",
    specific: {
      title: "Checkout obsessed",
      description: "Payment and order flows are tested on every path, because that's where revenue lives.",
    },
  }),
  "ai-dashboards": buildWhy({
    heading: "Dashboards your team will actually open.",
    specific: {
      title: "Metrics first",
      description: "We settle what each number means before building a single chart.",
    },
  }),
  "ai-assistants": buildWhy({
    heading: "Assistants you can put in front of customers with confidence.",
    specific: {
      title: "Measured, not hyped",
      description: "Every answer path is tested against real questions before launch.",
    },
  }),
  fintech: buildWhy({
    heading: "Careful engineering where accuracy is non-negotiable.",
    specific: {
      title: "Correctness over speed",
      description: "Money-moving code gets extra tests, reviews, and reconciliation checks.",
    },
  }),
};