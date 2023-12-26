"use client";

import { Country } from "@/services/countries";
import * as React from "react";

export interface FilteredCountriesProps {
  allCountries: Country[];
  textFilter: string;
  regionFilter: string;
}

export default function FilteredCountries({
  allCountries,
  textFilter,
  regionFilter,
}: FilteredCountriesProps) {
  const filteredCountries = React.useMemo(() => {
    return allCountries?.length > 0
      ? allCountries.filter((country) => {
          if (
            textFilter !== "" &&
            country.name.toLowerCase().indexOf(textFilter.toLowerCase()) === -1
          ) {
            return false;
          }
          if (
            regionFilter !== "" &&
            country.region.toLowerCase().indexOf(regionFilter.toLowerCase()) ===
              -1
          ) {
            return false;
          }
          return true;
        })
      : [];
  }, [textFilter, regionFilter, allCountries]);

  return <div>{JSON.stringify(filteredCountries)}</div>;
}
