"use client";

import React, { FC } from "react";
import { Button } from "@/components/ui/button";

// Component
const Error: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ reset }) => {
  // Template
  return (
    <div className="container">
      <h2>Something went wrong!</h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default Error;
