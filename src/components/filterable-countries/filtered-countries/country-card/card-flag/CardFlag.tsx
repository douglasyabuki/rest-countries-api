"use client";

import { Flags } from "@/interfaces/countriesv3";
import Image from "next/image";

export interface CardFlagProps {
  flags: Flags;
}

export function CardFlag({ flags }: CardFlagProps) {
  const { alt, png, svg } = flags;
  const src = svg ?? png ?? "";
  return (
    <div className="relative h-[200px] w-[300px] overflow-hidden">
      <Image src={src} alt={alt ?? ""} fill={true} priority={true} />
    </div>
  );
}
