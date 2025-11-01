import React, { useState } from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { Appcontext } from "../context/Appcontext";
import axios from 'axios';
import {toast} from 'react-toastify'

const Profile = () => {
  const { userData, setUserdata, token, backendurl, loaduserProfileData } =
    useContext(Appcontext);

  const [isedit, setedit] = useState(false);
  const [image, setImage] = useState(false);

  const updateuserprofiledata = async () => {

        try {
          
            const formData=new FormData()

            formData.append('name',userData.name)
            formData.append('phone',userData.phone)
            formData.append('address',JSON.stringify(userData.address))
            formData.append('gender',userData.gender)
            formData.append('dob',userData.dob)

            image && formData.append('image',image)

            const {data}=await axios.post(backendurl + '/api/user/update-profile',formData,{headers:{token}})
            if(data.success){
              toast.success(data.message)
             await loaduserProfileData()
             setedit(false)
             setImage(false)
            }
            else{
              toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

  };

  return (
    userData && (
      <div className="max-w-lg flex flex-col gap-2 text-sm">
        {
          isedit
          ?<label htmlFor="image">
              <div className="inline-block relative cursor-pointer">
                <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className="w-30 absolute bottom-12 right-12"  src={image ? '' :assets.upload_icon } alt="" />
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden/>
          </label>
          :<img className="w-36 rounded" src={userData.image}  alt=""/>
        }
        
        {isedit ? (
          <input
            className="bg-gray-100 text-3xl font-medium max-w-60 mt-4"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p className="font-medium text-3xl text-neutral-800 mt-4">
            {userData.name}
          </p>
        )}
        <hr className="bg-zinc-400 h-[1px] border-none" />
        <div>
          <p className="text-neutral-500 underline mt-3">Contact Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3">
            <p className="font-medium">Email id:</p>
            <p className="text-blue-500">{userData.email}</p>
            <p className="font-medium">Phone:</p>
            {isedit ? (
              <input
                className="bg-gray-100 max-w-52"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserdata((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            ) : (
              <p className="text-blue-400">{userData.phone}</p>
            )}
            <p className="font-medium">Address:</p>
            {isedit ? (
              <p>
                <input
                  className="bg-gray-100"
                  onChange={(e) =>
                    setUserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                />
                <br />
                <input
                  className="bg-gray-100"
                  onChange={(e) =>
                    setUserdata((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                />
                <br />
              </p>
            ) : (
              <p className="text-gray-500 ">
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
            )}
          </div>
        </div>
        <div>
          <p className="text-neutral-500 underline mt-3">Basic Information</p>
          <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-2 text-neutral-700">
            <p className="font-medium ">Gender:</p>
            {isedit ? (
              <select
                className="max-w-20 bg-gray-100"
                onChange={(e) =>
                  setUserdata((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-600">{userData.gender}</p>
            )}
            <p className="font-medium">Birthday:</p>
            {isedit ? (
              <input
                className="max-w-28 bg-gray-100"
                onChange={(e) =>
                  setUserdata((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                type="date"
              />
            ) : (
              <p className="text-gray-600">{userData.dob}</p>
            )}
          </div>
        </div>
        <div className="mt-10">
          {isedit ? (
            <button
              className="border border-violet-500 px-8 py-2 rounded-full hover:bg-violet-500 hover:text-white transition-all"
              onClick={updateuserprofiledata}
            >
              Save Information
            </button>
          ) : (
            <button
              className="border border-violet-500 px-8 py-2 rounded-full hover:bg-violet-500 hover:text-white transition-all"
              onClick={() => setedit(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default Profile;