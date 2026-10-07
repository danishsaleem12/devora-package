"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const CATEGORIES = ["Engineering", "AI & Data", "Design", "Cloud & DevOps"];
const WORKPLACE_TYPES = ["On-site", "Hybrid", "Remote"];
const JOB_TYPES = ["Full-time", "Contract"];

const EMPTY_FORM = {
  slug: "",
  title: "",
  department: "",
  workplaceType: "On-site",
  type: "Full-time",
  location: "",
  postedAgo: "",
  category: "Engineering",
  description: "",
  responsibilities: "",
  requirements: "",
  isOpen: true,
};

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("devora_admin_token") : null;
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export default function AdminJobs() {
  const router = useRouter();
  const [jobs, setJobs] = useState(null);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  async function loadJobs() {
    try {
      const res = await fetch(`${API_URL}/api/admin/jobs`, {
        headers: authHeaders(),
      });
      if (res.status === 401) {
        localStorage.removeItem("devora_admin_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
      const data = await res.json();
      setJobs(data);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (!getToken()) {
      router.push("/admin/login");
      return;
    }
    loadJobs();
  }, []);

  function handleLogout() {
    localStorage.removeItem("devora_admin_token");
    router.push("/admin/login");
  }

  function openCreateForm() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setShowForm(true);
  }

  function openEditForm(job) {
    setForm({
      slug: job.slug || "",
      title: job.title || "",
      department: job.department || "",
      workplaceType: job.workplaceType || "On-site",
      type: job.type || "Full-time",
      location: job.location || "",
      postedAgo: job.postedAgo || "",
      category: job.category || "Engineering",
      description: job.description || "",
      responsibilities: (job.responsibilities || []).join("\n"),
      requirements: (job.requirements || []).join("\n"),
      isOpen: job.isOpen,
    });
    setEditingId(job._id);
    setShowForm(true);
  }

  function handleTitleChange(value) {
    setForm((f) => ({
      ...f,
      title: value,
      // Auto-fill slug from title only when creating a new job
      slug: editingId ? f.slug : slugify(value),
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      ...form,
      responsibilities: form.responsibilities
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      requirements: form.requirements
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      const res = await fetch(
        editingId ? `${API_URL}/api/jobs/${editingId}` : `${API_URL}/api/jobs`,
        {
          method: editingId ? "PUT" : "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        }
      );
      if (res.status === 401) {
        localStorage.removeItem("devora_admin_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Backend responded with ${res.status}`);
      }
      setShowForm(false);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleOpen(job) {
    try {
      const res = await fetch(`${API_URL}/api/jobs/${job._id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ isOpen: !job.isOpen }),
      });
      if (res.status === 401) {
        localStorage.removeItem("devora_admin_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteJob(job) {
    if (!confirm(`Permanently delete "${job.title}"? This can't be undone.`)) return;
    try {
      const res = await fetch(`${API_URL}/api/jobs/${job._id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (res.status === 401) {
        localStorage.removeItem("devora_admin_token");
        router.push("/admin/login");
        return;
      }
      if (!res.ok) throw new Error(`Backend responded with ${res.status}`);
      await loadJobs();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-ink">Manage Job Postings</h1>
          <p className="mt-1 text-sm text-slate">Internal admin — not linked from the public site.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={openCreateForm}
            className="rounded-md bg-teal px-4 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90"
          >
            + New Job
          </button>
          <button
            onClick={handleLogout}
            className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-black/20"
          >
            Log out
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      {/* Job list */}
      <div className="mt-8 divide-y divide-black/10 border-t border-black/10">
        {jobs === null && <p className="py-8 text-sm text-slate">Loading jobs…</p>}
        {jobs && jobs.length === 0 && (
          <p className="py-8 text-sm text-slate">No jobs yet — click "New Job" to add one.</p>
        )}
        {jobs?.map((job) => (
          <div key={job._id} className="flex flex-wrap items-center justify-between gap-3 py-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-ink">{job.title}</h3>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                    job.isOpen ? "bg-teal/10 text-teal" : "bg-black/5 text-slate"
                  }`}
                >
                  {job.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate">
                {job.department} · {job.workplaceType} · {job.location} · /{job.slug}
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => openEditForm(job)}
                className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-black/20"
              >
                Edit
              </button>
              <button
                onClick={() => toggleOpen(job)}
                className="rounded-md border border-black/10 px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:border-black/20"
              >
                {job.isOpen ? "Close" : "Reopen"}
              </button>
              <button
                onClick={() => deleteJob(job)}
                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 transition-colors hover:bg-red-50"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit form */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-lg font-semibold text-ink">
                {editingId ? "Edit Job" : "New Job"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-slate hover:text-ink">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Title *</label>
                  <input
                    type="text"
                    required
                    value={form.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Slug * <span className="text-xs text-slate">(used in the URL)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: slugify(e.target.value) }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Department *</label>
                  <input
                    type="text"
                    required
                    value={form.department}
                    onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Location *</label>
                  <input
                    type="text"
                    required
                    value={form.location}
                    onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Workplace type *</label>
                  <select
                    value={form.workplaceType}
                    onChange={(e) => setForm((f) => ({ ...f, workplaceType: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  >
                    {WORKPLACE_TYPES.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Job type *</label>
                  <select
                    value={form.type}
                    onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  >
                    {JOB_TYPES.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  >
                    {CATEGORIES.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-ink">
                    Posted label <span className="text-xs text-slate">(e.g. "Posted 2 days ago")</span>
                  </label>
                  <input
                    type="text"
                    value={form.postedAgo}
                    onChange={(e) => setForm((f) => ({ ...f, postedAgo: e.target.value }))}
                    className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">Description *</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Responsibilities <span className="text-xs text-slate">(one per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.responsibilities}
                  onChange={(e) => setForm((f) => ({ ...f, responsibilities: e.target.value }))}
                  className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-ink">
                  Requirements <span className="text-xs text-slate">(one per line)</span>
                </label>
                <textarea
                  rows={4}
                  value={form.requirements}
                  onChange={(e) => setForm((f) => ({ ...f, requirements: e.target.value }))}
                  className="w-full rounded-md border border-black/10 px-3.5 py-2.5 text-sm outline-none focus:border-teal"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-ink">
                <input
                  type="checkbox"
                  checked={form.isOpen}
                  onChange={(e) => setForm((f) => ({ ...f, isOpen: e.target.checked }))}
                />
                Job is open (visible on the public site)
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="rounded-md border border-black/10 px-4 py-2.5 text-sm font-medium text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-md bg-teal px-5 py-2.5 text-sm font-medium text-navy transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? "Saving…" : editingId ? "Save changes" : "Create job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}