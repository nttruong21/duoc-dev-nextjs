import React from "react";

import { HttpError } from "@/lib/http";
import productServices from "@/services/product";

// Component
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  try {
    const product = await productServices.getDetail(+params.id);
    return <div>{product.name}</div>;
  } catch (error) {
    console.log(">>> error:", error);
    return (
      <div>
        Error:{" "}
        {error instanceof HttpError
          ? error.data.message
          : "An error occurred, please try again"}
      </div>
    );
  }
};

export default ProductDetail;
