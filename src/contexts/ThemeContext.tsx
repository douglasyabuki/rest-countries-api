"use client";
import { useOnMount } from "@/hooks/use-on-mount";
import { createContext, useState, useContext } from "react";

interface ThemeContextInterface {
  darkMode: boolean;
  handleThemeSwitch: () => void;
}

interface ThemeProviderInterface {
  children: React.ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextInterface);

export function ThemeProvider({ children }: ThemeProviderInterface) {
  const [darkMode, setDarkMode] = useState(false);

  const getUserPreferences = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  };

  useOnMount(getUserPreferences);

  const handleThemeSwitch = () => {
    const newState = !darkMode;
    setDarkMode(newState);
    newState
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  };

  return (
    <ThemeContext.Provider value={{ darkMode, handleThemeSwitch }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  return useContext(ThemeContext);
}
