"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type ImageWithFallbackProps = Omit<ImageProps, "onError">;

export function ImageWithFallback({ src, alt, className, ...props }: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);
  const resolvedSrc = typeof src === "string" ? src : src.src;

  if (failed) {
    const { fill, width, height, ...rest } = props;
    const fallbackClassName = cn("h-full w-full object-cover", className);

    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={fallbackClassName}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        {...rest}
      />
    );
  }

  return <Image {...props} src={src} alt={alt} className={className} onError={() => setFailed(true)} />;
}
