import React, { useState, useContext } from 'react';
import { Admincontext } from '../context/Admincontext';
import { Doctorcontext } from '../context/Doctorcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAtoken, backendurl } = useContext(Admincontext);
  const { setDToken } = useContext(Doctorcontext);

  const onsubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendurl + '/api/admin/login', { email, password });
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAtoken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + '/api/doctor/login', { email, password });
        if (data.success) {
          localStorage.setItem('dToken', data.token);
          setDToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-purple-300">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl mx-auto shadow-xl rounded-xl overflow-hidden bg-white">
        {/* Left Side - Info Section */}
        <div className="hidden md:flex flex-col justify-center items-start bg-violet-500 text-white w-full md:w-1/2 p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg">Login to manage appointments, doctors, and more.</p>
          <p className="mt-4 text-sm">You're logging in as an <span className="font-semibold">{state}</span>.</p>
        </div>

        {/* Right Side - Login Form */}
        <form onSubmit={onsubmitHandler} className="w-full md:w-1/2 p-8 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-6 text-violet-600">{state} Login</h2>

          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
            />
          </div>

          <button type="submit" className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700 transition">
            Login
          </button>

          <div className="mt-4 text-center">
            {
              state === 'Admin' ? (
                <p>Doctor Login? <span className="text-violet-600 underline cursor-pointer" onClick={() => setState('Doctor')}>Click here</span></p>
              ) : (
                <p>Admin Login? <span className="text-violet-600 underline cursor-pointer" onClick={() => setState('Admin')}>Click here</span></p>
              )
            }
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
