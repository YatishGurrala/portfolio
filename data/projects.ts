import { Project } from "@/data/types";

export const projects: Project[] = [
  {
    title: "CiteGPT",
    slug: "citegpt",
    shortDescription: "AI website chatbot platform with cited answers, embeddable widgets, and a business-friendly SaaS dashboard.",
    description:
      "A B2B SaaS platform that trains custom AI chatbots on business website sitemaps, documents, and FAQs. It enables visitors to receive instant, citation-backed answers grounded in verified facts, while capturing contactable business leads directly inside the chat flow.",
    category: "AI and SaaS",
    tags: ["Next.js", "TypeScript", "RAG", "Embeddable widget", "Lead capture", "pgvector"],
    thumbnail: "/images/projects/citegpt/cover.svg",
    featured: true,
    caseStudyUrl: "/projects/citegpt",
    confidentiality: {
      status: "public",
      label: "Public project details",
    },
    role: "Founder & Full-Stack Product Developer",
    duration: "July 2026 - Present",
    projectType: "AI SaaS",
    heroSummary: "CiteGPT focuses on giving businesses a support and lead-capture chatbot that stays grounded in their own site content.",
    overview: {
      product: "A B2B SaaS platform combining sitemap crawling, HTML scraping, pgvector similarity searches, stateless JWT auth checks, and email infrastructure.",
      audience: "Businesses, startups, and service providers seeking to reduce customer-support questions and capture intent-driven leads.",
      purpose: "Provide a reliable, factual customer assistant that cites source pages and prevents ungrounded chatbot hallucinations.",
    },
    problem: [
      "Visitor Drop-off: Website visitors leave when questions about services, pricing, or booking are not answered at the moment of intent.",
      "Ungrounded AI Hallucinations: Generic chatbots lack factual boundaries and tend to invent pricing or policies, causing business liability.",
      "Configuration Friction: Businesses need to ingest knowledge sources, test prompts, capture customer leads, and embed a lightweight widget without complex code integration.",
    ],
    solution: [
      "Automatic Sitemap & URL Crawler: Crawls sitemaps and URLs, extracting clean article body text using specialized HTML parser readability engines.",
      "pgvector similarity retrieval: Generates semantic text embeddings and compares queries against chunked knowledge sources in PostgreSQL.",
      "Interactive Citation Tags: Attaches clickable references to source pages on every chatbot reply, allowing visitors to verify answers.",
      "Embeddable Widget & Lead Form: Serves a lightweight chat widget with isolated visitor sessions, secure public tokens, and active lead capture workflows.",
    ],
    responsibilities: [
      "Defined SaaS features, product scope, and database relations.",
      "Built sitemap parser pipelines and pgvector search queries.",
      "Designed and coded the dashboard interfaces, widget integration scripts, and Playground testing console.",
      "Implemented custom JWT-based authentication cookies and transactional email integrations.",
    ],
    keyFeatures: [
      { title: "Website & Sitemap Ingestion", description: "Crawl public websites and sitemaps, cleaning content using readability extractors." },
      { title: "RAG & pgvector Retrieval", description: "Run semantic vector comparisons in PostgreSQL to supply grounded context." },
      { title: "Interactive Source Citations", description: "Display clickable references linking directly to source pages on chatbot responses." },
      { title: "Stateless JWT Auth & Revocation", description: "Secure dashboard routes via JWT cookies with instant global revocation." },
      { title: "Brevo Transactional Emails", description: "Send user verification and password-reset messaging using transactional email APIs." },
      { title: "Resilient Lead Capture", description: "Extract customer contact details and intents directly within the visitor chat flow." },
    ],
    screenshots: [
      { src: "/images/projects/citegpt/cover.svg", alt: "CiteGPT dashboard cover illustration", caption: "Dashboard cover representation for CiteGPT.", type: "desktop" },
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js 16 App Router", "React 19 Server/Client Components", "Tailwind CSS", "Lucide Icons"] },
      { label: "Backend", items: ["Next.js Route Handlers (API endpoints)", "Prisma Client ORM mapping layer"] },
      { label: "Database", items: ["PostgreSQL (via Supabase / Neon)", "pgvector vector search extension", "Prisma Pg/Neon adapters"] },
      { label: "AI & External APIs", items: ["OpenAI API (Embeddings & GPT-4o)", "Brevo transactional email API", "Stripe Billing"] },
    ],
    challenges: [
      {
        challenge: "Grounded Responses & Citations: Restricting the LLM to factual sitemap chunks without losing conversation flow.",
        solution: "Configured pgvector semantic cosine similarity checks (1 - (c.embedding <=> formattedEmbedding)) via raw SQL query fetches in Prisma. Attached retrieved chunk metadata directly to prompt scopes, forcing the model to generate source-aligned replies with clickable citation tags.",
      },
      {
        challenge: "Database Infrastructure Portability: Migrating from Neon WebSockets to Supabase without rewriting database adapters or domain APIs.",
        solution: "Established a 'Replace Infrastructure, Do Not Rewrite Product Logic' architecture. Abstracted the database connection pool using a Proxy-backed Prisma client in db.ts. Swapping Neon (via serverless WebSockets adapter) for Supabase (via pg standard pool adapter) was achieved with environment variable changes, keeping product domain APIs completely untouched.",
      },
      {
        challenge: "Playground & Analytics Isolation: Preventing admin prompt testing from corrupting real website conversion analytics and lead data.",
        solution: "Implemented an isPlayground schema flag on chat sessions and leads. Isolated playground calls from analytics queries, and added an automated 7-day retention cron endpoint (/api/cron/cleanup-playground) to purge historical test logs while leaving visitor histories intact.",
      },
      {
        challenge: "Stateless Session Revocation: Ensuring JWT security cookies can be globally invalidated immediately upon password change.",
        solution: "Added a tokenVersion integer column to the User schema. During login, tokenVersion is signed into the JWT payload; during layout and API gates, it is compared against the database. Increments to tokenVersion during password resets revoke all other active sessions instantly.",
      },
    ],
    developmentProcess: [
      "Positioning Analysis: Mapped support bottlenecks and B2B lead-capture requirements.",
      "Data Modeling: Configured relation boundaries for Organizations, Bots, Knowledge Sources, Content Chunks, Chat Sessions, and Contactable Leads.",
      "Crawler Implementation: Built background scraping workers leveraging HTML content cleanups.",
      "RAG & Security Integration: Setup raw pgvector query adapters, JWT session revocation, and Brevo transactional notifications.",
    ],
    results: [
      "Completed a fully functioning B2B SaaS chatbot builder with sitemap crawling and citation tracking.",
      "Designed a highly portable DB schema allowing zero-downtime Neon-to-Supabase migration.",
      "Built a secure, isolated playground workspace with automated cron session cleaning.",
    ],
    lessonsLearned: [
      "A B2B SaaS product succeeds based on operational controls—such as session security, rate limits, and analytics isolation—just as much as the core AI features.",
      "Decoupling the database client under an execution proxy simplifies cloud provider migrations and reduces technical debt.",
      "Showing interactive citation links improves conversion rates by transforming chat windows from standard text boxes into verified navigation maps.",
    ],
    nextSteps: [
      "Support PDF, DOCX, and CSV ingestion alongside HTML sitemaps.",
      "Add custom widget customization settings (avatar icons, CSS variables).",
    ],
    liveUrl: "https://citegpt.xyz",
  },
  {
    title: "ResumeLoopAI",
    slug: "resumeloop-ai",
    shortDescription: "AI-powered career assistant for resume analysis, content generation, and job-search workflow support.",
    description:
      "A career operating system designed to eliminate fragmented job-search workflows. It replaces scattered spreadsheets, folders of document versions, and generic ChatGPT prompts with a unified platform for PDF parsing, dynamic AI-based resume alignment, cover letter generation, and Kanban application tracking.",
    category: "AI and SaaS",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "OpenAI", "Document Parsing"],
    thumbnail: "/images/projects/resumeloop-ai/cover.svg",
    featured: true,
    caseStudyUrl: "/projects/resumeloop-ai",
    confidentiality: {
      status: "public",
      label: "Public project details",
    },
    role: "Founder & Full-Stack Product Developer",
    duration: "January 2026 - Present",
    projectType: "AI Career SaaS",
    heroSummary: "ResumeLoopAI consolidates the job-search lifecycle by grounding AI assistance directly in your personal career history and target job specifications.",
    overview: {
      product: "A career assistant platform combining automated text-extraction engines, LLM-based alignment critics, structured JSON generators, and user progress boards.",
      audience: "Job seekers, developers, and career transitioners managing multiple parallel applications.",
      purpose: "Provide job seekers with a grounded, repeatable loop of resume tailoring and tracking that avoids generic LLM hallucination and column-parsing errors.",
    },
    problem: [
      "Fragmented Workflows: Job seekers are forced to coordinate documents, spreadsheets, and ChatGPT tabs, losing history and context.",
      "Context Hallucination: Generic AI systems lack local context of user accomplishments, resulting in overly generic or exaggerated resume descriptions.",
      "ATS Parsing Errors: Standard AI tools output PDF structures that automated applicant scanners reject due to unparseable layouts, multi-column shapes, or invalid table formats.",
    ],
    solution: [
      "Grounded Prompt Engine: Built a dynamic context-grounding pipeline that pairs the base user profile with job descriptions to produce accurate, realistic tailoring.",
      "ATS-Compliant Document Engine: Modeled layout patterns to ensure outputs match automated parsing specifications.",
      "Unified Application Hub: Built an end-to-end interface connecting resume parsing, alignment metrics, tailoring actions, and pipeline tracking.",
    ],
    responsibilities: [
      "Designed user journey mapping spanning discovery, import, tailoring, and progress tracking.",
      "Built structured context-grounding schemas to limit LLM output drift.",
      "Implemented a backend PDF processing utility with Node.js stream parsing.",
      "Designed and coded the dashboard, Kanban board, and version management interfaces in Next.js.",
    ],
    keyFeatures: [
      { title: "Job Discovery & Save", description: "Save target job specifications from external platforms directly into the applications tracker." },
      { title: "Resume Intelligence", description: "Run alignment scans that highlight keyword gaps, structural readability, and bullet-point strength." },
      { title: "Context-Grounded Tailoring", description: "Draft targeted bullet points and cover letters that align base accomplishments to specific job requirements." },
      { title: "Kanban Tracking Pipeline", description: "Organize applications across stages (Saved, Ready, Applied, Interviewing, Offer) in a clean dashboard." },
    ],
    screenshots: [
      { src: "/images/projects/resumeloop-ai/cover.svg", alt: "ResumeLoopAI dashboard cover illustration", caption: "Dashboard cover representation for ResumeLoopAI.", type: "desktop" },
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js App Router", "React 18 Server/Client Components", "Tailwind CSS", "Lucide React Icons"] },
      { label: "Backend", items: ["Next.js Route Handlers (API endpoints)", "Node.js stream-based file processing"] },
      { label: "Database & Storage", items: ["PostgreSQL database", "Supabase client connection pooler", "Prisma ORM mapping layer"] },
      { label: "AI & External APIs", items: ["OpenAI API SDK", "Structured JSON output parser with Zod schema validation (for API requests) and orchestrator-level validation checks (for AI responses)", "PDF-parse engine"] },
    ],
    challenges: [
      {
        challenge: "Unstructured PDF Parsing: Extracting text from diverse resume layouts (multi-column, tables, custom borders) without losing section integrity.",
        solution: "Implemented pdf-parse text extraction backed by a custom zlib decompression stream search fallback to extract text from compressed PDF streams, utilizing regex layout segment filtering to normalize content.",
      },
      {
        challenge: "Process Latency: Coordinating extensive user skills data, skill evidence, and career stories alongside resume text during tailoring checks could cause UI delays.",
        solution: "Optimized API latency by orchestrating concurrent database queries using Promise.all, while offloading long-running AI operations to a resilient Postgres-backed background task queue (DurableJobService).",
      },
    ],
    developmentProcess: [
      "User Research: Mapped core frustrations across application discovery, preparation, and follow-through.",
      "Prompt Optimization: Engineered structured JSON schemas to enforce alignment format constraints.",
      "Frontend & Core APIs: Built dashboard, Kanban board, and pdf parsing backend.",
      "Database Mapping: Structured relational schema supporting multiple resume iterations linked to specific job profiles.",
    ],
    results: [
      "Built a fully functional end-to-end career operating system.",
      "Optimized document parser engine capable of mapping multi-page resumes in under 3 seconds.",
      "Established a live staging system to validate dynamic prompts against real job descriptions.",
    ],
    lessonsLearned: [
      "Providing clear, grounded gap analysis is more valuable to applicants than fully automated, exaggerated resume writing.",
      "Input data sanitization (PDF text formatting) dictates the final quality of AI analysis far more than prompt phrasing.",
    ],
    nextSteps: [
      "Expand layout checking to support dynamic PDF preview rendering.",
      "Add automated email-alert schedulers for follow-up reminders.",
    ],
    liveUrl: "https://resumeloopai.com",
  },
  {
    title: "CalSnapAI",
    slug: "calsnap-ai",
    shortDescription: "Cross-platform Flutter food and calorie tracker using Google Gemini AI vision to turn meal photos and nutrition labels into instant macronutrient estimates.",
    description:
      "A cross-platform mobile nutrition tracking product built with Flutter, Clean Architecture, and Firebase. Uses Google Gemini AI vision via Cloud Functions to analyze meal photos and nutrition labels into editable macronutrient breakdowns.",
    category: "Mobile Apps",
    tags: ["Mobile App", "Flutter", "Dart", "Gemini AI", "Firebase", "Clean Architecture", "Computer Vision"],
    thumbnail: "/images/projects/calsnap-ai/cover.svg",
    featured: true,
    caseStudyUrl: "/projects/calsnap-ai",
    confidentiality: {
      status: "public",
      label: "Private Development / Launch Preparation",
    },
    role: "Mobile Engineer & Product Creator",
    duration: "Private Development / Launch Preparation",
    projectType: "Consumer Mobile AI Product",
    heroSummary: "CalSnapAI simplifies daily nutrition tracking by combining photo-first meal recognition and Nutrition Facts label parsing with an offline-ready Flutter architecture.",
    overview: {
      product: "A mobile-first calorie and nutrition tracker built with Flutter and Firebase, using Google Gemini multimodal vision to extract nutrition data from photos.",
      audience: "Individuals and fitness enthusiasts seeking to track meals, macros, and hydration without tedious manual database searches.",
      purpose: "Eliminate food-logging friction and drop-off through an intuitive photo-first workflow with editable nutrition breakdowns.",
    },
    problem: [
      "Traditional calorie-tracking apps rely heavily on manual text searches and portion guessing, creating high logging friction that leads to user abandonment.",
      "Packaged foods and prepared meals present distinct logging challenges: home-cooked dishes need visual ingredient estimation, while packaged foods require accurate label reading.",
      "On-device AI API keys risk client-side extraction, requiring a secure cloud architecture that balances latency with operational safety.",
    ],
    solution: [
      "Engineered a dual-pipeline AI recognition system: one for multi-item meal photo analysis and another dedicated to Nutrition Facts label OCR and structured parsing.",
      "Built server-side Firebase Cloud Functions to broker Google Gemini multimodal vision requests securely, keeping API keys protected while returning structured macronutrient breakdowns.",
      "Implemented a modular Flutter Clean Architecture with Bloc state management, Firestore offline persistence, and editable review screens that acknowledge AI estimation uncertainty.",
    ],
    responsibilities: [
      "Designed the end-to-end mobile user journey, photo logging flow, and macro review interfaces.",
      "Architected the multi-package Flutter codebase across dedicated feature modules (ai_tracker, nutrition, hydration, progress, streak).",
      "Built Firebase Cloud Functions with Google Gemini vision prompt orchestration for structured food and label extraction.",
      "Integrated Firestore offline caching, Firebase Auth (Google & Apple Sign-In), and dynamic macro charting with fl_chart.",
    ],
    keyFeatures: [
      { title: "Meal Photo Recognition", description: "Capture meal images to receive instant AI-powered calorie, protein, carb, and fat estimates." },
      { title: "Nutrition Label Scanner", description: "Dedicated OCR parsing pipeline to extract exact serving sizes and micronutrients from food packaging." },
      { title: "Modular Clean Architecture", description: "Multi-package architecture separating AI detection, nutrition tracking, hydration, and streak analytics." },
      { title: "Offline-Ready Firestore Sync", description: "Local cache persistence ensuring meal logging and history remain accessible without internet connectivity." },
      { title: "Editable Review Workflow", description: "Interactive breakdown cards allowing users to adjust items and portion estimates before confirming." },
      { title: "Health & Progress Analytics", description: "Visual macro distributions, daily calorie trend charts via fl_chart, and water intake tracking." },
    ],
    screenshots: [
      { src: "/images/projects/calsnap-ai/cover.svg", alt: "CalSnapAI cover illustration", caption: "Mobile interface and AI food recognition workflow for CalSnapAI.", type: "mobile" },
    ],
    architecture: [
      { label: "Mobile Client", items: ["Flutter 3.24+ (Dart ^3.6)", "flutter_bloc & provider", "get_it Service Locator", "fl_chart & mobile_scanner"] },
      { label: "Backend & Cloud", items: ["Firebase Cloud Functions (Node.js)", "Cloud Firestore (Offline Cache)", "Firebase Storage"] },
      { label: "AI & Vision", items: ["Google Gemini AI Multimodal Vision", "Dual Ingestion (Meal Photo & Label OCR)", "Image compression & MIME parsing"] },
      { label: "Auth & Security", items: ["Firebase Auth (Google & Apple Sign-In)", "Firestore Security Rules", "Server-side API key isolation"] },
    ],
    challenges: [
      {
        challenge: "Server-Side AI Vision & Secret Isolation: Running multimodal vision without exposing Gemini API credentials in the mobile binary.",
        solution: "Implemented Firebase Cloud Functions (NutritionApiService) as a secure proxy. The mobile client compresses and streams image byte arrays with MIME detection, while the cloud function prompts Gemini and enforces structured JSON response schemas.",
      },
      {
        challenge: "Probabilistic AI Estimation vs. User Control: Food photography can have hidden ingredients, portion ambiguities, or varying preparation methods.",
        solution: "Designed a review-first mobile workflow. Rather than blindly committing AI outputs, CalSnapAI presents structured, editable item cards (name, calories, protein, carbs, fat, serving size) so users can quickly refine results before Firestore persistence.",
      },
      {
        challenge: "Multi-Package Dependency & State Management: Managing interconnected features (AI tracker, nutrition totals, daily streaks, hydration) without monolithic coupling.",
        solution: "Decomposed the app into modular packages (feature_ai_tracker, feature_nutrition, feature_progress, core_common) registering strictly typed repositories through get_it, facilitating independent unit testing and maintaining an 85%+ test coverage gate.",
      },
    ],
    developmentProcess: [
      "Product Concept & User Flow: Mapped photo capture, label scanning, editable confirmation, and daily nutrition tracking journeys.",
      "Modular Package Scaffolding: Established multi-package repository structure and get_it dependency injection boundaries.",
      "Cloud Functions & AI Integration: Built secure Gemini vision prompts and JSON validation pipelines.",
      "Persistence & Analytics: Integrated Firestore offline caching, authentication providers, and fl_chart progress visualizations.",
      "Quality & CI/CD: Established GitHub Actions automated linting, test suites, and coverage requirements.",
    ],
    results: [
      "Engineered a release-ready, cross-platform mobile client with server-side AI vision integration.",
      "Established a clean, modular Flutter architecture with strict package isolation and offline reliability.",
      "Streamlined meal and label logging into a sub-second capture and review workflow.",
    ],
    lessonsLearned: [
      "Consumer AI products succeed when they provide user agency—making probabilistic AI predictions easy to review and correct builds long-term user trust.",
      "Separating mobile feature packages from the start prevents state entanglement and makes multi-developer feature iteration seamless.",
      "Server-side AI orchestration is essential for mobile apps to protect API credentials and allow prompt iterations without requiring App Store updates.",
    ],
    nextSteps: [
      "Conduct closed beta testing for real-world portion estimation feedback.",
      "Implement barcode database lookup fallback for packaged food items.",
    ],
  },
  {
    title: "Techbckp",
    slug: "techbckp",
    shortDescription: "Agency and product studio positioning for helping startups and businesses design, build, launch, and improve digital products.",
    description:
      "A software and product-development agency concept focused on practical execution across AI products, websites, MVPs, and application improvements.",
    category: "Agency Work",
    tags: ["Agency", "Product studio", "Websites", "MVP development"],
    thumbnail: "/images/projects/techbckp/cover.svg",
    featured: true,
    caseStudyUrl: "/projects/techbckp",
    confidentiality: {
      status: "public",
      label: "Public studio positioning",
    },
    role: "Founder, builder, and service lead",
    duration: "Ongoing",
    projectType: "Agency and Product Studio",
    heroSummary: "Techbckp is positioned as a practical product studio for teams that need software built, improved, or clarified.",
    overview: {
      product: "A service-led product studio brand that brings together AI product development, web apps, mobile apps, MVPs, and technical consulting.",
      audience: "Startups, founders, and businesses looking for hands-on product and engineering support.",
      purpose: "Create a credible front door for consulting conversations, service delivery, and product-studio positioning.",
    },
    problem: [
      "Potential clients often struggle to understand whether a technical founder can handle both product thinking and implementation.",
      "Service sites frequently focus too much on technology lists and not enough on business outcomes.",
    ],
    solution: [
      "Defined service offers around outcomes such as MVP delivery, modernization, AI integration, and technical consulting.",
      "Positioned Techbckp as a blend of software agency, product studio, and implementation partner.",
      "Created reusable messaging that can be used across outreach, portfolio, and future agency pages.",
    ],
    responsibilities: [
      "Set the service strategy and offer structure.",
      "Mapped service descriptions to the business problems each engagement should solve.",
      "Built brand and portfolio materials that support both client work and founder-led storytelling.",
    ],
    keyFeatures: [
      { title: "AI product development", description: "Support RAG tools, internal AI workflows, and customer-facing AI product ideas." },
      { title: "Mobile and web applications", description: "Build or improve apps across Android, web, and product-supporting systems." },
      { title: "MVP development", description: "Translate early ideas into a scoped, usable first release." },
      { title: "Product consulting", description: "Help teams make better delivery, architecture, and roadmap decisions." },
      { title: "Websites and e-commerce", description: "Create polished marketing sites and storefront experiences where they support the business." },
    ],
    screenshots: [
      { src: "/images/projects/techbckp/cover.svg", alt: "Techbckp hero illustration", caption: "Branded Techbckp homepage representation.", type: "desktop" },
    ],
    architecture: [
      { label: "Frontend", items: ["Marketing site", "Portfolio content", "Case-study content system"] },
      { label: "Hosting", items: ["GitHub Pages-compatible static export"] },
    ],
    challenges: [
      {
        challenge: "Creating positioning that works for both client services and founder storytelling.",
        solution: "Combined service clarity with case-study depth so the brand can support multiple types of opportunities.",
      },
      {
        challenge: "Avoiding generic agency language.",
        solution: "Focused descriptions on outcomes, product delivery, and practical support rather than inflated claims.",
      },
    ],
    developmentProcess: [
      "Define the offer categories and target conversations.",
      "Turn services into reusable, outcome-driven messaging blocks.",
      "Build portfolio and case-study content that can support outreach.",
      "Refine the studio positioning as more public work becomes available.",
    ],
    results: [
      "Created a clearer agency narrative that can support outreach, referrals, and inbound interest.",
      "Prepared a scalable content structure for future public case studies.",
    ],
    lessonsLearned: [
      "Strong service positioning needs to sound like execution, not only aspiration.",
      "A portfolio can work harder when it explains how the work is delivered, not just what technologies were used.",
    ],
    nextSteps: [
      "Add real case studies as more public client work becomes available.",
      "Expand engagement models and pricing notes when ready.",
    ],
    liveUrl: "https://techbckp.com",
  },
  {
    title: "Retail Pickup Application",
    slug: "retail-pickup-application",
    shortDescription: "Professional Android experience focused on order pickup workflows and operational reliability.",
    description:
      "Generalized professional Android work supporting retail pickup flows, user guidance, and day-to-day operational usability.",
    category: "Professional Experience",
    tags: ["Professional experience", "Android", "Retail workflows"],
    thumbnail: "/images/projects/retail-pickup-application/cover.svg",
    featured: false,
    caseStudyUrl: "/projects/retail-pickup-application",
    confidentiality: {
      status: "limited",
      label: "Professional experience — details limited due to confidentiality.",
    },
    role: "Android engineer",
    duration: "Professional experience",
    projectType: "Confidential Android project",
    heroSummary: "A generalized case study about improving pickup-related workflows in a production retail environment.",
    overview: {
      product: "An Android application supporting retail pickup experiences and operational coordination.",
      audience: "Store teams and customers interacting with pickup workflows.",
      purpose: "Make pickup-related actions clearer, more reliable, and easier to support operationally.",
    },
    problem: [
      "Retail pickup workflows need dependable user flows because delays or confusion can affect both customers and staff.",
      "Professional case studies must respect confidentiality while still showing the nature of the work.",
    ],
    solution: [
      "Summarized the product at a workflow level without exposing internal systems or sensitive business logic.",
      "Highlighted responsibilities around Android delivery, reliability, and user experience improvement.",
    ],
    responsibilities: [
      "Implement and refine Android user flows.",
      "Support production-quality delivery in an operationally sensitive environment.",
      "Collaborate on app behavior improvements while respecting business constraints.",
    ],
    keyFeatures: [
      { title: "Operational workflows", description: "Support time-sensitive actions in a retail pickup context." },
      { title: "Reliable Android delivery", description: "Focus on clarity, responsiveness, and maintainability in a production app." },
      { title: "Confidentiality-safe presentation", description: "Keep the case study safe without exposing protected information." },
    ],
    screenshots: [
      { src: "/images/projects/retail-pickup-application/cover.svg", alt: "Retail pickup placeholder visual", caption: "Diagram placeholder representing mobile workflows.", type: "mobile" },
    ],
    architecture: [
      { label: "Frontend", items: ["Android app workflows"] },
    ],
    challenges: [
      { challenge: "Sharing professional experience safely.", solution: "Kept the write-up high level and avoided proprietary implementation details." },
    ],
    developmentProcess: [
      "Interpret product needs within the constraints of a live retail environment.",
      "Implement and validate Android workflows.",
      "Support production quality and ongoing improvements.",
    ],
    results: [
      "Delivered functional mobile workflows in a professional environment.",
      "Improved the portfolio's ability to represent confidential Android work responsibly.",
    ],
    lessonsLearned: [
      "Operational apps require clarity and reliability as much as feature breadth.",
      "Confidential work can still be presented usefully through generalized problem-solving language.",
    ],
    nextSteps: ["Monitor production logs for edge-case errors."],
  },
  {
    title: "Seller Management Application",
    slug: "seller-management-application",
    shortDescription: "Professional experience case study for seller-facing Android workflows with confidentiality-safe details.",
    description:
      "Generalized Android experience supporting seller operations, management tasks, and production workflows.",
    category: "Professional Experience",
    tags: ["Professional experience", "Android", "Seller workflows"],
    thumbnail: "/images/projects/seller-management-application/cover.svg",
    featured: false,
    caseStudyUrl: "/projects/seller-management-application",
    confidentiality: {
      status: "limited",
      label: "Professional experience — details limited due to confidentiality.",
    },
    role: "Android engineer",
    duration: "Professional experience",
    projectType: "Confidential Android project",
    heroSummary: "A generalized case study describing seller-management workflows in a professional Android application.",
    overview: {
      product: "An Android application supporting seller-facing operations and day-to-day workflow management.",
      audience: "Internal or partner users working through seller-related tasks.",
      purpose: "Improve workflow completion and usability for operational mobile experiences.",
    },
    problem: [
      "Operational applications need dependable screens and workflow clarity even when business rules are complex.",
      "Public case studies for employer work must avoid disclosing sensitive product information.",
    ],
    solution: [
      "Focused the write-up on problem-solving, responsibilities, and product impact at a high level.",
      "Used placeholder visuals that can later be replaced with approved abstractions if needed.",
    ],
    responsibilities: [
      "Build and maintain Android workflows for operational tasks.",
      "Collaborate on usability improvements and production delivery.",
      "Keep quality and maintainability in view while working within professional constraints.",
    ],
    keyFeatures: [
      { title: "Seller workflow support", description: "Support mobile tasks connected to seller operations." },
      { title: "Production app delivery", description: "Contribute to a maintained Android application in an active environment." },
      { title: "Confidentiality-safe storytelling", description: "Represent real experience without exposing the underlying system." },
    ],
    screenshots: [
      { src: "/images/projects/seller-management-application/cover.svg", alt: "Seller management placeholder visual", caption: "Diagram placeholder representing seller workflows.", type: "mobile" },
    ],
    architecture: [
      { label: "Frontend", items: ["Android app workflows"] },
    ],
    challenges: [
      { challenge: "Balancing public portfolio clarity with employer confidentiality.", solution: "Documented responsibilities and outcomes without naming internal systems or sharing protected visuals." },
    ],
    developmentProcess: [
      "Clarify workflow goals and implementation requirements.",
      "Build and refine Android experiences.",
      "Support stable production delivery.",
    ],
    results: [
      "Delivered a confidentiality-safe portfolio summary for seller-oriented Android work.",
      "Captured transferable mobile engineering experience in a shareable format.",
    ],
    lessonsLearned: [
      "Operational product work benefits from concise UX and dependable implementation.",
      "Confidential case studies still need enough specificity to communicate real responsibility.",
    ],
    nextSteps: ["Enhance accessibility labeling for core flows."],
  },
  {
    title: "Proctoring Application Migration",
    slug: "proctoring-application-migration",
    shortDescription: "Professional experience case study about Android application migration and modernization in a sensitive domain.",
    description:
      "Generalized professional experience covering Android migration work for a proctoring-related application.",
    category: "Professional Experience",
    tags: ["Professional experience", "Migration", "Android modernization"],
    thumbnail: "/images/projects/proctoring-application-migration/cover.svg",
    featured: false,
    caseStudyUrl: "/projects/proctoring-application-migration",
    confidentiality: {
      status: "limited",
      label: "Professional experience — details limited due to confidentiality.",
    },
    role: "Android engineer",
    duration: "Professional experience",
    projectType: "Confidential migration project",
    heroSummary: "A generalized migration case study focused on moving a sensitive Android application toward a more maintainable implementation.",
    overview: {
      product: "A proctoring-related Android application undergoing migration or modernization work.",
      audience: "Teams responsible for stable, sensitive user-facing workflows.",
      purpose: "Support product continuity while improving maintainability and future delivery readiness.",
    },
    problem: [
      "Migration work often needs to improve maintainability without disrupting sensitive user flows.",
      "Confidential domains require extra care in how technical details are presented publicly.",
    ],
    solution: [
      "Described the work in terms of migration and modernization goals rather than proprietary implementation details.",
      "Focused on engineering judgment, careful rollout thinking, and maintainability benefits.",
    ],
    responsibilities: [
      "Contribute to Android migration and modernization work.",
      "Support continuity for product workflows during technical transition.",
      "Balance implementation progress with stability concerns.",
    ],
    keyFeatures: [
      { title: "Migration planning", description: "Move workflows toward a more maintainable implementation path." },
      { title: "Stability-minded delivery", description: "Approach changes carefully in a sensitive product domain." },
      { title: "Generalized communication", description: "Present the work safely for a public portfolio." },
    ],
    screenshots: [
      { src: "/images/projects/proctoring-application-migration/cover.svg", alt: "Proctoring migration placeholder visual", caption: "Diagram placeholder representing migration flows.", type: "diagram" },
    ],
    architecture: [
      { label: "Frontend", items: ["Android app workflows"] },
    ],
    challenges: [
      { challenge: "Improving the implementation while protecting continuity in a sensitive domain.", solution: "Used a gradual, maintainability-focused modernization mindset." },
    ],
    developmentProcess: [
      "Understand migration goals and risk areas.",
      "Implement modernization steps without exposing sensitive domain details.",
      "Support verification and continued product stability.",
    ],
    results: [
      "Prepared a confidentiality-safe case study for migration-focused Android experience.",
      "Communicated modernization capability without claiming unpublished metrics.",
    ],
    lessonsLearned: [
      "Migration work benefits from steady sequencing and careful validation.",
      "Sensitive products require disciplined communication as well as disciplined implementation.",
    ],
    nextSteps: ["Perform routine dependency updates."],
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export const projectFilters = [
  "All",
  "AI and SaaS",
  "Mobile Apps",
  "Agency Work",
  "Professional Experience",
] as const;

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
