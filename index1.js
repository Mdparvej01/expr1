// here the actual magic happens...
import mongoose from 'mongoose';
import app from "./app.js";
import config from "./src/config/index.js";

//import mogoose from 'mongoose';
//we need to connect mangoose
//most expensive thing is database talking...
//always wrap database connection in TRY and CATCH form..
//database must be in another continent
// to avoid failure we are going to use async await and try and catch
//to connect mongoose 2 methods are there =>create a method 2>run a method
//async iff method
//async await ensures that DATABASE is in another continent
//2nd thing is catching the error it can be done through try and catch

( async() => {
    try{
       await mongoose.connect('config.MONGODB_URL')  // #DATABASE CONNECTED
       console.log("DB connected !");
       //to handle permisions errors do following thing
       //'mongodb://127.0.0.1:27017/test' mongodb://localhost:27017/pjbase"

        app.on('error', (err) => {  //additional imp code..
            //callback for error
            console.log("eooer is",err);
            throw err;
        })

        //before listen to the app make sure no error yet tackeled
         
        const onListening=() => {
            console.log(`Listening on port ${config.PORT}`); //simple function instead of method
        }

        app.listen(config.PORT, onListening )

    }catch(error){
        console.log("error is",error);
        throw error;

    }
})()

//if database changes then just change url in evn file