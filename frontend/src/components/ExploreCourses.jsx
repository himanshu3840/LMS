
import React from 'react'
import { TbDeviceDesktopAnalytics, TbBrandOpenai } from "react-icons/tb";
import { LiaUikit } from "react-icons/lia";
import { MdAppShortcut } from "react-icons/md";
import { FaHackerrank } from "react-icons/fa";
import { SiGoogledataproc, SiOpenaigym } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { HiArrowLongRight } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';

function ExploreCourses() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Web Development",
      icon: TbDeviceDesktopAnalytics,
      iconColor: "text-purple-400",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(124,58,237,0.7)]",
      hoverBorder: "group-hover:border-purple-400/40",
    },
    {
      title: "UI/UX Design",
      icon: LiaUikit,
      iconColor: "text-cyan-400",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(6,182,212,0.7)]",
      hoverBorder: "group-hover:border-cyan-400/40",
    },
    {
      title: "App Development",
      icon: MdAppShortcut,
      iconColor: "text-fuchsia-400",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(217,70,239,0.7)]",
      hoverBorder: "group-hover:border-fuchsia-400/40",
    },
    {
      title: "Ethical Hacking",
      icon: FaHackerrank,
      iconColor: "text-indigo-400",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(99,102,241,0.7)]",
      hoverBorder: "group-hover:border-indigo-400/40",
    },
    {
      title: "AI & ML",
      icon: TbBrandOpenai,
      iconColor: "text-purple-300",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(168,85,247,0.7)]",
      hoverBorder: "group-hover:border-purple-300/40",
    },
    {
      title: "Data Science",
      icon: SiGoogledataproc,
      iconColor: "text-cyan-300",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(34,211,238,0.7)]",
      hoverBorder: "group-hover:border-cyan-300/40",
    },
    {
      title: "Data Analytics",
      icon: BsClipboardDataFill,
      iconColor: "text-indigo-300",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(129,140,248,0.7)]",
      hoverBorder: "group-hover:border-indigo-300/40",
    },
    {
      title: "AI Tools",
      icon: SiOpenaigym,
      iconColor: "text-fuchsia-300",
      glow: "group-hover:shadow-[0_0_25px_-6px_rgba(232,121,249,0.7)]",
      hoverBorder: "group-hover:border-fuchsia-300/40",
    }
  ];

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0B0F19] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute top-0 left-1/4 w-[380px] h-[380px] bg-purple-600/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[340px] h-[340px] bg-cyan-500/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Text Content */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
              <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></span>
              Categories
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Explore Our <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Top Categories</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-md">
              Discover industry-aligned learning paths tailored to help you master high-demand tech skills and accelerate your career.
            </p>

            <button
              onClick={() => navigate("/allcourses")}
              className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold text-base rounded-full shadow-lg shadow-purple-600/20 hover:shadow-[0_0_30px_-6px_rgba(124,58,237,0.8)] transition-all duration-300 ease-out transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer mt-2"
            >
              <span>Explore All Courses</span>
              <HiArrowLongRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>
          </div>

          {/* Right Category Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((cat, index) => {
              const IconComponent = cat.icon;
              return (
                <div
                  key={index}
                  onClick={() => navigate("/allcourses")}
                  className={`group flex flex-col items-center p-5 bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl border border-white/10 ${cat.hoverBorder} backdrop-blur-md shadow-sm ${cat.glow} transition-all duration-300 cursor-pointer transform hover:-translate-y-1 text-center`}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 border border-white/10">
                    <IconComponent className={`w-8 h-8 sm:w-10 sm:h-10 ${cat.iconColor} transition-colors duration-300`} />
                  </div>

                  <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">
                    {cat.title}
                  </span>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default ExploreCourses;
