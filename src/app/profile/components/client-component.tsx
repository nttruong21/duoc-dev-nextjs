"use client";

import { useEffect, useState } from "react";

import accountServices from "@/services/account";

const ClientComponent = () => {
  const [name, setName] = useState<string>();

  useEffect(() => {
    accountServices.getProfile().then((response) => {
      setName(response.data.name);
    });
  });

  return <div>Fetch data from client: {name} </div>;
};

export default ClientComponent;
