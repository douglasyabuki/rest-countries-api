"use client";

import { CountrySummary } from "@/interfaces/countriesv3";
import Link from "next/link";
import { CardFlag } from "./card-flag/CardFlag";
import { CardInfo } from "./card-info/CardInfo";

export interface CountryCardProps {
  country: CountrySummary;
}

export function CountryCard({ country }: CountryCardProps) {
  const { cca2, ccn3, cioc } = country;
  return (
    <Link
      href={`/countries/${cioc || ccn3 || cca2 || ""}`}
      className="element flex h-[400px] w-[300px] transform-gpu flex-col items-center justify-start overflow-hidden rounded-md shadow-sm shadow-transparent-black hover:-translate-y-2 hover:shadow-md"
    >
      <CardFlag flags={country.flags} />
      <CardInfo
        name={country.name}
        population={country.population}
        region={country.region}
        capital={country.capital}
      />
    </Link>
  );
}
