"use client";

import { useEffect, useMemo, useState } from "react";
import Slider from "./slider/Slider";
import { gameStages } from "../GuessingGame";
import { ReloadIcon } from "@/components/icons/Icons";
interface ScoreboardProps {
  gameStage: string;
  onReset: () => void;
}

const initialCount = { rights: 0, wrongs: 0 };

export default function Scoreboard({ gameStage, onReset }: ScoreboardProps) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (gameStage === gameStages.RESETTING) {
      setDisplayedCount({ ...initialCount });
    }

    if (gameStage === gameStages.SCORING_WRONG) {
      timeout = setTimeout(() => {
        setDisplayedCount((prev) => {
          return { ...prev, wrongs: prev.wrongs + 1 };
        });
      }, 500);
    }

    if (gameStage === gameStages.SCORING_RIGHT) {
      timeout = setTimeout(() => {
        setDisplayedCount((prev) => {
          return { ...prev, rights: prev.rights + 1 };
        });
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameStage]);

  const isReloadButtonDisabled = useMemo(() => {
    return (
      gameStage === gameStages.SCORING_RIGHT ||
      gameStage === gameStages.SCORING_WRONG ||
      gameStage === gameStages.RESETTING
    );
  }, [gameStage]);

  return (
    <div className="element flex h-[150px] w-[300px] flex-col items-center justify-start gap-4 rounded-md px-6 py-3 shadow-lg shadow-transparent-black">
      <div className="relative flex w-full items-center justify-center">
        <h1>Scoreboard</h1>
        <button
          className={`${
            gameStage === gameStages.RESETTING ? `scale-0` : `scale-100`
          } absolute right-0 flex h-6 w-6 transform-gpu items-center justify-center rounded-full bg-light-mode-background p-1 duration-150 hover:animate-spin disabled:opacity-60 dark:bg-dark-mode-background`}
          onClick={onReset}
          disabled={isReloadButtonDisabled}
        >
          <ReloadIcon />
        </button>
      </div>
      <div className="flex h-[80px] w-[260px] items-center justify-between">
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>WRONGS</h3>
          <h2 className="text-3xl">{displayedCount.wrongs}</h2>
        </div>
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>RIGHTS</h3>
          <h2 className="text-3xl">{displayedCount.rights}</h2>
        </div>
        <Slider gameStage={gameStage} onReset={onReset}></Slider>
      </div>
    </div>
  );
}
