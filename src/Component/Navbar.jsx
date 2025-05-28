import React, { useState } from "react";
import { Link } from "react-router-dom";
import MagneticButton from "./MagneticButton";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="p-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Toggle */}
          <div className="flex items-center">
            <span className="font-bold text-2xl text-cyan-500">MockPro</span>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden ml-4 text-gray-300 hover:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="text-gray-300  px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <MagneticButton color="#22C55E" showArrow={false}>
              <Link
                to="/login"
                className="text-green-600 px-3 py-1 rounded-md text-sm font-medium relative group"
              >
                Login
              </Link>
            </MagneticButton>
            <MagneticButton color="#EF4444" showArrow={false}>
              <Link
                to="/register"
                className="text-red-700 px-3 py-1 rounded-md text-sm font-medium relative group"
              >
                Signup
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Mobile Nav */}
        <div
          className={`md:hidden transition-[max-height] duration-300 ease-in-out overflow-hidden ${
            isMenuOpen ? "max-h-screen py-4" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase()}`}
                className="block text-gray-300 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium"
              >
                {item}
              </Link>
            ))}

            {/* Mobile Buttons */}
            <Link
              to="/login"
              className="block text-green-600 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="block text-red-700 hover:text-cyan-400 px-3 py-2 rounded-md text-base font-medium"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
