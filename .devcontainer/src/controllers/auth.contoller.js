//imppart and fun part
//signup a new user..
import User from "../models/user.schema"
import asyncHandler from "../service/asynchHandler";
import CustomError from "../utils/Customerror";

export const cookieOptions = {
    expires:new Date(Date.now() + 3*24*60*60*1000), //ms
    httpOnly:true //from only server side manages by server not user
}

// export const signUp=asyncHandler(aysnc(req,res) => {})

// export const signUp=async(req,res) => {
//     try{
//         await connectoDatabase()
//     }catch(error) {

//     }
// }

export const signUp=asyncHandler(async(req,res) => {
    //get data from user
    const {name,email,password} = req.body

    //validation
    // if(!name || !email || !password){ //rather than write this again and again use class li asyncHandler and use every where
    //     res.status(400).json({
    //         sucess:false,
    //         massege
    //     })
    // }

    if(!name || !email || !password){ //rather than write this again and again use class li asyncHandler and use every where
        throw new CustomError("PLEASE fill all feilds",400)
        //or
       // thow new Error ("got an error ) => //fromcutom error utils
    }
    //creating new field in database
//adding data tto database
//check already exist or not
    const existingUser= await User. findOne({email})

    if(existingUser){
        throw new CustomError("User already exist",400) 
    }

    const user=await User.create({
        name,
        email,        //it will hold name ,email
        password
    })

    const token = user.getJwttoken()
    //safety
    user.password = undefined//vimp*** =>now user doesnt have password value..
    //in theory we said that password has select false..
    //why? we marked this as undefined=>bcz after when we make query for this ->user is restricted...
    // now to send the response back to user

    res.cookie("token",token,cookieOptions)   //i stored this token intothe users cookie =>Read client side and server side cookie 

    res.status(200).json({
        success:true,
        token,
        user, //bec we are sending this details backe.g=>===>>HEY USER "USERNAME"
    })
// what we learnt=> 1> wraped as try catch,how data is validated,whether user exist or not=>able to create new user=>safety flag =>sending responsce=>cookies..
    


})

export const login= asyncHandler(async(req,res) => {
    const {email,password} = req.body
    //validation
    if(!email || !password){
        throw new CustomError("Please fill all details",400)
    }

// while selecting select passwprd=false is there=>we need to handle this=>i have tomatch the password
//.select("+ALL the feilds  which are select as false")
   const user=  User.findOne({email}).select("+password")
   if(!user){
    throw new CustomError("Invalid",400)
     }
     const isPasswordMatched = await user.comparePassword(password)
     if(isPasswordMatched){     //if matched i will give him a token 
        const token=user.getJWTtoken()
        //now user holding the password lets do the safety
        user.password=undefined //password flushed out...
        res.cookie("token",token,cookieOptions) //now user has this cookie
        return res.status(200).json({
            success:true,
            token,
            user
        })
     }

      //if not matched
      throw new CustomError("Password is incoorect",400)
  //BAKEND job is take response and send response
})

export const logout =asyncHandler(async(req,res) => {
    //just delete the cookie
    res.cookie("token", null,{
        expires:new Date(Date.now()),
        httpOnly:true
    })
    
    res.status(200).json({
        success:true,
        message:'Logged Out'
    })
})

//now lets talk abt middleware->some case where user is already logged in=>
//2ways=>
//1st >acees user cookie every time->allow the access to resourse
//2nd way->user hits route -> we want to go ahead and check user auth ->then allow the user to aceess->advntage->


