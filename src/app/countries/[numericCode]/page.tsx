"use client";

import DetailedCountry from "@/components/detailed-country/DetailedCountry";
import LoadingFrame from "@/components/loading-frame/LoadingFrame";
import Navbar from "@/components/navbar/Navbar";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";

export default function Page({ params }: { params: { numericCode: string } }) {
  const { loading, response, request } = useRequest(
    "GET",
    `/api/countries/${params.numericCode}`,
    {
      onSuccess: (data) => console.log("Data fetched successfully:", data),
      onError: (error) => console.error("Error fetching data:", error),
    },
  );

  useOnMount(request);

  return (
    <div className="min-h-screen w-full overflow-hidden bg-light-mode-background text-light-mode-text transition-all duration-200 dark:bg-dark-mode-background dark:text-dark-mode-text">
      <Navbar title="Where in the world" />
      <div className="flex h-auto min-h-full w-auto min-w-full p-4">
        {loading || response === null || !response.country ? (
          <LoadingFrame />
        ) : (
          <DetailedCountry countries={response.country} />
        )}
      </div>
    </div>
  );
}
