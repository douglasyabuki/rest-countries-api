import data from "../data.json";
import { NextResponse } from "next/server";

export async function GET() {
  const numericCodes = data.map((item) => {
    const { numericCode, alpha3Code, ...rest } = item;
    return { numericCode, alpha3Code };
  });
  return NextResponse.json({
    numericCodes,
  });
}
