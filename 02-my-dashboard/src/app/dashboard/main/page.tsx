import { WidgetsGrid } from "@/components";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function MainPage() {
  return (
    <div className="text-black p-2">
      <h1 className="text-xl">Dashboard</h1>
      <span>Información General</span>
        <WidgetsGrid />
      
    </div>
  );
}
