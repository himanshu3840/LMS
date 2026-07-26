
import React, { useState, useRef, useEffect } from 'react';
import logo from "../assets/logo.jpg";
import { IoMdPerson } from "react-icons/io";
import { HiMenuAlt3, HiX, HiOutlinePhotograph } from "react-icons/hi";
import { HiOutlineUser, HiOutlineBookOpen, HiOutlineSquares2X2, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../app';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Nav() {
  const [showHam, setShowHam] = useState(false);
  const [showPro, setShowPro] = useState(false);
  const dropdownRef = useRef(null);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(state => state.user);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowPro(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true });
      dispatch(setUserData(null));
      setShowPro(false);
      setShowHam(false);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-20 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <img 
              src={logo} 
              className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-500/30 group-hover:ring-indigo-500 transition-all duration-300" 
              alt="Logo" 
            />
            <span className="text-xl font-extrabold text-white tracking-tight">
              Skill<span className="text-indigo-500">Grid</span>
            </span>
          </div>

          {/* Desktop Navigation & Actions */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Image Button (Left of Login / Profile) */}
            {/* <button
              aria-label="Image gallery or features"
              className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-all duration-200 cursor-pointer group"
            >
              <HiOutlinePhotograph className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
            </button> */}

            {/* Educator Dashboard Button */}
            {userData?.role === "educator" && (
              <button 
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl border border-slate-700 transition-all duration-200 "
              >
                Dashboard
              </button>
            )}

            {/* User Profile / Auth State */}
            {!userData ? (
              <button 
                onClick={() => navigate("/login")}
                className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40 transition-all duration-200 cursor-pointer"
              >
                Login
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowPro(prev => !prev)}
                  className="w-10 h-10 rounded-full ring-2 ring-indigo-500/50 hover:ring-indigo-500 overflow-hidden flex items-center justify-center bg-indigo-600 text-white font-bold text-base transition-all duration-200 cursor-pointer shadow-md"
                >
                  {userData.photoUrl ? (
                    <img src={userData.photoUrl} className="w-full h-full object-cover" alt="Avatar" />
                  ) : (
                    <span>{userData?.name?.slice(0, 1).toUpperCase()}</span>
                  )}
                </button>

                {/* Profile Dropdown */}
                {showPro && (
                  <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 text-slate-300 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-800">
                      <p className="text-sm font-semibold text-white truncate">{userData?.name}</p>
                      <p className="text-xs text-slate-400 truncate">{userData?.email}</p>
                    </div>

                    <div className="py-1">
                      <button 
                        onClick={() => { navigate("/profile"); setShowPro(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-800/80 hover:text-white flex items-center gap-3 transition-colors"
                      >
                        <HiOutlineUser className="w-4 h-4 text-slate-400" />
                        My Profile
                      </button>

                      <button 
                        onClick={() => { navigate("/enrolledcourses"); setShowPro(false); }}
                        className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-800/80 hover:text-white flex items-center gap-3 transition-colors"
                      >
                        <HiOutlineBookOpen className="w-4 h-4 text-slate-400" />
                        My Courses
                      </button>
                    </div>

                    <div className="border-t border-slate-800 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 flex items-center gap-3 transition-colors"
                      >
                        <HiOutlineArrowRightOnRectangle className="w-4 h-4 text-rose-400" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Icon */}
          <button 
            onClick={() => setShowHam(true)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Open menu"
          >
            <HiMenuAlt3 className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div 
        className={`fixed inset-0 bg-slate-950/95 backdrop-blur-xl z-50 flex flex-col justify-between p-6 lg:hidden transition-all duration-300 ${
          showHam ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} className="w-9 h-9 rounded-lg object-cover" alt="Logo" />
            <span className="text-lg font-bold text-white">SkillGrid</span>
          </div>
          <button 
            onClick={() => setShowHam(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg"
          >
            <HiX className="w-7 h-7" />
          </button>
        </div>

        {userData && (
          <div className="flex items-center gap-4 py-4 px-4 bg-slate-900/60 rounded-2xl border border-slate-800/80 my-4">
            <div className="w-12 h-12 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center overflow-hidden shrink-0">
              {userData.photoUrl ? (
                <img src={userData.photoUrl} className="w-full h-full object-cover" alt="Avatar" />
              ) : (
                <span>{userData?.name?.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <h3 className="text-white font-semibold truncate">{userData?.name}</h3>
              <p className="text-xs text-slate-400 truncate">{userData?.email}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-3 my-auto">
          {userData && (
            <>
              <button 
                onClick={() => { navigate("/profile"); setShowHam(false); }}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/80 text-slate-200 font-medium text-base border border-slate-800 hover:bg-slate-800"
              >
                <HiOutlineUser className="w-5 h-5 text-indigo-400" />
                My Profile
              </button>

              <button 
                onClick={() => { navigate("/enrolledcourses"); setShowHam(false); }}
                className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/80 text-slate-200 font-medium text-base border border-slate-800 hover:bg-slate-800"
              >
                <HiOutlineBookOpen className="w-5 h-5 text-indigo-400" />
                My Courses
              </button>
            </>
          )}

          {userData?.role === "educator" && (
            <button 
              onClick={() => { navigate("/dashboard"); setShowHam(false); }}
              className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl bg-slate-900/80 text-slate-200 font-medium text-base border border-slate-800 hover:bg-slate-800"
            >
              <HiOutlineSquares2X2 className="w-5 h-5 text-indigo-400" />
              Educator Dashboard
            </button>
          )}
        </div>

        <div className="pt-4 border-t border-slate-800">
          {!userData ? (
            <button 
              onClick={() => { navigate("/login"); setShowHam(false); }}
              className="w-full py-3.5 bg-indigo-600 text-white font-semibold rounded-xl text-center shadow-lg shadow-indigo-600/30"
            >
              Login
            </button>
          ) : (
            <button 
              onClick={handleLogout}
              className="w-full py-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 font-semibold rounded-xl text-center hover:bg-rose-500/20"
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Nav;
