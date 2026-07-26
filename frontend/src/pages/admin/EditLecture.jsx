
import axios from 'axios'
import React, { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { serverUrl } from '../../App'
import { setLectureData } from '../../redux/lectureSlice'
import { toast } from 'react-toastify'
import { ClipLoader } from 'react-spinners'
function EditLecture() {
    const [loading,setLoading]= useState(false)
    const [loading1,setLoading1]= useState(false)
    const {courseId , lectureId} = useParams()
    const {lectureData} = useSelector(state=>state.lecture)
    const dispatch = useDispatch()
    const selectedLecture = lectureData.find(lecture => lecture._id === lectureId)
    const [videoUrl,setVideoUrl] = useState(null)
    const [lectureTitle,setLectureTitle] = useState(selectedLecture.lectureTitle)
    const [isPreviewFree,setIsPreviewFree] = useState(false)

    const formData = new FormData()
    formData.append("lectureTitle",lectureTitle)
    formData.append("videoUrl",videoUrl)
    formData.append("isPreviewFree",isPreviewFree)


    const editLecture = async () => {
      setLoading(true)
      try {
        const result = await axios.post(serverUrl + `/api/course/editlecture/${lectureId}` , formData , {withCredentials:true})
        console.log(result.data)
        dispatch(setLectureData([...lectureData,result.data]))
        toast.success("Lecture Updated")
        navigate("/courses")
        setLoading(false)
      } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
        setLoading(false)
      }
    }

    const removeLecture = async () => {
      setLoading1(true)
      try {
        const result = await axios.delete(serverUrl + `/api/course/removelecture/${lectureId}` , {withCredentials:true})
        console.log(result.data)
        toast.success("Lecture Removed")
       navigate(`/createlecture/${courseId}`)
        setLoading1(false)
      } catch (error) {
        console.log(error)
        toast.error("Lecture remove error")
        setLoading1(false)
      }

    }






   



    const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/15 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/15 rounded-full blur-[130px]" />

      <div className="relative z-10 w-full max-w-xl bg-white/[0.04] backdrop-blur-xl border border-white/10 shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] rounded-xl p-6 space-y-6">

        {/* Header Inside Box */}
        <div className="flex items-center gap-2 mb-2">
          <FaArrowLeft className="text-slate-300 hover:text-cyan-400 cursor-pointer transition-colors" onClick={()=>navigate(`/createlecture/${courseId}`)} />
          <h2 className="text-xl font-semibold text-white">Update Your Lecture</h2>
        </div>

        {/* Instruction */}
        <div>

          <button className="mt-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-md transition-all text-sm" disabled={loading1} onClick={removeLecture}>
            {loading1?<ClipLoader size={30} color='white'/>:"Remove Lecture"}
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-3 bg-white/5 border border-white/10 rounded-md text-sm text-white placeholder:text-slate-500 focus:ring-2 focus:ring-purple-500/40 focus:border-purple-400/60 focus:outline-none transition-all"
              placeholder={selectedLecture.lectureTitle}
              onChange={(e)=>setLectureTitle(e.target.value)}
              value={lectureTitle}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Video *</label>
            <input
              type="file"
              required
              accept='video/*'
              className="w-full bg-white/5 border border-white/10 rounded-md p-2 text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-gradient-to-r file:from-purple-600 file:to-indigo-600 file:text-white hover:file:from-purple-500 hover:file:to-cyan-500 file:transition-all file:cursor-pointer"
              onChange={(e)=>setVideoUrl(e.target.files[0])}
            />
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"

              className="accent-purple-500 h-4 w-4"

              onChange={() => setIsPreviewFree(prev=>!prev)}
            />
            <label htmlFor="isFree" className="text-sm text-slate-300">Is this video FREE</label>
          </div>
        </div>
         <div>
          {loading ?<p className="text-cyan-400 text-sm">Uploading video... Please wait.</p>:""}
         </div>
        {/* Submit Button */}
        <div className="pt-4">
          <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white py-3 rounded-md text-sm font-medium shadow-lg shadow-purple-600/20 hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.8)] transition-all duration-300" disabled={loading} onClick={editLecture}>
            {loading?<ClipLoader size={30} color='white'/> :"Update Lecture"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditLecture
