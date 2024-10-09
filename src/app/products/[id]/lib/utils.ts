// Core
import { cache } from "react";

// App
import productServices from "@/services/product";

// Utils
export const getProduct = cache(productServices.getDetail);
