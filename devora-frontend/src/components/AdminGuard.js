"use client";

import { API_URL } from "@/lib/api";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const TOKEN_KEY = "devora_admin_token";
const LOGIN_PATH = "/admin/login";
const HOME_PATH = "/admin/jobs";

/**
 * Wraps EVERY page under /admin (see app/admin/layout.js).
 *
 *  - No token, or the backend says the token is invalid/expired -> redirected to /admin/login.
 *    The protected page is never rendered, not even for a moment.
 *  - Already signed in and opening /admin/login                  -> redirected to the admin area.
 *  - Backend unreachable                                         -> an error with a retry button
 *                                                                    (the visitor is NOT logged out).
 *
 * The real security lives on the backend (every admin API route requires the JWT). This guard is what
 * keeps the admin screens from showing to people who are not signed in.
 */
export default function AdminGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLanguage();
  const isLoginPage = pathname === LOGIN_PATH;

  const [status, setStatus] = useState("checking"); // checking | authed | anon | error
  const [attempt, setAttempt] = useState(0); // bumped by "Try again"

  useEffect(() => {
    let cancelled = false;
    const token = localStorage.getItem(TOKEN_KEY);

    const finish = (next) => {
      if (cancelled) return;
      setStatus(next);
      if (next === "anon" && !isLoginPage) router.replace(LOGIN_PATH);
      if (next === "authed" && isLoginPage) router.replace(HOME_PATH);
    };

    if (!token) {
      Promise.resolve().then(() => finish("anon"));
      return () => {
        cancelled = true;
      };
    }

    fetch(`${API_URL}/api/auth/me`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (res.ok) return finish("authed");
        if (res.status === 401) localStorage.removeItem(TOKEN_KEY); // expired or invalid
        finish(res.status === 401 ? "anon" : "error");
      })
      .catch(() => finish("error"));

    return () => {
      cancelled = true;
    };
    // re-check after every navigation inside /admin (e.g. right after logging in)
  }, [pathname, attempt, isLoginPage, router]);

  // Only show the page when the status matches what this page needs; otherwise keep the splash.
  const canShow = (status === "authed" && !isLoginPage) || (status === "anon" && isLoginPage);

  if (status === "error") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="max-w-sm text-sm text-slate">
          {t("Could not reach the server to verify your login.")}
        </p>
        <button
          onClick={() => {
            setStatus("checking");
            setAttempt((n) => n + 1);
          }}
          className="rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
        >
          {t("Try again")}
        </button>
      </div>
    );
  }

  if (!canShow) {
    return (
      <div role="status" aria-live="polite" className="flex min-h-screen items-center justify-center bg-paper">
        <span className="text-sm text-slate">{t("Checking your login…")}</span>
      </div>
    );
  }

  return children;
}
