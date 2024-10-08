import Link from "next/link";
import { Button } from "@/components/ui/button";
import productServices from "@/services/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const ProductList = async () => {
  const productList = await productServices.getList();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Products</h1>

        <Button asChild>
          <Link href="/products/create">Create product</Link>
        </Button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {productList.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <Card>
              <CardHeader>
                <Image
                  priority
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={135}
                  className="aspect-video w-full h-full object-cover rounded-xl"
                />
              </CardHeader>

              <CardContent className="space-y-2">
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardContent>

              <CardFooter>
                <p>{product.price} đ</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
