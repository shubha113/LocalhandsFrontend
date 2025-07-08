import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Shield,
  ChevronDown,
  Grid3X3,
  List,
  Wrench,
  Car,
  Scissors,
  Camera,
  GraduationCap,
  Sparkles,
  Heart,
  Briefcase,
  HardHat,
  MoreHorizontal,
  UserCheck,
  Users,
  ChevronRight,
} from "lucide-react";
import { getCategoryStats } from "../../redux/slices/bookingSlice";

const Services = () => {
  const dispatch = useDispatch();
  const { categoryStats } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [priceRange, setPriceRange] = useState("All");
  const [rating, setRating] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredServices, setFilteredServices] = useState([]);

  const categories = [
    "All",
    "Home Repair & Maintenance",
    "Cleaning & Housekeeping",
    "Beauty & Wellness",
    "Automotive Services",
    "Personal & Errands",
    "Tutoring & Education",
    "Event Services",
    "Pet Care",
    "Professional Services",
    "Daily Wage Labor",
    "Other",
  ];

  const locations = [
    "All Locations",
    "Mumbai",
    "Delhi",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Hyderabad",
    "Pune",
    "Ahmedabad",
  ];

  const priceRanges = [
    "All",
    "₹0 - ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "₹2000+",
  ];

  const ratings = ["All", "4.5+", "4.0+", "3.5+", "3.0+"];

  const allServices = [
    {
      id: 1,
      icon: Wrench,
      title: "Home Repair & Maintenance",
      category: "Home Repair & Maintenance",
      description:
        "Complete home repair solutions from plumbing to electrical work",
      color: "from-blue-500 to-cyan-500",
      startingPrice: 299,
      responseTime: "30 mins",
      features: [
        "24/7 Available",
        "Licensed Professionals",
        "Warranty Included",
      ],
      subcategories: [
        "Plumbing",
        "Electrical",
        "Carpentry",
        "Painting",
        "Appliance Repair",
        "HVAC Repair",
        "Handyman Services",
        "Roofing",
        "Masonry",
        "Pest Control",
        "Gardening & Landscaping",
        "Waterproofing",
        "Home Security Systems",
        "Intercom & Doorbell Repair",
        "Furniture Assembly",
        "Smart Home Device Setup",
      ],
      popularServices: [
        "Plumbing",
        "Electrical",
        "Gardening & Landscaping",
        "Painting",
        "Carpentry",
        "Appliance Repair",
        "Home Security Systems",
      ],
    },
    {
      id: 2,
      icon: Sparkles,
      title: "Cleaning & Housekeeping",
      category: "Cleaning & Housekeeping",
      description:
        "Professional cleaning services for homes and commercial spaces",
      color: "from-green-500 to-emerald-500",
      startingPrice: 199,
      responseTime: "2 hours",
      features: ["Eco-friendly Products", "Insured Staff", "Flexible Timing"],
      subcategories: [
        "Home Cleaning (Deep)",
        "Home Cleaning (Standard)",
        "Commercial Cleaning",
        "Sofa & Carpet Cleaning",
        "Bathroom Cleaning",
        "Kitchen Cleaning",
        "Window Cleaning",
        "Pressure Washing",
        "Move-in/Move-out Cleaning",
        "Laundry & Ironing",
        "Maid Service",
      ],
      popularServices: [
        "Home Cleaning(Deep)",
        "Sofa & Carpet Cleaning",
        "Maid Service",
        "Bathroom Cleaning",
        "Kitchen Cleaning",
      ],
    },
    {
      id: 3,
      icon: Scissors,
      title: "Beauty & Wellness",
      category: "Beauty & Wellness",
      description:
        "At-home beauty and wellness services by certified professionals",
      color: "from-pink-500 to-rose-500",
      startingPrice: 599,
      responseTime: "2 hours",
      features: [
        "Certified Professionals",
        "Premium Products",
        "Hygiene Priority",
      ],
      subcategories: [
        "Haircut & Styling (Men)",
        "Haircut & Styling (Women)",
        "Manicure & Pedicure",
        "Facial",
        "Massage Therapy",
        "Makeup Artist",
        "Waxing",
        "Bridal Services",
        "Yoga & Fitness Trainer",
        "Dietitian & Nutritionist",
      ],
      popularServices: [
        "Haircut & Styling",
        "Massage Therapy",
        "Facial",
        "Bridal Services",
        "Makeup Artist",
        "Manicure & Pedicure",
      ],
    },
    {
      id: 4,
      icon: Car,
      title: "Automotive Services",
      category: "Automotive Services",
      description: "Complete automotive care and detailed maintenance services",
      color: "from-orange-500 to-red-500",
      startingPrice: 349,
      responseTime: "1 hour",
      features: ["All Brands Supported", "Doorstep Service", "Quality Parts"],
      subcategories: [
        "Car Repair & Maintenance",
        "Bike Repair & Maintenance",
        "Car Washing & Detailing",
        "Tyre Repair & Replacement",
        "Battery Replacement",
        "Roadside Assistance",
        "Vehicle Inspection",
      ],
      popularServices: [
        "Car Repair & Maintenance",
        "Car Washing & Detailing",
        "Roadside Assistance",
        "Battery Replacement",
      ],
    },
    {
      id: 5,
      icon: UserCheck,
      title: "Personal & Errands",
      category: "Personal & Errands",
      description:
        "Personal assistance and errand services to make life easier",
      color: "from-purple-500 to-indigo-500",
      startingPrice: 199,
      responseTime: "1 hour",
      features: [
        "Trusted Professionals",
        "Background Verified",
        "Flexible Scheduling",
      ],
      subcategories: [
        "Grocery Delivery",
        "Document Delivery",
        "Personal Shopping",
        "Elderly Care",
        "Child Care / Babysitting",
        "Courier Services",
        "Queueing Services",
      ],
      popularServices: [
        "Grocery Delivery",
        "Child Care / Babysitting",
        "Elderly Care",
        "Personal Shopping",
      ],
    },
    {
      id: 6,
      icon: HardHat,
      title: "Daily Wage Labor",
      category: "Daily Wage Labor",
      description:
        "Reliable and skilled daily wage workers for various manual tasks",
      color: "from-yellow-500 to-orange-500",
      startingPrice: 299,
      responseTime: "1 hour",
      features: ["Verified Workers", "Fair Wages", "Flexible Hours"],
      subcategories: [
        "General Labor",
        "Construction Helper",
        "Farm Labor",
        "Household Helper",
        "Gardening Assistant",
        "Loading/Unloading",
        "Event Setup/Takedown",
        "Cleaning Assistant",
        "Delivery Helper",
        "Coolie/Porter",
      ],
      popularServices: [
        "General Labor",
        "Construction Helper",
        "Loading/Unloading",
        "Household Helper",
      ],
    },
    {
      id: 7,
      icon: Camera,
      title: "Event Services",
      category: "Event Services",
      description: "Complete event management and entertainment services",
      color: "from-teal-500 to-green-500",
      startingPrice: 1999,
      responseTime: "3 hours",
      features: ["Professional Team", "Latest Equipment", "Custom Packages"],
      subcategories: [
        "Event Planning",
        "Photography",
        "Videography",
        "Catering",
        "Decorations",
        "DJ Services",
        "Live Music",
        "Waitstaff",
      ],
      popularServices: [
        "Photography",
        "Event Planning",
        "Catering",
        "DJ Services",
        "Videography",
      ],
    },
    {
      id: 8,
      icon: Heart,
      title: "Pet Care",
      category: "Pet Care",
      description:
        "Loving care and professional services for your furry friends",
      color: "from-amber-500 to-orange-500",
      startingPrice: 399,
      responseTime: "2 hours",
      features: ["Trained Pet Handlers", "Pet Insurance", "Emergency Care"],
      subcategories: [
        "Pet Grooming",
        "Pet Sitting",
        "Dog Walking",
        "Pet Training",
        "Veterinary Assistance (non-medical)",
      ],
      popularServices: [
        "Pet Grooming",
        "Dog Walking",
        "Pet Sitting",
        "Pet Training",
      ],
    },
    {
      id: 9,
      icon: Briefcase,
      title: "Professional Services",
      category: "Professional Services",
      description:
        "Expert, professional, and reliable business support services",
      color: "from-indigo-500 to-blue-500",
      startingPrice: 799,
      responseTime: "4 hours",
      features: ["Expert Professionals", "Quality Assured", "Timely Delivery"],
      subcategories: [
        "IT Support",
        "Graphic Design",
        "Web Development",
        "Content Writing",
        "Legal Consultation (basic)",
        "Accounting & Bookkeeping",
        "Tax Preparation",
        "Marketing & SEO",
        "Photography (Professional)",
        "Consulting",
      ],
      popularServices: ["IT Support", "Graphic Design", "Web Development"],
    },
    {
      id: 10,
      icon: GraduationCap,
      title: "Tutoring & Education",
      category: "Tutoring & Education",
      description: "Quality education and skill development at your doorstep",
      color: "from-violet-500 to-purple-500",
      startingPrice: 499,
      responseTime: "2 hours",
      features: [
        "Qualified Teachers",
        "Flexible Schedule",
        "Progress Tracking",
      ],
      subcategories: [
        "Academic Tutoring",
        "Music Lessons",
        "Language Lessons",
        "Exam Preparation",
        "Computer & IT Skills",
        "Art & Craft Classes",
      ],
      popularServices: [
        "Academic Tutoring",
        "Music Lessons",
        "Exam Preparation",
      ],
    },
    {
      id: 11,
      icon: MoreHorizontal,
      title: "Other Services",
      category: "Other",
      description: "Custom and miscellaneous services tailored to your needs",
      color: "from-gray-500 to-slate-500",
      startingPrice: 199,
      responseTime: "4 hours",
      features: [
        "Custom Solutions",
        "Flexible Approach",
        "Personalized Service",
      ],
      subcategories: ["Custom Request", "Miscellaneous"],
      popularServices: ["Custom Request"],
    },
  ];

  // Fetch category stats on component mount
  useEffect(() => {
    dispatch(getCategoryStats());
  }, [dispatch]);

  // Helper function to get category stats
  const getCategoryStatsData = (categoryName) => {
    if (!categoryStats || categoryStats.length === 0) return null;
    return categoryStats.find((stat) => stat.category === categoryName);
  };

  // Helper function to merge service data with backend stats
  const getServiceWithStats = (service) => {
    const statsData = getCategoryStatsData(service.category);
    if (!statsData) return service;

    return {
      ...service,
      rating: statsData.rating > 0 ? statsData.rating : service.rating,
      reviews: statsData.reviews > 0 ? statsData.reviews : service.reviews,
      providers:
        statsData.providers > 0 ? statsData.providers : service.providers,
      startingPrice:
        statsData.startingPrice > 0
          ? statsData.startingPrice
          : service.startingPrice,
      responseTime: statsData.responseTime || service.responseTime,
    };
  };

  useEffect(() => {
    let filtered = allServices.map((service) => getServiceWithStats(service));

    if (searchTerm) {
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    if (rating !== "All") {
      const minRating = parseFloat(rating.replace("+", ""));
      filtered = filtered.filter((service) => service.rating >= minRating);
    }

    setFilteredServices(filtered);
  }, [
    searchTerm,
    selectedCategory,
    selectedLocation,
    priceRange,
    rating,
    categoryStats,
  ]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const ServiceCard = ({ service, index }) => {
    const IconComponent = service.icon;

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    };

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -8 }}
        className="group cursor-pointer"
      >
        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent">
          {/* Service Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-90`}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.6 }}
                className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <IconComponent className="w-10 h-10 text-white" />
              </motion.div>
            </div>

            {/* Badge */}
            <div className="absolute top-4 right-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1"
              >
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-800">
                  {service.rating > 0 ? service.rating.toFixed(1) : "New"}
                </span>
              </motion.div>
            </div>

            {/* Service Count Badge */}
            <div className="absolute top-4 left-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-gray-800"
              >
                {service.subcategories.length} services
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full font-medium">
                Popular
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {service.description}
            </p>

            {/* Popular Services */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Popular Services
              </h4>
              <div className="flex flex-wrap gap-1">
                {service.popularServices
                  .slice(0, 3)
                  .map((popularService, idx) => (
                    <span
                      key={idx}
                      className="text-xs bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 px-2 py-1 rounded-full border border-blue-100"
                    >
                      {popularService}
                    </span>
                  ))}
                {service.popularServices.length > 3 && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{service.popularServices.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {service.features.slice(0, 2).map((feature, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{service.responseTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span className="text-xs">
                  {service.providers > 0
                    ? `${service.providers}+`
                    : "Coming Soon"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span className="text-xs">Verified</span>
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-sm text-gray-500">Starting from</span>
                <div className="text-2xl font-bold text-gray-900">
                  ₹{service.startingPrice > 0 ? service.startingPrice : "TBD"}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-r ${
                  service.color
                } text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                  service.providers === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={service.providers === 0}
              >
                {service.providers === 0 ? "Coming Soon" : "Explore"}
              </motion.button>
            </div>

            {/* Reviews and View All Services */}
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1 text-gray-500">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>
                    {service.rating > 0 ? service.rating.toFixed(1) : "New"}
                    {service.reviews > 0 && ` (${service.reviews} reviews)`}
                  </span>
                </div>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="text-blue-600 font-medium cursor-pointer flex items-center space-x-1"
                >
                  <Link
                    to={`/services/${encodeURIComponent(
                      service.category
                    )}/subcategories`}
                    className="text-blue-600 font-medium cursor-pointer flex items-center space-x-1"
                  >
                    <motion.div whileHover={{ x: 5 }}>
                      <span>Explore Services</span>
                    </motion.div>
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-full px-6 py-2 mb-6"
            >
              <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                All Services
              </span>
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Find the Perfect
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Service
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Browse through our comprehensive range of professional services.
              Quality guaranteed, trusted professionals, available when you need
              them.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-12"
          >
            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>

            {/* Filter Toggle */}
            <div className="flex items-center justify-between mb-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isFilterOpen ? "rotate-180" : ""
                  }`}
                />
              </motion.button>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">View:</span>
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-400 hover:text-gray-600"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {filteredServices.length} services found
                </span>
              </div>
            </div>

            {/* Filters */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-200"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <select
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={priceRange}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {priceRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rating
                    </label>
                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {ratings.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredServices.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No services found
              </h3>
              <p className="text-gray-600 mb-8">
                Try adjusting your search or filter criteria
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedLocation("All Locations");
                  setPriceRange("All");
                  setRating("All");
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-8">
              Why Choose Our Platform?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  icon: Shield,
                  title: "Verified Professionals",
                  desc: "All service providers are background checked",
                },
                {
                  icon: Clock,
                  title: "Quick Response",
                  desc: "Average response time under 2 hours",
                },
                {
                  icon: Star,
                  title: "Quality Guaranteed",
                  desc: "4.8+ average rating across all services",
                },
                {
                  icon: MapPin,
                  title: "Local Experts",
                  desc: "Service providers in your neighborhood",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-blue-100">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
