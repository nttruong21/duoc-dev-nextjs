import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import Header from "./components/header";
import AppProvider from "./components/app-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider initialToken={cookieStore.get("token")?.value}>
          <Header />
          <main className="container py-6">{children}</main>
        </AppProvider>

        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
