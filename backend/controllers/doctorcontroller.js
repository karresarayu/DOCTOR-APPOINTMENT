import doctorModel from "../models/doctormodel.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointModel from "../models/appointmentmodel.js"

const changeAvailability = async(req , res)=>{
    try {
        
        const {docId}=req.body
        const docData=await doctorModel.findById(docId)

        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        
        res.json({success:true,message:"Availability Changed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const doctorList = async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

//api for doctor login

const loginDoctor=async(req,res)=>{

    try {
        
        const {email,password}=req.body
        const doctor=await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:"invalid credintials"})
        }

        const isMatch=await bcrypt.compare(password,doctor.password)

        if(isMatch){

            const token = jwt.sign({id:doctor._id},process.env.JWT_SECRET)
            res.json({success:true,token})


        }
        else{
             res.json({success:false,message:"invalid credintials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentsDoctor=async(req,res)=>{

    try {
        
        const docId = req.docId
       
        const appointments=await appointModel.find({docId})

        res.json({success:true,appointments})

    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentcomplete = async(req,res)=>{
    try {
          const docId = req.docId
          const appointmentId=req.body.appointmentId

          const appointmentData=await appointModel.findById(appointmentId)
          if(appointmentData && appointmentData.docId === docId){
                   await appointModel.findByIdAndUpdate(appointmentId,{isCompleted:true}) 
                   return res.json({success:true,message:'appointment completed'})
          } else{
               return res.json({success:false,message:'mark failed'})
          }



    } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentcancel = async(req,res)=>{
    try {
          const docId = req.docId
          const appointmentId=req.body.appointmentId

          const appointmentData=await appointModel.findById(appointmentId)
          if(appointmentData && appointmentData.docId === docId){
                   await appointModel.findByIdAndUpdate(appointmentId,{cancelled:true}) 
                   return res.json({success:true,message:'appointment cancelled'})
          } else{
               return res.json({success:false,message:'cancellation failed'})
          }



    } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
    }
}

// api to get doctor data dahsboard

const doctorDashboard=async(req,res)=>{

        try {

            const docId=req.docId
            const appointments=await appointModel.find({docId})
            let earning=0

            appointments.map((item)=>{
                if(item.isCompleted || item.payment){
                    earning+=item.amount
                }
            })

            let patients=[]
            appointments.map((item)=>{
                if(!patients.includes(item.userId)){
                    patients.push(item.userId)
                }
            })

            const dashData = {
                earning,
                appointments:appointments.length,
                patients:patients.length,
                latestAppointments:appointments.reverse().slice(0,5)

            }

            res.json({success:true,dashData})

        } catch (error) {
             console.log(error)
        res.json({success:false,message:error.message})
        }


}

//api to get doctor profile for doctor panel

const doctorProfile =async(req,res)=>{
    try {
        
        const docId=req.docId
        const profileData=await doctorModel.findById(docId).select('-password')

        res.json({success:true,profileData})

    } catch (error) {
          console.log(error)
        res.json({success:false,message:error.message})
    }
}

const updateDoctorProfile = async(req,res)=>{

    try {
        const docId=req.docId
        const { fees,address,available }=req.body;

        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})

        res.json({success:true,message:'profile updated'})

        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {changeAvailability,doctorList,loginDoctor,appointmentsDoctor,appointmentcancel,appointmentcomplete,doctorDashboard,updateDoctorProfile,doctorProfile}