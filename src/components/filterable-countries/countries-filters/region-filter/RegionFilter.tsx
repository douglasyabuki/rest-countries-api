"use client";

import * as React from "react";
import { regionList } from "./region-list/region-list";

export interface RegionFilterProps {
  regionFilter: string;
  onRegionFilterChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function RegionFilter({
  regionFilter,
  onRegionFilterChange,
}: RegionFilterProps) {
  return (
    <select
      className="rounded-md border-[1px] px-4 py-3 outline-none filter"
      onChange={onRegionFilterChange}
      value={regionFilter}
    >
      <option value="" disabled hidden>
        Filter by Region
      </option>
      {regionList.map((item) => (
        <option key={item.id} value={item.value}>
          {item.content}
        </option>
      ))}
    </select>
  );
}
