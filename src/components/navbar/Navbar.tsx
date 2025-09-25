"use client";

import Link from "next/link";
import { ArrowBackIcon } from "../icons/Icons";
import { ThemeSwitcher } from "./theme-switcher/ThemeSwitcher";

interface Navbar {
  title: string;
  href?: string;
}

export function Navbar({ title, href }: Navbar) {
  return (
    <header className="item-center flex h-16 w-full transform-gpu items-center justify-between bg-light-mode-background px-4 text-light-mode-text shadow-sm transition-colors duration-150 dark:bg-dark-mode-element dark:text-dark-mode-text">
      {href ? (
        <Link
          href={href}
          className="group flex gap-2 font-bold tracking-[0.005em]"
        >
          <div className="flex h-6 w-6 scale-50 items-center justify-center opacity-0 duration-150 group-hover:scale-100 group-hover:opacity-100">
            <ArrowBackIcon />
          </div>
          <h1 className="-translate-x-8 duration-150 group-hover:translate-x-0">
            {title}
          </h1>
        </Link>
      ) : (
        <h1>{title}</h1>
      )}
      <ThemeSwitcher />
    </header>
  );
}
