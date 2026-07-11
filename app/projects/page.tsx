import { buildMetadata } from "@/lib/metadata";
import { projects } from "@/data/projects";
import { ProjectsExplorer } from "@/components/projects/projects-explorer";
import { SectionHeading } from "@/components/ui/section-heading";

export const metadata = buildMetadata({
  title: "Projects | AI SaaS, mobile apps, web apps, and professional case studies",
  description:
    "Browse AI and SaaS products, Android and web projects, agency work, and confidentiality-safe professional experience case studies.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="section-space">
      <div className="page-shell space-y-10">
        <SectionHeading
          eyebrow="Projects"
          title="Filterable product, service, and case-study work"
          description="Each project card supports title, slug, description, category, tags, thumbnail, featured state, public links, and confidentiality-aware presentation."
        />
        <div id="case-studies" className="scroll-mt-28">
          <ProjectsExplorer projects={projects} />
        </div>
      </div>
    </section>
  );
}
