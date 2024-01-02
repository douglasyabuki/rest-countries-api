"use client";

import * as React from "react";
import Image from "next/image";
import { CountryFlags } from "@/services/countries";

export interface CardFlagProps {
  flags: CountryFlags;
}

export default function CardFlag({ flags }: CardFlagProps) {
  return (
    <div className="relative h-[200px] w-[300px]">
      <Image src={flags.svg} alt={`${flags.svg}`} fill={true} priority={true} />
    </div>
  );
}
