"use client";

import { Country } from "@/interfaces/countries";
import * as React from "react";
import { Flag } from "../GuessingGame";
import Image from "next/image";

export interface GameBoardProps {
  allCountries: Country[];
  currentFlag: Flag;
  currentOptions: string[];
  onRightAnswer: () => void;
  onWrongAnswer: () => void;
  onGameReset: () => void;
}

export default function GameBoard({
  allCountries,
  currentFlag,
  currentOptions,
  onRightAnswer,
  onWrongAnswer,
  onGameReset,
}: GameBoardProps) {
  return (
    <div>
      {currentFlag.flag && (
        <div className="relative h-[200px] w-[300px] overflow-hidden">
          <Image
            src={currentFlag.flag}
            alt={`${currentFlag.flag}`}
            fill={true}
            priority={true}
          />
        </div>
      )}
    </div>
  );
}
