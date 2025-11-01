import express from 'express'
import { doctorList,loginDoctor ,appointmentsDoctor,appointmentcomplete,appointmentcancel,doctorDashboard,updateDoctorProfile,doctorProfile} from '../controllers/doctorcontroller.js'
import authDoctor from '../middlewares/authDoctor.js'

const doctorRouter=express.Router()
doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',loginDoctor)
doctorRouter.get('/Appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/complete-appointment',authDoctor,appointmentcomplete)
doctorRouter.post('/cancel-appointment',authDoctor,appointmentcancel)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter 
