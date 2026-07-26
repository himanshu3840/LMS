
import React, { useEffect, useState } from 'react'
import Card from "./Card.jsx"
import { useSelector } from 'react-redux';
import { SiViaplay } from "react-icons/si";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function Cardspage() {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    if (courseData && Array.isArray(courseData)) {
      setPopularCourses(courseData.slice(0, 6));
    }
  }, [courseData]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0B0F19] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute top-1/4 -left-24 w-[380px] h-[380px] bg-indigo-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-purple-500/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></span>
            Top Rated
            <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Our Popular <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Courses</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Explore top-rated courses designed to boost your skills, enhance careers, and unlock opportunities in tech, AI, business, and beyond.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-12 justify-items-center">
          {popularCourses.map((item, index) => (
            <Card
              key={item._id || index}
              id={item._id}
              thumbnail={item.thumbnail}
              title={item.title}
              price={item.price}
              category={item.category}
              reviews={item.reviews}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center w-full pt-4">
          <button
            onClick={() => navigate("/allcourses")}
            className="group inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-base sm:text-lg rounded-full shadow-lg shadow-purple-600/20 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] transition-all duration-300 ease-out transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <span>View All Courses</span>
            <HiArrowLongRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>

      </div>
    </section>
  )
}

export default Cardspage;
