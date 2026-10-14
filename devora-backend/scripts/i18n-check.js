// scripts/i18n-check.js
//
// Lists every English string the API returns (and, with --frontend, the text stored in the
// frontend's src/data files) that has NO translation yet in each language catalog.
//
//   npm run i18n:check
//   npm run i18n:check -- --frontend ../devora-frontend/src
//
// Proper nouns, tool names and numbers can safely stay untranslated; they just show up here.

const fs = require("fs");
const path = require("path");
const http = require("http");
const express = require("express");
const { getCatalog, supportedLanguages, SKIP_KEYS, DEFAULT_LANG } = require("../i18n");

const router = require("../routes/content.routes");

function looksTranslatable(value, key) {
  if (SKIP_KEYS.has(key)) return false;
  if (/^(https?:|\/|#|mailto:)/.test(value)) return false;
  return /[A-Za-z]{3,}/.test(value);
}

function collect(value, key, into) {
  if (typeof value === "string") {
    if (looksTranslatable(value, key)) into.add(value);
  } else if (Array.isArray(value)) {
    value.forEach((v) => collect(v, key, into));
  } else if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) collect(v, k, into);
  }
}

function getJson(port, route) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}/api${route}`, (res) => {
        let body = "";
        res.on("data", (d) => (body += d));
        res.on("end", () => resolve(JSON.parse(body)));
      })
      .on("error", reject);
  });
}

function scanFrontendData(dir) {
  const found = new Set();
  const dataDir = path.join(dir, "data");
  for (const file of fs.readdirSync(dataDir).filter((f) => f.endsWith(".js"))) {
    const src = fs.readFileSync(path.join(dataDir, file), "utf8");
    for (const m of src.matchAll(/"((?:[^"\\]|\\.){4,})"/g)) {
      const text = m[1].replace(/\\n/g, "\n");
      if (/[A-Za-z]{3,}/.test(text) && !/^(\/|https?:)/.test(text) && !/^[a-z0-9-]+$/.test(text)) found.add(text);
    }
  }
  return found;
}

async function main() {
  const app = express();
  app.use("/api", router);
  const server = app.listen(0);
  const port = server.address().port;

  const strings = new Set();
  const routes = router.stack.filter((l) => l.route && !l.route.path.includes(":")).map((l) => l.route.path);
  for (const route of routes) collect(await getJson(port, route), null, strings);
  server.close();

  const fIdx = process.argv.indexOf("--frontend");
  if (fIdx !== -1) scanFrontendData(path.resolve(process.argv[fIdx + 1])).forEach((s) => strings.add(s));

  for (const lang of supportedLanguages.filter((l) => l !== DEFAULT_LANG)) {
    const catalog = getCatalog(lang) || {};
    const missing = [...strings].filter((s) => !(s in catalog));
    console.log(`\n=== ${lang}: ${strings.size - missing.length}/${strings.size} strings translated, ${missing.length} missing ===`);
    missing.forEach((s) => console.log("  " + JSON.stringify(s)));
  }
}

main();
