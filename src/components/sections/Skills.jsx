import { Cloud, Database, LayoutTemplate, Server } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillGroups, skillsSection } from "@/data/skills";

const iconMap = {
  layout: LayoutTemplate,
  server: Server,
  database: Database,
  cloud: Cloud,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="bg-surface py-24 sm:py-32 lg:py-40">
      <Container>
        <SectionHeading id="skills-heading" label={skillsSection.label} title={skillsSection.heading} />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Server;
            return (
              <Reveal
                key={group.category}
                delay={0.06 * i}
                className="group relative bg-white p-7 transition-colors duration-300 hover:bg-[#fcfcfc] sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line text-ink transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                    <Icon size={18} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span aria-hidden="true" className="font-mono text-[12px] text-muted">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-8 text-[19px] font-semibold tracking-[-0.02em] text-ink">{group.category}</h3>
                <p className="mt-1.5 text-[14px] text-body">{group.summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${group.category} technologies`}>
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-[#444]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
