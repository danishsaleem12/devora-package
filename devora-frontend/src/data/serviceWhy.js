const SHARED_REASONS = [
  {
    title: "Clear communication",
    description: "A single point of contact and regular demos, so you always know where things stand.",
  },
  {
    title: "Built to be owned",
    description: "Clean code and documentation, so you're never locked in to us.",
  },
  {
    title: "Honest scoping",
    description: "We tell you what isn't worth building, and what it will realistically take.",
  },
];

const DEFAULT_SUBHEADING = "How we work with clients, from the first call to long after launch.";

export function build({ heading, subheading = DEFAULT_SUBHEADING, specific, stats = [], testimonial = null }) {
  return {
    eyebrow: "WHY DEVORA",
    heading,
    subheading,
    reasons: [specific, ...SHARED_REASONS],
    stats, // e.g. [{ value: "40+", label: "Projects delivered" }]
    testimonial, // e.g. { quote: "...", name: "Jane Doe", role: "CTO, Acme" }
  };
}

export const whyDevora = {
  "web-development": build({
    heading: "A website partner, not just a vendor.",
    specific: {
      title: "Performance as a requirement",
      description: "Speed and accessibility targets are agreed up front and checked before launch.",
    },
  }),
  "full-stack-development": build({
    heading: "One accountable team for the whole system.",
    specific: {
      title: "Designed together",
      description: "Frontend, API, and database are planned as one system, so they fit without glue code.",
    },
  }),
  "ai-llm-solutions": build({
    heading: "AI work you can trust in production.",
    specific: {
      title: "Measured, not hyped",
      description: "Every AI feature ships with tests that show it works on your real cases.",
    },
  }),
  "saas-product-development": build({
    heading: "A product partner who cares if it sells.",
    specific: {
      title: "Product-minded engineering",
      description: "We question features that won't help your first customers.",
    },
  }),
  "e-commerce-development": build({
    heading: "Built by people who care about your conversion rate.",
    specific: {
      title: "Checkout obsessed",
      description: "Payment and order flows are tested on every path, because that's where revenue lives.",
    },
  }),
  "ui-ux-design-systems": build({
    heading: "Design with engineering in the room.",
    specific: {
      title: "Design that ships",
      description: "Designs are built with real components, so what you approve is what you get.",
    },
  }),
  "cloud-devops": build({
    heading: "Infrastructure you can stop worrying about.",
    specific: {
      title: "Reliability first",
      description: "Rollback plans and monitoring come with every change we make.",
    },
  }),
  "api-integrations": build({
    heading: "Integrations that don't break at 2 a.m.",
    specific: {
      title: "Contract first",
      description: "Interfaces are agreed and documented before anyone writes implementation code.",
    },
  }),
};