"use client";

import Image from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { Flag, FlagOption, gameStages } from "../GuessingGame";
import Options from "./options/options";

interface GameBoardProps {
  currentFlag: Flag;
  currentOptions: FlagOption[];
  gameStage: string;
  onAnswerClick: (clickedOption: FlagOption) => void;
}

export default function GameBoard({
  currentFlag,
  currentOptions,
  gameStage,
  onAnswerClick,
}: GameBoardProps) {
  const isFallen = useMemo(() => {
    return (
      gameStage === gameStages.ROUND_END || gameStage === gameStages.RESETTING
    );
  }, [gameStage]);

  return (
    <div
      className={twMerge(
        "transform-gpu delay-150 duration-200 ease-in-out",
        isFallen ? "translate-y-full" : "translate-y-0",
      )}
    >
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
      {currentOptions?.length > 0 && (
        <Options
          currentOptions={currentOptions}
          onAnswerClick={onAnswerClick}
          gameStage={gameStage}
        />
      )}
    </div>
  );
}
