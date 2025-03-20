import { NavBar } from "@/components/navbar/NavBar";

export default function HomePage() {
  return (
    <>
      <NavBar />
      <main className="flex  flex-col items-center p-24">
        <span className="text-5xl">Home page {new Date().getTime()}</span>
      </main>
    </>
  );
}
