import { Region } from "@/interfaces/countriesv3";

interface RegionOption {
  id: number;
  value: Region | "";
  content: Region | "All Regions";
}

export const regionList: RegionOption[] = [
  { id: 0, value: "Africa", content: "Africa" },
  { id: 1, value: "America", content: "America" },
  { id: 2, value: "Asia", content: "Asia" },
  { id: 3, value: "Europe", content: "Europe" },
  { id: 4, value: "Oceania", content: "Oceania" },
  { id: 5, value: "", content: "All Regions" },
];
