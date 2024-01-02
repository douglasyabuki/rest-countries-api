"use client";

import { useEffect } from "react";

export const useOnMount = (fn: () => void) => {
  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fn();
    }

    return () => {
      ignore = true;
    };
    //eslint-disable-next-line
  }, []);
};
