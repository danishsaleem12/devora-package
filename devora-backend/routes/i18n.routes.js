const express = require("express");
const { getCatalog, DEFAULT_LANG, supportedLanguages } = require("../i18n");

const router = express.Router();

// GET /api/i18n/:lang  ->  { "English text": "translated text", ... }
// Used by the frontend for fixed UI text (footer, labels) and for data stored in the frontend repo.
router.get("/i18n/:lang", (req, res) => {
  const lang = String(req.params.lang || "").toLowerCase();
  if (lang === DEFAULT_LANG) return res.json({});
  if (!supportedLanguages.includes(lang)) return res.status(404).json({ error: "Unsupported language" });

  // catalogs only change on deploy, so browsers and CDNs may keep them for a while
  res.set("Cache-Control", "public, max-age=3600");
  // send the catalog untouched (it is already the translated side)
  res.type("application/json").send(JSON.stringify(getCatalog(lang)));
});

module.exports = router;
