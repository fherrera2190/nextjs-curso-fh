import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Segments) {

  const { id } = await params;

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    return NextResponse.json(
      {
        message: `Todo with id ${id} not found`,
      },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      todo,
    }
  );
}
