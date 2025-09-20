"use client";

import { Country } from "@/interfaces/countriesv3";
import Link from "next/link";
import { ArrowBackIcon } from "../icons/Icons";
import { DetailedCountryFlag } from "./detailed-country-flag/DetailedCountryFlag";
import { DetailedCountryInfo } from "./detailed-country-info/DetailedCountryInfo";

export interface DetailedCountryProps {
  country: Country;
}

export function DetailedCountry({ country }: DetailedCountryProps) {
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
      <div
        className="flex min-w-full flex-col items-start gap-8 md:flex-row md:items-center md:justify-between md:gap-0"
        key={country.name?.common}
      >
        <DetailedCountryFlag flags={country.flags} />
        <DetailedCountryInfo
          name={country.name.common}
          region={country.region}
          subregion={country.subregion}
          capital={country.capital}
          topLevelDomain={country.tld}
          currencies={country.currencies}
          languages={country.languages}
          borders={country.borders}
          population={country.population}
        />
      </div>
    </div>
  );
}
