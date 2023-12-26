"use client";

import FilterableCountries from "@/components/filterable-countries/FilterableCountries";
import Navbar from "@/components/navbar/Navbar";
import { Country, getAllCountries } from "@/services/countries";
import { useEffect, useState } from "react";

export default function Page() {
  const [allCountries, setAllCountries] = useState<Country[]>([]);

  useEffect(() => {
    let ignore = false;

    getAllCountries().then((res) => {
      if (res) {
        if (!ignore) {
          setAllCountries(res);
        }
      }
    });

    return () => {
      ignore = true;
      setAllCountries([]);
    };
  }, []);

  return (
    <div className="min-h-screen w-screen overflow-hidden bg-light-mode-background text-light-mode-text dark:bg-dark-mode-background dark:text-dark-mode-text">
      <Navbar />
      <div className="flex h-full w-screen p-4">
        <FilterableCountries allCountries={allCountries}></FilterableCountries>
      </div>
    </div>
  );
}
