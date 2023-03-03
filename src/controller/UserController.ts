import express,{Request ,Response, response} from 'express';
import Joi, { required, ValidationError } from "joi"
import {User} from "../models/user"
const bcrypt = require('bcrypt');
import { sequelize } from '../config/connection';
import { Customer } from '../models/customer';
import { SuccessRes, failRes } from '../helpers/helper';
let crypto = require("crypto");
export class UserController {
    private static instance: UserController | null = null;

    private constructor() {

    }

    static init(): UserController {
        if (this.instance == null) {
            this.instance = new UserController()
        }

        return this.instance
    }

    async test(req:Request , res:Response){
        // SuccessRes(res, "okk", [1,2,3]);
        failRes(res,"error in record" , "hii i am erro",500);
    }

    async list(req: Request , res: Response){
        const user = await User.findAll();
        return res.status(201).json({
            "Success": true,
            data: user
        })
    }

    // save users 
    async saveUser(req:Request , res:Response){
        // console.log(process.env.SALT_KEY);
        const schema = Joi.object().keys({
            email: Joi.string().email().optional().allow(''),
            firstName: Joi.string().required(),
            lastName: Joi.string().optional().allow(''),
            phone: Joi.string().required(),
            password: Joi.string().required(),
            // confirmPassword: Joi.ref('password'),
        });

        const { error, value } = schema.validate(req.body);
        if (error instanceof ValidationError) {
            // res.Error(error.details[0].message);
            return failRes(res, '' ,error.details[0].message, 500)
            // return;
        }

        const passworddg = crypto.randomBytes(8).toString('hex');

        const userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            userType: req.body.userType,
            createdAt: new Date(),
            updatedAt: new Date(),
            password: bcrypt.hashSync(req.body.password, 5),
        }

        const transaction = await sequelize.transaction();

        // create user 
        try {
            const instance = await User.create(userData)
            // await transaction.commit()
            if(instance.id){
                try{
                    const customer = await Customer.create({
                    userId: instance.id,
                    phone: req.body.phone,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    });
                    await transaction.commit()
                }
                catch(e:any){
                    await transaction.rollback();
                    console.log('Rollback Error', e);
                }
               
            }
            else{
                await transaction.rollback();
            }
            // if(customer){await transaction.commit()}else{  await transaction.rollback();}
           
        } catch (e: any) {
            await transaction.rollback();
            console.log('Rollback Error', e);
            // (global as any).log.error(e)
            return res.status(500).json({
                "status": false,
                "error": e
            })
        }

        return res.status(200).json({
            "status": true,
            "message": "successdully created"
        })
    }

    //update the user
    async updateUser(req:Request , res:Response){
        const schema = Joi.object().keys({
            // id: Joi.number().required(),
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().email().required()
        });

        const {error , value} = schema.validate(req.body);
        if(error instanceof ValidationError){
            failRes(res, '', error.details[0].message , 500);
        }

        const user:User = await User.findOne({
            where: {email: req.body.email}
        });
        if(!user){failRes(res,"please provide correct inputs" , "user not found" ,500)};
        const transction = await sequelize.transaction();
        try{
            if(!req.body.phone){
                let data = await user.update(req.body) 
                await transction.commit()
                data.password = undefined
                SuccessRes(res ,"user successfully updated" ,data);
            }
            else{
                try{
                    const ans = await user.update(req.body)
                    const cus = await Customer.findByPk(ans.id);
                    if(cus){await cus.update({phone: req.body.phone})}
                    await transction.commit();
                    SuccessRes(res,'successfully updated' , user)
                }
                catch(e){
                    await transction.rollback();
                    console.log(e)
                    failRes(res,'' , 'error in updateing customer', 500)
                }
            }
        }
        catch(e){
            await transction.rollback();
            console.log(e);
            failRes(res,'' , 'Error in updateing User' , 500)
        };
        
        

    }

    // del user 
    async delUser(req:Request , res:Response){
        try{
          var userr = await User.findByPk(req.params?.id);
          if(!userr){return failRes(res, '' , 'User not found' ,500)}  
        }catch(e){ 
            console.log(e.message);
            return failRes(res,'','record not found',400)
        }

        const transction = await sequelize.transaction()
        if(userr.userType != 'Customer'){
            await userr.destroy();
            await transction.commit();
        }
        else{
            try{
                var result:any = await userr.destroy();
                var customer = await Customer.destroy({
                    where:{'userId': result?.id}
                });
                await transction.commit();
            }
           catch(e){
                await transction.rollback();
                console.log(e.message);
                failRes(res , '' , 'problem in del record' , 500)
           }
        }

        SuccessRes(res, 'successfully deleted' , '' );
    }
}