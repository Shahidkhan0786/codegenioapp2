import express,{Request , Response} from 'express';
import { sequelize } from '../config/connection';
import { Category } from '../models/category';
import { SuccessRes, failRes } from '../helpers/helper';
import Joi, { required, ValidationError } from "joi"

export class CategoryController
{
    private static instance:CategoryController | null = null;

    private constructor()
    {

    }

    static init():CategoryController
    {
        if(this.instance == null){
            this.instance = new CategoryController();
        }

        return this.instance;
    }

    // list of categories
    async list(req:Request , res:Response){
        const data = await Category.findAll();
        return SuccessRes(res, '' , data);
    }

    // create category 
    async saveCategory(req:Request ,res:Response){
        const schema = Joi.object().keys({
            name: Joi.string().required()
        }); 

        const {error , value} = schema.validate(req.body);
        if(error instanceof ValidationError){
            console.log();
            return failRes(res, '' , error.details[0].message , 500);
        }

        const cat = {
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        try{
            var data = await Category.create(cat);
        }
        catch(e){
            console.log('error' , e.message)
            return failRes(res, 'Error in creating category','',500);
        }
         
        return SuccessRes(res, 'successfully created' ,data);
    }

    // updateCategory 
    async updateCategory(req:Request , res:Response)
    {
        console.log(req.params.id);
        const schema = Joi.object().keys({
            name: Joi.string().required()
        });
        try{
            const category = await Category.findOne({
                where:{id : req.params.id}
            })
            if(!category){ return failRes(res, '' , 'category not found',500)}
            var data = await category.update(req.body);            
        }
        catch(e){
            console.log(e.message);
            return failRes(res, '' ,'Error in updateing Category' , 500);
        }

        return SuccessRes(res, ' successfully updated' , data);
    }

    // destroy category 
    async delCategory(req:Request , res:Response){
        try{
            const category = await Category.findOne({
                where: {id: req.params.id}
            })
            if(!category){return failRes(res,'','no record found',500)}
            var result = await category.destroy()
        }
        catch(e){
            console.log("error" , e.message)
            return failRes(res, '', 'error in del category' , 500);
        }

        return SuccessRes(res, "successfully deleted" ,result);
    }
}