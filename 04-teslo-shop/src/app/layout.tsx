import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Tienda de ropa virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(inter.className);
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
