// Devora Journal: long-form essays (each one has a listen version + transcript, like a podcast episode).
// Add an entry here and it shows up on /resources/journal and gets its own page at /resources/journal/<slug>.
const { LISTEN_ON } = require("./resources");

const JOURNAL = [
  {
    slug: "slow-foundations",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    category: "Engineering",
    meta: {
      eyebrow: "FROM THE DEVORA JOURNAL",
      title: "Why we build slow foundations\nfor fast-moving startups.",
      subtitle: "Our founder on why the fastest teams are the ones who refuse to cut corners on the boring parts.",
      author: "Alex Rivera, Founder",
      publishedAt: "Sep 12, 2026",
      duration: "24 min listen",
      showName: "DEVORA UNSCRIPTED",
    },
    waveform: [12, 18, 9, 24, 30, 14, 20, 8, 26, 16, 22, 11],
    keyTakeaways: [
      "Fast teams aren't the ones skipping steps — they're the ones who never revisit finished work.",
      "A design system isn't overhead, it's the thing that prevents overhead later.",
      "Technical debt compounds faster than most founders expect in the first 6 months.",
    ],
    sections: [
      {
        id: "intro",
        heading: "The myth of moving fast",
        paragraphs: ["Every founder we talk to wants speed. Fewer of them ask what speed actually costs."],
        pullQuote: { quote: "Speed without a foundation is just borrowed time.", attribution: "Alex Rivera" },
      },
      {
        id: "foundations",
        heading: "What a 'boring' foundation buys you",
        paragraphs: [],
        statCallout: [
          { value: "3x", label: "Slower feature velocity after 6 months without a design system" },
          { value: "60%", label: "Of eng time in unstructured codebases goes to rework" },
          { value: "2 wks", label: "Avg. time saved per feature with a mature component library" },
        ],
      },
    ],
    transcript: [
      { time: "00:00", speaker: "Alex Rivera", text: "So the thing nobody tells early-stage founders..." },
      { time: "00:42", speaker: "Host", text: "Right, and that's the tension, isn't it?" },
    ],
    author: {
      name: "Alex Rivera",
      role: "Founder, Devora",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      bio: "Alex has spent a decade building product teams at early-stage startups before founding Devora.",
    },
  },
  {
    slug: "write-it-down",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    category: "Business",
    meta: {
      eyebrow: "FROM THE DEVORA JOURNAL",
      title: "Write it down:\nthe cheapest process we ever adopted.",
      subtitle: "How one habit, writing decisions down before acting on them, replaced half of our meetings.",
      author: "Dana Ferreira, Product Lead",
      publishedAt: "Aug 28, 2026",
      duration: "18 min listen",
      showName: "DEVORA UNSCRIPTED",
    },
    waveform: [10, 22, 14, 28, 12, 19, 26, 9, 17, 24, 13, 21],
    keyTakeaways: [
      "A written decision can be questioned by people who weren't in the room.",
      "Meetings get shorter when the context is read beforehand, not presented live.",
      "The goal isn't more documents, it's fewer repeated conversations.",
    ],
    sections: [
      {
        id: "intro",
        heading: "The meeting that should have been a page",
        paragraphs: [
          "We used to resolve most questions in a call. The answers lived in people's heads and were gone by Friday.",
        ],
        pullQuote: { quote: "If it matters enough to decide, it matters enough to write down.", attribution: "Dana Ferreira" },
      },
      {
        id: "results",
        heading: "What changed",
        paragraphs: [],
        statCallout: [
          { value: "-40%", label: "Time spent in recurring meetings" },
          { value: "1 page", label: "Maximum length of a decision record" },
          { value: "0", label: "Times we've asked 'wait, why did we do it this way?' in the last quarter" },
        ],
      },
    ],
    transcript: [
      { time: "00:00", speaker: "Dana Ferreira", text: "It started as an experiment for one project..." },
      { time: "00:35", speaker: "Host", text: "And people actually kept doing it?" },
    ],
    author: {
      name: "Dana Ferreira",
      role: "Product Lead, Devora",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      bio: "Dana leads product at Devora and has run remote-first teams for eight years.",
    },
  },
  {
    slug: "first-ai-feature",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
    category: "AI",
    meta: {
      eyebrow: "FROM THE DEVORA JOURNAL",
      title: "What we learned shipping\nour first AI feature to real users.",
      subtitle: "The demo took a weekend. Making it dependable took three months. A candid look at the gap.",
      author: "Alex Rivera, Founder",
      publishedAt: "Aug 9, 2026",
      duration: "21 min listen",
      showName: "DEVORA UNSCRIPTED",
    },
    waveform: [15, 9, 27, 18, 11, 25, 20, 13, 29, 10, 23, 16],
    keyTakeaways: [
      "A good demo proves it can work once; users need it to work every time.",
      "Decide up front what the feature should do when the model is wrong.",
      "Measure outcomes with real examples, not impressions.",
    ],
    sections: [
      {
        id: "intro",
        heading: "The weekend demo",
        paragraphs: [
          "The first version impressed everyone in the room. Then real users arrived with real, messy input.",
        ],
        pullQuote: { quote: "The demo is the easy five percent.", attribution: "Alex Rivera" },
      },
      {
        id: "reliability",
        heading: "Where the three months went",
        paragraphs: [],
        statCallout: [
          { value: "5%", label: "Of the work was the part shown in the demo" },
          { value: "200", label: "Real examples we used to test every change" },
          { value: "3 mo", label: "From first demo to a feature we trusted" },
        ],
      },
    ],
    transcript: [
      { time: "00:00", speaker: "Alex Rivera", text: "I'll be honest, the first launch did not go smoothly..." },
      { time: "00:48", speaker: "Host", text: "What was the first thing that broke?" },
    ],
    author: {
      name: "Alex Rivera",
      role: "Founder, Devora",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      bio: "Alex has spent a decade building product teams at early-stage startups before founding Devora.",
    },
  },
];

const href = (entry) => `/resources/journal/${entry.slug}`;

module.exports = { JOURNAL, LISTEN_ON, href };
