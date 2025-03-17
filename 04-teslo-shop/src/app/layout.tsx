import type { Metadata } from "next";
import "./globals.css";
import { inter } from "@/config/fonts";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: { template: `%s - Teslo | Shop`, default: "Home - Teslo | Shop" },

  description: "Tienda de ropa virtual",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(inter.className);
  return (
    <Providers>
      <html lang="es">
        <body className={inter.className}>{children}</body>
      </html>
    </Providers>
  );
}
