import React from 'react'
import { fetchAllPosts, getPosts } from '../store/postsStore'
import { useDispatch, useSelector } from 'react-redux'
import Post from './Post'
import Pager from './Pager'
import { useState } from 'react'
import { useEffect } from 'react'
import {FaSpinner} from 'react-icons/fa'

const AllPosts = () => {
  const store=useSelector((store)=>store.postStore)
  const dispatch=useDispatch()

  const [pageNum,setPageNum]=useState(1)
  
  const handleChangePage=(num)=>{
    setPageNum(num)
    dispatch(fetchAllPosts(num))

  }
  useEffect(()=>{
    dispatch(fetchAllPosts(pageNum))
  },[])
  const posts=store.allPosts
  return (
    <div className="grid gap-4 grid-cols-4 h-full m-0">
    {
    posts.length>0 ? posts.map((post,idx)=><Post key={idx} post={post}/>) : <h1><FaSpinner className='animate-spin'/></h1>}
    <Pager changePageNumber={handleChangePage} pageNum={pageNum}/>
    </div>
  )
}

export default AllPosts
