"use client";

import { API_URL } from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

const TOKEN_KEY = "devora_admin_token";
const STATUSES = ["new", "reviewed", "rejected", "hired"];
const STATUS_LABEL = { new: "New", reviewed: "Reviewed", rejected: "Rejected", hired: "Hired" };
const STATUS_STYLE = {
  new: "bg-teal/10 text-teal",
  reviewed: "bg-blue-50 text-blue-700",
  rejected: "bg-red-50 text-red-600",
  hired: "bg-emerald-50 text-emerald-700",
};

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
}

function formatDate(value) {
  try {
    return new Date(value).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return "";
  }
}

function Detail({ label, children }) {
  if (!children) return null;
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-wide text-slate">{label}</p>
      <p className="mt-0.5 whitespace-pre-wrap break-words text-sm text-ink">{children}</p>
    </div>
  );
}

const PAGE_SIZES = [10, 25, 50, 100];
const TABS = {
  messages: { list: "admin/contact-submissions", csv: "admin/export/contact-submissions.csv", file: "messages" },
  applications: { list: "admin/applications", csv: "admin/export/applications.csv", file: "applications" },
  subscribers: { list: "admin/subscribers", csv: "admin/export/subscribers.csv", file: "subscribers" },
};

// Query string shared by the list and the CSV export (the export has no page/limit: it returns every match)
function filterParams(tab, { q, filter }) {
  const p = new URLSearchParams();
  if (q) p.set("q", q);
  if (tab === "messages" && filter === "unread") p.set("unread", "1");
  if (tab === "applications" && filter !== "all") p.set("status", filter);
  return p;
}

// 1 … 4 5 [6] 7 8 … 20
function pageWindow(page, pages) {
  const keep = [...new Set([1, pages, page - 2, page - 1, page, page + 1, page + 2])]
    .filter((n) => n >= 1 && n <= pages)
    .sort((a, b) => a - b);
  const out = [];
  keep.forEach((n, i) => {
    if (i > 0 && n - keep[i - 1] > 1) out.push(`gap-${n}`);
    out.push(n);
  });
  return out;
}

const smallBtn =
  "rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-black/20";
const dangerBtn =
  "rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50";

export default function AdminInbox() {
  const router = useRouter();
  const { t } = useLanguage();

  const [tab, setTab] = useState("messages"); // "messages" | "applications" | "subscribers"
  const [search, setSearch] = useState(""); // what is typed in the box
  const [q, setQ] = useState(""); // what is sent to the server (the typed text, 300 ms after typing stops)
  const [filter, setFilter] = useState("all"); // messages: all|unread — applications: all|<status>
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const [refreshKey, setRefreshKey] = useState(0); // bumped to reload the current page

  const [result, setResult] = useState({ key: null, tab: null, data: null });
  const [counts, setCounts] = useState(null);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState(null);
  const [exporting, setExporting] = useState(false);

  const logoutToLogin = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    router.push("/admin/login");
  }, [router]);

  // One helper for every authenticated call. Returns parsed JSON, or null if we were sent to login.
  const api = useCallback(
    async (path, options = {}) => {
      const res = await fetch(`${API_URL}/api/${path}`, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (res.status === 401) {
        logoutToLogin();
        return null;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `${t("Backend responded with")} ${res.status}`);
      return data;
    },
    [logoutToLogin, t]
  );

  const loadCounts = useCallback(async () => {
    try {
      const c = await api("admin/inbox-counts");
      if (c) setCounts(c);
    } catch (err) {
      setError(err.message);
    }
  }, [api]);

  // Redirect signed-out visitors, then load the badge counts once
  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
      return;
    }
    loadCounts();
    // run once on mount; "Refresh" reloads on demand
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Typing in the search box: wait until the typing pauses, then search from page 1
  useEffect(() => {
    const id = setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(id);
  }, [search]);

  // Load the current page whenever the tab, search, filter, page or page size changes
  const requestKey = `${tab}|${q}|${filter}|${page}|${limit}|${refreshKey}`;
  useEffect(() => {
    if (!getToken()) return;
    let cancelled = false; // an older, slower request must never overwrite a newer one
    const params = filterParams(tab, { q, filter });
    params.set("page", String(page));
    params.set("limit", String(limit));
    api(`${TABS[tab].list}?${params}`)
      .then((data) => {
        if (cancelled || !data) return;
        setError("");
        setResult({ key: requestKey, tab, data });
        // the server clamps a page past the end (e.g. after deleting the last row on the last page)
        if (data.page !== page) setPage(data.page);
      })
      .catch((err) => {
        if (cancelled) return;
        setResult({ key: requestKey, tab, data: null });
        setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [api, requestKey, tab, q, filter, page, limit]);

  async function run(action) {
    try {
      setError("");
      await action();
    } catch (err) {
      setError(err.message);
    }
  }

  const reload = () => {
    setRefreshKey((k) => k + 1);
    loadCounts();
  };

  // change one row of the page that is on screen without reloading it
  const patchRow = (id, patch) =>
    setResult((r) =>
      r.data ? { ...r, data: { ...r.data, items: r.data.items.map((x) => (x._id === id ? { ...x, ...patch } : x)) } } : r
    );

  const setRead = (msg, isRead) =>
    run(async () => {
      const updated = await api(`admin/contact-submissions/${msg._id}`, {
        method: "PUT",
        body: JSON.stringify({ isRead }),
      });
      if (updated) {
        patchRow(msg._id, { isRead });
        loadCounts();
      }
    });

  const removeMessage = (msg) =>
    run(async () => {
      if (!confirm(t("Delete this message permanently? This can't be undone."))) return;
      const done = await api(`admin/contact-submissions/${msg._id}`, { method: "DELETE" });
      if (done) reload();
    });

  const setStatus = (app, status) =>
    run(async () => {
      const updated = await api(`admin/applications/${app._id}`, {
        method: "PUT",
        body: JSON.stringify({ status }),
      });
      if (updated) {
        patchRow(app._id, { status });
        loadCounts();
      }
    });

  const removeApplication = (app) =>
    run(async () => {
      if (!confirm(t("Delete this application permanently? This can't be undone."))) return;
      const done = await api(`admin/applications/${app._id}`, { method: "DELETE" });
      if (done) reload();
    });

  const removeSubscriber = (sub) =>
    run(async () => {
      if (!confirm(t("Delete this subscriber permanently? This can't be undone."))) return;
      const done = await api(`admin/subscribers/${sub._id}`, { method: "DELETE" });
      if (done) reload();
    });

  // Files are protected by the admin token, so they can't be plain links: fetch with the token, then save the blob.
  async function saveBlob(res, fileName) {
    const url = URL.createObjectURL(await res.blob());
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  async function fetchFile(path) {
    const res = await fetch(`${API_URL}/api/${path}`, { headers: { Authorization: `Bearer ${getToken()}` } });
    if (res.status === 401) {
      logoutToLogin();
      return null;
    }
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || `${t("Backend responded with")} ${res.status}`);
    }
    return res;
  }

  const downloadResume = (app) =>
    run(async () => {
      const res = await fetchFile(`admin/applications/${app._id}/resume`);
      if (res) await saveBlob(res, app.resumeFileName || "resume");
    });

  // Exports EVERYTHING that matches the current search and filter, not just the page on screen
  const exportCsv = () =>
    run(async () => {
      setExporting(true);
      try {
        const params = filterParams(tab, { q, filter }).toString();
        const res = await fetchFile(`${TABS[tab].csv}${params ? `?${params}` : ""}`);
        if (res) await saveBlob(res, `devora-${TABS[tab].file}-${new Date().toISOString().slice(0, 10)}.csv`);
      } finally {
        setExporting(false);
      }
    });

  function openRow(id, msg) {
    setOpenId((cur) => (cur === id ? null : id));
    // opening an unread message marks it as read
    if (msg && !msg.isRead) setRead(msg, true);
  }

  function switchTab(next) {
    if (next === tab) return;
    setTab(next);
    setFilter("all");
    setSearch("");
    setQ("");
    setPage(1);
    setOpenId(null);
  }

  function changeFilter(next) {
    setFilter(next);
    setPage(1);
    setOpenId(null);
  }

  function goToPage(next) {
    setPage(next);
    setOpenId(null);
  }

  const filterOptions =
    tab === "messages"
      ? [
          { id: "all", label: t("All") },
          { id: "unread", label: t("Unread") },
        ]
      : tab === "applications"
        ? [{ id: "all", label: t("All") }, ...STATUSES.map((s) => ({ id: s, label: t(STATUS_LABEL[s]) }))]
        : [];

  const loading = result.key !== requestKey;
  const data = result.tab === tab ? result.data : null; // never draw another tab's rows with this tab's layout
  const rows = data ? data.items : [];
  const searching = Boolean(q);

  const emptyText = searching
    ? t("No results match your search.")
    : tab === "messages"
      ? t("No messages to show.")
      : tab === "applications"
        ? t("No applications to show.")
        : t("No subscribers to show.");

  const tabItems = [
    { id: "messages", label: t("Messages"), count: counts ? counts.unreadMessages : 0 },
    { id: "applications", label: t("Applications"), count: counts ? counts.newApplications : 0 },
    { id: "subscribers", label: t("Subscribers"), count: 0 },
  ];

  const searchPlaceholder =
    tab === "messages"
      ? t("Search messages…")
      : tab === "applications"
        ? t("Search applications…")
        : t("Search subscribers…");

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">{t("Inbox")}</h1>
          <p className="mt-1 text-sm text-slate">
            {t("Contact messages, job applications and signups submitted on the website.")}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => router.push("/admin/jobs")} className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-black/20">
            {t("Manage Job Postings")}
          </button>
          <button onClick={reload} className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-black/20">
            {t("Refresh")}
          </button>
          <button onClick={logoutToLogin} className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-black/20">
            {t("Log out")}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{t(error)}</p>
      )}

      {/* Tabs */}
      <div className="mt-8 flex gap-8 border-b border-black/10">
        {tabItems.map((item) => (
          <button
            key={item.id}
            onClick={() => switchTab(item.id)}
            className={`relative flex items-center gap-2 pb-3 text-sm font-medium transition-colors ${
              tab === item.id ? "text-ink" : "text-slate hover:text-ink"
            }`}
          >
            {item.label}
            {item.count > 0 && (
              <span className="rounded-full bg-teal px-2 py-0.5 text-[11px] font-semibold text-navy">{item.count}</span>
            )}
            {tab === item.id && <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-teal" />}
          </button>
        ))}
      </div>

      {/* Search + export */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={searchPlaceholder}
            aria-label={searchPlaceholder}
            maxLength={100}
            className="w-full rounded-md border border-black/10 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors placeholder:text-slate/70 focus:border-teal"
          />
        </div>
        {searching && (
          <button
            onClick={() => {
              setSearch("");
              setQ("");
              setPage(1);
            }}
            className={smallBtn}
          >
            {t("Clear search")}
          </button>
        )}
        <button
          onClick={exportCsv}
          disabled={exporting}
          title={t("Exports everything that matches the current search and filter")}
          className="rounded-md border border-black/10 px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-black/20 disabled:opacity-60"
        >
          {exporting ? t("Exporting…") : t("Export CSV")}
        </button>
      </div>

      {/* Filters */}
      {filterOptions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => changeFilter(opt.id)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                filter === opt.id ? "border-navy bg-navy text-white" : "border-black/10 text-slate hover:border-black/20"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}

      {/* List */}
      <div
        className={`mt-4 divide-y divide-black/10 border-t border-black/10 transition-opacity ${loading && data ? "opacity-60" : ""}`}
        aria-busy={loading}
      >
        {loading && !data && <p className="py-8 text-sm text-slate">{t("Loading…")}</p>}
        {!loading && rows.length === 0 && <p className="py-8 text-sm text-slate">{emptyText}</p>}

        {/* Messages */}
        {tab === "messages" &&
          rows.map((m) => {
            const isOpen = openId === m._id;
            const name = `${m.firstName} ${m.lastName || ""}`.trim();
            return (
              <div key={m._id} className="py-3">
                <button onClick={() => openRow(m._id, m)} className="flex w-full items-start justify-between gap-4 text-left">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      {!m.isRead && <span className="h-2 w-2 shrink-0 rounded-full bg-teal" aria-label={t("Unread")} />}
                      <h3 className={`truncate text-sm text-ink ${m.isRead ? "font-medium" : "font-semibold"}`}>
                        {name} · {m.company}
                      </h3>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate">
                      {m.lookingFor} — {m.message || m.email}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate">{formatDate(m.createdAt)}</span>
                </button>

                {isOpen && (
                  <div className="mt-3 rounded-lg border border-black/10 bg-white p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label={t("Name")}>{name}</Detail>
                      <Detail label={t("Company")}>{m.company}</Detail>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate">{t("Email")}</p>
                        <a href={`mailto:${m.email}`} className="mt-0.5 block break-all text-sm text-teal hover:opacity-80">
                          {m.email}
                        </a>
                      </div>
                      <Detail label={t("Phone")}>{m.phone}</Detail>
                      <Detail label={t("Looking for")}>{m.lookingFor}</Detail>
                      <Detail label={t("Received")}>{formatDate(m.createdAt)}</Detail>
                    </div>
                    {m.message && (
                      <div className="mt-4">
                        <Detail label={t("Message")}>{m.message}</Detail>
                      </div>
                    )}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${m.email}?subject=${encodeURIComponent("Re: Devora enquiry")}`}
                        className="rounded-md bg-teal px-3 py-1.5 text-xs font-medium text-navy transition-opacity hover:opacity-90"
                      >
                        {t("Reply by email")}
                      </a>
                      <button onClick={() => setRead(m, !m.isRead)} className={smallBtn}>
                        {m.isRead ? t("Mark as unread") : t("Mark as read")}
                      </button>
                      <button onClick={() => removeMessage(m)} className={dangerBtn}>
                        {t("Delete")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* Applications */}
        {tab === "applications" &&
          rows.map((a) => {
            const isOpen = openId === a._id;
            const name = `${a.firstName} ${a.lastName}`.trim();
            const status = a.status || "new";
            return (
              <div key={a._id} className="py-3">
                <button onClick={() => openRow(a._id)} className="flex w-full items-start justify-between gap-4 text-left">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-ink">{name}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status] || STATUS_STYLE.new}`}>
                        {t(STATUS_LABEL[status] || "New")}
                      </span>
                    </div>
                    <p className="mt-1 truncate text-xs text-slate">
                      {a.jobTitle} · {a.email}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-slate">{formatDate(a.createdAt)}</span>
                </button>

                {isOpen && (
                  <div className="mt-3 rounded-lg border border-black/10 bg-white p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Detail label={t("Applied for")}>{a.jobTitle}</Detail>
                      <Detail label={t("Received")}>{formatDate(a.createdAt)}</Detail>
                      <Detail label={t("Name")}>{name}</Detail>
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-slate">{t("Email")}</p>
                        <a href={`mailto:${a.email}`} className="mt-0.5 block break-all text-sm text-teal hover:opacity-80">
                          {a.email}
                        </a>
                      </div>
                      <Detail label={t("Phone")}>{a.phone}</Detail>
                      <Detail label={t("Address")}>{a.address}</Detail>
                      <Detail label={t("Resume")}>{a.hasResume ? "" : a.resumeFileName || t("Not provided")}</Detail>
                      {a.hasResume ? (
                        <div>
                          <p className="text-[11px] font-medium uppercase tracking-wide text-slate">{t("Resume")}</p>
                          <button type="button" onClick={() => downloadResume(a)} className="mt-0.5 text-sm text-teal underline underline-offset-2 hover:opacity-80">
                            {t("Download")} {a.resumeFileName}
                          </button>
                        </div>
                      ) : null}
                      <Detail label={t("Willing to work on-site")}>{a.willingToWorkOnsite ? t(a.willingToWorkOnsite) : ""}</Detail>
                    </div>
                    <div className="mt-4 space-y-4">
                      {a.education ? <Detail label={t("Education")}>{a.education}</Detail> : null}
                      {a.workHistory ? <Detail label={t("Work history")}>{a.workHistory}</Detail> : null}
                      <Detail label={t("Years of relevant experience")}>{a.experience}</Detail>
                      <Detail label={t("Relevant project")}>{a.projectDescription}</Detail>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-2">
                      <label className="text-xs font-medium text-slate" htmlFor={`status-${a._id}`}>
                        {t("Status")}
                      </label>
                      <select
                        id={`status-${a._id}`}
                        value={status}
                        onChange={(e) => setStatus(a, e.target.value)}
                        className="rounded-md border border-black/10 bg-white px-2.5 py-1.5 text-xs font-medium text-ink outline-none focus:border-teal"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {t(STATUS_LABEL[s])}
                          </option>
                        ))}
                      </select>
                      <a
                        href={`mailto:${a.email}?subject=${encodeURIComponent(`Your application: ${a.jobTitle}`)}`}
                        className="rounded-md bg-teal px-3 py-1.5 text-xs font-medium text-navy transition-opacity hover:opacity-90"
                      >
                        {t("Reply by email")}
                      </a>
                      <button onClick={() => removeApplication(a)} className={dangerBtn}>
                        {t("Delete")}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

        {/* Subscribers */}
        {tab === "subscribers" &&
          rows.map((s) => (
            <div key={s._id} className="flex items-start justify-between gap-4 py-3">
              <div className="min-w-0">
                <a href={`mailto:${s.email}`} className="block truncate text-sm font-medium text-ink hover:text-teal">
                  {s.email}
                </a>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {(s.sources || []).map((src) => (
                    <span key={src} className="rounded-full bg-black/5 px-2 py-0.5 text-[11px] text-slate">
                      {src}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-slate">{formatDate(s.createdAt)}</span>
                <button onClick={() => removeSubscriber(s)} className={dangerBtn}>
                  {t("Delete")}
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {data && data.total > 0 && (
        <nav aria-label={t("Pagination")} className="mt-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-slate">
            {(data.page - 1) * data.limit + 1}–{Math.min(data.page * data.limit, data.total)} {t("of")} {data.total}
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => goToPage(data.page - 1)}
              disabled={data.page <= 1}
              className={`${smallBtn} disabled:opacity-40`}
            >
              {t("Previous")}
            </button>
            {pageWindow(data.page, data.pages).map((n) =>
              typeof n === "string" ? (
                <span key={n} className="px-1 text-xs text-slate" aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  key={n}
                  onClick={() => goToPage(n)}
                  aria-current={n === data.page ? "page" : undefined}
                  className={`min-w-8 rounded-md border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                    n === data.page ? "border-navy bg-navy text-white" : "border-black/10 text-ink hover:border-black/20"
                  }`}
                >
                  {n}
                </button>
              )
            )}
            <button
              onClick={() => goToPage(data.page + 1)}
              disabled={data.page >= data.pages}
              className={`${smallBtn} disabled:opacity-40`}
            >
              {t("Next")}
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-slate">
            {t("Rows per page")}
            <select
              value={limit}
              onChange={(e) => {
                setLimit(Number(e.target.value));
                setPage(1);
                setOpenId(null);
              }}
              className="rounded-md border border-black/10 bg-white px-2 py-1.5 text-xs font-medium text-ink outline-none focus:border-teal"
            >
              {PAGE_SIZES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </label>
        </nav>
      )}
    </div>
  );
}
