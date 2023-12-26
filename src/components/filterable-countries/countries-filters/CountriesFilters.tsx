"use client";

import RegionFilter from "./region-filter/RegionFilter";
import TextFilter from "./text-filter/TextFilter";

export interface CountriesFiltersProps {
  textFilter: string;
  setTextFilter: React.Dispatch<React.SetStateAction<string>>;
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function CountriesFilters({
  textFilter,
  setTextFilter,
  regionFilter,
  setRegionFilter,
}: CountriesFiltersProps) {
  return (
    <div className="flex w-full items-center justify-between">
      <TextFilter
        textFilter={textFilter}
        setTextFilter={setTextFilter}
      ></TextFilter>
      <RegionFilter
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      ></RegionFilter>
    </div>
  );
}
