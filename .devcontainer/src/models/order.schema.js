import mangoose from "mangoose"
import mongoose from "mongoose"

const orderScema= new mongoose.Schema({
//order id we dont need to keep=>mangoose will give that id
product:{
    type:[
        {
            productId:{
                type:mangoose.Schema.Types.ObjectId,
                ref:"Product" //this product exactly same as product.Schema me ka product
            },
            count:Number,
            price:Number
        }
    ],
    required:true
},
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true//user always there....
},
address:{
    type:String,
    required:true
},
amount:{
    type:Number,
    required:true
},
coupon:String,
transactionId:String,
status:{
    type:String,
    enum:["ORDERED","SHIPPED",DELIVERD,"CANCELLATION"],//TRY THIS TO BETTER WAY
    default:"ORDERD"
//Professionally=>MOON modler   
}
},{timestamps:true})


export default mangoose.model("Order",orderSchema)