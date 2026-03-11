import Home from "./pages/Home"
import Login from "./pages/Login"
import {BrowserRouter,Route,Routes} from'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
import Header from "./components/Header"
import AddPost from "./components/AddPost"
import AllPosts from "./components/AllPosts"
import EditPage from "./pages/EditPage"
import Signup from "./pages/Signup"
import VerifyUser from "./pages/VerifyUser"
import ChangePassword from "./pages/ChangePassword"
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import ForgotPassword from "./pages/ForgotPassword"
import VerificationToken from "./pages/VerificationToken"
import UserFavouritePosts from "./pages/UserFavouritePosts"


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/verify-user" element={<VerifyUser />} />
      <Route path="/forgot-password" element={<ForgotPassword />}/>
      <Route path="/verify-token" element={<VerificationToken />} />
      <Route path="/home" element={<Header/>}>
        <Route index element={<Home />}/>
        <Route path="addpost" element={<AddPost />}/>
        <Route path="allposts" element={<AllPosts />}/>
        <Route path='edit-post/:id' element={<EditPage />}/>
        <Route path="change-password" element={<ChangePassword />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="edit-profile" element={<EditProfile />}/>
        <Route path="user-favourites" element={<UserFavouritePosts />} />
      </Route>
      </Routes>
    </BrowserRouter>
  
  )
}

export default App
