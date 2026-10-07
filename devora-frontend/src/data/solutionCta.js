import { build as buildCta } from "./serviceCta";

export const solutionCtas = {
  ecommerce: buildCta("Ready for a store that's easy to run and built to sell?"),
  "ai-dashboards": buildCta("Ready to see all your numbers in one place?"),
  "ai-assistants": buildCta("Ready to help customers faster, without losing the human touch?"),
  fintech: buildCta("Building something that handles money? Let's get the foundation right."),
};