import Product from "../models/product.schema.js"
import formidable from "formidable"
import { s3FileUpload,s3deleteFile} from "../services/imageUpload.js"
import Mangoose from "mangoose"
import asyncHandler from "../service/asynchHandler.js"
import CustomError from "../utils/CustomError.js"
import config from "../config/index.js"
import { Mongoose } from "mongoose"

 



export const addProduct = asyncHandler(async(req,res)=>{
    //step 1=>enable formidable..
    const form = formidable ({multiples: true ,keepExtensions :true});
    form.parse(req, async function (err,fields,files){
        if(err){
            throw new CustomError(err,message || "something went wrong" ,500 )
        }

        //createing product id...
        let productId = new Mongoose.Types.ObjectId().toHexString()

        // `products/${productId}/photo_3.` alternative for upr vala

        console.log(fields,files);

        
    })
})  