"use server";

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const sleep = async (seconds: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  // 'use server';

  await sleep(3);
  const todo = await prisma.todo.findFirst({ where: { id } });
  if (!todo) {
    throw new Error(`Todo with id ${id} not found`);
  }

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos"); //actualiza solo el componente del path
  return updatedTodo;
};

export const addTodo = async (description: string) => {
  const user = await getUserServerSession();

  try {
    if (!user || !user.id) {
      throw new Error("User not logged in");
    }

    const todo = await prisma.todo.create({
      data: { description, userId: user.id },
    });

    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>", todo);
    revalidatePath("/dashboard/server-todos"); //actualiza solo el componente del path

    return todo;
  } catch (error) {
    void error;

    return { message: "error creando todo" };
  }
};

export const deleteTodos = async () => {
  try {
    await prisma.todo.deleteMany({
      where: {
        complete: true,
      },
    });
    revalidatePath("/dashboard/server-todos"); //actualiza solo el componente del path
  } catch (error) {
    void error;
    return { message: "error eliminando todos" };
  }
};
