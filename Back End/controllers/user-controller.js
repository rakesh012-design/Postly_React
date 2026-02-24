require('dotenv').config({quiet:true})
const User=require('../models/user')
const jsonUtil=require('../util/json-util')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const {sendVerificationCodeEmail}=require('../helper/mailTrap')
const {OAuth2Client}=require('google-auth-library')
const client=new OAuth2Client('622527416169-o52p3r9sli8a6kchm9k11fldn5ofvn5d.apps.googleusercontent.com')

const signUpUser=async(req,res)=>{
  try{
    const {userName,email,password}=req.body
    const isExistingUser=await User.findOne({email})
    if(isExistingUser){
      return jsonUtil(res,400,false,'User already Exists')
    }
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)
    const user=new User({
      userName,
      email,
      password:hashedPassword,
      verificationToken:Math.floor(100000+Math.random()*900000).toString(),
      verificationTokenExpiresAt:Date.now()+15*60*1000
    })
    await sendVerificationCodeEmail(user.email,user.verificationToken)
    await user.save()
    return res
      .status(200)
      .json({ success: true,
        message: "user has been created successfully" ,
        user:{
          ...user._doc,
          password:undefined
        }
      });
  }catch(e){
    console.log(e)
    return jsonUtil(res,400,false,e.message)
  }
}

const verifyUser=async(req,res)=>{
  try{
    const {verificationCode}=req.body
    const user=await User.findOne({
      verificationToken:verificationCode,
      verificationTokenExpiresAt:{$gt:Date.now()}
    })
    if(!user){
      return res.status(400).json({success:false,message:"User not found"})
    }
    if(verificationCode!==user.verificationToken){
      return res.status(400).json({success:false,message:"Invalid verification Code"})
    }
    user.isVerified=true
    user.verificationTokenExpiresAt=undefined
    user.verificationToken=undefined
    await user.save()
    return res.status(200).json({success:true,message:'user has been verified please login and continue...',user:{...user._doc,password:undefined}})
  }catch(e){
    return res.status(500).json({success:false,message:e.message})
  }
}

const loginUser=async(req,res)=>{
  try{
    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user){
      return jsonUtil(res,400,false,'user does not exist')
    }
    const isMatch=await bcrypt.compare(password,user.password)
    if(!isMatch){
      return jsonUtil(res,400,false,'Invalid Credentials')
    }
    const accessToken=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    res.cookie('token',accessToken,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,

    })
    user.password=undefined
    return res.status(200).json({success:true,message:'login successful',user})
  }catch(e){
    return jsonUtil(res,400,false,e.message)
  }
}

const getCurrentUser=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    user.password=undefined
    return res.status(200).json({success:true,user})
  }catch(e){
    console.log(e)
    res.status(500).json({success:false,message:`user not found ${e.message}`})
  }

}

const logout=async(req,res)=>{
  try{
    res.clearCookie('token')
    return res.status(200).json({success:true,message:'logged out successfully'})
  }catch(e){
    res.status(500).json({success:false,messsage:`error while logging out ${e.message}`})
  }
}
const check=async(req,res)=>{
  try{
    if(!req.userId){
      return res.status(403).json({success:false,message:'session expired'})
    }
    return res.status(200).json({success:true,message:'user is already logged in'})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:true,message:`error: ${e.message}`})
  }
}

const googleLogin=async(req,res)=>{
  try{
    const {googleToken}=req.body
    const ticket=await client.verifyIdToken({
      idToken:googleToken,
      audience:'622527416169-o52p3r9sli8a6kchm9k11fldn5ofvn5d.apps.googleusercontent.com'
    })
    const userInfo=ticket.getPayload()
    const user=await User.findOne({email:userInfo.email})
    if(!user){
  
      const user=new User({email:userInfo.email,password:'123456',userName:userInfo.name})
      await user.save()
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:'1h'})
    res.cookie('token',token,{
      httpOnly:true,
      sameSite:'lax',
      secure:false,

    })
    return res.status(200).json({success:true,message:'user Logged in successfully'})
  }catch(e){
    console.log(e)
  }
}

const changePassword=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    console.log(req.body)
    const {oldPassword,newPassword}=req.body
    if(!oldPassword || !newPassword){
      return res.status(403).json({success:false,message:'please  Enter both the passwords'})
    }
    const salt=await bcrypt.genSalt(10)
    const check=await bcrypt.compare(oldPassword,user.password)
    if(!check && oldPassword!==user.password){
      return res.status(403).json({success:false,message:'Wrong Password'})
    }
    const hashedNewPassword=await bcrypt.hash(newPassword,salt)
    user.password=hashedNewPassword
    await user.save()
    return res.status(200).json({success:true,message:'password change successfully'})
  }catch(e){
    return res.status(403).json({success:false,message:`something went wrong please try again ${e.message}`})
  }

}

const editUser=async(req,res)=>{
  try{
    const user=await User.findById(req.userId)
    let {newUserName,newEmail}=req.body
    if(newUserName===''){
      newUserName=user.userName
    }else{
      user.userName=newUserName
    }
    if(newEmail===''){
      newEmail=user.email
    }else{
      user.email=newEmail
    }
    await user.save()
    user.password=undefined
    return res.status(200).json({success:true,message:'changes saved Successfully',user})
  }catch(e){
    console.log(e)
    return res.status(500).json({success:false,message:`something went wrong try again ${e.message}`})
  }
}


module.exports={signUpUser,loginUser,verifyUser,getCurrentUser,logout,check,googleLogin,changePassword,editUser}