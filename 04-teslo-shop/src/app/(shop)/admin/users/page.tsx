export const revalidate = 0;

import { Title } from "@/components";
import { redirect } from "next/navigation";
import { UserTable } from "./ui/UserTable";
import { getPaginatedUsers } from "@/actions";

export default async function UsersPage() {
  const { ok, users = [] } = await getPaginatedUsers();

  if (!ok) redirect("/auth/login?returnTo=/orders");

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UserTable users={users} />
      </div>
    </>
  );
}
