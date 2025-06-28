import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";

const Signup = () => {
  // Form state
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Error state
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeInput, setActiveInput] = useState(null);
  const containerRef = useRef(null);

  // Scroll animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Calculate mouse position relative to center
      const x = (clientX / innerWidth - 0.5) * 30;
      const y = (clientY / innerHeight - 0.5) * 30;
      
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Show success animation before redirecting
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Decorative elements data
  const decorativeElements = [
    { icon: "⚡", color: "from-blue-500 to-purple-500" },
    { icon: "🚀", color: "from-purple-500 to-pink-500" },
    { icon: "💡", color: "from-pink-500 to-red-500" },
    { icon: "🎯", color: "from-red-500 to-orange-500" },
    { icon: "⚛️", color: "from-orange-500 to-yellow-500" },
  ];

  // Add refs for the cards
  const infoCardRef = useRef(null);
  const formCardRef = useRef(null);
  const [infoCardTilt, setInfoCardTilt] = useState({ x: 0, y: 0 });
  const [formCardTilt, setFormCardTilt] = useState({ x: 0, y: 0 });

  // Separate ref and state for the title card
  const titleCardRef = useRef(null);
  const [titleCardTilt, setTitleCardTilt] = useState({ x: 0, y: 0 });

  // Enhanced mouse move handler for title card
  const handleTitleCardMouseMove = (e, cardRef, setTilt) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate tilt based on mouse position relative to card center
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate tilt angles (max 15 degrees for more dramatic effect)
    const tiltX = ((y - centerY) / centerY) * -15;
    const tiltY = ((x - centerX) / centerX) * 15;
    
    // Add some resistance to the tilt
    const resistance = 0.8;
    setTilt({ 
      x: tiltX * resistance, 
      y: tiltY * resistance 
    });
  };

  // Reset tilt on mouse leave
  const handleCardMouseLeave = (setTilt) => {
    setTilt({ x: 0, y: 0 });
  };

  // AI Interview visualization data with images
  const aiInterviewElements = [
    {
      type: "ai",
      content: "Let's discuss your approach to system design...",
      delay: 0.2,
      position: "left",
      avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      type: "user",
      content: "I would start by analyzing the requirements...",
      delay: 0.4,
      position: "right",
      avatar: "https://cdn-icons-png.flaticon.com/512/1077/1077114.png",
      gradient: "from-purple-500/20 to-pink-500/20"
    },
    {
      type: "ai",
      content: "Great! How would you handle scalability?",
      delay: 0.6,
      position: "left",
      avatar: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      gradient: "from-pink-500/20 to-red-500/20"
    }
  ];

  // Tech stack illustrations
  const techStack = [
    {
      name: "React",
      icon: "https://cdn.worldvectorlogo.com/logos/react-2.svg",
      color: "from-blue-400/20 to-blue-600/20"
    },
    {
      name: "Node.js",
      icon: "https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg",
      color: "from-green-400/20 to-green-600/20"
    },
    {
      name: "Python",
      icon: "https://cdn.worldvectorlogo.com/logos/python-5.svg",
      color: "from-yellow-400/20 to-yellow-600/20"
    },
    {
      name: "AI/ML",
      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
      color: "from-purple-400/20 to-purple-600/20"
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0A0A0F] via-[#0F0F1A] to-[#1A1A2E]">
      {/* Enhanced Background with Illustrations */}
      <div className="absolute inset-0">
        {/* Abstract Tech Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        {/* Floating Tech Stack Icons */}
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            className="absolute"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              y: [null, Math.random() * window.innerHeight],
              opacity: [0, 0.3, 0],
              scale: [0.8, 1, 0.8],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: index * 2,
            }}
          >
            <div className={`p-4 rounded-xl bg-gradient-to-r ${tech.color} backdrop-blur-sm`}>
              <img src={tech.icon} alt={tech.name} className="w-12 h-12 object-contain" />
            </div>
          </motion.div>
        ))}

        {/* Decorative AI Circuit Pattern */}
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" 
            alt="AI Circuit" 
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-5xl flex flex-col lg:flex-row gap-8"
        >
          {/* Left Side - AI Interview Visualization */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* AI Interview Card */}
              <motion.div
                className="relative backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-white/10 overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-20">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/512/2103/2103633.png" 
                    alt="AI Pattern" 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* AI Interview Header */}
                <div className="flex items-center justify-between mb-8">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                        <img 
                          src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png" 
                          alt="AI Assistant" 
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                      <motion.div
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="absolute -inset-1 rounded-full border-2 border-blue-500/30"
                      ></motion.div>
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-xl">AI Interview Simulator</h3>
                      <p className="text-gray-400 text-sm">Real-time coding assessment</p>
                    </div>
                  </motion.div>
                </div>

                {/* Interview Messages */}
                <div className="space-y-4">
                  {aiInterviewElements.map((element, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: element.position === "left" ? -20 : 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: element.delay }}
                      className={`flex ${element.position === "right" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-sm border border-white/5
                        ${element.position === "left" ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10" : "bg-gradient-to-r from-purple-500/10 to-pink-500/10"}`}
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={element.avatar} 
                            alt={element.type} 
                            className="w-8 h-8 object-contain"
                          />
                          <p className="text-white/90">{element.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Live Coding Preview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-4 rounded-xl bg-black/50 border border-white/5 relative overflow-hidden"
                >
                  {/* Code Editor Header */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-gray-400 text-sm ml-2">system-design.js</span>
                    <div className="ml-auto flex items-center gap-2">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" 
                        alt="React" 
                        className="w-4 h-4"
                      />
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968322.png" 
                        alt="Node" 
                        className="w-4 h-4"
                      />
                    </div>
                  </div>

                  {/* Code Content */}
                  <pre className="text-sm text-gray-300 font-mono relative">
                    <code>{`class SystemDesign {
  constructor() {
    this.scalability = 'horizontal';
    this.reliability = 'high';
    this.availability = '99.99%';
  }

  async designSystem() {
    // AI-powered architecture suggestions
    const components = await this.analyzeRequirements();
    return this.optimizeForScale(components);
  }
}`}</code>
                  </pre>

                  {/* Decorative Code Pattern */}
                  <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" 
                      alt="Code Pattern" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </motion.div>

                {/* Stats with Icons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="flex justify-between items-center mt-6 pt-6 border-t border-white/5"
                >
                  {[
                    {
                      icon: "https://cdn-icons-png.flaticon.com/512/190/190411.png",
                      value: "98%",
                      label: "Success Rate"
                    },
                    {
                      icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                      value: "10k+",
                      label: "Interviews"
                    },
                    {
                      icon: "https://cdn-icons-png.flaticon.com/512/2103/2103633.png",
                      value: "24/7",
                      label: "AI Support"
                    }
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <img 
                        src={stat.icon} 
                        alt={stat.label} 
                        className="w-8 h-8 mx-auto mb-2 opacity-80"
                      />
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-sm text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Social Proof with Enhanced Images */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="relative backdrop-blur-xl bg-black/30 p-6 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[
                    {
                      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
                      name: "Sarah"
                    },
                    {
                      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
                      name: "Mike"
                    },
                    {
                      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
                      name: "Emma"
                    }
                  ].map((user, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.3 + index * 0.1 }}
                      className="relative group"
                    >
                      <img
                        src={user.src}
                        alt={user.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-800 hover:border-blue-500 transition-colors duration-300"
                        style={{ zIndex: 3 - index }}
                      />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6 + index * 0.1 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        {user.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="flex items-center gap-2"
                  >
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
                      alt="Users" 
                      className="w-5 h-5"
                    />
                    <span className="text-white font-medium text-lg">+2.5k</span>
                  </motion.div>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="text-gray-400 block"
                  >
                    developers joined this month
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="relative"
            >
              {/* Decorative Corner Accents */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-xl opacity-50"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg blur-xl opacity-50"></div>
              
              <motion.div
                ref={formCardRef}
                onMouseMove={(e) => handleCardMouseMove(e, formCardRef, setFormCardTilt)}
                onMouseLeave={() => handleCardMouseLeave(setFormCardTilt)}
                style={{
                  transformStyle: "preserve-3d",
                  transform: `perspective(1000px) rotateX(${formCardTilt.x}deg) rotateY(${formCardTilt.y}deg)`,
                  transition: "transform 0.1s ease-out",
                }}
                className="relative backdrop-blur-xl bg-black/30 p-8 rounded-2xl border border-white/10 overflow-hidden"
              >
                {/* Card Content Shine Effect */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at ${formCardTilt.x}% ${formCardTilt.y}%, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                    transform: "translateZ(20px)",
                  }}
                ></div>

                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                {/* Logo with Enhanced Animation */}
                <div className="text-center mb-8">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                      delay: 0.5
                    }}
                    whileHover={{ 
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 }
                    }}
                    className="inline-block p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-blue-500/20 mb-4"
                  >
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
                      alt="Logo"
                      className="w-12 h-12"
                    />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    Create Account
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-gray-400"
                  >
                    Join the future of tech
                  </motion.p>
                </div>

                {/* Error Message with Enhanced Animation */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -10, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-xl p-4 mb-6 backdrop-blur-sm overflow-hidden"
                    >
                      <div className="flex items-center gap-2">
                        <motion.svg
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </motion.svg>
                        {error}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Form Fields with Enhanced Interactions */}
                  {[
                    {
                      id: "name",
                      label: "Full Name",
                      type: "text",
                      placeholder: "Enter your full name",
                      icon: "👤",
                    },
                    {
                      id: "email",
                      label: "Email Address",
                      type: "email",
                      placeholder: "Enter your email",
                      icon: "📧",
                    },
                    {
                      id: "password",
                      label: "Password",
                      type: "password",
                      placeholder: "Create a password",
                      icon: "🔒",
                    },
                  ].map((field) => (
                    <div key={field.id}>
                      <motion.label
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 }}
                        className="block text-sm font-medium text-gray-300 mb-2"
                        htmlFor={field.id}
                      >
                        {field.label}
                      </motion.label>
                      <motion.div
                        whileFocus={{ scale: 1.01 }}
                        className="relative group"
                        onFocus={() => setActiveInput(field.id)}
                        onBlur={() => setActiveInput(null)}
                      >
                        <input
                          type={field.type}
                          id={field.id}
                          name={field.id}
                          value={form[field.id]}
                          onChange={handleChange}
                          className={`w-full pl-12 pr-4 py-3 bg-black/50 border ${
                            activeInput === field.id
                              ? "border-blue-500"
                              : "border-gray-800"
                          } rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder-gray-500 transition-all duration-300 shadow-sm group-hover:border-gray-700`}
                          placeholder={field.placeholder}
                        />
                        <motion.span
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"
                          animate={{
                            scale: activeInput === field.id ? 1.2 : 1,
                            rotate: activeInput === field.id ? 360 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          {field.icon}
                        </motion.span>
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 -z-10"></div>
                      </motion.div>
                    </div>
                  ))}

                  {/* Submit Button with Enhanced Animation */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-medium rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-blue-500/20 relative overflow-hidden group"
                  >
                    {/* Animated Gradient Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-500"></div>
                    
                    {/* Loading Animation */}
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full mr-2"
                        ></motion.div>
                        Creating Account...
                      </div>
                    ) : (
                      <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                      >
                        Create Account
                      </motion.span>
                    )}
                  </motion.button>
                </form>

                {/* Login Link with Enhanced Animation */}
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-center text-sm text-gray-400 mt-8"
                >
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 relative group inline-block"
                  >
                    <span>Log In</span>
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-500 to-purple-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    ></motion.span>
                  </Link>
                </motion.p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;
