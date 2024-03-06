import Product from "../models/product.schema.js"
import formidable from "formidable"
import { s3FileUpload,s3deleteFile} from "../services/imageUpload.js"
import Mangoose from "mangoose"
import asyncHandler from "../service/asynchHandler.js"
import CustomError from "../utils/CustomError.js"
import config from "../config/index.js"
import { Mongoose } from "mongoose"
import fs from "fs"


 



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

        if (
            !fields.name ||
            !fields.price ||
            !fields.description || 
            !fields.collectionId
        ) {
            throw new CustomError("fill allfields " , 500)

        }

        let imgArrayResp = Promise.all (
            Objects.keys(files).map( async(file , index) => {
                const element = file[fileKey]
                console.log(element);
                fs.readFileSync(element.filepath)

                //uploading

                s3FileUpload({
                    bucketName:config.S3_BUCKET_NAME,
                    key:`product/${productId}/photo_${index + 1}.png`,
                    body:DataTransfer,
                    contentType:element.mimetype 
                })
            })
        )

        
    })
})  