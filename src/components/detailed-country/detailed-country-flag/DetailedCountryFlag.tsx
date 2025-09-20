"use client";

import { Flags } from "@/interfaces/countriesv3";
import Image from "next/image";

export interface DetailedCountryFlagProps {
  flags: Flags;
}

export function DetailedCountryFlag({ flags }: DetailedCountryFlagProps) {
  const { png, svg, alt } = flags;
  const src = png ?? svg;
  return (
    <div className="relative h-[200px] w-[300px] md:h-auto md:min-w-[45%] md:max-w-[45%]">
      {src ? (
        <>
          <Image
            priority={true}
            src={src}
            alt={alt ?? ""}
            fill={true}
            className="md:hidden"
          />
          <Image
            priority={true}
            src={src}
            alt={alt ?? ""}
            height={600}
            width={1200}
            className="hidden md:block"
          />
        </>
      ) : (
        <div className="h-auto w-auto md:h-[37.5rem] md:w-[75rem]"></div>
      )}
    </div>
  );
}
