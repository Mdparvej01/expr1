 import mangoose from "mongoose";
 import crypto from "crypto"
 import config from "../config/index.js";
 import Jsntoken, { JsonWebTokenError } from "jsonwebtoken"
 import AuthRoles from "../utils/authRoles.js";
 import bcrypt from "bcrypt.js";// user hai to encryption to lagega hi...
// client side validation is bad=>inviting bugs and security issues in our database...
//99.9 percent security is handled on backend only...but if we can stop such isuues on frontend itself it will be super good if not then backend to hai hi
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
  //before saving name ,mail i want to encrypt my password thus-> hooks
  password:{
    type:String,
    required:[true,"passward is required"],
    minLength:[8,"8 chars passwaord"],
    select:false //i will never bring password as default=>password field will not come atomatically

  },
  role:{
    type:String,
    enum:Object.values(AuthRoles) ,          //enum>>only select from options=>vimp restricting user options...imp***
    default:AuthRoles.USER                   // WHEN NEW OBJECT CREATED NAMED AS USER imp***
  },
  forgotPasswordToken:String,  //if mail found on database we send him uniq token link=>if tocken matches with database ->allow to change password for next 5 min=>we save one copy in data base and send one copy to user
  forgotPasswordExpiry:Date    //vimp** date for limit


 },{timestamps:true}) 

 //Encrypt the password before saving && next act as flag (middleware) HOOKS e.g just before saving i want to encrypt it 
 userSchema.pre("save", async function(next){ //method is save =>use (async) to make other task wait bcz i want to incrypt my password also need to pass (next) => we cant use arrow => in mangoose hooks only functions are allowed
  if(!this.isModified("password")) return next() //agar password modified nhi hai then return next=>(stop) somebody =>after my job is done release
  this.password = await bcrypt.hash(this.password,10) //encrypted our password....(await bcz its not instanteneous...)
  //above operation is asynchonous thus await
  next()

 })

 //this was about hooks Now lets see
 //LETS learn how to provide methods......
 // we can create our own method as well...as custom hooks too

 userSchema.methods = {
//inside this we can write as many methods as we want ...........
//compare password;

comparePassword:async function(enteredPassword){ //we need to pass entered password here...
   return await bcrypt.compare(enteredPassword,this.password)
},
//generating tockens...vimp****

 getJWTtoken:function(){ //() inside bracket we can provide    " "/{ }/name as payload

  JWT.sigh({_id:this._id , role:this.role}, config.JWT_SECRET,{ //this jwt sign creates long string hides information passed on payload=>whoever knows jwt secrete can decrept that info
    expiresIn:config.JWT_EXPIRY   //as we havent created _id but in =>> mongoDB creates document _id for it similarly we can also store roles in it as well
  })
  //whoever has this token first see whether user is loged in then he will have a token =>based on token i will make query to database =>dataBase will give me this info i will pass this info on frontend...

},

//generate forgot password token......
generateForgotPasswordToken:funtion (){
  const forgotToken=crypto.randomBytes(20).tiString("hex")  //generating, storing, returning it back
  // encrypting..
  this.forgotPasswordToken = crypto
  .createHash("sha256")
  .update(forgotToken)
  .digest("hex")
  // time for token to expire
  this.forgotPasswordExpiry = Date.now()+20*60*1000
  return forgotToken

}







} 

//if user entered email and password and we want to find and grab information then WE HAVE TO GIVE HIM a token bcz he is now authorized user
//Let learn to create tokens ny using NPN :) 

 export default mangoose.model("User",userSchema) //it will give users
 //mongoose provide hooks=>e.g. just before deleting something we want something should happen(activity)
