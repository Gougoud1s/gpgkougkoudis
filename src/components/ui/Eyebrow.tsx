import { cn } from "@/lib/utils";

export function Eyebrow({
  children,
  className,
  align = "left",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  return (
    <p
      className={cn(
        "eyebrow flex items-center gap-3",
        align === "center" && "justify-center",
        className
      )}
    >
      <span className="gold-rule" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
