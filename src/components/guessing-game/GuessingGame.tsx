"use client";

import { useOnMount } from "@/hooks/use-on-mount";
import { GameCountry } from "@/interfaces/game";
import { randomNumber, randomUniqueNumbersList } from "@/utils/math-utils";
import { useMemo, useState } from "react";
import { LoadingFrame } from "../loading-frame/LoadingFrame";
import { GameBoard } from "./game-board/GameBoard";
import { Scoreboard } from "./scoreboard/Scoreboard";

interface GuessingGame {
  allCountries: GameCountry[];
}

export interface Flag {
  flag: string;
  name: string;
}

export interface FlagOption extends Partial<GameCountry> {
  isSelected: boolean;
  isRightAnswer: boolean;
}

const initialFlag = {
  flag: "",
  name: "",
};

const initialOption = {
  name: "",
  isSelected: false,
  isRightAnswer: false,
};

export const gameStages = {
  INITIALIZING: "initializing",
  IN_PROGRESS: "in progress",
  SCORING_RIGHT: "scoring right",
  SCORING_WRONG: "scoring wrong",
  ROUND_END: "round end",
  GAME_OVER: "game over",
  RESETTING: "resetting",
};

const wrongOptionsNumber = 4;
const numberOfRounds = 20;

export function GuessingGame({ allCountries }: GuessingGame) {
  const [gameStage, setGameStage] = useState(gameStages.INITIALIZING);
  const [flags, setFlags] = useState<Flag[]>([initialFlag]);
  const [options, setOptions] = useState<FlagOption[][]>([[initialOption]]);
  const [currentRound, setCurrentRound] = useState(0);

  const onWrongAnswer = () => {
    setGameStage(gameStages.SCORING_WRONG);
    setTimeout(() => {
      onRoundEnd();
    }, 1000);
  };

  const onRightAnswer = () => {
    setGameStage(gameStages.SCORING_RIGHT);
    setTimeout(() => {
      onRoundEnd();
    }, 1000);
  };

  const onAnswerClick = (clickedOption: FlagOption) => {
    if (gameStage !== gameStages.IN_PROGRESS) {
      return;
    }
    const currentOptionsCopy = [...options[currentRound]].map((option) => {
      return option.name === clickedOption.name
        ? { ...option, isSelected: true }
        : option;
    });
    const allOptions = JSON.parse(JSON.stringify(options)).map(
      (options: FlagOption[], id: number) =>
        id === currentRound ? currentOptionsCopy : options,
    );
    setOptions(allOptions);
    clickedOption.isRightAnswer ? onRightAnswer() : onWrongAnswer();
  };

  const onRoundEnd = () => {
    setGameStage(gameStages.ROUND_END);
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      currentRound < numberOfRounds - 1
        ? (setCurrentRound((prev) => prev + 1),
          setGameStage(gameStages.IN_PROGRESS))
        : setGameStage(gameStages.GAME_OVER);
    }, 500);
  };

  const onGameReset = () => {
    setGameStage(gameStages.RESETTING);
    setTimeout(() => {
      onGameStart();
    }, 500);
  };

  const onGameStart = () => {
    const gameFlags = [];
    const gameFlagsOptions = [];
    let unplayedCountries = [...allCountries];

    for (let i = 0; i < numberOfRounds; i++) {
      const randomFlagResult = getRandomFlag(unplayedCountries);
      if (!randomFlagResult) {
        console.error("Unable to obtain a random flag. Ending game start.");
        break;
      }
      const { flag, options, newUnplayedCountries } = randomFlagResult;
      gameFlags.push(flag);
      gameFlagsOptions.push(options);
      unplayedCountries = newUnplayedCountries;
    }

    setFlags(gameFlags);
    setOptions(gameFlagsOptions);
    setCurrentRound(0);
    setGameStage(gameStages.IN_PROGRESS);
  };

  const getRandomFlag = (unplayedCountries: GameCountry[]) => {
    if (unplayedCountries.length === 0) {
      console.log("No more countries to play with.");
      return null;
    }

    const randomId = randomNumber(0, unplayedCountries.length - 1);
    const chosenCountry = unplayedCountries[randomId];
    const sameRegionCountries = unplayedCountries.filter(
      (country) =>
        country.region === chosenCountry.region &&
        country.name !== chosenCountry.name,
    );

    if (sameRegionCountries.length < wrongOptionsNumber) {
      return getRandomFlag(
        unplayedCountries.filter(
          (country) => country.name !== chosenCountry.name,
        ),
      );
    }

    const wrongOptions = randomUniqueNumbersList(
      0,
      sameRegionCountries.length - 1,
      wrongOptionsNumber,
    ).map((index) => sameRegionCountries[index]);

    const options = [chosenCountry, ...wrongOptions]
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((option) => ({
        ...option,
        isSelected: false,
        isRightAnswer: option.name === chosenCountry.name,
      }));

    return {
      flag: { flag: chosenCountry.flag, name: chosenCountry.name },
      options,
      newUnplayedCountries: unplayedCountries.filter(
        (country) => country.name !== chosenCountry.name,
      ),
    };
  };

  useOnMount(onGameStart);

  const isGameReady = useMemo(() => {
    return flags.length === numberOfRounds && options.length === numberOfRounds;
  }, [flags.length, options.length]);

  return (
    <div className="flex h-full w-screen items-start justify-center overflow-y-auto overflow-x-hidden">
      {isGameReady ? (
        <div className="flex h-auto w-[300px] flex-col gap-2 overflow-hidden">
          <Scoreboard gameStage={gameStage} onReset={onGameReset} />
          <GameBoard
            currentFlag={flags[currentRound]}
            currentOptions={options[currentRound]}
            gameStage={gameStage}
            onAnswerClick={onAnswerClick}
          />
        </div>
      ) : (
        <LoadingFrame />
      )}
    </div>
  );
}
