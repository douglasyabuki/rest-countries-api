import { Region, Translations } from "./countriesv3";

export type Difficulty = "easy" | "medium" | "hard"
export interface GameCountry {
    flag: string;
    translations: Translations;
    region: Region;
}