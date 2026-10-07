const SUBHEADING =
  "Tell us what you're working on. We'll reply with honest feedback and a clear next step.";

const PRIMARY_CTA = { label: "Start a project", href: "/contact" };
const SECONDARY_CTA = { label: "Email hello@devora.com", href: "mailto:hello@devora.com" };

const NEXT_STEPS = [
  { title: "Tell us about it", description: "Share your goals, timeline, and anything you already have." },
  { title: "We get back to you", description: "Expect questions, honest feedback, and a rough idea of the approach." },
  { title: "Agree on a plan", description: "A clear scope and timeline in writing before anything starts." },
];

export function build(heading) {
  return {
    heading,
    subheading: SUBHEADING,
    primaryCta: PRIMARY_CTA,
    secondaryCta: SECONDARY_CTA,
    nextStepsLabel: "WHAT HAPPENS NEXT",
    nextSteps: NEXT_STEPS,
  };
}

export const ctas = {
  "web-development": build("Ready for a website that works as hard as you do?"),
  "full-stack-development": build("Have a system to build? Let's design it properly."),
  "ai-llm-solutions": build("Thinking about adding AI to your product? Let's test it first."),
  "saas-product-development": build("Have a SaaS idea? Let's find the smallest version worth building."),
  "e-commerce-development": build("Ready for a store that's easy to run and built to sell?"),
  "ui-ux-design-systems": build("Ready for an interface people actually understand?"),
  "cloud-devops": build("Ready for infrastructure you can stop worrying about?"),
  "api-integrations": build("Need your systems to talk to each other reliably?"),
};