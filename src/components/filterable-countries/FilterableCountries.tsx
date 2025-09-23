"use client";

import { CountrySummary } from "@/interfaces/countriesv3";
import { useState } from "react";
import { CountriesFilters } from "./countries-filters/CountriesFilters";
import { FilteredCountries } from "./filtered-countries/FilteredCountries";

export interface IFilterableCountriesProps {
  allCountries: CountrySummary[];
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
        onTextFilterChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTextFilter(e.target.value)
        }
        regionFilter={regionFilter}
        onRegionFilterChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setRegionFilter(e.target.value);
        }}
      />
      <FilteredCountries
        regionFilter={regionFilter}
        textFilter={textFilter}
        allCountries={allCountries}
      />
    </div>
  );
}
