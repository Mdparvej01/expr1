import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name:{
        type:String,
        required:["ture","name required"],
        maxLength:[120,"product name <=120"]
    },
    price:{
        type:Number,
        required:["ture","name required"],
        maxLength:[5,"product name <=5"]
    },
    description:{
        type:String
    },
    photos:[// imp this is for photos*******
     {
         secure_url : { //u gave the frontend form =>u gave files to server=>server send to cloud or aws the give us url and we store the url...
            type:String,
            required:true
         }
     }
    ],
    stock:{
        type:Number,
        default:0
    },
    sold:{
        type:Number,
        default:0
    },
    collectionId:{ //vvimp..........connecting one model to other model => two things are imp=>1)referance and 2)
         ref:"Collection" //this is exaclty the name as in collection Schema.js file ;) imp********
    }

    

},{timestamps:true})


export default mongoose.model("product",productSchema)