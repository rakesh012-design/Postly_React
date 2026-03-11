require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const cookieParser = require('cookie-parser')

const connectToMongoDb=require('./data/db')
const errorController=require('./controllers/error-controller')



const userRouter=require('./Routes/user-router')
const imageRouter=require('./Routes/image-router')
const postRouter=require('./Routes/postRouter')


const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin:['http://localhost:5173','http://localhost:4173'],
  credentials:true
}))




app.use('/api/random',userRouter)
app.use('/api/random/image',imageRouter)
app.use('/api/random/post',postRouter)

app.use(errorController)

const PORT=process.env.PORT

const startServer=async()=>{
  await connectToMongoDb()
  app.listen(PORT,()=>{
    console.log(`server running on http//:localhost:${PORT}`)
  })
}
startServer()


