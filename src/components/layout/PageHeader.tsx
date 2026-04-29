import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  variant = "light",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  variant?: "light" | "dark";
}) {
  return (
    <section
      className={
        variant === "dark"
          ? "bg-charcoal text-cream pt-24 pb-16 md:pt-32 md:pb-20"
          : "pt-24 pb-12 md:pt-32 md:pb-16"
      }
    >
      <Container size="narrow">
        <div className={align === "center" ? "text-center" : "text-left"}>
          {eyebrow && (
            <Eyebrow align={align} className={variant === "dark" ? "text-gold-light" : ""}>
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className={`mt-5 text-balance ${variant === "dark" ? "text-cream" : ""}`}>
            {title}
          </h1>
          {subtitle && (
            <p
              className={`mt-6 text-base md:text-lg max-w-2xl ${
                align === "center" ? "mx-auto" : ""
              } ${variant === "dark" ? "text-cream/80" : "text-stone"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
      </Container>
    </section>
  );
}
