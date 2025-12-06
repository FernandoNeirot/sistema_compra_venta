import { ProductRepository } from '@/app/(home)/domain/ports/ProductRepository'; 
import { Product } from '../../domain/models/Product';

const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TIME = 120000; 

export class ApiProductRepository implements ProductRepository {
  private readonly baseUrl = 'https://fakestoreapi.com/products';

  async getProductById(id: string): Promise<Product | null> {    
    const res = await fetch(`${this.baseUrl}/${id}`);
    
    if (!res.ok) {
      return null;
    }
    
    const data = await res.json();

    const product = {
        id: data.id,
        title: data.title,
        price: data.price,
        description: data.description,
        category: data.category,
        image: data.image,
        rating: data.rating,
    } as Product;
    
    return product;
  }

  async getAllProducts(): Promise<Product[]> {
    const cacheKey = 'all-products';
    const now = Date.now();
    
    // Verificar si existe en cache y no ha expirado
    if (cache.has(cacheKey)) {
      const cached = cache.get(cacheKey)!;
      if (now - cached.timestamp < CACHE_TIME) {
        console.log('✅ Usando CACHE (no fetch) - Expira en', Math.round((CACHE_TIME - (now - cached.timestamp)) / 1000), 'segundos');
        return cached.data;
      }
    }
    
    console.log('🔄 Haciendo FETCH (cache expirado o no existe)');
    const res = await fetch(`${this.baseUrl}`, {
      next: { revalidate: 120 } // Cachear por 120 segundos (2 minutos) en producción
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await res.json();
    
    const products = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        category: item.category,
        image: item.image,
        rating: item.rating,
    } as Product));
    
    // Guardar en cache
    cache.set(cacheKey, { data: products, timestamp: now });
    console.log('💾 Datos guardados en cache por 2 minutos');
    
    return products;
  }
}