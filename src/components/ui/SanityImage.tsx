import Image from "next/image";
import { urlFor } from "@/sanity/image";
import type { SanityImage as SanityImageType } from "@/sanity/types";
import { cn } from "@/lib/utils";

type Props = {
  image?: SanityImageType;
  alt?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function SanityImage({
  image,
  alt,
  width,
  height,
  fill,
  sizes,
  priority,
  className,
}: Props) {
  if (!image?.asset) {
    return (
      <div
        className={cn(
          "bg-cream-2 flex items-center justify-center text-stone-2",
          className
        )}
        style={!fill && width && height ? { width, height } : undefined}
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">No image</span>
      </div>
    );
  }

  // For unsplash / direct URLs we can't go through urlFor, so fall back to <Image>.
  const directUrl = image.asset.url ?? "";
  const isDirect = /^(https?:\/\/|\/)/.test(directUrl);

  let src: string;
  if (isDirect) {
    src = directUrl;
  } else {
    src = urlFor(image)
      .width(width ?? 1600)
      .quality(85)
      .url();
  }

  const blurDataURL = image.asset.metadata?.lqip;

  if (fill) {
    return (
      <Image
        src={src}
        alt={image.alt || alt || ""}
        fill
        unoptimized
        sizes={sizes ?? "100vw"}
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        className={cn("object-cover", className)}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={image.alt || alt || ""}
      width={width ?? 1200}
      height={height ?? 1200}
      unoptimized
      sizes={sizes}
      priority={priority}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      className={className}
    />
  );
}
