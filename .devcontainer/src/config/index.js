import dotenv from "dotenv"

dotenv.config()

const config = {

    PORT: process.env.PORT || 5000 , //grabbing the port=>configuration named port=>grab using envirment variable or port 
    MONGODB_URL:process.env.MONGODB_URL || "mongodb://localhost:27017/pjbase"
    
}
//u can import this config wherever u wamt...





export default config
