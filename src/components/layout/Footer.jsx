import Container from "@/components/ui/Container";
import { personal, socials } from "@/data/personal";

export default function Footer() {
  const year = new Date().getFullYear();
  const linkClass = "transition-colors hover:text-ink";

  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col items-center gap-4 py-8 text-[13px] text-body md:grid md:grid-cols-3 md:gap-0">
        <p className="md:justify-self-start">
          © {year} {personal.name}
        </p>
        <p className="font-mono text-[12px] text-muted md:justify-self-center">Built with Next.js</p>
        <nav aria-label="Footer" className="md:justify-self-end">
          <ul className="flex items-center gap-2">
            <li>
              <a href={socials.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                GitHub
              </a>
            </li>
            <li aria-hidden="true" className="text-[#c4c4c4]">
              ·
            </li>
            <li>
              <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                LinkedIn
              </a>
            </li>
            <li aria-hidden="true" className="text-[#c4c4c4]">
              ·
            </li>
            <li>
              <a href="#top" className={linkClass}>
                Back to Top
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
