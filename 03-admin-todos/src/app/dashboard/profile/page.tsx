"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log("client side");
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <hr />
      <div className="flex flex-col ">
        <span>Email: {session?.user?.email ?? "No email"}</span>
        <span>Image: {session?.user?.image ?? "No image"}</span>
        <span>Name: {session?.user?.name ?? "No name"}</span>
        <span>Id: {session?.user?.id ?? "No id"}</span>
        <span className="capitalize">Roles: {session?.user?.roles?.join(", ") ?? "No roles"}</span>
      </div>
    </div>
  );
}
