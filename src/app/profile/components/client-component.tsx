"use client";

import { useAppContext } from "@/app/_components/app-provider";

// Component
const ClientComponent = () => {
  const { profile } = useAppContext();

  // Template
  return <div>Fetch data from client: {profile?.name} </div>;
};

export default ClientComponent;
