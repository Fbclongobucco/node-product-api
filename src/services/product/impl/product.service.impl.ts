import { ProductRespository } from "../../../repositories/product/product.respository";
import { ListOutputDto, ProductService, SellOutputDTO } from "../product.service";

export class ProductServiceImpl implements ProductService{
   
    private constructor(readonly repository: ProductRespository){     
    }

    public static build(repository: ProductRespository){
        return new ProductServiceImpl(repository);
    }
   
   public async sell(id: string, amount: number): Promise<SellOutputDTO> {
        throw new Error("Method not implemented.");
    }
    bay(id: string, amount: number): Promise<SellOutputDTO> {
        throw new Error("Method not implemented.");
    }
    list(): Promise<ListOutputDto> {
        throw new Error("Method not implemented.");
    }
    
}