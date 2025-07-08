import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ArrowRight, Briefcase } from 'lucide-react';
import hero from "../../assets/hero.jpg"

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const floatingElements = [
    { icon: '🔧', delay: 0.2, x: '10%', y: '15%' },
    { icon: '🏠', delay: 0.7, x: '80%', y: '10%' },
    { icon: '💡', delay: 1.2, x: '20%', y: '70%' },
    { icon: '🔌', delay: 1.7, x: '90%', y: '70%' },
    { icon: '🚿', delay: 2.2, x: '45%', y: '5%' },
    { icon: '🧹', delay: 0.4, x: '5%', y: '40%' },
    { icon: '👷', delay: 0.9, x: '50%', y: '30%' },
    { icon: '🛠️', delay: 2.0, x: '60%', y: '65%' },
    { icon: '📦', delay: 0.6, x: '30%', y: '45%' },
    { icon: '📐', delay: 1.8, x: '85%', y: '35%' },
  ];

  // Animation variants for the right-side abstract elements
  const iconVariants = {
    initial: { opacity: 0, scale: 0.5, rotate: -30 },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 150, damping: 20 }
    }
  };

  const floatAndSpin = {
    animate: {
      y: ["0%", "-10%", "0%"],
      x: ["0%", "5%", "0%"],
      rotate: [0, 10, -10, 0],
    },
    transition: {
      duration: 8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "mirror"
    }
  };

  const pulse = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8]
    },
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatDelay: 1
    }
  };

  return (
    <div className="relative min-h-[100vh] bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-hidden pt-16">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
        />

        {/* Floating Service Icons */}
        {floatingElements.map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: [0.3, 0.7, 0.3],
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            transition={{
              duration: 3,
              delay: element.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute hidden lg:block text-4xl filter drop-shadow-lg"
            style={{ left: element.x, top: element.y }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-white/20"
            >
              <Star className="w-4 h-4 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">
                Your trusted partner for home services!
              </span>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl lg:text-7xl font-bold leading-tight"
              >
                <span className="text-gray-900">Find</span>{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Expert
                </span>
                <br />
                <span className="text-gray-900">Services</span>{' '}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Near You
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed max-w-lg"
              >
                Connect with trusted professionals for home services, repairs, and maintenance.
                Book instantly, pay securely, and get the job done right.
              </motion.p>
            </div>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl p-2 shadow-2xl border border-white/20 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row gap-2">
                <div className="flex-1 flex items-center px-4 py-3 border-r md:border-r-0 md:border-b md:pb-2 md:mb-2 lg:border-r lg:border-b-0 lg:pb-0 lg:mb-0 border-gray-200">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="What service do you need?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />
                </div>
                <div className="flex-1 flex items-center px-4 py-3">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Your location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Actions - Get Started & List Your Service */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/user-register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </motion.button>
              </Link>

              <Link to="/provider-register">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center border border-white/20"
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  List Your Service
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right Content - Complex Abstract Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative flex items-center justify-center w-full h-[400px] lg:h-[500px]"
          >
            {/* Central Animated Card/Illustration */}
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ delay: 1, ...iconVariants.animate.transition }}
              className="relative w-64 h-64 lg:w-80 lg:h-80 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl flex flex-col items-center justify-center p-6 border border-white/30 z-10"
            >
              <img src={hero} alt="hero" />

              {/* Smaller animated elements around the central card */}
              <motion.div
                variants={floatAndSpin}
                animate="animate"
                transition={{ ...floatAndSpin.transition, delay: 0.5 }}
                className="absolute -top-8 -left-8 w-16 h-16 bg-blue-400/40 rounded-full blur-xl"
              />
              <motion.div
                variants={floatAndSpin}
                animate="animate"
                transition={{ ...floatAndSpin.transition, delay: 1 }}
                className="absolute -bottom-8 -right-8 w-20 h-20 bg-purple-400/40 rounded-full blur-xl"
              />
            </motion.div>

            {/* Decorative Elements (rings from previous version, kept) */}
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-0 right-0 w-32 h-32 border-4 border-dashed border-blue-300 rounded-full opacity-30"
            />

            <motion.div
              animate={{
                rotate: [360, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute bottom-0 left-0 w-24 h-24 border-4 border-dashed border-purple-300 rounded-full opacity-30"
            />
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-20 fill-white"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path d="M0,60 C300,120 900,0 1200,60 L1200,120 L0,120 Z" />
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;