import { Router } from 'express';
import { RoutesConfig } from './route-config';
import express from 'express';
import { UserController } from '../controller/UserController';
import { CategoryController } from '../controller/CategoryController';
import { Category } from '../models/category';
import { ProductController } from '../controller/ProductController';
import { Product } from '../models/product';


export class PublicRoutes extends RoutesConfig{
    route: Router;
    constructor(app: express.Application){
        super(app, 'PublicRoutes');
        
    }

    configureRoutes(): express.Application {
        this.route = express.Router();
        this.userRoutes();
        this.categoryRoutes();
        this.productRoutes();
        this.app.use("/api/public" , this.route);
        return this.app;
    }

    userRoutes(){
        const route = express.Router();
        const controller = UserController.init()
        route.get('/test' , controller.test);
        route.get('/list' , controller.list)
        //save user 
        route.post('/saveUser', controller.saveUser);
        // update user
        route.put('/updateUser' , controller.updateUser);
        // del user 
        route.delete('/deluser/:id', controller.delUser);
        this.route.use('/user' , route);
    }

    categoryRoutes(){
        const route = express.Router();
        const controller = CategoryController.init();
        route.get('/list' , controller.list);
        route.post('/create' , controller.saveCategory)

        // update category
        route.put('/update/:id' , controller.updateCategory);
        // del category 
        route.delete('/del/:id' , controller.delCategory);
        this.route.use('/category' , route);
    }

    productRoutes(){
        const route = express.Router();
        const controller = ProductController.init();
        route.get('/list' , controller.list);

        // save product 
        route.post('/create' , controller.saveProduct)
        //update product
        route.put('/update/:id' , controller.updateProduct)
        // del product 
        route.delete('/del/:id' , controller.delproduct)

        // get Products by cat id 
        route.get('/listprodbycategory' , controller.listbyCategory);

        this.route.use('/product' , route);
    }
}