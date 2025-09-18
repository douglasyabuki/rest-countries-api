"use client";

import { Country } from "@/interfaces/countries";
import { useState } from "react";
import { CountriesFilters } from "./countries-filters/CountriesFilters";
import { FilteredCountries } from "./filtered-countries/FilteredCountries";

export interface IFilterableCountriesProps {
  allCountries: Country[];
}

export function FilterableCountries({
  allCountries,
}: IFilterableCountriesProps) {
  const [textFilter, setTextFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");

  return (
    <div className="flex h-full w-screen flex-col gap-4 overflow-y-auto overflow-x-hidden">
      <CountriesFilters
        textFilter={textFilter}
        setTextFilter={setTextFilter}
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />
      <FilteredCountries
        regionFilter={regionFilter}
        textFilter={textFilter}
        allCountries={allCountries}
      />
    </div>
  );
}
