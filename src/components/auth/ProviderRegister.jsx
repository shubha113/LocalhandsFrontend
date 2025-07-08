import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Eye, EyeOff, Mail, Lock, ArrowRight, User, Phone,
  Building, Briefcase, DollarSign, Plus, X, MapPin,
  Loader2, Clock, FileText
} from 'lucide-react';
import toast from 'react-hot-toast';
import { clearError, registerProvider } from '../../redux/slices/authSlice';

// Service categories and subcategories matching your backend
const SERVICE_CATEGORIES = [
  'Home Repair & Maintenance',
  'Cleaning & Housekeeping',
  'Beauty & Wellness',
  'Automotive Services',
  'Personal & Errands',
  'Tutoring & Education',
  'Event Services',
  'Pet Care',
  'Professional Services',
  'Daily Wage Labor',
  'Other',
];

const SERVICE_SUBCATEGORIES = {
  'Home Repair & Maintenance': [
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Appliance Repair',
    'HVAC Repair',
    'Handyman Services',
    'Roofing',
    'Masonry',
    'Pest Control',
    'Gardening & Landscaping',
    'Waterproofing',
    'Home Security Systems',
    'Intercom & Doorbell Repair',
    'Furniture Assembly',
    'Smart Home Device Setup',
  ],
  'Cleaning & Housekeeping': [
    'Home Cleaning (Deep)',
    'Home Cleaning (Standard)',
    'Commercial Cleaning',
    'Sofa & Carpet Cleaning',
    'Bathroom Cleaning',
    'Kitchen Cleaning',
    'Window Cleaning',
    'Pressure Washing',
    'Move-in/Move-out Cleaning',
    'Laundry & Ironing',
    'Maid Service',
  ],
  'Beauty & Wellness': [
    'Haircut & Styling (Men)',
    'Haircut & Styling (Women)',
    'Manicure & Pedicure',
    'Facial',
    'Massage Therapy',
    'Makeup Artist',
    'Waxing',
    'Bridal Services',
    'Yoga & Fitness Trainer',
    'Dietitian & Nutritionist',
  ],
  'Automotive Services': [
    'Car Repair & Maintenance',
    'Bike Repair & Maintenance',
    'Car Washing & Detailing',
    'Tyre Repair & Replacement',
    'Battery Replacement',
    'Roadside Assistance',
    'Vehicle Inspection',
  ],
  'Personal & Errands': [
    'Grocery Delivery',
    'Document Delivery',
    'Personal Shopping',
    'Elderly Care',
    'Child Care / Babysitting',
    'Courier Services',
    'Queueing Services',
  ],
  'Tutoring & Education': [
    'Academic Tutoring',
    'Music Lessons',
    'Language Lessons',
    'Exam Preparation',
    'Computer & IT Skills',
    'Art & Craft Classes',
  ],
  'Event Services': [
    'Event Planning',
    'Photography',
    'Videography',
    'Catering',
    'Decorations',
    'DJ Services',
    'Live Music',
    'Waitstaff',
  ],
  'Pet Care': [
    'Pet Grooming',
    'Pet Sitting',
    'Dog Walking',
    'Pet Training',
    'Veterinary Assistance (non-medical)',
  ],
  'Professional Services': [
    'IT Support',
    'Graphic Design',
    'Web Development',
    'Content Writing',
    'Legal Consultation (basic)',
    'Accounting & Bookkeeping',
    'Tax Preparation',
    'Marketing & SEO',
    'Photography (Professional)',
    'Consulting',
  ],
  'Daily Wage Labor': [
    'General Labor',
    'Construction Helper',
    'Farm Labor',
    'Household Helper',
    'Gardening Assistant',
    'Loading/Unloading',
    'Event Setup/Takedown',
    'Cleaning Assistant',
    'Delivery Helper',
    'Coolie/Porter',
  ],
  'Other': [
    'Custom Request',
    'Miscellaneous',
  ],
};

const ProviderRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    businessName: '',
    description: '',
    experience: 0,
    services: [{
      category: '',
      subcategory: '',
      price: 0,
      unit: 'per job',
      description: ''
    }],
    serviceAreas: [{
      city: '',
      pincodes: ['']
    }],
    latitude: 0,
    longitude: 0
  });

  const [showPassword, setShowPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isGeocodingLoading, setIsGeocodingLoading] = useState(false);
  const [businessAddress, setBusinessAddress] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  // Define the allowed units from your backend enum
  const serviceUnits = ["per job", "1 sqft", "1 room", "1 hour", "1 day", "per day", "per task"];

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];
    
    if (field === 'category') {
      // Reset subcategory when category changes
      updatedServices[index] = {
        ...updatedServices[index],
        category: value,
        subcategory: '' // Reset subcategory
      };
    } else if (field === 'price') {
      updatedServices[index][field] = Number(value);
    } else {
      updatedServices[index][field] = value;
    }
    
    setFormData(prev => ({ ...prev, services: updatedServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, {
        category: '',
        subcategory: '',
        price: 0,
        unit: 'per job',
        description: ''
      }]
    }));
  };

  const removeService = (index) => {
    if (formData.services.length > 1) {
      const updatedServices = formData.services.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, services: updatedServices }));
    }
  };

  const handleServiceAreaChange = (areaIndex, field, value) => {
    const updatedAreas = [...formData.serviceAreas];
    if (field === 'city') {
      updatedAreas[areaIndex].city = value;
    }
    setFormData(prev => ({ ...prev, serviceAreas: updatedAreas }));
  };

  const handlePincodeChange = (areaIndex, pincodeIndex, value) => {
    const updatedAreas = [...formData.serviceAreas];
    updatedAreas[areaIndex].pincodes[pincodeIndex] = value;
    setFormData(prev => ({ ...prev, serviceAreas: updatedAreas }));
  };

  const addPincode = (areaIndex) => {
    const updatedAreas = [...formData.serviceAreas];
    updatedAreas[areaIndex].pincodes.push('');
    setFormData(prev => ({ ...prev, serviceAreas: updatedAreas }));
  };

  const removePincode = (areaIndex, pincodeIndex) => {
    const updatedAreas = [...formData.serviceAreas];
    if (updatedAreas[areaIndex].pincodes.length > 1) {
      updatedAreas[areaIndex].pincodes.splice(pincodeIndex, 1);
      setFormData(prev => ({ ...prev, serviceAreas: updatedAreas }));
    }
  };

  const addServiceArea = () => {
    setFormData(prev => ({
      ...prev,
      serviceAreas: [...prev.serviceAreas, { city: '', pincodes: [''] }]
    }));
  };

  const removeServiceArea = (index) => {
    if (formData.serviceAreas.length > 1) {
      const updatedAreas = formData.serviceAreas.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, serviceAreas: updatedAreas }));
    }
  };

  const getCoordinatesFromAddress = async (address) => {
    try {
      setIsGeocodingLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${import.meta.env.VITE_Maps_API_KEY}`
      );

      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return {
          latitude: location.lat,
          longitude: location.lng
        };
      } else {
        throw new Error('Unable to find coordinates for this address');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Unable to get coordinates for the address. Please check your address.');
      return null;
    } finally {
      setIsGeocodingLoading(false);
    }
  };

  const validateStep1 = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.phone ||
      !formData.businessName ||
      !businessAddress ||
      formData.experience === undefined
    ) {
      toast.error('Please fill in all required fields');
      return false;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }
    if (formData.experience < 0) {
      toast.error('Experience cannot be negative');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    for (let service of formData.services) {
      if (!service.category || !service.subcategory || !service.unit || !service.description || service.price <= 0) {
        toast.error('Please fill in all service details');
        return false;
      }
    }
    return true;
  };

  const validateStep3 = () => {
    for (let area of formData.serviceAreas) {
      if (!area.city) {
        toast.error('Please fill in all service area cities');
        return false;
      }
      for (let pincode of area.pincodes) {
        if (!pincode || pincode.length !== 6) {
          toast.error('Please provide valid 6-digit pincodes');
          return false;
        }
      }
    }
    return true;
  };

  const handleNext = async () => {
    if (currentStep === 1) {
      if (!validateStep1()) return;
      const coordinates = await getCoordinatesFromAddress(businessAddress);
      if (!coordinates) return;

      setFormData(prev => ({
        ...prev,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      }));
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep3()) return;

    try {
      await dispatch(registerProvider(formData)).unwrap();
      toast.success('Provider registration successful! Please verify your email.');
      navigate('/');
    } catch (error) {
      // Error handled by Redux
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
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

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Enter your full name"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Enter your phone number"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password *
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Enter your password"
            />
            <motion.button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Business Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Name *
          </label>
          <div className="relative">
            <Building className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Enter your business name"
            />
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience (years) *
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              name="experience"
              type="number"
              min="0"
              value={formData.experience}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              placeholder="Years of experience"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Description
        </label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
            placeholder="Describe your business and services"
          />
        </div>
      </div>

      {/* Business Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Business Address *
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
            placeholder="Enter your complete business address"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          This will be used to get your business location coordinates
        </p>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Services You Provide</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addService}
          className="flex items-center px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Service
        </motion.button>
      </div>

      {formData.services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-gray-200 rounded-xl bg-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800">Service {index + 1}</h4>
            {formData.services.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => removeService(index)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={service.category}
                onChange={(e) => handleServiceChange(index, 'category', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              >
                <option value="">Select a category</option>
                {SERVICE_CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subcategory *
              </label>
              <select
                value={service.subcategory}
                onChange={(e) => handleServiceChange(index, 'subcategory', e.target.value)}
                disabled={!service.category}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">
                  {service.category ? 'Select a subcategory' : 'Select category first'}
                </option>
                {service.category && SERVICE_SUBCATEGORIES[service.category]?.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={service.price}
                  onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Unit Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unit *
              </label>
              <select
                value={service.unit}
                onChange={(e) => handleServiceChange(index, 'unit', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80"
              >
                {serviceUnits.map((unitOption) => (
                  <option key={unitOption} value={unitOption}>
                    {unitOption}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Description *
              </label>
              <textarea
                value={service.description}
                onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                rows={2}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe this service in detail"
              />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Service Areas</h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={addServiceArea}
          className="flex items-center px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Area
        </motion.button>
      </div>

      {formData.serviceAreas.map((area, areaIndex) => (
        <motion.div
          key={areaIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 border border-gray-200 rounded-xl bg-white/50"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-800">Area {areaIndex + 1}</h4>
            {formData.serviceAreas.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => removeServiceArea(areaIndex)}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </motion.button>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={area.city}
                onChange={(e) => handleServiceAreaChange(areaIndex, 'city', e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Mumbai"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Pincodes *
                </label>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => addPincode(areaIndex)}
                  className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
                >
                  <Plus className="w-3 h-3 inline mr-1" />
                  Add Pincode
                </motion.button>
              </div>

              <div className="space-y-2">
                {area.pincodes.map((pincode, pincodeIndex) => (
                  <div key={pincodeIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(areaIndex, pincodeIndex, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="6-digit pincode"
                      maxLength={6}
                    />
                    {area.pincodes.length > 1 && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => removePincode(areaIndex, pincodeIndex)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-20">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-4xl w-full space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6"
          >
            <span className="text-white font-bold text-2xl">LH</span>
          </motion.div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Become a Service Provider
          </h2>
          <p className="text-gray-600">
            Join our platform and start offering your services
          </p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div variants={itemVariants} className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                    currentStep >= step
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 mx-2 transition-colors duration-200 ${
                      currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form Steps */}
        <motion.form
          onSubmit={handleSubmit}
          variants={itemVariants}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </motion.button>

            {currentStep === 3 ? (
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    Complete Registration
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleNext}
                disabled={isGeocodingLoading}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGeocodingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.form>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="text-center"
        >
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-purple-600 hover:text-purple-500 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Want to book services?{' '}
            <Link
              to="/user-register"
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
            >
              Register as User
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProviderRegister;