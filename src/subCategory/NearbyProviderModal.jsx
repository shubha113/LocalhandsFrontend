import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Star,
  MapPin,
  User,
  Phone,
  Award,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  Briefcase,
  IndianRupee,
  Calendar,
  Clock,
  MapPinIcon,
  FileText,
  CreditCard,
  ArrowLeft,
} from "lucide-react";
import { createBooking, getNearbyProviders } from "../redux/slices/bookingSlice";

const BookingForm = ({
  bookingData,
  handleInputChange,
  handleBookingSubmit,
  createBookingLoading,
  createBookingError,
  selectedProvider,
  category,
  subcategory,
  setShowBookingForm,
  getMinDateTime,
}) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowBookingForm(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="text-xl font-bold">Book Service</h3>
            <p className="text-blue-100">
              {selectedProvider?.name} • {subcategory}
            </p>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
        <form onSubmit={handleBookingSubmit} className="space-y-6">
          {/* Provider Summary */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <img
                src={selectedProvider?.avatar?.url || "/default-avatar.png"}
                alt={selectedProvider?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold">{selectedProvider?.name}</h4>
                <p className="text-sm text-gray-600">
                  {selectedProvider?.businessName}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">
                    {selectedProvider?.rating?.toFixed(1) || "New"}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm">
                    {selectedProvider?.distance}km away
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Date & Time */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4" />
              <span>Schedule Date & Time *</span>
            </label>
            <input
              type="datetime-local"
              value={bookingData.scheduledDateTime}
              min={getMinDateTime()}
              onChange={(e) =>
                handleInputChange("scheduledDateTime", e.target.value)
              }
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-xs text-gray-500">
              Minimum 1 hour from now. Check provider's working hours.
            </p>
          </div>

          {/* Service Address - Updated with separate fields */}
          <div className="space-y-4">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <MapPinIcon className="w-4 h-4" />
              <span>Service Address *</span>
            </label>

            {/* Street Address */}
            <input
              type="text"
              value={bookingData.address.street}
              onChange={(e) =>
                handleInputChange("address.street", e.target.value)
              }
              placeholder="Street address, house/flat number"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {/* City and State */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                value={bookingData.address.city}
                onChange={(e) =>
                  handleInputChange("address.city", e.target.value)
                }
                placeholder="City"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                type="text"
                value={bookingData.address.state}
                onChange={(e) =>
                  handleInputChange("address.state", e.target.value)
                }
                placeholder="State"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Pincode */}
            <input
              type="text"
              value={bookingData.address.pincode}
              onChange={(e) =>
                handleInputChange("address.pincode", e.target.value)
              }
              placeholder="Pincode"
              required
              pattern="[0-9]{6}"
              maxLength="6"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Pricing - Updated with all required fields */}
          <div className="space-y-4">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <CreditCard className="w-4 h-4" />
              <span>Service Price</span>
            </label>

            {/* Base Price Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IndianRupee className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="number"
                value={bookingData.pricing.basePrice}
                disabled
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl bg-gray-100 text-gray-600 cursor-not-allowed"
              />
            </div>

            {/* Pricing Breakdown */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <h4 className="font-medium text-gray-900">Pricing Breakdown</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Base Price:</span>
                  <span>
                    ₹{bookingData.pricing.basePrice?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Platform Fee (10%):</span>
                  <span>
                    ₹{bookingData.pricing.platformFee?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Provider Amount:</span>
                  <span>
                    ₹{bookingData.pricing.providerAmount?.toFixed(2) || "0.00"}
                  </span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-1">
                  <span>Total Amount:</span>
                  <span>
                    ₹{bookingData.pricing.totalAmount?.toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-gray-500">
              Suggested price: ₹{selectedProvider?.service?.price || 0}{" "}
              {selectedProvider?.service?.unit || ""}
            </p>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <FileText className="w-4 h-4" />
              <span>Additional Notes</span>
            </label>
            <textarea
              value={bookingData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Any special instructions or requirements..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Error Display */}
          {createBookingError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <p className="text-sm text-red-700">{createBookingError}</p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowBookingForm(false)}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createBookingLoading}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {createBookingLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Creating Booking...</span>
                </>
              ) : (
                <span>Confirm Booking</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const NearbyProvidersModal = ({
  isOpen,
  onClose,
  category,
  subcategory,
}) => {
  const dispatch = useDispatch();
  const {
    nearbyProviders,
    providersLoading,
    providersError,
    createBookingLoading,
    createBookingError,
    createdBooking,
  } = useSelector((state) => state.booking);

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("distance");
  const [filterAvailable, setFilterAvailable] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  // Booking form state - Updated structure
  const [bookingData, setBookingData] = useState({
    scheduledDateTime: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      fullAddress: "", // For display/convenience
    },
    pricing: {
      basePrice: 0,
      providerAmount: 0,
      platformFee: 0,
      totalAmount: 0,
      currency: "INR",
    },
    notes: "",
  });

  useEffect(() => {
    if (isOpen && category && subcategory) {
      dispatch(
        getNearbyProviders({
          category,
          subcategory,
          page: currentPage,
        })
      );
    }
  }, [dispatch, isOpen, category, subcategory, currentPage]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setShowBookingForm(false);
      setSelectedProvider(null);
      setBookingData({
        scheduledDateTime: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
          fullAddress: "",
        },
        pricing: {
          basePrice: 0,
          providerAmount: 0,
          platformFee: 0,
          totalAmount: 0,
          currency: "INR",
        },
        notes: "",
      });
    }
  }, [isOpen]);

  // Handle successful booking creation
  useEffect(() => {
    if (createdBooking) {
      setShowBookingForm(false);
      setSelectedProvider(null);
      // Show success message or redirect
      alert("Booking created successfully!");
      onClose();
    }
  }, [createdBooking, onClose]);

  // Calculate pricing when base price changes
  const calculatePricing = useCallback((basePrice) => {
    const platformFeePercent = 0.1; // 10% platform fee
    const platformFee = basePrice * platformFeePercent;
    const providerAmount = basePrice - platformFee;
    const totalAmount = basePrice + platformFee; // Total amount should include platform fee

    return {
      basePrice,
      providerAmount,
      platformFee,
      totalAmount,
      currency: "INR",
    };
  }, []);

  const handleBookProvider = (provider) => {
    setSelectedProvider(provider);
    const basePrice = provider.service?.price || 0;
    const calculatedPricing = calculatePricing(basePrice);

    setBookingData((prev) => ({
      ...prev,
      pricing: calculatedPricing,
    }));
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    if (!selectedProvider) return;

    // Validate address fields
    const { street, city, state, pincode } = bookingData.address;
    if (!street || !city || !state || !pincode) {
      alert("Please fill in all address fields");
      return;
    }

    const bookingPayload = {
      providerId: selectedProvider._id,
      service: {
        category,
        subcategory,
      },
      scheduledDateTime: bookingData.scheduledDateTime,
      address: {
        street: bookingData.address.street,
        city: bookingData.address.city,
        state: bookingData.address.state,
        pincode: bookingData.address.pincode,
        // Add coordinates and landmark if collected in the form
        // coordinates: bookingData.address.coordinates,
        // landmark: bookingData.address.landmark
      },
      pricing: {
        basePrice: bookingData.pricing.basePrice,
        additionalCharges: [], // Assuming no additional charges from UI for now
        discount: 0, // Assuming no discount from UI for now
        totalAmount: bookingData.pricing.totalAmount,
        platformFee: bookingData.pricing.platformFee,
        providerAmount: bookingData.pricing.providerAmount,
      },
      notes: bookingData.notes,
    };

    console.log("Booking payload:", bookingPayload); // Debug log
    dispatch(createBooking(bookingPayload));
  };

  const handleInputChange = (field, value) => {
    if (field === "pricing.basePrice") {
      const basePrice = parseFloat(value) || 0;
      const calculatedPricing = calculatePricing(basePrice); // Use useCallback'd function

      setBookingData((prev) => ({
        ...prev,
        pricing: calculatedPricing,
      }));
    } else if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      setBookingData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setBookingData((prev) => ({
        ...prev, // THIS IS THE CRITICAL SPREAD OPERATOR for general fields
        [field]: value,
      }));
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const getSortedProviders = () => {
    if (!nearbyProviders?.providers) return [];

    let filtered = [...nearbyProviders.providers];

    // Filter by availability if enabled
    if (filterAvailable) {
      filtered = filtered.filter((provider) => provider.isAvailable);
    }

    // Sort providers
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "price":
          return a.service.price - b.service.price;
        case "experience":
          return b.experience - a.experience;
        case "distance":
        default:
          return parseFloat(a.distance) - parseFloat(b.distance);
      }
    });

    return filtered;
  };

  // Get minimum date time (current time + 1 hour)
  const getMinDateTime = () => {
    const now = new Date();
    now.setHours(now.getHours() + 1);
    // Format to YYYY-MM-DDTHH:MM for datetime-local input
    return now.toISOString().slice(0, 16);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-6xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh]"
        >
          {showBookingForm ? (
            // ----------------------------------------------------
            // Step 2: Pass props to the now external BookingForm
            // ----------------------------------------------------
            <BookingForm
              bookingData={bookingData}
              handleInputChange={handleInputChange}
              handleBookingSubmit={handleBookingSubmit}
              createBookingLoading={createBookingLoading}
              createBookingError={createBookingError}
              selectedProvider={selectedProvider}
              category={category}
              subcategory={subcategory}
              setShowBookingForm={setShowBookingForm}
              getMinDateTime={getMinDateTime}
            />
          ) : (
            <>
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {subcategory} Providers
                    </h2>
                    <p className="text-blue-100 mt-1">
                      {category} • {nearbyProviders?.totalCount || 0} providers
                      found
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mt-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="distance">Sort by Distance</option>
                    <option value="rating">Sort by Rating</option>
                    <option value="price">Sort by Price</option>
                    <option value="experience">Sort by Experience</option>
                  </select>

                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="checkbox"
                      checked={filterAvailable}
                      onChange={(e) => setFilterAvailable(e.target.checked)}
                      className="rounded border-white/20 bg-white/10 text-blue-600 focus:ring-white/30"
                    />
                    <span>Available only</span>
                  </label>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                {providersLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader className="w-8 h-8 animate-spin text-blue-600" />
                    <span className="ml-3 text-gray-600">
                      Finding nearby providers...
                    </span>
                  </div>
                ) : providersError ? (
                  <div className="text-center py-12">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="lg font-semibold text-gray-900 mb-2">
                      Failed to load providers
                    </h3>
                    <p className="text-gray-600 mb-4">{providersError}</p>
                    <button
                      onClick={() =>
                        dispatch(
                          getNearbyProviders({
                            category,
                            subcategory,
                            page: currentPage,
                          })
                        )
                      }
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                ) : getSortedProviders().length === 0 ? (
                  <div className="text-center py-12">
                    <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No providers found
                    </h3>
                    <p className="text-gray-600">
                      {filterAvailable
                        ? "No available providers in your area. Try disabling the 'Available only' filter."
                        : "No providers found for this service in your area."}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Providers Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                      {getSortedProviders().map((provider, index) => (
                        <ProviderCard
                          key={provider._id}
                          provider={provider}
                          index={index}
                          handleBookProvider={handleBookProvider}
                        />
                      ))}
                    </div>

                    {/* Pagination */}
                    {nearbyProviders?.totalPages > 1 && (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>

                        <span className="px-4 py-2 text-sm font-medium">
                          Page {currentPage} of {nearbyProviders.totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === nearbyProviders.totalPages}
                          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NearbyProvidersModal;

// This component can stay inside or be moved out, as it doesn't cause the re-render issue
const ProviderCard = ({ provider, index, handleBookProvider }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      {/* Provider Header */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={provider.avatar?.url || "/default-avatar.png"}
              alt={provider.name}
              className="w-16 h-16 rounded-full border-3 border-white/30 object-cover"
              onError={(e) => {
                e.target.src = "/default-avatar.png";
              }}
            />
            {provider.isAvailable && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          {/* Provider Info */}
          <div className="flex-1">
            <h3 className="text-xl font-bold">{provider.name}</h3>
            <p className="text-blue-100 font-medium">{provider.businessName}</p>

            {/* Rating & Distance */}
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm">
                  {provider.rating > 0 ? provider.rating.toFixed(1) : "New"}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {provider.distance}km away from you
                </span>
              </div>
            </div>
          </div>

          {/* Availability Badge */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              provider.isAvailable
                ? "bg-green-500/20 text-green-100 border border-green-400/30"
                : "bg-red-500/20 text-red-100 border border-red-400/30"
            }`}
          >
            {provider.isAvailable ? "Available" : "Busy"}
          </div>
        </div>
      </div>

      {/* Provider Details */}
      <div className="p-6">
        {/* Description */}
        {provider.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {provider.description}
          </p>
        )}

        {/* Service Details */}
        {provider.service && (
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <h4 className="font-semibold text-gray-900 mb-2">
              Service Details
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Price:</span>
                <div className="flex items-center">
                  <IndianRupee className="w-4 h-4 text-gray-700" />
                  <span className="font-semibold text-gray-900">
                    {provider.service.price}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">
                    {provider.service.unit}
                  </span>
                </div>
              </div>
              {provider.service.description && (
                <div>
                  <span className="text-gray-600">Description:</span>
                  <p className="text-sm text-gray-700 mt-1">
                    {provider.service.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Provider Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <Briefcase className="w-4 h-4" />
              <span className="text-sm font-medium">Experience</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {provider.experience} years
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
              <Award className="w-4 h-4" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {provider.rating > 0 ? provider.rating.toFixed(1) : "New"}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            // Now handleBookProvider is accessible via props
            onClick={() => handleBookProvider(provider)} // <--- This line is now correct
            disabled={!provider.isAvailable}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              provider.isAvailable
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {provider.isAvailable ? "Book Now" : "Not Available"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-3 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <Phone className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
