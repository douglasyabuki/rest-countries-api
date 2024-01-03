"use client";

import * as React from "react";
import { regionList } from "./region-list/region-list";

export interface RegionFilterProps {
  regionFilter: string;
  setRegionFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function RegionFilter({
  regionFilter,
  setRegionFilter,
}: RegionFilterProps) {
  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(event.target.value);
  };

  return (
    <select
      className="rounded-md border-[1px] px-4 py-3 outline-none filter"
      onChange={onChangeHandler}
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
