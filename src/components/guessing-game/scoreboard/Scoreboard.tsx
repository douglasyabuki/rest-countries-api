"use client";

import { useEffect, useState } from "react";
import Slider from "./slider/Slider";
import { gameStages } from "../GuessingGame";
interface ScoreboardProps {
  gameStage: string;
  onReset: () => void;
}

const initialCount = { rights: 0, wrongs: 0 };

export default function Scoreboard({ gameStage, onReset }: ScoreboardProps) {
  const [displayedCount, setDisplayedCount] = useState(initialCount);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

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

    if (gameStage === gameStages.RESETTING) {
      setDisplayedCount(initialCount);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [gameStage]);

  return (
    <div className="element flex h-[150px] w-[300px] flex-col items-center justify-start gap-4 rounded-md px-6 py-3 shadow-lg shadow-transparent-black">
      <h1>Scoreboard</h1>
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
