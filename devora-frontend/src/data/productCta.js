const PRIMARY_CTA = { label: "Request a demo", href: "/contact" };
const SECONDARY_CTA = { label: "View all products", href: "/products" };

const NEXT_STEPS = [
  {
    title: "Tell us about your business",
    description: "Share what you do and what you want this product to solve.",
  },
  {
    title: "See it in action",
    description: "We walk you through the product, focused on your use case.",
  },
  {
    title: "Plan your setup",
    description: "We agree on customization, onboarding, and a realistic timeline together.",
  },
];

function build({ heading, subheading }) {
  return {
    heading,
    subheading,
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    nextStepsLabel: "WHAT HAPPENS NEXT",
    nextSteps: NEXT_STEPS,
  };
}

export const productCtas = {
  "devora-analytics": build({
    heading: "Ready to see your business in one place?",
    subheading: "Request a demo and we'll show you what your own data could look like.",
  }),
  "devora-assist": build({
    heading: "Ready to answer customers while you sleep?",
    subheading: "Request a demo and see an assistant trained on content like yours.",
  }),
  "devora-commerce-kit": build({
    heading: "Ready to launch your store?",
    subheading: "Request a demo and we'll show you the kit and how it'd fit your brand.",
  }),
  "devora-hrm": build({
    heading: "Ready to retire the spreadsheets?",
    subheading: "Request a demo and see how your HR processes would run in one system.",
  }),
  "devora-pos": build({
    heading: "Ready to speed up your counter?",
    subheading: "Request a demo and we'll walk you through a day of sales, stock, and closing.",
  }),
};