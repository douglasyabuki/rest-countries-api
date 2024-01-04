"use client";
import { FlagIcon } from "@/components/icons/Icons";
import { useEffect, useState } from "react";
interface ScoreboardProps {
  count: { rights: number; wrongs: number };
}

export default function Scoreboard({ count }: ScoreboardProps) {
  const [blockPosition, setBlockPosition] = useState<string | null>(null);
  const [displayedCount, setDisplayedCount] = useState({
    rights: 0,
    wrongs: 0,
  });

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (count.rights !== displayedCount.rights) {
      setBlockPosition("start");
      timeout = setTimeout(() => {
        setBlockPosition(null);
        setDisplayedCount((prev) => {
          return { ...prev, rights: count.rights };
        });
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [count.rights, displayedCount.rights]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (count.wrongs !== displayedCount.wrongs) {
      setBlockPosition("end");
      timeout = setTimeout(() => {
        setBlockPosition(null);
        setDisplayedCount((prev) => {
          return { ...prev, wrongs: count.wrongs };
        });
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [count.wrongs, displayedCount.wrongs]);

  return (
    <div className="element flex h-[150px] w-[300px] flex-col items-center justify-start gap-4 rounded-md px-6 py-3 shadow-lg shadow-transparent-black">
      <h1>Scoreboard</h1>
      <div className="flex h-[80px] w-[260px] items-center justify-between">
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>RIGHTS</h3>
          <h2 className="text-3xl">{displayedCount.rights}</h2>
        </div>
        <div className="flex h-auto w-[80px] flex-col items-center justify-center gap-4">
          <h3>WRONGS</h3>
          <h2 className="text-3xl">{displayedCount.wrongs}</h2>
        </div>
        <div
          className={`${
            blockPosition === null
              ? `translate-x-[90px]`
              : `${
                  blockPosition === "start"
                    ? `translate-x-0`
                    : `translate-x-[180px]`
                }`
          } absolute flex h-[80px] w-[80px] transform-gpu items-center justify-center rounded-md bg-light-mode-background p-4 shadow-lg shadow-transparent-black transition-transform duration-150 dark:bg-dark-mode-background`}
        >
          <FlagIcon />
        </div>
      </div>
    </div>
  );
}
