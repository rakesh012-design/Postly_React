import {Outlet,Link, useLocation, useNavigate} from 'react-router-dom'
import Home from '../pages/Home'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkStatus, fetchUser, logoutUser } from '../store/userStore'
import { fetchAllPosts, getPosts } from '../store/postsStore'
import {CgProfile} from'react-icons/cg'
import { useState, useRef } from 'react'
import { IoChevronDown } from 'react-icons/io5'
import { RiEditCircleFill, RiLockPasswordLine, RiLogoutBoxLine, RiProfileFill } from 'react-icons/ri'



const Header = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)

  useEffect(()=>{
    dispatch(fetchUser())
    //dispatch(fetchAllPosts())
    //dispatch(getPosts(pageNum))
    const checkLoginStatus=async()=>{
      const res=await dispatch(checkStatus())
      if(res.payload.success===false){
        navigate('/')
      }
    }
    checkLoginStatus()
  },[])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  
  const location=useLocation().pathname.split('/')
  const currPage=location[(location.length)-1]

  const handleLogout=async()=>{
    const res=await dispatch(logoutUser())
    if(res.payload.success){
      navigate('/')
    }
  }
  const store=useSelector((store)=>store.userStore)
  const user=store.user
  return (
    <div className='min-h-screen bg-gray-50 mt-4'>
      <nav className='bg-white shadow-md sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            {/* Logo/Brand */}
            <div className='flex items-center gap-2'>
              <div className='h-8 w-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg'></div>
              <span className='font-bold text-xl text-gray-800'>Postly</span>
            </div>

            {/* Navigation Links */}
            <div className='hidden md:flex gap-8'>
              <Link 
                to={'/home'} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currPage==="home" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:text-indigo-600"}`}
              >
                Home
              </Link>
              <Link 
                to={'/home/addpost'} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currPage==="addpost" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:text-indigo-600"}`}
              >
                Add Post
              </Link>
              <Link 
                to={'/home/allposts'} 
                className={`px-3 py-2 rounded-md text-sm font-medium transition ${currPage==="allposts" ? "bg-indigo-100 text-indigo-700" : "text-gray-700 hover:text-indigo-600"}`}
              >
                All Posts
              </Link>
            </div>

            {/* Profile Section */}
            <div className='flex items-center gap-3 relative' ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className='flex items-center gap-2 px-3 py-2 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition cursor-pointer'
              >
                <CgProfile size={24} className='text-indigo-600'/>
                <span className='text-sm font-semibold text-gray-800'>{user?.userName || 'User'}</span>
                <IoChevronDown size={16} className={`text-indigo-600 transition ${profileOpen ? 'rotate-180' : ''}`}/>
              </button>

              {/* Dropdown Menu */}
              {profileOpen && (
                <div className='absolute top-full right-0 mt-2 w-48 max-h-72 overflow-y-auto bg-white rounded-lg shadow-lg border border-gray-200 z-50'>
                  <div className='py-1'>
                    <button
                      onClick={() => {
                        navigate('/profile')
                        setProfileOpen(false)
                      }}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2'
                    >
                      <CgProfile size={18} />
                      <span>View Profile</span>
                    </button>
                    <button
                    to={'/home/change-password'}
                      onClick={() => {
                        navigate('/home/change-password')
                        setProfileOpen(false)
                      }}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2 border-t border-gray-200'
                    >
                      <RiLockPasswordLine size={18} />
                      <span>Change Password</span>
                    </button>
                    <button
                      onClick={() => {
                        navigate('/home/profile')
                        setProfileOpen(false)
                      }}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2 border-t border-gray-200'
                    >
                      <RiProfileFill size={18} />
                      <span>Profile</span>
                    </button>
                     <button
                      onClick={() => {
                        navigate('/home/edit-profile')
                        setProfileOpen(false)
                      }}
                      className='w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition flex items-center gap-2 border-t border-gray-200'
                    >
                      <RiEditCircleFill size={18} />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2 border-t border-gray-200'
                    >
                      <RiLogoutBoxLine size={18} />
                      <span>Logout</span>
                    </button>
                    
                    
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Outlet/>
      </main>
    </div>
  )
}

export default Header
