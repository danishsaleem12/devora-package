//src/lib/i18n.js

/**
 * Language helpers shared by the whole frontend.
 *
 * To add a language:
 *   1. add its code to SUPPORTED_LANGS below
 *   2. add it to the `languages` list in the backend GET /api/navbar route
 *   3. add devora-backend/i18n/translations/<code>.json (see the backend README note)
 */
export const DEFAULT_LANG = "en";
export const SUPPORTED_LANGS = ["en", "fr", "es"];
export const LANG_STORAGE_KEY = "devora-lang";

export function normalizeLang(code) {
  const c = String(code || "").toLowerCase().slice(0, 2);
  return SUPPORTED_LANGS.includes(c) ? c : DEFAULT_LANG;
}

export function readStoredLang() {
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    return stored ? normalizeLang(stored) : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
}

export function storeLang(lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* private mode / blocked storage: the choice just won't persist */
  }
  try {
    document.cookie = `${LANG_STORAGE_KEY}=${lang}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

/*
 * The "current" language lives in a module-level variable so plain functions
 * (like apiFetch) can read it without being React components. It is set from
 * localStorage as soon as this module loads in the browser, which happens
 * before any component effect runs, so the very first API calls already use
 * the visitor's saved language.
 */
let currentLang = typeof window !== "undefined" ? readStoredLang() : DEFAULT_LANG;
const listeners = new Set();

export function getLang() {
  return currentLang;
}

export function setCurrentLang(lang) {
  const next = normalizeLang(lang);
  if (next === currentLang) return;
  currentLang = next;
  listeners.forEach((listener) => listener());
}

/** Lets React subscribe to language changes (used with useSyncExternalStore). */
export function subscribeLang(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
