"use client";

// Core
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// App
import { HttpError } from "@/lib/http";
import useAuthStore from "@/stores/auth";
import authServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import CircleLoading from "@/components/app/circle-loading";

// Component
const SignOut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const revoke = searchParams.get("revoke");

  // Stores
  const authStoreToken = useAuthStore((state) => state.token);

  // Stores
  const resetAuthStore = useAuthStore((state) => state.reset);

  // Effects
  useEffect(() => {
    const abortController = new AbortController();
    const handleSignOut = async () => {
      try {
        if (token !== authStoreToken) {
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

        // Set app context
        resetAuthStore();

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
        new HttpError({
          status: 499,
          data: {
            message: "Cancel request",
          },
        })
      );
    };
  }, [revoke, router, token, resetAuthStore, authStoreToken]);

  // Template
  return (
    <div className="flex justify-center py-8">
      <CircleLoading />
    </div>
  );
};

export default SignOut;
