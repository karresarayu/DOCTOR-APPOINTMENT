import React from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { useContext } from 'react';
import { Admincontext } from './context/Admincontext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import {Routes,Route} from 'react-router-dom'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import Doctorlist from './pages/Admin/Doctorlist';
import { Doctorcontext } from './context/Doctorcontext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
const App = () => {

  const {aToken}=useContext(Admincontext)
  const {dToken}=useContext(Doctorcontext)

  return aToken || dToken? (
    <div className='bg-gradient-to-br from-indigo-100 to-purple-300'>
      <ToastContainer/>
      <Navbar />
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          {/* admin routes*/ }
          <Route path='/' element={<></>}/>
          <Route path='/admin-dashboard' element={<Dashboard/>}   />
          <Route path='/all-appointments' element={<AllAppointments/>}/>
           <Route path='/add-doctor' element={<AddDoctor/>}/>
            <Route path='/doctor-list' element={<Doctorlist/>}/>
           {/* doctor routes */}
            <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
             <Route path='/doctor-Appointments' element={<DoctorAppointment/>}/>
              <Route path='/doctor-profile' element={<DoctorProfile/>}/>

        </Routes>
      </div>
    </div>
  ):(
    <>
     <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
