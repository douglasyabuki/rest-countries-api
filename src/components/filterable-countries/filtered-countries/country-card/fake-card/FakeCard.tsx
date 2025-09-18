"use client";

import Link from "next/link";

export function FakeCard() {
  return (
    <Link
      className="element flex h-[400px] w-[300px] transform-gpu animate-pulse flex-col items-center justify-start overflow-hidden rounded-md shadow-sm shadow-transparent-black hover:-translate-y-2 hover:shadow-md"
      href={"/game"}
    >
      <div className="h-[200px] w-[300px] bg-dark-mode-element dark:bg-light-mode-element"></div>
      <div className="flex w-full flex-col items-start justify-start gap-2 p-4">
        <div className="h-9 w-full rounded-md bg-dark-mode-element py-1 dark:bg-light-mode-element"></div>
        <div className="h-6 w-2/3 rounded-md bg-dark-mode-element dark:bg-light-mode-element"></div>
        <div className="h-6 w-2/3 rounded-md bg-dark-mode-element dark:bg-light-mode-element"></div>
        <div className="h-6 w-2/3 rounded-md bg-dark-mode-element dark:bg-light-mode-element"></div>
      </div>
    </Link>
  );
}
