import { ProductRepository } from '@/app/_shared/domain/ports/ProductRepository'; 
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
    
    try {
      const res = await fetch(`${this.baseUrl}`, {
        next: { revalidate: 120 },
        cache: 'default'
      });
      
      if (!res.ok) {
        console.error('❌ Error en fetch:', res.status, res.statusText);
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
    } catch (error) {
      console.error('❌ Error al obtener productos:', error);
      
      // Si tenemos datos en cache aunque estén expirados, devolverlos
      if (cache.has(cacheKey)) {
        console.log('⚠️ Usando cache expirado como fallback');
        return cache.get(cacheKey)!.data;
      }
      
      // Si no hay cache, devolver array vacío en lugar de fallar
      console.log('⚠️ Sin cache disponible, devolviendo array vacío');
      return [];
    }
  }
}