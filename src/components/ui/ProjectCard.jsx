import Link from "next/link";
import { ArrowUpRight, Images } from "lucide-react";
import ScreenshotCarousel from "@/components/ui/ScreenshotCarousel";
import { getGallery } from "@/data/projects";
import { cn } from "@/lib/utils";

export function StatusBadge({ status, className }) {
  if (!status) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1 font-mono text-[11px] text-[#444]",
        className
      )}
    >
      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#a3a3a3]" />
      {status}
    </span>
  );
}

export default function ProjectCard({ project, index, priority = false }) {
  const gallery = getGallery(project);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-[border-color,box-shadow] duration-300 hover:border-[#cfcfcf] hover:shadow-[0_18px_40px_-28px_rgba(0,0,0,0.25)]">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface">
        <ScreenshotCarousel images={gallery} title={project.title} priority={priority} />
        {project.status && (
          <StatusBadge status={project.status} className="pointer-events-none absolute top-4 left-4 z-20" />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="flex items-center gap-3 font-mono text-[12px] text-muted">
              {String(index + 1).padStart(2, "0")}
              {gallery.length > 1 && (
                <span className="inline-flex items-center gap-1">
                  <Images size={12} strokeWidth={1.8} aria-hidden="true" />
                  {gallery.length} screenshots
                </span>
              )}
            </p>
            <h3 className="mt-2 text-[21px] leading-snug font-semibold tracking-[-0.025em] text-ink sm:text-[23px]">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </h3>
          </div>
          <span
            aria-hidden="true"
            className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink transition-all duration-300 ease-out-soft group-hover:border-ink group-hover:bg-ink group-hover:text-white"
          >
            <ArrowUpRight
              size={18}
              strokeWidth={1.7}
              className="transition-transform duration-300 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </span>
        </div>

        <p className="mt-4 text-[15px] leading-relaxed text-body">{project.description}</p>

        <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Technologies">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full bg-surface px-3 py-1 font-mono text-[12px] text-[#444]">
              {t}
            </li>
          ))}
        </ul>
      </div>
      {/* Focus ring for the whole card when the title link is keyboard-focused */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-ink ring-offset-2 group-has-[h3_a:focus-visible]:ring-2"
      />
    </article>
  );
}
