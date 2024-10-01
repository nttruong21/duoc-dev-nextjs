"use client";

import { useEffect, useState } from "react";

import accountServices from "@/services/account";
import { Button } from "@/components/ui/button";
import authServices from "@/services/auth";
import { handleApiError } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ClientComponent = () => {
  const router = useRouter();

  const [name, setName] = useState<string>();

  useEffect(() => {
    console.log(document.cookie);
    accountServices.getProfile().then((response) => {
      setName(response.data.name);
    });
  });

  const handleSignOut = async () => {
    try {
      await authServices.signOut();

      // Remove cookie token for Next server
      await authServices.removeTokenCookie();

      toast.success("Success", {
        description: "Sign in successfully",
      });

      router.push("/");
    } catch (error) {
      handleApiError({
        error,
      });
    }
  };

  return (
    <div>
      Fetch data from client: {name}{" "}
      <Button onClick={handleSignOut}>Sign out</Button>
    </div>
  );
};

export default ClientComponent;
