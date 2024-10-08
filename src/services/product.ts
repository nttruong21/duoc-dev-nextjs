import http from "@/lib/http";

export interface Product {
  id: number;
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

export type UpdateProductBody = CreateProductBody;

const productServices = {
  getList: async () => {
    const res = await http.get<{
      data: Product[];
      message: string;
    }>("/products");

    return res.data;
  },
  create: async (data: CreateProductBody) => {
    return http.post("/products", {
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: UpdateProductBody) => {
    return http.put(`/products/${id}`, {
      body: JSON.stringify(data),
    });
  },
  getDetail: async (id: number) => {
    const res = await http.get<{
      data: Product;
      message: string;
    }>(`/products/${id}`);

    return res.data;
  },
};

export default productServices;
