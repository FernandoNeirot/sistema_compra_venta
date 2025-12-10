import { Product } from "../models/Product";

export interface ProductRepository {
  getProductById(id: string): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
}