// Core
import Link from "next/link";
import { Metadata } from "next";
import { cookies } from "next/headers";
// App
import { Button } from "@/components/ui/button";
import productServices from "@/services/product";

// Internal
import { ProductCard } from "./_components";

// Metadata
export const metadata: Metadata = {
  title: "Products",
};

// Component
const ProductList = async () => {
  const isAuthenticated = cookies().has("token");

  const productList = await productServices.getList();

  // Template
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>

        {isAuthenticated && (
          <Button asChild>
            <Link href="/products/create">Create product</Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {productList.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
