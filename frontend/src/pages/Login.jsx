
import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md"
import { HiArrowRight } from "react-icons/hi2"
import { SiPython, SiReact, SiFigma, SiTensorflow } from "react-icons/si"
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      setLoading(false)
      toast.success("Logged in successfully")
    } catch (error) {
      console.log(error)
      setLoading(false)
      toast.error(error.response?.data?.message || "Login failed")
    }
  }

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, provider)
      const user = response.user
      const name = user.displayName
      const email = user.email
      const role = ""

      const result = await axios.post(
        serverUrl + "/api/auth/googlesignup",
        { name, email, role },
        { withCredentials: true }
      )
      dispatch(setUserData(result.data))
      navigate("/")
      toast.success("Logged in successfully")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Google sign in failed")
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[380px] h-[380px] bg-cyan-500/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.12),_transparent_60%)]" />

      <div className="relative z-10 max-w-4xl w-full bg-white/[0.04] backdrop-blur-xl rounded-3xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[590px] border border-white/10">

        {/* Left Form Section */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Mobile-only brand row */}
            <div className="flex items-center gap-2 mb-6 md:hidden">
              <img src={logo} alt="VirtualCourses" className="w-8 h-8 rounded-lg object-cover ring-1 ring-white/10" />
              <span className="text-sm font-bold tracking-tight text-white">
                VIRTUAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">COURSES</span>
              </span>
            </div>

            <div className="mb-8">
              <span className="inline-block text-[11px] font-bold tracking-widest text-cyan-400 uppercase mb-2">
                Pick up where you left off
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                Log in to access your courses and track your progress.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-slate-300" htmlFor="password">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate("/forgotpassword")}
                    className="text-xs font-semibold text-cyan-400 hover:text-purple-400 transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
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

              {/* Login Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group inline-flex items-center justify-center gap-2 min-h-[48px] py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <ClipLoader size={22} color="white" />
                ) : (
                  <>
                    Login
                    <HiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-transparent px-3 text-slate-500 font-medium" style={{ backgroundColor: "transparent" }}>
                  <span className="bg-[#0B0F19] px-1">Or continue with</span>
                </span>
              </div>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              onClick={googleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-slate-200 font-semibold text-sm transition-all cursor-pointer"
            >
              <img src={google} alt="Google logo" className="w-5 h-5 object-contain rounded-full bg-white p-0.5" />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Switch to Sign Up */}
          <p className="text-center text-xs text-slate-500 mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="font-bold text-white hover:text-cyan-400 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>

        {/* Right Branding Panel — progress signature */}
        <div className="md:col-span-5 relative hidden md:flex flex-col justify-between p-8 overflow-hidden bg-gradient-to-br from-[#140b2e] via-[#1a1033] to-[#0B0F19]">
          {/* dot grid texture */}
          <div
            className="absolute inset-0 opacity-[0.08] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#FFFFFF 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-16 w-56 h-56 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top: logo */}
          <div className="relative z-10 flex items-center gap-2">
            <img src={logo} alt="VirtualCourses" className="w-9 h-9 rounded-lg object-cover ring-2 ring-white/10" />
            <span className="text-sm font-bold tracking-tight text-white">
              VIRTUAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">COURSES</span>
            </span>
          </div>

          {/* Middle: tech course logo cluster signature */}
          <div className="relative z-10 flex-1 flex items-center justify-center my-8">
            <div className="relative w-full max-w-[220px] h-[180px]">
              <div className="absolute left-2 top-2 -rotate-6 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <SiPython className="w-7 h-7 text-cyan-300" />
              </div>
              <div className="absolute right-0 top-10 rotate-3 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <SiReact className="w-7 h-7 text-cyan-400" />
              </div>
              <div className="absolute left-10 bottom-6 rotate-3 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <SiFigma className="w-7 h-7 text-fuchsia-400" />
              </div>
              <div className="absolute right-6 bottom-0 -rotate-3 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 flex items-center justify-center shadow-lg shadow-purple-900/30">
                <SiTensorflow className="w-7 h-7 text-indigo-400" />
              </div>
            </div>
          </div>

          {/* Bottom: headline */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white tracking-tight leading-snug">
              Your progress kept the pace.
            </h2>
            <p className="text-xs text-slate-400 mt-2 max-w-xs leading-relaxed">
              Every lesson picks up exactly where you left it — log in and get back to it.
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login
