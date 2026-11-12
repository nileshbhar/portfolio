"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Container from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { navLinks, personal, socials } from "@/data/personal";
import { cn, easeOut } from "@/lib/utils";

function useActiveSection(ids, enabled) {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled) return;
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A thin band across the upper middle of the viewport decides the active section.
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => {
      if (window.scrollY < 200) setActive("");
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids, enabled]);

  return active;
}

const sectionIds = navLinks.map((l) => l.id);

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const active = useActiveSection(sectionIds, isHome);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change and on Escape.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const hrefFor = (hash) => (isHome ? hash : `/${hash}`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-[var(--header-height)] border-b bg-white transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-line shadow-[0_1px_12px_-8px_rgba(0,0,0,0.12)]" : "border-[#f1f1f1]"
      )}
    >
      <Container className="grid h-full grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link
          href="/"
          className="justify-self-start font-mono text-[15px] font-bold tracking-[0.02em] text-ink"
          aria-label={`${personal.name}, home`}
        >
          {personal.logo}
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => {
              const isActive = isHome && active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={hrefFor(link.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative py-2 text-[14px] font-medium transition-colors duration-200",
                      isActive ? "text-ink" : "text-body hover:text-ink"
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-ink transition-transform duration-300 ease-out-soft",
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Socials + mobile toggle */}
        <div className="flex items-center justify-self-end gap-1">
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface sm:inline-flex"
          >
            <GithubIcon size={19} />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface sm:inline-flex"
          >
            <LinkedinIcon size={18} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink md:hidden"
          >
            {open ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="fixed inset-x-0 top-[var(--header-height)] bottom-0 border-t border-line bg-white md:hidden"
          >
            <Container as="nav" aria-label="Mobile" className="flex h-full flex-col pt-6 pb-10">
              <ul className="flex flex-col">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: easeOut, delay: 0.04 * i + 0.05 }}
                    className="border-b border-line"
                  >
                    <a
                      href={hrefFor(link.href)}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 text-[28px] font-semibold tracking-[-0.03em] text-ink"
                    >
                      {link.label}
                      <span className="font-mono text-[12px] font-normal tracking-normal text-muted">
                        0{i + 1}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3">
                <a
                  href={socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-medium"
                >
                  <GithubIcon size={17} /> GitHub
                </a>
                <a
                  href={socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-line px-5 text-[14px] font-medium"
                >
                  <LinkedinIcon size={16} /> LinkedIn
                </a>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
