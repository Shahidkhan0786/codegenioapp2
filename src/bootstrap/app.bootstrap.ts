import express,{Request,Response} from "express";
// import http from "http";
const app = express();
import http, { Server } from "http";
require("dotenv").config();
// const PORT = process.env.PORT ||8001;
import morgan from "morgan";
import { PublicRoutes } from "../routes/public-routes";
app.use(morgan("dev"));

export class App {
    app: express.Application;
   
    constructor(app: express.Application){
        this.app = app;
        this.app.use(express.json());
        // this.app.use(morgan("dev"));
        this.app.get('/',  (req: any, res: any) => {
            res.send("----- Quiz App NodeJS API -----")
        });
        const server = http.createServer(this.app);
       
        // this.registerMiddlewares();
        this.registerRoutes();
        this.startServer(server);
        // this.errorHandling();
        // this.initiateSingletons();
        // this.setChalk();
    }

    registerRoutes(){
        new PublicRoutes(this.app);
    }

    startServer(server: http.Server){
        console.log("hiii")
        const PORT = process.env.PORT_NO ||8001;
        console.log(PORT);
        
        server.listen(PORT , ()=>{
            console.log(`server is up and running on port ${PORT}`)
        })
    }

  

    
}





