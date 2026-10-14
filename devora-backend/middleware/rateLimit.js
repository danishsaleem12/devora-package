// Tiny in-memory rate limiter (no extra dependency). Fine for a single-instance demo;
// use `express-rate-limit` + a shared store if you ever run several instances.
function rateLimit({ windowMs, max, message = "Too many requests, please try again later." }) {
  const hits = new Map(); // ip -> { count, resetAt }

  // drop expired entries now and then so the map can't grow forever
  setInterval(() => {
    const now = Date.now();
    for (const [ip, h] of hits) if (h.resetAt <= now) hits.delete(ip);
  }, windowMs).unref();

  return (req, res, next) => {
    const now = Date.now();
    const entry = hits.get(req.ip);
    if (!entry || entry.resetAt <= now) {
      hits.set(req.ip, { count: 1, resetAt: now + windowMs });
      return next();
    }
    entry.count += 1;
    if (entry.count > max) {
      res.set("Retry-After", String(Math.ceil((entry.resetAt - now) / 1000)));
      return res.status(429).json({ error: message });
    }
    next();
  };
}

module.exports = rateLimit;
