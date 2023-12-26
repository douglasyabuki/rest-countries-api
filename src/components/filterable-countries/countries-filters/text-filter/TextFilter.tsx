"use client";

import { SearchIcon } from "@/components/icons/Icons";
import * as React from "react";

export interface ITextFilterProps {
  textFilter: string;
  setTextFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default function TextFilter({
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
        className="rounded-md border-[1px] border-light-mode-element bg-light-mode-element py-3 pl-9 pr-4 outline-none transition-colors duration-150 focus:border-dark-mode-element dark:border-dark-mode-element dark:bg-dark-mode-element dark:focus:border-light-mode-element"
        placeholder="Search for a country .."
      ></input>
    </div>
  );
}
