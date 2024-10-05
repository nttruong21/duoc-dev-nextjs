import Link from "next/link";
import { cookies } from "next/headers";

const Header = () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <header className="border-b border-neutral-300">
      <div className="container h-14 flex items-center justify-between gap-4">
        <div className="space-x-4">
          <Link href="/">Home</Link>
          {token && (
            <>
              <Link href="/profile">Profile</Link>
              <Link href="/products">Products</Link>
            </>
          )}
        </div>

        {token ? (
          <Link href={`/auth/sign-out?token=${token.value}`}>Sign out</Link>
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
