"use client";

// Core
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";

// App
import useAuthStore from "@/stores/auth";
import useProfileStore from "@/stores/profile";
import CircleLoading from "@/components/app/circle-loading";

// Component
const AuthSection = () => {
  // Stores
  // Auth
  const authStore = useAuthStore(
    useShallow(({ isHydrated, isSignedIn, token }) => ({
      isHydrated,
      isSignedIn,
      token,
    }))
  );

  // Profile
  const profileStore = useProfileStore(
    useShallow(({ isHydrated, name }) => ({ isHydrated, name }))
  );

  // Template
  if (!authStore.isHydrated || !profileStore.isHydrated) {
    return <CircleLoading />;
  }

  return (
    <div className="space-x-4">
      {authStore.isSignedIn ? (
        <>
          <Link href="/profile">
            Hi <strong>{profileStore.name}</strong>
          </Link>

          <Link href={`/auth/sign-out?token=${authStore.token}`}>Sign out</Link>
        </>
      ) : (
        <>
          <Link href="/auth/sign-in">Sign in</Link>
          <Link href="/auth/sign-up">Sign up</Link>
        </>
      )}
    </div>
  );
};

export default AuthSection;
