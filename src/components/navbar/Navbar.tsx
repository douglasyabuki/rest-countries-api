"use client";

import ThemeSwitcher from "./theme-switcher/ThemeSwitcher";

export default function Navbar({ title }: { title: string }) {
  return (
    <header className="item-center flex h-16 w-full transform-gpu items-center justify-between bg-light-mode-background px-4 text-light-mode-text shadow-sm transition-colors duration-150 dark:bg-dark-mode-element dark:text-dark-mode-text">
      <h1>{title}</h1>
      <ThemeSwitcher />
    </header>
  );
}
