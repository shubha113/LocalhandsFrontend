import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Clock,
  Users,
  Star,
  CheckCircle,
  PlayCircle,
  Laptop, // Changed from Smartphone to Laptop for website focus
  Heart,
  Award,
  TrendingUp,
  Globe, // Changed from MapPin to Globe for website focus
  Phone,
  Mail,
} from "lucide-react";

const CTASection = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const steps = [
    {
      icon: Laptop,
      title: "Visit Our Website",
      description: "Explore our services online",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Globe,
      title: "Browse Services",
      description: "Find what you need",
      color: "from-purple-500 to-pink-500", // Changed from green to purple/pink
    },
    {
      icon: Users,
      title: "Connect with Experts",
      description: "Get personalized assistance",
      color: "from-indigo-500 to-violet-500", // New gradient
    },
    {
      icon: CheckCircle,
      title: "Achieve Your Goals",
      description: "Let us help you succeed",
      color: "from-pink-500 to-red-500", // New gradient
    },
  ];

  const features = [
    { icon: Shield, text: "Verified Professionals" },
    { icon: Clock, text: "Dedicated Support" },
    { icon: Star, text: "High Customer Satisfaction" },
    { icon: Zap, text: "Prompt Service Delivery" }, // Rephrased for general service
  ];

  const floatingElements = [
    { icon: Heart, delay: 0, duration: 3 },
    { icon: Star, delay: 0.5, duration: 4 },
    { icon: Award, delay: 1, duration: 3.5 },
    { icon: Sparkles, delay: 1.5, duration: 4.5 },
    { icon: TrendingUp, delay: 2, duration: 3.8 },
  ];

  // Auto-advance steps
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [steps.length]);

  // Mouse tracking for interactive effects (kept as it is, as it adds a nice touch)
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Animated Background (gradients adjusted for white background) */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1], // Reduced opacity for light background
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-300/20 to-purple-300/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1], // Reduced opacity for light background
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-pink-300/20 to-indigo-300/20 rounded-full blur-3xl"
        />

        {/* Floating Elements */}
        {floatingElements.map((element, index) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={index}
              animate={{
                y: [-30, 30, -30],
                opacity: [0.1, 0.3, 0.1], // Adjusted opacity for light background
                rotate: [0, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: element.delay,
              }}
              className="absolute"
              style={{
                left: `${10 + index * 20}%`,
                top: `${15 + (index % 2) * 60}%`,
              }}
            >
              <IconComponent className="w-6 h-6 text-gray-300" />{" "}
              {/* Changed icon color */}
            </motion.div>
          );
        })}

        {/* Grid Pattern (adjusted opacity for light background) */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMDIiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-5" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-blue-100/50 backdrop-blur-sm rounded-full px-6 py-2 mb-8 border border-blue-200"
            >
              <Sparkles className="w-4 h-4 text-purple-600 mr-2" />{" "}
              {/* Changed icon color */}
              <span className="text-sm font-semibold text-blue-800">
                Your Go-To Platform for Premium Services
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Get Any Service
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-300%"
              >
                Done Right
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 mb-8 leading-relaxed max-w-lg mx-auto lg:mx-0"
            >
              From digital solutions to creative projects, connect with verified
              professionals tailored to your needs.
            </motion.p>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 bg-blue-100/50 backdrop-blur-sm rounded-xl p-4 border border-blue-200 hover:bg-blue-100 transition-all duration-300"
                  >
                    <IconComponent className="w-5 h-5 text-blue-600 flex-shrink-0" />{" "}
                    {/* Changed icon color */}
                    <span className="text-gray-800 text-sm font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start"
            >
              {/* Primary CTA */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <motion.div
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.div>
                </span>
              </motion.button>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="flex items-center justify-center lg:justify-start space-x-6 mt-8 text-gray-600"
            >
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span className="text-sm">help@yourservice.com</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Phone Mockup (changed to represent a laptop/website interaction) */}
            <div className="relative mx-auto w-80 h-[600px] bg-gradient-to-b from-gray-200 to-gray-400 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Phone Screen */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                  {/* Status Bar */}
                  <div className="flex justify-between items-center mb-8">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>{" "}
                      {/* Changed color */}
                      <div className="w-3 h-3 bg-purple-500 rounded-full"></div>{" "}
                      {/* Changed color */}
                      <div className="w-3 h-3 bg-pink-500 rounded-full"></div>{" "}
                      {/* Changed color */}
                    </div>
                    <div className="text-xs font-medium text-gray-600">
                      9:41 AM
                    </div>
                  </div>

                  {/* App Interface (now website interface) */}
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      How It Works
                    </h3>
                    <p className="text-sm text-gray-600">
                      Simple. Fast. Reliable.
                    </p>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    {steps.map((step, index) => {
                      const IconComponent = step.icon;
                      const isActive = index === currentStep;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{
                            opacity: isActive ? 1 : 0.4,
                            x: 0,
                            scale: isActive ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.5 }}
                          className={`relative flex items-center space-x-4 p-4 rounded-2xl border-2 transition-all duration-500 ${
                            isActive
                              ? "bg-white shadow-lg border-blue-300" // Changed border color
                              : "bg-gray-50 border-transparent" // Changed inactive background
                          }`}
                        >
                          <motion.div
                            animate={{
                              scale: isActive ? [1, 1.2, 1] : 1,
                              rotate: isActive ? [0, 360] : 0,
                            }}
                            transition={{
                              scale: { duration: 0.5 },
                              rotate: { duration: 1 },
                            }}
                            className={`w-12 h-12 rounded-full flex items-center justify-center text-white bg-gradient-to-r ${step.color}`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {step.title}
                            </h4>
                            <p className="text-sm text-gray-600">
                              {step.description}
                            </p>
                          </div>
                          {isActive && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-3 h-3 bg-blue-500 rounded-full" // Changed active indicator color
                            />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-8">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-gray-600">Progress</span>
                      <span className="text-xs text-gray-600">
                        {Math.round(((currentStep + 1) / steps.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        animate={{
                          width: `${((currentStep + 1) / steps.length) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Action Buttons (removed specific tick/zap icons, kept general concept) */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <Sparkles className="w-8 h-8 text-white" />{" "}
              {/* Example general icon */}
            </motion.div>

            <motion.div
              animate={{
                y: [0, 10, 0],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-xl"
            >
              <Heart className="w-8 h-8 text-white" />{" "}
              {/* Example general icon */}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "1M+", label: "Satisfied Users" }, // Adjusted label
              { number: "50K+", label: "Projects Completed" }, // Adjusted label
              { number: "Global", label: "Reach" }, // Adjusted label
              { number: "4.9★", label: "Average Rating" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="group cursor-pointer"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2" // Changed text color
                >
                  {stat.number}
                </motion.div>
                <p className="text-gray-700 text-sm group-hover:text-gray-900 transition-colors">
                  {" "}
                  {/* Changed text color */}
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
