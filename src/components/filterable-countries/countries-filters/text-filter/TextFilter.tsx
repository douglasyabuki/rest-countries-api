"use client";

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
    <div className="relative flex items-center rounded-lg transition-all duration-150 dark:text-dark-mode-text">
      <input
        type={"text"}
        value={textFilter}
        onInput={onInputHandler}
        className="selection:outline-none focus:outline-none"
        placeholder="Search for a country .."
      ></input>
    </div>
  );
}
