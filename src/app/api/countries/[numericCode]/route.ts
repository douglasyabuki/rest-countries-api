import data from "../data.json";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: any) {
  const { params } = context;
  const country = data.filter(
    (item) => params.numericCode === item.numericCode,
  );
  return NextResponse.json({
    country,
  });
}
