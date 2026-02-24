import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {CgProfile} from 'react-icons/cg'

const Profile = () => {
  const dispatch=useDispatch()

  const store=useSelector((store)=>store.userStore)
  const user=store.user
  console.log('user from profile',store.user)
  return (
    <div className="row d-flex justify-content-center">
        <div className="col col-lg-7 mb-4 mb-lg-0">
          <div className="card" style={{borderRadius: ".5rem"}}>
            <div className="row g-0">
             <div className="col-md-4 gradient-custom text-center text-black items-center flex flex-col" >
                <CgProfile className="img-fluid my-5" style={{width: "80px"}}/>
                <h1>{user?.userName}</h1>
              </div>
              <div className="col-md-8">
                <div className="card-body p-4">
                  <h6>Information</h6>
                  <hr className="mt-0 mb-4"/>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Email</h6>
                      <p className="text-muted">{user?.email}</p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Liked Posts</h6>
                      <p className="text-muted">{user?.likedPosts?.length || 0}</p>
                    </div>
                  </div>
                  <h6>status</h6>
                  <hr className="mt-0 mb-4"/>
                  <div className="row pt-1">
                    <div className="col-6 mb-3">
                      <h6>Verification Status</h6>
                      {user?.isVerified ? <p className="text-muted">Verified</p> : <p className="text-muted">Not verified</p>}
                    </div>
                    <div className="col-6 mb-3">
                      <h6>Last Profile Change</h6>
                      <p className="text-muted">{user?.updatedAt}</p>
                    </div>
                  </div>
                  <div className="d-flex justify-content-start">
                    <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                    <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                    <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Profile
