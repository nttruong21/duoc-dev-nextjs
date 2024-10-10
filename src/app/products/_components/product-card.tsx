// Core
import Link from "next/link";
import Image from "next/image";
import React, { FC } from "react";
import { cookies } from "next/headers";

// App
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Product } from "@/services/product";
import { Button } from "@/components/ui/button";

// Internal
import { ConfirmDeleteProductButton } from ".";

// Component
const ProductCard: FC<{ product: Product }> = ({ product }) => {
  const isAuthenticated = cookies().has("token");

  // Template
  // Template
  return (
    <Card>
      <CardHeader>
        <Image
          priority
          src={product.image}
          alt={product.name}
          width={240}
          height={135}
          className="aspect-video w-full object-cover rounded-xl"
        />
      </CardHeader>

      <CardContent className="space-y-2">
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
        <CardDescription>{product.price} đ</CardDescription>
      </CardContent>

      <CardFooter className="flex justify-end items-center gap-2">
        {isAuthenticated ? (
          <>
            <Button asChild variant="outline">
              <Link href={`/products/update/${product.id}`}>Update</Link>
            </Button>

            <ConfirmDeleteProductButton id={product.id} name={product.name} />
          </>
        ) : (
          <Button asChild>
            <Link href={`/products/${product.id}`}>View more</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
