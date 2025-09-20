import { NextResponse } from "next/server";
import data from "../data.json";

export async function GET() {
  const codes = data.map((item) => {
    const { cca2, cca3, ccn3, cioc } = item;
    return { cca2, cca3, ccn3, cioc };
  });
  return NextResponse.json({
    codes,
  });
}
