//api for adding doctor
import validator from "validator"
import bcrypt from "bcrypt"
import {v2 as cloudinary} from "cloudinary"
import doctorModel from "../models/doctormodel.js"
import jwt from 'jsonwebtoken'
import appointModel from '../models/appointmentmodel.js'
import userModel from "../models/usermodel.js"
const addDoctor=async(req,res)=>{
    try{
        const { name,email,password,speciality,degree,experience,about, fees,address}=req.body
       const imageFile=req.file
        //console.log({name,email,password,speciality,degree,experience,about, fees,address},imageFile)

        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
                return res.json({success:false,message:"please fill the deatils"})
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"please enter the valid email"})
        }
       if(password.length < 8){
         return res.json({success:false,message:"please enter strong password"})
       }

       const salt=await bcrypt.genSalt(10)

       const hashedPassword=await bcrypt.hash(password,salt)

    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
      const imageurl = imageUpload.secure_url

       const doctorData={
        name,
        email,
      image:imageurl,
        password:hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date:Date.now()

       }

       const newDoctor = new doctorModel(doctorData)

       await newDoctor.save()

       res.json({success:true,message:"doctor added successfully"})

    }
    catch(error){
            console.log(error)
            res.json({success:false,message:error.message})
    }
}

const loginAdmin=async(req,res)=>{
    try{
       
        const {email,password}=req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token=jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"invalid credentials"})
        }
        
    }
    catch(error){
         console.log(error)
            res.json({success:false,message:error.message})
    }
}

// api to get all doctors list 

const allDoctors = async(req,res)=>{
    try {
       const doctors=await doctorModel.find({}).select('-password')
       res.json({success:true,doctors})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const appointmentsAdmin=async(req,res)=>{
    try {
        
        const appointments=await appointModel.find({})
        res.json({success:true,appointments})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const AppointmentCancel = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointModel.findById(appointmentId);


    await appointModel.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctorData = await doctorModel.findById(docId);

    let slots_booked = doctorData.slots_booked;
    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// api to get dashboard data for admin panel

const adminDashboard=async (req,res)=>{
    try {
      
      const doctors=await doctorModel.find({})
      const users=await userModel.find({}) 
      const appointments=await appointModel.find({})

      const dashData = {
         doctors:doctors.length,
         appointments:appointments.length,
         patients:users.length,
         latestAppointments:appointments.reverse().slice(0,5)
      }

      res.json({success:true,dashData})

    } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,AppointmentCancel,adminDashboard}