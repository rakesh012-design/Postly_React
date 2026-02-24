const mongoose=require('mongoose')


const userSchema=mongoose.Schema({

  userName:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true,
    trim:true,
    lowercase:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlenght:[8,'need at least 8 characters in the password']
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  likedPosts:[
    {
      type:mongoose.Schema.ObjectId,
      ref:'Post'
    }
  ],
  profilePic:{
    type:String
  },
    
  resetPasswordToken:String,
  resetPasswordTokenExpiresAt:Date,
  verificationToken:String,
  verificationTokenExpiresAt:Date,
  lastLogin:{
    type:Date,
    default:Date.now()
  }
  


},{timestamps:true})

module.exports=mongoose.model('User',userSchema)