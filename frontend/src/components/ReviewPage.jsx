

import React, { useEffect, useState } from 'react'
import ReviewCard from './ReviewCard'
import { useSelector } from 'react-redux';

function ReviewPage() {
  const [latestReview, setLatestReview] = useState([]);
  const { allReview } = useSelector(state => state.review);

  useEffect(() => {
    if (allReview && Array.isArray(allReview)) {
      setLatestReview(allReview.slice(0, 6));
    }
  }, [allReview]);

  return (
    <section className="relative w-full py-16 md:py-24 bg-[#0B0F19] overflow-hidden">
      {/* Ambient glow blobs */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[380px] h-[380px] bg-cyan-500/10 rounded-full blur-[130px]" />
      <div className="pointer-events-none absolute bottom-0 -left-24 w-[360px] h-[360px] bg-purple-600/10 rounded-full blur-[130px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-sm uppercase tracking-wider">
            <span className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"></span>
            Testimonials
            <span className="w-8 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"></span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Real Reviews from <span className="bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">Real Learners</span>
          </h1>

          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Discover how Skill Grid is transforming learning experiences through real feedback from students and professionals worldwide.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 justify-items-center">
          {latestReview.map((item, index) => (
            <ReviewCard
              key={item._id || index}
              rating={item.rating}
              image={item.user?.photoUrl}
              text={item.comment}
              name={item.user?.name}
              role={item.user?.role || "Student"}
            />
          ))}
        </div>

      </div>
    </section>
  )
}

export default ReviewPage;
