import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../home/HeroSection';
import ServicesSection from '../home/ServicesSection';
import HowItWorksSection from '../home/HowItWorksSection';
import FeaturesSection from '../home/FeaturesSection';
import TestimonialsSection from '../home/TestimonialsSection';
import StatsSection from '../home/StatsSection';
import CTASection from '../home/CTASection';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <FeaturesSection />
      {/*<StatsSection />*/}
      <TestimonialsSection />
      <CTASection />
    </motion.div>
  );
};

export default Home;