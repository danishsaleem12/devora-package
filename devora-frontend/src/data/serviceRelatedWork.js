// Which case studies each service page shows in its related-work section.
// Ids match GET /api/case-studies (backend). Pick 2-3 per service; missing ids are skipped.
export const serviceRelatedWork = {
  "web-development": ["fieldnote-rebrand", "checkout-flow", "roost-onboarding"],
  "full-stack-development": ["roost-onboarding", "ledger-reconciliation", "checkout-flow"],
  "ai-llm-solutions": ["ledger-reconciliation", "roost-onboarding"],
  "saas-product-development": ["roost-onboarding", "checkout-flow", "fieldnote-rebrand"],
  "e-commerce-development": ["checkout-flow", "roost-onboarding", "fieldnote-rebrand"],
  "ui-ux-design-systems": ["fieldnote-rebrand", "roost-onboarding", "checkout-flow"],
  "cloud-devops": ["ledger-reconciliation", "checkout-flow"],
  "api-integrations": ["ledger-reconciliation", "checkout-flow"],
};

export function getRelatedWorkIds(slug) {
  return serviceRelatedWork[slug] ?? [];
}
