  import React, { useContext } from "react";
  import { assets } from "../../assets/assets";
  import { useState } from "react";
  import { Admincontext } from "../../context/Admincontext";
  import {toast} from 'react-toastify'
  import axios from 'axios'

  const AddDoctor = () => {
    const [docImg, setDocImg] = useState(false);
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [experience, setexperience] = useState("1 Year");
    const [fees, setfees] = useState("");
    const [about, setabout] = useState("");
    const [speciality, setspeciality] = useState("General physician");
    const [degree, setdegree] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");

    const {backendurl,aToken}=useContext(Admincontext)

    const onSubmitHandler = async (event) => {
  event.preventDefault();

  try {
    if (!docImg) {
      return toast.error("Image not selected");
    }
    if (!about) {
      return toast.error("Please write about the doctor");
    }
    if (!degree) {
      return toast.error("Please fill the education degree");
    }
    if (!fees) {
      return toast.error("Please enter fees");
    }
    // similarly add validation for other required fields if you want

    const formData = new FormData();
    formData.append("image", docImg);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("experience", experience);
    formData.append("fees", Number(fees));
    formData.append("speciality", speciality);
    formData.append("degree", degree);
    formData.append("about", about);
    formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));

    // Add the missing date field here:
    formData.append("date", Date.now());

    // Debug logs
    formData.forEach((value, key) => {
      console.log(`${key} : ${value}`);
    });

    const { data } = await axios.post(
      backendurl + "/api/admin/add-doctor",
      formData,
      { headers: { admintoken: aToken } }
    );
    if (data.success) {
      toast.success(data.message);
      setDocImg(false)
      setname('')
      setemail('')
      setpassword('')
      setaddress1('')
      setaddress2('')
      setdegree('')
      setabout('')
      setfees('')
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
    console.error(error);
  }
};



    return (
      <form onSubmit={onSubmitHandler} className="m-5 w-full ">
        <p className="mb-3 text-lg font-medium ">Add Doctor</p>
        <div className="bg-white px-8 py-8 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
          <div className="flex items-center gap-4 mb-8 text-gray-500">
            <label htmlFor="doc-img">
              <img
                className="w-16 bg-gray-100 rounded-full cursor-pointer"
                src={ docImg? URL.createObjectURL(docImg) : assets.upload_area}
                alt=""
              />
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <p>
              upload doctor
              <br /> photo
            </p>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Your Name</p>
                <input onChange={(e)=>setname(e.target.value)}
                  value={name}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="text"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>doctor Email</p>
                <input onChange={(e)=>setemail(e.target.value)}
                  value={email}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>doctor Password</p>
                <input onChange={(e)=>setpassword(e.target.value)}
                  value={password}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Experience</p>
                <select onChange={(e)=>setexperience(e.target.value)} value={experience} className="border bg-violet-100 rounded px-3 py-2">
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Years</option>
                  <option value="3 Year">3 Years</option>
                  <option value="4 Year">4 Years</option>
                  <option value="5 Year">5 Years</option>
                  <option value="6 Year">6 Years</option>
                  <option value="7 Year">7 Years</option>
                  <option value="8 Year">8 Years</option>
                </select>
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Fees</p>
                <input onChange={(e)=>setfees(e.target.value)}
                  value={fees}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="number"
                  placeholder="Fees"
                  required
                />
              </div>
            </div>
            <div className="w-full lg:flex-1 flex flex-col gap-4">
              <div className="flex-1  flex flex-col gap-1 ">
                <p>Speciality</p>
                <select  onChange={(e)=>setspeciality(e.target.value)}
                  value={speciality}
                  className="border bg-violet-100 rounded px-3 py-2"
                  name=""
                  id=""
                >
                  <option value="General physician">General physician</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className="flex-1  flex flex-col gap-1 ">
                <p>Education</p>
                <input onChange={(e)=>setdegree(e.target.value)}
                  value={degree}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="text"
                  placeholder="Education"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1 ">
                <p>Address</p>
                <input
                onChange={(e)=>setaddress1(e.target.value)}
                  value={address1}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="text"
                  placeholder="Address 1"
                  required
                />
                <input
                onChange={(e)=>setaddress2(e.target.value)}
                  value={address2}
                  className="border bg-violet-100 rounded px-3 py-2"
                  type="text"
                  placeholder="Address 2"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <p className="mt-4 mb-2">About</p>
            <textarea
            onChange={(e)=>setabout(e.target.value)}
                  value={about}
              className="w-full px-4 pt-2  border border-radius rounded"
              type="text"
              placeholder="Write about doctor"
              rows={5}
            />
          </div>
          <button type="submit" className="bg-violet-400 py-3 px-10 mt-4  rounded text-white ">
            Add Doctor
          </button>
        </div>
      </form>
    );
  };

  export default AddDoctor;
