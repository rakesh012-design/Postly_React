require('dotenv').config()
const User=require('../models/user')
const jsonUtil=require('../util/json-util')
const jwt=require('jsonwebtoken')


const authenticateUser=(req,res,next)=>{
  try{
    const token=req.cookies.token
    if(!token){
      return jsonUtil(res,401,false,'user is not logged in. Pleases login to continue')
    }
    const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.userId=decoded['userId']
    next()
  }catch(e){
    if(e.name==='TokenExpiredError'){
      res.clearCookie('token')
      return jsonUtil(res,500,false,'Token Expired')
    }
    return jsonUtil(res,500,false,e.message)
  }
  
}

module.exports={authenticateUser}