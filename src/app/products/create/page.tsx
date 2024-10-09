// Core
import { Metadata } from "next";

// Internal
import { ProductForm } from "../_components";

// Metadata
export const metadata: Metadata = {
  title: "Create product",
};

// Component
const CreateProduct = () => {
  // Template
  return (
    <div className="border border-border rounded-md p-6">
      <h1 className="text-xl font-semibold text-center">Create new product</h1>
      <ProductForm />
    </div>
  );
};

export default CreateProduct;
