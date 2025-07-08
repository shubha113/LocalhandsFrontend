import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Home, Zap, Droplets, Car, Paintbrush, Shield, Scissors } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ServicesSection = () => {
  const navigate = useNavigate();

  const handleViewServicesClick = () => {
    navigate('/services'); 
  };
  const services = [
    {
      icon: Wrench,
      title: 'Plumbing',
      description: 'Expert plumbing repairs, installations, and maintenance',
      color: 'from-blue-500 to-cyan-500',
      jobs: '2.3K+ jobs',
    },
    {
      icon: Zap,
      title: 'Electrical',
      description: 'Professional electrical work and emergency repairs',
      color: 'from-yellow-500 to-orange-500',
      jobs: '1.8K+ jobs',
    },
    {
      icon: Home,
      title: 'Home Cleaning',
      description: 'Deep cleaning and regular maintenance services',
      color: 'from-green-500 to-emerald-500',
      jobs: '3.1K+ jobs',
    },
    {
      icon: Paintbrush,
      title: 'Painting',
      description: 'Interior and exterior painting by professionals',
      color: 'from-purple-500 to-pink-500',
      jobs: '1.5K+ jobs',
    },
    {
      icon: Car,
      title: 'AC Repair',
      description: 'Air conditioning installation and repair services',
      color: 'from-cyan-500 to-blue-500',
      jobs: '2.1K+ jobs',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Home security system installation and monitoring',
      color: 'from-red-500 to-pink-500',
      jobs: '980+ jobs',
    },
    {
      icon: Droplets,
      title: 'Appliance Repair',
      description: 'Washing machine, refrigerator, and appliance fixes',
      color: 'from-indigo-500 to-purple-500',
      jobs: '1.7K+ jobs',
    },
    {
      icon: Scissors,
      title: 'Beauty & Wellness',
      description: 'At-home salon, parlour and wellness services',
      color: 'from-pink-500 to-rose-500',
      jobs: '1.2K+ jobs',
    },
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
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
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
            className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-2 mb-6"
          >
            <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Popular Services
            </span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Service Do You Need?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Browse through our wide range of professional services. From home repairs to personal care, 
            we've got trusted experts ready to help.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent relative overflow-hidden">
                  {/* Gradient Background on Hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.05 }}
                    className={`absolute inset-0 bg-gradient-to-br ${service.color} transition-opacity duration-300`}
                  />
                  
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                    className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 relative z-10`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-500">
                        {service.jobs}
                      </span>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="text-blue-600 text-sm font-semibold flex items-center"
                        onClick={handleViewServicesClick} 
                      >
                        View All
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.color} opacity-10 -z-10`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* View All Services Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewServicesClick} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 inline-flex items-center"
          >
            View All Services
            <motion.svg
              whileHover={{ x: 5 }}
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </motion.div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-8 bg-gray-50 rounded-2xl px-8 py-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700">24/7 Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Verified Professionals</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">⚡</span>
              <span className="text-sm font-medium text-gray-700">Same Day Service</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;