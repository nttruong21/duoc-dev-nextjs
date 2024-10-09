"use client";

// Core
import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// App
import { HttpError } from "@/lib/http";
import authServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import clientSession from "@/services/clientSession";
import CircleLoading from "@/components/app/circle-loading";
import { useAppContext } from "@/app/_components/app-provider";

// Component
const SignOut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const revoke = searchParams.get("revoke");
  const { setProfile } = useAppContext();

  // Effects
  useEffect(() => {
    const abortController = new AbortController();
    const handleSignOut = async () => {
      try {
        if (token !== clientSession.token) {
          return;
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
        setProfile(undefined);
        clientSession.token = undefined;

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
  }, [revoke, router, token, setProfile]);

  // Template
  return (
    <div className="flex justify-center py-8">
      <CircleLoading />
    </div>
  );
};

export default SignOut;
