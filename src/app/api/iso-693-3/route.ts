import { NextResponse } from "next/server";
import data from "./iso-693-3.json";

export async function GET() {
  return NextResponse.json({
    data,
  });
}
