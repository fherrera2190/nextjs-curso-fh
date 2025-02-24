import { NextResponse } from "next/server";

export async function GET(request: Request) {
  void request;

  return NextResponse.json({
    message: "Hello World",
  });
}

export async function POST(request: Request) {
  void request;
  return NextResponse.json({
    message: "Hello World",
  });
}
