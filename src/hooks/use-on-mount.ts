"use client";

import { useEffect } from "react";

export const useOnMount = (fn: () => void) => {
  useEffect(() => {
    fn();
    //eslint-disable-next-line
  }, []);
};
