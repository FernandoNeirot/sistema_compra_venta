import { Product } from "../../domain/models/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {  
  return (
    <div className="border p-4 rounded-lg shadow-md hover:shadow-lg transition">
      {product.image && (
        <img 
          src={product.image} 
          alt={product.title}
          className="w-full h-48 object-contain rounded-md mb-4 bg-white"
        />
      )}
      <h3 className="text-xl font-semibold text-blue-700 line-clamp-2">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
      <p className="text-gray-600 mt-2 line-clamp-3">{product.description}</p>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-lg font-bold text-green-600">
          ${product.price}
        </div>
        <div className="flex items-center text-sm text-yellow-500">
          <span>⭐ {product.rating.rate}</span>
          <span className="text-gray-400 ml-1">({product.rating.count})</span>
        </div>
      </div>
      {/* Botón que podría llamar a una función de la Capa de Aplicación si fuera necesario */}
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full">
        Comprar
      </button>
    </div>
  );
}