import React from 'react';
import myVideo from './video.mp4';

function VideoPlayer() {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/80 bg-slate-900 group">
      <video
        src={myVideo}
        autoPlay
        loop
        muted
        playsInline
        controls
        className="w-full h-auto object-cover rounded-2xl transition-transform duration-300 group-hover:scale-[1.02]"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
