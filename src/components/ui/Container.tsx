import * as React from "react";
import { cn } from "@/lib/utils";

type ContainerProps = React.HTMLAttributes<HTMLDivElement> & {
  size?: "default" | "narrow" | "wide";
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
};

export function Container({
  className,
  size = "default",
  as = "div",
  children,
  ...props
}: ContainerProps) {
  const Tag = as as React.ElementType;
  return (
    <Tag
      className={cn(
        "w-full mx-auto px-5 md:px-8",
        size === "default" && "max-w-7xl",
        size === "narrow" && "max-w-3xl",
        size === "wide" && "max-w-[88rem]",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
