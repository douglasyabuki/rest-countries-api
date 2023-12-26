export interface CountryFlags {
  svg: string;
  png: string;
}

export interface CountryCurrency {
  code: string;
  name: string;
  symbol: string;
}

export interface CountryLanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}
export interface Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: [number, number];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: CountryFlags;
  currencies: CountryCurrency[];
  languages: CountryLanguage[];
  translations: {
    [key: string]: string;
  };
  flag: string;
  regionalBlocs: Array<{
    acronym: string;
    name: string;
  }>;
  cioc: string;
  independent: boolean;
}

export async function getAllCountries() {
  const response = await fetch("/api/countries", {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}
