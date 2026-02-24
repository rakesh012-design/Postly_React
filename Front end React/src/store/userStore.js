import { createSlice,createAsyncThunk,current } from "@reduxjs/toolkit";



export const signupUser=createAsyncThunk('signupUser',
  async({userName,email,password})=>{
    const res=await fetch('http://localhost:3000/api/random/signup',{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({userName,email,password})
    })
    const data=await res.json()
    return data
  }
)

export const verifyUser=createAsyncThunk('verifyUser',
  async({verificationCode})=>{
    const res=await fetch('http://localhost:3000/api/random/verify-user',{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({verificationCode})
    })
    const data=await res.json()
    return data
  }
)

export const login=createAsyncThunk('loginUser',async({email,password})=>{
  const res=await fetch('http://localhost:3000/api/random/login',{
    method:"POST",
    credentials:'include',
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({email,password})
  })
  const data=await res.json()
  return data
})

export const fetchUser=createAsyncThunk('fetchUser',async()=>{
  const res=await fetch('http://localhost:3000/api/random/fetch-user/me',{
    method:"GET",
    credentials:'include'
  })
  const data=await res.json()
  return data
})

export const logoutUser=createAsyncThunk('logoutUser',
  async()=>{
    const res=await fetch('http://localhost:3000/api/random/logout',{
      method:"POST",
      credentials:"include"
    })
    const data=await res.json()
    return data
})

export const googleLoginFunction=createAsyncThunk('googleLogin',
  async(res)=>{
    try{
    const response=await fetch('http://localhost:3000/api/random/google-login',{
      method:"POST",
      headers:{
        "Content-Type":"application/Json"
      },
      credentials:'include',
      body:JSON.stringify({googleToken:res.credential})
    })
    const data=await response.json()
    return data
  }catch(e){
    console.log('error from FN',e)
  }
  }
)



export const checkStatus=createAsyncThunk('checkStatus',
  async()=>{
    const res=await fetch('http://localhost:3000/api/random/check',{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    return data
  }
)

export const changePassword=createAsyncThunk('changePassword',
  async({oldPassword,newPassword})=>{
    
    const res=await fetch('http://localhost:3000/api/random/change-password',{
      credentials:'include',
      method:'POST',
      headers:{"Content-Type":"application/Json"},
      body:JSON.stringify({oldPassword:oldPassword,newPassword:newPassword})
    })
    console.log('res from change password',res)
    const data=await res.json()
    return data
    
  }
)

export const editUser=createAsyncThunk('editUser',
  async({newUserName,newEmail})=>{
    const res=await fetch('http://localhost:3000/api/random/edit-user',{
      method:"PATCH",
      credentials:"include",
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({newUserName,newEmail})
    })
    const data=await res.json()
    return data
  }
)


const userSlice=createSlice({
  name:'userSlice',
  initialState:{
    user:{}
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(login.fulfilled,(state,action)=>{
      console.log(action.payload)
    })
    builder.addCase(fetchUser.fulfilled,(state,action)=>{
      state.user=action.payload.user
    })
    builder.addCase(login.rejected,(state,action)=>{
      console.log('in rejected',action.payload)
    })
    builder.addCase(signupUser.fulfilled,(state,action)=>{
      
    })
    builder.addCase(verifyUser.fulfilled,(state,action)=>{
      
    })
    builder.addCase(googleLoginFunction.fulfilled,(stat,action)=>{
      console.log(action.payload)
    })
    builder.addCase(googleLoginFunction.rejected,(state,action)=>{
      console.log(action.payload)
    })
    builder.addCase(changePassword.fulfilled,(state,action)=>{
     // console.log('from builder',action.payload)
    })
    builder.addCase(editUser.fulfilled,(state,action)=>{
      console.log(action.payload)
      state.user.userName=action.payload.user.userName
      state.user.email=action.payload.user.email
    })
  }
})

export const  {removeLikedPost}=userSlice.actions

export default userSlice