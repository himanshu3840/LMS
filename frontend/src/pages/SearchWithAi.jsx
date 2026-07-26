
import React, { useState } from 'react'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri";
import { HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import start from "../assets/start.mp3"
import { FaArrowLeftLong } from "react-icons/fa6";

function SearchWithAi() {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const startSound = new Audio(start)

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true)
    startSound.play()
    recognition.start();
    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };
  };

  // const handleRecommendation = async (query) => {
  //   try {
  //     const result = await axios.post(`${serverUrl}/api/ai/search`, { input: query }, { withCredentials: true });
  //     setRecommendations(result.data);
  //     if(result.data.length > 0){
  //       speak("These are the top courses I found for you")
  //     } else {
  //       speak("No courses found")
  //     }
  //     setListening(false)
  //   } catch (error) {
  //     console.log(error);
  //     setListening(false)
  //   }
  // };

  const handleRecommendation = async (query) => {
    try {
      setLoading(true);

      const result = await axios.post(
        `${serverUrl}/api/ai/search`,
        { input: query },
        { withCredentials: true }
      );

      setRecommendations(result.data);

      if (result.data.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("No courses found");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setListening(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 font-sans text-slate-100 flex flex-col items-center px-4 py-10 sm:py-16 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Glassmorphic Search Box */}
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 shadow-2xl rounded-3xl p-6 sm:p-10 w-full max-w-2xl text-center relative z-10 space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all cursor-pointer group"
            aria-label="Back to home"
          >
            <FaArrowLeftLong className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </button>

          <span className="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <HiOutlineSparkles className="w-4 h-4 text-purple-400" />
            AI Search Engine
          </span>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2.5">
            <img src={ai} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30" alt="AI" />
            <span>Search with <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">AI</span></span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Ask by topic or click the mic to speak naturally
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full flex items-center">
          <input
            type="text"
            className="w-full pl-5 pr-24 py-4 bg-slate-950/80 border border-slate-800 rounded-2xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 text-sm sm:text-base transition-all shadow-inner"
            placeholder="What do you want to learn? (e.g. AI, Web Dev...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && input.trim()) {
                handleRecommendation(input);
              }
            }}
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {/* Search Trigger Icon */}
            {input && (
              <button
                onClick={() => handleRecommendation(input)}
                className="p-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-xl transition-all cursor-pointer shadow-md shadow-purple-600/30"
                aria-label="Run search"
              >
                <img src={ai} className="w-4 h-4 rounded-full object-cover" alt="Search" />
              </button>
            )}

            {/* Mic Voice Search Trigger */}
            <button
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                listening 
                  ? "bg-rose-500/20 border-rose-500/50 text-rose-400 animate-pulse" 
                  : "bg-slate-800 hover:bg-slate-700 border-slate-700 text-purple-400"
              }`}
              onClick={handleSearch}
              aria-label="Voice search"
            >
              <RiMicAiFill className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Listening Radar Visualizer Indicator */}
        {listening && (
          <div className="flex items-center justify-center gap-2 py-2 text-rose-400 text-xs font-semibold animate-pulse">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            Listening... Speak your prompt clearly
          </div>
        )}
      </div>

     {/* Recommendations Results Container */}

{loading ? (
  <div className="flex flex-col items-center justify-center mt-16 space-y-6 relative z-10">

    {/* Circular Loader */}
    <div className="relative">
      <div className="w-20 h-20 rounded-full border-[6px] border-slate-700 border-t-purple-500 animate-spin"></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={ai}
          className="w-8 h-8 rounded-full animate-pulse"
          alt="AI"
        />
      </div>
    </div>

    <div className="text-center">
      <h2 className="text-xl font-semibold text-white">
        Searching...
      </h2>

      <p className="text-slate-400 mt-2">
        AI is finding the best courses for you.
      </p>
    </div>
  </div>

) : recommendations.length > 0 ? (

  <div className="w-full max-w-6xl mt-12 space-y-6 relative z-10">

    <div className="flex items-center justify-center gap-3 border-b border-slate-800/80 pb-4">
      <img
        src={ai1}
        className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500/30"
        alt="AI Results"
      />

      <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
        AI Recommended Courses
      </h2>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {recommendations.map((course, index) => (

        <div
          key={index}
          onClick={() => navigate(`/viewcourse/${course._id}`)}
          className="group bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 p-6 rounded-2xl shadow-md hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer hover:-translate-y-1"
        >

          <div className="space-y-2">

            <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 inline-block">
              {course.category || "Course"}
            </span>

            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
              {course.title}
            </h3>

          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-semibold">

            <span>View Details</span>

            <HiOutlineArrowRight className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform" />

          </div>

        </div>

      ))}

    </div>

  </div>

) : (

  !listening && (

    <div className="text-center py-16 space-y-2 relative z-10">

      <p className="text-base font-semibold text-slate-400">
        No AI course recommendations yet
      </p>

      <p className="text-xs text-slate-600">
        Type a topic above or tap the microphone to discover courses.
      </p>

    </div>

  )

)}

    </div>
  );
}

export default SearchWithAi;
