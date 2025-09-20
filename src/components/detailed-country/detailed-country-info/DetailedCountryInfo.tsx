"use client";

import { Currencies, Languages } from "@/interfaces/countriesv3";
import { BorderCountries } from "./border-countries/BorderCountries";

export interface DetailedCountryInfoProps {
  name: string;
  region: string;
  subregion?: string;
  capital?: string[];
  topLevelDomain?: string[];
  currencies?: Currencies;
  languages?: Languages;
  borders?: string[];
  population: number;
}

export function DetailedCountryInfo({
  name,
  region,
  subregion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borders,
  population,
}: DetailedCountryInfoProps) {
  const detailsList = [
    {
      id: 0,
      label: "Top Level Domain",
      value: topLevelDomain,
      fullWidth: false,
    },
    { id: 1, label: "Population", value: population, fullWidth: false },
    {
      id: 2,
      label: "Currencies",
      value:
        currencies &&
        Object.keys(currencies)?.map(
          (currency, id) =>
            currency +
            (Object.keys(currencies).length > 1
              ? Object.keys(currencies).length - 1 === id
                ? ``
                : `, `
              : ""),
        ),
      fullWidth: false,
    },
    {
      id: 3,
      label: "Region",
      value: region,
      fullWidth: false,
    },
    {
      id: 4,
      label: "Languages",
      value:
        languages &&
        Object.values(languages)?.map(
          (language, id) =>
            language +
            (Object.values(languages).length > 1
              ? Object.values(languages).length - 1 === id
                ? ``
                : `, `
              : ""),
        ),
      fullWidth: false,
    },
    { id: 5, label: "Subregion", value: subregion, fullWidth: true },
    { id: 6, label: "Capital", value: capital, fullWidth: true },
  ];

  return (
    <div className="flex h-full w-auto flex-col gap-2 px-4 md:min-w-[45%] md:max-w-[45%] md:px-0">
      <h3 className="pb-4 text-2xl font-bold">{name}</h3>
      <div className="flex flex-wrap items-start justify-between gap-2 md:flex-row md:items-center md:gap-0">
        {detailsList?.map((detailedInfo) => (
          <div
            className={`${
              detailedInfo.fullWidth ? `` : `md:w-1/2`
            } flex w-full items-center gap-2`}
            key={detailedInfo.id}
          >
            <h4 className="text-base font-semibold">{detailedInfo.label}</h4>
            <h5>{detailedInfo.value}</h5>
          </div>
        ))}
      </div>
      {borders && borders?.length > 0 && <BorderCountries borders={borders} />}
    </div>
  );
}
