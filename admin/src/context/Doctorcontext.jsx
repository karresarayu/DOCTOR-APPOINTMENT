import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const Doctorcontext=createContext()

const Doctorcontextprovider=(props)=>{

    const backendurl='https://doctor-appointment-backend-okdh.onrender.com'
    const [dToken,setDToken]=useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'')
    const [dashData,setDashData]=useState(false)
    const [appointments,setappointments]=useState([])

    const [profileData,setprofileData]=useState(false)

  const getAppointments = async () => {
  try {
    // Change header key to lowercase 'dtoken'
    const { data } = await axios.get(backendurl + '/api/doctor/Appointments', {
      headers: {  dToken } // Use lowercase key
    });
    
    if (data.success) {
      setappointments(data.appointments)
      console.log(data.appointments)
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

  const completeAppointment=async(appointmentId)=>{

    try {
      const {data}=await axios.post(backendurl + '/api/doctor/complete-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error)
    toast.error(error.message)
    }
  }


    const cancelAppointment=async(appointmentId)=>{

    try {
      const {data}=await axios.post(backendurl + '/api/doctor/cancel-appointment',{appointmentId},{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        getAppointments()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
        console.log(error)
    toast.error(error.message)
    }
  }

  const getDashData=async()=>{
    try {

      const {data}=await axios.get(backendurl + '/api/doctor/dashboard',{headers:{dToken}})
      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
        console.log(error)
    toast.error(error.message)
    }
  }

  const getprofileData=async()=>{

    try {

      const {data}=await axios.get(backendurl + '/api/doctor/profile',{headers:{dToken}})
      if(data.success){
        setprofileData(data.profileData)
        console.log(data.profileData)
      }


    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

  }

    const value={
        dToken,setDToken,
        backendurl,
        appointments,
        setappointments,
        getAppointments,
        cancelAppointment,
        completeAppointment,
        getDashData,
        setDashData,
        dashData,
        profileData,
        setprofileData,
        getprofileData

    }
    return (
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )

}

export default Doctorcontextprovider

