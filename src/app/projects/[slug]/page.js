import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Container from "@/components/ui/Container";
import { GithubIcon } from "@/components/ui/Icons";
import { StatusBadge } from "@/components/ui/ProjectCard";
import Reveal from "@/components/ui/Reveal";
import ScreenshotGallery from "@/components/ui/ScreenshotGallery";
import { getGallery, getProjectBySlug, projects } from "@/data/projects";
import { personal } from "@/data/personal";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  const url = `/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: `${project.title} · ${personal.name}`, description: project.description },
    twitter: { card: "summary_large_image", title: project.title, description: project.description },
  };
}

function Block({ index, title, children }) {
  return (
    <Reveal as="section" className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16">
      <div className="md:col-span-4">
        <p className="font-mono text-[12px] text-muted">{String(index).padStart(2, "0")}</p>
        <h2 className="mt-2 text-[24px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">
          {title}
        </h2>
      </div>
      <div className="text-[16px] leading-[1.75] text-body sm:text-[17px] md:col-span-8">{children}</div>
    </Reveal>
  );
}

function DashList({ items }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="relative pl-5">
          <span aria-hidden="true" className="absolute top-[0.8em] left-0 h-px w-2.5 bg-[#bdbdbd]" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function TitledList({ items }) {
  return (
    <div className="divide-y divide-line">
      {items.map((c) => (
        <div key={c.title} className="py-5 first:pt-0 last:pb-0">
          <h3 className="text-[16px] font-semibold tracking-[-0.01em] text-ink">{c.title}</h3>
          <p className="mt-1.5">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const gallery = getGallery(project);
  const cover = gallery[0];
  const hasScreenshots = project.screenshots?.some((s) => s?.src);

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  // Build the numbered sections, skipping anything left empty in data/projects.js.
  const blocks = [
    project.overview && { title: "Overview", body: <p>{project.overview}</p> },
    project.problem && { title: "The problem", body: <p>{project.problem}</p> },
    project.solution && { title: "The solution", body: <p>{project.solution}</p> },
    project.responsibilities?.length && { title: "My responsibilities", body: <DashList items={project.responsibilities} /> },
    project.features?.length && {
      title: project.status === "In Development" ? "Planned features" : "Features developed",
      body: (
        <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {project.features.map((f) => (
            <li key={f} className="flex items-center gap-3 border-b border-line pb-3 text-ink">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-ink" />
              {f}
            </li>
          ))}
        </ul>
      ),
    },
    project.challenges?.length && { title: "Technical challenges", body: <TitledList items={project.challenges} /> },
    project.architecture?.length && { title: "Architecture decisions", body: <TitledList items={project.architecture} /> },
    project.outcomes?.length && { title: "Outcomes", body: <DashList items={project.outcomes} /> },
  ].filter(Boolean);

  const meta = [
    { label: "Company", value: project.builtAt, href: project.builtAtUrl },
    { label: "Role", value: project.role },
    { label: "Year", value: project.year },
    { label: "Status", value: project.status || "" },
  ].filter((m) => m.value);

  return (
    <article>
      {/* Header */}
      <Container className="pt-14 pb-12 sm:pt-20 lg:pt-24">
        <Reveal>
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-[14px] text-body transition-colors hover:text-ink"
          >
            <ArrowLeft size={16} strokeWidth={1.8} className="transition-transform duration-250 group-hover:-translate-x-1" />
            Back to projects
          </Link>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <p className="font-mono text-[12px] uppercase tracking-[0.14em] text-muted">Case study · {String(idx + 1).padStart(2, "0")}</p>
            <StatusBadge status={project.status} />
          </div>
          <h1 className="mt-5 max-w-4xl text-[40px] leading-[1.02] font-bold tracking-[-0.045em] text-ink sm:text-[56px] lg:text-[72px]">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-[18px] leading-relaxed text-body sm:text-[20px]">{project.description}</p>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 grid gap-8 border-t border-line pt-8 sm:grid-cols-12">
          {meta.map((m) => (
            <div key={m.label} className="sm:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{m.label}</p>
              {m.href ? (
                <a
                  href={m.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-[15px] text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
                >
                  {m.value}
                </a>
              ) : (
                <p className="mt-2 text-[15px] text-ink">{m.value}</p>
              )}
            </div>
          ))}
          <div className="sm:col-span-6 sm:col-start-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Technology</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <li key={t} className="rounded-full bg-surface px-3 py-1 font-mono text-[12px] text-[#444]">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {(project.links?.live || project.links?.repo) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.links.live && (
              <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full bg-button px-5 text-[14px] font-medium text-white">
                Live site <ExternalLink size={15} />
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-medium">
                <GithubIcon size={15} /> Source
              </a>
            )}
          </div>
        )}
      </Container>

      {/* Cover: the explicit cover, or the first screenshot */}
      {cover && (
        <Container>
          <Reveal className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface">
            <Image
              src={cover.src}
              alt={cover.alt || `${project.title} preview`}
              fill
              priority
              sizes="(min-width: 1240px) 1144px, 100vw"
              className="object-cover object-top"
            />
          </Reveal>
          {hasScreenshots && gallery.length > 1 && (
            <p className="mt-4 text-right">
              <a
                href="#screenshots"
                className="font-mono text-[12px] text-muted underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                View all {gallery.length} screenshots
              </a>
            </p>
          )}
        </Container>
      )}

      {/* Body */}
      <Container className="pt-16 sm:pt-24">
        {project.note && (
          <p className="mb-12 rounded-xl border border-line bg-surface p-5 text-[14px] leading-relaxed text-[#444]">
            {project.note}
          </p>
        )}

        {blocks.map((b, i) => (
          <Block key={b.title} index={i + 1} title={b.title}>
            {b.body}
          </Block>
        ))}

        <Reveal
          as="section"
          id="screenshots"
          className="grid scroll-mt-24 gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-10 md:py-16"
        >
          <div className="md:col-span-4">
            <p className="font-mono text-[12px] text-muted">{String(blocks.length + 1).padStart(2, "0")}</p>
            <h2 className="mt-2 text-[24px] leading-tight font-semibold tracking-[-0.025em] text-ink sm:text-[28px]">
              Screenshots
            </h2>
            {hasScreenshots && (
              <p className="mt-3 text-[14px] text-body">Click any image to view it fullscreen.</p>
            )}
          </div>
          <div className="md:col-span-8">
            {hasScreenshots ? (
              <ScreenshotGallery images={gallery} title={project.title} />
            ) : (
              <p className="text-[16px] text-body">
                {project.screenshotsNote ||
                  (project.status === "In Development"
                    ? "Screenshots will be added as development progresses."
                    : "Screenshots will be added soon.")}
              </p>
            )}
          </div>
        </Reveal>
      </Container>

      {/* Footer nav */}
      <Container className="pb-24 sm:pb-32">
        <div className="flex flex-col gap-6 border-t border-line pt-10 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/#projects" className="group inline-flex items-center gap-2 text-[15px] text-body hover:text-ink">
            <ArrowLeft size={16} strokeWidth={1.8} className="transition-transform duration-250 group-hover:-translate-x-1" />
            Back to projects
          </Link>
          {next && next.slug !== project.slug && (
            <Link href={`/projects/${next.slug}`} className="group text-right">
              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Next project</span>
              <span className="mt-1 inline-flex items-center gap-2 text-[18px] font-semibold tracking-[-0.02em] text-ink">
                {next.title}
                <ArrowRight size={17} strokeWidth={1.8} className="transition-transform duration-250 group-hover:translate-x-1" />
              </span>
            </Link>
          )}
        </div>
      </Container>
    </article>
  );
}
