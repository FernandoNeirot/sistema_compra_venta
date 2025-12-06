import { GetProductsUseCase } from "./application/services/GetProductUseCase";
import { Product } from "./domain/models/Product";
import { ApiProductRepository } from "./infrastructure/adapter/ApiProductRepository";
import ProductListComponent from "./presentation/components/ProductListComponent";

export default async function ProductsPage() {
  const repository = new ApiProductRepository(); 
  const getProductsUseCase = new GetProductsUseCase(repository);
  const products: Product[] = await getProductsUseCase.execute();

  return (
    <div className="container">
      <h1>Productos</h1>
      <ProductListComponent products={products} />
    </div>
  );
}