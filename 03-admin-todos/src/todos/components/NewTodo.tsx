"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
// import * as todoApi from "../helpers/todos";
// import { useRouter } from "next/navigation";
import { addTodo, deleteTodos } from "../actions/todo-actions";


export const NewTodo = () => {
  const [formData, setFormData] = useState({ description: "" });

  // const router = useRouter();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.description) return;

    // await todoApi.createTodo(formData.description);
    await addTodo(formData.description);
    setFormData({ ...formData, ["description"]: "" });
    // router.refresh();
  };

  const deleteCompletes = async () => {
    // await todoApi.deleteTodos();
    // router.refresh();

    await deleteTodos();
  };

  return (
    <form className="flex w-full" onSubmit={onSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        name="description"
        value={formData.description}
        onChange={onChange}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => deleteCompletes()}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        <span className="ml-2">Borrar Completados</span>
      </button>
    </form>
  );
};
