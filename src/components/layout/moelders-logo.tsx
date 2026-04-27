import { cn } from "@/lib/utils";

type MoeldersLogoProps = {
  className?: string;
  /** Visible text size; brand mark stays proportional. */
  size?: "sm" | "md" | "lg";
};

const sizeClasses: Record<NonNullable<MoeldersLogoProps["size"]>, string> = {
  sm: "text-base",
  md: "text-lg sm:text-xl",
  lg: "text-2xl sm:text-3xl",
};

/**
 * Typographic placeholder for the Mölders wordmark. Will be replaced by an
 * SVG logo asset once supplied by marketing.
 */
export function MoeldersLogo({ className, size = "md" }: MoeldersLogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-extrabold tracking-tight leading-none",
        sizeClasses[size],
        className,
      )}
      aria-label="Mölders"
    >
      <span className="text-brand-red">MÖLDERS</span>
      <span className="ml-1 text-brand-ink/70 font-medium text-[0.55em] uppercase tracking-wider">
        Transportbeton
      </span>
    </span>
  );
}
