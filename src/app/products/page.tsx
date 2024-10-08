import Link from "next/link";
import { Button } from "@/components/ui/button";
import productServices from "@/services/product";

const ProductList = async () => {
  const productList = await productServices.getProductList();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>

        <Button asChild>
          <Link href="/products/create">Create product</Link>
        </Button>
      </div>

      {productList.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
};

export default ProductList;
