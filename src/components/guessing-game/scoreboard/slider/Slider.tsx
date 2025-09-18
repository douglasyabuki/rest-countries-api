"use client";

import { FlagIcon, ReloadIcon } from "@/components/icons/Icons";
import { twMerge } from "tailwind-merge";
import { gameStages } from "../../GuessingGame";

interface SliderProps {
  gameStage: string;
  onReset: () => void;
}

export function Slider({ gameStage, onReset }: SliderProps) {
  const renderDictionary = {
    [gameStages.SCORING_WRONG]: "bg-red-700 translate-x-0",
    [gameStages.SCORING_RIGHT]: "bg-green-700 translate-x-[180px]",
    [gameStages.INITIALIZING]:
      "bg-light-mode-background dark:bg-dark-mode-background translate-x-[90px]",
    [gameStages.IN_PROGRESS]:
      "bg-light-mode-background dark:bg-dark-mode-background translate-x-[90px]",
    [gameStages.ROUND_END]:
      "bg-light-mode-background dark:bg-dark-mode-background translate-x-[90px]",
    [gameStages.GAME_OVER]:
      "bg-light-mode-background dark:bg-dark-mode-background translate-x-[90px]",
    [gameStages.RESETTING]:
      "bg-light-mode-background dark:bg-dark-mode-background translate-x-[90px]",
  };
  return (
    <div
      className={twMerge(
        "absolute flex h-[80px] w-[80px] transform-gpu items-center justify-center rounded-md p-4 shadow-lg shadow-transparent-black transition-all duration-200",
        renderDictionary[gameStage],
      )}
    >
      {gameStage === gameStages.GAME_OVER ? (
        <button
          className="flex h-16 w-16 animate-spin items-center justify-center overflow-hidden p-2"
          onClick={onReset}
        >
          <ReloadIcon />
        </button>
      ) : (
        <FlagIcon />
      )}
    </div>
  );
}
