import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Users,
  Heart,
  Award,
  Sparkles,
  ArrowRight
} from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Homeowner",
      location: "Mumbai, Maharashtra",
      avatar: "PS",
      rating: 5,
      text: "Amazing experience! The plumber arrived exactly on time and fixed my kitchen sink perfectly. The booking process was so smooth, and I loved being able to track everything in real-time.",
      service: "Plumbing Repair",
      timeAgo: "2 weeks ago",
      verified: true,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      role: "Business Owner",
      location: "Delhi, NCR",
      avatar: "RK",
      rating: 5,
      text: "I needed urgent electrical work for my office, and they delivered! Same-day service, professional electrician, and transparent pricing. This platform is a game-changer for busy professionals.",
      service: "Electrical Work",
      timeAgo: "1 week ago",
      verified: true,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      name: "Anita Patel",
      role: "Working Mother",
      location: "Bangalore, Karnataka",
      avatar: "AP",
      rating: 5,
      text: "As a working mom, finding reliable help is crucial. The house cleaning service was exceptional - thorough, trustworthy, and the staff was so polite. I've already booked them for next month!",
      service: "House Cleaning",
      timeAgo: "3 days ago",
      verified: true,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Vikram Singh",
      role: "Senior Citizen",
      location: "Pune, Maharashtra",
      avatar: "VS",
      rating: 5,
      text: "The AC repair service was outstanding. The technician explained everything clearly and even gave me maintenance tips. At my age, having such reliable service just a tap away is incredibly reassuring.",
      service: "AC Repair",
      timeAgo: "5 days ago",
      verified: true,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      name: "Meera Reddy",
      role: "IT Professional",
      location: "Hyderabad, Telangana",
      avatar: "MR",
      rating: 5,
      text: "Booked a carpenter for furniture assembly and was blown away by the quality. The app's chat feature made communication seamless, and the work was completed ahead of schedule. Highly recommend!",
      service: "Carpentry",
      timeAgo: "1 week ago",
      verified: true,
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 6,
      name: "Arjun Gupta",
      role: "Small Business Owner",
      location: "Chennai, Tamil Nadu",
      avatar: "AG",
      rating: 5,
      text: "Used this platform for multiple services - painting, cleaning, and maintenance. Every single experience has been fantastic. The quality control and customer service is top-notch!",
      service: "Multiple Services",
      timeAgo: "4 days ago",
      verified: true,
      color: "from-violet-500 to-purple-500"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Customers", icon: Users, color: "text-blue-600" },
    { number: "4.9", label: "Average Rating", icon: Star, color: "text-yellow-600" },
    { number: "10K+", label: "Services Completed", icon: Award, color: "text-green-600" },
    { number: "99%", label: "Satisfaction Rate", icon: Heart, color: "text-red-600" }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % testimonials.length;
      visible.push({ ...testimonials[index], position: i });
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100  relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-10 right-10 w-64 h-64 border border-blue-200/30 rounded-full"
        />
        <motion.div
          animate={{ 
            rotate: -360,
            scale: [1.1, 1, 1.1]
          }}
          transition={{ 
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-20 left-10 w-48 h-48 border border-purple-200/30 rounded-full"
        />
        
        {/* Floating Sparkles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8
            }}
            className="absolute"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 2) * 40}%`
            }}
          >
            <Sparkles className="w-4 h-4 text-blue-400/50" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 rounded-full px-6 py-2 mb-6 border border-yellow-100/50"
          >
            <Star className="w-4 h-4 text-yellow-600 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              Customer Stories
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real experiences from real people who trusted us with their home services.
            Join thousands of satisfied customers across India.
          </p>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 10 }}
                  className="flex items-center justify-center mb-3"
                >
                  <IconComponent className={`w-8 h-8 ${stat.color} mr-2`} />
                  <span className="text-3xl lg:text-4xl font-bold text-gray-900">
                    {stat.number}
                  </span>
                </motion.div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Testimonials Carousel */}
        <div className="relative">
          {/* Controls */}
          <div className="flex items-center justify-between mb-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {isAutoPlaying ? (
                <Pause className="w-4 h-4 text-gray-600" />
              ) : (
                <Play className="w-4 h-4 text-gray-600" />
              )}
              <span className="text-sm font-medium text-gray-600">
                {isAutoPlaying ? 'Pause' : 'Play'}
              </span>
            </motion.button>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-3 bg-white rounded-full shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
              </motion.button>
            </div>
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <AnimatePresence mode="wait">
              {getVisibleTestimonials().map((testimonial, index) => (
                <motion.div
                  key={`${testimonial.id}-${currentIndex}`}
                  initial={{ 
                    opacity: 0, 
                    y: 50,
                    scale: 0.9
                  }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: testimonial.position === 1 ? 1.05 : 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    y: -50,
                    scale: 0.9
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1
                  }}
                  whileHover={{ 
                    y: -10,
                    scale: 1.02
                  }}
                  onHoverStart={() => setHoveredCard(testimonial.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                  className={`relative group cursor-pointer ${
                    testimonial.position === 1 ? 'lg:z-10' : ''
                  }`}
                >
                  <div className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden h-full ${
                    testimonial.position === 1 ? 'ring-2 ring-blue-200 ring-opacity-50' : ''
                  }`}>
                    {/* Background Gradient */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: hoveredCard === testimonial.id ? 0.05 : 0,
                        scale: hoveredCard === testimonial.id ? 1.2 : 0.8
                      }}
                      transition={{ duration: 0.4 }}
                      className={`absolute inset-0 bg-gradient-to-br ${testimonial.color} rounded-3xl`}
                    />

                    {/* Quote Icon */}
                    <motion.div
                      animate={{ 
                        rotate: hoveredCard === testimonial.id ? 10 : 0,
                        scale: hoveredCard === testimonial.id ? 1.1 : 1
                      }}
                      className="absolute top-6 right-6 opacity-10"
                    >
                      <Quote className="w-12 h-12 text-gray-400" />
                    </motion.div>

                    {/* Rating */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center mb-4"
                    >
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                        >
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </motion.div>

                    {/* Testimonial Text */}
                    <blockquote className="text-gray-700 mb-6 leading-relaxed relative z-10">
                      "{testimonial.text}"
                    </blockquote>

                    {/* Service Tag */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`inline-block bg-gradient-to-r ${testimonial.color} text-white px-3 py-1 rounded-full text-xs font-semibold mb-4`}
                    >
                      {testimonial.service}
                    </motion.div>

                    {/* Author Info */}
                    <div className="flex items-center relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-12 h-12 bg-gradient-to-br ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold mr-4`}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <h4 className="font-bold text-gray-900">
                            {testimonial.name}
                          </h4>
                          {testimonial.verified && (
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              className="ml-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center"
                            >
                              <span className="text-white text-xs font-bold">✓</span>
                            </motion.div>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                        <p className="text-xs text-gray-500">{testimonial.location} • {testimonial.timeAgo}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Pagination Dots */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full px-8 py-4 font-semibold hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <span>Join Our Happy Customers</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
          <p className="text-gray-600 mt-4 text-sm">
            Book your first service today and experience the difference
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;