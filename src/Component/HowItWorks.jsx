import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    title: "Sign Up",
    description: "Create your account and set up your profile in minutes",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "from-cyan-400 via-cyan-500 to-blue-600",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    accent: "cyan"
  },
  {
    title: "Select Interview",
    description: "Choose from various interview types and difficulty levels",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    color: "from-violet-400 via-violet-500 to-purple-600",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    accent: "violet"
  },
  {
    title: "Practice",
    description: "Engage in realistic interview simulations with our AI",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: "from-fuchsia-400 via-fuchsia-500 to-pink-600",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    accent: "fuchsia"
  },
  {
    title: "Get Feedback",
    description: "Receive detailed analysis and improvement suggestions",
    icon:( 
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    color: "from-rose-400 via-rose-500 to-red-600",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    accent: "rose"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-violet-400 to-rose-400 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-300/90 max-w-2xl mx-auto">
            Follow these simple steps to start your interview preparation journey
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-cyan-500/30 via-violet-500/30 to-rose-500/30 transform -translate-x-1/2"></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="hidden md:block absolute top-0 left-1/2 w-5 h-5 bg-gradient-to-r from-gray-900 to-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 ring-2 ring-gray-700/50 shadow-lg z-20">
                  <div className={`absolute inset-1 rounded-full bg-gradient-to-r ${step.color} animate-pulse`}></div>
                </div>

                <div className={`md:flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8`}>
                  <div className="md:w-1/2">
                    <motion.div
                      whileHover={{ scale: 1.02, rotate: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-800/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-gray-700/50 relative group z-10"
                    >
                      <div className="flex items-center mb-4">
                        <motion.div 
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                          className={`w-14 h-14 rounded-xl bg-gradient-to-br ${step.color} p-0.5 mr-4 shadow-lg`}
                        >
                          <div className="w-full h-full rounded-xl bg-gray-900/90 flex items-center justify-center">
                            {step.icon}
                          </div>
                        </motion.div>
                        <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-cyan-400 group-hover:to-violet-400 transition-all duration-500">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-gray-300/90 text-lg group-hover:text-white transition-colors duration-500">
                        {step.description}
                      </p>
                    </motion.div>
                  </div>

                  <div className="hidden md:block md:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
                      viewport={{ once: true }}
                      className="relative group overflow-hidden rounded-2xl shadow-2xl z-0"
                    >
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-72 object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-br from-${step.accent}-500/20 to-transparent opacity-0  transition-opacity duration-500 z-10`}></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/30 to-transparent opacity-0  transition-opacity duration-500 z-20"></div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
