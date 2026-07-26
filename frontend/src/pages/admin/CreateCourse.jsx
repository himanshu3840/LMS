import axios from "axios";
import React, { useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../../App";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
const CreateCourse = () => {
    let navigate = useNavigate()
    let [loading,setLoading]=useState(false)
    const [title,setTitle] = useState("")
    const [category,setCategory] = useState("")

    const CreateCourseHandler = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/course/create" , {title , category} , {withCredentials:true})
            console.log(result.data)
            toast.success("Course Created")
            navigate("/courses")
            setTitle("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response.data.message)
        }

    }

    return (

        <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 py-10 relative overflow-hidden">

            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/15 rounded-full blur-[130px]" />
            <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[130px]" />

            <div className="relative z-10 max-w-xl w-[600px] mx-auto p-6 bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] rounded-md mt-10">
                <FaArrowLeftLong  className='top-[8%] absolute left-[5%] w-[22px] h-[22px] cursor-pointer text-slate-300 hover:text-cyan-400 transition-colors' onClick={()=>navigate("/courses")}/>
                <h2 className="text-2xl font-semibold mb-6 text-center text-white">Create Course</h2>

                <form className="space-y-5" onSubmit={(e)=>e.preventDefault()}>
                    {/* Course Title */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Course Title
                        </label>
                        <input
                            type="text"
                            placeholder="Enter course title"
                            className="w-full bg-white/5 border border-white/10 rounded-md px-4 py-2 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 transition-all"
                            onChange={(e)=>setTitle(e.target.value)} value={title}
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Category
                        </label>
                        <select
                            className="w-full bg-[#141a2b] border border-white/10 rounded-md px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 transition-all"
                            onChange={(e)=>setCategory(e.target.value)}
                        >
                            <option value="">Select category</option>
                            <option value="App Development">App Development</option>
                             <option value="AI/ML">AI/ML</option>
                            <option value="AI Tools">AI Tools
                            </option>
                             <option value="Data Science">Data Science</option>
                            <option value="Data Analytics">Data Analytics</option>
                            <option value="Ethical Hacking">Ethical Hacking</option>
                            <option value="UI UX Designing">UI UX Designing</option>
                            <option value="Web Development">Web Development</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white py-2 px-4 rounded-md shadow-lg shadow-purple-600/20 hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.8)] transition-all duration-300" disabled={loading} onClick={CreateCourseHandler}
                    >
                        {loading?<ClipLoader size={30} color='white' /> : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCourse;
