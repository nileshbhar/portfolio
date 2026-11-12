import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionHeading";
import { about } from "@/data/personal";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="border-t border-line py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionLabel>{about.label}</SectionLabel>
          <h2
            id="about-heading"
            className="mt-5 text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-[44px] lg:sticky lg:top-28 lg:text-[48px]"
          >
            {about.heading}
          </h2>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={0.08} className="space-y-6 text-[17px] leading-[1.75] text-body sm:text-[18px]">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="first:text-ink">
                {p}
              </p>
            ))}
          </Reveal>

          <dl className="mt-14 border-t border-line">
            {about.highlights.map((h, i) => (
              <Reveal
                key={h.title}
                delay={0.05 * i}
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-line py-5 sm:grid-cols-[3rem_14rem_1fr]"
              >
                <span aria-hidden="true" className="pt-0.5 font-mono text-[12px] text-muted">
                  0{i + 1}
                </span>
                <dt className="text-[15px] font-semibold tracking-[-0.01em] text-ink">{h.title}</dt>
                <dd className="col-start-2 mt-1 text-[14px] leading-relaxed text-body sm:col-start-3 sm:mt-0">
                  {h.text}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
