import mongoose from "mongoose";
import mogoose from "mongoose";
//object in method
const collectionSchema=new mangoose.Schema(
    {
        
        //name:String    //i defined my schema
        //when data i comming from frontend we try to save that data if data is empty automatically mongoose going to do validation for us 
        //bolenga=>>empty hai and will throow massage please provide
          
        name:{
            type:String,
            required:["true","Please Provide collection name"],
            trim:true,//if there is any space in name
            maxLength:[
                120,
                "collection length should not be more than 120 chars"
            ]
        }
        
    },
    {timestamps:true}
 )   ; 

 export default mongoose.model("Collection",collectionSchema)
 //how it converted to database=>>..collections