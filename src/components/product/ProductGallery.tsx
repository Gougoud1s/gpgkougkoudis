"use client";

import { useState } from "react";
import { SanityImage } from "@/components/ui/SanityImage";
import { cn } from "@/lib/utils";
import type { SanityImage as SImg } from "@/sanity/types";

export function ProductGallery({
  images,
  alt,
}: {
  images: SImg[];
  alt: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = images?.[activeIdx];

  return (
    <div className="grid md:grid-cols-[6rem_1fr] gap-4">
      <div className="order-2 md:order-1 flex md:flex-col gap-2 overflow-x-auto md:overflow-x-visible md:max-h-[36rem]">
        {images.map((img, idx) => (
          <button
            type="button"
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={cn(
              "relative aspect-square w-20 md:w-full shrink-0 overflow-hidden bg-cream-2 cursor-pointer smooth",
              idx === activeIdx
                ? "ring-2 ring-gold ring-offset-2 ring-offset-cream"
                : "opacity-70 hover:opacity-100"
            )}
            aria-label={`Photo ${idx + 1}`}
            aria-current={idx === activeIdx}
          >
            <SanityImage
              image={img}
              fill
              sizes="100px"
              alt={`${alt} ${idx + 1}`}
            />
          </button>
        ))}
      </div>

      <div className="order-1 md:order-2 relative aspect-square bg-cream-2 overflow-hidden group">
        <SanityImage
          image={active}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          alt={alt}
          className="smooth group-hover:scale-105"
        />
      </div>
    </div>
  );
}
