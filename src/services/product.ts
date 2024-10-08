import http from "@/lib/http";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductBody {
  name: string;
  price: number;
  description: string;
  image: string;
}

const productServices = {
  getProductList: async () => {
    const res = await http.get<{
      data: Product[];
      message: string;
    }>("/products");

    return res.data;
  },
  createProduct: async (data: CreateProductBody) => {
    return http.post("/products", {
      body: JSON.stringify(data),
    });
  },
};

export default productServices;
