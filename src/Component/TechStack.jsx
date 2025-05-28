import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


const techStack = [
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    color: "from-cyan-400/20 to-blue-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(97,218,251,0.3)]",
    border: "border-cyan-500/30",
    description: "Modern UI framework for building interactive user interfaces",
    category: "Frontend"
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "from-emerald-400/20 to-green-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(104,160,99,0.3)]",
    border: "border-emerald-500/30",
    description: "JavaScript runtime for scalable server-side applications",
    category: "Backend"
  },
  {
    name: "Express.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    color: "from-gray-400/20 to-gray-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
    border: "border-gray-500/30",
    description: "Fast, minimalist web framework for Node.js",
    category: "Backend"
  },
  {
    name: "MongoDB",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    color: "from-green-400/20 to-emerald-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(77,195,84,0.3)]",
    border: "border-green-500/30",
    description: "Flexible NoSQL database for modern applications",
    category: "Database"
  },
  {
    name: "Tailwind CSS",
    logo: "https://tse1.mm.bing.net/th?id=OIP.JVUeX1q_sxk_-FC-zjw87QHaH5&pid=Api&P=0&h=220",
    color: "from-cyan-400/20 to-blue-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]",
    border: "border-cyan-500/30",
    description: "Utility-first CSS framework for rapid UI development",
    category: "Frontend"
  },
  {
    name: "Google Gemini",
    logo: "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/gemini-color.png",
    color: "from-emerald-400/20 to-teal-500/20",
    glow: "hover:shadow-[0_0_30px_rgba(16,163,127,0.3)]",
    border: "border-emerald-500/30",
    description: "Advanced AI for intelligent interview simulations",
    category: "AI"
  }
];

const TechStack = () => {
  const [selectedTech, setSelectedTech] = useState(null);
  const [hoveredTech, setHoveredTech] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", ...new Set(techStack.map(tech => tech.category))];
  const filteredTech = activeCategory === "All" 
    ? techStack 
    : techStack.filter(tech => tech.category === activeCategory);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
        
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.8, 0.5, 0.8],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 mb-4">
            Built With Modern Tech
          </h2>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
            Powered by cutting-edge technologies to deliver the best experience
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTech.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
              onHoverStart={() => setHoveredTech(index)}
              onHoverEnd={() => setHoveredTech(null)}
              onClick={() => setSelectedTech(selectedTech === index ? null : index)}
            >
              <motion.div
                className={`w-full rounded-2xl bg-gradient-to-br ${tech.color} border ${tech.border} p-6 cursor-pointer relative overflow-hidden group`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Card glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"
                  animate={{
                    opacity: hoveredTech === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Tech content */}
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-4">
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-12 h-12 object-contain"
                      animate={{
                        scale: hoveredTech === index ? 1.2 : 1,
                        rotate: hoveredTech === index ? 5 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    />
                    <div>
                      <motion.h3
                        className="text-xl font-semibold text-gray-200"
                        animate={{
                          y: hoveredTech === index ? -5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        {tech.name}
                      </motion.h3>
                      <span className="text-sm text-gray-400">{tech.category}</span>
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedTech === index && (
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-300 text-sm"
                      >
                        {tech.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack; 