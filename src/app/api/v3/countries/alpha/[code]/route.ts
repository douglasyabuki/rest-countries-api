import { NextResponse } from "next/server";
import data from "../../data.json";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const country = data.filter(({ ccn3, cioc, cca2 }) =>
    [ccn3, cioc, cca2].includes(params.code),
  );
  return NextResponse.json({
    country,
  });
}
