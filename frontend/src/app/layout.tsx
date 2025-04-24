import type { Metadata } from "next";
import { Inter, Shantell_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Header from "@/components/landing/header/Header";
import Footer from "@/components/landing/footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"]
});

const shantell_sans = Shantell_Sans({
  variable: "--font-shantell-sans",
  display: "swap",
  style: "normal",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"]
});

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
      <body
        className={`${inter.variable} ${shantell_sans.variable}`}
      >
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
