"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

export function ImageGallery({ images, alt }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden rounded-xl">
        <Image
          src={images[activeIndex]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1200px) 100vw, 800px"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={cn(
              "relative shrink-0 w-20 h-16 md:w-24 md:h-18 rounded-lg overflow-hidden border-2 transition-all",
              activeIndex === i
                ? "border-primary-600 ring-1 ring-primary-600"
                : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image
              src={img}
              alt={`${alt} ${i + 1}`}
              fill
              className="object-cover"
              sizes="96px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
