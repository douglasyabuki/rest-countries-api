import { getQueryParams } from "@/utils/request-utils";
import { NextResponse } from "next/server";
import data from "./data.json";
import minimalData from "./minimal-data.json";

export async function GET(request: Request) {
  const { minimal } = getQueryParams(request.url);
  const isMinimal = minimal === "true";

  return NextResponse.json({
    data: isMinimal ? minimalData : data,
  });
}
