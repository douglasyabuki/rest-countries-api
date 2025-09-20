import { NextResponse } from "next/server";
import data from "../../data.json";

export async function GET(_: Request, context: any) {
  const { params } = context;
  const country = data.find(({ ccn3, cioc, cca2, cca3 }) =>
    [ccn3, cioc, cca2, cca3].includes(params.code),
  );
  return NextResponse.json({
    country,
  });
}
