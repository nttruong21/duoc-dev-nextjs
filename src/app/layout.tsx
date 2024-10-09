// Core
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";

// App
import { Toaster } from "@/components/ui/sonner";

// Internal
import { Header, AppProvider } from "./_components";

import "./globals.css";
import accountServices, { Profile } from "@/services/account";

const inter = Inter({ subsets: ["latin"] });

// Metadata
export const metadata: Metadata = {
  title: {
    template: "%s | Next.js",
    default: "Next.js",
  },
  description: "This is a description",
};

// Component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieToken = cookies().get("token");
  let profile: Profile | undefined = undefined;

  if (cookieToken) {
    try {
      profile = await accountServices.getProfile(cookieToken.value);
    } catch (error) {
      console.error(error);
    }
  }

  // Template
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider initialToken={cookieToken?.value} initialProfile={profile}>
          <Header profile={profile} />
          <main className="container py-6">{children}</main>
        </AppProvider>

        <Toaster richColors theme="light" />
      </body>
    </html>
  );
}
