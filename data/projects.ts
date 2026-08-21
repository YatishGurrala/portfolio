import { Project } from "@/data/types";

export const projects: Project[] = [
  {
    title: "CiteGPT",
    slug: "citegpt",
    shortDescription: "AI website chatbot platform with cited answers, embeddable widgets, and a business-friendly SaaS dashboard.",
    description:
      "An AI-powered website chatbot platform that trains on website content and answers with source citations through an embeddable widget.",
    category: "AI and SaaS",
    tags: ["Next.js", "TypeScript", "RAG", "Embeddable widget", "Lead capture"],
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
      product: "A chatbot SaaS platform that ingests websites and delivers cited answers through a lightweight chat widget.",
      audience: "Businesses, startups, and service providers who need self-serve answers on their websites.",
      purpose: "Reduce repetitive support questions and create a more helpful website experience without inventing unsupported answers.",
    },
    problem: [
      "Many websites bury useful information across multiple pages, forcing visitors to search manually or leave without clarity.",
      "Generic chatbots often feel unreliable because they do not show where answers come from.",
    ],
    solution: [
      "Designed a website and sitemap ingestion workflow that prepares business content for retrieval-based answers.",
      "Structured responses to include source citations, helping users trust what the assistant says and where it came from.",
      "Added a configurable embeddable widget, conversation visibility, and lead capture hooks for business workflows.",
    ],
    responsibilities: [
      "Defined product scope, experience flow, and SaaS architecture.",
      "Built dashboard, content-ingestion flows, and AI response surfaces.",
      "Implemented retrieval-augmented generation (RAG) pipelines and citation-grounded answers.",
    ],
    keyFeatures: [
      { title: "Website and sitemap ingestion", description: "Prepare business content for searchable AI answers from public website sources." },
      { title: "RAG-based answers", description: "Generate responses using retrieved content rather than ungrounded guesswork." },
      { title: "Source citations", description: "Show visitors where each answer came from to improve clarity and trust." },
      { title: "Embeddable widget", description: "Add the chatbot to different websites without rebuilding the experience each time." },
      { title: "Conversation visibility", description: "Review conversations to understand what users ask and where the product needs refinement." },
      { title: "Lead capture", description: "Create opportunities to turn helpful conversations into follow-up business inquiries." },
    ],
    screenshots: [
      { src: "/images/projects/citegpt/cover.svg", alt: "CiteGPT dashboard cover illustration", caption: "Dashboard cover representation for CiteGPT.", type: "desktop" },
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js App Router", "Responsive Tailwind CSS UI", "Embeddable JS widget"] },
      { label: "Backend", items: ["Next.js Server Actions & API routes", "Retrieval pipeline"] },
      { label: "Database / ORM", items: ["PostgreSQL", "Supabase", "Prisma ORM"] },
      { label: "APIs & Integration", items: ["AI API integrations", "Website ingestion utilities"] },
    ],
    challenges: [
      {
        challenge: "Balancing helpfulness with trust in AI-generated answers.",
        solution: "Anchored the product around retrieval and citations so the experience stays tied to source material rather than unsupported claims.",
      },
      {
        challenge: "Supporting both product configuration and visitor-facing usability.",
        solution: "Separated the SaaS dashboard concerns from the embedded widget flow to keep each experience focused.",
      },
    ],
    developmentProcess: [
      "Discovery around business use cases, support workflows, and citation expectations.",
      "Feature planning for ingestion, retrieval, widget delivery, and dashboard configuration.",
      "UI and architecture decisions to keep the product extensible.",
      "Implementation, testing, and refinement of the core SaaS workflow.",
    ],
    results: [
      "Delivered a functional AI SaaS platform focused on grounded chatbot interactions.",
      "Created a scalable structure for adding dashboard, widget, and analytics enhancements later.",
    ],
    lessonsLearned: [
      "Products that explain their answers clearly earn more trust than black-box AI experiences.",
      "Separating configuration surfaces from the end-user chat flow keeps the product easier to reason about.",
    ],
    nextSteps: [
      "Add dynamic conversation metrics dashboard.",
      "Support advanced document parsing for ingestion.",
    ],
    liveUrl: "https://citegpt.xyz",
  },
  {
    title: "ResumeLoopAI",
    slug: "resumeloop-ai",
    shortDescription: "AI-powered career assistant for resume analysis, content generation, and job-search workflow support.",
    description:
      "An AI-assisted career platform and career operating system that helps job seekers discover opportunities, manage reviewed career information, analyze job/resume alignment, improve résumés and track their progress.",
    category: "AI and SaaS",
    tags: ["Next.js", "React", "TypeScript", "AI Integration", "User Dashboard"],
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
    heroSummary: "ResumeLoopAI reduces scattered job-search work by combining AI assistance with practical workflow management.",
    overview: {
      product: "A career assistant that helps users review resumes, create AI-assisted job-search content, and manage progress in one place.",
      audience: "Job seekers and professionals who want more structure around resume improvement and application workflows.",
      purpose: "Make career preparation and follow-through less manual, less repetitive, and easier to track.",
    },
    problem: [
      "Career tools are often fragmented across resume editing, note-taking, application tracking, and AI prompts.",
      "Users need guidance that fits into a repeatable workflow rather than a one-off content generator.",
    ],
    solution: [
      "Defined a user dashboard that combines resume analysis, content generation, and job-search organization.",
      "Framed the product around practical readiness workflows instead of vague AI assistance.",
    ],
    responsibilities: [
      "Researched the workflow gaps the product should solve.",
      "Mapped AI features to clear user outcomes like resume improvement and progress tracking.",
      "Designed and built Next.js application frontend and backend API structures.",
    ],
    keyFeatures: [
      { title: "Resume analysis", description: "Review resumes through an AI-assisted workflow that surfaces improvement opportunities." },
      { title: "AI content generation", description: "Draft job-search content with a clearer workflow than isolated AI prompts." },
      { title: "Job tracking", description: "Keep applications and follow-up tasks in one structured space." },
      { title: "Career dashboard", description: "Combine readiness tasks, generated assets, and progress into a single experience." },
    ],
    screenshots: [
      { src: "/images/projects/resumeloop-ai/cover.svg", alt: "ResumeLoopAI hero cover illustration", caption: "Dashboard cover representation for ResumeLoopAI.", type: "desktop" },
    ],
    architecture: [
      { label: "Frontend", items: ["Next.js App Router", "React", "TypeScript", "Tailwind CSS"] },
      { label: "Backend", items: ["Node.js API routes"] },
      { label: "Database / ORM", items: ["PostgreSQL"] },
      { label: "APIs & Integration", items: ["AI content services", "Resume analysis utilities", "Browser-extension development"] },
    ],
    challenges: [
      {
        challenge: "Avoiding a product that feels like a generic AI wrapper.",
        solution: "Centered the product around career workflows, not just isolated content generation features.",
      },
      {
        challenge: "Making AI outputs feel useful instead of overwhelming.",
        solution: "Structured the experience so analysis, creation, and tracking each have a clear place in the user journey.",
      },
    ],
    developmentProcess: [
      "Clarified the user workflow across preparation, applications, and follow-through.",
      "Planned feature sequencing for resume analysis, content generation, and tracking.",
      "Implemented core product foundations.",
    ],
    results: [
      "Delivered a functional SaaS platform for AI-assisted career workflows.",
      "Created a clear structure for user data and future content templates.",
    ],
    lessonsLearned: [
      "Workflow clarity matters more than adding every possible AI feature at once.",
      "Career products benefit from blending guidance, utility, and follow-through.",
    ],
    nextSteps: [
      "Refine resume parsing accuracy.",
      "Expand application tracking automation.",
    ],
    liveUrl: "https://resumeloopai.com",
  },
  {
    title: "CalSnapAI",
    slug: "calsnap-ai",
    shortDescription: "AI-assisted mobile calorie tracker using image recognition to record meals and present nutrition results.",
    description:
      "An AI-assisted mobile food and calorie-tracking product that uses food-image recognition to help users record meals.",
    category: "Mobile Apps",
    tags: ["Android", "Kotlin", "Jetpack Compose", "AI Image Recognition"],
    thumbnail: "/images/projects/calsnap-ai/cover.svg",
    featured: true,
    caseStudyUrl: "/projects/calsnap-ai",
    confidentiality: {
      status: "public",
      label: "Private Development / Launch Preparation",
    },
    role: "Mobile Developer & Product Creator",
    duration: "Launch preparation",
    projectType: "Mobile Application",
    heroSummary: "CalSnapAI simplifies meal and calorie logging by using mobile image recognition and structured nutrition result presentation.",
    overview: {
      product: "A mobile application utilizing image recognition to identify foods and calculate estimated nutritional content.",
      audience: "Users seeking a frictionless way to log meals and track nutrition without manual database searching.",
      purpose: "Reduce logging friction using smart image-recognition workflow.",
    },
    problem: [
      "Manual calorie tracking is highly tedious, leading to user drop-off.",
      "Existing food databases require manual search and portion estimation which is inaccurate and slow.",
    ],
    solution: [
      "Created an app that identifies meal contents from a photo using food-image recognition.",
      "Designed structured nutrition result presentation screens for calorie and macronutrient breakdown.",
    ],
    responsibilities: [
      "Define product concept and core mobile user workflows.",
      "Build native Android application using Kotlin and Jetpack Compose.",
      "Integrate AI-based food image-recognition API endpoint.",
      "Polish mobile UI/UX layouts for nutrition summaries.",
    ],
    keyFeatures: [
      { title: "Food Image Recognition", description: "Identify dishes and foods from mobile snapshot images instantly." },
      { title: "Nutrition Summary Cards", description: "Clearly present macronutrients, calories, and serving details." },
      { title: "Frictionless Meal Log", description: "Log food history with a single tap after confirmation." },
    ],
    screenshots: [
      { src: "/images/projects/calsnap-ai/cover.svg", alt: "CalSnapAI cover illustration", caption: "Concept design for CalSnapAI.", type: "mobile" },
    ],
    architecture: [
      { label: "Mobile Client", items: ["Android app", "Kotlin", "Jetpack Compose"] },
      { label: "APIs & Integration", items: ["AI food-image recognition API", "Nutrition database endpoints"] },
    ],
    challenges: [
      {
        challenge: "Handling complex multi-item meals from a photo.",
        solution: "Designed a multi-item breakdown screen allowing users to confirm and adjust individual items.",
      },
    ],
    developmentProcess: [
      "Define mobile user journey and photo logging workflow.",
      "Develop native Android camera and preview screens.",
      "Integrate AI endpoint for food classification.",
      "Implement local history database.",
    ],
    results: [
      "Completed functional native Android calorie-tracking client.",
      "Streamlined food logging flows to a single photo action.",
    ],
    lessonsLearned: [
      "Friction is the primary reason users stop logging food; image recognition significantly lowers this barrier.",
    ],
    nextSteps: [
      "Integrate offline food database fallback.",
      "Support barcode scanning for packaged foods.",
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
