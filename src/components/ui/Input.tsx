import * as React from "react";
import { cn } from "@/lib/utils";

const baseClasses =
  "w-full rounded-none border-0 border-b border-charcoal/20 bg-transparent px-0 py-3 text-base text-ink placeholder:text-stone-2 smooth focus:border-gold focus:outline-none disabled:opacity-50";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input ref={ref} className={cn(baseClasses, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(baseClasses, "resize-y min-h-32", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(baseClasses, "appearance-none bg-no-repeat", className)}
    style={{
      backgroundImage:
        "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231C1917' stroke-width='1.5'><path d='m6 9 6 6 6-6'/></svg>\")",
      backgroundPosition: "right 0 center",
      backgroundSize: "1rem",
      paddingRight: "1.5rem",
    }}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";

export const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "block text-xs uppercase tracking-[0.18em] text-stone font-medium mb-2",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

export const FieldError = ({ children }: { children?: React.ReactNode }) =>
  children ? (
    <p className="mt-1 text-xs text-red-700">{children}</p>
  ) : null;
