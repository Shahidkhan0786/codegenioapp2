import {Response} from 'express';
interface SuccessApiResponse{
    message:string,
    data:any | null
}

interface failApiResponse{
    message:string,
    error:string
}

export function enumKeys(data: any): Array<string> {
    const arrayObjects: Array<string> = []
    for (const [propertyKey, propertyValue] of Object.entries(data)) {
        arrayObjects.push(propertyValue.toString());
    }
    
    return arrayObjects
}

export function SuccessRes(res:Response , message:string, data: any):Response
{
    const successRes = {
        "status": true,
        "message": message,
        "data": data
    }
    return res.status(200).json(successRes)
}

export function failRes(res:Response , message:string, error: any ,code:number): Response
{
    const errorRes = {
        "status": false,
        "message": message,
        "error": error
    }
    return res.status(code).json(errorRes)
}

