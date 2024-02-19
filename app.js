import express from 'express'
import cors from "cors"
import cookieparser from "cookie-parser"
//creat obj from express
const app = express()
//  const {name,email,password} = req.body=>in this there are two portions one portion is hanled into rout and one in express app
app.use(express.json())  //eccept the data in json formate..
app.use(express.urlencoded({extended:true}))// this are compolsory settings toenable
app.use(cors())
app.use(cookieParser())
//hw how CORES works......
//we are excepting two types of data json data and urlencoded data=>now i want to access users cookie=>
//this time in express json data coming in i am saying eccept data=>
//some response will go from server to user also=>
//by installing cookie parser=>server can access users cookie=>
//use of it=>say we are sending response back to user byt before sending =>
//i want to store this token in users cookie=>my server wants to access users cookie but by default it can not=>while sending him respons iwant to access user cookie
//use--->res.cookie
export default app;