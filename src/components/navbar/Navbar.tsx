"use client";

import ThemeSwitcher from "./theme-switcher/ThemeSwitcher";

export default function Navbar() {
  return (
    <header className="dark:bg-dark-mode-element dark:text-dark-mode-text item-center text-light-mode-text bg-light-mode-background flex h-16 w-full transform-gpu items-center justify-between px-4 shadow-sm transition-colors duration-150">
      <h1>Where in the world</h1>
      <ThemeSwitcher />
    </header>
  );
}
