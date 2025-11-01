import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'


const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments ,cancelAppointment} = useContext(Admincontext)
  const {caluculateAge,slotDateFormat,currency} = useContext(Appcontext)
  useEffect(() => {
    if (aToken) {
      getAllAppointments()
    }
  }, [aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-indigo-50 border border-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

        {/* Header row */}
        <div className='hidden bg-violet-100 sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] py-3 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Currently implemented content */}
        {appointments.map((item, index) => (
          <div
            className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 hover:bg-violet-200 hover:text-black'
            key={index}
          >
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full' src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{caluculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
             <div className='flex items-center gap-2'>
              <img className='w-10 rounded-full bg-violet-300' src={item.docData.image} alt="" />
              <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
            item.cancelled 
            ?<p className='text-red-500 text-s font-medium'>Cancelled</p>
            : item.isCompleted 
            ?<p  className='text-green-500 text-s font-medium'>Completed</p>
            :<img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer   ' src={assets.cancel_icon} alt="" />

            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointments
