"use client";

import { useNumericCodesContext } from "@/contexts/NumericCodesContext";
import Link from "next/link";
import * as React from "react";

export interface BorderCountriesProps {
  borders: string[];
}

export default function BorderCountries({ borders }: BorderCountriesProps) {
  const { numericCodes } = useNumericCodesContext();

  function getNumericCodeByAlphaCode(alphaCode: string): string | null {
    const country = numericCodes.find(
      (country) => country.alpha3Code === alphaCode,
    );
    return country ? country.numericCode : "";
  }

  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      <h4 className="text-base font-semibold">Border Countries:</h4>
      <div className="flex w-auto gap-2">
        {borders?.map(
          (border, id) =>
            id <= 4 && (
              <Link
                key={id}
                href={"/countries/" + getNumericCodeByAlphaCode(border)}
                className="element flex items-center justify-center rounded-md px-4 py-1 shadow-sm shadow-transparent-black transition-all duration-150 hover:scale-105 hover:shadow-md"
              >
                {border}{" "}
              </Link>
            ),
        )}
      </div>
    </div>
  );
}
