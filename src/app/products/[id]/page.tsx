// Core
import Image from "next/image";
import { Metadata } from "next";

// App
import envConfig from "@/configs/environment";
import { BASE_METADATA } from "@/app/shared-metadata";

// Internal
import { Props } from "./lib/types";
import { getProduct } from "./lib/utils";

// Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(+params.id);

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      ...BASE_METADATA.openGraph,
      title: product.name,
      description: product.description,
      images: product.image,
      url: `${envConfig.NEXT_PUBLIC_URL}/products/${product.id}`,
    },
    alternates: {
      canonical: `${envConfig.NEXT_PUBLIC_URL}/products/${product.id}`,
    },
  };
}

// Component
const ProductDetail = async ({ params }: { params: { id: string } }) => {
  const product = await getProduct(+params.id);

  // Template
  return (
    <div className="flex gap-4">
      <Image
        src={product.image}
        alt={product.name}
        priority
        width={600}
        height={200}
        className="aspect-video w-1/2 object-cover"
      />

      <div className="space-y-2">
        <h1 className="text-xl font-semibold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.description}</p>
        <p className="text-lg font-semibold">{product.price} đ</p>
      </div>
    </div>
  );
};

export default ProductDetail;
