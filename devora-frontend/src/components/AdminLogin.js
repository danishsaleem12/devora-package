"use client";

import { API_URL } from "@/lib/api";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";


export default function AdminLogin() {
  const router = useRouter();
  const { t } = useLanguage();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed"); // shown through t() below

      localStorage.setItem("devora_admin_token", data.token);
      router.push("/admin/jobs");
    } catch (err) {
      setError(err.message); // English text; translated when displayed
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm"
      >
        <h1 className="font-heading text-xl font-bold text-ink">{t("Admin Login")}</h1>
        <p className="mt-1 text-sm text-slate">{t("Sign in to manage job postings.")}</p>

        {error && (
          <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {t(error)}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">{t("Username")}</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink">{t("Password")}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-md bg-teal py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? t("Signing in…") : t("Sign in")}
        </button>
      </form>
    </div>
  );
}