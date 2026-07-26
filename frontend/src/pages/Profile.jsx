
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

function Profile() {
  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0B0F19] px-4 py-10 flex items-center justify-center relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[130px]" />

      <div className="relative z-10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] border border-white/10 rounded-2xl p-8 max-w-xl w-full">
        <FaArrowLeftLong className='absolute top-[8%] left-[5%] w-[22px] h-[22px] cursor-pointer text-slate-300 hover:text-cyan-400 transition-colors' onClick={()=>navigate("/")}/>
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          {userData.photoUrl ? <img
            src={userData?.photoUrl}
            alt=""
            className="w-24 h-24 rounded-full object-cover ring-4 ring-purple-500/30"
          /> : <div className='w-24 h-24 rounded-full text-white flex items-center justify-center text-[30px] ring-4 ring-purple-500/30 bg-gradient-to-br from-purple-600 to-indigo-600 shadow-md shadow-purple-600/30 cursor-pointer'>
         {userData?.name.slice(0,1).toUpperCase()}
          </div>}
          <h2 className="text-2xl font-bold mt-4 text-white">{userData.name}</h2>
          <p className="text-sm text-cyan-400 font-medium">{userData.role}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-4">
          <div className="text-sm">
            <span className="font-bold text-slate-400">Email: </span>
            <span className='text-slate-200'>{userData.email}</span>
          </div>

          <div className="text-sm">
            <span className="font-bold text-slate-400">Bio: </span>
            <span className='text-slate-200'>{userData.description}</span>
          </div>



          <div className="text-sm">
            <span className="font-bold text-slate-400">Enrolled Courses: </span>
            <span className='text-slate-200'>{userData.enrolledCourses.length}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-center gap-4">
          <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-base rounded-full shadow-lg shadow-purple-600/30 hover:shadow-[0_0_30px_-4px_rgba(124,58,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer group" onClick={()=>navigate("/editprofile")}>
            Edit Profile
          </button>

        </div>
      </div>
    </div>
  )
}

export default Profile
