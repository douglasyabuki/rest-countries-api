"use client";
import { createContext, useState, useEffect, useContext } from "react";

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

  useEffect(() => {
    handleThemeSwitch();
  }, []);

  const handleThemeSwitch = () => {
    setDarkMode((prevState) => {
      const newState = !prevState;
      if (newState) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newState;
    });
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
