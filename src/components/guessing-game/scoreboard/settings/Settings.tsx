import { CheckIcon, CloseIcon } from "@/components/icons/Icons";
import { LoadingFrame } from "@/components/loading-frame/LoadingFrame";
import { useGameLanguageContext } from "@/contexts/GameLanguageContext";
import { useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { WheelPicker } from "../WheelPicker";

interface Settings {
  isSettingsToggled: boolean;
  onSettingsUntoggle: () => void;
}

export const Settings = ({
  isSettingsToggled,
  onSettingsUntoggle,
}: Settings) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { gameLanguage, gameLanguageOptions, handleGameLanguageSwitch } =
    useGameLanguageContext();

  useEffect(() => {
    if (isSettingsToggled) {
      const id = gameLanguageOptions
        .map((option) => option.id)
        .indexOf(gameLanguage);
      if (id !== -1) {
        setSelectedIndex(id);
      }
    }
  }, [isSettingsToggled, gameLanguage, gameLanguageOptions]);

  const options = useMemo(() => {
    return gameLanguageOptions.map((option) => option.language);
  }, [gameLanguageOptions]);

  return (
    <div
      className={twMerge(
        "group absolute z-20 box-border flex h-[150px] w-[300px] flex-col items-center justify-start gap-12 overflow-hidden rounded-md border-[2px] border-light-mode-element bg-light-mode-background px-6 py-3 shadow-xl duration-150 dark:border-dark-mode-element dark:bg-dark-mode-background",
        isSettingsToggled && "h-fit translate-y-[155px]",
      )}
    >
      <h2>Select a language</h2>
      {gameLanguageOptions?.length > 0 ? (
        <>
          <WheelPicker
            items={options}
            selectedIndex={selectedIndex}
            onSelectionChange={(index) => {
              setSelectedIndex(index);
            }}
            infinite={true}
            visibleItems={5}
            itemHeight={50}
          />
          <div className="flex w-full items-center justify-between px-8">
            <button
              className="flex h-12 w-12 items-center justify-center gap-2 rounded-full p-1 text-sm focus:outline-none disabled:opacity-60"
              onClick={onSettingsUntoggle}
            >
              <CloseIcon />
            </button>
            <button
              className="flex h-12 w-12 items-center justify-center gap-2 rounded-full p-1 text-sm focus:outline-none disabled:opacity-60"
              onClick={() => {
                handleGameLanguageSwitch(gameLanguageOptions[selectedIndex].id);
                onSettingsUntoggle();
              }}
            >
              <CheckIcon />
            </button>
          </div>
        </>
      ) : (
        <LoadingFrame />
      )}
    </div>
  );
};
