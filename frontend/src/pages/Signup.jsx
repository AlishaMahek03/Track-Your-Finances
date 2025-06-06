import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import axios from 'axios';
const Signup = () => {

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_BASE_URL+'/userroutes/signup', {
        name: name,
        email: email,
        password: password
      });
      if (response.data.token) {
        alert("Signup Successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate('/home');
      } else {
        alert("Signup Failed: " + response.data.error);
      }
    } catch (error) {
      console.error("There was an error signing up!", error);
    }
  }
  return (
   <div className='bg-[url("https://cdn.dribbble.com/userupload/8426101/file/original-c84d9432f595c87ce92c263b623c8610.png?resize=1024x768&vertical=center")] bg-cover bg-start h-screen flex items-center justify-center'>
      <div className='bg-[#202120] h-[60%] rounded-lg shadow-lg w-96'>
        <h1 className='text-4xl px-3 py-5 text-white text-center font-bold underline decoration-4 underline-offset-8'>Sign Up</h1>
        <form onSubmit={handlesubmit} className='flex flex-col items-center justify-center mt-7 gap-5'>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" placeholder='Full Name' className='w-80 h-10 bg-white rounded-lg px-3 mb-4 text-black' />
          <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="text" placeholder='Username' className='w-80 h-10 bg-white rounded-lg px-3 mb-4 text-black' />
          <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder='Password' className='w-80 h-10 bg-white rounded-lg px-3 mb-4 text-black' />
          <button className='bg-green-600 w-80 h-10 rounded-lg text-white font-bold'>Create An Account</button>
          <p className='text-white mt-4'>Have an account? <Link to={'/'} className='text-[#FF6B6B] font-bold'>Log In</Link></p>
        </form>
      </div>
    </div>
  )
}

export default Signup
