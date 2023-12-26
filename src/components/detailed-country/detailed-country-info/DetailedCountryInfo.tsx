"use client";

import { CountryCurrency, CountryLanguage } from "@/services/countries";
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
}: DetailedCountryInfoProps) {
  return (
    <div className="flex h-full w-full min-w-[45%] flex-col">
      <h4>{name}</h4>
      <h4>{nativeName}</h4>
      <h4>{region}</h4>
      <h4>{subregion}</h4>
      <h4>{capital}</h4>
      <h4>{topLevelDomain}</h4>
      <h4>{currencies[0]?.name}</h4>
      <h4>{languages[0]?.name}</h4>
      <h4>
        {borders?.length > 0 ? (
          borders.map((border, id) => id <= 3 && <h5 key={id}>{border}</h5>)
        ) : (
          <></>
        )}
      </h4>
    </div>
  );
}
