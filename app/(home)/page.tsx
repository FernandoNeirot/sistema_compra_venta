import { GetProductsUseCase } from "../_shared/application/services/GetProductUseCase";
import { Product } from "../_shared/domain/models/Product";
import { ApiProductRepository } from "../_shared/infrastructure/adapter/ApiProductRepository";
import WrapperMaxWidth1200 from "../_shared/presentation/components/Wrappers/MaxWidth1200";
import ProductList from "../_shared/presentation/components/ProductList";
import Carousel from "../_shared/presentation/components/carousel";

// Forzar renderizado dinámico
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProductsPage() {
  const repository = new ApiProductRepository();
  const getProductsUseCase = new GetProductsUseCase(repository);
  const products: Product[] = await getProductsUseCase.execute();

  return (
    <div className="w-full">
      <Carousel 
        images={[
          { url: '/images/banner_principal_01.jpg', alt: 'Carousel Image 1' },
          { url: '/images/banner_principal_02.jpg', alt: 'Carousel Image 2' },
          { url: '/images/banner_principal_03.jpg', alt: 'Carousel Image 3' },
        ]} 
        type="full"         
        heightLess={64}
      />
      <WrapperMaxWidth1200>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-10">Categorias</h1>
        <ProductList products={products} />
      </WrapperMaxWidth1200>
      <WrapperMaxWidth1200>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 mt-10">Productos</h1>
        <ProductList products={products} />
      </WrapperMaxWidth1200>
    </div>
  );
}