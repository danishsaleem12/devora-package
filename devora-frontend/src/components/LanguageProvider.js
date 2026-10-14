//src/components/LanguageProvider.js

"use client";

import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { API_URL } from "@/lib/api";
import { DEFAULT_LANG, getLang, normalizeLang, setCurrentLang, storeLang, subscribeLang } from "@/lib/i18n";

/**
 * Language system for the whole site.
 *
 *  - `lang` / `setLang`  : the active language code ("en" | "fr" | "es") and the setter the
 *                          header dropdown calls. The choice is saved in localStorage + a cookie.
 *  - API content         : every component loads its content with apiFetch(), which adds ?lang=xx,
 *                          and the backend returns the already-translated JSON. When the language
 *                          changes the page content below is remounted so it re-fetches.
 *  - `t("text")`         : translates a fixed UI string (labels, buttons, footer text...).
 *  - `te("sentence", error)` : translates a "Could not load ..." message. The whole English sentence is the
 *                          catalog key and may contain {error} and {url}, which are filled in afterwards.
 *  - `useLocalized(obj)` : translates every string inside local data (src/data/*.js).
 *  - page title / description : pages export English `metadata`; <DocumentMeta> below translates the
 *                          <title> and <meta name="description"> in the browser through the same catalog.
 *
 * `t` / `useLocalized` read the same catalog the backend uses (GET /api/i18n/<lang>), so there is
 * a single place to add translations. Anything missing from the catalog simply stays English.
 */

// replaces {error} / {url} in a (translated) sentence
function fill(text, error) {
  const vars = { error, url: API_URL };
  return text.replace(/\{(error|url)\}/g, (_, key) => String(vars[key] ?? ""));
}

const LanguageContext = createContext({
  lang: DEFAULT_LANG,
  setLang: () => {},
  t: (text) => text,
  te: (sentence, error) => fill(sentence, error),
  tr: (value) => value,
});

// catalogs are downloaded once per language and kept for the rest of the session
const catalogCache = new Map();

async function loadCatalog(lang) {
  if (catalogCache.has(lang)) return catalogCache.get(lang);
  const res = await fetch(`${API_URL}/api/i18n/${lang}`);
  if (!res.ok) throw new Error(`Catalog request failed with ${res.status}`);
  const catalog = await res.json();
  catalogCache.set(lang, catalog);
  return catalog;
}

function translateDeep(value, catalog) {
  if (typeof value === "string") return catalog[value] ?? value;
  if (Array.isArray(value)) return value.map((v) => translateDeep(v, catalog));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      // never touch routing/media fields
      out[k] = /^(id|slug|href|url|imageUrl|image|icon|icons|layout|code)$/.test(k) ? v : translateDeep(v, catalog);
    }
    return out;
  }
  return value;
}

const TITLE_SEPARATOR = " | ";

/** "Products | Devora" -> "Produits | Devora" (each side is looked up in the catalog on its own). */
function translateTitle(title, t) {
  const i = title.lastIndexOf(TITLE_SEPARATOR);
  if (i === -1) return t(title);
  return `${t(title.slice(0, i))}${TITLE_SEPARATOR}${t(title.slice(i + TITLE_SEPARATOR.length))}`;
}

/**
 * Keeps <title> and <meta name="description"> in the visitor's language.
 * Next.js writes the English text from each page's `metadata`; we remember that English text and
 * show its translation, and a MutationObserver redoes it after every page navigation. Strings without
 * a catalog entry simply stay English. Renders nothing.
 */
function DocumentMeta({ t }) {
  const english = useRef({ title: null, description: null }); // last text written by Next.js
  const shown = useRef({ title: null, description: null }); // last text written by us

  useEffect(() => {
    const apply = () => {
      const meta = document.querySelector('meta[name="description"]');

      // anything that differs from what we wrote last was written by Next.js: treat it as the English original
      if (document.title !== shown.current.title) english.current.title = document.title;
      if (meta && meta.content !== shown.current.description) english.current.description = meta.content;

      if (english.current.title) {
        const title = translateTitle(english.current.title, t);
        shown.current.title = title;
        if (document.title !== title) document.title = title;
      }
      if (meta && english.current.description) {
        const description = t(english.current.description);
        shown.current.description = description;
        if (meta.content !== description) meta.content = description;
      }
    };

    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.head, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ["content"],
    });
    return () => observer.disconnect();
  }, [t]);

  return null;
}

export function LanguageProvider({ children }) {
  // "en" on the server keeps hydration clean; on the browser this is the saved language
  const lang = useSyncExternalStore(subscribeLang, getLang, () => DEFAULT_LANG);
  const [version, setVersion] = useState(0); // bumped only when the visitor picks a language
  const [loaded, setLoaded] = useState({}); // downloaded catalogs, by language

  // Keep <html lang="..."> accurate for screen readers and search engines
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Download the catalog for the active language (English needs none)
  useEffect(() => {
    if (lang === DEFAULT_LANG || loaded[lang]) return;
    let ignore = false;
    loadCatalog(lang)
      .then((c) => !ignore && setLoaded((prev) => ({ ...prev, [lang]: c })))
      .catch(() => {}); // no catalog: the UI text just stays English
    return () => {
      ignore = true;
    };
  }, [lang, loaded]);

  const catalog = lang === DEFAULT_LANG ? null : loaded[lang] ?? null;

  const setLang = useCallback((code) => {
    const next = normalizeLang(code);
    setCurrentLang(next);
    storeLang(next);
    setVersion((v) => v + 1); // remount page content so every section re-fetches in the new language
  }, []);

  const value = useMemo(() => {
    const t = (text) => (catalog && catalog[text]) || text;
    // visitors only see the friendly sentence; developers also get the technical detail while running locally
    const te = (sentence, error) =>
      fill(t(sentence), error) +
      (process.env.NODE_ENV !== "production" && error ? ` (${error}. Is the backend running on ${API_URL}?)` : "");
    const tr = (data) => (catalog ? translateDeep(data, catalog) : data);
    return { lang, setLang, t, te, tr };
  }, [lang, setLang, catalog]);

  return (
    <LanguageContext.Provider value={value}>
      {/* outside the keyed Fragment, so it is not remounted when the language changes */}
      <DocumentMeta t={value.t} />
      <Fragment key={version}>{children}</Fragment>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Translate a block of local data (e.g. an item from src/data/services.js). */
export function useLocalized(data) {
  const { tr } = useLanguage();
  return useMemo(() => tr(data), [tr, data]);
}
