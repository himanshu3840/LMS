
import React from 'react'
import { MdCastForEducation } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { FaSackDollar } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

function Logos() {
  const badges = [
    {
      icon: MdCastForEducation,
      text: "Domain-specific Courses",
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      icon: SiOpenaccess,
      text: "Lifetime Access",
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      icon: FaSackDollar,
      text: "Value For Money",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
    // {
    //   icon: BiSupport,
    //   text: "24/7 Support",
    //   color: "text-sky-600 bg-sky-50 border-sky-100",
    // },
    {
      icon: FaUsers,
      text: "Community Support",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 bg-[#0B0F19] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center flex-wrap gap-4 md:gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon;
            return (
              <div
                key={index}
                className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className={`p-2 rounded-xl border ${badge.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="font-semibold text-slate-800 text-sm sm:text-base group-hover:text-indigo-600 transition-colors">
                  {badge.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Logos;
