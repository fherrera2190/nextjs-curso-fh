// import { WidgetItem } from "@/components/WidgetItem";

import { WidgetItem } from "@/components";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2">
      <WidgetItem title="Usuario conectado server side">
        <div className="flex flex-col">
          <span>Email: {session.user.email}</span>
          <span>Image: {session.user.image}</span>
          <span>Name: {session.user.name}</span>
        </div>
      </WidgetItem>
      {/* <WidgetItem /> */}
    </div>
  );
}
