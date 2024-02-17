// here the actual magic happens...
import mongoose from 'mongoose'; //connections imp
import app from "./app.js";
import config from "./src/config/index.js";  //created config exported config now instead of writing url we can write config.MONGODBURL in it..

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
//utils are nothing but utilities=>e.g Authroles=>as our application will have multiple roles=>user,manages etc=>we will be creating simple object

( async() => {
    try{
       await mongoose.connect('config.MONGODB_URL')  // #DATABASE CONNECTED
       console.log("DB connected !");
       //to handle permisions errors do following thing
       //'mongodb://127.0.0.1:27017/test' or  mongodb://localhost:27017/pjbase"=>these are hard coded values which may create issues=> to avoid this we need to use npn.env which gives enviroment variable access we can use buckets and secret keys as well


        app.on('error', (err) => {  //additional imp code..   @to connect express app created in app.js => if express failed to talk to databasee we have to thorw error=>.on functi to avoid error 
            //callback for error
            console.log("eooer is",err);   //this is compolsory event to handle.......
            throw err;
        })

        //Now the database is connected and my express app can also talk to it.......
        //before listen to the app make sure no error yet tackeled
         
        const onListening=() => {
            console.log(`Listening on port ${config.PORT}`); //simple function instead of method ,,port 5000
        }

        app.listen(config.PORT, onListening )

    }catch(error){
        console.log("error is",error);
        throw error;

    }
})()

//if database changes then just change url in evn file