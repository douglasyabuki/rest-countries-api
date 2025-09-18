"use client";

import { Country } from "@/interfaces/countries";
import Link from "next/link";
import { ArrowBackIcon } from "../icons/Icons";
import { DetailedCountryFlag } from "./detailed-country-flag/DetailedCountryFlag";
import { DetailedCountryInfo } from "./detailed-country-info/DetailedCountryInfo";

export interface DetailedCountryProps {
  countries: Country[];
}

export function DetailedCountry({ countries }: DetailedCountryProps) {
  return (
    <div className="flex h-full w-full flex-col items-start gap-8">
      <Link
        href={`/`}
        className="element flex items-center gap-3 rounded-md px-8 py-2 shadow-md shadow-transparent-black transition-shadow duration-150 hover:shadow-lg "
      >
        <div className="flex h-6 w-6 items-center justify-center">
          <ArrowBackIcon />
        </div>
        Back
      </Link>
      {countries.map((country) => (
        <div
          className="flex min-w-full flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-0"
          key={country.name}
        >
          <DetailedCountryFlag flags={country.flags} />
          <DetailedCountryInfo
            name={country.name}
            nativeName={country.nativeName}
            region={country.region}
            subregion={country.subregion}
            capital={country.capital}
            topLevelDomain={country.topLevelDomain}
            currencies={country.currencies}
            languages={country.languages}
            borders={country.borders}
            population={country.population}
          />
        </div>
      ))}
    </div>
  );
}
