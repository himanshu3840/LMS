import React, { useEffect, useState } from 'react';
import Card from "../components/Card.jsx";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import ai from '../assets/SearchAi.png'
import { useSelector } from 'react-redux';
function AllCourses() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const navigate = useNavigate()
 const [category,setCategory] = useState([])
 const [filterCourses,setFilterCourses] = useState([])
  const {courseData} = useSelector(state=>state.course)



  const toggleCategory = (e) =>{
     if(category.includes(e.target.value)){
       setCategory(prev=> prev.filter(item => item !== e.target.value))
     }else{
      setCategory(prev => [...prev,e.target.value])
     }
  }

  const applyFilter = () =>{
    let courseCopy = courseData.slice();

    if(category.length > 0){
      courseCopy = courseCopy.filter(item => category.includes(item.category))
    }

    setFilterCourses(courseCopy)

  }

   useEffect(()=>{
setFilterCourses(courseData)
  },[courseData])

  useEffect(()=>{
    applyFilter()
  },[category])

  const categoryOptions = [
    'App Development',
    'AI/ML',
    'AI Tools',
    'Data Science',
    'Data Analytics',
    'Ethical Hacking',
    'UI UX Designing',
    'Web Development',
    'Others',
  ]

  return (
    <div className="flex min-h-screen bg-[#0B0F19] relative overflow-hidden">
      <Nav/>

      {/* Ambient glow blobs */}
      <div className="pointer-events-none fixed top-0 left-1/3 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[130px] z-0" />
      <div className="pointer-events-none fixed bottom-0 right-0 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px] z-0" />

      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarVisible(prev => !prev)}
        className="fixed top-20 left-4 z-50 bg-white/10 backdrop-blur-md text-white px-3 py-1.5 rounded-lg md:hidden border border-white/15 text-sm font-medium hover:bg-white/15 transition-colors"
      >
        {isSidebarVisible ? 'Hide' : 'Show'} Filters
      </button>

      {/* Sidebar */}
      <aside className={`w-[260px] h-screen overflow-y-auto bg-white/[0.03] backdrop-blur-xl fixed top-0 left-0 p-6 py-[130px] border-r border-white/10 shadow-2xl transition-transform duration-300 z-40
        ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'}
        md:block md:translate-x-0`}>

        <h2 className="text-xl font-bold flex items-center justify-center gap-2 text-white mb-6">
          <FaArrowLeftLong className='text-cyan-400 hover:text-purple-400 transition-colors cursor-pointer' onClick={()=>navigate("/")}/>
          Filter by Category
        </h2>

        <form className="space-y-4 text-sm bg-white/[0.03] border border-white/10 text-slate-200 p-[20px] rounded-2xl" onSubmit={(e)=>e.preventDefault()}>
          <button
            type="button"
            className='w-full px-[10px] py-[10px] bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white rounded-[10px] text-[15px] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20 hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.8)] transition-all duration-300'
            onClick={()=>navigate("/searchwithai")}
          >
            Search with AI <img src={ai} className='w-[30px] h-[30px] rounded-full' alt="" />
          </button>

          {categoryOptions.map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer hover:text-cyan-400 transition-colors">
              <input
                type="checkbox"
                className="accent-purple-500 w-4 h-4 rounded-md"
                value={option}
                onChange={toggleCategory}
              />
              {option}
            </label>
          ))}
        </form>
      </aside>

      {/* Main Courses Section */}
      <main className="relative z-10 w-full transition-all duration-300 py-[130px] md:pl-[300px] flex items-start justify-center md:justify-start flex-wrap gap-6 px-[10px]">
        {
        filterCourses?.map((item,index)=>(
          <Card key={index} thumbnail={item.thumbnail} title={item.title} price={item.price} category={item.category} id={item._id} reviews={item.reviews} />

        ))
      }
      </main>
    </div>
  );
}

export default AllCourses;
