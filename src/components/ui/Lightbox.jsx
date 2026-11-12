"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn, easeOut } from "@/lib/utils";

/**
 * Fullscreen screenshot viewer.
 * Keyboard: Esc closes, Left/Right arrows navigate. Touch: swipe left/right.
 *
 * Props:
 *  images   [{ src, alt, caption }]
 *  index    number | null   (null = closed)
 *  onClose  () => void
 *  onIndex  (i) => void
 *  title    string           (used for the dialog label)
 */
export default function Lightbox({ images, index, onClose, onIndex, title }) {
  const open = index !== null && index !== undefined;
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);
  // Natural height/width ratio per image, learned on load. Tall screenshots
  // (full-page captures) are shown at reading width and scroll vertically
  // instead of being shrunk to fit the screen height.
  const [ratios, setRatios] = useState({});
  const closeRef = useRef(null);
  const lastFocus = useRef(null);
  const touchX = useRef(null);
  const count = images.length;

  useEffect(() => setMounted(true), []);

  const go = useCallback(
    (step) => {
      if (!open || count < 2) return;
      setDirection(step);
      onIndex((index + step + count) % count);
    },
    [open, count, index, onIndex]
  );

  // Keyboard, scroll lock and focus handling while open.
  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    closeRef.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "Tab") {
        // Keep focus inside the dialog.
        const nodes = document.querySelectorAll("[data-lightbox] button");
        if (!nodes.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocus.current?.focus?.();
    };
  }, [open, go, onClose]);

  if (!mounted) return null;

  const current = open ? images[index] : null;
  const slide = reduce ? 0 : 40;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          key="lightbox"
          data-lightbox
          role="dialog"
          aria-modal="true"
          aria-label={`${title} screenshots`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: easeOut }}
          className="fixed inset-0 z-[200] flex flex-col bg-white"
        >
          {/* Top bar */}
          <div className="flex h-16 shrink-0 items-center justify-between px-5 sm:px-8">
            <p className="font-mono text-[12px] tracking-[0.08em] text-muted">
              <span className="text-ink">{String(index + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
              <span className="ml-3 hidden text-body sm:inline">{title}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close screenshots"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-ink"
            >
              <X size={18} strokeWidth={1.8} />
            </button>
          </div>

          {/* Image stage */}
          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.figure
                key={current.src}
                custom={direction}
                initial={{ opacity: 0, x: direction * slide }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -slide }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="flex h-full w-full max-w-[1400px] flex-col items-center justify-center"
              >
                {ratios[current.src]?.r > 1.15 ? (
                  <div className="h-full max-h-[78vh] w-full overflow-y-auto overscroll-contain rounded-lg">
                    <Image
                      src={current.src}
                      alt={current.alt || ""}
                      width={1200}
                      height={Math.round(1200 * ratios[current.src].r)}
                      sizes="(min-width: 1240px) 1100px, 100vw"
                      className="mx-auto h-auto w-full"
                      style={{ maxWidth: Math.min(1100, ratios[current.src].w) }}
                      priority
                    />
                  </div>
                ) : (
                  <div className="relative h-full max-h-[78vh] w-full">
                    <Image
                      src={current.src}
                      alt={current.alt || ""}
                      fill
                      sizes="(min-width: 1440px) 1400px, 100vw"
                      className="object-contain"
                      priority
                      onLoad={(e) => {
                        const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
                        if (w && h) setRatios((r) => (r[current.src] ? r : { ...r, [current.src]: { r: h / w, w } }));
                      }}
                    />
                  </div>
                )}
                {ratios[current.src]?.r > 1.15 && (
                  <p className="mt-2 font-mono text-[11px] text-muted">Scroll to see the full page</p>
                )}
                {(current.caption || current.alt) && (
                  <figcaption className="mt-4 max-w-2xl text-center text-[14px] text-body">
                    {current.caption || current.alt}
                  </figcaption>
                )}
              </motion.figure>
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous screenshot"
                  className="absolute top-1/2 left-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-ink sm:inline-flex"
                >
                  <ChevronLeft size={20} strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next screenshot"
                  className="absolute top-1/2 right-3 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-white text-ink shadow-sm transition-colors hover:border-ink sm:inline-flex"
                >
                  <ChevronRight size={20} strokeWidth={1.8} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnails */}
          {count > 1 && (
            <div className="flex shrink-0 justify-center gap-2 overflow-x-auto px-5 py-5">
              {images.map((img, i) => (
                <button
                  key={img.src}
                  type="button"
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    onIndex(i);
                  }}
                  aria-label={`Show screenshot ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className={cn(
                    "relative h-12 w-[76px] shrink-0 overflow-hidden rounded-md border transition-all duration-200",
                    i === index ? "border-ink opacity-100" : "border-line opacity-50 hover:opacity-100"
                  )}
                >
                  <Image src={img.src} alt="" fill sizes="76px" className="object-cover object-top" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
