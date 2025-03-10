"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  //   console.log({ name, email, password });
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password, 10),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    console.log(user);
    return {
      ok: true,
      user,
      message: "Usuario registrado correctamente",
    };
  } catch (error) {
    // console.log(error)
    // console.log(error); me da error no se por que
    void error;
    return {
      ok: false,
      message: "Error al registrar usuario",
    };
  }
};
