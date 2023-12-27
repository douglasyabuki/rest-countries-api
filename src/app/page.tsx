"use client";

import FilterableCountries from "@/components/filterable-countries/FilterableCountries";
import { HourglassIcon } from "@/components/icons/Icons";
import LoadingFrame from "@/components/loading-frame/LoadingFrame";
import Navbar from "@/components/navbar/Navbar";
import { useRequest } from "@/hooks/use-request";
import { useEffect } from "react";

export default function Page() {
  const { loading, response, request } = useRequest("GET", "/api/countries", {
    onSuccess: (data) => console.log("Data fetched successfully:", data),
    onError: (error) => console.error("Error fetching data:", error),
  });

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      request();
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-light-mode-background text-light-mode-text transition-all duration-200 dark:bg-dark-mode-background dark:text-dark-mode-text">
      <Navbar />
      <div className="flex h-auto min-h-full w-auto min-w-full p-4">
        {loading || response === null ? (
          <LoadingFrame />
        ) : (
          <FilterableCountries
            allCountries={response?.data}
          ></FilterableCountries>
        )}
      </div>
    </div>
  );
}
