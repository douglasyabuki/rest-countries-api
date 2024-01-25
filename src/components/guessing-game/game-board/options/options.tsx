"use client";

import * as React from "react";
import Option from "./option/Option";
import { FlagOption } from "../../GuessingGame";

interface OptionsProps {
  currentOptions: FlagOption[];
  gameStage: string;
  onAnswerClick: (clickedOption: FlagOption) => void;
}

export default function Options({
  currentOptions,
  gameStage,
  onAnswerClick,
}: OptionsProps) {
  return (
    <div className="flex flex-col items-center justify-start gap-2 py-3">
      {currentOptions.map((currentOption, id) => (
        <Option
          key={id}
          onAnswerClick={onAnswerClick}
          gameStage={gameStage}
          currentOption={currentOption}
        ></Option>
      ))}
    </div>
  );
}
