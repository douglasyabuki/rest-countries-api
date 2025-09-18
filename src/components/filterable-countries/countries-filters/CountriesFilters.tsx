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
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <TextFilter textFilter={textFilter} setTextFilter={setTextFilter} />
      <RegionFilter
        regionFilter={regionFilter}
        setRegionFilter={setRegionFilter}
      />
    </div>
  );
}
