
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTwitter, FaLinkedinIn, FaGithub, FaInstagram } from "react-icons/fa";
import { HiArrowLongRight } from "react-icons/hi2";
import logo from "../assets/logo.jpg";

const Footer = () => {
  const navigate = useNavigate();

  const socialLinks = [
    { icon: FaTwitter, href: "#", label: "Twitter" },
    { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/allcourses" },
    { name: "Login", path: "/login" },
    { name: "My Profile", path: "/profile" },
  ];

  const categories = [
    "Web Development",
    "AI & Machine Learning",
    "Data Science",
    "UI/UX Design",
  ];

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto pt-16 pb-12 px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-10 w-10 rounded-xl object-cover ring-2 ring-indigo-500/30" 
              />
              <span className="text-xl font-extrabold text-white tracking-tight">
                Skill<span className="text-indigo-500">Grid</span>
              </span>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              An AI-powered learning platform designed to help you build modern skills, advance your career, and learn anytime, anywhere.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-indigo-600 hover:border-indigo-600 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-3">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="group inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                  >
                    <HiArrowLongRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-400" />
                    <span>{link.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-indigo-500 pl-3">
              Popular Categories
            </h3>
            <ul className="space-y-3 text-sm">
              {categories.map((cat, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate("/allcourses")}
                    className="group inline-flex items-center gap-1.5 hover:text-indigo-400 transition-colors duration-200 cursor-pointer"
                  >
                    <HiArrowLongRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-indigo-400" />
                    <span>{cat}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} LearnAI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
