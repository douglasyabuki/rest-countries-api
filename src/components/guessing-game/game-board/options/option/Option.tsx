"use client";
import {
  FlagOption,
  gameStages,
} from "@/components/guessing-game/GuessingGame";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

interface OptionProps {
  currentOption: FlagOption;
  gameStage: string;
  onAnswerClick: (clickedOption: FlagOption) => void;
}

export default function Option({
  currentOption,
  gameStage,
  onAnswerClick,
}: OptionProps) {
  const [isDisabled, setIsDisabled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setIsDisabled(false);
  }, [gameStage]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentOption.isSelected) {
      timeout = setTimeout(() => {
        setIsDisabled(true);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [currentOption.isSelected]);

  const onClickHandler = () => {
    onAnswerClick(currentOption);

    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur();
      }
    }, 300);
  };

  return (
    <button
      ref={buttonRef}
      className={twMerge(
        "h-11 w-full scale-95 transform-gpu truncate rounded-md border-[1px] px-4 py-2 text-start shadow-sm shadow-transparent-black duration-150 hover:scale-100 hover:font-bold hover:shadow-md disabled:hover:scale-95 disabled:hover:font-normal",
        "border-dark-mode-element dark:border-light-mode-element",
        currentOption.isRightAnswer &&
          (currentOption.isSelected ||
            [
              gameStages.SCORING_RIGHT,
              gameStages.SCORING_WRONG,
              gameStages.ROUND_END,
            ].includes(gameStage)) &&
          "border-green-700 dark:border-green-300 disabled:border-green-500 dark:disabled:border-green-800 dark:disabled:text-gray-400",
        currentOption.isSelected &&
          !currentOption.isRightAnswer &&
          "border-red-700  dark:border-red-300 disabled:border-red-500 dark:disabled:border-red-800 dark:disabled:text-gray-400",
      )}
      onClick={onClickHandler}
      disabled={currentOption.isSelected}
    >
      {currentOption.name}
    </button>
  );
}
