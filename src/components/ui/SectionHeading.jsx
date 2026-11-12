import Reveal from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function SectionLabel({ children, className }) {
  return (
    <p className={cn("font-mono text-[12px] uppercase tracking-[0.14em] text-muted", className)}>{children}</p>
  );
}

/**
 * Section label ("01 / ABOUT ME") plus large heading and optional subheading.
 */
export default function SectionHeading({ id, label, title, muted, subheading, className, titleClassName }) {
  return (
    <Reveal className={cn("max-w-3xl", className)}>
      <SectionLabel>{label}</SectionLabel>
      <h2
        id={id}
        className={cn(
          "mt-5 text-[34px] leading-[1.05] font-semibold tracking-[-0.035em] text-ink sm:text-[44px] lg:text-[52px]",
          titleClassName
        )}
      >
        {title}
        {muted && (
          <>
            <br />
            <span className="text-muted">{muted}</span>
          </>
        )}
      </h2>
      {subheading && <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-body">{subheading}</p>}
    </Reveal>
  );
}
