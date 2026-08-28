import { WorkExperience } from "@/data/types";

export const experiences: WorkExperience[] = [
  {
    organization: "ResumeLoopAI",
    role: "Founder & Full-Stack Product Developer",
    employmentType: "Independent product development",
    startDate: "2026-01",
    current: true,
    location: "Remote",
    summary:
      "Designed and built ResumeLoopAI, a career operating system that centralizes resume version management, tailors accomplishments to job specs, and tracks applications via an interactive Kanban pipeline.",
    highlights: [
      "Architected dynamic context-grounding prompt sequences matching user profiles with job descriptions to restrict output drift.",
      "Implemented document parsing and text extraction pipelines with decompression fallbacks for structured resume uploads.",
      "Orchestrated parallel database queries to retrieve candidate context efficiently during tailoring workflows.",
      "Designed and developed the full-stack Next.js frontend, interactive candidate dashboard, and pipeline board."
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "OpenAI API",
      "PostgreSQL"
    ],
    relatedProjectSlugs: ["resumeloop-ai"],
    featured: true,
  },
  {
    organization: "USAA",
    role: "Mobile Software Engineer",
    employmentType: "Contract",
    startDate: "2025-01",
    endDate: "2025-06",
    current: false,
    location: "Remote",
    summary:
      "Contributed to member-facing Android mobile banking and insurance features, focusing on secure transaction workflows, payment interfaces, and modular architecture.",
    highlights: [
      "Developed and maintained Android features for member insurance and financial transaction workflows.",
      "Built and maintained clean network integration layers with automated testing and standard error handling.",
      "Collaborated on mobile CI/CD automation and test suites to safeguard release quality across member-facing services."
    ],
    technologies: [
      "Kotlin",
      "Android",
      "Mobile DevOps",
      "CI/CD",
      "Payments",
      "Java",
      "JUnit"
    ],
    featured: false,
  },
  {
    organization: "Walmart",
    role: "Senior Android Engineer",
    employmentType: "Contract",
    startDate: "2024-06",
    endDate: "2024-12",
    current: false,
    location: "Remote",
    summary:
      "Contributed to high-volume Android applications supporting retail order pickup, associate fulfillment, and customer handoff workflows across large-scale retail commerce systems.",
    highlights: [
      "Implemented and refined Android user flows supporting store pickup and order fulfillment workflows.",
      "Utilized Kotlin, Coroutines, and GraphQL APIs to fetch and manage order state transitions reliably.",
      "Focused on performance profiling, UI responsiveness, and stability in high-frequency operational environments."
    ],
    technologies: [
      "Android",
      "Kotlin",
      "GraphQL",
      "performance/profiling",
      "large-scale commerce systems",
      "Jetpack Compose",
      "Coroutines"
    ],
    relatedProjectSlugs: ["retail-pickup-application"],
    featured: true,
  },
  {
    organization: "GAP",
    role: "Android Engineer",
    employmentType: "Contract",
    startDate: "2022-05",
    endDate: "2024-05",
    current: false,
    location: "Remote",
    summary:
      "Developed and maintained retail mobile applications supporting in-store associate workflows, BOPIS (Buy Online, Pick Up In Store) fulfillment, and operational inventory tasks.",
    highlights: [
      "Built and modernized mobile workflows for retail store associates handling inventory lookups, order staging, and fulfillment.",
      "Integrated barcode scanners and mobile payment/hardware peripherals into Android store associate applications.",
      "Supported continuous integration and automated build verification using Jenkins CI pipelines."
    ],
    technologies: [
      "mobile migration",
      "Android",
      "scanners/payment hardware",
      "Jenkins/CI",
      "Kotlin",
      "Java"
    ],
    featured: false,
  },
  {
    organization: "Prometric",
    role: "Android Engineer",
    employmentType: "Contract",
    startDate: "2020-04",
    endDate: "2022-04",
    current: false,
    location: "Remote",
    summary:
      "Worked on Android application migration and modernization for secure, high-stakes test administration and proctoring environments.",
    highlights: [
      "Participated in migrating legacy test delivery components toward modern Android and hybrid web architectures.",
      "Supported WebView and hybrid container integration (Electron/React and Cordova/Capacitor bridging) for secure exam delivery clients.",
      "Maintained application stability and security controls required for kiosk and proctored examination workflows."
    ],
    technologies: [
      "Android/WebView",
      "Electron/React integration",
      "Cordova/Capacitor bridging",
      "kiosk/security-oriented workflows",
      "Kotlin",
      "Java"
    ],
    relatedProjectSlugs: ["proctoring-application-migration"],
    featured: false,
  }
];
