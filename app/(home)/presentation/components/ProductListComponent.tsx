import { Product } from "../../domain/models/Product";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
}

export default function ProductListComponent({ products }: ProductListProps) {
  if (products.length === 0) {
    return <p className="text-gray-500">No se encontraron publicaciones activas.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}