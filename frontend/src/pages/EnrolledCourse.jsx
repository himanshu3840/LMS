
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineBookOpen, HiOutlinePlay } from "react-icons/hi2";

function EnrolledCourse() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] font-sans text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Top Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-purple-600/15 p-6 rounded-2xl shadow-sm border border-slate-200/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer group"
              aria-label="Back to home"
            >
              <FaArrowLeftLong className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            </button>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-white text-slate-900 tracking-tight">
                My Enrolled Courses
              </h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Continue learning and track your course progress
              </p>
            </div>
          </div>

          {userData?.enrolledCourses?.length > 0 && (
            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-4 py-2 rounded-full border border-slate-200/80">
              {userData.enrolledCourses.length} {userData.enrolledCourses.length === 1 ? 'Course' : 'Courses'}
            </span>
          )}
        </div>

        {/* Empty State */}
        {!userData?.enrolledCourses || userData.enrolledCourses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-200/70 shadow-xs p-8 space-y-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
              <HiOutlineBookOpen className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">No Enrolled Courses Found</h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-sm mt-1">
                You haven't enrolled in any courses yet. Browse our catalog to start learning.
              </p>
            </div>
            <button
              onClick={() => navigate("/allcourses")}
              className="mt-2 px-6 py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          /* Enrolled Courses Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {userData.enrolledCourses.map((course) => (
              <div
                key={course._id}
                className="group bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-1"
              >
                <div>
                  {/* Course Thumbnail */}
                  <div className="relative w-full h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/10 transition-colors" />
                    
                    {/* Level Tag Overlay */}
                    {course.level && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-slate-800 tracking-wide uppercase shadow-xs">
                        {course.level}
                      </span>
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="p-5 space-y-2">
                    <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      {course.category}
                    </span>
                    <h2 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h2>
                  </div>
                </div>

                {/* Watch Button CTA */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => navigate(`/viewlecture/${course._id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <HiOutlinePlay className="w-4 h-4" />
                    <span>Watch Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default EnrolledCourse;
