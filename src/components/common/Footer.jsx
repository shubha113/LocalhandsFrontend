import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Star,
  Users,
  Award,
  Heart,
  Smartphone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Globe,
  Download,
  Play,
  Apple,
  MessageCircle,
  Headphones,
  FileText,
  Lock,
  Eye,
  Scale,
  HelpCircle
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [hoveredService, setHoveredService] = useState(null);

  // Show scroll to top button when scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const services = [
    { name: "Plumbing", icon: "🔧", color: "from-blue-500 to-cyan-500" },
    { name: "Electrical", icon: "⚡", color: "from-yellow-500 to-orange-500" },
    { name: "Cleaning", icon: "🧽", color: "from-green-500 to-emerald-500" },
    { name: "Carpentry", icon: "🔨", color: "from-purple-500 to-pink-500" },
    { name: "Painting", icon: "🎨", color: "from-red-500 to-rose-500" },
    { name: "AC Repair", icon: "❄️", color: "from-cyan-500 to-blue-500" },
    { name: "Appliance Repair", icon: "📱", color: "from-indigo-500 to-purple-500" },
    { name: "Home Security", icon: "🔒", color: "from-gray-700 to-gray-900" }
  ];

  const cities = [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata",
    "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur"
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", color: "hover:text-blue-500", label: "Facebook" },
    { icon: Twitter, href: "#", color: "hover:text-sky-500", label: "Twitter" },
    { icon: Instagram, href: "#", color: "hover:text-pink-500", label: "Instagram" },
    { icon: Linkedin, href: "#", color: "hover:text-blue-600", label: "LinkedIn" },
    { icon: Youtube, href: "#", color: "hover:text-red-500", label: "YouTube" }
  ];

  const appDownloadLinks = [
    { 
      platform: "App Store", 
      icon: Apple, 
      subtitle: "Download on the",
      href: "#",
      color: "from-gray-800 to-black"
    },
    { 
      platform: "Google Play", 
      icon: Play, 
      subtitle: "Get it on",
      href: "#",
      color: "from-green-600 to-green-800"
    }
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "How It Works", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Contact Us", href: "#" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "#", icon: HelpCircle },
    { name: "24/7 Support", href: "#", icon: Headphones },
    { name: "Live Chat", href: "#", icon: MessageCircle },
    { name: "Service Areas", href: "#", icon: MapPin },
    { name: "Pricing", href: "#", icon: FileText },
    { name: "Safety", href: "#", icon: Shield }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#", icon: Eye },
    { name: "Terms of Service", href: "#", icon: FileText },
    { name: "Cookie Policy", href: "#", icon: Lock },
    { name: "Refund Policy", href: "#", icon: Scale }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3BhdHRlcm4+CjwvZGVmcz4KPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIgLz4KPC9zdmc+')] opacity-50" />
        
        {/* Floating Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            rotate: [360, 180, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-40 left-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
            >
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                      Stay Updated with Latest Services
                    </h3>
                    <p className="text-gray-300 text-lg">
                      Get exclusive offers, service updates, and home maintenance tips delivered to your inbox.
                    </p>
                  </motion.div>
                </div>
                <div>
                  <motion.form
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    onSubmit={handleNewsletterSubmit}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                        required
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
                    >
                      <AnimatePresence mode="wait">
                        {isSubscribed ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center"
                          >
                            <CheckCircle className="w-5 h-5 mr-2" />
                            Subscribed!
                          </motion.div>
                        ) : (
                          <motion.div
                            key="subscribe"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="flex items-center"
                          >
                            Subscribe
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center mb-6"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">ServiceHub</span>
              </motion.div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                India's most trusted home services platform. Connecting you with verified professionals for all your home needs.
              </p>

              <div className="space-y-4">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <MapPin className="w-5 h-5 mr-3 text-blue-500" />
                  <span>Serving 500+ cities across India</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Phone className="w-5 h-5 mr-3 text-green-500" />
                  <span>+91 98765 43210</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                >
                  <Mail className="w-5 h-5 mr-3 text-purple-500" />
                  <span>help@servicehub.com</span>
                </motion.div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Clock className="w-5 h-5 mr-3 text-orange-500" />
                  <span>24/7 Customer Support</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Users className="w-5 h-5 mr-2 text-blue-500" />
                Our Services
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ scale: 1.05, x: 5 }}
                    onHoverStart={() => setHoveredService(service.name)}
                    onHoverEnd={() => setHoveredService(null)}
                    className="relative group cursor-pointer"
                  >
                    <div className={`flex items-center p-3 rounded-xl border border-gray-700 hover:border-transparent transition-all duration-300 ${
                      hoveredService === service.name ? 'bg-gradient-to-r ' + service.color + ' text-white' : 'hover:bg-gray-800'
                    }`}>
                      <span className="text-lg mr-2">{service.icon}</span>
                      <span className="text-sm font-medium">{service.name}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Globe className="w-5 h-5 mr-2 text-green-500" />
                Quick Links
              </h4>
              <div className="space-y-6">
                <div>
                  <h5 className="font-semibold mb-3 text-gray-300">Company</h5>
                  <ul className="space-y-2">
                    {companyLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.02 * index }}
                      >
                        <motion.a
                          whileHover={{ x: 5 }}
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors block py-1"
                        >
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="font-semibold mb-3 text-gray-300">Support</h5>
                  <ul className="space-y-2">
                    {supportLinks.slice(0, 4).map((link, index) => {
                      const IconComponent = link.icon;
                      return (
                        <motion.li
                          key={link.name}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.02 * index }}
                        >
                          <motion.a
                            whileHover={{ x: 5 }}
                            href={link.href}
                            className="text-gray-400 hover:text-white transition-colors flex items-center py-1 group"
                          >
                            <IconComponent className="w-4 h-4 mr-2 opacity-50 group-hover:opacity-100" />
                            {link.name}
                          </motion.a>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Cities & Apps */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-bold mb-6 flex items-center">
                <Smartphone className="w-5 h-5 mr-2 text-purple-500" />
                Download App
              </h4>
              
              <div className="space-y-4 mb-8">
                {appDownloadLinks.map((app, index) => {
                  const IconComponent = app.icon;
                  return (
                    <motion.a
                      key={app.platform}
                      href={app.href}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center p-4 bg-gradient-to-r ${app.color} rounded-xl hover:shadow-xl transition-all duration-300 group`}
                    >
                      <IconComponent className="w-8 h-8 text-white mr-3" />
                      <div>
                        <div className="text-xs text-gray-300">{app.subtitle}</div>
                        <div className="font-semibold text-white">{app.platform}</div>
                      </div>
                      <ArrowRight className="w-5 h-5 text-white ml-auto group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                  );
                })}
              </div>

              <div>
                <h5 className="font-semibold mb-3 text-gray-300">Popular Cities</h5>
                <div className="grid grid-cols-2 gap-2">
                  {cities.slice(0, 8).map((city, index) => (
                    <motion.div
                      key={city}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.02 * index }}
                      whileHover={{ scale: 1.05 }}
                      className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer py-1 px-2 rounded hover:bg-gray-800"
                    >
                      {city}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <span className="text-gray-400 mr-2">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ scale: 1.2, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:bg-gray-700`}
                      aria-label={social.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </motion.div>

              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <p className="text-gray-400 mb-2">
                  © 2025 ServiceHub. All rights reserved.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm">
                  {legalLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        whileHover={{ y: -1 }}
                        className="text-gray-500 hover:text-white transition-colors flex items-center"
                      >
                        <IconComponent className="w-3 h-3 mr-1" />
                        {link.name}
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center space-x-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center bg-green-600/20 text-green-400 px-3 py-2 rounded-full text-sm border border-green-600/30"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  <span>SSL Secured</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center bg-blue-600/20 text-blue-400 px-3 py-2 rounded-full text-sm border border-blue-600/30"
                >
                  <Award className="w-4 h-4 mr-1" />
                  <span>Verified</span>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 group"
          >
            <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;