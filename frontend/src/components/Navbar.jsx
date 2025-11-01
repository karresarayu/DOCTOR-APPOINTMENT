import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { Appcontext } from '../context/Appcontext';

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setshowMenu] = useState(false);
  const { token, settoken, userData } = useContext(Appcontext);

  const logout = () => {
    settoken('');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='flex items-center justify-between text-sm py-1 mb-5 border-b border-b-gray-500'>
      <img onClick={() => navigate('/')} className='md:w-64 w-56 md:h-32 cursor-pointer' src={assets.logo} alt='' />

      <ul className='hidden md:flex items-start gap-5 font-medium text-lg'>
        <NavLink to={'/'}><li className='py-1'>Home</li></NavLink>
        <NavLink to={'/Doctors'}><li className='py-1'>All Doctors</li></NavLink>
        <NavLink to={'/About'}><li className='py-1'>About</li></NavLink>
        <NavLink to={'/Contact'}><li className='py-1'>Contact</li></NavLink>

        {/* Updated to Render Admin URL */}
        <a
          href="https://doctor-appointment-admin-c4x5.onrender.com"
          target="_blank"
          rel="noopener noreferrer"
          className='mt-1 border px-2 hover:bg-violet-500 hover:text-white'
        >
          Admin Panel
        </a>
      </ul>

      <div className='flex items-center gap-4'>
        {token && userData ? (
          <div className='flex items-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="profile" />
            <img className='w-2.5' src={assets.dropdown_icon} alt="dropdown" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
              <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                <p onClick={() => navigate('/Profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                <p onClick={() => navigate('/MyAppointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate('/Login')} className='border-none bg-blue-400 rounded-full px-8 py-1 md:py-3 text-white font-light'>Create Account</button>
        )}
        <img onClick={() => setshowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="menu" />
        <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img className='w-36' src={assets.logo} alt="logo" />
            <img className='w-7' onClick={() => setshowMenu(false)} src={assets.cross_icon} alt="close" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setshowMenu(false)} to='/'><p className='px-4 py-2'>HOME</p></NavLink>
            <NavLink onClick={() => setshowMenu(false)} to='/Doctors'><p className='px-4 py-2'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setshowMenu(false)} to='/About'><p className='px-4 py-2'>ABOUT</p></NavLink>
            <NavLink onClick={() => setshowMenu(false)} to='/Contact'><p className='px-4 py-2'>CONTACT</p></NavLink>

            {/* Updated to Render Admin URL */}
            <a
              href="https://doctor-appointment-admin-c4x5.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className='mt-1 px-4 py-2 border'
            >
              Admin Panel
            </a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
