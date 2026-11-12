import { ArrowUpRight, Mail } from "lucide-react";
import Container from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import Reveal from "@/components/ui/Reveal";
import ResumeButton from "@/components/ui/ResumeButton";
import { SectionLabel } from "@/components/ui/SectionHeading";
import ContactForm from "@/components/sections/ContactForm";
import { contact, personal, socials } from "@/data/personal";

const channels = [
  { label: "Email", value: personal.email, href: `mailto:${personal.email}`, icon: Mail },
  { label: "GitHub", value: "View profile", href: socials.github, icon: GithubIcon, external: true },
  { label: "LinkedIn", value: "Connect", href: socials.linkedin, icon: LinkedinIcon, external: true },
];

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-surface py-24 sm:py-32 lg:py-40">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <SectionLabel>{contact.label}</SectionLabel>
          <h2
            id="contact-heading"
            className="mt-5 text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-[44px]"
          >
            {contact.headingLine1}
            <br />
            <span className="text-muted">{contact.headingLine2}</span>
          </h2>
          <p className="mt-6 max-w-md text-[17px] leading-relaxed text-body">{contact.description}</p>

          <ul className="mt-10 border-t border-line">
            {channels.map(({ label, value, href, icon: Icon, external }) => (
              <li key={label} className="border-b border-line">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center justify-between gap-4 py-4"
                >
                  <span className="flex items-center gap-4">
                    <Icon size={17} strokeWidth={1.7} className="text-ink" />
                    <span className="w-20 font-mono text-[12px] uppercase tracking-[0.12em] text-muted">{label}</span>
                    <span className="text-[15px] text-ink">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={17}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="text-muted transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>

          <ResumeButton className="mt-8" />
        </Reveal>

        <Reveal delay={0.1} className="relative lg:col-span-6">
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
