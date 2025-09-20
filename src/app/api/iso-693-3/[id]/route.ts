import { NextResponse } from "next/server";
import data from "../iso-693-3.json";

export async function GET(_: Request, context: any) {
  const { params } = context;
  const language = data.find((item) => params.id === item.id);
  return NextResponse.json({
    language,
  });
}
