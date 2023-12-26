"use client";

import { CountryFlags } from "@/services/countries";
import Image from "next/image";
import * as React from "react";

export interface DetailedCountryFlagProps {
  flags: CountryFlags;
}

export default function DetailedCountryFlag({
  flags,
}: DetailedCountryFlagProps) {
  console.log({ flags });
  return (
    <div className="min-w-[45%]">
      <Image
        className="cover h-full w-full "
        src={flags?.png}
        alt={`${flags?.png}`}
        height={800}
        width={1200}
      />
    </div>
  );
}
