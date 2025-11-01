import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
export const Admincontext=createContext()

const Admincontextprovider=(props)=>{

    const [aToken,setAtoken]=useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')
    const [doctors,setDoctors]=useState([])
    const [appointments,setAppointments]=useState([])
    const backendurl='https://doctor-appointment-backend-okdh.onrender.com'

    const [dashData,setdashData]=useState(false)
    const getallDoctors=async()=>{
        try {
            const{data}=await axios.post(backendurl + '/api/admin/all-doctors',{},{headers:{admintoken:aToken}})
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }
            else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeAvailability=async(docId)=>{
        try {
            
            const {data}=await axios.post(backendurl + '/api/admin/change-availability',{docId},{headers:{admintoken:aToken}})
            if(data.success){
                toast.success(data.message)
                getallDoctors()
            }
            else{
                toast.error(data.message)
            }
            

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getAllAppointments = async()=>{
            try {

                const {data}=await axios.get(backendurl + '/api/admin/appointments',{headers:{admintoken:aToken}})
                if(data.success){
                    setAppointments(data.appointments)
                    console.log(data.appointments)
                }
                else{
                    toast.error(data.message)
                }

            } catch (error) {
                toast.error(error.message)
            }
    }
    const cancelAppointment=async(appointmentId)=>{

        try {
            
            const {data}=await axios.post(backendurl + '/api/admin/cancelappointment',{appointmentId} ,{headers:{admintoken:aToken}} )
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const getdashData=async()=>{
        try {

            const {data}=await axios.get(backendurl + '/api/admin/dashboard',{headers:{admintoken:aToken}})
            if(data.success){
                setdashData(data.dashData)
                console.log(data.dashData)
            }
            else{
                toast.error(data.message)
            }

        } catch (error) {
               toast.error(error.message)
        }
    }

    const value={
        aToken,setAtoken,
        backendurl,
        doctors,
        getallDoctors,
        changeAvailability,
        appointments,setAppointments,
        getAllAppointments,
        cancelAppointment,
        dashData,
        getdashData
    }
    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )

}

export default Admincontextprovider

