import { Request ,Response } from "express";
import { SuccessRes ,failRes} from '../helpers/helper';
import Joi, { required, ValidationError } from "joi"
import { Product } from '../models/product';
import { Category } from '../models/category';

export class ProductController 
{
    private static instance:ProductController | null = null;

    private constructor(){

    }

    static init():ProductController
    {
        if(this.instance == null){
            this.instance =  new ProductController();
        }

        return this.instance;
    }

    //list of products 
    async list(req:Request, res:Response){
        const data = await Product.findAll({
            attributes: ['title' , 'price'],
            include: {
                model:Category,
                attributes:['name']
            }
        });
        return SuccessRes(res, 'ok', data);
    }

    // save products 
    async saveProduct(req:Request , res:Response){
        // console.log(req.body.title);
        // process.exit();
        const schema = Joi.object().keys({
            title: Joi.string().required(),
            price: Joi.string().required(),
            categoryId: Joi.string().required(),
        }); 

        const {error , value} = schema.validate(req.body);
        if(error instanceof ValidationError){
            console.log();
            return failRes(res, '' , error.details[0].message , 500);
        }
        const cat = await Category.findOne({
            where: {id: req.body.categoryId}
        });
        if(!cat){return failRes(res,'' ,'category not found',500)};
        const prod = {
            title: req.body.title,
            price: req.body.price,
            categoryId: req.body.categoryId,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try{
            var data = await Product.create(prod);
        }
        catch(e){
            console.log('error' , e.message)
            return failRes(res, 'Error in creating product','',500);
        }
         
        return SuccessRes(res, 'successfully created' ,data);
    }

    // update product
    async updateProduct(req:Request , res:Response)
    {
        // console.log(req.params.id);
        const schema = Joi.object().keys({
            title: Joi.string().required()
        });
        try{
            const product = await Product.findOne({
                where:{id : req.params.id}
            })
            if(!product){ return failRes(res, '' , 'product not found',500)}
            var data = await product.update(req.body);            
        }
        catch(e){
            console.log(e.message);
            return failRes(res, '' ,'Error in updateing product' , 500);
        }

        return SuccessRes(res, ' successfully updated' , data);
    }
    
    //del product 
    async delproduct(req:Request , res:Response){
        try{
            const product = await Product.findOne({
                where: {id: req.params.id}
            })
            if(!product){return failRes(res,'','no record found',500)}
            var result = await product.destroy()
        }
        catch(e){
            console.log("error" , e.message)
            return failRes(res, '', 'error in del product' , 500);
        }

        return SuccessRes(res, "successfully deleted" ,result);
    }

     //list of products 
     async listbyCategory(req:Request, res:Response){
        console.log(req.query)
        const CategoryId:number = Number(req.query.id)
        console.log(CategoryId)
        const data = await Product.findAll({
            attributes: ['title' , 'price'],
            include: {
                model:Category,
                attributes:['name'],
                where: {id: CategoryId}
            }
        });
        return SuccessRes(res, 'ok', data);
    }

}