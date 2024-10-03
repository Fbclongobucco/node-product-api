import { Product } from "../../entities/product";

export interface ProductRespository{
    save(product: Product): Promise<void>;
    list(): Promise<Product[]>; 
    update(product: Product) : Promise<void>;
    find(id: string): Promise<Product | null>
}