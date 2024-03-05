import User from "../models/user.schema.js";
import JWT from "jsonwebtoken";
import asyncHandler from "../service/asynchHandler.js";
import config from "../config.js";
import CustomError from "../utils/Customerror.js";



//middleware is nothing but a function

export const isLoggedIn = asyncHandler ( async (req, res, next) => {
    //next () //place it betn route it will act as middleware..
    let token;
    if( req.cookies.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) ){
        token = req.cookie.token || req.headers.authorizationtoken.split(" ")[1] //[0] is bearer...
        //token = "Bearer  tokenvalue "=>spilt will give [1] ...which is itself a token...
    }

    if(!token) {
        throw new CustomError ("Not authorized to access this resource", 401)
    }

    //somebody migth be playing with us then try and catch...

    try {
        const decodedJwtPayload =   JWT.verify (token , config.JWT_SECRET ) // _id:this._id , role:this.role these values are available to us now..

        req.user = await  User.findById(decodedJwtPayload._id , "name email role")  //no  , inBetn
        //saved information in request itself=>req.user will give its id roles etc..
         next()
    } catch (error) {
        throw new CustomError ("Not authorized to access this resource", 401)
    }

})

//first middleware completed...

//second middleware is based on his roles...

export const authorize = (...requiredRoles) => asyncHandler( async (req, res ,next)=> { //higher order functions..
    
    if(!requiredRoles.includes(req.user.role)){   //include since i want that required role should be an array..
        throw new CustomError("You are not authorized to access this resource")

    }
    next()

})