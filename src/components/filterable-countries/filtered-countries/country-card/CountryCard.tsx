"use client";

import { Country } from "@/services/countries";
import * as React from "react";
import Link from "next/link";
import CardFlag from "./card-flag/CardFlag";
import CardInfo from "./card-info/CardInfo";

export interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link
      href={`/countries/${country.numericCode}`}
      className="flex h-[400px] w-[300px] transform-gpu flex-col items-center justify-start overflow-hidden rounded-md bg-light-mode-element shadow-sm shadow-transparent-black transition-all duration-200 hover:-translate-y-2 hover:shadow-md dark:bg-dark-mode-element"
    >
      <CardFlag flags={country.flags}></CardFlag>
      <CardInfo
        name={country.name}
        population={country.population}
        region={country.region}
        capital={country.capital}
      ></CardInfo>
    </Link>
  );
}
