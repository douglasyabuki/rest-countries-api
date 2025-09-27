"use client";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface GameLanguageOption {
  id: string;
  language: string;
}

interface GameLanguageContextInterface {
  loading: boolean;
  gameLanguage: string;
  gameLanguageOptions: GameLanguageOption[];
  handleGameLanguageSwitch: (language: string) => void;
}

export const GameLanguageContext = createContext(
  {} as GameLanguageContextInterface,
);

export function GameLanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameLanguage, setGameLanguage] = useState("eng");
  const { loading, response, request } = useRequest(
    "GET",
    `/api/v3/countries/game/languages`,
    {
      onSuccess: ({ data }) =>
        console.log("Language data fetched successfully:", data),
      onError: (error) => console.error("Error fetching language data:", error),
    },
  );

  useOnMount(request);

  const gameLanguageOptions: GameLanguageOption[] = useMemo(() => {
    return response?.data?.length > 0 ? response.data : [];
  }, [response]);

  useEffect(() => {
    if (gameLanguageOptions.length > 0) {
      const savedGameLanguage = localStorage.getItem("game-language");
      if (
        savedGameLanguage &&
        gameLanguageOptions.some(
          (l) => l.id.toLowerCase() === savedGameLanguage,
        )
      ) {
        setGameLanguage(savedGameLanguage);
      }
    }
  }, [gameLanguageOptions]);

  const handleGameLanguageSwitch = (language: string) => {
    setGameLanguage(language);
    localStorage.setItem("game-language", language);
  };

  return (
    <GameLanguageContext.Provider
      value={{
        loading,
        gameLanguage,
        gameLanguageOptions,
        handleGameLanguageSwitch,
      }}
    >
      {children}
    </GameLanguageContext.Provider>
  );
}

export function useGameLanguageContext() {
  return useContext(GameLanguageContext);
}
