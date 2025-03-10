"use server";

import { signIn } from "@/auth";

export const actionLogin = async (
  prevState: string,
  formData: FormData
): Promise<string> => {
  // console.log("prevState ", formData.get("email"), formData.get("password"));

  try {
    //console.log(Object.fromEntries(formData));
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "Success";
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).type === "CredentialsSignin") return "CredentialsSignin";
    return "UnknownError";
  }
};
