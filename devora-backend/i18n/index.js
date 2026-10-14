//i18n/index.js
//
// Translation layer for the public content API.
//
// Every language has one catalog file in ./translations/<code>.json: a flat map of
//   "English text as it appears in the route" -> "translated text"
// Routes keep returning English; when a request carries ?lang=fr (or es...) the middleware
// below swaps every string that has an entry in the catalog. A string without an entry
// simply stays English, so a missing translation can never break a page.

const fs = require("fs");
const path = require("path");

const DEFAULT_LANG = "en";
const DIR = path.join(__dirname, "translations");

// Fields that hold ids, links, media or codes: never translated, even if a catalog key matches.
const SKIP_KEYS = new Set([
  "id", "slug", "href", "url", "imageUrl", "image", "icon", "icons", "layout", "code", "logo",
  "email", "phone", "audioUrl", "videoUrl", "_id",
]);

// Strings the API must never translate, because the frontend compares against them literally
// (e.g. the "All" category filter). They stay in the catalog so t("All") can still translate the label.
const PRESERVE = new Set(["All"]);

// Each language is the main file translations/<code>.json PLUS every extra file inside
// translations/<code>/*.json (loaded alphabetically). The extra files let us add translations in
// small pieces (admin.json, products.json...) instead of editing one huge file.
// If the same English text appears twice, the later file wins.
const catalogs = {};
for (const file of fs.readdirSync(DIR)) {
  if (file.endsWith(".json")) {
    const code = file.replace(/\.json$/, "");
    catalogs[code] = JSON.parse(fs.readFileSync(path.join(DIR, file), "utf8"));
  }
}
for (const code of Object.keys(catalogs)) {
  const partsDir = path.join(DIR, code);
  if (!fs.existsSync(partsDir) || !fs.statSync(partsDir).isDirectory()) continue;
  for (const file of fs.readdirSync(partsDir).filter((f) => f.endsWith(".json")).sort()) {
    Object.assign(catalogs[code], JSON.parse(fs.readFileSync(path.join(partsDir, file), "utf8")));
  }
}

const supportedLanguages = [DEFAULT_LANG, ...Object.keys(catalogs)];

function normalizeLang(value) {
  const code = String(Array.isArray(value) ? value[0] : value || "")
    .toLowerCase()
    .slice(0, 2);
  return supportedLanguages.includes(code) ? code : DEFAULT_LANG;
}

function translate(value, catalog, key) {
  if (typeof value === "string") {
    if (SKIP_KEYS.has(key) || PRESERVE.has(value)) return value;
    return Object.prototype.hasOwnProperty.call(catalog, value) ? catalog[value] : value;
  }
  if (Array.isArray(value)) return value.map((v) => translate(v, catalog, key));
  if (value && typeof value === "object" && !(value instanceof Date)) {
    // Mongoose documents: use their plain-object form
    const plain = typeof value.toObject === "function" ? value.toObject() : value;
    const out = {};
    for (const [k, v] of Object.entries(plain)) out[k] = translate(v, catalog, k);
    return out;
  }
  return value;
}

/** Express middleware: translates res.json() bodies when ?lang=<code> is present. */
function i18nMiddleware(req, res, next) {
  const lang = normalizeLang(req.query.lang);
  req.lang = lang;
  res.setHeader("Content-Language", lang);
  res.vary("Accept-Language");
  if (lang === DEFAULT_LANG) return next();

  const catalog = catalogs[lang];
  const json = res.json.bind(res);
  res.json = (body) => json(translate(body, catalog));
  next();
}

function getCatalog(lang) {
  return catalogs[normalizeLang(lang)] || null;
}

module.exports = {
  i18nMiddleware,
  getCatalog,
  normalizeLang,
  supportedLanguages,
  DEFAULT_LANG,
  translate,
  SKIP_KEYS,
  PRESERVE,
};
