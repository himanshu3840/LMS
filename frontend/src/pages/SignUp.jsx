import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { FaGraduationCap, FaChalkboardTeacher } from "react-icons/fa"
import { HiArrowRight } from "react-icons/hi2"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("student")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSignUp = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/signup",
        { name, email, password, role },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Account created successfully")
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message || "Sign up failed")
    }
  }

  const googleSignUp = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Account created successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Google sign up failed")
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -right-24 w-[420px] h-[420px] bg-indigo-600/20 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-[380px] h-[380px] bg-purple-500/20 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.12),_transparent_60%)]" />

      <div className="relative z-10 max-w-4xl w-full bg-white/[0.04] backdrop-blur-xl rounded-3xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px] border border-white/10">

        {/* Left Form Section */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Mobile-only brand row */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
              <img src={logo} alt="VirtualCourses" className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10" />
              <span className="text-sm font-bold tracking-tight text-white">
                SKILL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">GRID</span>
              </span>
            </div>

            <div className="mb-7">
              <span className="inline-block text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2">
                Join the cohort
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Let's get started
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Create an account to start your learning journey.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSignUp}>
              {/* Name Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="name">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 text-white placeholder:text-slate-500 text-sm transition-all outline-none"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 text-white placeholder:text-slate-500 text-sm transition-all outline-none"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={show ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    className="w-full pl-4 pr-11 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 text-white placeholder:text-slate-500 text-sm transition-all outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 p-1 cursor-pointer transition-colors"
                  >
                    {show ? <MdRemoveRedEye className="w-5 h-5" /> : <MdOutlineRemoveRedEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  I'm joining as
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 border border-white/10 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setRole("student")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      role === "student"
                        ? "bg-gradient-to-r from-purple-600/30 to-indigo-600/30 text-white shadow-sm ring-1 ring-purple-400/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <FaGraduationCap className={`w-4 h-4 ${role === "student" ? "text-purple-300" : "text-slate-500"}`} />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("educator")}
                    className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      role === "educator"
                        ? "bg-gradient-to-r from-cyan-600/30 to-indigo-600/30 text-white shadow-sm ring-1 ring-cyan-400/40"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <FaChalkboardTeacher className={`w-4 h-4 ${role === "educator" ? "text-cyan-300" : "text-slate-500"}`} />
                    Educator
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group inline-flex items-center justify-center gap-2 min-h-[48px] mt-2 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <ClipLoader size={22} color="white" />
                ) : (
                  <>
                    Create account
                    <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#0B0F19] px-3 text-slate-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up Button */}
            <button
              type="button"
              onClick={googleSignUp}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <img src={google} alt="Google logo" className="w-5 h-5 object-contain rounded-full bg-white p-0.5" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Switch to Login */}
          <p className="text-center text-xs text-slate-500 mt-5">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-bold text-white hover:text-cyan-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Log in
            </button>
          </p>
        </div>

        {/* Right Branding Panel — course discovery signature */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 overflow-hidden bg-gradient-to-br from-[#140b2e] via-[#1a1033] to-[#0B0F19]">
          {/* dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top: logo */}
          <div className="relative z-10 flex items-center gap-2">
            <img src={logo} alt="VirtualCourses" className="w-9 h-9 rounded-lg object-cover ring-2 ring-white/10" />
            <span className="text-sm font-bold tracking-tight text-white">
              SKILL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">GRID</span>
            </span>
          </div>

          {/* Middle: floating course-path signature */}
          <div className="relative z-10 flex-1 flex items-center justify-center my-8">
            <svg viewBox="0 0 260 200" className="w-full max-w-[240px] overflow-visible">
              <path
                d="M 30 150 Q 90 60 130 100 T 220 40"
                fill="none"
                stroke="#ffffff"
                strokeOpacity="0.2"
                strokeWidth="2"
                strokeDasharray="4 6"
                strokeLinecap="round"
              />
              <circle cx="30" cy="150" r="4" fill="#A855F7" />
              <circle cx="130" cy="100" r="4" fill="#06B6D4" />
              <circle cx="220" cy="40" r="4" fill="#6366F1" />
            </svg>

            <div className="absolute left-0 bottom-8 -rotate-3">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                <span className="text-[11px] font-semibold text-white/90">UX Design</span>
              </div>
            </div>
            <div className="absolute left-[42%] top-[42%] rotate-2">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-[11px] font-semibold text-white/90">Data Science</span>
              </div>
            </div>
            <div className="absolute right-0 top-0 -rotate-2">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span className="text-[11px] font-semibold text-white/90">Public Speaking</span>
              </div>
            </div>
          </div>

          {/* Bottom: headline */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Learn without limits.
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
              Build modern skills and advance your career with courses designed by working practitioners.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp
