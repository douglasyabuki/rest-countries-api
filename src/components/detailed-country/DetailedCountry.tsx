"use client";

import { Country } from "@/interfaces/countries";
import * as React from "react";
import DetailedCountryFlag from "./detailed-country-flag/DetailedCountryFlag";
import Link from "next/link";
import { ArrowBackIcon } from "../icons/Icons";
import DetailedCountryInfo from "./detailed-country-info/DetailedCountryInfo";

export interface DetailedCountryProps {
  countries: Country[];
}

export default function DetailedCountry({ countries }: DetailedCountryProps) {
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
          className="flex min-w-full flex-col items-center gap-8 md:flex-row md:justify-between md:gap-0"
          key={country.name}
        >
          <DetailedCountryFlag flags={country.flags}></DetailedCountryFlag>
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
          ></DetailedCountryInfo>
        </div>
      ))}
    </div>
  );
}
