"use client";

// Core
import { toast } from "sonner";
import { useEffect, Suspense } from "react";
import { useShallow } from "zustand/react/shallow";
import { useRouter, useSearchParams } from "next/navigation";

// App
import useAuthStore from "@/stores/auth";
import authServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import useProfileStore from "@/stores/profile";
import { HttpCancelledError } from "@/lib/http";
import CircleLoading from "@/components/app/circle-loading";

// Component
const SignOutHandler = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const revoke = searchParams.get("revoke");

  // Stores
  // Auth
  const authStore = useAuthStore(
    useShallow(({ token, reset }) => ({
      token,
      reset,
    }))
  );

  // Profile
  const resetProfileStore = useProfileStore((state) => state.reset);

  // Effects
  useEffect(() => {
    const abortController = new AbortController();
    const handleSignOut = async () => {
      try {
        if (token !== authStore.token) {
          throw new Error("Token not match");
        }

        if (revoke === "true") {
          await authServices.signOut();
        }

        // Remove cookie token for Next server
        await authServices.removeTokenCookie(abortController.signal);

        toast.success("Success", {
          description: "Sign out successfully",
        });

        // Reset auth & profile store
        authStore.reset();
        resetProfileStore();

        router.push("/");
        router.refresh();
      } catch (error) {
        handleApiError({
          error,
        });
      }
    };

    handleSignOut();

    return () => {
      abortController.abort(
        new HttpCancelledError({
          data: {
            message: "Cancel request",
          },
        })
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Template
  return (
    <div className="flex justify-center py-8">
      <CircleLoading />
    </div>
  );
};

const SignOut = () => {
  return (
    <Suspense fallback="Loading ...">
      <SignOutHandler />;
    </Suspense>
  );
};

export default SignOut;
