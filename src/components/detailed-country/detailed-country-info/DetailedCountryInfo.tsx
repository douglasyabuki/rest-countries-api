"use client";

import { CountryCurrency, CountryLanguage } from "@/services/countries";
import BorderCountries from "./border-countries/BorderCountries";

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
  return (
    <div className="flex h-full w-auto min-w-[45%] flex-col gap-2">
      <h3 className="pb-4 text-2xl font-bold">{name}</h3>
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Native Name:</h4>
          <h5>{nativeName}</h5>
        </div>
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Top Level Domain:</h4>
          <h5>{topLevelDomain}</h5>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Population:</h4>
          <h5>{population}</h5>
        </div>
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Currencies:</h4>
          <h5>{currencies[0]?.name}</h5>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Region:</h4>
          <h5>{region}</h5>
        </div>
        <div className="flex w-full items-center gap-2 md:w-1/2">
          <h4 className="text-base font-semibold">Languages:</h4>
          <h5>
            {languages?.map(
              (language, id) =>
                language.name +
                (languages?.length > 1
                  ? languages.length - 1 === id
                    ? ``
                    : `, `
                  : ""),
            )}
          </h5>
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
      <BorderCountries borders={borders}></BorderCountries>
    </div>
  );
}
