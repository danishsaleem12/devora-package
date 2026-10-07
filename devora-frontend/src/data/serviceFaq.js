const HEADING = "Questions we hear often.";
const SUBHEADING = "Short, honest answers. If yours isn't here, just ask.";

export function build(items) {
  return { eyebrow: "FAQ", heading: HEADING, subheading: SUBHEADING, items };
}

export const faqs = {
  "web-development": build([
    {
      q: "How long does a website project take?",
      a: "It depends on scope. A focused marketing site is usually quicker than a custom web app with integrations. After a short discovery call we give you a realistic timeline in writing.",
    },
    {
      q: "Can you work from our existing design or brand?",
      a: "Yes. We can build from your designs and brand guidelines, or handle the design ourselves if you don't have them yet.",
    },
    {
      q: "Will we be able to edit the content ourselves?",
      a: "Yes. We can connect a headless CMS so your team updates text, images, and pages without touching code.",
    },
    {
      q: "Is the site optimized for search engines?",
      a: "The technical fundamentals are built in: semantic markup, metadata, fast loading, and clean URLs. Ongoing content strategy is a separate effort we can discuss.",
    },
    {
      q: "What happens after launch?",
      a: "You can choose ongoing support for updates, monitoring, and improvements, or take everything over with full documentation.",
    },
  ]),
  "full-stack-development": build([
    {
      q: "Can you work with our existing codebase?",
      a: "Yes. We start with a review of what exists, then agree whether to extend it, refactor parts of it, or replace pieces gradually.",
    },
    {
      q: "How do you choose the tech stack?",
      a: "Based on your requirements, your team's skills, and long-term maintenance, not on what's trending. We explain the trade-offs so the decision is yours.",
    },
    {
      q: "Do you build admin and internal tools too?",
      a: "Yes. Admin panels, dashboards, and internal tools are a normal part of full-stack projects.",
    },
    {
      q: "How do you handle security?",
      a: "Authentication and permissions are designed up front, inputs are validated, secrets are kept out of code, and dependencies are reviewed before release.",
    },
    {
      q: "Who owns the code?",
      a: "The code lives in your repositories, with documentation so your team or another developer can pick it up. Exact terms are confirmed in the project agreement.",
    },
  ]),
  "ai-llm-solutions": build([
    {
      q: "Which AI models do you use?",
      a: "We choose per task, across the major providers, based on quality, speed, and cost. We build so the model can be swapped later without rewriting your product.",
    },
    {
      q: "How is our data handled?",
      a: "Only the data a feature actually needs is sent to a model, with access controls around it. We agree on data handling and provider choices with you before building.",
    },
    {
      q: "Can you stop the AI from making things up?",
      a: "Not entirely, and anyone who promises that is overselling. We reduce it by grounding answers in your documents, testing against real cases, adding guardrails, and designing fallbacks that admit uncertainty.",
    },
    {
      q: "How do you keep usage costs under control?",
      a: "Through model selection, caching, shorter prompts, and usage limits, with cost tracked per feature so there are no surprises.",
    },
    {
      q: "Can you add AI to our existing product?",
      a: "Yes. Most of our AI work is adding focused features to products that already exist, rather than building from scratch.",
    },
  ]),
  "saas-product-development": build([
    {
      q: "Can you help us decide what goes into the MVP?",
      a: "Yes. We help cut the feature list down to what your first customers actually need, and plan what comes after.",
    },
    {
      q: "Can you take over a SaaS product that's already running?",
      a: "Yes. We begin with a code and architecture review, then give you a clear plan for stabilizing and extending it.",
    },
    {
      q: "How do you handle multi-tenancy and billing?",
      a: "Tenant isolation and subscription billing are designed in from the start rather than bolted on, using established payment providers for the money side.",
    },
    {
      q: "Will it scale as we grow?",
      a: "We design for your next stage, not for imaginary scale. The foundation is chosen so you can scale up without a full rewrite.",
    },
    {
      q: "Do you stay involved after launch?",
      a: "If you want us to. Many teams keep us on for improvements, performance work, and new features as customers give feedback.",
    },
  ]),
  "e-commerce-development": build([
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
      q: "Can our team manage products without a developer?",
      a: "Yes. Whether on Shopify or a custom admin panel, your team can manage products, prices, and orders on their own.",
    },
    {
      q: "Can you connect shipping and accounting tools?",
      a: "Yes. We integrate carriers, inventory, and accounting systems so orders flow through without manual re-entry.",
    },
  ]),
  "ui-ux-design-systems": build([
    {
      q: "Do you design from scratch or improve what we have?",
      a: "Both. We can redesign an existing product step by step, or design something new, starting with research in either case.",
    },
    {
      q: "What is a design system, and do we need one?",
      a: "It's a shared set of components and rules that keeps a product consistent. It pays off when you have many screens, products, or teams. For a small site, a lighter approach is usually enough.",
    },
    {
      q: "Do you also code the designs?",
      a: "Yes. Our designers work alongside engineers, and we can build the components so what you approve is what ships.",
    },
    {
      q: "How do you check accessibility?",
      a: "We review designs and built interfaces against WCAG, test with automated tools and manual checks, and give you concrete fixes.",
    },
    {
      q: "Can you work with our in-house designers or developers?",
      a: "Yes. We regularly join existing teams and adapt to your tools and processes.",
    },
  ]),
  "cloud-devops": build([
    {
      q: "Do you only work with AWS?",
      a: "AWS is common, but we adapt to your existing provider and tools instead of forcing a migration.",
    },
    {
      q: "Can you reduce our cloud costs?",
      a: "Often there are savings in oversized or idle resources. We review your usage and give prioritized recommendations, but we can't promise a number before looking.",
    },
    {
      q: "How do you deploy without downtime?",
      a: "With staged rollouts, health checks, and automatic rollback, so a bad release is caught and reversed quickly.",
    },
    {
      q: "Do you handle security and compliance?",
      a: "We apply security best practices to the infrastructure. Formal certifications like SOC 2 also need organizational processes, and we can support the technical side of those.",
    },
    {
      q: "Can you run our infrastructure on an ongoing basis?",
      a: "Yes. We can provide ongoing monitoring and maintenance, or set everything up and train your team to run it.",
    },
  ]),
  "api-integrations": build([
    {
      q: "REST or GraphQL?",
      a: "REST suits most cases and is easy for others to adopt. GraphQL helps when many clients need different shapes of data. We'll recommend based on who will consume the API.",
    },
    {
      q: "Can you integrate with our legacy systems?",
      a: "Usually yes. We build a clean layer in front of older systems so new applications don't have to deal with their quirks.",
    },
    {
      q: "What happens when a third-party service fails?",
      a: "We plan for it with retries, queues, idempotent handling, and alerts, so a temporary outage doesn't lose data.",
    },
    {
      q: "Will the API be documented?",
      a: "Yes. We publish OpenAPI documentation so other developers can integrate without asking you questions.",
    },
    {
      q: "How do you change an API without breaking clients?",
      a: "Through versioning and deprecation periods, with contract tests that catch breaking changes before they ship.",
    },
  ]),
};