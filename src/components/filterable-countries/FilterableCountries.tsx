"use client";

import { Country } from "@/services/countries";

export interface IFilterableCountriesProps {
  allCountries: Country[];
}

export default function FilterableCountries(
  allCountries: IFilterableCountriesProps,
) {
  return <div>{JSON.stringify(allCountries)}</div>;
}
