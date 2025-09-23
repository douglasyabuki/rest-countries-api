"use client";

import { SearchIcon } from "@/components/icons/Icons";
import * as React from "react";

export interface ITextFilterProps {
  textFilter: string;
  onTextFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function TextFilter({
  textFilter,
  onTextFilterChange,
}: ITextFilterProps) {
  return (
    <div className="group relative flex items-center">
      <div className="absolute left-2 h-6 w-6 items-center justify-center">
        <SearchIcon />
      </div>
      <input
        type={"text"}
        value={textFilter}
        onInput={onTextFilterChange}
        className="rounded-md border-[1px] py-3 pl-9 pr-4 outline-none filter"
        placeholder="Search for a country .."
      />
    </div>
  );
}
