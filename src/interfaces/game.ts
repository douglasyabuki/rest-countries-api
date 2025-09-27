import { Region, Translations } from "./countriesv3";

export type Difficulty = "easy" | "medium" | "hard"
export interface GameCountry {
    name: string;
    flag: string;
    translations: Translations;
    region: Region;
}