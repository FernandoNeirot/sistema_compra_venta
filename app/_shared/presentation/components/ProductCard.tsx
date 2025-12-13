import Image from "next/image";
import { Product } from "../../domain/models/Product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border border-gray-300 p-4 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="w-full flex justify-center items-center">

        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={192}
            className="w-full h-48 object-contain rounded-md mb-4 bg-white"
            style={{ width: '300px', height: '192px' }}
            loading="eager"
          />
        )}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 h-14 line-clamp-2">{product.title}</h3>
      <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
      <p className="text-gray-600 mt-2 line-clamp-3 min-h-[4.5rem]">{product.description}</p>
      <div className="mt-3 flex items-center justify-center">
        <div className="text-2xl text-center font-bold text-green-800">
          ${product.price}
        </div>
      </div>
      {/* Botón que podría llamar a una función de la Capa de Aplicación si fuera necesario */}
      <button className="mt-4 bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-700 transition w-full">
        Ver
      </button>
    </div>
  );
}