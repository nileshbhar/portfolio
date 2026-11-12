"use client";

import { useState } from "react";
import Image from "next/image";
import { Expand } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import { cn } from "@/lib/utils";

/**
 * Screenshot gallery for the project detail page.
 * The first image is shown large, the rest in a two-column grid.
 * Any image opens the fullscreen lightbox at that position.
 */
export default function ScreenshotGallery({ images, title }) {
  const [lightbox, setLightbox] = useState(null);
  if (!images?.length) return null;

  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {images.map((img, i) => (
          <li key={img.src} className={cn(i === 0 && "sm:col-span-2")}>
            <figure>
              <button
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`Open screenshot ${i + 1}${img.caption ? `: ${img.caption}` : ""} in fullscreen`}
                className="group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-xl border border-line bg-surface transition-colors duration-300 hover:border-[#cfcfcf]"
              >
                <Image
                  src={img.src}
                  alt={img.alt || `${title} screenshot ${i + 1}`}
                  fill
                  sizes={i === 0 ? "(min-width: 768px) 760px, 100vw" : "(min-width: 768px) 370px, 100vw"}
                  className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.02]"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <Expand size={14} strokeWidth={1.8} />
                </span>
              </button>
              {(img.caption || img.alt) && (
                <figcaption className="mt-3 flex gap-3 text-[13px] text-body">
                  <span className="font-mono text-muted">{String(i + 1).padStart(2, "0")}</span>
                  {img.caption || img.alt}
                </figcaption>
              )}
            </figure>
          </li>
        ))}
      </ul>

      <Lightbox images={images} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} title={title} />
    </>
  );
}
