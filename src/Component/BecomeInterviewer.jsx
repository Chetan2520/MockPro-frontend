import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';
// import { Link } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardSection = () => {
  const features = [
    {
      title: "Smart Insights",
      description: "Visualize your interview journey with performance analytics and improvement trends.",
      icon: "📊"
    },
    {
      title: "Personalized Growth",
      description: "Get tailored recommendations and resources to strengthen your weak areas.",
      icon: "🚀"
    },
    {
      title: "Seamless Experience",
      description: "Everything you need — practice sessions, progress, and resources — in one dashboard.",
      icon: "🖥️"
    }
  ];

  return (
    <section className="relative bg-black py-32 px-4 overflow-hidden">
      {/* Background lines */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"
            style={{
              top: `${(i + 1) * 10}%`,
              left: '0',
              right: '0',
              transform: `translateX(${i * 20}px)`,
            }}
            animate={{ x: ['0%', '100%'] }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Professional Dashboard
              </span>
              <br />
              Your Interview Companion
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Unlock the power of MockPro’s dashboard — track progress, discover insights, and take control of your interview preparation with one intuitive platform.
            </p>
            
            <MagneticButton color="#5DA3FA"  showArrow={true}>
               <Link
                to="/dashboard" > 
                Know Your Stats
              </Link>
               </MagneticButton>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-2xl transform group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative p-8 h-full">
                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
                <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 relative"
        >
          <div className="relative w-full h-[300px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Dashboard screen */}
              <div className="relative w-72 h-44 bg-gray-900 rounded-lg transform -rotate-6">
                <div className="absolute inset-1 bg-black rounded"></div>
                <div className="absolute inset-2 bg-gray-800 rounded flex items-center justify-center">
                  <div className="w-20 h-20 bg-blue-500/20 rounded-full"></div>
                </div>
              </div>
              {/* Animated highlight */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-10 -bottom-10 w-20 h-20"
              >
                <div className="w-12 h-12 bg-purple-500/30 rounded-full"></div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardSection;
