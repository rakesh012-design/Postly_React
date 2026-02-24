const express=require('express')
const router=express.Router()
const userController=require('../controllers/user-controller')
const userMiddleWare=require('../middlewares/user-middleware')


router.post('/signup',userController.signUpUser)
router.post('/login',userController.loginUser)
router.post('/verify-user',userController.verifyUser)
router.get('/fetch-user/me',userMiddleWare.authenticateUser,userController.getCurrentUser)
router.post('/logout',userMiddleWare.authenticateUser,userController.logout)
router.get('/check',userMiddleWare.authenticateUser,userController.check)
router.post('/change-password',userMiddleWare.authenticateUser,userController.changePassword)
router.post('/google-login',userController.googleLogin)
router.patch('/edit-user',userMiddleWare.authenticateUser,userController.editUser)


module.exports=router