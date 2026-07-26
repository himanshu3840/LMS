
import React from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { HiArrowUpRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ thumbnail, title, category, price, id, reviews = [] }) => {
  const navigate = useNavigate();

  // Calculate Average Rating Safely
  const calculateAverageRating = (reviewsList) => {
    if (!reviewsList || reviewsList.length === 0) return 0;
    const total = reviewsList.reduce((sum, review) => sum + (review.rating || 0), 0);
    return (total / reviewsList.length).toFixed(1);
  };

  const avgRating = calculateAverageRating(reviews);
  const reviewCount = reviews?.length || 0;

  const handleCardClick = () => {
    navigate(`/viewcourse/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative max-w-sm w-full bg-white/[0.04] backdrop-blur-xl rounded-2xl overflow-hidden shadow-sm hover:shadow-[0_0_35px_-10px_rgba(124,58,237,0.5)] border border-white/10 hover:border-purple-400/30 transition-all duration-300 ease-out cursor-pointer transform hover:-translate-y-1.5 flex flex-col justify-between"
    >
      {/* Top Media / Thumbnail Section */}
      <div className="relative w-full h-52 overflow-hidden bg-white/5">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Category Badge Floating on Image */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-3 py-1 bg-[#0B0F19]/70 backdrop-blur-md rounded-full text-xs font-semibold text-slate-200 tracking-wide uppercase shadow-sm border border-white/15 capitalize">
            {category}
          </span>
        </div>

        {/* Action Button Icon Overlay */}
        <div className="absolute bottom-3 right-3 z-10 p-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full shadow-lg shadow-purple-600/30 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <HiArrowUpRight className="w-4 h-4" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Title with multi-line truncate safety */}
          <h2 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-colors duration-200 line-clamp-2 leading-snug">
            {title}
          </h2>
        </div>

        {/* Meta Info / Footer */}
        <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1.5">
            <div className="flex items-center text-amber-400 text-sm">
              {avgRating > 0 ? (
                <FaStar className="w-4 h-4 fill-amber-400" />
              ) : (
                <FaRegStar className="w-4 h-4 text-slate-500" />
              )}
            </div>
            <span className="text-sm font-semibold text-slate-200">
              {avgRating > 0 ? avgRating : "New"}
            </span>
            {reviewCount > 0 && (
              <span className="text-xs text-slate-500 font-medium">
                ({reviewCount})
              </span>
            )}
          </div>

          {/* Price Badge */}
          <div className="flex items-baseline gap-0.5">
            <span className="text-xl font-extrabold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
              ₹{Number(price).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
