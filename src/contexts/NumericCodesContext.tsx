"use client";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";
import { createContext, useContext, useMemo } from "react";

interface NumericCode {
  numericCode: string;
  alpha3Code: string;
}

interface NumericCodesContextInterface {
  numericCodes: NumericCode[];
}

interface NumericCodesProviderInterface {
  children: React.ReactNode;
}

export const NumericCodesContext = createContext(
  {} as NumericCodesContextInterface,
);

export function NumericCodesProvider({
  children,
}: NumericCodesProviderInterface) {
  const { response, request } = useRequest(
    "GET",
    "/api/countries/numeric-codes",
    {
      onSuccess: (data) => console.log("Data fetched successfully:", data),
      onError: (error) => console.error("Error fetching data:", error),
    },
  );

  useOnMount(request);

  const numericCodes = useMemo(() => {
    if (response) {
      return response.numericCodes;
    }
    return [];
  }, [response]);

  return (
    <NumericCodesContext.Provider value={{ numericCodes }}>
      {children}
    </NumericCodesContext.Provider>
  );
}

export function useNumericCodesContext() {
  return useContext(NumericCodesContext);
}
