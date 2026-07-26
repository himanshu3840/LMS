
import React from 'react'
import home from "../assets/home1.jpg"
import Nav from '../components/Nav'
import Logos from '../components/Logos';
import Cardspage from '../components/Cardspage';
import ExploreCourses from '../components/ExploreCourses';
import About from '../components/About';
import ai from '../assets/ai.png'
import ai1 from '../assets/SearchAi.png'
import ReviewPage from '../components/ReviewPage';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { HiArrowLongRight } from "react-icons/hi2";
import { TypeAnimation } from "react-type-animation";
import { HiOutlineSparkles } from "react-icons/hi2";
import {
  SiReact,
  SiPython,
  SiTensorflow,
  SiFigma,
  SiDocker,
  SiJavascript,
} from "react-icons/si";
import { FiUsers, FiAward, FiBookOpen } from "react-icons/fi";

function Home() {
  const navigate = useNavigate()

  // Floating tech icons scattered around the hero — purely decorative
  const floatingIcons = [
    { Icon: SiReact, className: "top-[18%] left-[8%]", delay: "0s", size: "text-4xl", color: "text-cyan-400" },
    { Icon: SiPython, className: "top-[28%] right-[10%]", delay: "1.2s", size: "text-4xl", color: "text-indigo-400" },
    { Icon: SiTensorflow, className: "bottom-[30%] left-[12%]", delay: "2s", size: "text-3xl", color: "text-purple-400" },
    { Icon: SiFigma, className: "top-[14%] right-[22%]", delay: "0.6s", size: "text-3xl", color: "text-fuchsia-400" },
    { Icon: SiDocker, className: "bottom-[22%] right-[14%]", delay: "1.6s", size: "text-4xl", color: "text-cyan-300" },
    { Icon: SiJavascript, className: "bottom-[16%] left-[24%]", delay: "0.9s", size: "text-3xl", color: "text-indigo-300" },
  ];

  const trustBadges = [
    { Icon: FiUsers, label: "25,000+ Students" },
    { Icon: FiBookOpen, label: "120+ Courses" },
    { Icon: FiAward, label: "Industry Certified" },
  ];

  return (
    <div className="w-full overflow-hidden bg-[#0B0F19] font-[Inter]">

      {/* Hero Section */}
      <div className="relative w-full h-[92vh] sm:h-[95vh] lg:h-screen min-h-[620px] flex flex-col justify-between">
        <Nav />

        {/* Hero Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={home}
            className="w-full h-full object-cover object-center opacity-40"
            alt="Hero Background"
          />
          {/* Layered gradient overlay for depth + readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/85 to-[#0B0F19]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(124,58,237,0.25),_transparent_60%)]" />
        </div>

        {/* Ambient blurred glow blobs */}
        <div className="pointer-events-none absolute -top-32 -left-24 w-[420px] h-[420px] bg-purple-600/30 rounded-full blur-[120px] animate-blob" />
        <div className="pointer-events-none absolute top-1/3 -right-24 w-[380px] h-[380px] bg-cyan-500/25 rounded-full blur-[120px] animate-blob [animation-delay:2.5s]" />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-[340px] h-[340px] bg-indigo-500/20 rounded-full blur-[110px] animate-blob [animation-delay:4s]" />

        {/* Floating decorative tech icons — hidden on small screens to avoid clutter */}
        <div className="hidden md:block absolute inset-0 z-[5] pointer-events-none">
          {floatingIcons.map(({ Icon, className, delay, size, color }, i) => (
            <div
              key={i}
              className={`absolute ${className} ${size} ${color} opacity-40 animate-float-icon`}
              style={{ animationDelay: delay }}
            >
              <Icon />
            </div>
          ))}
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col items-center justify-center text-center pt-20">

          {/* Eyebrow badge */}
          <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs sm:text-sm font-medium text-slate-200 animate-hero-fade shadow-[0_0_20px_-6px_rgba(124,58,237,0.6)]">
            <HiOutlineSparkles className="w-4 h-4 text-cyan-400" />
            <span>AI-Powered Learning, Built for Students</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight max-w-5xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent animate-hero-fade">
            <TypeAnimation
              sequence={[
                "Grow Your Skills to Advance\nYour Career Path",
                2500,
                "",
                500,

                "Learn From Industry Experts\nAt Your Own Pace",
                2500,
                "",
                500,

                "Build Real-World Projects\nLand Your Dream Job",
                2500,
                "",
                500,
              ]}
              wrapper="span"
              speed={60}
              deletionSpeed={40}
              repeat={Infinity}
              style={{ whiteSpace: "pre-line" }}
              className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent"
            />
          </h1>

          {/* Subtitle Description */}
          <p className="mt-6 text-slate-400 text-base sm:text-lg lg:text-xl max-w-2xl font-normal leading-relaxed animate-hero-fade">
            Access world-class education with AI-powered personalized learning paths designed to accelerate your growth.
          </p>

          {/* Call to Action Buttons */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto animate-hero-fade">

            {/* View All Courses Button */}
            <button
              onClick={() => navigate("/allcourses")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-base rounded-full shadow-lg shadow-purple-600/30 hover:shadow-[0_0_30px_-4px_rgba(124,58,237,0.8)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer group"
            >
              <span>View All Courses</span>
              <HiArrowLongRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1.5" />
            </button>

            {/* Search with AI Button */}
            <button
              onClick={() => navigate("/searchwithai")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/15 hover:border-cyan-400/40 backdrop-blur-md font-semibold text-base rounded-full shadow-md hover:shadow-[0_0_25px_-6px_rgba(6,182,212,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-[1.03] cursor-pointer group"
            >
              <span>Search with AI</span>
              <img
                src={ai}
                className="w-7 h-7 rounded-full object-cover hidden sm:block border border-white/40 group-hover:border-cyan-300 transition-transform group-hover:scale-105"
                alt="AI Icon"
              />
              <img
                src={ai1}
                className="w-7 h-7 rounded-full object-cover sm:hidden border border-white/40"
                alt="AI Icon"
              />
            </button>

          </div>

          {/* Trust Badges */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-hero-fade">
            {trustBadges.map(({ Icon, label }, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-300 text-xs sm:text-sm font-medium hover:border-purple-400/40 hover:text-white transition-colors duration-300"
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Styling for animations */}
        <style>{`
          @keyframes heroFadeIn {
            0% {
              opacity: 0;
              transform: translateY(14px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-hero-fade {
            animation: heroFadeIn 700ms cubic-bezier(0, 0, 0.2, 1) forwards;
          }

          @keyframes blobFloat {
            0%, 100% {
              transform: translate(0, 0) scale(1);
            }
            33% {
              transform: translate(20px, -25px) scale(1.08);
            }
            66% {
              transform: translate(-15px, 15px) scale(0.95);
            }
          }
          .animate-blob {
            animation: blobFloat 12s ease-in-out infinite;
          }

          @keyframes floatIcon {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-16px);
            }
          }
          .animate-float-icon {
            animation: floatIcon 6s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .animate-hero-fade,
            .animate-blob,
            .animate-float-icon {
              animation: none !important;
            }
          }
        `}</style>
      </div>

      {/* Page Sections */}
      <Logos />
      <ExploreCourses />
      <Cardspage />
      <About />
      <ReviewPage />
      <Footer />
    </div>
  )
}

export default Home;
