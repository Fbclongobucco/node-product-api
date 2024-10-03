
import express, {Express, Request, Response} from 'express'
import { Api } from '../api';

export class ApiExpress implements Api{

    private constructor(readonly app: Express){
    }

    public static build(){
        const app = express()
        app.use(express.json())
        return new ApiExpress(app)
    }


    public addGetRoute(path: string, hendle: (req: Request, res: Response) => Promise<void>): void{
        this.app.get(path, hendle);
    }

    public addPostRoute(path: string, hendle: (req: Request, res: Response) => Promise<void>): void{
        this.app.post(path, hendle);
    }

    public  start(port: number){
        this.app.listen(port, ()=>{ 
            console.log("sever running on port: " +port);
            this.printRoutes();
        })
    }

    private printRoutes(){
        const routes = this.app._router.stack.filter((route: any)=> route.route).map((route: any)=>{
            return {
                path: route.route.path,
                method: route.route.stack[0].method
            }
        });
        console.log(routes)
    }

}