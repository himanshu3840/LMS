
import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { serverUrl } from '../app'
import { setUserData } from '../redux/userSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6"
import { HiOutlineCamera } from "react-icons/hi2"

function EditProfile() {
    let { userData } = useSelector(state => state.user)
    let [name, setName] = useState(userData?.name || "")
    let [description, setDescription] = useState(userData?.description || "")
    let [photoUrl, setPhotoUrl] = useState(null)
    let [previewUrl, setPreviewUrl] = useState(null)
    let dispatch = useDispatch()
    let [loading, setLoading] = useState(false)
    let navigate = useNavigate()

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setPhotoUrl(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const updateProfile = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        if (photoUrl) {
            formData.append("photoUrl", photoUrl)
        }

        try {
            const result = await axios.post(serverUrl + "/api/user/updateprofile", formData, { withCredentials: true })
            console.log(result.data)
            dispatch(setUserData(result.data))
            navigate("/")
            setLoading(false)
            toast.success("Profile Updated Successfully")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Profile Update Error")
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full bg-[#0B0F19] flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">

            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/15 rounded-full blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[130px]" />

            <div className="relative z-10 max-w-xl w-full bg-white/[0.04] backdrop-blur-xl rounded-2xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] border border-white/10 p-6 sm:p-8 space-y-6">

                {/* Header */}
                <div className="flex items-center gap-4 border-b border-white/10 pb-5">
                    <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer"
                        aria-label="Back to profile"
                    >
                        <FaArrowLeftLong className="w-5 h-5" />
                    </button>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Edit Profile</h2>
                        <p className="text-xs sm:text-sm text-slate-400">Update your account information and avatar</p>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                    {/* Avatar Upload Preview Section */}
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="relative group w-24 h-24 sm:w-28 sm:h-28">
                            {previewUrl || userData?.photoUrl ? (
                                <img
                                    src={previewUrl || userData?.photoUrl}
                                    alt="Profile Avatar"
                                    className="w-full h-full rounded-full object-cover ring-4 ring-purple-500/25 group-hover:ring-cyan-400 transition-all shadow-md"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold text-3xl flex items-center justify-center ring-4 ring-purple-500/25 shadow-md shadow-purple-600/30">
                                    {userData?.name?.slice(0, 1).toUpperCase()}
                                </div>
                            )}

                            {/* Camera overlay button */}
                            <label className="absolute inset-0 bg-[#0B0F19]/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer">
                                <HiOutlineCamera className="w-6 h-6" />
                                <span className="text-[10px] font-semibold mt-0.5">Change</span>
                                <input
                                    type="file"
                                    name="photoUrl"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handlePhotoChange}
                                />
                            </label>
                        </div>

                        <label className="text-xs font-semibold text-cyan-400 hover:text-purple-400 cursor-pointer transition-colors">
                            <span>Click to upload new avatar</span>
                            <input
                                type="file"
                                name="photoUrl"
                                accept="image/*"
                                className="hidden"
                                onChange={handlePhotoChange}
                            />
                        </label>
                    </div>

                    {/* Full Name */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 text-white placeholder:text-slate-500 text-sm transition-all outline-none"
                            placeholder={userData?.name || "Enter your full name"}
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    {/* Email (Read-only) */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                        <input
                            type="email"
                            readOnly
                            className="w-full px-4 py-3 rounded-xl bg-white/[0.02] border border-white/10 text-slate-500 text-sm cursor-not-allowed outline-none"
                            value={userData?.email || ""}
                            placeholder="Email address"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">About / Description</label>
                        <textarea
                            name="description"
                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 text-white placeholder:text-slate-500 text-sm h-28 resize-y transition-all outline-none leading-relaxed"
                            rows={3}
                            placeholder="Tell us a bit about yourself..."
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </div>

                    {/* Save Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        onClick={updateProfile}
                        className="w-full inline-flex items-center justify-center min-h-[48px] py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-purple-600/20 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] transition-all duration-200 cursor-pointer disabled:opacity-50"
                    >
                        {loading ? <ClipLoader size={22} color="white" /> : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default EditProfile
