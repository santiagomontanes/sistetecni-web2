"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

const getImageSrc = (source: ImageProps["src"]) =>
  typeof source === "string" ? source : source.src;

type ImageWithFallbackProps = ImageProps & {
  fallbackSrc?: string;
};

export function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  onError,
  fill,
  className,
  width,
  height,
  ...rest
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const resolvedSrc = fallbackSrc ?? getImageSrc(src);
    return (
      <img
        src={resolvedSrc}
        alt={alt}
        className={className}
        width={fill ? undefined : (width as number | undefined)}
        height={fill ? undefined : (height as number | undefined)}
        style={fill ? { height: "100%", width: "100%", objectFit: "cover" } : undefined}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      onError={(event) => {
        setFailed(true);
        onError?.(event);
      }}
      {...rest}
    />
  );
}
