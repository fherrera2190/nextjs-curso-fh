import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  void request;
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: "test1@google.com",
      password: bcrypt.hashSync("123456", 10),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
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
      },
    },
  });

  return NextResponse.json({
    message: "Seed executed",
  });
}

// export async function POST(request: Request) {
//   return NextResponse.json({
//     message: "Hello World",
//   });
// }
