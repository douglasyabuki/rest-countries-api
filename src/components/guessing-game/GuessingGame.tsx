"use client";

import { Country } from "@/interfaces/countries";
import { useState } from "react";
import Scoreboard from "./scoreboard/Scoreboard";

export interface IGuessingGameProps {
  allCountries: Country[];
}

export default function GuessingGame({ allCountries }: IGuessingGameProps) {
  const [count, setCount] = useState({ rights: 0, wrongs: 0 });

  return (
    <div className="flex h-full w-screen flex-col items-center gap-4 overflow-y-auto overflow-x-hidden">
      <Scoreboard count={count}></Scoreboard>
    </div>
  );
}
