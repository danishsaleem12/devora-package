const express = require("express");
const router = express.Router();
const { RESOURCES, TYPE_ALIASES, BACK, hrefFor } = require("../data/resources");

// GET /api/resources/:type/:id
//   :type is the URL segment used on the site: blogs | podcasts | news-media | case-studies
router.get("/resources/:type/:id", (req, res) => {
  const type = Object.hasOwn(TYPE_ALIASES, req.params.type) ? TYPE_ALIASES[req.params.type] : null;
  const item = type && RESOURCES.find((r) => r.type === type && r.id === req.params.id);
  if (!item) return res.status(404).json({ error: "Not found" });

  const related = RESOURCES.filter((r) => r.type === type && r.id !== item.id)
    .slice(0, 3)
    .map((r) => ({
      id: r.id,
      title: r.title,
      imageUrl: r.imageUrl,
      category: r.category,
      meta: r.readTime || r.duration || r.date,
      href: hrefFor(r),
    }));

  res.json({ ...item, back: BACK[type], related });
});

module.exports = router;
