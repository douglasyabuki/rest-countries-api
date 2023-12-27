"use client";

import { useNumericCodesContext } from "@/contexts/NumericCodesContext";
import { CountryCurrency, CountryLanguage } from "@/services/countries";
import Link from "next/link";
import * as React from "react";

export interface DetailedCountryInfoProps {
  name: string;
  nativeName: string;
  region: string;
  subregion: string;
  capital: string;
  topLevelDomain: string[];
  currencies: CountryCurrency[];
  languages: CountryLanguage[];
  borders: string[];
  population: number;
}

export default function DetailedCountryInfo({
  name,
  nativeName,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders,
  population,
}: DetailedCountryInfoProps) {
  const { numericCodes } = useNumericCodesContext();

  function getNumericCodeByAlphaCode(alphaCode: string): string | null {
    const country = numericCodes.find(
      (country) => country.alpha3Code === alphaCode,
    );
    return country ? country.numericCode : "";
  }

  return (
    <div className="flex h-full w-auto min-w-[45%] flex-col gap-1">
      <h3 className="pb-4 text-2xl font-bold">{name}</h3>
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Native Name:</h4>
          <h5>{nativeName}</h5>
        </div>
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Top Level Domain:</h4>
          <h5>{topLevelDomain}</h5>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Population:</h4>
          <h5>{population}</h5>
        </div>
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Currencies:</h4>
          <h5>{currencies[0]?.name}</h5>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Region:</h4>
          <h5>{region}</h5>
        </div>
        <div className="flex w-1/2 items-center gap-2">
          <h4 className="text-base font-semibold">Languages:</h4>
          <h5>{languages?.map((language) => language.name + ", ")}</h5>
        </div>
      </div>
      <div className="flex w-auto items-center gap-2">
        <h4 className="text-base font-semibold">Subregion:</h4>
        <h5>{subregion}</h5>
      </div>
      <div className="flex w-auto items-center gap-2">
        <h4 className="text-base font-semibold">Capital:</h4>
        <h5>{capital}</h5>
      </div>
      <div className="flex items-center gap-2 pt-4">
        <h4 className="text-base font-semibold">Border Countries:</h4>
        {borders?.map(
          (border, id) =>
            id <= 4 && (
              <Link
                key={id}
                href={"/countries/" + getNumericCodeByAlphaCode(border)}
                className="flex transform-gpu items-center justify-center rounded-md bg-light-mode-element px-4 py-1 shadow-sm shadow-transparent-black transition-all duration-150 hover:scale-105 hover:shadow-md dark:bg-dark-mode-element"
              >
                {border}{" "}
              </Link>
            ),
        )}
      </div>
    </div>
  );
}
