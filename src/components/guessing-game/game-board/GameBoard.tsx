"use client";

import Image from "next/image";
import { Flag, FlagOption, gameStages } from "../GuessingGame";
import Options from "./options/options";
import { useMemo } from "react";

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
      className={`${
        isFallen ? `translate-y-full` : `translate-y-0`
      } transform-gpu delay-150 duration-200 ease-in-out`}
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
        ></Options>
      )}
    </div>
  );
}
