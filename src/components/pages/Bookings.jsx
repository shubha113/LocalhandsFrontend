import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Clock,
  MapPin,
  IndianRupee,
  User,
  Building,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  XCircle,
  MessageCircle,
  Star,
  Wrench,
  Timer,
  Ban,
  Check,
  X,
  AlertTriangle,
  CreditCard,
  IndianRupeeIcon,
  StarIcon,
} from "lucide-react";
import {
  getMyBookings,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  createPaymentOrder,
  verifyPayment,
  generateCompletionOTP,
  completeBookingWithOTP,
} from "../../redux/slices/bookingSlice";
import { createReview } from "../../redux/slices/reviewSlice";
import toast from "react-hot-toast";
import { createChatRoom } from "../../redux/slices/chatSlice";
import { useNavigate } from "react-router-dom";
import CompletionModal from "./CompletionModal";

// Modal component for both rejection and cancellation
const ActionModal = ({
  showModal,
  setShowModal,
  reason,
  setReason,
  handleAction,
  actionLoading,
  selectedBookingId,
  actionType, // 'reject' or 'cancel'
}) => (
  <AnimatePresence>
    {showModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowModal(false)}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl p-6 w-full max-w-md"
        >
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h3 className="text-lg font-bold text-gray-900">
              {actionType === "reject" ? "Reject Booking" : "Cancel Booking"}
            </h3>
          </div>
          <p className="text-gray-600 mb-4">
            Please provide a reason for{" "}
            {actionType === "reject" ? "rejecting" : "cancelling"} this booking.
            This will help the{" "}
            {actionType === "reject" ? "customer" : "other party"} understand
            why.
          </p>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder={`Enter ${
              actionType === "reject" ? "rejection" : "cancellation"
            } reason...`}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            maxLength={200}
            autoFocus
          />
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAction}
              disabled={!reason.trim() || actionLoading[selectedBookingId]}
              className="px-6 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              {actionLoading[selectedBookingId] === `${actionType}ing` ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  <span>
                    {actionType === "reject" ? "Reject" : "Cancel"} Booking
                  </span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

const BookingsDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookings, loading, error, generateOTPLoading, generatedOTPInfo } =
    useSelector((state) => state.booking);
  const { creatingReview } = useSelector((state) => state.review);

  const [activeTab, setActiveTab] = useState("ongoing");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [actionLoading, setActionLoading] = useState({});
  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [actionReason, setActionReason] = useState("");
  const [currentAction, setCurrentAction] = useState("");
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [selectedBookingForCompletion, setSelectedBookingForCompletion] =
    useState(null);
  const [completionOTP, setCompletionOTP] = useState("");
  const [workImages, setWorkImages] = useState([]);
  const [completionNotes, setCompletionNotes] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
const [selectedBookingForReview, setSelectedBookingForReview] = useState(null);
const [reviewData, setReviewData] = useState({
  rating: 0,
  title: "",
  comment: "",
  aspects: {
    punctuality: 0,
    quality: 0,
    professionalism: 0,
    value: 0
  }
});
const [reviewImage, setReviewImage] = useState(null);
const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  const fetchMyBookings = (params) => {
    dispatch(getMyBookings(params));
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  useEffect(() => {
    if (!bookings) return;
    let filtered = [];
    switch (activeTab) {
      case "ongoing":
        filtered = bookings.filter((booking) =>
          ["pending", "accepted", "in_progress"].includes(
            booking.status
          )
        );
        break;
      case "completed":
        filtered = bookings.filter((booking) => booking.status === "completed");
        break;
      case "cancelled":
        // Only show cancelled bookings, not rejected ones
        filtered = bookings.filter(
          (booking) =>
            booking.status === "cancelled" ||
            (booking.status === "rejected" && user?.role !== "provider")
        );
        break;
      default:
        filtered = bookings;
    }
    setFilteredBookings(filtered);
  }, [bookings, activeTab, user?.role]);

  const handleAcceptBooking = async (bookingId) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: "accepting" }));
    try {
      await dispatch(acceptBooking(bookingId)).unwrap();
      fetchMyBookings();
      toast.success("Booking accepted successfully!");
    } catch (error) {
      console.error("Failed to accept booking:", error);
      toast.error("Failed to accept booking.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: null }));
    }
  };

  const handleRejectBooking = async () => {
    if (!selectedBookingId || !actionReason.trim()) return;

    setActionLoading((prev) => ({ ...prev, [selectedBookingId]: "rejecting" }));
    try {
      await dispatch(
        rejectBooking({
          bookingId: selectedBookingId,
          reason: actionReason,
        })
      ).unwrap();
      fetchMyBookings();
      setShowActionModal(false);
      setSelectedBookingId(null);
      setActionReason("");
      toast.success("Booking rejected successfully!");
    } catch (error) {
      console.error("Failed to reject booking:", error);
      toast.error("Failed to reject booking.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [selectedBookingId]: null }));
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingId || !actionReason.trim()) return;

    setActionLoading((prev) => ({
      ...prev,
      [selectedBookingId]: "cancelling",
    }));
    try {
      await dispatch(
        cancelBooking({
          bookingId: selectedBookingId,
          reason: actionReason,
        })
      ).unwrap();
      fetchMyBookings();
      setShowActionModal(false);
      setSelectedBookingId(null);
      setActionReason("");
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Failed to cancel booking.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [selectedBookingId]: null }));
    }
  };

  const handleChatClick = async (bookingId) => {
    try {
      // Add a loading state to prevent multiple clicks
      setIsCreatingChat(true);

      const result = await dispatch(createChatRoom({ bookingId }));
      if (result.payload) {
        navigate(`/chat/${bookingId}`);
      }
    } catch (error) {
      console.error("Failed to create chat room:", error);
      // Show error toast
    } finally {
      setIsCreatingChat(false);
    }
  };
  const handlePayNow = async (bookingId) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: "paying" }));
    try {
      const paymentOrder = await dispatch(
        createPaymentOrder({ bookingId })
      ).unwrap();

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: "Service Booking Payment",
        description: "Payment for your service booking",
        order_id: paymentOrder.orderId,
        handler: async function (response) {
          try {
            await dispatch(
              verifyPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: bookingId,
                paymentMethod: "online",
              })
            ).unwrap();

            toast.success("Payment successful!");
            fetchMyBookings();
          } catch (error) {
            console.error("Payment verification failed:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: user?.phone,
        },
        theme: {
          color: "#3B82F6",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Failed to create payment order:", error);
      toast.error("Failed to initiate payment. Please try again.");
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: null }));
    }
  };

  const openActionModal = (bookingId, actionType) => {
    setSelectedBookingId(bookingId);
    setCurrentAction(actionType);
    setShowActionModal(true);
  };

  const handleGenerateOTP = async (bookingId) => {
    setActionLoading((prev) => ({ ...prev, [bookingId]: "generating-otp" }));
    try {
      await dispatch(generateCompletionOTP(bookingId)).unwrap();
      setSelectedBookingForCompletion(bookingId);
      setShowCompletionModal(true);
      setOtpSent(true);
      toast.success("OTP sent to customer's phone!");
    } catch (error) {
      console.error("Failed to generate OTP:", error);
      toast.error(error || "Failed to generate OTP");
    } finally {
      setActionLoading((prev) => ({ ...prev, [bookingId]: null }));
    }
  };

  const handleCompleteBooking = async () => {
    if (!completionOTP.trim()) {
      toast.error("Please enter the OTP");
      return;
    }

    setActionLoading((prev) => ({
      ...prev,
      [selectedBookingForCompletion]: "completing",
    }));
    try {
      await dispatch(
        completeBookingWithOTP({
          bookingId: selectedBookingForCompletion,
          otp: completionOTP,
          workImages,
          notes: completionNotes,
        })
      ).unwrap();

      setShowCompletionModal(false);
      setCompletionOTP("");
      setWorkImages([]);
      setCompletionNotes("");
      setOtpSent(false);
      setSelectedBookingForCompletion(null);
      fetchMyBookings();
      toast.success("Booking completed successfully!");
    } catch (error) {
      console.error("Failed to complete booking:", error);
      toast.error(error || "Failed to complete booking");
    } finally {
      setActionLoading((prev) => ({
        ...prev,
        [selectedBookingForCompletion]: null,
      }));
    }
  };

const handleOpenReviewModal = (booking) => {
  setSelectedBookingForReview(booking);
  setShowReviewModal(true);
};

const handleCloseReviewModal = () => {
  setShowReviewModal(false);
  setSelectedBookingForReview(null);
  setReviewData({
    rating: 0,
    title: "",
    comment: "",
    aspects: {
      punctuality: 0,
      quality: 0,
      professionalism: 0,
      value: 0
    }
  });
  setReviewImage(null);
};

const handleSubmitReview = async () => {
  if (!selectedBookingForReview || reviewData.rating === 0) {
    toast.error("Please provide a rating");
    return;
  }

  setIsSubmittingReview(true);
  try {
    const formData = new FormData();
    formData.append('bookingId', selectedBookingForReview._id);
    formData.append('rating', reviewData.rating);
    formData.append('title', reviewData.title);
    formData.append('comment', reviewData.comment);
    formData.append('aspects', JSON.stringify(reviewData.aspects));
    
    if (reviewImage) {
      formData.append('image', reviewImage);
    }

    await dispatch(createReview(formData)).unwrap();
    toast.success("Review submitted successfully!");
    handleCloseReviewModal();
    fetchMyBookings();
  } catch (error) {
    console.error("Failed to submit review:", error);
    toast.error(error || "Failed to submit review");
  } finally {
    setIsSubmittingReview(false);
  }
};

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "accepted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "in_progress":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "rejected":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Timer className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "in_progress":
        return <Wrench className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "cancelled":
        return <Ban className="w-4 h-4" />;
      case "rejected":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getPaymentStatusColor = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const tabs = [
    {
      id: "ongoing",
      label: "Ongoing",
      icon: <Clock className="w-4 h-4" />,
      count:
        bookings?.filter((b) =>
          ["pending", "accepted", "in_progress"].includes(
            b.status
          )
        ).length || 0,
    },
    {
      id: "completed",
      label: "Completed",
      icon: <CheckCircle className="w-4 h-4" />,
      count: bookings?.filter((b) => b.status === "completed").length || 0,
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: <XCircle className="w-4 h-4" />,
      count:
        bookings?.filter(
          (b) =>
            b.status === "cancelled" ||
            (b.status === "rejected" && user?.role !== "provider")
        ).length || 0,
    },
    {
      id: "expired",
      label: "Expired",
      icon: <XCircle className="w-4 h-4" />,
      count:
        bookings?.filter(
          (b) =>
            b.status === "expired" ||
            (b.status === "expired" && user?.role !== "provider")
        ).length || 0,
    },
  ];

  const BookingCard = ({ booking }) => {
    const isProvider = user?.role === "provider";
    const otherParty = isProvider ? booking.user : booking.provider;
    const currentActionLoading = actionLoading[booking._id];
    const isPaid = booking.paymentStatus === "paid";
    const canShowChat =
      isPaid &&
      [ "in_progress"].includes(booking.status);

    const renderActionButtons = () => {
      if (!isProvider) {
        // For users
        if (booking.status === "accepted" && !isPaid) {
          // Show Pay Now button for accepted bookings that haven't been paid
          return (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => handlePayNow(booking._id)}
                disabled={currentActionLoading}
                className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {currentActionLoading === "paying" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Now</span>
                  </>
                )}
              </button>
              <button
                onClick={() => openActionModal(booking._id, "cancel")}
                disabled={currentActionLoading}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Ban className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          );
        }

        if (["pending", "accepted"].includes(booking.status) && isPaid) {
          return (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => openActionModal(booking._id, "cancel")}
                disabled={currentActionLoading}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {currentActionLoading === "cancelling" ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Ban className="w-4 h-4" />
                    <span>Cancel Booking</span>
                  </>
                )}
              </button>
              {canShowChat && (
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat</span>
                </button>
              )}
            </div>
          );
        }

        
     if (["completed"].includes(booking.status)) {
  return (
    <div className="flex space-x-3 mt-4">
      <button
        onClick={() => handleOpenReviewModal(booking)}
        disabled={currentActionLoading}
        className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
      >
        {currentActionLoading === "generating-otp" ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <>
            <StarIcon className="w-4 h-4" />
            <span>Rate & Review</span>
          </>
        )}
      </button>
    </div>
  );
}
        if (canShowChat) {
          return (
            <div className="flex space-x-3 mt-4">
              <button
                onClick={() => handleChatClick(booking._id)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Provider</span>
              </button>
            </div>
          );
        }

        return null;
      }

      // For providers
      if (booking.status === "pending") {
        return (
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => handleAcceptBooking(booking._id)}
              disabled={currentActionLoading}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {currentActionLoading === "accepting" ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>Accept Booking</span>
                </>
              )}
            </button>
            <button
              onClick={() => openActionModal(booking._id, "reject")}
              disabled={currentActionLoading}
              className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {currentActionLoading === "rejecting" ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <X className="w-4 h-4" />
                  <span>Reject Booking</span>
                </>
              )}
            </button>
          </div>
        );
      }

      if (["in_progress"].includes(booking.status) && isPaid) {
        return (
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => handleGenerateOTP(booking._id)}
              disabled={currentActionLoading}
              className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              {currentActionLoading === "generating-otp" ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete Booking</span>
                </>
              )}
            </button>
            <button
              onClick={() => handleChatClick(booking._id)}
              className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </button>
          </div>
        );
      }

      if (canShowChat) {
        return (
          <div className="flex space-x-3 mt-4">
            <button
              onClick={() => handleChatClick(booking._id)}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with Customer</span>
            </button>
          </div>
        );
      }

      return null;
    };

    const renderNotesOrReason = () => {
      // For cancelled/rejected bookings, show the cancellation/rejection reason
      if (booking.status === "cancelled" && booking.cancellation?.reason) {
        return (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <Ban className="w-4 h-4 text-red-500" />
              <span>Cancellation Reason</span>
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {booking.cancellation.reason}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Cancelled by {booking.cancellation.cancelledBy} on{" "}
              {formatDate(booking.cancellation.cancelledAt)}
            </p>
          </div>
        );
      }

      if (booking.status === "rejected" && booking.rejection?.reason) {
        return (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <XCircle className="w-4 h-4 text-gray-500" />
              <span>Rejection Reason</span>
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {booking.rejection.reason}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Rejected on {formatDate(booking.rejection.rejectedAt)}
            </p>
          </div>
        );
      }

      // For ongoing bookings, show customer notes if available
      if (
        booking.notes?.user &&
        ["pending", "accepted", "in_progress"].includes(
          booking.status
        )
      ) {
        return (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span>Customer Notes</span>
            </h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              {booking.notes.user}
            </p>
          </div>
        );
      }

      return null;
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Wrench className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-xl">
                  {booking.service.subcategory}
                </h3>
                <p className="text-blue-100 text-sm font-medium">
                  {booking.service.category}
                </p>
                <p className="text-blue-100 text-xs mt-1">
                  Booking ID: #{booking._id.slice(-6).toUpperCase()}
                </p>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div
                className={`px-4 py-2 rounded-full text-xs font-semibold border backdrop-blur-sm ${getStatusColor(
                  booking.status
                )}`}
              >
                <div className="flex items-center space-x-2">
                  {getStatusIcon(booking.status)}
                  <span className="capitalize">
                    {booking.status.replace("-", " ").replace("_", " ")}
                  </span>
                </div>
              </div>
              {booking.paymentStatus && (
                <div
                  className={`px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${getPaymentStatusColor(
                    booking.paymentStatus
                  )}`}
                >
                  <div className="flex items-center space-x-1">
                    <IndianRupeeIcon className="w-3 h-3" />
                    <span className="capitalize">{booking.paymentStatus}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Booking Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Left Column - Booking Info */}
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span>Booking Details</span>
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">
                      {formatDate(booking.scheduledDateTime)}
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{booking.address.street}</p>
                      <p className="text-gray-600">
                        {booking.address.city}, {booking.address.state}
                      </p>
                      {booking.address.pincode && (
                        <p className="text-gray-600">
                          PIN: {booking.address.pincode}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <IndianRupee className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-bold text-green-600">
                      ₹{booking.pricing.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Other Party Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center space-x-2">
                <User className="w-4 h-4 text-purple-500" />
                <span>
                  {isProvider ? "Customer Details" : "Service Provider"}
                </span>
              </h4>
              <div className="flex items-start space-x-4">
                <img
                  src={otherParty.avatar?.url || "/default-avatar.png"}
                  alt={otherParty.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <div className="flex-1">
                  <p className="font-bold text-gray-900">{otherParty.name}</p>
                  {!isProvider && otherParty.businessName && (
                    <p className="text-sm text-gray-600 font-medium">
                      {otherParty.businessName}
                    </p>
                  )}
                  {otherParty.phone && (
                    <p className="text-sm text-gray-600 flex items-center space-x-1 mt-1">
                      <Phone className="w-3 h-3" />
                      <span>{otherParty.phone}</span>
                    </p>
                  )}
                  {!isProvider && otherParty.ratings && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-700">
                        {otherParty.ratings.average > 0
                          ? otherParty.ratings.average.toFixed(1)
                          : "New"}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({otherParty.ratings.total || 0} reviews)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Notes/Reason Section */}
          {renderNotesOrReason()}

          {/* Action Buttons */}
          {renderActionButtons()}

          {/* Review Modal */}
<AnimatePresence>
  {showReviewModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleCloseReviewModal}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Rate & Review</h3>
          <button
            onClick={handleCloseReviewModal}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {selectedBookingForReview && (
          <div className="space-y-6">
            {/* Service Info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="font-medium text-gray-900">
                {selectedBookingForReview.service.subcategory}
              </p>
              <p className="text-sm text-gray-600">
                Provider: {selectedBookingForReview.provider.name}
              </p>
            </div>

            {/* Overall Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Overall Rating *
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                    className={`w-8 h-8 ${
                      star <= reviewData.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <Star className="w-full h-full fill-current" />
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratings */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rate Different Aspects
              </label>
              <div className="space-y-3">
                {Object.entries(reviewData.aspects).map(([aspect, rating]) => (
                  <div key={aspect} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">
                      {aspect}
                    </span>
                    <div className="flex space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewData(prev => ({
                            ...prev,
                            aspects: { ...prev.aspects, [aspect]: star }
                          }))}
                          className={`w-5 h-5 ${
                            star <= rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        >
                          <Star className="w-full h-full fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Review Title
              </label>
              <input
                type="text"
                value={reviewData.title}
                onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Give your review a title..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={100}
              />
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewData.comment}
                onChange={(e) => setReviewData(prev => ({ ...prev, comment: e.target.value }))}
                placeholder="Share your experience..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                maxLength={500}
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Photo (Optional)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setReviewImage(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                onClick={handleCloseReviewModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={reviewData.rating === 0 || isSubmittingReview}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-medium flex items-center space-x-2"
              >
                {isSubmittingReview ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    <span>Submit Review</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20 p-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 pt-20 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">My Bookings</h1>
          <p className="text-gray-600 text-lg">
            Manage and track your{" "}
            {user?.role === "provider"
              ? "service bookings"
              : "service requests"}
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white rounded-2xl p-2 shadow-lg">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <span className="font-medium">Error loading bookings</span>
            </div>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Bookings Grid */}
        <AnimatePresence mode="wait">
          {filteredBookings && filteredBookings.length > 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-8"
            >
              {filteredBookings.map((booking) => (
                <BookingCard key={booking._id} booking={booking} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                {activeTab === "ongoing" && (
                  <Clock className="w-12 h-12 text-gray-400" />
                )}
                {activeTab === "completed" && (
                  <CheckCircle className="w-12 h-12 text-gray-400" />
                )}
                {activeTab === "cancelled" && (
                  <XCircle className="w-12 h-12 text-gray-400" />
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No {activeTab} bookings
              </h3>
              <p className="text-gray-600">
                {activeTab === "ongoing" &&
                  "You don't have any ongoing bookings at the moment."}
                {activeTab === "completed" &&
                  "You haven't completed any bookings yet."}
                {activeTab === "cancelled" &&
                  "You don't have any cancelled bookings."}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Modal */}
        <ActionModal
          showModal={showActionModal}
          setShowModal={setShowActionModal}
          reason={actionReason}
          setReason={setActionReason}
          handleAction={
            currentAction === "reject"
              ? handleRejectBooking
              : handleCancelBooking
          }
          actionLoading={actionLoading}
          selectedBookingId={selectedBookingId}
          actionType={currentAction}
        />
        <CompletionModal
          showModal={showCompletionModal}
          setShowModal={setShowCompletionModal}
          otp={completionOTP}
          setOtp={setCompletionOTP}
          workImages={workImages}
          setWorkImages={setWorkImages}
          notes={completionNotes}
          setNotes={setCompletionNotes}
          handleComplete={handleCompleteBooking}
          actionLoading={actionLoading}
          selectedBookingId={selectedBookingForCompletion}
          otpSent={otpSent}
          generatedOTPInfo={generatedOTPInfo}
        />
      </div>
    </div>
  );
};

export default BookingsDashboard;
