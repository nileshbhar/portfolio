import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { experience, experienceSection } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-t border-line py-24 sm:py-32 lg:py-40">
      <Container>
        <SectionHeading id="experience-heading" label={experienceSection.label} title={experienceSection.heading} />

        <ol className="mt-14 border-t border-line">
          {experience.map((job, i) => (
            <Reveal
              as="li"
              key={`${job.title}-${job.start}`}
              delay={0.05 * i}
              className="relative grid gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10 md:py-14"
            >
              <div className="md:col-span-3">
                <p className="font-mono text-[13px] text-ink">
                  <time>{job.start}</time>
                  <span className="text-muted"> — </span>
                  <time>{job.end}</time>
                </p>
                {job.location && <p className="mt-2 text-[14px] text-body">{job.location}</p>}
              </div>

              <div className="md:col-span-9">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-2.5 hidden h-2 w-2 shrink-0 rounded-full bg-ink md:block" />
                  <div>
                    <h3 className="text-[24px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">
                      {job.title}
                    </h3>
                    {job.company && (
                      <p className="mt-1.5 text-[16px] text-body">
                        {job.companyUrl ? (
                          <a
                            href={job.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-line underline-offset-4 hover:text-ink hover:decoration-ink"
                          >
                            {job.company}
                          </a>
                        ) : (
                          job.company
                        )}
                      </p>
                    )}

                    <ul className="mt-6 max-w-2xl space-y-3 text-[15px] leading-relaxed text-body">
                      {job.responsibilities.map((r) => (
                        <li key={r} className="relative pl-5">
                          <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-[#bdbdbd]" />
                          {r}
                        </li>
                      ))}
                    </ul>

                    {job.stack?.length > 0 && (
                      <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technology stack">
                        {job.stack.map((t) => (
                          <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[12px] text-[#444]">
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
