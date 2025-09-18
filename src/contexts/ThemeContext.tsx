"use client";
import { useOnMount } from "@/hooks/use-on-mount";
import { createContext, useContext, useState } from "react";

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
    const savedTheme = localStorage.getItem("theme");

    if (
      savedTheme === "dark" ||
      (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  };

  useOnMount(getUserPreferences);

  const handleThemeSwitch = () => {
    const newState = !darkMode;
    setDarkMode(newState);

    if (newState) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
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
