"use client";

import { toast } from "sonner";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HttpError } from "@/lib/http";
import authServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import clientSession from "@/services/clientSession";
import CircleLoading from "@/components/app/circle-loading";

const SignOut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const revoke = searchParams.get("revoke");

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

        router.replace("/");
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
  }, [revoke, router, token]);

  return (
    <div className="flex justify-center py-8">
      <CircleLoading />
    </div>
  );
};

export default SignOut;
