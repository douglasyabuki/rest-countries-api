"use client";
import { FlagOption } from "@/components/guessing-game/GuessingGame";
import { useEffect, useState } from "react";

interface OptionProps {
  optionValues: FlagOption;
  gameStage: string;
  onAnswerClick: () => void;
}

export default function Option({
  optionValues,
  gameStage,
  onAnswerClick,
}: OptionProps) {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(false);
  }, [gameStage]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (optionValues.isSelected) {
      timeout = setTimeout(() => {
        setIsDisabled(true);
      }, 500);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [optionValues.isSelected]);

  const onClickHandler = () => {
    onAnswerClick();
  };

  return (
    <button
      className={`${
        optionValues.isSelected
          ? `${
              optionValues.isRightAnswer
                ? `border-green-700 disabled:border-green-500 dark:disabled:border-green-950 dark:disabled:text-gray-400`
                : `border-red-700 disabled:border-red-500 dark:disabled:border-red-950 dark:disabled:text-gray-400`
            }`
          : `border-dark-mode-element dark:border-light-mode-element`
      } h-11 w-full transform-gpu truncate rounded-md border-[1px] px-4 py-2 text-start shadow-sm shadow-transparent-black duration-150 hover:scale-105 hover:font-bold hover:shadow-md disabled:hover:scale-100 disabled:hover:font-normal`}
      onClick={onClickHandler}
      disabled={optionValues.isSelected}
    >
      {optionValues.name}
    </button>
  );
}
