"use client";

import Image from "next/image";
import { Flag, FlagOption } from "../GuessingGame";
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
