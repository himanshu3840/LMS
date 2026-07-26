import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa6";
import { RiDoubleQuotesL } from "react-icons/ri";

const ReviewCard = ({ text, name, image, rating = 5, role = "Student" }) => {
  return (
    <div className="group relative bg-white/[0.04] backdrop-blur-xl p-6 sm:p-7 rounded-2xl border border-white/10 hover:border-purple-400/30 shadow-sm hover:shadow-[0_0_35px_-10px_rgba(124,58,237,0.5)] transition-all duration-300 ease-out max-w-sm w-full flex flex-col justify-between transform hover:-translate-y-1">
      {/* Decorative Quote Icon Background */}
      <RiDoubleQuotesL className="absolute top-5 right-5 w-10 h-10 text-white/5 group-hover:text-purple-400/20 transition-colors duration-300 pointer-events-none" />

      <div>
        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-base sm:text-lg">
              {i < Math.floor(rating) ? (
                <FaStar className="fill-amber-400" />
              ) : (
                <FaRegStar className="text-slate-600" />
              )}
            </span>
          ))}
          <span className="ml-1.5 text-xs font-bold text-slate-300">
            {Number(rating).toFixed(1)}
          </span>
        </div>

        {/* Review Text */}
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed line-clamp-4 italic relative z-10 mb-6">
          "{text}"
        </p>
      </div>

      {/* Reviewer Info */}
      <div className="flex items-center gap-3.5 pt-4 border-t border-white/10">
        <div className="relative w-11 h-11 shrink-0">
          {image ? (
            <img
              src={image}
              alt={name}
              className="w-full h-full rounded-full object-cover ring-2 ring-purple-500/30 group-hover:ring-cyan-400 transition-all duration-300"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-md shadow-purple-600/30">
              {name?.slice(0, 1).toUpperCase()}
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <h4 className="font-bold text-white text-sm sm:text-base group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors truncate">
            {name}
          </h4>
          <p className="text-xs font-medium text-slate-500 truncate">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
