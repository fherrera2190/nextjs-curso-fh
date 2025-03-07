import { TabBar } from "@/components";
import { cookies } from "next/headers";

export const metadata = {
  title: "Cookies Page",
  description: "Cookies Page",
};
export default async function CookiesPage() {
  const cookiesStore = await cookies();

  const cookieTab = cookiesStore.get("selectedTab")?.value ?? 1;

  return (
    <div className="grid grid-cols1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+cookieTab} />
      </div>
    </div>
  );
}
