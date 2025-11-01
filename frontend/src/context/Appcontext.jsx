import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';

export const Appcontext = createContext();

const AppcontextProvider = (props) => {
  const currencySymbol = '$';
  const backendurl = 'https://doctor-appointment-backend-okdh.onrender.com';
  const [doctors, setDoctors] = useState([]);
  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false);

  const [userData,setUserdata]=useState(false)


  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendurl + '/api/doctor/list');
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loaduserProfileData=async(req ,res)=>{
    try {
      
      const {data}=await axios.get(backendurl + '/api/user/getprofile',{headers:{token}})
      if(data.success){
        setUserdata(data.userData)
      }
      else{
        toast.error(data.message)
      }

    } catch (error) {
       console.log(error);
      toast.error(error.message);
    }
  }

const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    settoken,
    backendurl,
    userData,
    setUserdata,
    loaduserProfileData
  };
  useEffect(() => {
    getDoctorsData();
  }, []);

    useEffect(()=>{
      if(token){
        loaduserProfileData()
      }else{
        setUserdata(false)
      }
    },[token])

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) settoken(storedToken);
  }, []);

  

  return (
    <Appcontext.Provider value={value}>
      {props.children}
    </Appcontext.Provider>
  );
};

export default AppcontextProvider;
