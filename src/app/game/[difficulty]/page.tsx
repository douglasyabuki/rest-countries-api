"use client";

import { GuessingGame } from "@/components/guessing-game/GuessingGame";
import { LoadingFrame } from "@/components/loading-frame/LoadingFrame";
import { Navbar } from "@/components/navbar/Navbar";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { Difficulty } from "@/interfaces/game";

export default function Page({
  params,
}: {
  params: { difficulty: Difficulty };
}) {
  const { loading, response, request } = useRequest(
    "GET",
    `/api/v3/countries/game?difficulty=${params.difficulty}`,
    {
      onSuccess: (data) => console.log("Data fetched successfully:", data),
      onError: (error) => console.error("Error fetching data:", error),
    },
  );

  useOnMount(request);

  return (
    <div className="wrapper h-dvh w-full overflow-hidden">
      <Navbar title="Guessing Game" href="/game" />
      <div className="flex h-auto min-h-full w-auto min-w-full p-4">
        {loading || response === null ? (
          <LoadingFrame />
        ) : (
          <GuessingGame allCountries={response?.data} />
        )}
      </div>
    </div>
  );
}
