"use client";

import { useThemeContext } from "@/contexts/ThemeContext";

export function ThemeSwitcher() {
  const { darkMode, handleThemeSwitch } = useThemeContext();
  return (
    <button
      onClick={handleThemeSwitch}
      className="opacity-80 transition-opacity duration-150 hover:opacity-100"
    >
      <h2>{darkMode ? "Dark mode" : "Light mode"}</h2>
    </button>
  );
}
