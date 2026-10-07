const SHARED_REASONS = [
  {
    title: "Set up with you",
    description: "We configure and tailor the product to your business instead of handing over a login and walking away.",
  },
  {
    title: "Support after launch",
    description: "A real team to ask when questions come up, long after the first day.",
  },
  {
    title: "Honest about fit",
    description: "If a product isn't the right answer for you, we'll say so and suggest what is.",
  },
];

const DEFAULT_SUBHEADING = "Software from a team that stays involved, from the first demo to everyday use.";

export function build({ heading, subheading = DEFAULT_SUBHEADING, specific, stats = [], testimonial = null }) {
  return {
    eyebrow: "WHY DEVORA",
    heading,
    subheading,
    reasons: [specific, ...SHARED_REASONS],
    stats, // e.g. [{ value: "40+", label: "Teams onboarded" }]
    testimonial, // e.g. { quote: "...", name: "Jane Doe", role: "COO, Acme" }
  };
}

export const productWhy = {
  "devora-analytics": build({
    heading: "Analytics your team can actually trust.",
    specific: {
      title: "Numbers that match your source",
      description: "Dashboards are checked against your own data before they go live, so everyone works from the same figures.",
    },
  }),
  "devora-assist": build({
    heading: "An assistant that stays on your side.",
    specific: {
      title: "Answers from your content only",
      description: "The assistant is grounded in your own material, and a person takes over when a question needs one.",
    },
  }),
  "devora-commerce-kit": build({
    heading: "A faster start, without a cookie-cutter store.",
    specific: {
      title: "Customized, not copied",
      description: "The kit is the foundation. Your brand, products, and checkout flow shape what's built on top.",
    },
  }),
  "devora-hrm": build({
    heading: "HR software shaped around your policies.",
    specific: {
      title: "Your rules, built in",
      description: "Leave types, approvals, and attendance rules are set up to match how your company already works.",
    },
  }),
  "devora-pos": build({
    heading: "A POS made for the pace of your counter.",
    specific: {
      title: "Tested for busy hours",
      description: "Checkout and stock updates are walked through with you before you open to customers.",
    },
  }),
};