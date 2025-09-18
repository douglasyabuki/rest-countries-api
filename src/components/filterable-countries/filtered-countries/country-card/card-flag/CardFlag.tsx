"use client";

import { CountryFlags } from "@/interfaces/countries";
import Image from "next/image";

export interface CardFlagProps {
  flags: CountryFlags;
}

export function CardFlag({ flags }: CardFlagProps) {
  return (
    <div className="relative h-[200px] w-[300px] overflow-hidden">
      <Image src={flags.svg} alt={`${flags.svg}`} fill={true} priority={true} />
    </div>
  );
}
