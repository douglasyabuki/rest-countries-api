"use client";

import { SearchIcon } from "@/components/icons/Icons";
import * as React from "react";

export interface ITextFilterProps {
  textFilter: string;
  setTextFilter: React.Dispatch<React.SetStateAction<string>>;
}

export function TextFilter({
  textFilter,
  setTextFilter,
}: ITextFilterProps) {
  const onInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFilter(event.target.value);
  };

  return (
    <div className="group relative flex items-center">
      <div className="absolute left-2 h-6 w-6 items-center justify-center">
        <SearchIcon />
      </div>
      <input
        type={"text"}
        value={textFilter}
        onInput={onInputHandler}
        className="rounded-md border-[1px] py-3 pl-9 pr-4 outline-none filter"
        placeholder="Search for a country .."
      />
    </div>
  );
}
