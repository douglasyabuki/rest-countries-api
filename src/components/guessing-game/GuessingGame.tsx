"use client";

import { Country } from "@/interfaces/countries";
import { useState } from "react";
import Scoreboard from "./scoreboard/Scoreboard";

export interface IGuessingGameProps {
  allCountries: Country[];
}

export default function GuessingGame({ allCountries }: IGuessingGameProps) {
  const [count, setCount] = useState({ rights: 0, wrongs: 0 });

  const addWrongAnswer = () => {
    setCount((prev) => {
      return { ...prev, wrongs: prev.wrongs + 1 };
    });
  };
  const addRightAnswer = () => {
    setCount((prev) => {
      return { ...prev, rights: prev.rights + 1 };
    });
  };

  return (
    <div className="flex h-full w-screen flex-col items-center gap-4 overflow-y-auto overflow-x-hidden">
      <Scoreboard count={count}></Scoreboard>
      <div className="flex w-[250px] items-center justify-between">
        <button
          onClick={addRightAnswer}
          className="w-[100px] rounded-md border-[1px] border-dark-mode-element px-4 py-3 font-bold"
        >
          RIGHT!
        </button>
        <button
          onClick={addWrongAnswer}
          className="w-[100px] rounded-md border-[1px] border-dark-mode-element px-4 py-3 font-bold"
        >
          WRONG!
        </button>
      </div>
    </div>
  );
}
