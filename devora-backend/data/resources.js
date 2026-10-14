// Detail-page content for the Resources section (blog posts, journal essays, podcast episodes,
// press releases, case studies). The list pages link to these via GET /api/resources/:type/:id.
//
// DEMO CONTENT: replace with real articles / episodes when you have them.

const IMG = {
  team: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop",
  work: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1600&auto=format&fit=crop",
  code: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1600&auto=format&fit=crop",
  p1: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1600&auto=format&fit=crop",
  p2: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1600&auto=format&fit=crop",
  p3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1600&auto=format&fit=crop",
  p4: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1600&auto=format&fit=crop",
};

// Placeholder platform links (they open each platform's home page). Swap in real show URLs later.
const LISTEN_ON = [
  { id: "spotify", label: "Spotify", href: "https://open.spotify.com" },
  { id: "apple", label: "Apple Podcasts", href: "https://podcasts.apple.com" },
  { id: "youtube", label: "YouTube", href: "https://www.youtube.com" },
];

const post = (o) => ({ type: "blog", eyebrow: "FROM THE DEVORA JOURNAL", ...o });
const episode = (o) => ({ type: "podcast", eyebrow: "DEVORA PODCAST", listenOn: LISTEN_ON, ...o });

const RESOURCES = [
  /* ------------------------------ Blog posts & journal essays ------------------------------ */
  post({
    id: "design-systems-2026",
    title: "Why every fast-moving startup needs a design system by month 3",
    category: "Design", author: "Alex Rivera", authorRole: "Founder, Devora", date: "Sep 18, 2026", readTime: "6 min read",
    imageUrl: IMG.team,
    summary: "The cost of skipping this step doesn't show up immediately. It shows up in month six, in every sprint after.",
    sections: [
      { heading: "The bill arrives late", paragraphs: [
        "In the first weeks of a product, inconsistency is invisible. There are three screens, one designer, and everything fits in your head. By month three there are thirty screens, four contributors, and three slightly different blue buttons.",
        "None of that hurts yet. What hurts is month six, when every new feature starts with a debate about which version of a component is the real one." ] },
      { heading: "What 'a design system' means at this stage", paragraphs: [
        "It does not mean a documentation site and a dedicated team. At month three it means a short list of tokens (colors, spacing, type), ten reusable components, and one place where both designers and engineers can see them.",
        "That is about two weeks of focused work, and it pays back on the very next feature." ] },
    ],
    takeaways: ["Start when the same pattern has been built three times, not before.", "Tokens first, components second.", "Keep it small enough that one person can hold it in their head."],
  }),
  post({
    id: "async-first-teams",
    title: "What async-first actually means (it's not just Slack)",
    category: "Culture", author: "Jamie Chen", authorRole: "Delivery Lead, Devora", date: "Sep 10, 2026", readTime: "4 min read",
    imageUrl: IMG.work,
    summary: "Async isn't a communication style, it's an architecture decision for how your team makes decisions.",
    sections: [
      { heading: "Chat is not async", paragraphs: [
        "Moving a meeting into a chat channel just creates a meeting that never ends. Real async work means a message can be understood, and acted on, hours later by someone with no extra context.",
        "That requires a different habit: write the background, the options, and the decision you need before you hit send." ] },
      { heading: "Decisions are the unit of work", paragraphs: [
        "On our teams, anything that needs a decision gets a short written proposal with a deadline for objections. Silence means yes. It sounds slow, but it removes most of the status meetings we used to run.",
        "The result is calmer days, fewer interruptions, and a written record of why we chose what we chose." ] },
    ],
    takeaways: ["Write for someone reading six hours later.", "Give every proposal a clear deadline.", "Keep meetings for conversations that really need to be live."],
  }),
  post({
    id: "onboarding-rebuild",
    title: "We Rebuilt Our Own Onboarding Flow Three Times. Here's What Finally Worked.",
    category: "Engineering", author: "Dana Ferreira", authorRole: "Product Lead, Devora", date: "Aug 14, 2026", readTime: "7 min read",
    imageUrl: IMG.code,
    summary: "Two failed rewrites taught us more about our own product than either of the successful launches did.",
    sections: [
      { heading: "Attempt one: more steps", paragraphs: [
        "Our first onboarding tried to explain everything. Seven steps, a progress bar, and tooltips on every field. Completion looked fine on paper, but people finished the tour and still did not know what to do next.",
      ] },
      { heading: "Attempt two: fewer steps", paragraphs: [
        "So we cut it to three steps. Completion went up, activation did not. We had made it easier to finish onboarding without making it any easier to get value from the product.",
      ] },
      { heading: "Attempt three: start with the outcome", paragraphs: [
        "The version that worked started from the first useful thing a new customer could do, and removed everything standing in front of it. We stopped teaching the interface and started helping people reach a result in their first five minutes.",
        "Activation roughly doubled, and support questions about getting started nearly disappeared." ] },
    ],
    takeaways: ["Measure activation, not completion.", "Onboarding should shorten the path to a first result.", "Rewrites teach you what your product really is."],
  }),
  post({
    id: "ai-cost",
    title: "The Real Cost of Bolting AI Onto a Product That Doesn't Need It",
    category: "AI", author: "Sam Okafor", authorRole: "AI Lead, Devora", date: "Aug 2, 2026", readTime: "5 min read",
    imageUrl: IMG.p2,
    summary: "An AI feature is never free. Here is how to count what it really costs before you build it.",
    sections: [
      { heading: "The costs nobody puts in the plan", paragraphs: [
        "Model usage is the visible part of the bill. The hidden parts are evaluation, monitoring, prompt maintenance, and the support load when the feature is confidently wrong.",
        "Each of those continues for as long as the feature exists, which makes an AI feature closer to a new product line than a one-off task." ] },
      { heading: "A simple test before you build", paragraphs: [
        "Ask whether the user's problem is about language, judgment, or messy input. If it is not, a rule, a search box, or a better form is usually cheaper, faster, and easier to trust.",
        "AI earns its place when it removes real manual work in a workflow that people already depend on." ] },
    ],
    takeaways: ["Count evaluation and maintenance, not just API usage.", "Prefer boring solutions when they work.", "Use AI where it removes real manual effort."],
  }),
  post({
    id: "design-debt",
    title: "Design Debt Is Worse Than Tech Debt, and Nobody Tracks It",
    category: "Design", author: "Priya Nair", authorRole: "Design Lead, Devora", date: "Jul 26, 2026", readTime: "6 min read",
    imageUrl: IMG.team,
    summary: "Engineers keep a backlog of tech debt. Almost nobody keeps one for inconsistent, confusing, or outdated design.",
    sections: [
      { heading: "What design debt looks like", paragraphs: [
        "It is the settings page that works differently from every other page, the three ways to say 'cancel', and the flow that made sense two product versions ago. Each one is small. Together they make a product feel unreliable.",
      ] },
      { heading: "Make it visible", paragraphs: [
        "We keep a design debt list next to the engineering one, with a rough size and the user impact for each item. Every sprint reserves a small slice for paying it down.",
        "Once it is written down, it stops being a vague feeling and becomes something a team can plan around." ] },
    ],
    takeaways: ["Track design debt like you track tech debt.", "Describe each item by user impact.", "Reserve a small slice of every sprint to repay it."],
  }),
  post({
    id: "pricing-mvp",
    title: "How We Price Fixed-Scope Sprints Without Guessing",
    category: "Business", author: "Alex Rivera", authorRole: "Founder, Devora", date: "Jul 19, 2026", readTime: "4 min read",
    imageUrl: IMG.work,
    summary: "A fixed price only works if the scope is honest. This is how we make it honest before anyone signs.",
    sections: [
      { heading: "Price the uncertainty, not just the work", paragraphs: [
        "Most estimates fail because they assume everything is known. We separate the parts we understand from the parts we do not, and spend the first few days turning the second group into the first.",
      ] },
      { heading: "A short sprint beats a long proposal", paragraphs: [
        "A one or two week discovery sprint with a working prototype tells both sides more than a forty-page document. After that, the remaining work can be priced with real confidence.",
        "If we cannot get to a number we believe in, we say so." ] },
    ],
    takeaways: ["Turn unknowns into knowns before you quote.", "A prototype is a better estimate than a document.", "Say so when you cannot price something honestly."],
  }),
  post({
    id: "migration-story",
    title: "Migrating a Decade-Old Rails App Without a Feature Freeze",
    category: "Engineering", author: "Dana Ferreira", authorRole: "Product Lead, Devora", date: "Jul 10, 2026", readTime: "8 min read",
    imageUrl: IMG.code,
    summary: "Stopping all new work for a migration is rarely an option. Here is how we kept shipping while the foundation changed.",
    sections: [
      { heading: "Strangle, don't rewrite", paragraphs: [
        "We put a thin routing layer in front of the old application and moved one capability at a time to the new stack. Each piece went live behind a flag, was compared against the old behavior, and only then took over real traffic.",
      ] },
      { heading: "Keep the team shipping", paragraphs: [
        "New features were built on the new side whenever possible, so the migration and the roadmap pulled in the same direction. Every release made the old code a little smaller.",
        "After about five months, the last route moved over and the legacy application was switched off without a single announcement day." ] },
    ],
    takeaways: ["Migrate by capability, not by big bang.", "Compare old and new behavior before switching traffic.", "Build new features on the new stack."],
  }),
  post({
    id: "hiring-seniors",
    title: "Why We Stopped Hiring for 'Culture Fit'",
    category: "Business", author: "Jamie Chen", authorRole: "Delivery Lead, Devora", date: "Jun 30, 2026", readTime: "5 min read",
    imageUrl: IMG.team,
    summary: "'Fit' quietly selects for people who are just like us. We replaced it with something more useful.",
    sections: [
      { heading: "The problem with 'fit'", paragraphs: [
        "In practice, culture fit often meant 'someone we would enjoy having a beer with'. It is easy to confuse that with being good at the job, and it narrows who gets through the door.",
      ] },
      { heading: "What we ask instead", paragraphs: [
        "We write down the behaviors that make our team work, such as writing things down, giving direct feedback, and owning outcomes, and we interview for those. We call it culture add, and every interviewer scores the same short list.",
        "Our shortlists became more varied, and our hiring got faster and fairer." ] },
    ],
    takeaways: ["Define the behaviors you need, not the personality you like.", "Score every candidate on the same list.", "Look for what a person adds, not just how they fit."],
  }),
  post({
    id: "prompt-arch",
    title: "Prompt Architecture Is a Real Engineering Discipline Now",
    category: "AI", author: "Sam Okafor", authorRole: "AI Lead, Devora", date: "Jun 21, 2026", readTime: "6 min read",
    imageUrl: IMG.p2,
    summary: "Prompts that grow by accident become the new unmaintainable legacy code. Structure them on purpose.",
    sections: [
      { heading: "Treat prompts as code", paragraphs: [
        "A production prompt has inputs, outputs, versions, and tests, just like any other module. Keep them in version control, name the parts, and review changes the way you would review a function.",
      ] },
      { heading: "Evaluate before you ship", paragraphs: [
        "Build a small set of real examples, including the awkward ones, and run every prompt change against it. Without that, every tweak is a gamble and regressions only appear in front of customers.",
        "The goal is boring reliability: the same input behaving the same way next month." ] },
    ],
    takeaways: ["Version and review prompts like code.", "Keep an evaluation set of real, awkward examples.", "Aim for predictable behavior over clever wording."],
  }),

  /* ------------------------------ Podcast episodes ------------------------------ */
  episode({
    id: "bootstrapped", show: "BUILD IN PUBLIC", category: "Founders",
    title: "Bootstrapping to $1M ARR Without a Single Ad",
    guest: "Layla Hassan", guestRole: "Founder, Fieldnote", date: "Sep 4, 2026", duration: "38 min", imageUrl: IMG.p1,
    summary: "Layla walks through how Fieldnote reached its first million in annual revenue using only customer conversations, a niche community, and patience.",
    sections: [
      { heading: "About this episode", paragraphs: [
        "Fieldnote never ran a paid campaign. Layla explains how the first hundred customers came from direct conversations, and how those conversations shaped the product more than any roadmap did.",
        "We also talk about pricing early, saying no to custom work, and what changed once the team grew past five people." ] },
    ],
    takeaways: ["Talk to your first hundred customers yourself.", "Charge from the beginning.", "A narrow community beats a broad audience."],
  }),
  episode({
    id: "ai-hype", show: "DEVORA UNSCRIPTED", category: "Engineering",
    title: "Why Most AI Features Are Solving the Wrong Problem",
    guest: "Marcus Webb", guestRole: "CTO, Ledger Works", date: "Aug 21, 2026", duration: "44 min", imageUrl: IMG.p2,
    summary: "Marcus has shipped and killed more AI features than he can count. He shares how to tell a useful one from an expensive demo.",
    sections: [
      { heading: "About this episode", paragraphs: [
        "A good AI feature starts from a task people already hate doing. Marcus describes the questions Ledger Works asks before building one, and the metrics they check after launch.",
        "We also get into evaluation, cost control, and why trust is the hardest thing to win back." ] },
    ],
    takeaways: ["Start from a painful manual task.", "Measure outcomes, not usage.", "Trust is slow to earn and quick to lose."],
  }),
  episode({
    id: "solo-founder", show: "BUILD IN PUBLIC", category: "Founders",
    title: "Running a 40k-User Marketplace Solo",
    guest: "Priya Shah", guestRole: "Founder, Roost", date: "Aug 7, 2026", duration: "29 min", imageUrl: IMG.p3,
    summary: "Priya runs a marketplace with tens of thousands of users on her own. She explains what she automated, what she refuses to, and where she asks for help.",
    sections: [
      { heading: "About this episode", paragraphs: [
        "Roost is small by headcount and large by usage. Priya talks about choosing boring tools, automating support triage, and keeping a calm weekly rhythm.",
        "She also shares the one hire she waited too long to make." ] },
    ],
    takeaways: ["Automate the repeatable, keep the human moments.", "Pick boring, reliable tools.", "Hire before it hurts."],
  }),
  episode({
    id: "legacy-rescue", show: "OUT OF SYNC", category: "Engineering",
    title: "Rescuing a Decade-Old Logistics System",
    guest: "Tomas Reyes", guestRole: "Founder, Pier Logistics", date: "Jul 24, 2026", duration: "51 min", imageUrl: IMG.p4,
    summary: "Tomas inherited ten years of undocumented code that moved real freight every day. This is how his team made it safe to change.",
    sections: [
      { heading: "About this episode", paragraphs: [
        "Before changing anything, the team wrote tests around the behavior they could observe. Tomas shares how they did it with the system still running, and how they decided what to rewrite and what to leave alone.",
        "It is a candid look at the unglamorous work behind a successful rescue." ] },
    ],
    takeaways: ["Capture current behavior before you change it.", "Leave stable code alone.", "Make small changes, ship often."],
  }),
  episode({
    id: "hiring-design", show: "DEVORA UNSCRIPTED", category: "Design", episodeNumber: 11,
    title: "How to hire your first design partner",
    guest: "Alex Rivera", guestRole: "Founder, Devora", date: "Sep 5, 2026", duration: "18 min", imageUrl: IMG.team,
    summary: "What to look for before your first full-time design hire, and when a trusted external partner is the better first step.",
    sections: [
      { heading: "About this episode", paragraphs: [
        "Alex covers the difference between a designer who can make things look good and one who can shape a product, and why the first hire should be the second kind.",
        "A short, paid trial project often tells you more than three rounds of interviews." ] },
    ],
    takeaways: ["Hire for product thinking, not only polish.", "Run a short paid trial project.", "Be clear about what the role owns."],
  }),

  /* ------------------------------ Press release ------------------------------ */
  {
    type: "news", id: "seed-round", eyebrow: "PRESS RELEASE", category: "Announcement",
    title: "Devora raises seed round to expand embedded product teams",
    author: "Devora", authorRole: "Press & Communications", date: "Sep 2, 2026", readTime: "2 min read", imageUrl: IMG.team,
    summary: "The round will fund three new embedded teams and a research arm focused on design systems tooling.",
    sections: [
      { heading: "", paragraphs: [
        "Devora, a software studio that embeds product teams inside startups and growing companies, today announced a seed funding round to expand its embedded teams and open a new research arm focused on design systems tooling. The amount was not disclosed.",
        "The funding will support three new embedded teams, each pairing engineers and a designer who join a client's standups and sprint planning, and a small research group studying how teams build and maintain design systems." ] },
      { heading: "What the funding supports", paragraphs: [
        "\"Our clients keep telling us the same thing: they want the speed of a small team and the discipline of a mature one,\" said Alex Rivera, founder of Devora. \"This round lets us build more of those teams without lowering the bar for how we work.\"",
        "Devora will also publish its research openly, starting with practical guides for teams adopting design systems and async-first ways of working." ] },
      { heading: "About Devora", paragraphs: [
        "Devora is a software studio for teams who would rather ship than wait. It builds web, mobile, and AI-powered products with embedded teams of engineers and designers, and has launched more than 120 products over seven years.",
      ] },
    ],
    takeaways: ["Seed round, amount undisclosed.", "Three new embedded teams planned.", "A new research arm on design systems tooling."],
  },

  /* ------------------------------ Case study ------------------------------ */
  {
    type: "case-study", id: "checkout-flow", eyebrow: "CASE STUDY", category: "Fintech",
    title: "Redesigned checkout cut abandonment in half",
    author: "Devora", authorRole: "Client: Fintra", date: "2026", readTime: "4 min read", imageUrl: IMG.work,
    summary: "How we helped Fintra turn a long, leaky checkout into a fast two-step flow, and what the numbers showed afterward.",
    stats: [
      { value: "2.3x", label: "Conversion lift" },
      { value: "180ms", label: "Avg. load time" },
      { value: "+47%", label: "User growth" },
    ],
    sections: [
      { heading: "The challenge", paragraphs: [
        "Fintra's checkout asked for too much, too soon. Customers had to create an account, fill in a long form, and confirm details across five screens. Roughly half of the people who started a purchase never finished it.",
      ] },
      { heading: "What we did", paragraphs: [
        "We began with a working prototype in the first week and tested it with real customers. The new flow reduced checkout to two steps, saved details for returning users, and moved account creation to after payment.",
        "Behind the scenes we rebuilt the page in Next.js with Stripe for payments, and held a strict performance budget so the experience stayed fast on slower phones.",
      ] },
      { heading: "The result", paragraphs: [
        "Cart abandonment fell by half, conversion more than doubled, and the new page loads in under 200 milliseconds on average. Because analytics were in place from day one, Fintra could see the gains week by week.",
      ] },
    ],
    takeaways: ["Prototype in week one, test with real users.", "Ask for less, later.", "Set a performance budget and keep to it."],
  },
  {
    type: "case-study", id: "ledger-reconciliation", eyebrow: "CASE STUDY", category: "Fintech",
    title: "Automated reconciliation saved a finance team two days a week",
    author: "Devora", authorRole: "Client: Ledger Works", date: "2026", readTime: "4 min read", imageUrl: IMG.code,
    summary: "How we replaced a spreadsheet-driven month-end close at Ledger Works with automated daily reconciliation.",
    stats: [
      { value: "92%", label: "Entries matched automatically" },
      { value: "2 days", label: "Saved every week" },
      { value: "0", label: "Errors at month-end" },
    ],
    sections: [
      { heading: "The challenge", paragraphs: [
        "Ledger Works matched payments to invoices by hand in spreadsheets. Every month-end, two people spent days chasing mismatches, and small errors only surfaced weeks later.",
      ] },
      { heading: "What we did", paragraphs: [
        "We built a reconciliation service that pulls transactions every night, matches them against open invoices, and flags only the exceptions for a person to review.",
        "The matching rules were agreed with the finance team first, and every automatic match is logged so it can be audited.",
      ] },
      { heading: "The result", paragraphs: [
        "About nine in ten entries now match without anyone touching them. The finance team saves roughly two days every week, and month-end close no longer depends on a single spreadsheet.",
      ] },
    ],
    takeaways: ["Agree the matching rules with the people who use them.", "Automate the routine, review the exceptions.", "Log every automatic decision so it can be audited."],
  },
  {
    type: "case-study", id: "fieldnote-rebrand", eyebrow: "CASE STUDY", category: "Branding",
    title: "A rebrand that doubled trial sign-ups",
    author: "Devora", authorRole: "Client: Fieldnote", date: "2026", readTime: "4 min read", imageUrl: IMG.team,
    summary: "How we gave Fieldnote a clearer identity and a faster marketing site, and what changed in sign-ups.",
    stats: [
      { value: "2x", label: "Trial sign-ups" },
      { value: "3 weeks", label: "Start to launch" },
      { value: "98", label: "Performance score" },
    ],
    sections: [
      { heading: "The challenge", paragraphs: [
        "Fieldnote's product had outgrown its look. The logo, the colors, and the website told three different stories, and visitors left the pricing page without starting a trial.",
      ] },
      { heading: "What we did", paragraphs: [
        "We ran a short brand workshop, agreed on a simple identity, and rebuilt the marketing site on a small design system so new pages could be added in hours rather than days.",
      ] },
      { heading: "The result", paragraphs: [
        "Trial sign-ups doubled in the first two months, and the team now publishes new pages without waiting for a designer.",
      ] },
    ],
    takeaways: ["Fix the story before the visuals.", "Build the site on reusable components.", "Measure sign-ups from the first day."],
  },
  {
    type: "case-study", id: "roost-onboarding", eyebrow: "CASE STUDY", category: "Marketplace",
    title: "Redesigned onboarding got new hosts listing in minutes",
    author: "Devora", authorRole: "Client: Roost", date: "2026", readTime: "4 min read", imageUrl: IMG.p2,
    summary: "How we redesigned Roost's first-run experience so new hosts publish a listing in minutes instead of days.",
    stats: [
      { value: "-60%", label: "Time to first listing" },
      { value: "3x", label: "Activation rate" },
      { value: "4.8", label: "App store rating" },
    ],
    sections: [
      { heading: "The challenge", paragraphs: [
        "New hosts on Roost had to complete a long profile before they could list a space. Most gave up halfway, and support was flooded with questions about getting started.",
      ] },
      { heading: "What we did", paragraphs: [
        "We mapped every step of the journey, removed everything that was not needed for a first listing, and added a short checklist that guides new hosts one task at a time.",
      ] },
      { heading: "The result", paragraphs: [
        "New hosts now publish their first listing in minutes. Activation tripled, and support questions about getting started nearly disappeared.",
      ] },
    ],
    takeaways: ["Ask only for what the first listing needs.", "Guide people one task at a time.", "Watch real sessions, not just dashboards."],
  },
];

const TYPE_ALIASES = { blogs: "blog", podcasts: "podcast", "news-media": "news", "case-studies": "case-study" };
const BACK = {
  blog: { href: "/resources/blogs", label: "Back to the blog" },
  podcast: { href: "/resources/podcasts", label: "Back to all episodes" },
  news: { href: "/resources/news-media", label: "Back to News & Media" },
  "case-study": { href: "/resources/case-studies", label: "Back to case studies" },
};
const URL_SEGMENT = { blog: "blogs", podcast: "podcasts", news: "news-media", "case-study": "case-studies" };

const hrefFor = (item) => `/resources/${URL_SEGMENT[item.type]}/${item.id}`;

module.exports = { RESOURCES, LISTEN_ON, TYPE_ALIASES, BACK, hrefFor };
