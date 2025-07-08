import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  CreditCard,
  Star,
  MessageCircle,
  MapPin,
  Users,
  Award,
  Smartphone,
  HeadphonesIcon,
  CheckCircle,
  Zap,
  Lock
} from 'lucide-react';

const FeaturesSection = () => {
  const mainFeatures = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All our service providers go through rigorous background checks and verification processes to ensure your safety and quality service.",
      color: "from-green-500 to-emerald-500",
      // Lighter shades for the main hover effect background
      hoverColor: "from-green-100 to-emerald-100",
      stats: "100% Verified",
      benefits: ["Background checked", "Insurance covered", "Licensed professionals"]
    },
    {
      icon: Clock,
      title: "Same Day Service",
      description: "Need urgent help? Book and get same-day service for most categories. Our network of professionals is ready when you are.",
      color: "from-blue-500 to-cyan-500",
      // Lighter shades for the main hover effect background
      hoverColor: "from-blue-100 to-cyan-100",
      stats: "2hr Response",
      benefits: ["Instant booking", "Quick response", "Emergency available"]
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Pay safely with multiple payment options. Your money is protected with our secure payment gateway and refund policies.",
      color: "from-purple-500 to-pink-500",
      // Lighter shades for the main hover effect background
      hoverColor: "from-purple-100 to-pink-100",
      stats: "100% Secure",
      benefits: ["Multiple payment options", "Refund protection", "Transparent pricing"]
    }
  ];

  const additionalFeatures = [
    {
      icon: Star,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee on all services",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat",
      description: "Direct communication with service providers",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: MapPin,
      title: "Location Based",
      description: "Find services available in your exact area",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by the community, for the community",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Top Rated",
      description: "Only work with highly rated professionals",
      color: "from-amber-500 to-yellow-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Book services on-the-go with our mobile app",
      color: "from-violet-500 to-purple-500"
    }
  ];

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
    hidden: { opacity: 0, y: 50 },
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
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50" />

      {/* Animated Background Shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 w-32 h-32 border-4 border-blue-200 rounded-full opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-20 left-20 w-24 h-24 border-4 border-purple-200 rounded-full opacity-20"
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
            className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-2 mb-6 border border-blue-100/50"
          >
            <Zap className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </motion.div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Built for Your Peace of Mind
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We've designed every feature with your safety, convenience, and satisfaction in mind.
            Experience the difference with our comprehensive platform.
          </p>
        </motion.div>

        {/* Main Features */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-8 mb-16"
        >
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent relative overflow-hidden h-full">
                  {/* Background Gradient for Hover - Now uses hoverColor with custom opacity */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 0.8, scale: 1.2 }} 
                    transition={{ duration: 0.4 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.hoverColor} rounded-3xl`}
                  />

                  {/* Original Glow Effect - REMOVED from this section to avoid conflict */}
                  {/* <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-5 rounded-3xl`}
                  /> */}

                  {/* Stats Badge */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-6 right-6 bg-gray-900 text-white px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {feature.stats}
                  </motion.div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * idx }}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                          {benefit}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Additional Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16"
        >
          {additionalFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-transparent text-center relative overflow-hidden">
                  {/* Background on Hover (kept subtle for these smaller cards) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color}`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 relative z-10`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-2 text-sm">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-3xl p-8 border border-gray-100 grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* 1. 24/7 Customer Support */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <HeadphonesIcon className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">24/7</span>
            </div>
            <p className="text-sm text-gray-600">Customer Support</p>
          </div>

          {/* 2. Satisfaction Guarantee */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-8 h-8 text-green-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">100%</span>
            </div>
            <p className="text-sm text-gray-600">Satisfaction Guarantee</p>
          </div>

          {/* 3. Instant Booking */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-8 h-8 text-yellow-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Instant</span>
            </div>
            <p className="text-sm text-gray-600">Booking & Confirmation</p>
          </div>

          {/* 4. Secure Transactions */}
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Lock className="w-8 h-8 text-purple-600 mr-2" />
              <span className="text-2xl font-bold text-gray-900">Secure</span>
            </div>
            <p className="text-sm text-gray-600">Transaction Processing</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
