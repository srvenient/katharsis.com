import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import {Poppins} from "next/font/google"

export const metadata: Metadata = {
	title: "Katharsis",
	description: "System for inventory management and sales"
};

export default function RootLayout(
	{ children }: { children: React.ReactNode },
) {
	return (
		<html lang="es">
			<body
				className=""
			>
				{children}
			</body>
		</html>
	);
}
