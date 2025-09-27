"use client";
import {
  FlagOption,
  gameStages,
} from "@/components/guessing-game/GuessingGame";
import { useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";

interface OptionProps {
  currentOption: FlagOption;
  gameStage: string;
  gameLanguage: string;
  onAnswerClick: (clickedOption: FlagOption) => void;
}

export function Option({
  currentOption,
  gameLanguage,
  gameStage,
  onAnswerClick,
}: OptionProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { name, isRightAnswer, isSelected, translations } = currentOption;

  const onClickHandler = () => {
    onAnswerClick(currentOption);

    setTimeout(() => {
      if (buttonRef.current) {
        buttonRef.current.blur();
      }
    }, 300);
  };

  const displayedName = useMemo(() => {
    return translations && translations.hasOwnProperty(gameLanguage)
      ? translations[gameLanguage].common
      : name;
  }, [translations, gameLanguage, name]);

  return (
    <button
      ref={buttonRef}
      className={twMerge(
        "h-11 w-full scale-95 transform-gpu truncate rounded-md border-[1px] px-4 py-2 text-start shadow-sm shadow-transparent-black duration-150 lg:hover:scale-100 lg:hover:font-bold lg:hover:shadow-md lg:disabled:hover:scale-95 lg:disabled:hover:font-normal",
        "border-dark-mode-element dark:border-light-mode-element",
        isRightAnswer &&
          (isSelected ||
            [
              gameStages.SCORING_RIGHT,
              gameStages.SCORING_WRONG,
              gameStages.ROUND_END,
            ].includes(gameStage)) &&
          "border-green-700 disabled:border-green-500 dark:border-green-300 dark:disabled:border-green-800 dark:disabled:text-gray-400",
        isSelected &&
          !isRightAnswer &&
          "border-red-700 disabled:border-red-500 dark:border-red-300 dark:disabled:border-red-800 dark:disabled:text-gray-400",
      )}
      onClick={onClickHandler}
      disabled={isSelected}
    >
      {displayedName}
    </button>
  );
}
