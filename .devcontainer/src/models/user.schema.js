 import mangoose from "mongoose";
 import AuthRoles from "../utils/authRoles.js";

 const userSchema = new mangoose.Schema({
  //adding schema info of user want to take
  name:{
    type:String,
    required:["true","name is required"],
    maxLength:[50,"50 char email"],

  },
  email:{
    type:String,
    required:["true","name is required"],
    maxLength:[50,"50 char name"],
  },
  password:{
    type:String,
    required:[true,"passward is required"],
    minLength:[8,"8 chars passwaord"],
    select:false //i will never bring password as default=>password field will not come atomatically


  },
  role:{
    type:String,
    enum:Object.values(AuthRoles) ,          //enum>>only select from options
    default:AuthRoles.USER // WHEN NEW OBJECT CREATED NAMED AS USER
  },
  forgotPasswordToken:String, //if mail found on database we send him uniq token link=>if tocken matches with database ->allow to change password for next 5 min=>we save one copy in data base and send one copy to user
  forgotPasswordExpiry:Date


 },{timestamps:true})


 export default mangoose.model("user",userSchema)