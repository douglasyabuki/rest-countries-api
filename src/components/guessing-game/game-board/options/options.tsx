"use client";

import { useGameLanguageContext } from "@/contexts/GameLanguageContext";
import { FlagOption } from "../../GuessingGame";
import { Option } from "./option/Option";

interface OptionsProps {
  currentOptions: FlagOption[];
  gameStage: string;
  onAnswerClick: (clickedOption: FlagOption) => void;
}

export function Options({
  currentOptions,
  gameStage,
  onAnswerClick,
}: OptionsProps) {
  const { gameLanguage } = useGameLanguageContext();

  return (
    <div className="flex flex-col items-center justify-start gap-2 py-3">
      {currentOptions.map((currentOption, id) => (
        <Option
          key={id}
          currentOption={currentOption}
          gameLanguage={gameLanguage}
          gameStage={gameStage}
          onAnswerClick={onAnswerClick}
        />
      ))}
    </div>
  );
}
