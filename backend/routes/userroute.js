import express from 'express'
import { registerUser,loginUser, getProfile,updateProfile,bookappointment, listAppointment,cancelAppointment,paymentRazorpay ,verifyRazorpay} from '../controllers/usercontroller.js'
import authuser from '../middlewares/authuser.js'
import upload from '../middlewares/multer.js'

const userRouter=express.Router()

userRouter.post('/register',registerUser)

userRouter.post('/login',loginUser)

userRouter.get('/getprofile',authuser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authuser,updateProfile)
userRouter.post('/book-appointment',authuser,bookappointment)


userRouter.get('/appointments',authuser,listAppointment)

userRouter.post('/cancel-appointment',authuser,cancelAppointment)
userRouter.post('/payment-razorpay',authuser,paymentRazorpay)
userRouter.post('/verifyrazorpay',authuser,verifyRazorpay)
export default userRouter