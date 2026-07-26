import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { FaPlayCircle } from 'react-icons/fa';
import { FaArrowLeftLong } from "react-icons/fa6";
import { HiOutlineAcademicCap, HiOutlineTag, HiOutlineVideoCamera, HiOutlineUserCircle } from "react-icons/hi2";

function ViewLecture() {
  const { courseId } = useParams();
  const { courseData } = useSelector((state) => state.course);
  const { userData } = useSelector((state) => state.user);
  const selectedCourse = courseData?.find((course) => course._id === courseId);

  const [selectedLecture, setSelectedLecture] = useState(
    selectedCourse?.lectures?.[0] || null
  );
  const navigate = useNavigate();
  const courseCreator = userData?._id === selectedCourse?.creator ? userData : null;

  return (
    <div className="min-h-screen w-full bg-[#0B0F19] font-sans text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">

      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute -top-32 -left-24 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 items-start">

        {/* Left Column - Video Player & Lecture Header */}
        <div className="w-full lg:w-2/3 bg-white/[0.04] backdrop-blur-xl rounded-3xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] border border-white/10 p-6 sm:p-8 space-y-6">

          {/* Header Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(`/viewcourse/${courseId}`)}
                className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 hover:text-cyan-400 transition-colors cursor-pointer group"
                aria-label="Back to home"
              >
                <FaArrowLeftLong className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
                {selectedCourse?.title}
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-500/10 text-purple-300 rounded-full text-xs font-bold border border-purple-500/25">
                <HiOutlineTag className="w-3.5 h-3.5" />
                <span>{selectedCourse?.category || "Category"}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 text-slate-300 rounded-full text-xs font-bold border border-white/10">
                <HiOutlineAcademicCap className="w-3.5 h-3.5" />
                <span>{selectedCourse?.level || "All Levels"}</span>
              </span>
            </div>
          </div>

          {/* Main Video Box Container */}
          <div className="relative aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-inner border border-white/10 flex items-center justify-center">
            {selectedLecture?.videoUrl ? (
              <video
                src={selectedLecture.videoUrl}
                controls
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <HiOutlineVideoCamera className="w-10 h-10 text-slate-600 mx-auto" />
                <p className="text-slate-500 text-xs font-semibold">Select a lecture from the list to start watching</p>
              </div>
            )}
          </div>

          {/* Active Lecture Metadata */}
          <div className="bg-white/[0.03] p-4 rounded-2xl border border-white/10">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block mb-0.5">Currently Playing</span>
            <h2 className="text-base font-bold text-white">
              {selectedLecture?.lectureTitle || "No Lecture Selected"}
            </h2>
          </div>
        </div>

        {/* Right Column - Playlist Drawer & Instructor Bio */}
        <div className="w-full lg:w-1/3 bg-white/[0.04] backdrop-blur-xl rounded-3xl shadow-[0_0_60px_-15px_rgba(124,58,237,0.35)] border border-white/10 p-6 space-y-6 lg:sticky lg:top-24">

          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-white">Course Content</h2>
              <span className="text-xs font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                {selectedCourse?.lectures?.length || 0} Lectures
              </span>
            </div>

            {/* Lecture Items Grid/List */}
            <div className="space-y-2.5 max-h-[420px] overflow-y-auto pr-1">
              {selectedCourse?.lectures?.length > 0 ? (
                selectedCourse.lectures.map((lecture, index) => {
                  const isSelected = selectedLecture?._id === lecture._id;
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedLecture(lecture)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-purple-500/10 border-purple-400/40 ring-2 ring-purple-500/20 shadow-sm'
                          : 'bg-white/[0.02] hover:bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <span className={`p-2 rounded-lg ${isSelected ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                          <FaPlayCircle className="w-4 h-4" />
                        </span>
                        <div className="overflow-hidden">
                          <span className="text-xs font-bold text-slate-500 block mb-0.5">Lecture {index + 1}</span>
                          <h4 className="text-xs font-bold text-slate-200 truncate">
                            {lecture.lectureTitle}
                          </h4>
                        </div>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs font-medium">
                  No lectures available for this course yet.
                </div>
              )}
            </div>
          </div>

          {/* Creator Profile Section */}
          {courseCreator && (
            <div className="pt-4 border-t border-white/10 space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Instructor Details</h3>

              <div className="flex items-center gap-3.5 p-3.5 bg-white/[0.03] rounded-2xl border border-white/10">
                {courseCreator.photoUrl ? (
                  <img
                    src={courseCreator.photoUrl}
                    alt="Instructor"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-500/25 shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center shrink-0">
                    <HiOutlineUserCircle className="w-8 h-8" />
                  </div>
                )}

                <div className="overflow-hidden">
                  <h4 className="text-sm font-bold text-white truncate">
                    {courseCreator.name}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-0.5">
                    {courseCreator.description || 'No bio available.'}
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default ViewLecture;
