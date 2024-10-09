// Core
import { cache } from "react";
import { Metadata } from "next";

// App
import productServices from "@/services/product";
import { ProductForm } from "@/app/products/_components";

// Internal
import { Props } from "./lib/types";

const getProduct = cache(productServices.getDetail);

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(+params.id);

  return {
    title: `Update product ${product.name}`,
  };
}

// Component
const UpdateProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(+params.id);

  // Template
  return <ProductForm product={product} />;
};

export default UpdateProductDetail;
