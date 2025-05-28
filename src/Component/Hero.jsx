import React from "react";
import { useNavigate,Link } from "react-router-dom";
import AIStatsSection from "./AIStatsSection";
import MagneticButton from "./MagneticButton";

const Hero = () => {
  const navigate = useNavigate();

  const images = {
    src1: "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=7ALPYLBf4Lt2pG60Vz5mGsWGxj1Y4y8iCQZD6b-oeeE=",
    src2: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60",
    src3: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=600&auto=format&fit=crop&q=60",
  };

  return (
    <div className="bg-black min-h-screen pt-5 relative overflow-hidden">
      {/* Background gradients and orbs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-black opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-screen relative z-10 px-4 sm:px-10">
        {/* Live Demo Badge */}
        <div className="inline-block animate-fade-in">
          <span className="bg-black/50 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-blue-500/20 shadow-lg shadow-blue-500/10">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Live Demo Available
          </span>
        </div>

        {/* Main Layout */}
        <div className="mt-8 flex flex-col lg:flex-row justify-between items-center gap-10 flex-wrap">
          {/* Left Section: Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Ace </span>
              <span className="text-white">Your Next</span><br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Technical </span>
              <span className="text-white">Interview</span>
            </h1>

            <p className="mt-6 text-gray-300 text-xl max-w-2xl leading-relaxed mx-auto lg:mx-0">
              Practice with our AI-powered platform and get real-time feedback on your coding skills, problem-solving abilities, and communication style.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             
              <MagneticButton color="#22C55E" showArrow={false}>
               <Link
                to="/interview" 
              >
                Start Interview
              </Link>
               </MagneticButton>
             
              <MagneticButton color="#3B82F6" showArrow={false}>
  <Link to="/schedule" className="flex items-center gap-2">
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="18"
        rx="2"
        ry="2"
        stroke="currentColor"
        strokeWidth="2"
        fill="#DBEAFE" /* light blue background */
      />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" strokeWidth="2" />
      <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="2" fill="white" />
      <line x1="16" y1="14" x2="16" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
    Schedule Interview
  </Link>
</MagneticButton>


            </div>

            {/* Social Proof */}
          <div className="mt-12">
  <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap sm:flex-nowrap">
    <div className="flex -space-x-2">
      {Object.values(images).map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`User ${index + 1}`}
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full border-2 border-black object-cover hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/10"
        />
      ))}
    </div>
    <p className="text-sm sm:text-base text-gray-300 leading-tight sm:leading-normal">
      Join our community <br />
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
        500+ successful
      </span>{" "}
      candidates
    </p>
  </div>
</div>

          </div>

          {/* Right Section: Stats */}
         <div className="flex-1 w-full max-w-xs  sm:max-w-sm lg:max-w-full px-4 overflow-visible">
  <div className="transform hover:scale-105 transition-transform duration-300">
    <AIStatsSection />
  </div>
</div>


        </div>
      </div>
    </div>
  );
};

export default Hero;
