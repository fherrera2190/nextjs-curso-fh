import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await prisma.todo.deleteMany();
  const todo = await prisma.todo.createMany({
    data: [
      {
        description: "Learn Next.js",
        complete: true,
      },
      {
        description: "Learn Prisma",
      },
      {
        description: "Learn TailwindCSS",
      },
      {
        description: "Learn TypeScript",
      },
      {
        description: "Learn GraphQL",
      },
    ],
  });
  console.log(todo);
  return NextResponse.json({
    message: "Seed executed",
  });
}

// export async function POST(request: Request) {
//   return NextResponse.json({
//     message: "Hello World",
//   });
// }
