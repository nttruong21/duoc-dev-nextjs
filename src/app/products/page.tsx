import Link from "next/link";
import { Button } from "@/components/ui/button";

const Products = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>
        <Button asChild>
          <Link href="/products/create">Create product</Link>
        </Button>
      </div>
    </div>
  );
};

export default Products;
