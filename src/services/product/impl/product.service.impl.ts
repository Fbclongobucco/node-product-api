import { ProductRespository } from "../../../repositories/product/product.respository";
import { BuyOutputDto, ListOutputDto, ProductService, SellOutputDTO } from "../product.service";

export class ProductServiceImpl implements ProductService{
   
    private constructor(readonly repository: ProductRespository){     
    }

    public static build(repository: ProductRespository){
        return new ProductServiceImpl(repository);
    }
   
   public async sell(id: string, amount: number): Promise<SellOutputDTO> {
            const aProduct = await this.repository.find(id)

            if(!aProduct){
                throw new Error("product "+id+" not found!");
            }

            aProduct.sell(amount);

            await this.repository.update(aProduct);

            const output: SellOutputDTO = {
                id: aProduct.id,
                balance: aProduct.quantity
            }

            return output;

    }
    public async buy(id: string, amount: number): Promise<SellOutputDTO> {
        
        const aProduct = await this.repository.find(id)

            if(!aProduct){
                throw new Error("product "+id+" not found!");
            }

            aProduct.buy(amount);

            await this.repository.update(aProduct);

            const output: BuyOutputDto = {
                id: aProduct.id,
                balance: aProduct.quantity
            }

            return output;


    }
    public async list(): Promise<ListOutputDto> {
        const aProducts = await this.repository.list()

        const products = aProducts.map((p)=>{
            return {
                id: p.id,
                name: p.name,
                price: p.price,
                balance: p.quantity
            }
        })

        const output: ListOutputDto = {
            products: products
        }
        return output;
        
    }
    
}