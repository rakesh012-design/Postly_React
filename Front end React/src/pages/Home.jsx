import React, { useEffect, useState } from 'react'
import { fetchImages } from '../services/services'
import  {FaSpinner} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts } from '../store/postsStore'
import Post from '../components/Post'
import {Link} from 'react-router-dom'
import Pager from '../components/Pager'


const Home = () => {
  const store=useSelector((store)=>store.postStore)
  const dispatch=useDispatch()

  const posts=store.posts 
  const [pageNum,setPageNum]=useState(1)

  const handlePageChange=(num)=>{
    setPageNum(num)
    dispatch(getPosts(num))
  }

  useEffect(()=>{
    dispatch(getPosts(1))
  },[])
  

  return (
    <div className="grid gap-4 grid-cols-4 h-full m-0">
      {posts.length > 0 ? (
        posts.map((post, idx) => (
          <Post key={idx}
           post={post}
          />
        ))
      ) : (
        <h1><FaSpinner className='animate-spin'/></h1>
      )}
    <Pager changePageNumber={handlePageChange} pageNum={pageNum}/>
    </div>
  );
}

export default Home
