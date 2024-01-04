"use client";
import { FlagIcon } from "@/components/icons/Icons";
import * as React from "react";

interface ScoreboardProps {
  count: { rights: number; wrongs: number };
}

export default function Scoreboard({ count }: ScoreboardProps) {
  return (
    <div className="element flex h-[150px] w-[300px] flex-col items-center justify-start gap-4 rounded-md px-6 py-3 shadow-lg shadow-transparent-black">
      <h1>Scoreboard</h1>
      <div className="flex h-[80px] w-[240px] items-center justify-between">
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>RIGHTS</h3>
          <h2 className="text-3xl">{count.rights}</h2>
        </div>
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>WRONGS</h3>
          <h2 className="text-3xl">{count.wrongs}</h2>
        </div>
        <div className="absolute flex h-[80px] w-[80px] translate-x-20 transform-gpu items-center justify-center rounded-md bg-light-mode-background p-4 shadow-lg shadow-transparent-black transition-transform duration-150 dark:bg-dark-mode-background">
          <FlagIcon />
        </div>
      </div>
    </div>
  );
}
