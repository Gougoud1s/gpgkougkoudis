import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium leading-none cursor-pointer smooth select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-cream tracking-wide",
  {
    variants: {
      variant: {
        primary:
          "bg-charcoal text-cream hover:bg-ink hover:shadow-lg",
        gold:
          "bg-gold text-cream hover:bg-gold-dark hover:shadow-lg",
        outline:
          "border border-charcoal/20 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-cream",
        ghost:
          "text-charcoal hover:bg-charcoal/5",
        link:
          "text-charcoal underline-offset-4 hover:underline rounded-none px-0",
        outlineLight:
          "border border-cream/40 text-cream hover:bg-cream hover:text-charcoal",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-11 px-6 text-sm",
        lg: "h-13 px-8 text-sm",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
