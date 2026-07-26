
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ClipLoader } from 'react-spinners'
import { serverUrl } from '../app'
import { toast } from 'react-toastify'
import { FaArrowLeftLong } from "react-icons/fa6"
import { HiOutlineKey, HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi"

function ForgotPassword() {
  let navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [newpassword, setNewPassword] = useState("")
  const [conPassword, setConpassword] = useState("")

  const handleStep1 = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
      console.log(result)
      setStep(2)
      toast.success(result.data.message)
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Failed to send OTP")
      setLoading(false)
    }
  }

  const handleStep2 = async (e) => {
    e?.preventDefault()
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      setStep(3)
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Invalid OTP")
      setLoading(false)
    }
  }

  const handleStep3 = async (e) => {
    e?.preventDefault()
    if (newpassword !== conPassword) {
      return toast.error("Passwords do not match")
    }
    setLoading(true)
    try {
      const result = await axios.post(`${serverUrl}/api/auth/resetpassword`, { email, password: newpassword }, { withCredentials: true })
      console.log(result)
      toast.success(result.data.message)
      setLoading(false)
      navigate("/login")
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message || "Password reset failed")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full  bg-[#0B0F19] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      
      {/* Progress Step Indicator */}
      <div className="max-w-md w-full space-y-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-indigo-600" : "bg-slate-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? "bg-indigo-600" : "bg-slate-200"}`}></div>
          <div className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? "bg-indigo-600" : "bg-slate-200"}`}></div>
        </div>

        {/* Step 1: Send OTP */}
        {step === 1 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <HiOutlineMail className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Forgot Password?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your email address and we'll send you an OTP code to reset your password.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleStep1}>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 text-sm transition-all outline-none"
                  placeholder="you@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center min-h-[48px] py-3 px-6 bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? <ClipLoader size={22} color="white" /> : "Send OTP"}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <FaArrowLeftLong className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <HiOutlineKey className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Enter Verification Code
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Please enter the OTP code sent to <span className="font-semibold text-slate-700">{email}</span>.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleStep2}>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  4-Digit OTP
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 text-center tracking-widest font-bold text-lg rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 transition-all outline-none"
                  placeholder="• • • •"
                  onChange={(e) => setOtp(e.target.value)}
                  value={otp}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center min-h-[48px] py-3 px-6 bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? <ClipLoader size={22} color="white" /> : "Verify OTP"}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs sm:text-sm">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Change Email
              </button>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-1.5 font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <FaArrowLeftLong className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Reset Password */}
        {step === 3 && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <HiOutlineLockClosed className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Reset Password
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Create a strong new password for your account.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleStep3}>
              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 text-sm transition-all outline-none"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newpassword}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-800 text-sm transition-all outline-none"
                  onChange={(e) => setConpassword(e.target.value)}
                  value={conPassword}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center min-h-[48px] py-3 px-6 bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-sm rounded-xl shadow-md transition-all duration-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? <ClipLoader size={22} color="white" /> : "Reset Password"}
              </button>
            </form>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer"
              >
                <FaArrowLeftLong className="w-3.5 h-3.5" />
                <span>Back to Login</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default ForgotPassword
