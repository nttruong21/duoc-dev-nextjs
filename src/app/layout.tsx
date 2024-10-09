// Core
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// App
import { Toaster } from "@/components/ui/sonner";

// Internal
import { Header } from "./_components";
import { BASE_METADATA } from "./shared-metadata";

import "./globals.css";

// Font
const inter = Inter({ subsets: ["latin"] });

// Metadata
export const metadata: Metadata = BASE_METADATA;

// Component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Template
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="container py-6">{children}</main>
        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
