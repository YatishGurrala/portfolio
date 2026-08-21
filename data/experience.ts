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
      "Designed and built ResumeLoopAI, an AI-assisted career platform and career operating system that helps job seekers manage their career search, analyze job alignment, and track progress.",
    highlights: [
      "Designed the core system architecture and product strategy for ResumeLoopAI from the ground up.",
      "Developed the Next.js frontend, reactive user dashboards, and structured resume ingestion workflows.",
      "Implemented AI prompt engineering sequences and result parsing logic to identify resume improvements.",
      "Configured robust build setups and continuous deployment workflows."
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Tailwind CSS",
      "AI integrations"
    ],
    relatedProjectSlugs: ["resumeloop-ai"],
    featured: true,
  },
];
