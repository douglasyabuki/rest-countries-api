"use client";

import Link from "next/link";

export interface BorderCountriesProps {
  borders: string[];
}

export function BorderCountries({ borders }: BorderCountriesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-4">
      <h4 className="text-base font-semibold">Border Countries:</h4>
      <div className="flex w-auto gap-2">
        {borders?.map(
          (border, id) =>
            id <= 4 && (
              <Link
                key={id}
                href={`/countries/${border}`}
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
