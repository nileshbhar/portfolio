import Container from "@/components/ui/Container";
import ProjectCard from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { projects, projectsSection } from "@/data/projects";

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 sm:py-32 lg:py-40">
      <Container>
        <SectionHeading
          id="projects-heading"
          label={projectsSection.label}
          title={projectsSection.heading}
          subheading={projectsSection.subheading}
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2 lg:gap-8">
          {projects.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={(i % 2) * 0.08}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
