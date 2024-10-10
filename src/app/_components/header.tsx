// Core
import Link from "next/link";

// Internal
import AuthSection from "./auth-section";
import { logging } from "@/lib/utils";

// Component
const Header = () => {
  // Template
  return (
    <header className="border-b border-neutral-300">
      <div className="container h-14 flex items-center justify-between gap-4">
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
        </div>

        <AuthSection />
      </div>
    </header>
  );
};

export default Header;
