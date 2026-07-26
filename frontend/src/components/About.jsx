
import React from 'react'
import about from "../assets/about.jpg"
import VideoPlayer from './VideoPlayer'
import { BiSolidBadgeCheck } from "react-icons/bi";
import { HiArrowLongRight } from "react-icons/hi2"; // Use a slightly more refined icon for the action

function About() {
  const features = [
    { title: "Simplified Learning", iconColor: "text-purple-400" },
    { title: "Expert Trainers", iconColor: "text-cyan-400" },
    { title: "Big Experience", iconColor: "text-indigo-400" },
    { title: "Lifetime Access", iconColor: "text-fuchsia-400" }
  ];

  return (
    <section className="relative w-full min-h-screen py-16 md:py-24 bg-[#0B0F19] text-white overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute top-0 -left-24 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -right-24 w-[360px] h-[360px] bg-cyan-500/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

        {/* Left Side: Media (Image & Video) */}
        {/* Adds motion: slight slide-in and fade from the left */}
        <div className="relative transform transition-all duration-700 ease-out translate-x-[-10px] opacity-0 animate-fade-slide-in group">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl">

            {/* Background Accent Element */}
            <div className="absolute -inset-1.5 bg-gradient-to-br from-purple-600/30 to-cyan-500/20 rounded-3xl blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>

            <img
              src={about}
              className="relative w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.03] border border-white/10"
              alt="Students collaborating and learning online"
            />

            {/* Minimalist, subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/70 via-transparent to-transparent opacity-70 rounded-3xl"></div>
          </div>

          {/* Floating VideoPlayer - integrated more professionally */}
          {/* <div className="absolute bottom-6 right-6 lg:-bottom-10 lg:-right-10 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 transform group-hover:-translate-y-2 group-hover:-translate-x-2 transition-transform duration-300">
            <div className="w-[120px] sm:w-[160px] h-[70px] sm:h-[90px] bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center">
              <VideoPlayer />
            </div>
          </div> */}
        </div>

        {/* Right Side: Content & Actions */}
        {/* Adds motion: slight slide-up and fade from the bottom */}
        <div className="flex flex-col gap-6 text-left transform transition-all duration-700 ease-out translate-y-[15px] opacity-0 animate-fade-slide-up [animation-delay:200ms]">

          {/* Section Tagline */}
          <div className="inline-flex items-center gap-2.5 text-sm sm:text-base font-semibold text-cyan-400 uppercase tracking-widest">
            <span className="w-10 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></span>
            About Us
          </div>

          {/* Major Headline - Adds subtle delay per line feel */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
            We <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Maximize</span> Your <br/> Learning Growth
          </h2>

          {/* Descriptive Paragraph */}
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl">
            We provide a modern Learning Management System to simplify online education, track progress, and enhance student-instructor collaboration efficiently.
          </p>

          {/* Features Grid - Clean and Structured */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-5 pt-4 border-t border-white/10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-3.5 group">
                {/* Accent colored icon container with hover pulse */}
                <div className={`p-2 rounded-lg bg-white/5 border border-white/10 ${feature.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  <BiSolidBadgeCheck className="w-5 h-5" />
                </div>
                <span className="font-medium text-slate-200 text-sm sm:text-base group-hover:text-white transition-colors">
                  {feature.title}
                </span>
              </div>
            ))}
          </div>

          {/* Enhanced CTA (Call to Action) */}
          <div className="pt-8">
            {/* <button className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-purple-600/20 transition-all duration-300 hover:from-purple-500 hover:to-cyan-500 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] hover:-translate-y-0.5 active:translate-y-0 group">
              Explore Our Courses
              <HiArrowLongRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button> */}
          </div>

        </div>
      </div>

      {/* Embedded Custom Tailwind Animations/Keyframes for Text/Elements */}
      <style>{`
        @keyframes fade-slide-in {
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes fade-slide-up {
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-slide-in {
          animation: fade-slide-in 0.8s ease-out forwards;
        }
        .animate-fade-slide-up {
          animation: fade-slide-up 0.8s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-fade-slide-in,
          .animate-fade-slide-up {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default About
