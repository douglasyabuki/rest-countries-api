"use client";

import { HourglassIcon } from "../icons/Icons";

export default function LoadingFrame() {
  return (
    <div className="flex h-full min-h-96 w-screen flex-col items-center justify-center gap-4 py-8">
      <div className="flex h-auto w-auto animate-spin items-center justify-center">
        <HourglassIcon />
      </div>
      <h2>Loading Info...</h2>
    </div>
  );
}
