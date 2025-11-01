import React from 'react'
import { useContext } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { useEffect } from 'react'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {

  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment}=useContext(Doctorcontext)
  const {caluculateAge,slotDateFormat,currency}=useContext(Appcontext)
useEffect(()=>{
  if(dToken){
    getAppointments()
  }
},[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
       <p className='mb-3 text-lg font-medium'>All Appointments</p>
       <div className='bg-white border-white  rounded text-m p-3 max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid font-semibold text-lg grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-white border-b '>
        <p>#</p>
        <p>Patient</p>
        <p>Payment</p>
        <p>Age</p>
        <p>Date & Time</p>
        <p>Fees</p>
        <p>Action</p>
       </div>
       {
        appointments.reverse().map((item,index)=>(
          <div className='flex flex-wrap justify-between text-m max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-700 px-6 py-3 border-b border-white hover:bg-violet-100 hover:text-black ' key={index}>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-12 rounded-full' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                </div>
                <div>
                  <p className='text-xs inline border border-violet-500 px-2 rounded-full'>
                    {item.payment ? 'Online' :'CASH'}
                  </p>
                  </div>
                  <p className='max-sm:hidden'>{caluculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                  <p>{currency}{item.amount}</p>
                  {
                    item.cancelled
                    ?<p className='text-red-500 text-s font-medium'>Cancelled</p>
                    : item.isCompleted
                      ?<p className='text-green-500 text-s font-medium'>Completed</p>
                      :<div className='flex'>
                        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer'  src={assets.cancel_icon} alt="" />
                        <img  onClick={()=>completeAppointment(item._id)}  className='w-10 cursor-pointer' src={ assets.tick_icon}alt="" />
                      </div>
                  }
                  
                 
           </div> 
        ))
       }
       </div>
    </div>
  )
}

export default DoctorAppointment
