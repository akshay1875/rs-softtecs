import { useState, useEffect } from 'react';
import { enquiriesAPI, coursesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaTimes, FaPaperPlane, FaCheckCircle, FaGraduationCap, FaDownload, FaFileAlt } from 'react-icons/fa';

export default function EnquiryPopup({ isOpen, onClose, triggerSource = 'popup', downloadAfterSubmit = false }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    courseInterested: '',
  });

  const isDownloadMode = triggerSource === 'syllabus_download' || downloadAfterSubmit;

  useEffect(() => {
    if (isOpen) {
      fetchCourses();
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchCourses = async () => {
    try {
      const { data } = await coursesAPI.getAll();
      setCourses(data.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/RS-Softtecs-Syllabus.pdf';
    link.download = 'RS-Softtecs-Course-Syllabus.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await enquiriesAPI.create({
        ...formData,
        email: formData.phone + '@syllabus-download.com', // Placeholder email for syllabus downloads
        source: triggerSource
      });
      setSubmitted(true);
      
      // Trigger download after successful submission
      if (isDownloadMode) {
        setTimeout(() => {
          triggerDownload();
          toast.success('Syllabus download started!');
        }, 500);
      } else {
        toast.success('Enquiry submitted successfully!');
      }
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      courseInterested: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
        >
          <FaTimes className="text-gray-600" />
        </button>

        {submitted ? (
          // Success State
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-green-600">Thank You!</h3>
            {isDownloadMode ? (
              <>
                <p className="text-gray-600 mb-4">
                  Your syllabus download has started. Our counselor will contact you within 24 hours.
                </p>
                <button 
                  onClick={triggerDownload}
                  className="btn btn-secondary mb-3 w-full"
                >
                  <FaDownload />
                  <span>Download Again</span>
                </button>
              </>
            ) : (
              <p className="text-gray-600 mb-6">
                Your enquiry has been submitted successfully. Our counselor will contact you within 24 hours.
              </p>
            )}
            <button 
              onClick={handleClose}
              className="btn btn-primary w-full"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  {isDownloadMode ? <FaFileAlt className="text-xl" /> : <FaGraduationCap className="text-xl" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {isDownloadMode ? 'Download Syllabus' : 'Get Free Counseling'}
                  </h3>
                  <p className="text-sm text-primary-100">
                    {isDownloadMode ? 'Fill details to download syllabus' : 'Fill the form & get callback within 24 hours'}
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="form-group">
                <label htmlFor="popup-name" className="form-label">Full Name *</label>
                <input
                  type="text"
                  id="popup-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="popup-phone" className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  id="popup-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  pattern="[0-9]{10}"
                  className="form-input"
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div className="form-group">
                <label htmlFor="popup-course" className="form-label">Course Interested (Optional)</label>
                <select
                  id="popup-course"
                  name="courseInterested"
                  value={formData.courseInterested}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select a course</option>
                  {courses.map((course) => (
                    <option key={course._id} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                  <option value="Not Sure">Not Sure - Need Guidance</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg w-full"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {isDownloadMode ? 'Processing...' : 'Submitting...'}
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {isDownloadMode ? <FaDownload /> : <FaPaperPlane />}
                    {isDownloadMode ? 'Submit & Download Syllabus' : 'Submit Enquiry'}
                  </span>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                By submitting, you agree to our privacy policy and terms of service.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Hook for auto-popup every 1 minute
export function useEnquiryPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already submitted or dismissed recently
    const lastDismissed = localStorage.getItem('enquiryPopupDismissed');
    const lastSubmitted = localStorage.getItem('enquiryPopupSubmitted');
    
    if (lastSubmitted) {
      return; // Don't show if already submitted
    }

    if (lastDismissed) {
      const dismissedTime = parseInt(lastDismissed);
      const oneHour = 60 * 60 * 1000;
      if (Date.now() - dismissedTime < oneHour) {
        return; // Don't show if dismissed within last hour
      }
    }

    // Show popup after 1 minute if user hasn't interacted
    const timer = setInterval(() => {
      if (!hasInteracted) {
        setShowPopup(true);
      }
    }, 60000); // 1 minute = 60000ms

    return () => clearInterval(timer);
  }, [hasInteracted]);

  const openPopup = () => {
    setShowPopup(true);
    setHasInteracted(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    localStorage.setItem('enquiryPopupDismissed', Date.now().toString());
  };

  const markSubmitted = () => {
    localStorage.setItem('enquiryPopupSubmitted', 'true');
    setShowPopup(false);
  };

  return {
    showPopup,
    openPopup,
    closePopup,
    markSubmitted
  };
}
