import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Star,
  Clock,
  Users,
  ChevronRight,
  Grid3X3,
  List,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  Settings,
  Wind,
  HardHat,
  Home,
  Shield,
  TreePine,
  Droplets,
  Lock,
  Phone,
  Package,
  Smartphone,
  Sparkles,
  Building,
  Sofa,
  Bath,
  ChefHat,
  Eye,
  Waves,
  MoveHorizontal,
  Shirt,
  UserCheck,
  Scissors,
  Palette,
  Flower,
  Hand,
  Heart,
  Dumbbell,
  Apple,
  Car,
  Bike,
  Wrench as CarWrench,
  CircleDot,
  Zap as Battery,
  Phone as Emergency,
  ClipboardCheck,
  ShoppingCart,
  FileText,
  ShoppingBag,
  Users as Family,
  Baby,
  Package as Courier,
  Clock as Queue,
  BookOpen,
  Music,
  Globe,
  GraduationCap,
  Monitor,
  Brush,
  Calendar,
  Camera,
  Video,
  UtensilsCrossed,
  PartyPopper,
  Disc,
  Mic,
  Coffee,
  Scissors as PetGrooming,
  Home as PetSitting,
  MapPin as DogWalk,
  Trophy as PetTraining,
  Stethoscope,
  Laptop,
  Image,
  Code,
  PenTool,
  Scale,
  Calculator,
  Receipt,
  TrendingUp,
  Camera as ProfPhoto,
  Lightbulb,
  HardHat as Labor,
  Hammer as Construction,
  Wheat,
  Home as Helper,
  TreePine as Garden,
  Package as Loading,
  Calendar as Event,
  Sparkles as Cleaning,
  Truck,
  User,
  HelpCircle,
  MoreHorizontal,
} from "lucide-react";
import { getSubCategoryStats } from "../redux/slices/bookingSlice.js";
import NearbyProvidersModal from "./NearbyProviderModal.jsx";

const SubCategory = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

const {
  subCategoryStats,
  subCategoryStatsLoading,
  subCategoryStatsError,
} = useSelector((state) => state.booking);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);

  // Modal state
  const [showProvidersModal, setShowProvidersModal] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Decode the category name from URL
  const decodedCategory = decodeURIComponent(category);

  // Icon mapping for subcategories
  const getSubcategoryIcon = (subcategory) => {
    const iconMap = {
      // Home Repair & Maintenance
      Plumbing: Wrench,
      Electrical: Zap,
      Carpentry: Hammer,
      Painting: Paintbrush,
      "Appliance Repair": Settings,
      "HVAC Repair": Wind,
      "Handyman Services": HardHat,
      Roofing: Home,
      Masonry: Shield,
      "Pest Control": Shield,
      "Gardening & Landscaping": TreePine,
      Waterproofing: Droplets,
      "Home Security Systems": Lock,
      "Intercom & Doorbell Repair": Phone,
      "Furniture Assembly": Package,
      "Smart Home Device Setup": Smartphone,

      // Cleaning & Housekeeping
      "Home Cleaning (Deep)": Sparkles,
      "Home Cleaning (Standard)": Home,
      "Commercial Cleaning": Building,
      "Sofa & Carpet Cleaning": Sofa,
      "Bathroom Cleaning": Bath,
      "Kitchen Cleaning": ChefHat,
      "Window Cleaning": Eye,
      "Pressure Washing": Waves,
      "Move-in/Move-out Cleaning": MoveHorizontal,
      "Laundry & Ironing": Shirt,
      "Maid Service": UserCheck,

      // Beauty & Wellness
      "Haircut & Styling (Men)": Scissors,
      "Haircut & Styling (Women)": Scissors,
      "Manicure & Pedicure": Hand,
      Facial: Flower,
      "Massage Therapy": Heart,
      "Makeup Artist": Palette,
      Waxing: Sparkles,
      "Bridal Services": Heart,
      "Yoga & Fitness Trainer": Dumbbell,
      "Dietitian & Nutritionist": Apple,

      // Automotive Services
      "Car Repair & Maintenance": Car,
      "Bike Repair & Maintenance": Bike,
      "Car Washing & Detailing": CarWrench,
      "Tyre Repair & Replacement": CircleDot,
      "Battery Replacement": Battery,
      "Roadside Assistance": Emergency,
      "Vehicle Inspection": ClipboardCheck,

      // Personal & Errands
      "Grocery Delivery": ShoppingCart,
      "Document Delivery": FileText,
      "Personal Shopping": ShoppingBag,
      "Elderly Care": Family,
      "Child Care / Babysitting": Baby,
      "Courier Services": Courier,
      "Queueing Services": Queue,

      // Tutoring & Education
      "Academic Tutoring": BookOpen,
      "Music Lessons": Music,
      "Language Lessons": Globe,
      "Exam Preparation": GraduationCap,
      "Computer & IT Skills": Monitor,
      "Art & Craft Classes": Brush,

      // Event Services
      "Event Planning": Calendar,
      Photography: Camera,
      Videography: Video,
      Catering: UtensilsCrossed,
      Decorations: PartyPopper,
      "DJ Services": Disc,
      "Live Music": Mic,
      Waitstaff: Coffee,

      // Pet Care
      "Pet Grooming": PetGrooming,
      "Pet Sitting": PetSitting,
      "Dog Walking": DogWalk,
      "Pet Training": PetTraining,
      "Veterinary Assistance (non-medical)": Stethoscope,

      // Professional Services
      "IT Support": Laptop,
      "Graphic Design": Image,
      "Web Development": Code,
      "Content Writing": PenTool,
      "Legal Consultation (basic)": Scale,
      "Accounting & Bookkeeping": Calculator,
      "Tax Preparation": Receipt,
      "Marketing & SEO": TrendingUp,
      "Photography (Professional)": ProfPhoto,
      Consulting: Lightbulb,

      // Daily Wage Labor
      "General Labor": Labor,
      "Construction Helper": Construction,
      "Farm Labor": Wheat,
      "Household Helper": Helper,
      "Gardening Assistant": Garden,
      "Loading/Unloading": Loading,
      "Event Setup/Takedown": Event,
      "Cleaning Assistant": Cleaning,
      "Delivery Helper": Truck,
      "Coolie/Porter": User,

      // Other
      "Custom Request": HelpCircle,
      Miscellaneous: MoreHorizontal,
    };

    return iconMap[subcategory] || HelpCircle;
  };

  // Color schemes for subcategories
  const getSubcategoryColor = (subcategory, index) => {
    const colorSchemes = [
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-pink-500 to-rose-500",
      "from-orange-500 to-red-500",
      "from-purple-500 to-indigo-500",
      "from-yellow-500 to-orange-500",
      "from-teal-500 to-green-500",
      "from-amber-500 to-orange-500",
      "from-indigo-500 to-blue-500",
      "from-violet-500 to-purple-500",
      "from-cyan-500 to-blue-500",
      "from-emerald-500 to-teal-500",
      "from-rose-500 to-pink-500",
      "from-red-500 to-orange-500",
      "from-blue-600 to-purple-600",
      "from-green-600 to-blue-600",
    ];

    // Use a combination of subcategory name hash and index for consistent but varied colors
    const hash = subcategory.split("").reduce((a, b) => {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);

    return colorSchemes[Math.abs(hash + index) % colorSchemes.length];
  };

  useEffect(() => {
    // Fetch subcategory stats when component mounts
    if (decodedCategory) {
      dispatch(getSubCategoryStats(decodedCategory));
    }
  }, [dispatch, decodedCategory]);

  useEffect(() => {
    // Filter and sort subcategories
    if (subCategoryStats && subCategoryStats.subcategories) {
      let filtered = subCategoryStats.subcategories.filter((subcat) =>
        subcat.subcategory.toLowerCase().includes(searchTerm.toLowerCase())
      );

      // Sort subcategories
      filtered.sort((a, b) => {
        switch (sortBy) {
          case "rating":
            return b.rating - a.rating;
          case "price":
            return a.startingPrice - b.startingPrice;
          case "providers":
            return b.providers - a.providers;
          default:
            return a.subcategory.localeCompare(b.subcategory);
        }
      });

      setFilteredSubCategories(filtered);
    }
  }, [subCategoryStats, searchTerm, sortBy]);

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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Handle Book Now button click
  const handleBookNowClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setShowProvidersModal(true);
  };

  // Handle provider booking
  const handleBookProvider = (provider) => {
    console.log("Booking provider:", provider);
    setShowProvidersModal(false);
  };

  const SubCategoryCard = ({ subcategory, index }) => {
    const IconComponent = getSubcategoryIcon(subcategory.subcategory);
    const colorScheme = getSubcategoryColor(subcategory.subcategory, index);

    return (
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
      >
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-blue-200">
          {/* Header */}
          <div
            className={`relative h-32 bg-gradient-to-br ${colorScheme} overflow-hidden`}
          >
            <div className="absolute inset-0 bg-black/10" />

            {/* Icon */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <IconComponent className="w-8 h-8 text-white" />
              </motion.div>
            </div>

            {/* Rating Badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-semibold text-gray-800">
                  {subcategory.rating > 0
                    ? subcategory.rating.toFixed(1)
                    : "New"}
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-lg font-bold text-white text-center">
                {subcategory.subcategory}
              </h3>
            </div>
          </div>
          {/* Content */}
          <div className="p-6">
            {/* Description */}
            {subcategory.description && (
              <p className="text-gray-700 text-sm mb-4 text-center">
                {subcategory.description}
              </p>
            )}
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-bold">Providers</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {subcategory.providers > 0
                    ? `${subcategory.providers}+`
                    : "Coming Soon"}
                </div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">Response</span>
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {subcategory.responseTime}
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <div className="text-center">
                <span className="text-sm text-gray-500">Starting from</span>
                <div className="text-2xl font-bold text-gray-900">
                  ₹
                  {subcategory.startingPrice > 0
                    ? subcategory.startingPrice
                    : "TBD"}
                </div>
              </div>
            </div>

            {/* Reviews */}
            {subcategory.reviews > 0 && (
              <div className="flex items-center justify-center space-x-1 text-gray-500 mb-4">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm">
                  {subcategory.rating.toFixed(1)} ({subcategory.reviews}{" "}
                  reviews)
                </span>
              </div>
            )}

            {/* Action Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-gradient-to-r ${colorScheme} text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ${
                subcategory.providers === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={subcategory.providers === 0}
              onClick={() => {
                if (subcategory.providers > 0) {
                  handleBookNowClick(subcategory);
                }
              }}
            >
              {subcategory.providers === 0 ? "Coming Soon" : "Book Now"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (subCategoryStatsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-blue-600 rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subcategories...</p>
        </div>
      </div>
    );
  }

  if (subCategoryStatsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            Error Loading Subcategories
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/services")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold"
          >
            Back to Services
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-gray-600 mb-6"
          >
            <Link
              to="/services"
              className="hover:text-blue-600 transition-colors"
            >
              All Services
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{decodedCategory}</span>
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {decodedCategory}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Services
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from our specialized {decodedCategory.toLowerCase()}{" "}
              services. Professional, reliable, and available when you need
              them.
            </p>
          </motion.div>

          {/* Search and Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-6 mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search subcategories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Sort */}
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="price">Sort by Price</option>
                  <option value="providers">Sort by Providers</option>
                </select>

                {/* View Mode */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "grid"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-400"
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === "list"
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-400"
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {filteredSubCategories.length} subcategories found
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSubCategories && filteredSubCategories.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              <AnimatePresence>
                {filteredSubCategories.map((subcategory, index) => (
                  <SubCategoryCard
                    key={subcategory.subcategory}
                    subcategory={subcategory}
                    index={index}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                No subcategories found
              </h3>
              <p className="text-gray-600 mb-8">
                {searchTerm
                  ? "Try adjusting your search criteria"
                  : "No subcategories available for this service"}
              </p>
              {searchTerm && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchTerm("")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  Clear Search
                </motion.button>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Need a Custom Service?
            </h2>
            <p className="text-blue-100 mb-8 text-lg">
              Can't find what you're looking for? Let us know your requirements
              and we'll connect you with the right professional.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              onClick={() => navigate("/custom-request")}
            >
              Request Custom Service
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Nearby Providers Modal */}
      <NearbyProvidersModal
        isOpen={showProvidersModal}
        onClose={() => setShowProvidersModal(false)}
        category={decodedCategory}
        subcategory={selectedSubcategory?.subcategory}
        onBookProvider={handleBookProvider}
      />
    </div>
  );
};

export default SubCategory;
