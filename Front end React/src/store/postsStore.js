import {createAsyncThunk, createSlice,current} from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { removeLikedPost } from './userStore'




export const getPosts=createAsyncThunk('getPosts',
  async(pageNum)=>{
    //console.log(pageNum)
    console.log(pageNum)
    const res=await fetch(`http://localhost:3000/api/random/post/pagination?page=${pageNum || 1}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    return data
  }
)

export const likePost=createAsyncThunk('likePost',
  async({id})=>{

   const res=await fetch(`http://localhost:3000/api/random/post/like-post/${id}`,{
    method:'POST',
    credentials:'include'
   })
    const data=await res.json()
    return data
  }
)

export const fetchAllPosts=createAsyncThunk('fetchAllPosts',
  async(pageNum)=>{
    const res=await fetch(`http://localhost:3000/api/random/post/all-posts?page=${pageNum || 1}`,{
      method:"GET",
      credentials:"include"
    })
    const data=await res.json()
    return data
  }
)

export const createPost=createAsyncThunk('createPost',
  async({formData})=>{
    const res=await fetch('http://localhost:3000/api/random/post/upload',{
      method:"POST",
      credentials:'include',
      body:formData
    })
    const data=await res.json()
    return data
  }
)

export const getPostDetails=createAsyncThunk('getPostDetails',
  async(id)=>{
    const res=await fetch(`http://localhost:3000/api/random/post/single-post/${id}`,{
      method:"GET",
      credentials:'include'
    })
    const data=await res.json()
    return data
  })

export const editPost=createAsyncThunk('editPost',
  async({id,title,caption})=>{
    console.log(id,title,caption)
    
    const res=await fetch(`http://localhost:3000/api/random/post/edit-post/${id}`,{
      method:"PATCH",
      credentials:'include',
      headers:{
        "Content-Type":"application/Json"
      },
      body:JSON.stringify({title,caption})
    })
    const data=await res.json()
    return data
  } 
)  

export const deletePost=createAsyncThunk('deletePost',
  async({id})=>{
    const res=await fetch(`http://localhost:3000/api/random/post/delete-post/${id}`,{
      method:"DELETE",
      credentials:'include'
    })
    const data=await res.json()
    return data
  }
)



const postSlice=createSlice({
  name:'postSlice',
  initialState:{
    posts:[],
    allPosts:[],
    postTobeEdited:{}
  },
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(getPosts.fulfilled,(state,action)=>{
      state.posts=action.payload.posts
      //state.allPosts=action.payload.posts
    })
    builder.addCase(likePost.fulfilled,(state,action)=>{
      const liked_post=action.payload.post
      const posts=state.posts
      const post=posts.find((p)=>String(p._id)===String(liked_post._id))
      if(post){
        post.likes=liked_post.likes
        post.likedBy=liked_post.likedBy
        post.likedByCurrentUser=liked_post.likedByCurrentUser
      }
      const allPosts=state.allPosts
      const p2=allPosts.find((p)=>String(p._id)===String(liked_post._id))
      if(p2){
        p2.likes=liked_post.likes
        p2.likedBy=liked_post.likedBy
        p2.likedByCurrentUser=liked_post.likedByCurrentUser 
      }
    })
    builder.addCase(fetchAllPosts.fulfilled,(state,action)=>{
      state.allPosts=action.payload.allPosts.slice().reverse()
    })
    builder.addCase(createPost.fulfilled,(state,action)=>{
      state.posts=[action.payload.post,...state.posts]
    })
    builder.addCase(getPostDetails.fulfilled,(state,action)=>{
      state.postTobeEdited=action.payload.post
    })
    builder.addCase(editPost.fulfilled,(state,action)=>{
      const editedPost=action.payload.post
      const post=state.posts.find((pos)=>String(pos._id)===String(editedPost._id))
      if(post){
        post.title=editedPost.title
        post.caption=editedPost.caption
      }
    })
    builder.addCase(deletePost.fulfilled,(state,action)=>{
      const deletedPost=action.payload.post
      state.posts.filter((p)=>p._id!=deletedPost._id)
      state.allPosts.filter((p)=>p._id=deletePost._id)
    })
  }}
)

export default postSlice