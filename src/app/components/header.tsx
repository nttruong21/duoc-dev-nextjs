"use client";

import Link from "next/link";
import { useAppContext } from "./app-provider";
import clientSession from "@/services/clientSession";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <header className="border-b border-neutral-300">
      <div className="container h-14 flex items-center justify-between gap-4">
        <div className="space-x-4">
          <Link href="/">Home</Link>
          {isLoggedIn && (
            <>
              <Link href="/profile">Profile</Link>
              <Link href="/products">Products</Link>
            </>
          )}
        </div>

        {isLoggedIn ? (
          <Link href={`/auth/sign-out?token=${clientSession.token}`}>
            Sign out
          </Link>
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
