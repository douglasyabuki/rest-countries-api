interface Car {
  signs?: string[];
  side: "right" | "left";
}

interface CoatOfArms {
  png: "https://mainfacts.com/media/images/coats_of_arms/af.png";
  svg: "https://mainfacts.com/media/images/coats_of_arms/af.svg";
}

type Coordinates = [number, number];

export type Currencies = Record<
  string,
  {
    symbol?: string;
    name: string;
  }
>;

type DayOfWeek =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

type Denonyms = Record<
  string,
  {
    f: string;
    m: string;
  }
>;

export interface Flags {
  svg?: string;
  png?: string;
  alt?: string;
}

interface InternationalDialingCode {
  root?: string;
  suffixes?: string[];
}

export type Languages = Record<string, string>;

interface MapsUrls {
  googleMaps?: string;
  openStreetMaps?: string;
}

interface Name {
  common: string;
  official: string;
  nativeName?: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
}

interface PostalCode {
  format: string | null;
  regex: string | null;
}

type Translations = Record<
  string,
  {
    official: string;
    common: string;
  }
>;

export type CountrySummary = Pick<
  Country,
  "cca2" | "ccn3" | "cioc" | "flags" | "region" | "population"
> & {
  name: string;
  capital?: string;
};

export interface Country {
  name: Name;

  tld?: string[];
  cca2: string;
  ccn3?: string;
  cca3: string;
  cioc?: string;

  independent?: boolean;
  status: string;
  unMember: boolean;

  currencies?: Currencies;

  idd?: InternationalDialingCode;

  capital?: string[];
  altSpellings?: string[];

  region: string;
  subregion?: string;

  languages?: Languages;

  latlng: Coordinates;
  landlocked: boolean;
  borders?: string[];
  area: number;

  demonyms?: Denonyms;

  translations?: Translations;

  flag?: string;
  maps: MapsUrls;

  population: number;

  gini?: Record<string, number>;
  fifa?: string;

  car?: Car;

  timezones: string[];
  continents: string[];

  flags: Flags;

  coatOfArms?: CoatOfArms;

  startOfWeek?: DayOfWeek;

  capitalInfo?: {
    latlng?: [number, number];
  };

  postalCode?: PostalCode;
}

export type Countries = Country[];
