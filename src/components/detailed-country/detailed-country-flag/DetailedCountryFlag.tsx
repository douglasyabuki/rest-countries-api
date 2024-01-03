"use client";

import { CountryFlags } from "@/interfaces/countries";
import Image from "next/image";
import * as React from "react";

export interface DetailedCountryFlagProps {
  flags: CountryFlags;
}

export default function DetailedCountryFlag({
  flags,
}: DetailedCountryFlagProps) {
  return (
    <div className="relative w-auto min-w-full md:min-w-[45%] md:max-w-[45%]">
      <Image
        priority={true}
        src={flags?.png}
        alt={`${flags?.png}`}
        height={600}
        width={1200}
      />
    </div>
  );
}
