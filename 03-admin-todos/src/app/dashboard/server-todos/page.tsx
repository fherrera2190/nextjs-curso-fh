export const dynamic = "force-dynamic";
export const revalidate = 0;

import { getUserServerSession } from "@/auth/actions/auth-actions";
import prisma from "@/lib/prisma";
import { NewTodo, TodosGrid } from "@/todos/indext";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Listado de Todos",
  description: "Listado de Todos",
};

export default async function ServerTodosPage() {
  const user = await getUserServerSession();

  if (!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    orderBy: { description: "asc" },
    where: { userId: user.id },
  });

  return (
    <>
      <span className="text-3xl mb-10">Server Actions</span>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}
