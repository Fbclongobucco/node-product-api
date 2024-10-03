import { PrismaClient } from "@prisma/client";
import { Product } from "../../../entities/product";
import { ProductRespository } from "../product.respository";


export class ProductRespositoryPrismaImp implements ProductRespository{

    private constructor(readonly prisma: PrismaClient){
    }
    
    public static build(prisma: PrismaClient){
        return new ProductRespositoryPrismaImp(prisma)
    }
    
    public async save(product: Product): Promise<void> {

        await this.prisma.product.create({
            data:{
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }
    })
    }
    public async list(): Promise<Product[]> {
        
        const aProducts = await this.prisma.product.findMany();

        const products: Product[] = aProducts.map((p)=>{
            const {id, name, price, quantity} = p;
            
            return Product.with(id, name, price, quantity);
        })
        return products

    }
    public async update(product: Product): Promise<void> {
       
        await this.prisma.product.update({
            where: {
                id: product.id
            },
            data:{
                name: product.name,
                price: product.price,
                quantity: product.quantity
            }
    })

    }
    public async find(id: string): Promise<Product | null> {

        const aProduct = await this.prisma.product.findUnique({where: {id}})

        if(!aProduct){
            return null
        }

        const {name, price, quantity} = aProduct;


        const product = Product.with(id, name, price, quantity)

        return product;
    }
    
}