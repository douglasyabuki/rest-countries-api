"use client";

import { ReloadIcon, SettingsIcon } from "@/components/icons/Icons";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { gameStages } from "../GuessingGame";
import { Settings } from "./settings/Settings";
import { Slider } from "./slider/Slider";

interface Scoreboard {
  gameStage: string;
  onReset: () => void;
}

const initialCount = { rights: 0, wrongs: 0 };

export function Scoreboard({ gameStage, onReset }: Scoreboard) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);
  const [isSettingsToggled, setIsSettingsToggled] = useState(false);

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
    <>
      <div className="element z-30 flex h-[150px] w-[300px] flex-col items-center justify-start gap-4 rounded-md px-6 py-3 shadow-2xl shadow-transparent-black">
        <div className="relative flex w-full items-center justify-center">
          <button
            className={twMerge(
              "absolute left-0 flex h-6 w-6 items-center justify-center rounded-full bg-light-mode-background p-1 outline-none duration-150 disabled:opacity-60 dark:bg-dark-mode-background",
              isSettingsToggled && "rotate-180",
            )}
            onClick={() => setIsSettingsToggled(!isSettingsToggled)}
          >
            <SettingsIcon />
          </button>
          <h1>Scoreboard</h1>
          <button
            className={twMerge(
              "absolute right-0 h-6 w-6 items-center justify-center rounded-full bg-light-mode-background p-1 outline-none hover:animate-spin disabled:opacity-60 dark:bg-dark-mode-background",
              gameStage === gameStages.RESETTING ? "hidden" : "flex",
            )}
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
          <Slider gameStage={gameStage} onReset={onReset} />
        </div>
      </div>
      <Settings
        isSettingsToggled={isSettingsToggled}
        onSettingsUntoggle={() => setIsSettingsToggled(false)}
      />
    </>
  );
}
