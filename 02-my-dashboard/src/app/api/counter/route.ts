import { NextResponse } from "next/server";

export async function GET(request: Request) {
  console.log({ method: request });
  return NextResponse.json({
    count: 100,
  });
}
