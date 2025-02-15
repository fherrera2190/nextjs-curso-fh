import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing Page",
  description: "description",
  keywords: ["pricing", "page", "nextjs"],
};
export default function PricingPage() {
  return <span className="text-5xl">Pricing Page</span>;
}
