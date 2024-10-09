// Core
import { FC } from "react";
import Link from "next/link";
// import { cookies } from "next/headers";

// App
import { Profile } from "@/services/account";

// Component
const Header: FC<{ profile?: Profile }> = ({ profile }) => {
  // const cookieToken = cookies().get("token")?.value;
  const cookieToken = undefined;

  // Template
  return (
    <header className="border-b border-neutral-300">
      <div className="container h-14 flex items-center justify-between gap-4">
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>

        {cookieToken ? (
          <div className="space-x-4">
            <Link href="/profile">
              Hi <strong>{profile?.name}</strong>
            </Link>
            <Link href={`/auth/sign-out?token=${cookieToken}`}>Sign out</Link>
          </div>
        ) : (
          <div className="space-x-4">
            <Link href="/auth/sign-in">Sign in</Link>
            <Link href="/auth/sign-up">Sign up</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
