import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  UserCheck,
  Calendar,
  MessageCircle,
  CreditCard,
  Star,
} from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Search,
      step: "01",
      title: "Search & Browse",
      description:
        "Find the perfect service provider by Browse categories or searching for specific services in your area.",
      color: "from-blue-500 to-cyan-500",
      details: [
        "Browse 50+ service categories",
        "Filter by location & ratings",
        "Compare prices & reviews",
      ],
    },
    {
      icon: UserCheck,
      step: "02",
      title: "Choose Provider",
      description:
        "Select from verified professionals with ratings, reviews, and portfolios to make an informed choice.",
      color: "from-purple-500 to-pink-500",
      details: [
        "View provider profiles",
        "Check ratings & reviews",
        "See past work portfolio",
      ],
    },
    {
      icon: Calendar,
      step: "03",
      title: "Book Service",
      description:
        "Schedule your service at a convenient time and provide job details for accurate pricing.",
      color: "from-green-500 to-emerald-500",
      details: [
        "Pick date & time",
        "Add job description",
        "Get instant quotes",
      ],
    },
    {
      icon: MessageCircle,
      step: "04",
      title: "Stay Connected",
      description:
        "Chat with your provider in real-time to discuss details and track job progress.",
      color: "from-orange-500 to-red-500",
      details: [
        "Real-time messaging",
        "Job status updates",
        "Direct communication",
      ],
    },
    {
      icon: CreditCard,
      step: "05",
      title: "Secure Payment",
      description:
        "Pay securely after job completion through our integrated payment system with multiple options.",
      color: "from-indigo-500 to-purple-500",
      details: [
        "Multiple payment methods",
        "Secure transactions",
        "Pay after completion",
      ],
    },
    {
      icon: Star,
      step: "06",
      title: "Rate & Review",
      description:
        "Share your experience and help others by rating the service and leaving detailed feedback.",
      color: "from-pink-500 to-rose-500",
      details: [
        "Rate your experience",
        "Leave detailed reviews",
        "Upload photos",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: "easeInOut",
        delay: 0.5,
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.05'%3E%3Cpolygon points='50 0 60 40 100 50 60 60 50 100 40 60 0 50 40 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-10 blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 right-16 w-32 h-32 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-10 blur-xl"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-purple-50 to-blue-50 rounded-full px-6 py-2 mb-6 border border-purple-100/50"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Simple Process
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Getting the help you need is simple. Follow these easy steps to
            connect with trusted professionals and get your tasks done
            seamlessly.
          </p>
        </motion.div>

        {/* Desktop Layout */}
        <div className="hidden lg:block">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Connecting Lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ zIndex: 0 }}
            >
              <motion.path
                variants={lineVariants}
                d="M 200 150 Q 400 100 600 150 T 1000 150 T 1400 150"
                stroke="url(#gradient)"
                strokeWidth="3"
                fill="none"
                strokeDasharray="10,5"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#EC4899" stopOpacity="0.3" />
                </linearGradient>
              </defs>
            </svg>

            {/* Steps Grid */}
            <div className="grid grid-cols-3 gap-8 relative z-10">
              {steps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    variants={stepVariants}
                    className={`${index % 2 === 1 ? "mt-16" : ""}`}
                  >
                    <motion.div
                      whileHover={{
                        y: -10,
                        scale: 1.02,
                        transition: { duration: 0.3 },
                      }}
                      className="group cursor-pointer"
                    >
                      <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden">
                        {/* Background Gradient on Hover */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 0.1, scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          className={`absolute inset-0 bg-gradient-to-br ${step.color} rounded-3xl`}
                        />

                        {/* Step Number - Adjusted for better visibility */}
                        <motion.div
                          whileHover={{ rotate: 5 }}
                          className="absolute -top-1 right-0 w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl flex items-center justify-center"
                        >
                          <span className="text-white font-bold text-sm">
                            {step.step}
                          </span>
                        </motion.div>

                        {/* Icon */}
                        <motion.div
                          whileHover={{ rotate: 10, scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                          className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                        >
                          <IconComponent className="w-10 h-10 text-white" />
                        </motion.div>

                        {/* Content */}
                        <div className="relative z-10">
                          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 mb-6 leading-relaxed">
                            {step.description}
                          </p>

                          {/* Details List */}
                          <ul className="space-y-2">
                            {step.details.map((detail, idx) => (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center text-sm text-gray-500"
                              >
                                <div
                                  className={`w-2 h-2 bg-gradient-to-r ${step.color} rounded-full mr-3`}
                                />
                                {detail}
                              </motion.li>
                            ))}
                          </ul>
                        </div>

                        {/* Hover Glow Effect */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-5 rounded-3xl -z-10`}
                        />
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.step}
                  variants={stepVariants}
                  className="relative"
                >
                  {/* Connecting Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-10 top-24 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-purple-300 opacity-30" />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-start space-x-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                  >
                    {/* Icon & Step */}
                    <div className="flex-shrink-0">
                      <motion.div
                        whileHover={{ rotate: 5 }}
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center relative`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                        {/* Step Number - Adjusted for better visibility on mobile */}
                        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-800 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-xs">
                            {step.step}
                          </span>
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {step.description}
                      </p>
                      <ul className="space-y-1">
                        {step.details.map((detail, idx) => (
                          <li
                            key={idx}
                            className="flex items-center text-xs text-gray-500"
                          >
                            <div
                              className={`w-1.5 h-1.5 bg-gradient-to-r ${step.color} rounded-full mr-2`}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-20"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl cursor-pointer group"
          >
            <span>Get Started Now</span>
            <motion.svg
              whileHover={{ x: 5 }}
              className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </motion.svg>
          </motion.div>

          <p className="text-gray-500 text-sm mt-4">
            Join thousands of satisfied customers today
          </p>
        </motion.div>
        <div>
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
          />{" "}
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
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;