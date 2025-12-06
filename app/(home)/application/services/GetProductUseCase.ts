import { ProductRepository } from '@/app/(home)/domain/ports/ProductRepository';
import { Product } from '../../domain/models/Product';

export class GetProductsUseCase {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<Product[]> {
    const allProducts = await this.productRepository.getAllProducts();
    const activeProducts = allProducts.filter(product => product.price > 100);

    return activeProducts;
  }
}