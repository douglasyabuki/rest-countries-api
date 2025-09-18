"use client";

import FilterableCountries from "@/components/filterable-countries/FilterableCountries";
import LoadingFrame from "@/components/loading-frame/LoadingFrame";
import Navbar from "@/components/navbar/Navbar";
import { useOnMount } from "@/hooks/use-on-mount";
import { useRequest } from "@/hooks/use-request";

export default function Page() {
  const { loading, response, request } = useRequest("GET", "/api/countries", {
    onSuccess: (data) => console.log("Data fetched successfully:", data),
    onError: (error) => console.error("Error fetching data:", error),
  });

  useOnMount(request);

  return (
    <div className="wrapper min-h-screen w-full overflow-hidden">
      <Navbar title="Where in the world" />
      <div className="flex h-auto min-h-full w-auto min-w-full p-4">
        {loading || response === null ? (
          <LoadingFrame />
        ) : (
          <FilterableCountries allCountries={response?.data} />
        )}
      </div>
    </div>
  );
}
