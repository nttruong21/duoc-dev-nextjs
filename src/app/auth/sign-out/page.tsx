"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import authServices from "@/services/auth";
import CircleLoading from "@/components/app/circle-loading";

const SignOut = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const abortController = new AbortController();
    authServices.removeTokenCookie(abortController.signal).then(() => {
      router.push("/");
    });

    return () => {
      abortController.abort("Cancel duplicate request");
    };
  }, [router, token]);

  return (
    <div className="flex justify-center py-8">
      <CircleLoading />
    </div>
  );
};

export default SignOut;
