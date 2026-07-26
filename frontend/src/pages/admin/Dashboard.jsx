import React from 'react'
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import img from "../../assets/empty.jpg"; // fallback photo
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
function Dashboard() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user);
  const { creatorCourseData } = useSelector((state) => state.course);
  // update based on your store

  // Sample data - Replace with real API/course data
  const courseProgressData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    lectures: course.lectures.length || 0
  })) || [];

  const enrollData = creatorCourseData?.map(course => ({
    name: course.title.slice(0, 10) + "...",
    enrolled: course.enrolledStudents?.length || 0
  })) || [];

  const totalEarnings = creatorCourseData?.reduce((sum, course) => {
    const studentCount = course.enrolledStudents?.length || 0;
    const courseRevenue = course.price ? course.price * studentCount : 0;
    return sum + courseRevenue;
  }, 0) || 0;

  return (
    <div className="flex min-h-screen bg-[#0B0F19] relative overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px]" />

      <FaArrowLeftLong className='w-[22px] absolute top-[10%]
      left-[10%] h-[22px] cursor-pointer text-slate-300 hover:text-cyan-400 transition-colors z-20' onClick={() => navigate("/")} />

      <div className="relative z-10 w-full px-6 py-10 space-y-10">
        {/* Welcome Section */}
        <div className="max-w-5xl mx-auto bg-white/[0.04] backdrop-blur-xl rounded-xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] border border-white/10 p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src={userData?.photoUrl || img}
            alt="Educator"
            className="w-28 h-28 rounded-full object-cover ring-4 ring-purple-500/25 shadow-md"
          />
          <div className="text-center md:text-left space-y-1">
            <h1 className="text-2xl font-bold text-white">
              Welcome, {userData?.name || "Educator"} 👋
            </h1>
            <h1 className='text-xl font-semibold text-slate-200'>Total Earning : <span className='font-light bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent'>₹{totalEarnings.toLocaleString()}</span>  </h1>
            <p className="text-slate-400 text-sm">
              {userData?.description || "Start creating amazing courses for your students!"}
            </p>
            <h1 className='px-[10px] text-center py-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-[10px] text-[15px] font-light flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20 hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.8)] transition-all duration-300' onClick={() => navigate("/courses")}>Create Courses</h1>
          </div>
        </div>

        {/* Graphs Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Course Progress Chart */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-lg shadow-sm border border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Course Progress (Lectures)</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={courseProgressData}>
                <defs>
                  <linearGradient id="purpleBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#140b2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#c4b5fd" }}
                  cursor={{ fill: "rgba(124,58,237,0.08)" }}
                />
                <Bar dataKey="lectures" fill="url(#purpleBar)" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Enrolled Students Chart */}
          <div className="bg-white/[0.04] backdrop-blur-xl rounded-lg shadow-sm border border-white/10 p-6">
            <h2 className="text-lg font-semibold mb-4 text-white">Student Enrollment</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={enrollData}>
                <defs>
                  <linearGradient id="cyanBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" />
                    <stop offset="100%" stopColor="#6366F1" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#140b2e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#fff" }}
                  itemStyle={{ color: "#67e8f9" }}
                  cursor={{ fill: "rgba(6,182,212,0.08)" }}
                />
                <Bar dataKey="enrolled" fill="url(#cyanBar)" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
