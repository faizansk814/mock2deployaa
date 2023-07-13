const express=require('express')
const connection = require('./connection/db')
const userrouter = require('./routes/user.router')
const employeerouter = require('./routes/employee.router')
const cors=require('cors')
const auth = require('./middleware/auth')
require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())
app.use("/user",userrouter)
app.use(auth)
app.use("/",employeerouter)

app.listen(process.env.port,async ()=>{
    try {
      await connection
      console.log("connected") 
    } catch (error) {
       console.log(error) 
    }
    console.log("connected to server")
})