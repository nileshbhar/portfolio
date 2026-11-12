"use client";

import { motion, useReducedMotion } from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import ResumeButton from "@/components/ui/ResumeButton";
import { hero, personal } from "@/data/personal";
import { easeOut } from "@/lib/utils";

function Description() {
  const [before, after] = hero.description.split("{name}");
  return (
    <>
      {before}
      <strong className="font-semibold text-ink">{personal.name}</strong>
      {after}
    </>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : 0.1 } },
  };
  const item = (y = 12) => ({
    hidden: reduce ? { opacity: 1 } : { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
  });

  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100svh-var(--header-height))] items-center overflow-hidden"
    >
      <div aria-hidden="true" className="hero-texture pointer-events-none absolute inset-0 hidden sm:block" />

      <Container className="relative pt-20 pb-32 sm:pt-24 lg:pt-28">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-[920px]">
          <motion.p
            variants={item(6)}
            className="inline-flex items-center rounded-full bg-[#f2f2f2] px-3.5 py-1.5 font-mono text-[12px] text-[#4a4a4a] sm:text-[13px]"
          >
            <span aria-hidden="true" className="mr-2 text-muted">
              &gt;
            </span>
            {hero.label}
          </motion.p>

          <motion.h1
            id="hero-heading"
            variants={item(18)}
            className="mt-7 text-[44px] leading-[0.98] font-bold tracking-[-0.045em] text-ink min-[400px]:text-[52px] sm:mt-8 sm:text-[72px] md:text-[84px] lg:text-[96px] xl:text-[100px]"
          >
            <span className="block">{hero.headingLine1}</span>
            <span className="block text-muted">{hero.headingLine2}</span>
          </motion.h1>

          <motion.p
            variants={item(12)}
            className="mt-7 max-w-[570px] text-[17px] leading-[1.65] text-body sm:mt-8 sm:text-[19px]"
          >
            <Description />
          </motion.p>

          <motion.div
            variants={item(10)}
            className="mt-10 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center sm:gap-4"
          >
            <Button href="#projects" arrow>
              View Projects
            </Button>
            <ResumeButton />
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 1, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
        <span className="scroll-cue relative block h-12 w-px overflow-hidden bg-line" />
      </motion.a>
    </section>
  );
}
