const express = require("express");
const router = express.Router();
const { JOURNAL, LISTEN_ON, href } = require("../data/journal");

// GET /api/journal-articles — list for the /resources/journal page
router.get("/journal-articles", (req, res) => {
  res.json({
    eyebrow: "THE DEVORA JOURNAL",
    heading: "Essays, breakdowns, and\nthings we learned the hard way.",
    subheading: "Long-form pieces from the people building Devora, with a listen-along version of each.",
    categories: ["All", ...new Set(JOURNAL.map((e) => e.category))],
    articles: JOURNAL.map((e) => ({
      slug: e.slug,
      href: href(e),
      category: e.category,
      title: e.meta.title.replace(/\n/g, " "),
      excerpt: e.meta.subtitle,
      author: e.meta.author,
      date: e.meta.publishedAt,
      duration: e.meta.duration,
      imageUrl: e.imageUrl,
    })),
  });
});

function detail(entry) {
  const { slug, imageUrl, category, ...article } = entry;
  return {
    ...article,
    listenOn: LISTEN_ON,
    // other journal essays, in the shape the article page's "related" strip expects
    relatedEpisodes: JOURNAL.filter((e) => e.slug !== slug)
      .slice(0, 3)
      .map((e) => ({
        id: e.slug,
        title: e.meta.title.replace(/\n/g, " "),
        excerpt: e.meta.subtitle,
        imageUrl: e.imageUrl,
        duration: e.meta.duration.replace(" listen", ""),
        href: href(e),
      })),
  };
}

// GET /api/journal-article/:slug — one essay
router.get("/journal-article/:slug", (req, res) => {
  const entry = JOURNAL.find((e) => e.slug === req.params.slug);
  if (!entry) return res.status(404).json({ error: "Not found" });
  res.json(detail(entry));
});

// GET /api/journal-article — kept for compatibility: the latest essay
router.get("/journal-article", (req, res) => res.json(detail(JOURNAL[0])));

module.exports = router;
