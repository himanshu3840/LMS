
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaEdit } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { serverUrl } from '../../app';
import { ClipLoader } from 'react-spinners';
import { useDispatch, useSelector } from 'react-redux';
import { setLectureData } from '../../redux/lectureSlice';

function CreateLecture() {
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [lectureTitle , setLectureTitle] = useState("")
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const {lectureData} = useSelector(state=>state.lecture)


    const createLectureHandler = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/createlecture/${courseId}` ,{lectureTitle} , {withCredentials:true})
        console.log(result.data)
      dispatch(setLectureData([...lectureData,result.data.lecture]))
        toast.success("Lecture Created")
        setLoading(false)
        setLectureTitle("")
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    useEffect(()=>{
      const getLecture = async () => {
        try {
          const result = await axios.get(serverUrl + `/api/course/getcourselecture/${courseId}`,{withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData(result.data.lectures))



        } catch (error) {
           console.log(error)
        toast.error(error.response.data.message)

        }

      }
      getLecture()
    },[])



  return (
     <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[130px]" />

      <div className="relative z-10 bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] rounded-xl w-full max-w-2xl p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-white mb-1">Let’s Add a Lecture</h1>
          <p className="text-sm text-slate-400">Enter the title and add your video lectures to enhance your course content.</p>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="e.g. Introduction to Mern Stack"
          className="w-full bg-white/5 border border-white/10 rounded-md p-3 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 transition-all mb-4"
          onChange={(e)=>setLectureTitle(e.target.value)}
          value={lectureTitle}
        />

        {/* Buttons */}
        <div className="flex gap-4 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 text-sm font-medium transition-colors" onClick={()=>navigate(`/addcourses/${courseId}`)
          }>
            <FaArrowLeft /> Back to Course
          </button>
          <button className="px-5 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white transition-all text-sm font-medium shadow-lg shadow-purple-600/20 hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.8)]" disabled={loading} onClick={createLectureHandler}>
           {loading?<ClipLoader size={30} color='white'/>: "+ Create Lecture"}
          </button>
        </div>

        {/* Lecture List */}
         <div className="space-y-2">
          {lectureData.map((lecture, index) => (
            <div key={index} className="bg-white/[0.03] border border-white/10 rounded-md flex justify-between items-center p-3 text-sm font-medium text-slate-200">
              <span>Lecture - {index + 1}: {lecture.lectureTitle}</span>
              <FaEdit className="text-slate-400 hover:text-cyan-400 cursor-pointer transition-colors"  onClick={()=>navigate(`/editlecture/${courseId}/${lecture._id}`)}/>
            </div>
          ))}
        </div>
      </div>
    </div>

  )
}

export default CreateLecture
