const express=require('express')
const uploadMiddleWare=require('../middlewares/image-uploader')
const imageController=require('../controllers/image-controller')
const userMiddleWare=require('../middlewares/user-middleware')

const router=express.Router()



router.post('/upload',userMiddleWare.authenticateUser,uploadMiddleWare.single('image'),imageController.uploadImage)
router.get('/get',userMiddleWare.authenticateUser,imageController.fetchImage)

module.exports=router