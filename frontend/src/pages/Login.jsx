import React, { useContext, useEffect, useState } from 'react';
import { Appcontext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendurl, token, settoken } = useContext(Appcontext);
  const [state, setstate] = useState('Sign up');
  const navigate=useNavigate()
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [name, setname] = useState('');

  const onsubmithandler = async (event) => {
    event.preventDefault();

    try {
      if (state === 'Sign up') {
        const { data } = await axios.post(backendurl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          settoken(data.token);
          toast.success("Signup successful");
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendurl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          settoken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(()=>{
      if(token){
        navigate('/')
      }
  },[token])

  return (
    <form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-4 m-auto items-start p-8 min-w-[340px] sm:min-w-96 rounded-xl text-black text-sm shadow-lg hover:shadow-black/80'>
        <p className='text-2xl font-semibold'>{state === 'Sign up' ? "Create Account" : "Login"}</p>
        <p>Please {state === 'Sign up' ? "Sign up" : "Login"} to book an appointment</p>

        {state === 'Sign up' && (
          <div className='w-full'>
            <p>Full Name</p>
            <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='text' onChange={(e) => setname(e.target.value)} value={name} />
          </div>
        )}

        <div className='w-full'>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='email' onChange={(e) => setemail(e.target.value)} value={email} />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-full p-2 mt-1' type='password' onChange={(e) => setpassword(e.target.value)} value={password} />
        </div>

        <button type='submit' className='bg-violet-500 text-white w-full py-2 rounded-md text-base'>
          {state === 'Sign up' ? "Create Account" : "Login"}
        </button>

        {state === "Sign up" ? (
          <p>Already have an account? <span onClick={() => setstate('Login')} className='font-semibold text-violet-500 cursor-pointer'>Login Here</span></p>
        ) : (
          <p>Create a new account? <span onClick={() => setstate("Sign up")} className='font-semibold text-violet-500 cursor-pointer'>Click here</span></p>
        )}
      </div>
    </form>
  );
};

export default Login;