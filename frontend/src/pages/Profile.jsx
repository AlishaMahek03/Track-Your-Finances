import React, { useState } from 'react'
import Sidepanel from '../components/Sidepanel'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    password: '********'
  });
  const [profileImage, setProfileImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      
    }
  };

  const handleSave = () => {
    // Add your save logic here
    console.log('Saving profile data:', profileData);
  };

  return (
    <div className='flex flex-row h-screen w-screen'>
      <Sidepanel/>
      <div className="flex flex-col overflow-x-hidden w-screen h-full bg-slate-900 ">
        <div className="flex flex-row justify-between mb-5 h-15 w-full p-5 ">
          <h1 className="text-5xl font-medium font-sans text-white">
            Profile
          </h1>
        </div>

        <div className="flex flex-col items-center gap-3 h-[80%] m-10  p-8  border-2 border-white rounded-lg bg-slate-900">
          <div className="relative w-65 flex flex-col items-center gap-5">
            <img 
              src={profileImage } 
              alt='Profile'
              className="w-32 h-32 m-2 bg-white text-center p-5 pt-15 rounded-full object-cover"
            />
            <input 
              type="file" 
              onChange={handleImageUpload}
              className=" bg-white text-black text-base font-bold p-3  w-full cursor-pointer"
              accept="image/*"
            />
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="space-y-2">
              <label className="text-white">Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white">Email</label>
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white">Password</label>
              <input
                type="password"
                name="password"
                value={profileData.password}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-slate-800 text-white"
              />
            </div>

            <button
              onClick={handleSave}
              className="w-full p-2 mt-6 bg-[#6366F1] text-white rounded hover:bg-[#4F46E5]"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
