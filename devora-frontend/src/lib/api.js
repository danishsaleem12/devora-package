//src/lib/api.js

import { DEFAULT_LANG, getLang } from "./i18n";

/**
 * Single source of truth for talking to the Devora backend.
 *
 * Set NEXT_PUBLIC_API_URL in your hosting dashboard (e.g. Vercel) to the
 * deployed backend URL, WITHOUT a trailing slash:
 *   NEXT_PUBLIC_API_URL=https://devora-api.onrender.com
 *
 * In local development it falls back to http://localhost:5000.
 * In production there is NO silent localhost fallback: if the variable is
 * missing you get a clear console error instead of a mysteriously empty site.
 */
const RAW = process.env.NEXT_PUBLIC_API_URL;

export const API_URL = (
  RAW || (process.env.NODE_ENV === "production" ? "" : "http://localhost:5000")
).replace(/\/+$/, "");

if (!API_URL && typeof window !== "undefined") {
  console.error(
    "NEXT_PUBLIC_API_URL is not set. Add it to your hosting environment variables and redeploy."
  );
}

/**
 * Full URL for a backend route. Adds ?lang=xx for non-English visitors so the
 * backend can return the content in their language.
 */
export function apiUrl(path) {
  const base = `${API_URL}/api/${path.replace(/^\/+/, "")}`;
  const lang = getLang();
  if (lang === DEFAULT_LANG) return base;
  return `${base}${base.includes("?") ? "&" : "?"}lang=${lang}`;
}

/** fetch() for a backend route, in the visitor's current language. */
export function apiFetch(path, options) {
  return fetch(apiUrl(path), options);
}

/** GET {API_URL}/api/<path> and return parsed JSON (throws on non-2xx). */
export async function apiGet(path, options) {
  const res = await apiFetch(path, options);
  if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
  return res.json();
}
