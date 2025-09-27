"use client";

import { LoadingFrame } from "@/components/loading-frame/LoadingFrame";
import { Navbar } from "@/components/navbar/Navbar";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { Difficulty } from "@/interfaces/game";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const difficultyLevels: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export default function Page() {
  const { loading, response, request } = useRequest("GET", "/api/countries", {
    onSuccess: (data) => console.log("Data fetched successfully:", data),
    onError: (error) => console.error("Error fetching data:", error),
  });

  useOnMount(request);

  return (
    <div className="wrapper min-h-screen w-full overflow-hidden">
      <Navbar title="Guessing Game" href="/" />
      <div className="flex h-auto min-h-full w-auto min-w-full p-4">
        {loading || response === null ? (
          <LoadingFrame />
        ) : (
          <div className="flex h-full w-screen items-start justify-center overflow-y-auto overflow-x-hidden">
            <div className="flex h-auto w-[300px] flex-col gap-8 overflow-hidden">
              <h2 className="text-center text-lg">
                Choose the difficulty level
              </h2>
              <div className="flex flex-col gap-1">
                {Object.entries(difficultyLevels).map(([key, value]) => (
                  <Link
                    key={key}
                    href={"/game/" + key}
                    className={twMerge(
                      "h-11 w-full scale-95 transform-gpu truncate rounded-md border-[1px] px-4 py-2 text-start shadow-sm shadow-transparent-black duration-150 lg:hover:scale-100 lg:hover:font-bold lg:hover:shadow-md lg:disabled:hover:scale-95 lg:disabled:hover:font-normal",
                      "border-dark-mode-element dark:border-light-mode-element",
                    )}
                  >
                    {value}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
