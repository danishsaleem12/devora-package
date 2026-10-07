const express = require("express");
const router = express.Router();

// GET /api/navbar
router.get("/navbar", (req, res) => {
  res.json({
    logo: "Devora",
    menus: [
      {
        label: "Services",
        items: [
          { label: "Web Development", href: "/services/web-development" },
          { label: "Full-Stack Development", href: "/services/full-stack-development" },
          { label: "AI & LLM Solutions", href: "/services/ai-llm-solutions" },
          { label: "SaaS & Product Development", href: "/services/saas-product-development" },
          { label: "E-Commerce Development", href: "/services/e-commerce-development" },
          { label: "UI/UX & Design Systems", href: "/services/ui-ux-design-systems" },
          { label: "Cloud & DevOps", href: "/services/cloud-devops" },
          { label: "API & Integrations", href: "/services/api-integrations" },
        ],
      },
      {
        label: "Solutions",
        items: [
          { label: "E-Commerce (Shopify & Custom)", href: "/solutions/ecommerce" },
          { label: "AI Dashboards", href: "/solutions/ai-dashboards" },
          { label: "AI Customer Assistants", href: "/solutions/ai-assistants" },
          { label: "Fintech & Ledger Systems", href: "/solutions/fintech" },
        ],
      },
      {
        label: "Products",
        items: [
          { label: "Devora Analytics", href: "/products/devora-analytics" },
          { label: "Devora Assist (AI Chat Widget)", href: "/products/devora-assist" },
          { label: "Devora Commerce Kit", href: "/products/devora-commerce-kit" },
          { label: "Devora HRM", href: "/products/devora-hrm" },
          { label: "Devora POS", href: "/products/devora-pos" },
        ],
      },
      {
        label: "Resources",
        items: [
          { label: "Devora Journal", href: "/resources/journal" },
          { label: "Blogs", href: "/resources/blogs" },
          { label: "Podcasts", href: "/resources/podcasts" },
          { label: "Research & Guides", href: "/resources/research-guides" },
          { label: "Case Studies", href: "/resources/case-studies" },
          { label: "News & Media", href: "/resources/news-media" },
        ],
      },
      {
        label: "Company",
        items: [
          { label: "About", href: "/about" },
          { label: "Careers", href: "/careers" },
          { label: "Life at Devora", href: "/life-at-devora" },
          // { label: "Campus Ambassador", href: "/campus-ambassador" },
          // { label: "Partner Programme", href: "/partner-programme" },
        ],
      },
    ],
    languages: [
      { label: "English", code: "EN" },
      { label: "Français", code: "FR" },
      { label: "Español", code: "ES" },
    ],
    cta: { label: "Contact Us", href: "/contact" },
  });
});

// GET /api/hero
router.get("/hero", (req, res) => {
  res.json({
    slides: [
      {
        id: "ship-fast",
        layout: "terminal",
        eyebrow: "BUILT FOR TEAMS THAT MOVE",
        headline: "Ideas shipped\nbefore the coffee\ngets cold.",
        subheadline:
          "Devora pairs senior engineers with a design-first process, so your product goes from sketch to production without the usual back-and-forth.",
        primaryCta: { label: "Start a Project", href: "/contact" },
        secondaryCta: { label: "See Our Work", href: "/portfolio" },
        visual: {
          badge: "BUILD · PASSING",
          fileName: "deploy.sh",
          lines: [
            "$ devora ship checkout-flow",
            "> compiling components... done",
            "> running 62 tests... 62 passed",
            "> live at devora.app/checkout",
          ],
          progressLabel: "DEPLOY",
          progressValue: 100,
        },
      },
      {
        id: "design-system",
        layout: "graphic",
        eyebrow: "DESIGN THAT SCALES",
        headline: "One design system.\nEvery screen\nfeels like yours.",
        subheadline:
          "We build interfaces around a single source of truth — so your app, site, and dashboard all speak the same visual language from day one.",
        primaryCta: { label: "See Our Process", href: "/process" },
        visual: { icons: ["cube", "chart", "flag", "cloud"] },
      },
      {
        id: "growth-metrics",
        layout: "dashboard",
        eyebrow: "RESULTS, NOT JUST DELIVERABLES",
        headline: "We measure success\nin numbers you\nactually care about.",
        subheadline:
          "Every Devora build ships with analytics baked in from day one, so you can see exactly what's working — and what to build next.",
        primaryCta: { label: "View Case Studies", href: "/resources/case-studies" },
        visual: {
          scoreLabel: "PERFORMANCE SCORE",
          scoreCaption: "98/100 · Core Web Vitals passed",
          chartLabel: "USER GROWTH",
          chartChange: "+47%",
          bars: [15, 22, 19, 33, 41, 58, 72],
          stat1: { value: "2.3x", label: "Conversion lift" },
          stat2: { value: "180ms", label: "Avg. load time" },
        },
      },
      {
        id: "founder-story",
        layout: "audio",
        eyebrow: "FROM THE DEVORA JOURNAL",
        headline: "Why we build slow\nfoundations for\nfast-moving startups.",
        subheadline:
          "Our founder on why the fastest teams are the ones who refuse to cut corners on the boring parts.",
        // primaryCta: { label: "Listen to the Story", href: "/resources/journal" },
        primaryCta: { label: "Listen to the Story", href: "/resources/journal" },
        visual: { showName: "DEVORA UNSCRIPTED" },
      },
      {
        id: "client-partnership",
        layout: "photo",
        eyebrow: "A NEW PARTNERSHIP",
        headline: "Trusted by teams\nwho'd rather build\nthan wait.",
        subheadline:
          "From first sprint to full launch, we work embedded in your team — not as an outside vendor waiting on a ticket queue.",
        primaryCta: { label: "Read Their Story", href: "/resources/case-studies" },
        visual: {
          imageUrl:
            "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
          alt: "Team collaborating around a laptop",
        },
      },
    ],
    featuredIn: ["TechCrunch", "The Next Web", "Product Hunt", "Indie Hackers", "Hacker News"],
  });
});

// GET /api/case-studies
router.get("/case-studies", (req, res) => {
  res.json({
    eyebrow: "RESULTS, NOT JUST DELIVERABLES",
    heading: "The numbers behind\nthe work we've shipped.",
    subheading:
      "Every project below shipped with analytics from day one — here's what the data actually showed.",
    aggregateStats: [
      { value: "2.1x", label: "Avg. conversion lift" },
      { value: "190ms", label: "Avg. load time" },
      { value: "96", label: "Avg. performance score" },
    ],
    caseStudies: [
      {
        id: "checkout-flow",
        client: "Fintra",
        industry: "Fintech",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        headline: "Redesigned checkout cut abandonment in half",
        resultValue: "+47%",
        resultLabel: "User growth",
        bars: [15, 22, 19, 33, 41, 58, 72],
        stat1: { value: "2.3x", label: "Conversion lift" },
        stat2: { value: "180ms", label: "Avg. load time" },
        href: "/case-studies/fintra-checkout",
      },
      // ...more case studies
    ],
  });
});

// GET /api/process
router.get("/process", (req, res) => {
  res.json({
    eyebrow: "HOW WE WORK",
    heading: "A process built for\nclarity at every step.",
    subheading:
      "No black boxes. You'll always know what phase we're in, what's shipping next, and why.",
    stats: [
      { value: "5", label: "Structured phases" },
      { value: "2 wks", label: "Avg. to first prototype" },
      { value: "100%", label: "Async status visibility" },
    ],
    steps: [
      {
        id: "discovery",
        number: "01",
        title: "Discovery & Scoping",
        duration: "3–5 days",
        description:
          "We map your goals, users, and technical constraints before writing a line of code or a single design brief.",
        deliverables: [
          "Stakeholder interviews",
          "Technical audit",
          "Scoped roadmap",
          "Success metrics defined",
        ],
      },
      {
        id: "design-system",
        number: "02",
        title: "Design System First",
        duration: "1–2 weeks",
        description:
          "Instead of designing screens one by one, we build the tokens, components, and patterns everything else pulls from.",
        deliverables: ["Design tokens", "Component library", "Interactive prototype"],
      },
      {
        id: "build",
        number: "03",
        title: "Build in Sprints",
        duration: "2–6 weeks",
        description:
          "Weekly deployable increments, not a single big reveal at the end. You see progress in a live environment continuously.",
        deliverables: ["Weekly staging deploys", "Test coverage", "Async written updates"],
      },
      {
        id: "launch",
        number: "04",
        title: "Launch & Instrument",
        duration: "1 week",
        description:
          "We ship with analytics and monitoring baked in from day one, so you know what's working immediately post-launch.",
        deliverables: ["Analytics dashboard", "Performance baseline", "Rollback plan"],
      },
      {
        id: "support",
        number: "05",
        title: "Iterate & Support",
        duration: "Ongoing",
        description:
          "Launch is a milestone, not an ending. We stay embedded to iterate on what the data tells us.",
        deliverables: ["Monthly retros", "Priority bug SLA"],
      },
    ],
    principlesHeading: "What stays consistent across every project",
    principles: [
      { title: "Async by default", description: "Written updates over status meetings — context lives in docs, not people's heads." },
      { title: "Design in the browser", description: "We prototype in code early so what you review is close to what ships." },
      { title: "No surprise scope", description: "Anything outside the original scope gets flagged and estimated before we touch it." },
    ],
  });
});

// GET /api/portfolio
router.get("/portfolio", (req, res) => {
  res.json({
    eyebrow: "OUR WORK",
    heading: "Projects we've shipped\nand teams we've partnered with.",
    subheading:
      "A look at recent builds — from early-stage MVPs to full product redesigns.",
    filters: ["Web Apps", "Branding", "Product Design"],
    projects: [
      {
        id: "checkout-flow",
        title: "Checkout Flow Redesign",
        description: "Cut cart abandonment by 32% with a streamlined 2-step checkout.",
        tag: "Web Apps",
        tags: ["Next.js", "Stripe", "UX"],
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        href: "/case-studies/checkout-flow",
      },
      // ...more projects
    ],
  });
});

// GET /api/capabilities
router.get("/capabilities", (req, res) => {
  res.json({
    eyebrow: "HOW WE WORK",
    heading: "Four ways we plug into your team",
    subheading:
      "Every engagement starts differently — pick the shape that fits where you're at, and we adapt as you grow.",
    tabs: [
      {
        id: "embedded",
        title: "Embedded Squad",
        description:
          "A dedicated pod of engineers and a designer who join your standups, your Slack, and your sprint planning — not a separate vendor thread.",
        stat: { value: 14, suffix: " days", label: "avg. time to first commit" },
        points: [
          "Direct access to the people building your product",
          "Same tools, same repo, same rituals as your team",
          "Scales up or down with a two-week notice",
        ],
      },
      {
        id: "sprint",
        title: "Fixed-Scope Sprint",
        description:
          "A tightly scoped 2–6 week build for a single feature or MVP, priced upfront with a clear definition of done.",
        stat: { value: 92, suffix: "%", label: "sprints delivered on original scope" },
        points: [
          "Fixed price, fixed timeline, no surprise invoices",
          "Daily async updates, weekly live demo",
          "Ships as a working feature, not a prototype",
        ],
      },
      {
        id: "audit",
        title: "Technical Audit",
        description:
          "Before you commit to a rebuild or a rewrite, we spend one to two weeks inside your codebase and give you a prioritized, no-fluff report.",
        stat: { value: 48, suffix: "hrs", label: "to first findings call" },
        points: [
          "Architecture, performance, and security review",
          "Ranked list of fixes by effort vs. impact",
          "No obligation to hire us for the follow-through",
        ],
      },
      {
        id: "retainer",
        title: "Ongoing Retainer",
        description:
          "For teams past launch who need steady iteration — bug fixes, small features, and infrastructure upkeep — without hiring full-time.",
        stat: { value: 4, suffix: "hr", label: "median response time" },
        points: [
          "Monthly hour bank that rolls over unused time",
          "Same engineer stays assigned across the year",
          "Cancel or pause with 30 days notice",
        ],
      },
    ],
  });
});

// GET /api/services
router.get("/services", (req, res) => {
  res.json({
    eyebrow: "WHAT WE BUILD",
    heading: "Software that outgrows its first version.",
    subheading:
      "We don't hand off a finished box and disappear. Every engagement is built to be extended, refactored, and scaled as your product changes shape.",
    cta: { label: "Explore all work", href: "/services" },
    items: [
      {
        id: "product-eng",
        icon: "layers",
        title: "Product Engineering",
        description:
          "Full-stack builds across web, mobile, and backend — architected by senior engineers who stick around past launch.",
        size: "large",
        accent: "teal",
      },
      {
        id: "ai-integration",
        icon: "spark",
        title: "AI Integration",
        description: "Practical AI features bolted into real workflows, not demos.",
        size: "small",
        accent: "purple",
      },
      {
        id: "design-systems",
        icon: "grid",
        title: "Design Systems",
        description: "Component libraries your whole team can build on without guessing.",
        size: "small",
        accent: "blue",
      },
      {
        id: "platform-migration",
        icon: "shift",
        title: "Platform Migration",
        description:
          "Moving off legacy stacks without freezing feature work for six months.",
        size: "small",
        accent: "teal",
      },
      {
        id: "devops",
        icon: "server",
        title: "DevOps & Infrastructure",
        description: "CI/CD, observability, and cloud architecture that doesn't page you at 2am.",
        size: "small",
        accent: "orange",
      },
      {
        id: "growth-eng",
        icon: "trend",
        title: "Growth Engineering",
        description:
          "Experimentation infrastructure and funnel instrumentation built directly into your product.",
        size: "large",
        accent: "purple",
      },
    ],
  });
});

// GET /api/stats
router.get("/stats", (req, res) => {
  res.json({
    headingParts: [
      { text: "We don't just write code. We ", accent: false },
      { text: "compound momentum", accent: true },
      { text: " for teams building fast.", accent: false },
    ],
    subheading:
      "Every project starts with a working prototype in week one — not a discovery deck. Here's what that's added up to.",
    stats: [
      { value: 7, suffix: "+", label: "Years shipping products" },
      { value: 120, suffix: "+", label: "Products launched" },
      { value: 34, suffix: "", label: "Engineers on the bench" },
      { value: 98, suffix: "%", label: "Client retention rate" },
    ],
  });
});

// GET /api/work
router.get("/work", (req, res) => {
  res.json({
    stack: {
      eyebrow: "BUILT WITH",
      heading: "Modern tools, used the way they're meant to be.",
      items: [
        { name: "Next.js", tone: "teal" },
        { name: "Express", tone: "blue" },
        { name: "OpenAI & Claude APIs", tone: "purple" },
        { name: "Tailwind CSS", tone: "blue" },
        { name: "Node.js", tone: "teal" },
        { name: "MongoDB", tone: "teal" },
        { name: "Framer Motion", tone: "purple" },
        { name: "Vercel", tone: "orange" },
      ],
    },
    caseStudies: {
      eyebrow: "SELECTED WORK",
      heading: "What we build, in practice.",
      subheading:
        "We're a young studio — here's the kind of full-stack and AI work we specialize in, built the same way we'd build yours.",
      cta: { label: "See the full archive", href: "/work" },
      items: [
        {
          id: "ai-assistant",
          icon: "chat",
          category: "AI & AUTOMATION",
          title: "An AI assistant that knows your business inside out",
          summary: "Trained on your FAQs and docs — answers customer questions instantly, day or night.",
          metric: { number: 3, decimals: 0, suffix: "x", label: "Faster response than email support" },
          tone: "teal",
        },
        {
          id: "business-site",
          icon: "globe",
          category: "WEB DEVELOPMENT",
          title: "A business website that does more than sit there",
          summary: "Fast, mobile-first, and wired up with an AI FAQ bot right on the homepage.",
          metric: { number: 100, decimals: 0, suffix: "%", label: "Mobile responsive, zero compromises" },
          tone: "blue",
        },
        {
          id: "ecommerce",
          icon: "cart",
          category: "E-COMMERCE",
          title: "A store that recommends, not just lists",
          summary: "Full cart-to-checkout flow with an AI shopping assistant that helps customers decide.",
          metric: { number: 2, decimals: 0, suffix: "x", label: "More products viewed per session" },
          tone: "purple",
        },
        {
          id: "dashboard",
          icon: "chart",
          category: "AI DASHBOARDS",
          title: "Numbers that explain themselves",
          summary: "An internal dashboard that turns raw sales data into plain-English insights.",
          metric: { number: 60, decimals: 0, suffix: "%", label: "Less time spent digging through reports" },
          tone: "orange",
        },
      ],
    },
  });
});

// GET /api/testimonials
router.get("/testimonials", (req, res) => {
  res.json({
    eyebrow: "CLIENT VOICES",
    heading: "People who bet on us early, and stayed.",
    testimonials: [
      {
        id: "maren",
        quote:
          "We came to Devora with a rough sketch and a tight deadline. Three weeks later we had a working product that our own investors thought took months to build. They didn't just execute the brief — they questioned parts of it that didn't hold up.",
        name: "Maren Iqbal",
        role: "Co-founder, Fieldnote",
        company: "Fieldnote",
        tone: "teal",
      },
      {
        id: "devon",
        quote:
          "Our old vendor treated every change request like a negotiation. Devora treats it like Tuesday. We've shipped four major features since onboarding, and not one of them required a scope-change meeting.",
        name: "Devon Cole",
        role: "Head of Product, Ledger Works",
        company: "Ledger Works",
        tone: "purple",
      },
      {
        id: "priya",
        quote:
          "What sold me wasn't the pitch, it was the first demo. They'd already built a rough version of our onboarding flow before the kickoff call even happened. That's the kind of team you want building your product.",
        name: "Priya Shah",
        role: "CTO, Roost",
        company: "Roost",
        tone: "blue",
      },
      {
        id: "tomas",
        quote:
          "I've worked with five agencies in the last decade. Devora is the first one that told us not to build something we asked for, because the data didn't support it. That kind of honesty is rare and it saved us real money.",
        name: "Tomas Reyes",
        role: "Founder, Pier Logistics",
        company: "Pier Logistics",
        tone: "orange",
      },
    ],
  });
});

// GET /api/credentials
router.get("/credentials", (req, res) => {
  res.json({
    eyebrow: "WHY DEVORA",
    headingParts: [
      { text: "Small team.", accent: false },
      { text: "Serious credentials.", accent: true },
    ],
    subheading:
      "We stay lean on purpose, but every engineer on the bench is certified on the platforms your product will actually run on.",
    cta: { label: "Start a Conversation", href: "#contact" },
    platforms: [
      { name: "AWS", count: 12, max: 20, description: "Solutions architects and DevOps engineers, cloud-native from day one.", tone: "orange" },
      { name: "Vercel", count: 8, max: 20, description: "Deployment and edge infrastructure built the way the platform intends.", tone: "teal" },
      { name: "OpenAI", count: 6, max: 20, description: "API integration, fine-tuning, and prompt architecture certified.", tone: "purple" },
      { name: "MongoDB", count: 9, max: 20, description: "Schema design and performance tuning for data at scale.", tone: "blue" },
    ],
    badges: [
      { name: "Clutch Top Studio 2026", icon: "award" },
      { name: "SOC 2 In Progress", icon: "shield" },
      { name: "Y Combinator Startup School", icon: "spark" },
    ],
  });
});

// GET /api/podcasts
router.get("/podcasts", (req, res) => {
  res.json({
    eyebrow: "FEATURED CONVERSATIONS",
    heading: "Stories from people actually building things.",
    cta: { label: "All episodes", href: "/podcasts" },
    episodes: [
      {
        id: "bootstrapped",
        show: "BUILD IN PUBLIC",
        title: "Bootstrapping to $1M ARR Without a Single Ad",
        guest: "Layla Hassan",
        role: "Founder, Fieldnote",
        duration: "38 min",
        imageUrl:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
        tone: "teal",
      },
      {
        id: "ai-hype",
        show: "DEVORA UNSCRIPTED",
        title: "Why Most AI Features Are Solving the Wrong Problem",
        guest: "Marcus Webb",
        role: "CTO, Ledger Works",
        duration: "44 min",
        imageUrl:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
        tone: "purple",
      },
      {
        id: "solo-founder",
        show: "BUILD IN PUBLIC",
        title: "Running a 40k-User Marketplace Solo",
        guest: "Priya Shah",
        role: "Founder, Roost",
        duration: "29 min",
        imageUrl:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        tone: "blue",
      },
      {
        id: "legacy-rescue",
        show: "OUT OF SYNC",
        title: "Rescuing a Decade-Old Logistics System",
        guest: "Tomas Reyes",
        role: "Founder, Pier Logistics",
        duration: "51 min",
        imageUrl:
          "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
        tone: "orange",
      },
    ],
  });
});

// GET /api/journal
router.get("/journal", (req, res) => {
  res.json({
    eyebrow: "FROM THE DEVORA JOURNAL",
    heading: "Essays, breakdowns, and things we learned the hard way",
    cta: { label: "View all posts", href: "/journal" },
    featured: {
      category: "ENGINEERING",
      title: "We Rebuilt Our Own Onboarding Flow Three Times. Here's What Finally Worked.",
      excerpt:
        "Two failed rewrites taught us more about our own product than either of the successful launches did.",
      author: "Dana Ferreira",
      role: "Product Lead, Devora",
      date: "Aug 14, 2026",
      readTime: "7 min read",
      imageUrl:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
    },
    categories: ["All", "Engineering", "Design", "AI", "Business"],
    articles: [
      {
        id: "ai-cost",
        category: "AI",
        title: "The Real Cost of Bolting AI Onto a Product That Doesn't Need It",
        readTime: "5 min read",
        date: "Aug 2, 2026",
      },
      {
        id: "design-debt",
        category: "Design",
        title: "Design Debt Is Worse Than Tech Debt, and Nobody Tracks It",
        readTime: "6 min read",
        date: "Jul 26, 2026",
      },
      {
        id: "pricing-mvp",
        category: "Business",
        title: "How We Price Fixed-Scope Sprints Without Guessing",
        readTime: "4 min read",
        date: "Jul 19, 2026",
      },
      {
        id: "migration-story",
        category: "Engineering",
        title: "Migrating a Decade-Old Rails App Without a Feature Freeze",
        readTime: "8 min read",
        date: "Jul 10, 2026",
      },
      {
        id: "hiring-seniors",
        category: "Business",
        title: "Why We Stopped Hiring for 'Culture Fit'",
        readTime: "5 min read",
        date: "Jun 30, 2026",
      },
      {
        id: "prompt-arch",
        category: "AI",
        title: "Prompt Architecture Is a Real Engineering Discipline Now",
        readTime: "6 min read",
        date: "Jun 21, 2026",
      },
    ],
  });
});

// GET /api/cta
router.get("/cta", (req, res) => {
  res.json({
    heading: "Got something worth building?",
    subheading: "Tell us what you're stuck on. We'll tell you honestly if we're the right fit.",
    primaryCta: { label: "Start a Conversation", href: "/contact" },
    secondaryCta: { label: "See Our Process", href: "/process" },
  });
});

// GET /api/contact
router.get("/contact", (req, res) => {
  res.json({
    eyebrow: "CONTACT US",
    heading: "Let's build\nsomething worth\nshipping.",
    subheading: "We build AI into the workflows that decide your margins, not around them. Tell us where the work slows down.",
    partneredBy: {
      label: "PARTNERED BY",
      logos: ["AWS", "Vercel", "OpenAI", "MongoDB"],
    },
    quickLinks: [
      { icon: "briefcase", title: "Explore Careers", subtitle: "Apply for open roles", href: "/careers" },
      { icon: "handshake", title: "Partner With Us", subtitle: "Join our partner program", href: "/partners" },
    ],
    form: {
      lookingForOptions: [
        "Product Engineering",
        "AI Integration",
        "E-Commerce",
        "Fixed-Scope Sprint",
        "Ongoing Retainer",
        "Something Else",
      ],
      submitLabel: "Submit",
    },
  });
});

// GET /api/presence
router.get("/presence", (req, res) => {
  res.json({
    clients: {
      eyebrow: "TRUSTED BY BUILDERS EVERYWHERE",
      heading: "From first-time founders to funded teams.",
      logos: [
        "Fieldnote", "Ledger Works", "Roost", "Pier Logistics",
        "Northwind", "Halcyon", "Marrow", "Circuit & Co",
      ],
    },
    locations: {
      eyebrow: "WHERE WE WORK FROM",
      heading: "Remote-first, everywhere at once.",
      subheading:
        "No headquarters to visit, no time zone we can't cover. Our team is distributed across three continents and syncs daily.",
      cities: [
        {
          name: "Austin, United States",
          detail: "Product & client strategy",
          imageUrl: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?q=80&w=900&auto=format&fit=crop",
        },
        {
          name: "Lisbon, Portugal",
          detail: "Core engineering team",
          imageUrl: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=900&auto=format&fit=crop",
        },
        {
          name: "Lahore, Pakistan",
          detail: "AI & platform engineering",
          imageUrl: "https://images.unsplash.com/photo-1592635196078-9fbdc02cd0c1?q=80&w=900&auto=format&fit=crop",
        },
      ],
    },
  });
});

// GET /api/about
router.get("/about", (req, res) => {
  res.json({
    eyebrow: "ABOUT DEVORA",
    heading: "Small enough to care.\nSharp enough to ship.",
    subheading:
      "We turned down bigger clients to stay a team that still reviews every line of code that goes out the door. That's the trade we'd make again.",
    primaryCta: { label: "Work With Us", href: "/contact" },
    stats: [
      { value: 34, suffix: "+", label: "Engineers on the bench" },
      { value: 7, suffix: "", label: "Countries represented" },
      { value: 3, suffix: "", label: "Continents, one team" },
      { value: 7, suffix: "+", label: "Years shipping products" },
    ],
    trustedBy: ["TechCrunch", "The Next Web", "Product Hunt", "Indie Hackers", "Hacker News"],
  });
});

// GET /api/insights
router.get("/insights", (req, res) => {
  res.json({
    eyebrow: "FROM THE DEVORA JOURNAL",
    heading: "Things we've been thinking about.",
    viewAllHref: "/blog",
    items: [
      {
        id: "ai-noise",
        tag: "BLOG",
        meta: "6 min read",
        title: "Where AI actually helps, and where it's just noise",
        description: "The workflows where AI creates real leverage — and the ones where it only adds friction.",
        cta: "Read the article",
        href: "/blog/where-ai-actually-helps",
        image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "briefing-guide",
        tag: "GUIDE",
        meta: "5 min read",
        title: "A founder's guide to briefing a dev shop",
        description: "What to bring to the first call so week one is building, not guessing.",
        cta: "Read the guide",
        href: "/blog/briefing-a-dev-shop",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
      },
      {
        id: "boring-parts",
        tag: "BLOG",
        meta: "4 min read",
        title: "Why we build the boring parts first",
        description: "Auth, deploys, and error handling aren't glamorous — but they're what keeps a fast-moving product from breaking.",
        cta: "Read the article",
        href: "/blog/boring-parts-first",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  });
});

// GET /api/mission-vision
router.get("/mission-vision", (req, res) => {
  res.json({
    eyebrow: "WHO WE ARE",
    heading: "Mission, vision, and philosophy",
    items: [
      {
        label: "OUR MISSION",
        text: "To help ambitious teams build software that actually works — combining full-stack engineering with practical AI, delivered by people who stick around after launch.",
      },
      {
        label: "OUR VISION",
        text: "We see a future where every small business has access to the same quality of software big tech companies take for granted — powered by AI that actually helps, not just impresses.",
      },
      {
        label: "OUR PHILOSOPHY",
        text: "We ship fast without cutting corners, we're honest about trade-offs even when it's inconvenient, and we treat every project like it's going to matter in five years, not five weeks.",
      },
    ],
  });
});

// GET /api/values
router.get("/values", (req, res) => {
  res.json({
    eyebrow: "OUR VALUES",
    heading: "The standards behind every decision we make",
    subheading: "Five principles that guide every project, every decision, and every conversation at Devora.",
    values: [
      {
        icon: "heart",
        title: "Customer Centricity",
        description: "We measure our work by how it lands for the people using it, not just whether it's technically 'done'.",
      },
      {
        icon: "shield",
        title: "Ownership",
        description: "We take responsibility for outcomes, not just tasks — and stay accountable until things actually work.",
      },
      {
        icon: "scale",
        title: "Integrity",
        description: "We tell clients the truth, even when 'no' or 'not yet' is the harder answer to give.",
      },
      {
        icon: "bulb",
        title: "Simplicity",
        description: "We reach for the simplest solution that solves the real problem, not the most impressive-sounding one.",
      },
      {
        icon: "eye",
        title: "Transparency",
        description: "Clear updates, honest timelines, and no surprises on the invoice.",
      },
    ],
    conduct: {
      eyebrow: "HOW WE WORK",
      heading: "How we work with you",
      description:
        "A short, plain-language document covering how we handle your data, your deadlines, and your money — no legal jargon required.",
      cta: { label: "Read how we work", href: "/how-we-work" },
    },
  });
});


//backend/routes/content.routes.js

// GET /api/career
router.get("/career", (req, res) => {
  res.json({
    tag: "Careers",
    headline: "We hire people\nwho ship, not\njust plan.",
    subheadline:
      "Devora is a small studio, on purpose. Every engineer and designer here owns real product decisions from day one, working directly with the founders and the clients — not routed through five layers of process.",
    primaryCta: { label: "See open roles", href: "/careers/roles" },
    secondaryCta: { label: "Watch how we work", href: "#story" },
    stats: [
      { value: "18+", label: "Engineers & designers" },
      { value: "9", label: "Countries represented" },
      { value: "6", label: "Years, zero layoffs" },
    ],
    growthCard: {
      title: "Career paths that flex with you",
      body: "Move between product, platform, and client-facing work as your interests shift — nothing here is a fixed lane.",
      tags: ["Mentorship", "Internal mobility"],
    },
    hybridCard: {
      title: "Hybrid, by default",
      detail: "3 days in the studio, 2 wherever you focus best.",
    },
    learningCard: {
      label: "Learning time used",
      value: 92,
      caption: "of the team used their learning budget last year",
    },
    quote: {
      text: "I came in to write backend code and ended up leading the redesign of our own design system within a year. Nobody here waits to be assigned interesting work.",
      name: "Ayesha K.",
      role: "Staff Engineer",
    },
  });
});

// GET /api/career-stages
router.get("/career-stages", (req, res) => {
  res.json({
    tag: "Start here",
    heading: "Wherever you are, there's a path in",
    subheading: "Every open role is tagged to a career stage, so the roles you see match where you actually are.",
    stages: [
      {
        number: "01",
        title: "Graduate & Early Career",
        description: "Internships, associate programs, and your first two years as a professional engineer.",
        ctaLabel: "See graduate roles",
        href: "/careers/roles?stage=graduate",
      },
      {
        number: "02",
        title: "Experienced Hires",
        description: "Mid to senior roles across engineering, delivery, sales, and corporate functions.",
        ctaLabel: "See experienced roles",
        href: "/careers/roles?stage=experienced",
      },
      {
        number: "03",
        title: "Leadership",
        description: "Team leads and above — own delivery, grow a practice, shape how we build.",
        ctaLabel: "See leadership roles",
        href: "/careers/roles?stage=leadership",
      },
    ],
  });
});

// GET /api/life-at-devora
router.get("/life-at-devora", (req, res) => {
  res.json({
    tag: "Your future",
    heading: "Build a career that keeps moving forward",
    subheading:
      "At Devora, you'll find room to learn fast, own real decisions, and grow alongside people who push you to get better.",
    ctaLabel: "Explore life at Devora",
    ctaHref: "/life-at-devora",
    stories: [
      {
        initials: "HR",
        quote:
          "I joined as a junior developer and within two years I was leading the platform team. Nobody here waits for a title to hand you real ownership.",
        name: "Hamza Raza",
        role: "Senior Engineering Lead, Devora",
      },
      {
        initials: "SN",
        quote:
          "What kept me here is how much cross-team exposure I get. I've worked on client delivery, internal tooling, and hiring, all in the same year.",
        name: "Sana Nawaz",
        role: "Product Designer, Devora",
      },
      {
        initials: "AB",
        quote:
          "Growth here isn't a yearly review conversation, it's built into how projects are staffed. I keep getting handed problems slightly bigger than I'm ready for.",
        name: "Ali Bukhari",
        role: "Associate Tech Lead, Devora",
      },
      {
        initials: "MF",
        quote:
          "Recruiting for a studio this size means every hire matters. I've had a direct hand in shaping the team, not just filling seats.",
        name: "Mahnoor Fatima",
        role: "Talent Lead, Devora",
      },
    ],
  });
});

// GET /api/career-pathway
router.get("/career-pathway", (req, res) => {
  res.json({
    tag: "Career pathways",
    heading: "Your growth, our priority",
    steps: [
      {
        number: 1,
        title: "Associate Software Engineer",
        years: "0–1 yrs",
        detail: "Paired with a mentor, shipping real features from week one.",
      },
      {
        number: 2,
        title: "Software Engineer",
        years: "1–3 yrs",
        detail: "Owns a feature area end to end, from spec to production.",
      },
      {
        number: 3,
        title: "Senior Software Engineer",
        years: "3–5 yrs",
        detail: "Sets technical direction for a project and reviews others' work.",
      },
      {
        number: 4,
        title: "Associate Team Lead",
        years: "5–7 yrs",
        detail: "Splits time between building and guiding a small team.",
      },
      {
        number: 5,
        title: "Team Lead",
        years: "7+ yrs",
        detail: "Owns delivery across a team and shapes how the studio builds.",
      },
    ],
  });
});

// GET /api/benefits
router.get("/benefits", (req, res) => {
  res.json({
    tag: "Benefits",
    heading: "Where great careers take shape",
    categories: [
      {
        title: "Health & Wellness",
        items: [
          "Full outpatient & inpatient coverage",
          "Mental health sessions covered",
          "Gym & fitness allowance",
          "Paid parental leave",
        ],
      },
      {
        title: "Growth & Learning",
        items: [
          "Certification reimbursement",
          "Internal mobility program",
          "1:1 mentorship matching",
          "Conference sponsorship",
        ],
      },
      {
        title: "Everyday Perks",
        items: [
          "Commute & fuel allowance",
          "Hybrid work by default",
          "Work-from-anywhere weeks",
          "Equity for every full-timer",
        ],
      },
    ],
  });
});

// GET /api/inclusion-stats
router.get("/inclusion-stats", (req, res) => {
  res.json({
    tag: "Diversity, equity & inclusion",
    heading: "A page of its own,\nnot a single line of copy",
    subheading:
      "We're building a studio where the ladder above looks the same regardless of where you started. Here's where we stand today, and what we're working on next.",
    stats: [
      { value: "40+", label: "Women in technical roles" },
      { value: "9+", label: "Nationalities represented" },
      { value: "85+", label: "Employees in L&D sessions yearly" },
      { value: "100%", label: "Pay equity across genders" },
    ],
  });
});

// GET /api/hiring-process
router.get("/hiring-process", (req, res) => {
  res.json({
    tag: "Process",
    heading: "Hiring process",
    steps: [
      {
        number: "01",
        title: "Take the first step",
        description: "Apply through our careers page. Our team reviews every application and reaches out if your background fits an open role.",
      },
      {
        number: "02",
        title: "Intro call",
        description: "A conversation with our recruiting team about your experience, what you're looking for, and what the role actually involves.",
      },
      {
        number: "03",
        title: "Technical round",
        description: "A practical assessment or pairing session with the team you'd join, scoped to real problems, not trivia.",
      },
      {
        number: "04",
        title: "Offer & onboarding",
        description: "If it's a match, we move fast on the offer and walk you through onboarding so your first week actually feels useful.",
      },
    ],
  });
});

// GET /api/open-roles
router.get("/open-roles", (req, res) => {
  res.json({
    tag: "Open roles",
    heading: "Find your next role at Devora",
    filters: ["All", "Engineering", "AI & Data", "Design", "Cloud & DevOps"],
    ctaLabel: "Explore positions",
    ctaHref: "/careers/roles",
    roles: [
      {
        slug: "senior-full-stack-developer",
        title: "Senior Full-Stack Developer",
        postedAgo: "Posted 2 days ago",
        location: "On-site",
        place: "Lahore, Punjab, Pakistan",
        team: "Full-Stack Development",
        type: "Full-time",
        category: "Engineering",
      },
      {
        slug: "frontend-engineer-web-development",
        title: "Frontend Engineer — Web Development",
        postedAgo: "Posted 3 days ago",
        location: "Hybrid",
        place: "Lahore, Punjab, Pakistan",
        team: "Web Development",
        type: "Full-time",
        category: "Engineering",
      },
      {
        slug: "ai-llm-solutions-engineer",
        title: "AI/LLM Solutions Engineer",
        postedAgo: "Posted 5 days ago",
        location: "Remote",
        place: "Pakistan",
        team: "AI & LLM Solutions",
        type: "Full-time",
        category: "AI & Data",
      },
      {
        slug: "product-engineer-saas-platforms",
        title: "Product Engineer — SaaS Platforms",
        postedAgo: "Posted 6 days ago",
        location: "On-site",
        place: "Lahore, Punjab, Pakistan",
        team: "SaaS & Product Development",
        type: "Full-time",
        category: "Engineering",
      },
      {
        slug: "ecommerce-developer-shopify",
        title: "E-Commerce Developer (Shopify)",
        postedAgo: "Posted 8 days ago",
        location: "On-site",
        place: "Lahore, Punjab, Pakistan",
        team: "E-Commerce Development",
        type: "Full-time",
        category: "Engineering",
      },
      {
        slug: "product-designer-design-systems",
        title: "Product Designer — Design Systems",
        postedAgo: "Posted 9 days ago",
        location: "Hybrid",
        place: "Lahore, Punjab, Pakistan",
        team: "UI/UX & Design Systems",
        type: "Full-time",
        category: "Design",
      },
      {
        slug: "devops-engineer",
        title: "DevOps Engineer",
        postedAgo: "Posted 11 days ago",
        location: "Remote",
        place: "Pakistan",
        team: "Cloud & DevOps",
        type: "Full-time",
        category: "Cloud & DevOps",
      },
      {
        slug: "integrations-engineer-apis",
        title: "Integrations Engineer — APIs",
        postedAgo: "Posted 13 days ago",
        location: "On-site",
        place: "Lahore, Punjab, Pakistan",
        team: "API & Integrations",
        type: "Contract",
        category: "Engineering",
      },
    ],
  });
});

// GET /api/all-roles
router.get("/all-roles", (req, res) => {
  res.json({
    heading: "Careers at Devora",
    subheading:
      "We're building product teams for startups and enterprises worldwide. Here's what we're currently hiring for.",
    listHeading: "Job Openings",
    roles: [
      { slug: "senior-full-stack-developer", title: "Senior Full-Stack Developer", postedAgo: "Posted 2 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "Full-Stack Development", type: "Full-time" },
      { slug: "frontend-engineer-web-development", title: "Frontend Engineer — Web Development", postedAgo: "Posted 3 days ago", workplaceType: "Hybrid", location: "Lahore, Punjab, Pakistan", department: "Web Development", type: "Full-time" },
      { slug: "ai-llm-solutions-engineer", title: "AI/LLM Solutions Engineer", postedAgo: "Posted 5 days ago", workplaceType: "Remote", location: "Pakistan", department: "AI & LLM Solutions", type: "Full-time" },
      { slug: "product-engineer-saas-platforms", title: "Product Engineer — SaaS Platforms", postedAgo: "Posted 6 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "SaaS & Product Development", type: "Full-time" },
      { slug: "ecommerce-developer-shopify", title: "E-Commerce Developer (Shopify)", postedAgo: "Posted 8 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "E-Commerce Development", type: "Full-time" },
      { slug: "product-designer-design-systems", title: "Product Designer — Design Systems", postedAgo: "Posted 9 days ago", workplaceType: "Hybrid", location: "Lahore, Punjab, Pakistan", department: "UI/UX & Design Systems", type: "Full-time" },
      { slug: "devops-engineer", title: "DevOps Engineer", postedAgo: "Posted 11 days ago", workplaceType: "Remote", location: "Pakistan", department: "Cloud & DevOps", type: "Full-time" },
      { slug: "integrations-engineer-apis", title: "Integrations Engineer — APIs", postedAgo: "Posted 13 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "API & Integrations", type: "Contract" },
      { slug: "qa-automation-engineer", title: "QA Automation Engineer", postedAgo: "Posted 15 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "Full-Stack Development", type: "Full-time" },
      { slug: "backend-engineer-nodejs", title: "Backend Engineer — Node.js", postedAgo: "Posted 17 days ago", workplaceType: "Hybrid", location: "Lahore, Punjab, Pakistan", department: "Web Development", type: "Full-time" },
      { slug: "junior-frontend-developer", title: "Junior Frontend Developer", postedAgo: "Posted 19 days ago", workplaceType: "On-site", location: "Lahore, Punjab, Pakistan", department: "Web Development", type: "Full-time" },
    ],
  });
});

// GET /api/roles/:slug
const ROLE_DETAILS = {
  "senior-full-stack-developer": {
    title: "Senior Full-Stack Developer",
    workplaceType: "On-site",
    type: "Full-time",
    department: "Full-Stack Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "Devora is looking for a Senior Full-Stack Developer to build and scale product features end to end, from data models to the interface, for our client and internal platforms.",
    responsibilities: [
      "Design, build, and ship features across the stack using Next.js, Node.js, and PostgreSQL",
      "Own architecture decisions for the projects you lead, and review the decisions of others",
      "Work directly with designers and clients to turn specs into shipped, tested code",
      "Improve build performance, test coverage, and deployment reliability over time",
    ],
    requirements: [
      "4+ years of professional full-stack development experience",
      "Strong command of React/Next.js and a Node.js backend framework",
      "Comfortable owning a feature from spec through production monitoring",
      "Experience with relational databases and basic infrastructure (CI/CD, containers)",
    ],
  },
  "frontend-engineer-web-development": {
    title: "Frontend Engineer — Web Development",
    workplaceType: "Hybrid",
    type: "Full-time",
    department: "Web Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "We're hiring a Frontend Engineer to build fast, accessible marketing sites and web apps for Devora's clients, working closely with design from the first wireframe to launch.",
    responsibilities: [
      "Build responsive interfaces in React/Next.js from Figma designs",
      "Implement animation and interaction details that match the design intent",
      "Optimize for Core Web Vitals and cross-browser consistency",
      "Pair with backend engineers to wire up real data and forms",
    ],
    requirements: [
      "2+ years building production web interfaces",
      "Strong CSS fundamentals and comfort with a utility framework like Tailwind",
      "Experience turning a static design into a fully responsive build",
      "An eye for the small details that make an interface feel finished",
    ],
  },
  "ai-llm-solutions-engineer": {
    title: "AI/LLM Solutions Engineer",
    workplaceType: "Remote",
    type: "Full-time",
    department: "AI & LLM Solutions",
    location: "Pakistan",
    description:
      "Join Devora's AI practice to design and ship LLM-powered features for client products — from prompt design to production-grade retrieval pipelines.",
    responsibilities: [
      "Design and evaluate prompting strategies and retrieval pipelines for client use cases",
      "Integrate LLM APIs into production applications with proper monitoring and fallbacks",
      "Work with clients to scope what's actually feasible with current model capabilities",
      "Keep the team current on new models, tooling, and techniques worth adopting",
    ],
    requirements: [
      "Hands-on experience building with LLM APIs (OpenAI, Anthropic, or similar) in production",
      "Solid Python or TypeScript skills",
      "Understanding of RAG, embeddings, and evaluation methods for generative systems",
      "Comfortable explaining trade-offs to non-technical stakeholders",
    ],
  },
  "product-engineer-saas-platforms": {
    title: "Product Engineer — SaaS Platforms",
    workplaceType: "On-site",
    type: "Full-time",
    department: "SaaS & Product Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "We're looking for a Product Engineer to help build Devora's own SaaS products end to end — from customer interviews to shipped features.",
    responsibilities: [
      "Build multi-tenant SaaS features covering billing, permissions, and onboarding flows",
      "Talk directly to users to validate what's worth building next",
      "Balance speed of iteration with the stability paying customers expect",
      "Contribute to product strategy, not just implementation",
    ],
    requirements: [
      "3+ years building and shipping SaaS products",
      "Experience with subscription billing and multi-tenant architecture",
      "Comfortable moving between product thinking and hands-on code",
      "Bias toward shipping and iterating over long planning cycles",
    ],
  },
  "ecommerce-developer-shopify": {
    title: "E-Commerce Developer (Shopify)",
    workplaceType: "On-site",
    type: "Full-time",
    department: "E-Commerce Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "Build and customize Shopify storefronts and apps for Devora's e-commerce clients, from theme development to checkout and app integrations.",
    responsibilities: [
      "Develop custom Shopify themes and sections using Liquid, React, and the Storefront API",
      "Build and maintain Shopify apps for client-specific workflows",
      "Optimize storefronts for page speed and conversion",
      "Troubleshoot integration issues with payment and fulfillment providers",
    ],
    requirements: [
      "2+ years of Shopify theme or app development",
      "Working knowledge of Liquid, JavaScript, and the Shopify Admin/Storefront APIs",
      "Experience with at least one other e-commerce platform is a plus",
      "Comfortable working directly with merchant clients",
    ],
  },
  "product-designer-design-systems": {
    title: "Product Designer — Design Systems",
    workplaceType: "Hybrid",
    type: "Full-time",
    department: "UI/UX & Design Systems",
    location: "Lahore, Punjab, Pakistan",
    description:
      "We're looking for a Product Designer to own and grow Devora's design system, and to bring that same rigor to client work across the studio.",
    responsibilities: [
      "Maintain and extend Devora's shared component library and design tokens",
      "Design end-to-end flows for client products, from wireframe to high-fidelity",
      "Partner with engineers to make sure designs ship as intended",
      "Run lightweight usability checks before features go live",
    ],
    requirements: [
      "3+ years of product design experience, ideally with a design system background",
      "Strong Figma skills, including component and variant management",
      "Comfortable presenting and defending design decisions to clients",
      "Some understanding of frontend implementation constraints",
    ],
  },
  "devops-engineer": {
    title: "DevOps Engineer",
    workplaceType: "Remote",
    type: "Full-time",
    department: "Cloud & DevOps",
    location: "Pakistan",
    description:
      "Help Devora's engineering teams ship faster and more safely by owning our CI/CD pipelines, cloud infrastructure, and monitoring.",
    responsibilities: [
      "Design and maintain CI/CD pipelines across multiple client projects",
      "Manage cloud infrastructure on AWS/GCP using infrastructure as code",
      "Set up monitoring, alerting, and incident response practices",
      "Work with engineering teams to remove deployment friction",
    ],
    requirements: [
      "3+ years in a DevOps or infrastructure engineering role",
      "Experience with Terraform or similar IaC tooling",
      "Strong Linux fundamentals and container orchestration experience",
      "Comfortable being the on-call point of contact for infrastructure issues",
    ],
  },
  "integrations-engineer-apis": {
    title: "Integrations Engineer — APIs",
    workplaceType: "On-site",
    type: "Contract",
    department: "API & Integrations",
    location: "Lahore, Punjab, Pakistan",
    description:
      "Build and maintain the integrations that connect client systems together — payment gateways, CRMs, and internal APIs.",
    responsibilities: [
      "Design and build REST/GraphQL APIs for internal and client-facing use",
      "Integrate third-party services (payments, CRMs, messaging platforms) into client products",
      "Write clear API documentation for other engineers and clients",
      "Handle authentication, rate limiting, and error handling correctly the first time",
    ],
    requirements: [
      "2+ years building and consuming APIs in production",
      "Experience with OAuth and API authentication patterns",
      "Comfortable reading third-party API docs and working around their limitations",
      "Contract engagement, with the possibility of extension",
    ],
  },
  "qa-automation-engineer": {
    title: "QA Automation Engineer",
    workplaceType: "On-site",
    type: "Full-time",
    department: "Full-Stack Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "Help Devora ship with confidence by building automated test coverage across our client projects and internal tools.",
    responsibilities: [
      "Design and maintain automated test suites (unit, integration, end-to-end)",
      "Set up test pipelines that run on every pull request",
      "Work with engineers to catch regressions before they reach production",
      "Track and report on quality metrics across projects",
    ],
    requirements: [
      "2+ years in QA automation, with real ownership of a test suite",
      "Experience with a modern e2e framework (Playwright, Cypress, or similar)",
      "Comfortable reading application code to understand what to test",
      "Detail-oriented, without slowing the team down unnecessarily",
    ],
  },
  "backend-engineer-nodejs": {
    title: "Backend Engineer — Node.js",
    workplaceType: "Hybrid",
    type: "Full-time",
    department: "Web Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "Build reliable backend services for Devora's client projects, from API design to database schema to production monitoring.",
    responsibilities: [
      "Design and build REST/GraphQL APIs using Node.js and Express or a similar framework",
      "Model and optimize relational and document database schemas",
      "Write tests and monitoring that catch problems before customers do",
      "Collaborate with frontend engineers on API contracts",
    ],
    requirements: [
      "2+ years of backend development in Node.js",
      "Comfortable designing a database schema from a product spec",
      "Understanding of authentication, caching, and API security basics",
      "Can explain technical trade-offs clearly to non-engineers",
    ],
  },
  "junior-frontend-developer": {
    title: "Junior Frontend Developer",
    workplaceType: "On-site",
    type: "Full-time",
    department: "Web Development",
    location: "Lahore, Punjab, Pakistan",
    description:
      "A great entry point into professional frontend development — you'll work alongside senior engineers on real client projects from day one.",
    responsibilities: [
      "Build UI components from Figma designs under senior engineer guidance",
      "Fix bugs and small features in existing client codebases",
      "Learn our React/Next.js conventions and testing practices",
      "Take part in code review, both giving and receiving feedback",
    ],
    requirements: [
      "0–1 years of professional experience, or strong personal/academic projects",
      "Solid HTML, CSS, and JavaScript fundamentals",
      "Some exposure to React",
      "Eager to learn and take feedback well",
    ],
  },
};

router.get("/roles/:slug", (req, res) => {
  const role = ROLE_DETAILS[req.params.slug];
  if (!role) return res.status(404).json({ error: "Role not found" });
  res.json(role);
});

// GET /api/life-at-devora-hero
router.get("/life-at-devora-hero", (req, res) => {
  res.json({
    tag: "Life at Devora",
    headline: "Where everyday\nbecomes\nextraordinary.",
    subheadline:
      "Get a glimpse into the everyday at Devora, from the people and spaces we share to the events, experiences, and moments that bring our culture to life.",
    primaryCta: { label: "Explore our event highlights", href: "#highlights" },
    secondaryCta: { label: "Explore open roles", href: "/careers/roles" },
    stats: [
      { value: "40+", label: "Events hosted a year" },
      { value: "20,000+", label: "Cumulative attendance" },
      { value: "6", label: "Onsite amenities" },
    ],
  });
});

// GET /api/moments-gallery
router.get("/moments-gallery", (req, res) => {
  res.json({
    tag: "Moments from this year",
    heading: "Moments that say more than a mission statement",
    subheading:
      "The calendar our teams actually show up for. From Her Revolution and Jashn-e-Baharan to Qawali Nights, sports, meetups, and everything in between, these are the moments that bring our culture to life.",
    moments: [
      { id: 1, label: "Qawali Night" },
      { id: 2, label: "Basant" },
      { id: 3, label: "Khel ka Junoon 2026" },
      { id: 4, label: "Jashn-e-Baharan 2026" },
      { id: 5, label: "Sports Day" },
      { id: 6, label: "Her Revolution" },
      { id: 7, label: "Team Iftar" },
      { id: 8, label: "Annual Meetup" },
    ],
  });
});

// GET /api/day-in-the-life
router.get("/day-in-the-life", (req, res) => {
    res.json({
        tag: "A day in the life",
        heading: "How a Devora developer spends their day",
        subheading: "A normal working day here, so you know exactly what you're signing up for.",
        moments: [
            { id: 1, time: "9:00 AM", title: "Check-in & coffee", caption: "Badge in, quick coffee run" },
            { id: 2, time: "9:30 AM", title: "Stand-up", caption: "15-min team sync" },
            { id: 3, time: "10:00 AM", title: "Pairing session", caption: "Two devs, one problem" },
            { id: 4, time: "11:00 AM", title: "Deep focus block", caption: "Heads down, headphones on" },
            { id: 5, time: "1:00 PM", title: "Lunch & relax", caption: "Good food, good company" },
            { id: 6, time: "4:00 PM", title: "Gym or nap room", caption: "Recharge, either way" },
            { id: 7, time: "6:00 PM", title: "Wrap & wind down", caption: "PR merged, day done" },
        ],
    });
});

// GET /api/spaces-amenities
router.get("/spaces-amenities", (req, res) => {
    res.json({
        tag: "Spaces & amenities",
        heading: "Built for more than just desks",
        subheading: "The physical spaces that back up the culture claims, open to everyone every day.",
        spaces: [
            { id: 1, title: "Nap Rooms", caption: "Some working days need a reset" },
            { id: 2, title: "Rooftop Restaurant", caption: "Lunch with a skyline view" },
            { id: 3, title: "Day Care", caption: "One less thing for working parents" },
            { id: 4, title: "Games Lounge", caption: "One more game, always" },
            { id: 5, title: "Salon", caption: "Grooming, on us" },
            { id: 6, title: "Gym", caption: "Full setup, open all day" },
        ],
    });
});

// GET /api/workforce-diversity
router.get("/workforce-diversity", (req, res) => {
    res.json({
        tag: "Diversity of our workforce",
        heading: "Who makes up the floor",
        subheading: "A snapshot of who we are today, updated annually alongside our DEI commitments.",
        stats: [
            { value: "1,200+", label: "Diverse tech team across regions & cultures" },
            { value: "5+", label: "Nationalities represented" },
            { value: "100+", label: "Women representation in engineering" },
            { value: "100%", label: "Pay equity across genders" },
        ],
    });
});

// GET /api/life-cta
router.get("/life-cta", (req, res) => {
    res.json({
        heading: "Your next chapter starts here.",
        body:
            "Life at Devora is about more than the work we do. It's about the people, opportunities, and experiences that help you grow along the way. Join our global team where ambitious ideas become real-world impact.",
        ctaLabel: "Explore Careers",
        ctaHref: "/careers/roles",
    });
});


// GET /api/journal
router.get("/journal", (req, res) => {
  res.json({
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
    listenOn: [
      { id: "spotify", label: "Spotify", href: "#" },
      { id: "apple", label: "Apple Podcasts", href: "#" },
      { id: "youtube", label: "YouTube", href: "#" },
    ],
    keyTakeaways: [
      "Fast teams aren't the ones skipping steps — they're the ones who never revisit finished work.",
      "A design system isn't overhead, it's the thing that prevents overhead later.",
      "Technical debt compounds faster than most founders expect in the first 6 months.",
    ],
    sections: [
      {
        id: "intro",
        heading: "The myth of moving fast",
        paragraphs: [
          "Every founder we talk to wants speed. Fewer of them ask what speed actually costs...",
          "Second paragraph here...",
        ],
        pullQuote: { quote: "Speed without a foundation is just borrowed time.", attribution: "Alex Rivera" },
      },
      {
        id: "foundations",
        heading: "What a 'boring' foundation buys you",
        paragraphs: ["..."],
        statCallout: [
          { value: "3x", label: "Slower feature velocity after 6 months without a design system" },
          { value: "60%", label: "Of eng time in unstructured codebases goes to rework" },
          { value: "2 wks", label: "Avg. time saved per feature with a mature component library" },
        ],
      },
      // ...more sections
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
    relatedEpisodes: [
      {
        id: "ep2",
        title: "How to hire your first design partner",
        excerpt: "What to look for before your first full-time design hire.",
        imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
        duration: "18 min",
        href: "/resources/hiring-design",
      },
      // ...more
    ],
  });
});

// GET /api/blogs
router.get("/blogs", (req, res) => {
  res.json({
    eyebrow: "INSIGHTS & UPDATES",
    heading: "Ideas on design, engineering,\nand building without breaking things.",
    subheading: "Notes from the team on what we're building, learning, and rethinking.",
    categories: ["Engineering", "Design", "Product", "Culture"],
    featured: {
      id: "design-systems-2026",
      title: "Why every fast-moving startup needs a design system by month 3",
      excerpt: "The cost of skipping this step doesn't show up immediately — it shows up in month six, in every sprint after.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      tag: "Design",
      author: "Alex Rivera",
      date: "Sep 18, 2026",
      readTime: "6 min read",
      href: "/resources/blogs/design-systems-2026",
    },
    posts: [
      {
        id: "async-first-teams",
        title: "What async-first actually means (it's not just Slack)",
        excerpt: "Async isn't a communication style, it's an architecture decision for how your team makes decisions.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        tag: "Culture",
        author: "Jamie Chen",
        date: "Sep 10, 2026",
        readTime: "4 min read",
        href: "/resources/blogs/async-first-teams",
      },
      // ...more posts
    ],
  });
});

// GET /api/podcasts
router.get("/podcasts", (req, res) => {
  res.json({
    eyebrow: "DEVORA UNSCRIPTED",
    heading: "Conversations on building\nwithout cutting corners.",
    subheading: "Founders, engineers, and designers talking through the decisions that actually mattered.",
    listenOn: [
      { id: "spotify", label: "Spotify", href: "#" },
      { id: "apple", label: "Apple Podcasts", href: "#" },
      { id: "youtube", label: "YouTube", href: "#" },
    ],
    categories: ["Engineering", "Founders", "Design"],
    featured: {
      id: "slow-foundations",
      episodeNumber: 12,
      title: "Why we build slow foundations for fast-moving startups",
      excerpt: "Our founder on why the fastest teams are the ones who refuse to cut corners on the boring parts.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      duration: "24 min",
      waveform: [12, 18, 9, 24, 30, 14, 20, 8, 26, 16, 22, 11],
      tag: "Founders",
      href: "/resources/journal",
    },
    episodes: [
      {
        id: "hiring-design",
        episodeNumber: 11,
        title: "How to hire your first design partner",
        excerpt: "What to look for before your first full-time design hire.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        duration: "18 min",
        waveform: [10, 22, 14, 28, 18, 24, 12, 20],
        tag: "Design",
        href: "/resources/podcasts/hiring-design",
      },
      // ...more episodes
    ],
  });
});

// GET /api/research-guides
router.get("/research-guides", (req, res) => {
  res.json({
    eyebrow: "RESEARCH & GUIDES",
    heading: "Frameworks and playbooks\nworth keeping on hand.",
    subheading: "Downloadable guides on the decisions that actually move product metrics.",
    categories: ["Engineering", "Design", "Growth"],
    featured: {
      id: "design-system-playbook",
      title: "The Design System Playbook",
      description: "A step-by-step framework for building a design system that survives contact with a real product team.",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
      tag: "Design",
      pages: 32,
      format: "PDF",
      href: "/downloads/design-system-playbook.pdf",
    },
    guides: [
      {
        id: "async-handbook",
        title: "The Async-First Handbook",
        description: "How to structure decisions, docs, and standups for a team that isn't all online at once.",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        tag: "Growth",
        pages: 18,
        format: "PDF",
        href: "/downloads/async-first-handbook.pdf",
      },
      // ...more guides
    ],
  });
});

// GET /api/news-media
router.get("/news-media", (req, res) => {
  res.json({
    eyebrow: "NEWS & MEDIA",
    heading: "What's happening at Devora\nand what people are saying.",
    subheading: "Announcements, press coverage, and everything you need to write about us.",
    asSeenIn: ["TechCrunch", "The Next Web", "Product Hunt", "Indie Hackers"],
    pressReleases: [
      {
        id: "series-a",
        date: "SEP 2, 2026",
        title: "Devora raises seed round to expand embedded product teams",
        excerpt: "The round will fund three new embedded teams and a research arm focused on design systems tooling.",
        href: "/news-media/seed-round",
      },
      // ...more releases
    ],
    coverage: [
      {
        id: "techcrunch-feature",
        publication: "TechCrunch",
        title: "This studio embeds with startups instead of billing by the hour",
        excerpt: "A look at how Devora's model differs from a traditional agency.",
        date: "Aug 14, 2026",
        imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop",
        href: "https://techcrunch.com/...",
      },
      // ...more coverage
    ],
    mediaKit: [
      { id: "logo-pack", title: "Logo pack (SVG + PNG)", format: "ZIP", fileSize: "2.4 MB", href: "/downloads/devora-logos.zip" },
      { id: "brand-guidelines", title: "Brand guidelines", format: "PDF", fileSize: "1.1 MB", href: "/downloads/devora-brand-guidelines.pdf" },
      { id: "screenshots", title: "Product screenshots", format: "ZIP", fileSize: "8.7 MB", href: "/downloads/devora-screenshots.zip" },
    ],
    contact: {
      name: "Jordan Lee",
      role: "Press & Communications",
      email: "press@devora.app",
      avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
    },
  });
});

module.exports = router;