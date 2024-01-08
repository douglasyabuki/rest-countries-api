"use client";

import { Country } from "@/interfaces/countries";
import { useMemo, useState } from "react";
import Scoreboard from "./scoreboard/Scoreboard";
import GameBoard from "./game-board/GameBoard";
import { randomNumber, randomUniqueNumbersList } from "@/utils/math-utils";
import { useOnMount } from "@/hooks/use-on-mount";

interface GuessingGameProps {
  allCountries: Country[];
}

interface Count {
  rights: number;
  wrongs: number;
}

export interface Flag {
  flag: string;
  name: string;
}

const initialCount = {
  rights: 0,
  wrongs: 0,
};

const initialFlag = {
  flag: "",
  name: "",
};

export default function GuessingGame({ allCountries }: GuessingGameProps) {
  const [count, setCount] = useState(initialCount);
  const [currentFlag, setCurrentFlag] = useState(initialFlag);
  const [playedCountries, setPlayedCountries] = useState([""]);
  const [currentOptions, setCurrentOptions] = useState([""]);
  const wrongOptionsNumber = 4;

  const unplayedCountries = useMemo(() => {
    return allCountries.filter((item) => !playedCountries.includes(item.name));
  }, [allCountries, playedCountries]);

  const onWrongAnswer = () => {
    setCount((prev) => {
      return { ...prev, wrongs: prev.wrongs + 1 };
    });
  };

  const onRightAnswer = () => {
    setCount((prev) => {
      return { ...prev, rights: prev.rights + 1 };
    });
  };

  const onGameReset = () => {
    setCount(initialCount);
  };

  const onGameStart = () => {};

  const getRandomFlag = () => {
    const countryNamesList = [];
    const randomId = randomNumber(0, unplayedCountries.length);
    const { flag, region, name } = unplayedCountries[randomId];
    const sameRegionCountries = unplayedCountries.filter(
      (item) => item.name !== name && item.region === region,
    );
    const sameRegionCountriesLength = sameRegionCountries.length;
    if (sameRegionCountriesLength < wrongOptionsNumber) {
      return console.log("Not enough countries to play another round");
    }
    const randomNumbersList = randomUniqueNumbersList(
      0,
      sameRegionCountries.length,
      wrongOptionsNumber,
    );
    countryNamesList.push(name);
    randomNumbersList.forEach((number) =>
      countryNamesList.push(sameRegionCountries[number].name),
    );
    setCurrentFlag({ flag, name });
    setCurrentOptions(countryNamesList.sort((a, b) => a.localeCompare(b)));
  };

  useOnMount(getRandomFlag);

  return (
    <div className="flex h-full w-screen flex-col items-center gap-4 overflow-y-auto overflow-x-hidden">
      <Scoreboard count={count}></Scoreboard>
      <GameBoard
        allCountries={allCountries}
        onRightAnswer={onRightAnswer}
        onWrongAnswer={onWrongAnswer}
        onGameReset={onGameReset}
        currentFlag={currentFlag}
        currentOptions={currentOptions}
      ></GameBoard>
    </div>
  );
}
