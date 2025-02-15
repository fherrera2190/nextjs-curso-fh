import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page",
  description: "description",
  keywords: ["contact", "page", "nextjs"],
};

export default function ContactPage() {
  return <span className="text-5xl">Contact Page</span>;
}
