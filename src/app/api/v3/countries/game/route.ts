import { Difficulty } from "@/interfaces/game";
import { getQueryParams } from "@/utils/request-utils";
import { NextResponse } from "next/server";
import data from "../data.json";

const DifficultyFilters: Record<
  Difficulty,
  { minPopulation: number | null; maxPopulation: number | null }
> = {
  easy: { minPopulation: 35000000, maxPopulation: null },
  medium: { minPopulation: null, maxPopulation: null },
  hard: { minPopulation: null, maxPopulation: 2000000 },
};

export async function GET(request: Request) {
  const langs: Record<string, number[]> = {};

  const { difficulty = "medium" } = getQueryParams(request.url);
  const difficultyFilters = DifficultyFilters[difficulty as Difficulty];
  const { minPopulation, maxPopulation } = difficultyFilters;

  const gameData = data
    .map((item) => {
      const { translations, flags, name, region, population } = item;
      Object.keys(translations).forEach((t) => {
        if (!langs[t]) {
          langs[t] = [1];
        } else {
          langs[t].push(1);
        }
      });
      if (
        !flags.svg ||
        (minPopulation && population < minPopulation) ||
        (maxPopulation && population > maxPopulation)
      ) {
        return null;
      }
      const { common, official } = name
      const { svg: flag } = flags
      return { name: common, flag, translations: {...translations, eng: {common, official}}, region };
    })
    .filter(Boolean);

  return NextResponse.json({
    data: gameData,
  });
}
