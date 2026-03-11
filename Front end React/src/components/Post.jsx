import {AiFillHeart} from 'react-icons/ai'
import {FaRegBookmark,FaBookmark} from 'react-icons/fa'
import {CgProfile} from 'react-icons/cg'
import {  getPostDetails, likePost } from '../store/postsStore'
import { addPostToFavourites } from '../store/userStore'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { Button } from '@mui/material'
import Carousel from './Carousel'


const Post=({post})=>{
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  const store=useSelector((store)=>store.userStore)

  const handleLike=({id})=>{
    dispatch(likePost({id}))
  }

  const handleEditPost=async(id)=>{
    navigate(`/home/edit-post/${id}`)
  }

  const handleAddToFavourites=async(id)=>{
    console.log('handle add to Favourites called')
    await dispatch(addPostToFavourites(id))
  }
 
  
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition overflow-hidden">
      {/* User Info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white">
            {post.uploadedBy.profilePic ? <img src={post?.uploadedBy?.profilePic} referrerPolicy='no-referrer'
              style={{ width: "40px", height: "40px", borderRadius: "50%"}} /> :
            <CgProfile size={20}/>}
          </div>
          <span className="font-semibold text-gray-800">{post.uploadedBy.userName || store.user?.userName}</span>
        </div>
      </div>

      {/* Image */}
      <div 
        className="w-full h-48 bg-gray-200 cursor-pointer hover:opacity-90 transition overflow-hidden">
      {post.image.length>1 ? 
      <Carousel images={post.image}/>:
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
        />}
      </div>

      {/* Post Content */}
      <div className="p-4">
        <h5 className="font-bold text-gray-800 text-lg mb-2">{post.title}</h5>
        <p className="text-gray-600 text-sm mb-4">{post.caption}</p>

        {/* Likes Section */}
        <div className="border-t border-gray-200 pt-3">
          <div className="flex items-center gap-2 mb-3">
            <button 
              onClick={()=>handleLike({id:post._id})}
              className="flex items-center gap-2 text-lg transition hover:scale-110"
            >
              <AiFillHeart 
                size={24}
                fill={post.likedByCurrentUser ? 'red' : '#e5e7eb'}
                color={post.likedByCurrentUser ? 'red' : '#d1d5db'}
                className='cursor-pointer' 
              />
              <span className="text-sm font-semibold text-gray-700">{post.likes}</span>
            </button>
          </div>
          
          {post.likedBy.length > 0 && (
            <div className="text-xs text-gray-600">
              <p className="font-semibold mb-1">Liked by:</p>
              <div className="flex flex-wrap gap-2">
                {post.likedBy.slice(0, 3).map((p)=>(
                  <span key={p.userName} className="bg-gray-100 px-2 py-1 rounded">
                    {p.userName}
                  </span>
                ))}
                {post.likedBy.length > 3 && (
                  <span className="text-gray-500">+{post.likedBy.length - 3} more</span>
                )}
              </div>
            </div>
          )}
        </div>
        <div className='relative float-end'><Button color='none' onClick={()=>handleAddToFavourites(post._id)}>
        {store.user?.FavouritePosts.some((p)=>String(p)===String(post._id))  ?<FaBookmark size={25}/>  :<FaRegBookmark size={25} />}</Button> </div>
      </div>
    </div>
  )

}
export default Post