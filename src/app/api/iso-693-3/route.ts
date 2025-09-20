import { getQueryParams } from "@/utils/request-utils";
import { NextResponse } from "next/server";
import data from "./iso-693-3.json";

export async function GET(request: Request) {
  const { ids } = getQueryParams(request.url);
  const filters: string[] = [];
  if (ids?.length > 0) {
    ids.split(",").forEach((i) => filters.push(i.toLowerCase()));
  }
  return NextResponse.json({
    data:
      filters.length > 0
        ? data.filter((row) => filters.includes(row.id))
        : data,
  });
}
