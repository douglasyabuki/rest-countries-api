import iso693data from "@/app/api/iso-693-3/iso-693-3.json";
import { NextResponse } from "next/server";
import countriesData from "../../data.json";

export async function GET() {
  const langs: Record<string, number[]> = {};
  const expectedLength = countriesData.length;

  countriesData.forEach((item) => {
    const { translations } = item;
    Object.keys(translations).forEach((t) => {
      if (!langs[t]) {
        langs[t] = [1];
      } else {
        langs[t].push(1);
      }
    });
  });

  const validLanguages = Object.keys(langs).filter(
    (key) =>
      langs[key].reduce((curr, acc) => (acc += curr), 0) === expectedLength,
  );

  const data = [{ id: 'eng', language: "English"}]

  iso693data
    .forEach(({ id, ref_name }) => {
      if (validLanguages.some((l) => l.toLowerCase() === id.toLowerCase())) {
        data.push({ id, language: ref_name });
      }
    })
  
  data.sort((a, b) => a.language.localeCompare(b.language))

  return NextResponse.json({
    data,
  });
}
