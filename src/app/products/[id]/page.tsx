// Core
import React from "react";

// App
import productServices from "@/services/product";

// Internal
import { ProductForm } from "../_components";

// Component
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = await productServices.getDetail(+params.id);

  // Template
  return (
    <div>
      <ProductForm product={product} />
    </div>
  );
};

export default ProductDetail;
