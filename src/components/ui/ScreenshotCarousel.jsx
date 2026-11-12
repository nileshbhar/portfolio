"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import Lightbox from "@/components/ui/Lightbox";
import { cn, easeOut } from "@/lib/utils";

/**
 * Screenshot carousel used on project cards.
 * Arrows appear on hover (always visible on touch screens), dots show position,
 * swipe works on mobile, and clicking the image opens the fullscreen lightbox.
 * It sits above the card's link overlay, so using it never navigates away.
 */
export default function ScreenshotCarousel({ images, title, priority = false, className }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const touchX = useRef(null);
  const moved = useRef(false);
  const reduce = useReducedMotion();
  const count = images.length;

  if (!count) return null;

  const go = (step) => {
    setDirection(step);
    setIndex((i) => (i + step + count) % count);
  };

  const current = images[index];
  const slide = reduce ? 0 : 24;

  return (
    <div
      className={cn("group/carousel relative z-10 h-full w-full", className)}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${title} screenshots`}
    >
      <button
        type="button"
        onClick={() => {
          if (moved.current) return;
          setLightbox(index);
        }}
        onTouchStart={(e) => {
          touchX.current = e.touches[0].clientX;
          moved.current = false;
        }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40 && count > 1) {
            moved.current = true;
            go(dx < 0 ? 1 : -1);
          }
          touchX.current = null;
        }}
        aria-label={`Open ${title} screenshots in fullscreen`}
        className="absolute inset-0 block h-full w-full cursor-zoom-in overflow-hidden focus-visible:outline-offset-[-3px]"
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={current.src}
            initial={{ opacity: 0, x: direction * slide }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -slide }}
            transition={{ duration: 0.4, ease: easeOut }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={current.alt || `${title} screenshot ${index + 1}`}
              fill
              priority={priority && index === 0}
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top transition-transform duration-700 ease-out-soft group-hover:scale-[1.025]"
            />
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Expand hint */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line bg-white/95 text-ink opacity-0 transition-opacity duration-300 group-hover/carousel:opacity-100"
      >
        <Expand size={14} strokeWidth={1.8} />
      </span>

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous screenshot"
            className="absolute top-1/2 left-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-sm transition-all duration-300 hover:border-ink focus-visible:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <ChevronLeft size={17} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next screenshot"
            className="absolute top-1/2 right-3 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-sm transition-all duration-300 hover:border-ink focus-visible:opacity-100 md:opacity-0 md:group-hover/carousel:opacity-100"
          >
            <ChevronRight size={17} strokeWidth={1.8} />
          </button>

          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <div className="flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 shadow-sm">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Show screenshot ${i + 1} of ${count}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-4 bg-ink" : "w-1.5 bg-[#c8c8c8] hover:bg-[#999]"
                  )}
                />
              ))}
            </div>
          </div>
        </>
      )}

      <Lightbox images={images} index={lightbox} onIndex={setLightbox} onClose={() => setLightbox(null)} title={title} />
    </div>
  );
}
