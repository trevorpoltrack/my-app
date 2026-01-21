"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  images: string[];
  height?: number; // px
  speed?: number;  // seconds
  reverse?: boolean;
};

export default function PhotoMarquee({
  images,
  height = 120,
  speed = 40,
  reverse = false,
}: Props) {
  const [widths, setWidths] = useState<Record<string, number>>({});

  // Measure natural image sizes to preserve aspect ratio
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
      img.onload = () => {
        const ratio = img.width / img.height;
        setWidths((prev) => ({
          ...prev,
          [src]: Math.round(height * ratio),
        }));
      };
    });
  }, [images, height]);

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...images, ...images].map((src, idx) => (
          <Image
            key={`${src}-${idx}`}
            src={src}
            alt=""
            width={widths[src] || height}
            height={height}
            priority={idx < images.length}
            className="object-contain rounded-md"
            style={{
              marginRight: 16,
              height,
              width: widths[src] || height,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
