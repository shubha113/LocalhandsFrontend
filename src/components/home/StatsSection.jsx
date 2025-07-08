import React from 'react';
import { motion } from 'framer-motion';
import {
  Users, // For happy customers
  Award, // For verified professionals
  CheckCircle, // For completed jobs
  MapPin, // For cities served
  DollarSign, // For savings/earnings
  HeartHandshake, // Could be for trust/partnerships
  TrendingUp, // For growth
  Target // For service reach
} from 'lucide-react'; // Importing more relevant icons

const StatsSection = () => {
  const statsData = [
    {
      icon: Users,
      value: "50K+",
      label: "Happy Customers",
      color: "from-blue-500 to-indigo-500",
      description: "Trusted by thousands for reliable service."
    },
    {
      icon: Award,
      value: "10K+",
      label: "Verified Professionals",
      color: "from-green-500 to-teal-500",
      description: "A growing network of top-rated experts."
    },
    {
      icon: CheckCircle,
      value: "200K+",
      label: "Completed Jobs",
      color: "from-purple-500 to-pink-500",
      description: "Successful projects delivered with excellence."
    },
    {
      icon: MapPin,
      value: "50+",
      label: "Cities Served",
      color: "from-yellow-500 to-orange-500",
      description: "Expanding our reach to serve more communities."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger effect for cards
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Subtle Background Gradients/Shapes - keeping consistent with FeaturesSection */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-1/4 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-10 right-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="inline-flex items-center bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-6 py-2 mb-4 border border-green-100/50">
            <TrendingUp className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm font-semibold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Our Achievements
            </span>
          </p>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Impactful Numbers That Speak
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Witness the growth and success of our platform through key statistics, reflecting our commitment to quality and community.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 relative overflow-hidden h-full flex flex-col justify-between items-center text-center">
                  {/* Background Gradient Effect on Hover */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ opacity: 0.15, scale: 1.2 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-3xl`}
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-20 h-20 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center mb-6 relative z-10`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>

                  {/* Value */}
                  <h3 className="text-5xl font-extrabold text-gray-900 mb-2 relative z-10">
                    {stat.value}
                  </h3>

                  {/* Label */}
                  <p className="text-xl font-semibold text-gray-700 mb-4 relative z-10">
                    {stat.label}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-500 relative z-10 leading-relaxed">
                    {stat.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
