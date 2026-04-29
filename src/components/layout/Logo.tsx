import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex flex-col items-start leading-none cursor-pointer smooth",
        className
      )}
      aria-label="GP. ΓΚΟΥΓΚΟΥΔΗΣ — Αρχική"
    >
      <span
        className={cn(
          "display-serif text-xl md:text-2xl",
          variant === "dark" ? "text-charcoal" : "text-cream"
        )}
        style={{ letterSpacing: "0.04em" }}
      >
        GP. ΓΚΟΥΓΚΟΥΔΗΣ
      </span>
      <span
        className={cn(
          "mt-0.5 text-[0.6rem] uppercase tracking-[0.32em]",
          variant === "dark" ? "text-stone-2" : "text-cream/70"
        )}
      >
        Αφοί Π. Γκουγκούδη · est. 1985
      </span>
    </Link>
  );
}
