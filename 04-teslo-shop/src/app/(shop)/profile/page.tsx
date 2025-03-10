import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  // if (!session ?.user) redirect("/auth/login?returnTo=/profile");

  console.log(session?.user)
  if (!session?.user) redirect("/");


  return (
    <div>
      <Title title="Perfil" />

      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
