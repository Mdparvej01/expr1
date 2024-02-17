import dotenv from "dotenv"

dotenv.config() //we have initialized

const config = {

    PORT: process.env.PORT || 5000 , //grabbing the port=>configuration named port=>grab using envirment variable or port 
    MONGODB_URL:process.env.MONGODB_URL || "mongodb://localhost:27017/pjbase" //either grab port from process.env.PORT ORR use 5000
    //now i can use the same code in my dev enviroment and my production enviroment as well...
    
}
//u can import this config wherever u wamt...





export default config //exporting this object......
