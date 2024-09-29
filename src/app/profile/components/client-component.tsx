"use client";

import { useEffect, useState } from "react";
import envConfig from "@/configs/environment";
import { useAppContext } from "@/app/components/app-provider";

interface SuccessResponse {
  data: {
    id: number;
    name: string;
    email: string;
  };
  message: string;
}

const ClientComponent = () => {
  const { token } = useAppContext();
  const [name, setName] = useState<string>();

  useEffect(() => {
    fetch(`${envConfig.NEXT_PUBLIC_BASE_API_ENDPOINT}/account/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json() as unknown as SuccessResponse)
      .then((response) => {
        setName(response.data.name);
      });
  });

  return <div>Fetch data from client: {name}</div>;
};

export default ClientComponent;
