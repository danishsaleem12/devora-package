# Languages (i18n)

Every language is one file in `translations/<code>.json`: a flat map of
`"English text exactly as the route returns it": "translated text"`.

- `GET /api/<anything>?lang=fr` returns the same JSON with every string that has an entry swapped.
  Strings without an entry stay English, so a missing translation never breaks a page.
- `GET /api/i18n/<code>` returns the whole catalog (the frontend uses it for fixed UI text and for
  the data files in `devora-frontend/src/data`).
- Ids, slugs, links, image URLs, `code` and `layout` fields are never translated (`SKIP_KEYS`).
- `PRESERVE` (in `index.js`) lists strings the frontend compares literally (e.g. the "All" filter).

## Add text
Add `"English": "Translation"` to `fr.json` and `es.json`. Run `npm run i18n:check` to list every string
that is still missing (add `-- --frontend ../devora-frontend/src` to include the frontend data files).

## Add a language
1. Create `translations/<code>.json`.
2. Add `{ label: "Deutsch", code: "DE" }` to `languages` in `GET /api/navbar` (routes/content.routes.js).
3. Add the code to `SUPPORTED_LANGS` in `devora-frontend/src/lib/i18n.js`.
