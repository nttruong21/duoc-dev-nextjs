import { ProductForm } from "./components";

const CreateProduct = () => {
  return (
    <div className="border border-border rounded-md p-6">
      <h1 className="text-xl font-semibold text-center">Create new product</h1>
      <ProductForm />
    </div>
  );
};

export default CreateProduct;
