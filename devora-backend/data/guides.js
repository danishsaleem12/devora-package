// Downloadable research guides. The files live in ../private/guides (NOT in the frontend's public
// folder) and are only handed out through GET /api/guides/download with a short-lived token that
// POST /api/guides/:id/unlock issues after an email address is submitted.
// id (as used in /api/research-guides) -> file name inside private/guides
const GUIDE_FILES = {
  "design-system-playbook": "design-system-playbook.pdf",
  "async-handbook": "async-first-handbook.pdf",
};

module.exports = { GUIDE_FILES };
