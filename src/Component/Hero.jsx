import React from "react";
import { Link, useNavigate } from "react-router-dom";
import AIStatsSection from "./AIStatsSection";
import MagneticButton from "./MagneticButton";

const Hero = ({ elem }) => {
  const navigate = useNavigate();

  const images = {
    src1: "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=7ALPYLBf4Lt2pG60Vz5mGsWGxj1Y4y8iCQZD6b-oeeE=",
    src2: "https://plus.unsplash.com/premium_photo-1689977927774-401b12d137d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVucyUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
    src3: "https://images.unsplash.com/photo-1521252659862-eec69941b071?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2lybCUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D",
  };

  return (
    <div className="bg-black min-h-screen pt-5 relative overflow-hidden">
      {/* Modern background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black via-black to-black opacity-90"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
        {/* Modern gradient orbs with updated colors */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        {/* Modern grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        </div>
      </div>

      <div className="max-w-screen relative z-10">
        {/* Modern Live Demo Badge */}
        <div className="inline-block animate-fade-in">
          <span className="bg-black/50 backdrop-blur-sm text-blue-400 px-4 py-2 rounded-full text-sm flex items-center gap-2 border border-blue-500/20 shadow-lg shadow-blue-500/10">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Live Demo 
          </span>
        </div>

        {/* Main Content */}
        <div className="px-[5rem]">
          <div className="mt-8 flex justify-around w-full flex-col lg:flex-row items-center gap-8">
            {/* Left Side */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                  Ace{" "}
                </span>
                <span className="text-white">Your Next</span> <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">
                  Technical
                </span>{" "}
                <span className="text-white">Interview</span>
              </h1>

              <p className="mt-6 text-gray-300 text-xl max-w-2xl leading-relaxed">
                Practice with our AI-powered platform and get real-time feedback
                on your coding skills, problem-solving abilities, and
                communication style.
              </p>

              {/* Modern CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  className="bg-gradient-to-r text-white from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/20 rounded-lg p-2"
                  onClick={() => navigate("/interview")}
                >
                  Start Interview
                </button>
                <button
                  className="px-5 py-3 text-gray-300 flex border border-gray-700 rounded-md items-center justify-center gap-2 hover:text-white hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  onClick={() => navigate("/schedule")}
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Schedule Interview
                </button>
              </div>

              {/* Modern Social Proof */}
              <div className="mt-12">
                <div className="flex items-center gap-4 justify-center lg:justify-start">
                  <div className="flex -space-x-2">
                    {Object.values(images).map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt={`User ${index + 1}`}
                        className="w-12 h-12 rounded-full border-2 border-black object-cover hover:scale-110 transition-transform duration-300 shadow-lg shadow-blue-500/10"
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">
                    Join our community
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium">
                      500+ successful
                    </span>{" "}
                    candidates
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - Stats Display */}
            <div className="flex-1 w-/2 relative">
              <div className="transform hover:scale-105 transition-transform duration-300">
                <AIStatsSection />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
