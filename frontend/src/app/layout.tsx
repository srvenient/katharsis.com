import type { Metadata } from "next";
import "./globals.css";
import React from "react";

export const metadata: Metadata = {
  title: "Katharsis",
  description: "In a world where efficiency and organization are key to success, we present an Inventory Management System designed to streamline inventory control, reduce costs, and enhance productivity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
}
