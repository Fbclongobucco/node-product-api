import { Request, Response } from "express";
import { ProductRespositoryPrismaImp } from "../../../repositories/product/prisma/product.repository.prisma";
import { prisma } from "../../../utils/prisma.util";
import { ProductServiceImpl } from "../../../services/product/impl/product.service.impl";

export class ProductController{


    private constructor(){
    }

    public static build(){
        return new ProductController()
    }

    public async create(request: Request, response: Response){
        const {name, price} = request.body;


        const aRepository = ProductRespositoryPrismaImp.build(prisma)

        const aService = ProductServiceImpl.build(aRepository)

        const output = await aService.create(name, price)

        const data = {
            id: output.id,
            name,
            price,
            balance: output.balance
        }

        response.status(201).json(data).send()
    }

    public async list(request: Request, response: Response){

        const aRepository = ProductRespositoryPrismaImp.build(prisma)

        const aService = ProductServiceImpl.build(aRepository)

        const output = await aService.list();

        const data = {
            products: output
        }

        response.status(200).json(data).send()
    }

    public async buy(request: Request, response: Response){
        const {id} = request.params;

        const { amount } = request.body;
        
        const aRepository = ProductRespositoryPrismaImp.build(prisma)

        const aService = ProductServiceImpl.build(aRepository)

        const output = await aService.buy(id, amount);

        const data = {
            id: output.id,
            balance: output.balance
        }

        response.status(200).json(data).send()
    }

    public async sell(request: Request, response: Response){
        const {id} = request.params
        
        const { amount } = request.body;
        
        const aRepository = ProductRespositoryPrismaImp.build(prisma)

        const aService = ProductServiceImpl.build(aRepository)

        const output = await aService.sell(id, amount);

        const data = {
            id: output.id,
            balance: output.balance
        }

        response.status(200).json(data).send()
    }

}