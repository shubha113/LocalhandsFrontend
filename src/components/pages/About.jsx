import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Users,
  Shield,
  Clock,
  Star,
  Target,
  Heart,
  Zap,
  Award,
  Globe,
  ArrowRight,
  Quote,
  Briefcase,
  Code,
  Database,
  CheckCircle,
  MessageCircle,
  CreditCard,
  MapPin,
  Search,
  Linkedin,
  Twitter,
  Sparkles,
  Rocket,
  Lightbulb,
} from "lucide-react";
import founder from '../../assets/semwal.jpg'

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  const stats = [
    {
      icon: Users,
      label: "Registered Users",
      value: "500+",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Briefcase,
      label: "Verified Professionals",
      value: "50+",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: CheckCircle,
      label: "Services Available",
      value: "20+",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Star,
      label: "Avg. User Rating",
      value: "4.9/5",
      color: "from-yellow-500 to-orange-500",
    },
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation First",
      description:
        "We leverage cutting-edge technology including AI-powered features to create the smartest home services platform.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Heart,
      title: "Community Focused",
      description:
        "Starting from Ludhiana, we're building a platform that truly understands local needs and preferences.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Zap,
      title: "Seamless Experience",
      description:
        "From booking to payment to reviews, every interaction is designed to be smooth and intuitive.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Shield,
      title: "Trust & Verification",
      description:
        "Comprehensive KYC verification, background checks, and a robust rating system ensure quality and safety.",
      color: "from-green-500 to-emerald-500",
    },
  ];

  const team = [
    {
      name: "Shubham Semwal",
      role: "Founder & Chief Technology Officer",
      image: founder,
      bio: "Tech-driven full-stack developer focused on building reliable and scalable platforms that connect people with trusted service providers. With hands-on experience in the MERN stack, cloud infrastructure, and AI integrations, I’m passionate about solving real-world problems through clean architecture and user-focused solutions. Dedicated to creating seamless digital experiences that empower both users and service professionals.",
      expertise: ["Full-Stack Development", "System Architecture", "Product Strategy", "Team Leadership"],
      achievement: "Led end-to-end development of multiple products, including a prior startup, with emphasis on reliability, scalability, and intuitive user experience.",
      color: "from-blue-500 to-purple-500",
      social: { linkedin: '#', twitter: '#' },
      experience: "3+ Years",
      projects: "15+ Projects",
    },
  ];

  // Testimonials updated for early launch feedback
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Local Business Owner, Ludhiana",
      quote:
        "The platform is exactly what Ludhiana needed! Easy to use and already connecting me with new clients.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Homemaker, Ludhiana",
      quote:
        "Just used it for the first time and I'm impressed! Finding a reliable service has never been this straightforward.",
      rating: 5,
    },
    {
      name: "Manpreet Singh",
      role: "Service Professional, Ludhiana",
      quote:
        "Signing up was simple, and the payment process is so smooth. This platform is a game-changer for professionals.",
      rating: 5,
    },
  ];

  // Updated realistic timeline for your startup journey, leading to a recent launch
  const timeline = [
    {
      year: "2024 Q1",
      title: "Idea & Market Research",
      description:
        "Identified the gap in reliable home services marketplace in Punjab. Conducted extensive market research and competitor analysis.",
      icon: Target,
      color: "from-blue-500 to-cyan-500",
    },
    {
      year: "2024 Q2",
      title: "Technical Planning",
      description:
        "Designed the complete system architecture, chose technology stack (MERN), and planned all 14 core modules.",
      icon: Code,
      color: "from-green-500 to-emerald-500",
    },
    {
      year: "2024 Q3",
      title: "Core Development",
      description:
        "Built authentication system, user profiles, service provider onboarding, booking system, and payment integration.",
      icon: Database,
      color: "from-purple-500 to-pink-500",
    },
    {
      year: "2024 Q4",
      title: "Advanced Features & Testing",
      description:
        "Implemented real-time chat, reviews system, admin panel, AI-powered features, and comprehensive testing.",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
    {
      year: "June 2025",
      title: "Official Launch!",
      description:
        "Excitedly launched our platform to bring reliable, efficient home services to Ludhiana and beyond.",
      icon: Award,
      color: "from-red-500 to-pink-500",
    },
  ];

  // Key features of your platform - Integrated directly into the main section
  const features = [
    {
      icon: Users,
      title: "Dual-Sided Platform",
      description: "Seamless experience for both customers and service providers.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "KYC Verified Pros",
      description: "Comprehensive background and Aadhar/PAN verification for trust.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Instant communication between customers and providers.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Razorpay integration with automatic commission handling for peace of mind.",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MapPin,
      title: "Location-Based Matching",
      description: "Smartly connects you with local service providers in your area.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Search,
      title: "AI-Powered Suggestions",
      description: "Intelligent algorithms suggest the best services for your needs.",
      color: "from-orange-500 to-rose-500"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Spacer for Navbar */}
      <div className="pt-20 sm:pt-24 lg:pt-28" />

      {/* NEW REDESIGNED HERO SECTION */}
      <section className="relative min-h-[calc(100vh-theme(spacing.20))] flex items-center justify-center overflow-hidden">
        {/* Dynamic Background with Floating Shapes */}
        <div className="absolute inset-0">
          {/* Gradient Background */}
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
          />
          
          {/* Large Floating Shapes */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
          />
          
          {/* Floating Icons */}
          {[
            { icon: Code, position: "top-1/4 left-1/4", delay: 0 },
            { icon: Rocket, position: "top-1/3 right-1/4", delay: 2 },
            { icon: Lightbulb, position: "bottom-1/3 left-1/5", delay: 4 },
            { icon: Target, position: "bottom-1/4 right-1/3", delay: 6 },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 0.6, 0],
                scale: [0.8, 1.2, 0.8],
                y: [-20, 20, -20],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: item.delay,
              }}
              className={`absolute ${item.position} w-16 h-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center`}
            >
              <item.icon className="w-8 h-8 text-blue-600" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-blue-200 rounded-full px-8 py-3 mb-8"
            >
              <Sparkles className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Proudly Built in India, to Serve India
              </span>
              <Sparkles className="w-5 h-5 text-purple-600 ml-3" />
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Where Innovation Meets
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  Home Services
                </motion.span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                A next-generation platform that bridges the gap between homeowners and skilled professionals, 
                powered by cutting-edge technology and built with a vision to transform local services.
              </p>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12"
            >
              {[
                { icon: Shield, text: "100% Verified Professionals", color: "from-green-500 to-emerald-500" },
                { icon: Zap, text: "Instant Booking & Chat", color: "from-blue-500 to-cyan-500" },
                { icon: Award, text: "AI-Powered Matching", color: "from-purple-500 to-pink-500" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-gray-700 font-semibold">{item.text}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6"
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ scale: 1 }}
                    whileInView={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-4xl lg:text-5xl font-bold text-white mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <p className="text-blue-100 text-lg font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Platform Highlights
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with you in mind, offering unparalleled convenience and reliability.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Guiding Principles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The core values that drive our commitment to excellence
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-2xl p-2 shadow-lg">
              {['mission', 'vision', 'values'].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-xl font-semibold capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {activeTab === 'mission' && (
                <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    To connect every household in India with reliable, verified service professionals, making everyday tasks effortless and building a trusted community.
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="text-center bg-white rounded-3xl p-12 shadow-xl">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Globe className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h3>
                  <p className="text-xl text-gray-600 leading-relaxed">
                    To be the leading digital marketplace for home services in India, recognized for our innovation, trust, and exceptional user experience.
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {values.map((value, index) => {
                    const IconComponent = value.icon;
                    return (
                      <motion.div
                        key={value.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5 }}
                        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl flex items-center justify-center mb-6`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h4>
                        <p className="text-gray-600 leading-relaxed">{value.description}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Our Journey to Launch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From conception to the moment we went live for you
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />

            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className={`relative flex items-center mb-16 ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg z-10">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <div className="w-5/12" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* NEW REDESIGNED FOUNDER SECTION */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-10 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-yellow-400/20 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Meet Our Founder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The visionary behind our mission to revolutionize home services.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
            {team.map((member, index) => (
              <React.Fragment key={index}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="w-full lg:w-1/3 flex flex-col items-center"
                >
                  <div className="relative mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full object-cover border-4 border-blue-500 shadow-lg transform transition-transform duration-300 hover:scale-105"
                    />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-4 border-dashed border-purple-300 rounded-full animate-spin-slow"
                    />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2 text-center">{member.name}</h3>
                  <p className="text-blue-600 text-lg font-semibold mb-4 text-center">{member.role}</p>
                  <div className="flex gap-4 mb-6">
                    {member.social.linkedin && (
                      <motion.a
                        href={member.social.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: '#0A66C2' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-8 h-8" />
                      </motion.a>
                    )}
                    {member.social.twitter && (
                      <motion.a
                        href={member.social.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2, color: '#1DA1F2' }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="w-8 h-8" />
                      </motion.a>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                    <motion.div whileHover={{ y: -3 }} className="bg-blue-50 rounded-lg p-3 text-center shadow-sm flex items-center justify-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">{member.experience} Experience</span>
                    </motion.div>
                    <motion.div whileHover={{ y: -3 }} className="bg-purple-50 rounded-lg p-3 text-center shadow-sm flex items-center justify-center gap-2">
                      <Code className="w-5 h-5 text-purple-600" />
                      <span className="text-sm font-medium text-gray-700">{member.projects} Projects</span>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="w-full lg:w-2/3 lg:pl-12 text-center lg:text-left"
                >
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {member.bio}
                  </p>
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-3">Expertise:</h4>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                      {member.expertise.map((exp, expIndex) => (
                        <span
                          key={expIndex}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full shadow-sm hover:bg-blue-200 transition-colors"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-xl shadow-md transform transition-transform hover:scale-[1.02]"
                  >
                    <div className="flex items-center">
                      <Award className="w-7 h-7 mr-4" />
                      <p className="font-semibold text-lg">Key Achievement: <span className="block sm:inline">{member.achievement}</span></p>
                    </div>
                  </motion.div>
                </motion.div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What Our Early Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear directly from the community that's experiencing our service.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 max-w-4xl mx-auto"
          >
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial, index) =>
                index === currentTestimonial ? (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="text-center"
                  >
                    <Quote className="w-16 h-16 text-blue-200 mx-auto mb-6" />
                    <p className="text-2xl italic text-gray-700 mb-8 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="font-bold text-gray-900 text-xl">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-600 font-medium mb-4">
                      {testimonial.role}
                    </div>
                    <div className="flex justify-center items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                      ))}
                      {[...Array(5 - testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-6 h-6 text-gray-300" />
                      ))}
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? "bg-blue-600 w-6" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section (Replaced 'Get in Touch') */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Experience the Future of Home Services?
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
              Whether you need a service or want to offer one, we've got you covered.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/90 backdrop-blur-sm text-blue-800 px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center text-lg"
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center text-lg"
            >
              <Users className="w-5 h-5 mr-2" />
              Join as Professional
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Footer (Optional, but good practice for completeness) */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="mb-4">© {new Date().getFullYear()} HomeServices. All rights reserved.</p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span className="text-gray-600">|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;