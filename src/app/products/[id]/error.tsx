"use client";

import { FC, useEffect } from "react";

// Component
const ProductDetailError: FC<{
  error: Error & { digest?: string };
  reset: () => void;
}> = ({ error, reset }) => {
  // Effects
  useEffect(() => {
    console.log(error);
  }, [error]);

  // Template
  return (
    <div>
      <h2>Something went wrong!</h2>
      <p>An error occurred, please try again</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
};

export default ProductDetailError;
