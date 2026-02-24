require('dotenv').config()
const User=require('../models/user')
const jsonUtil=require('../util/json-util')
const jwt=require('jsonwebtoken')


const authenticateUser=(req,res,next)=>{
  //const header=req.headers['authorization']
  try{
    const token=req.cookies.token
    //console.log(req.cookies)
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    //const user=token.getpayload
    req.userId=decoded['userId']
  }catch(e){
    return jsonUtil(res,400,false,e.message)
  }
  next()
}

module.exports={authenticateUser}