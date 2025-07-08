import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Star,
  Shield,
  Briefcase,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Wrench,
  Zap,
  Edit,
  Camera,
  Wallet,
  Calendar,
  Save,
  X,
  Banknote,
  CreditCard,
  PlusCircle,
  Trash2,
  Palette,
  Scissors,
  Package,
  BookOpen,
  PawPrint,
  Monitor,
  Hammer,
  UploadCloud,
  FileText,
} from "lucide-react";

import { useSelector, useDispatch } from "react-redux";
import {
  getMe,
  toggleAvailability,
  updateProviderProfile,
  uploadAvatar,
  clearError
} from "../../redux/slices/authSlice.js";
import { uploadKYC } from "../../redux/slices/bookingSlice.js";

// KYC Upload Modal Component
const KycUploadModal = ({ isOpen, onClose, onSubmit, loading, error }) => {
  const [aadharNumber, setAadharNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [aadharImage, setAadharImage] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadharNumber || !panNumber || !aadharImage || !panImage) {
      toast.error("Please fill all fields and upload both documents.");
      return;
    }

    const formData = new FormData();
    formData.append("aadharNumber", aadharNumber);
    formData.append("panNumber", panNumber);
    formData.append("aadharImage", aadharImage);
    formData.append("panImage", panImage);

    onSubmit(formData);
  };

  const handleFileChange = (e, setFile) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        // 10MB limit
        toast.error("File size exceeds 10MB limit.");
        setFile(null);
        e.target.value = null; // Clear the input
        return;
      }
      setFile(file);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <UploadCloud className="mr-3 text-blue-600" /> Upload KYC Documents
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="aadharNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Aadhar Number
            </label>
            <input
              type="text"
              id="aadharNumber"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Aadhar Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="panNumber"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PAN Number
            </label>
            <input
              type="text"
              id="panNumber"
              value={panNumber}
              onChange={(e) => setPanNumber(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter PAN Number"
              required
            />
          </div>
          <div>
            <label
              htmlFor="aadharImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Aadhar Image (Max 10MB)
            </label>
            <input
              type="file"
              id="aadharImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setAadharImage)}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {aadharImage && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {aadharImage.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="panImage"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              PAN Image (Max 10MB)
            </label>
            <input
              type="file"
              id="panImage"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setPanImage)}
              className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {panImage && (
              <p className="text-sm text-gray-600 mt-1">
                Selected: {panImage.name}
              </p>
            )}
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full px-5 py-3 rounded-lg text-white font-semibold transition-colors flex items-center justify-center ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 text-white mr-3"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <FileText className="w-5 h-5 mr-2" />
            )}
            Upload Documents
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

const SERVICE_CATEGORIES = [
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

const SERVICE_SUBCATEGORIES = {
  "Home Repair & Maintenance": [
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
  "Cleaning & Housekeeping": [
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
  "Beauty & Wellness": [
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
  "Automotive Services": [
    "Car Repair & Maintenance",
    "Bike Repair & Maintenance",
    "Car Washing & Detailing",
    "Tyre Repair & Replacement",
    "Battery Replacement",
    "Roadside Assistance",
    "Vehicle Inspection",
  ],
  "Personal & Errands": [
    "Grocery Delivery",
    "Document Delivery",
    "Personal Shopping",
    "Elderly Care",
    "Child Care / Babysitting",
    "Courier Services",
    "Queueing Services",
  ],
  "Tutoring & Education": [
    "Academic Tutoring",
    "Music Lessons",
    "Language Lessons",
    "Exam Preparation",
    "Computer & IT Skills",
    "Art & Craft Classes",
  ],
  "Event Services": [
    "Event Planning",
    "Photography",
    "Videography",
    "Catering",
    "Decorations",
    "DJ Services",
    "Live Music",
    "Waitstaff",
  ],
  "Pet Care": [
    "Pet Grooming",
    "Pet Sitting",
    "Dog Walking",
    "Pet Training",
    "Veterinary Assistance (non-medical)",
  ],
  "Professional Services": [
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
  "Daily Wage Labor": [
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
  Other: ["Custom Request", "Miscellaneous"],
};

const SERVICE_UNITS = [
  "per job",
  "1 sqft",
  "1 room",
  "1 hour",
  "1 day",
  "per day",
  "per task",
];

const Profile = () => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});

  // State for new service area input
  const [newServiceAreaCity, setNewServiceAreaCity] = useState("");
  const [newServiceAreaPincodes, setNewServiceAreaPincodes] = useState("");
  const [editingServiceAreaIndex, setEditingServiceAreaIndex] = useState(null);

  // State for new/editing service input
  const [newServiceCategory, setNewServiceCategory] = useState("");
  const [newServiceSubcategory, setNewServiceSubcategory] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
  const [newServiceUnit, setNewServiceUnit] = useState("");
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [isKycModalOpen, setIsKycModalOpen] = useState(false);

  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  const {
    user: profileData,
    isAuthenticated,
    profileLoading,
    error,
    token,
    loading,
  } = useSelector((state) => state.auth);

  const isProvider = profileData?.role === "provider";
  const isUser = profileData?.role === "user";
  useEffect(() => {
    if (isAuthenticated && !profileLoading && !error) {
      // Check if we need to fetch profile data
      const needsProfileData =
        !profileData ||
        (profileData.role === "provider" && !profileData.location) ||
        (profileData.role === "user" && !profileData.address);

      if (needsProfileData) {
        dispatch(getMe());
      }
    }
    return () => {
      if (error) {
        dispatch(clearError());
      }
    };
  }, [dispatch, isAuthenticated, profileData, profileLoading, error]);

  // Initialize edit data when profile data loads or when editing state changes
  useEffect(() => {
    if (profileData) {
      setEditData({
        businessName: profileData.businessName || "",
        description: profileData.description || "",
        experience: profileData.experience || 0,
        services: profileData.services || [],
        serviceAreas: profileData.serviceAreas || [],
        workingHours: {
          ...getDefaultWorkingHours(),
          ...(profileData.workingHours || {}),
        },
        bankDetails: profileData.bankDetails || {},
      });
    }
  }, [profileData, isEditing]);

  const getDefaultWorkingHours = () => ({
    monday: { start: "09:00", end: "18:00", available: true },
    tuesday: { start: "09:00", end: "18:00", available: true },
    wednesday: { start: "09:00", end: "18:00", available: true },
    thursday: { start: "09:00", end: "18:00", available: true },
    friday: { start: "09:00", end: "18:00", available: true },
    saturday: { start: "09:00", end: "16:00", available: true },
    sunday: { start: "10:00", end: "16:00", available: false },
  });

  const handleSave = async () => {
    const loadingToast = toast.loading("Updating profile...");
    try {
      // Ensure pincodes are parsed as an array of numbers
      const serviceAreasToSave = editData.serviceAreas.map((area) => ({
        ...area,
        pincodes: Array.isArray(area.pincodes)
          ? area.pincodes.map((p) => parseInt(p, 10)).filter((p) => !isNaN(p))
          : area.pincodes
              .split(",")
              .map((p) => parseInt(p.trim(), 10))
              .filter((p) => !isNaN(p)),
      }));

      await dispatch(
        updateProviderProfile({
          ...editData,
          serviceAreas: serviceAreasToSave,
        })
      ).unwrap();

      setIsEditing(false);
      toast.success("Profile updated successfully!", { id: loadingToast });
      // Re-fetch profile data to ensure all displayed values are up-to-date after saving
      dispatch(getMe());
      // Reset new service area inputs
      setNewServiceAreaCity("");
      setNewServiceAreaPincodes("");
      setEditingServiceAreaIndex(null);
      // Reset new service inputs
      resetServiceForm();
    } catch (error) {
      const errorMessage =
        error.message || error.toString() || "Failed to update profile.";
      toast.error(errorMessage, { id: loadingToast });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (profileData) {
      setEditData({
        businessName: profileData.businessName || "",
        description: profileData.description || "",
        experience: profileData.experience || 0,
        services: profileData.services || [],
        serviceAreas: profileData.serviceAreas || [],
        workingHours: {
          ...getDefaultWorkingHours(),
          ...(profileData.workingHours || {}),
        },
        bankDetails: profileData.bankDetails || {},
      });
    }
    // Reset new service area inputs
    setNewServiceAreaCity("");
    setNewServiceAreaPincodes("");
    setEditingServiceAreaIndex(null);
    // Reset new service inputs
    resetServiceForm();
  };

  const updateWorkingHours = (day, field, value) => {
    setEditData((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [day]: {
          ...prev.workingHours[day],
          [field]: value,
        },
      },
    }));
  };

  const updateBankDetails = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [field]: value,
      },
    }));
  };

  const handleAddServiceArea = () => {
    if (newServiceAreaCity.trim() && newServiceAreaPincodes.trim()) {
      const pincodeArray = newServiceAreaPincodes
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      if (pincodeArray.some((p) => isNaN(parseInt(p, 10)))) {
        toast.error("Pincodes must be comma-separated numbers.");
        return;
      }

      setEditData((prev) => ({
        ...prev,
        serviceAreas: [
          ...prev.serviceAreas,
          { city: newServiceAreaCity.trim(), pincodes: pincodeArray },
        ],
      }));
      setNewServiceAreaCity("");
      setNewServiceAreaPincodes("");
      toast.success("Service area added!");
    } else {
      toast.error(
        "Please enter both city and pincodes for the new service area."
      );
    }
  };

  const handleEditServiceArea = (index) => {
    const areaToEdit = editData.serviceAreas[index];
    setNewServiceAreaCity(areaToEdit.city);
    setNewServiceAreaPincodes(areaToEdit.pincodes.join(", "));
    setEditingServiceAreaIndex(index);
  };

  const handleUpdateServiceArea = () => {
    if (
      editingServiceAreaIndex !== null &&
      newServiceAreaCity.trim() &&
      newServiceAreaPincodes.trim()
    ) {
      const pincodeArray = newServiceAreaPincodes
        .split(",")
        .map((p) => p.trim())
        .filter((p) => p);
      if (pincodeArray.some((p) => isNaN(parseInt(p, 10)))) {
        toast.error("Pincodes must be comma-separated numbers.");
        return;
      }

      const updatedAreas = [...editData.serviceAreas];
      updatedAreas[editingServiceAreaIndex] = {
        city: newServiceAreaCity.trim(),
        pincodes: pincodeArray,
      };
      setEditData((prev) => ({ ...prev, serviceAreas: updatedAreas }));
      setNewServiceAreaCity("");
      setNewServiceAreaPincodes("");
      setEditingServiceAreaIndex(null);
      toast.success("Service area updated!");
    } else {
      toast.error("Please fill all fields to update the service area.");
    }
  };

  const handleDeleteServiceArea = (index) => {
    setEditData((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.filter((_, i) => i !== index),
    }));
    toast.success("Service area removed!");
  };

  // --- Services Handlers ---
  const resetServiceForm = () => {
    setNewServiceCategory("");
    setNewServiceSubcategory("");
    setNewServiceDescription("");
    setNewServicePrice("");
    setNewServiceUnit("");
    setEditingServiceIndex(null);
  };

  const handleAddService = () => {
    if (
      !newServiceCategory ||
      !newServiceSubcategory ||
      !newServiceDescription.trim() ||
      !newServicePrice ||
      !newServiceUnit
    ) {
      toast.error(
        "Please fill all service fields: Category, Subcategory, Description, Price, and Unit."
      );
      return;
    }
    if (isNaN(parseFloat(newServicePrice))) {
      toast.error("Price must be a valid number.");
      return;
    }

    const newService = {
      category: newServiceCategory,
      subcategory: newServiceSubcategory,
      description: newServiceDescription.trim(),
      price: parseFloat(newServicePrice),
      unit: newServiceUnit.trim(),
    };

    setEditData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
    resetServiceForm();
    toast.success("Service added successfully!");
  };

  const handleEditService = (index) => {
    const serviceToEdit = editData.services[index];
    setNewServiceCategory(serviceToEdit.category);
    setNewServiceSubcategory(serviceToEdit.subcategory);
    setNewServiceDescription(serviceToEdit.description);
    setNewServicePrice(serviceToEdit.price.toString());
    setNewServiceUnit(serviceToEdit.unit);
    setEditingServiceIndex(index);
  };

  const handleUpdateService = () => {
    if (
      editingServiceIndex === null ||
      !newServiceCategory ||
      !newServiceSubcategory ||
      !newServiceDescription.trim() ||
      !newServicePrice ||
      !newServiceUnit
    ) {
      toast.error("Please fill all service fields to update.");
      return;
    }
    if (isNaN(parseFloat(newServicePrice))) {
      toast.error("Price must be a valid number.");
      return;
    }

    const updatedServices = [...editData.services];
    updatedServices[editingServiceIndex] = {
      category: newServiceCategory,
      subcategory: newServiceSubcategory,
      description: newServiceDescription.trim(),
      price: parseFloat(newServicePrice),
      unit: newServiceUnit.trim(),
    };
    setEditData((prev) => ({ ...prev, services: updatedServices }));
    resetServiceForm();
    toast.success("Service updated successfully!");
  };

  const handleDeleteService = (index) => {
    setEditData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
    }));
    toast.success("Service removed!");
  };

  const handleToggleAvailability = async () => {
    const loadingToast = toast.loading("Toggling availability...");
    try {
      // Dispatch the toggleAvailability action
      await dispatch(toggleAvailability()).unwrap();
      toast.success("Availability updated successfully!", { id: loadingToast });
      // Re-fetch profile data to reflect the latest availability status from the backend
      dispatch(getMe());
    } catch (err) {
      const errorMessage =
        err?.message || err?.error || "Failed to toggle availability.";
      toast.error(errorMessage, { id: loadingToast });
      // If the toggle fails due to backend logic (e.g., outside working hours), re-fetch to reflect true state
      dispatch(getMe());
    }
  };

  const handleCameraClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const loadingToastId = toast.loading("Uploading avatar...");
      try {
        await dispatch(uploadAvatar(formData)).unwrap();
        toast.success("Avatar uploaded successfully!", { id: loadingToastId });
        // After successful upload, getMe() to refresh the profile with new avatar URL
        dispatch(getMe());
      } catch (err) {
        const errorMessage =
          err?.message || err?.error || "Failed to upload avatar.";
        toast.error(errorMessage, { id: loadingToastId });
      }
    }
  };

  //KYC Upload Handler
  const handleKycSubmit = async (kycData) => {
    const loadingToastId = toast.loading("Uploading KYC documents...");
    try {
      await dispatch(uploadKYC(kycData)).unwrap();
      toast.success(
        "KYC documents uploaded successfully! Verification is pending.",
        { id: loadingToastId }
      );
      setIsKycModalOpen(false); // Close modal on success
      dispatch(getMe()); // Refresh profile to show updated KYC status
    } catch (err) {
      console.error("KYC upload failed:", err);
      const errorMessage =
        err?.message || err?.error || "Failed to upload KYC documents.";
      toast.error(errorMessage, { id: loadingToastId });
    }
  };

  const getServiceIcon = (service) => {
    switch (service?.toLowerCase()) {
      case "plumbing":
        return Wrench;
      case "electrical":
        return Zap;
      case "carpentry":
        return Briefcase;
      case "painting":
        return Palette;
      case "appliance repair":
        return Wrench;
      case "home cleaning (deep)":
      case "home cleaning (standard)":
      case "commercial cleaning":
        return Zap;
      case "haircut & styling (men)":
      case "haircut & styling (women)":
        return Scissors;
      case "car repair & maintenance":
      case "bike repair & maintenance":
        return Wrench;
      case "grocery delivery":
      case "document delivery":
        return Package;
      case "academic tutoring":
        return BookOpen;
      case "event planning":
        return Calendar;
      case "pet grooming":
        return PawPrint;
      case "it support":
        return Monitor;
      case "general labor":
        return Hammer;
      default:
        return Briefcase;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "from-green-500 to-emerald-500";
      case "pending":
        return "from-yellow-500 to-orange-500";
      case "rejected":
        return "from-red-500 to-pink-500";
      default:
        return "from-gray-500 to-slate-500";
    }
  };

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

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-lg text-red-600">Error: {error}</p>
          <button
            onClick={() => dispatch(getMe())}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 pt-20">
        <div className="text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-lg text-gray-700">
            No profile data available. Please ensure you are logged in.
          </p>
          <button
            onClick={() => dispatch(getMe())}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Load Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-3xl shadow-lg overflow-hidden"
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-32 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute top-4 right-4 flex space-x-2">
                {isProvider && (
                  <>
                    {isEditing ? (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleSave}
                          className="bg-green-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-opacity-100 transition-all"
                        >
                          <Save className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleCancel}
                          className="bg-red-500 bg-opacity-90 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-opacity-100 transition-all"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsEditing(true)}
                        className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-opacity-30 transition-all"
                      >
                        <Edit className="w-5 h-5" />
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            </div>

            <div className="relative px-8 pb-8">
              <div className="flex flex-col lg:flex-row lg:items-end lg:space-x-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative -mt-16 mb-6 lg:mb-0"
                >
                  <div className="w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-blue-500 to-purple-500 p-1">
                    <img
                      src={
                        profileData?.avatar?.url ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          profileData?.name || "User"
                        )}&size=128&background=6366f1&color=ffffff`
                      }
                      alt={profileData?.name || "User"}
                      className="w-full h-full object-cover rounded-xl"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          profileData?.name || "User"
                        )}&size=128&background=6366f1&color=ffffff`;
                      }}
                    />
                  </div>
                  {/* Hidden file input */}
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    style={{ display: "none" }}
                    accept="image/*"
                  />
                  {/* Camera icon button to trigger file input */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCameraClick}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-2 text-white shadow-lg"
                  >
                    <Camera className="w-4 h-4" />
                  </motion.button>
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {profileData?.name || "N/A"}
                      </h1>
                      {isProvider && (
                        <>
                          {isEditing ? (
                            <div className="space-y-4 mb-4">
                              <input
                                type="text"
                                value={editData.businessName}
                                onChange={(e) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    businessName: e.target.value,
                                  }))
                                }
                                className="text-xl text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Business Name"
                              />
                              <textarea
                                value={editData.description}
                                onChange={(e) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    description: e.target.value,
                                  }))
                                }
                                className="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-full max-w-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows="3"
                                placeholder="Business Description"
                              />
                              <input
                                type="number"
                                value={editData.experience}
                                onChange={(e) =>
                                  setEditData((prev) => ({
                                    ...prev,
                                    experience: parseInt(e.target.value) || 0,
                                  }))
                                }
                                className="text-gray-600 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Experience (years)"
                                min="0"
                              />
                            </div>
                          ) : (
                            <>
                              <h2 className="text-xl text-gray-600 mb-4">
                                {profileData?.businessName || "N/A"}
                              </h2>
                              <p className="text-gray-600 max-w-2xl leading-relaxed mb-4">
                                {profileData?.description ||
                                  "No description available"}
                              </p>
                            </>
                          )}
                        </>
                      )}
                      {isUser && (
                        <div className="mb-4">
                          <p className="text-xl text-gray-600 mb-2">
                            Customer Account
                          </p>
                          <p className="text-gray-600">
                            Member since{" "}
                            {new Date(
                              profileData?.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 mt-6">
                        {/* Status Display */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className={`bg-gradient-to-r ${getStatusColor(
                            profileData?.status
                          )} text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2`}
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Status: {profileData?.status || "N/A"}</span>
                        </motion.div>

                        {/* Verified Badge */}
                        {profileData?.isVerified && (
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2"
                          >
                            <Shield className="w-4 h-4" />
                            <span>Verified</span>
                          </motion.div>
                        )}

                        {/* Availability Toggle */}
                        {isProvider && (
                          <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                            <label
                              htmlFor="availability-toggle"
                              className="flex items-center cursor-pointer"
                            >
                              <span className="mr-2">Available:</span>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  id="availability-toggle"
                                  className="sr-only"
                                  checked={profileData?.isAvailable === true}
                                  onChange={handleToggleAvailability}
                                />
                                <div
                                  className={`block w-10 h-6 rounded-full transition-colors ${
                                    profileData?.isAvailable
                                      ? "bg-black"
                                      : "bg-gray-600"
                                  }`}
                                ></div>
                                <div
                                  className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${
                                    profileData?.isAvailable
                                      ? "translate-x-full bg-green-400"
                                      : "bg-white"
                                  }`}
                                ></div>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {isProvider && (
              <>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {profileData?.ratings?.average || 0}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Rating</h3>
                  <p className="text-sm text-gray-600">
                    {profileData?.ratings?.count || 0} reviews
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {profileData?.completedJobs || 0}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Completed Jobs
                  </h3>
                  <p className="text-sm text-gray-600">Total projects</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {editData?.experience || 0}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Experience</h3>
                  <p className="text-sm text-gray-600">Years in business</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      ₹{((profileData?.earnings?.total || 0) / 1000).toFixed(0)}
                      K
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">
                    Total Earnings
                  </h3>
                  <p className="text-sm text-gray-600">Lifetime revenue</p>
                </motion.div>
              </>
            )}

            {isUser && (
              <>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">
                      {new Date(profileData?.createdAt).getFullYear()}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Member Since</h3>
                  <p className="text-sm text-gray-600">Year joined</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">0</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Bookings</h3>
                  <p className="text-sm text-gray-600">Total services booked</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-gray-900">0</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Reviews Given</h3>
                  <p className="text-sm text-gray-600">Total reviews</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">
                      {profileData?.address?.city || "N/A"}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">Location</h3>
                  <p className="text-sm text-gray-600">Current city</p>
                </motion.div>
              </>
            )}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3 text-blue-600" />
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-sm text-gray-600">
                        {profileData?.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Phone</p>
                      <p className="text-sm text-gray-600">
                        {profileData?.phone || "N/A"}
                      </p>
                      {profileData?.isPhoneVerified && (
                        <span className="inline-flex items-center text-xs text-green-600 mt-1">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Display Service Areas (Read-only) */}
                  
                  {isProvider && !isEditing && (
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          Service Areas
                        </p>
                        {profileData?.serviceAreas &&
                        profileData.serviceAreas.length > 0 ? (
                          profileData.serviceAreas.map((area, index) => (
                            <div key={index} className="text-sm text-gray-600">
                              <p>{area.city}</p>
                              <p className="text-xs text-gray-500">
                                PIN: {area.pincodes?.join(", ")}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600">
                            No service areas specified.
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {isProvider &&(
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Wallet className="w-5 h-5 mr-2 text-green-600" />
                    Earnings Overview
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Total Earned
                      </span>
                      <span className="font-semibold text-gray-900">
                        ₹{(profileData?.earnings?.total || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Pending</span>
                      <span className="font-semibold text-orange-600">
                        ₹
                        {(profileData?.earnings?.pending || 0).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Withdrawn</span>
                      <span className="font-semibold text-green-600">
                        ₹
                        {(
                          profileData?.earnings?.withdrawn || 0
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
                )}
              </div>
            </motion.div>

            {/* Services Offered and Service Areas (Editable) */}
            {isProvider && (
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                  Services Offered
                </h3>

                {isEditing ? (
                  <div className="space-y-6">
                    {/* List existing services */}
                    <h4 className="font-semibold text-gray-900 text-lg mb-3">
                      Current Services
                    </h4>
                    <ul className="space-y-3">
                      <AnimatePresence>
                        {editData.services.length > 0 ? (
                          editData.services.map((service, index) => (
                            <motion.li
                              key={service._id || index}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                            >
                              <div>
                                <p className="font-medium text-gray-800">
                                  {service.subcategory} ({service.category})
                                </p>
                                <p className="text-sm text-gray-600">
                                  {service.description}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Price: ₹{service.price} {service.unit}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEditService(index)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeleteService(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.li>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600">
                            No services added yet.
                          </p>
                        )}
                      </AnimatePresence>
                    </ul>

                    {/* Add/Edit Service Form */}
                    <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-100">
                      <h4 className="font-semibold text-gray-900 mb-3">
                        {editingServiceIndex !== null
                          ? "Edit Service"
                          : "Add New Service"}
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category
                          </label>
                          <select
                            value={newServiceCategory}
                            onChange={(e) => {
                              setNewServiceCategory(e.target.value);
                              setNewServiceSubcategory(""); // Reset subcategory when category changes
                            }}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">Select Category</option>
                            {SERVICE_CATEGORIES.map((category) => (
                              <option key={category} value={category}>
                                {category}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subcategory
                          </label>
                          <select
                            value={newServiceSubcategory}
                            onChange={(e) =>
                              setNewServiceSubcategory(e.target.value)
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={!newServiceCategory}
                          >
                            <option value="">Select Subcategory</option>
                            {newServiceCategory &&
                              SERVICE_SUBCATEGORIES[newServiceCategory]?.map(
                                (subcategory) => (
                                  <option key={subcategory} value={subcategory}>
                                    {subcategory}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                          </label>
                          <textarea
                            value={newServiceDescription}
                            onChange={(e) =>
                              setNewServiceDescription(e.target.value)
                            }
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="2"
                            placeholder="Brief description of the service"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                          </label>
                          <input
                            type="number"
                            value={newServicePrice}
                            onChange={(e) => setNewServicePrice(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 500"
                            min="0"
                          />
                        </div>
                        {/* Unit Dropdown */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Unit *
                          </label>
                          <select
                            value={newServiceUnit}
                            onChange={(e) => setNewServiceUnit(e.target.value)}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
                          >
                            <option value="">Select Unit</option>{" "}
                            {/* Added default option */}
                            {SERVICE_UNITS.map((unitOption) => (
                              <option key={unitOption} value={unitOption}>
                                {unitOption}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2 mt-4">
                        {editingServiceIndex !== null ? (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleUpdateService}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                            >
                              <Save className="w-4 h-4" />
                              <span>Update Service</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={resetServiceForm}
                              className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                            >
                              <X className="w-4 h-4" />
                              <span>Cancel Edit</span>
                            </motion.button>
                          </>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleAddService}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Add Service</span>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {profileData?.services &&
                    profileData.services.length > 0 ? (
                      profileData.services.map((service, index) => {
                        const IconComponent = getServiceIcon(
                          service.subcategory
                        ); // Use subcategory for more specific icons
                        return (
                          <motion.div
                            key={service._id || index}
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all duration-300"
                          >
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-gray-900 mb-1">
                                  {service.subcategory}
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">
                                  {service.description}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {service.category}
                                </p>
                                <div className="text-right mt-2">
                                  <p className="font-bold text-blue-600">
                                    ₹{service.price}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {service.unit}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    ) : (
                      <p className="text-sm text-gray-600 col-span-2">
                        No services added yet.
                      </p>
                    )}
                  </div>
                )}

                {/* Editable Service Areas */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-blue-600" />
                    Manage Service Areas
                  </h3>
                  {isEditing ? (
                    <div className="space-y-4">
                      {/* List existing service areas */}
                      <AnimatePresence>
                        {editData.serviceAreas.length > 0 ? (
                          editData.serviceAreas.map((area, index) => (
                            <motion.div
                              key={area._id || index}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border border-gray-200"
                            >
                              <div>
                                <p className="font-medium text-gray-800">
                                  {area.city}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Pincodes:{" "}
                                  {Array.isArray(area.pincodes)
                                    ? area.pincodes.join(", ")
                                    : area.pincodes}
                                </p>
                              </div>
                              <div className="flex space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleEditServiceArea(index)}
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <Edit className="w-4 h-4" />
                                </motion.button>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => handleDeleteServiceArea(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <p className="text-sm text-gray-600">
                            No service areas added yet.
                          </p>
                        )}
                      </AnimatePresence>

                      {/* Add/Edit Service Area Form */}
                      <div className="bg-white p-4 rounded-lg shadow-inner border border-gray-100">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          {editingServiceAreaIndex !== null
                            ? "Edit Service Area"
                            : "Add New Service Area"}
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              City
                            </label>
                            <input
                              type="text"
                              value={newServiceAreaCity}
                              onChange={(e) =>
                                setNewServiceAreaCity(e.target.value)
                              }
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Ludhiana"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Pincodes (comma-separated)
                            </label>
                            <input
                              type="text"
                              value={newServiceAreaPincodes}
                              onChange={(e) =>
                                setNewServiceAreaPincodes(e.target.value)
                              }
                              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., 141001, 141002"
                            />
                          </div>
                          {editingServiceAreaIndex !== null ? (
                            <div className="flex space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleUpdateServiceArea}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                              >
                                <Save className="w-4 h-4" />
                                <span>Update Area</span>
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  setEditingServiceAreaIndex(null);
                                  setNewServiceAreaCity("");
                                  setNewServiceAreaPincodes("");
                                }}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                              >
                                <X className="w-4 h-4" />
                                <span>Cancel Edit</span>
                              </motion.button>
                            </div>
                          ) : (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleAddServiceArea}
                              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2"
                            >
                              <PlusCircle className="w-4 h-4" />
                              <span>Add Area</span>
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 bg-gradient-to-br ${getStatusColor(
                              profileData?.kyc?.status
                            )} rounded-lg flex items-center justify-center`}
                          >
                            {profileData?.kyc?.status === "approved" ? (
                              <CheckCircle className="w-5 h-5 text-white" />
                            ) : (
                              <AlertCircle className="w-5 h-5 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              KYC Verification
                            </p>
                            <p className="text-sm text-gray-600">
                              Status: {profileData?.kyc?.status || "N/A"}
                            </p>
                          </div>
                        </div>
                        {(profileData?.kyc?.status === "pending" ||
                          !profileData?.kyc?.status) && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsKycModalOpen(true)}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                          >
                            Complete KYC
                          </motion.button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
            )}
          </div>

          {/* Working Hours */}
          {isProvider && (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Working Hours
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {Object.entries(
                  editData.workingHours || getDefaultWorkingHours()
                ).map(([day, hours]) => (
                  <div
                    key={day}
                    className="bg-gray-50 rounded-xl p-4 border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 capitalize">
                        {day}
                      </h4>
                      {isEditing ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={hours.available}
                            onChange={(e) =>
                              updateWorkingHours(
                                day,
                                "available",
                                e.target.checked
                              )
                            }
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      ) : (
                        <div
                          className={`w-3 h-3 rounded-full ${
                            hours.available ? "bg-green-500" : "bg-red-500"
                          }`}
                        ></div>
                      )}
                    </div>

                    {hours.available ? (
                      <div className="space-y-2">
                        {isEditing ? (
                          <>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">
                                Start Time
                              </label>
                              <input
                                type="time"
                                value={hours.start}
                                onChange={(e) =>
                                  updateWorkingHours(
                                    day,
                                    "start",
                                    e.target.value
                                  )
                                }
                                className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="text-xs text-gray-600 block mb-1">
                                End Time
                              </label>
                              <input
                                type="time"
                                value={hours.end}
                                onChange={(e) =>
                                  updateWorkingHours(day, "end", e.target.value)
                                }
                                className="w-full text-sm bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-gray-600 flex items-center">
                            <Clock className="w-4 h-4 mr-2 text-gray-500" />
                            {hours.start} - {hours.end}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-red-500 italic">Closed</p>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Bank Details */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Banknote className="w-6 h-6 mr-3 text-blue-600" />
              Bank Details
            </h3>

            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    value={editData.bankDetails.accountHolderName || ""}
                    onChange={(e) =>
                      updateBankDetails("accountHolderName", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Account Holder Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={editData.bankDetails.accountNumber || ""}
                    onChange={(e) =>
                      updateBankDetails("accountNumber", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Account Number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={editData.bankDetails.ifscCode || ""}
                    onChange={(e) =>
                      updateBankDetails("ifscCode", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IFSC Code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={editData.bankDetails.bankName || ""}
                    onChange={(e) =>
                      updateBankDetails("bankName", e.target.value)
                    }
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Bank Name"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Account Holder</p>
                    <p className="text-sm text-gray-600">
                      {profileData?.bankDetails?.accountHolderName || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Account Number</p>
                    <p className="text-sm text-gray-600">
                      {profileData?.bankDetails?.accountNumber || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Bank & IFSC</p>
                    <p className="text-sm text-gray-600">
                      {profileData?.bankDetails?.bankName || "N/A"} (IFSC:{" "}
                      {profileData?.bankDetails?.ifscCode || "N/A"})
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isUser && (
              <motion.div variants={itemVariants} className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                    <Briefcase className="w-6 h-6 mr-3 text-blue-600" />
                    Account Preferences
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          Email Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Receive updates via email
                        </p>
                      </div>
                      <div className="text-sm text-blue-600">
                        {profileData?.preferences?.notifications?.email
                          ? "Enabled"
                          : "Disabled"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">
                          SMS Notifications
                        </p>
                        <p className="text-sm text-gray-600">
                          Receive updates via SMS
                        </p>
                      </div>
                      <div className="text-sm text-blue-600">
                        {profileData?.preferences?.notifications?.sms
                          ? "Enabled"
                          : "Disabled"}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">Language</p>
                        <p className="text-sm text-gray-600">
                          Preferred language
                        </p>
                      </div>
                      <div className="text-sm text-blue-600">
                        {profileData?.preferences?.language === "en"
                          ? "English"
                          : profileData?.preferences?.language || "English"}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </div>
      <KycUploadModal
        isOpen={isKycModalOpen}
        onClose={() => setIsKycModalOpen(false)}
        onSubmit={handleKycSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Profile;
