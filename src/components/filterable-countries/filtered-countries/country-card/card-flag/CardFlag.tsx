"use client";

import * as React from "react";
import Image from "next/image";
import { CountryFlags } from "@/services/countries";

export interface CardFlagProps {
  flags: CountryFlags;
}

export default function CardFlag({ flags }: CardFlagProps) {
  return (
    <div>
      <Image
        className="cover h-[200px] w-[300px]"
        src={flags.svg}
        alt={`${flags.svg}`}
        height={200}
        width={300}
      />
    </div>
  );
}
