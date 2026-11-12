import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full px-6 h-12 text-[15px] font-medium tracking-[-0.01em] whitespace-nowrap " +
  "transition-[transform,box-shadow,background-color,border-color,color] duration-250 ease-out-soft " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-ink disabled:pointer-events-none disabled:opacity-60";

const variants = {
  primary:
    "bg-button text-white shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-6px_rgba(0,0,0,0.35)] hover:-translate-y-px hover:bg-black hover:shadow-[0_2px_4px_rgba(0,0,0,0.12),0_12px_24px_-10px_rgba(0,0,0,0.45)]",
  secondary:
    "bg-white text-ink border border-line shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:-translate-y-px hover:border-[#d6d6d6] hover:shadow-[0_6px_16px_-10px_rgba(0,0,0,0.2)]",
};

/**
 * Pill button. Renders an <a>/<Link> when `href` is given, otherwise a <button>.
 * `arrow` adds the sliding arrow used on primary actions.
 */
export default function Button({
  href,
  variant = "primary",
  arrow = false,
  icon: Icon,
  className,
  children,
  external,
  download,
  ...props
}) {
  const content = (
    <>
      {Icon && <Icon size={17} strokeWidth={1.8} aria-hidden="true" />}
      <span>{children}</span>
      {arrow && (
        <ArrowRight
          size={17}
          strokeWidth={1.8}
          aria-hidden="true"
          className="transition-transform duration-250 ease-out-soft group-hover:translate-x-1"
        />
      )}
    </>
  );
  const classes = cn(base, variants[variant], className);

  if (href) {
    const isInternalPage = href.startsWith("/") && !download && !external;
    if (isInternalPage) {
      return (
        <Link href={href} className={classes} {...props}>
          {content}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={classes}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  );
}
