export type SellOutputDTO = {
    id: string;
    balance: number;
}

export type BuyOutputDto = {
    id: string;
    balance: number;
}
export type ListOutputDto = {
    products: {
        id: string;
        name: string;
        price: number;
        balance: number; 
    }
}

export interface ProductService{
    sell(id:string, amount: number): Promise<SellOutputDTO>;
    buy(id: string, amount: number): Promise<SellOutputDTO>;
    list(): Promise<ListOutputDto>;
}