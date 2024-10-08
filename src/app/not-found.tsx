import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Component
const NotFound = () => {
  // Template
  return (
    <div>
      <h2>Not Found</h2>
      <Button asChild variant="link" className="p-0">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
