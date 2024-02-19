import mongoose from "mongoose"
//someone provides string =>after apply if valid=>get discount.....
const couponSchema= new mangoose.Schema({
    
    code:{
        type:String,
        reuired:[true,"please provide a coupon"]
    },
    discount:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:true
    }

    //bare minimum thing..
    //read documentaion on mongoose

},{timestamps:true})


export default mongoose.model("Coupon",couponSchema)