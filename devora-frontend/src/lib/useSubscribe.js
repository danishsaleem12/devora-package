//src/lib/useSubscribe.js

import { useState } from "react";
import { API_URL } from "./api";

/** POST JSON to the backend. Resolves with the parsed body; throws an Error with a user-friendly message. */
export async function postJson(path, body) {
  let res;
  try {
    res = await fetch(`${API_URL}/api/${path.replace(/^\/+/, "")}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Could not reach the server. Please try again.");
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
  return data;
}

/**
 * State + submit handler for a newsletter box.
 *   const { email, setEmail, submitted, sending, error, handleSubmit } = useSubscribe("newsletter-blog");
 * `source` is saved with the email so you can tell which form it came from.
 */
export function useSubscribe(source) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || sending) return;
    setSending(true);
    setError("");
    try {
      await postJson("subscribe", { email, source });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return { email, setEmail, submitted, sending, error, handleSubmit };
}
