"use client";

import FilterableCountries from "@/components/filterable-countries/FilterableCountries";
import Navbar from "@/components/navbar/Navbar";
import { useRequest } from "@/hooks/use-request";
import { Country, getAllCountries } from "@/services/countries";
import { useEffect, useState } from "react";

export default function Page() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);

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
      setAllCountries([]);
    };
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-light-mode-background text-light-mode-text transition-all duration-200 dark:bg-dark-mode-background dark:text-dark-mode-text">
      <Navbar />
      <div className="flex h-full w-screen p-4">
        {loading ? (
          <div>Loading!</div>
        ) : (
          <FilterableCountries
            allCountries={response?.data}
          ></FilterableCountries>
        )}
      </div>
    </div>
  );
}
