"use client";

import DetailedCountry from "@/components/detailed-country/DetailedCountry";
import { HourglassIcon } from "@/components/icons/Icons";
import Navbar from "@/components/navbar/Navbar";
import { useRequest } from "@/hooks/use-request";
import { useEffect } from "react";

export default function Page({ params }: { params: { numericCode: string } }) {
  const { loading, response, request } = useRequest(
    "GET",
    `/api/countries/${params.numericCode}`,
    {
      onSuccess: (data) => console.log("Data fetched successfully:", data),
      onError: (error) => console.error("Error fetching data:", error),
    },
  );

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
        {loading || response === null || !response.country ? (
          <div className="flex h-full min-h-96 w-screen flex-col items-center justify-center gap-4 py-8">
            <div className="flex h-auto w-auto animate-spin items-center justify-center">
              <HourglassIcon />
            </div>
            <h2>Loading Info...</h2>
          </div>
        ) : (
          <DetailedCountry countries={response.country}></DetailedCountry>
        )}
      </div>
    </div>
  );
}