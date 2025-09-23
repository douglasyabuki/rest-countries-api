"use client";

import { RegionFilter } from "./region-filter/RegionFilter";
import { TextFilter } from "./text-filter/TextFilter";

export interface CountriesFiltersProps {
  textFilter: string;
  onTextFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  regionFilter: string;
  onRegionFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function CountriesFilters({
  textFilter,
  onTextFilterChange,
  regionFilter,
  onRegionFilterChange,
}: CountriesFiltersProps) {
  return (
    <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <TextFilter textFilter={textFilter} onTextFilterChange={onTextFilterChange} />
      <RegionFilter
        regionFilter={regionFilter}
        onRegionFilterChange={onRegionFilterChange}
      />
    </div>
  );
}
