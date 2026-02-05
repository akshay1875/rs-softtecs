import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { enquiriesAPI, coursesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

export default function ContactPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterested: '',
    message: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await enquiriesAPI.create(formData);
      setSubmitted(true);
      toast.success('Enquiry submitted successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        courseInterested: '',
        message: ''
      });
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to submit enquiry. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Contact Us" description="Get in touch with RS Softtecs for course enquiries, career counseling, and more.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-sm font-semibold rounded-full mb-4">
              Get In Touch
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Contact <span className="text-accent-400">Us</span>
            </h1>
            <p className="text-lg text-gray-200">
              Have questions? We&apos;d love to hear from you. Send us a message 
              and we&apos;ll respond as soon as possible.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Our Location</h3>
                    <p className="text-gray-600 text-sm">
                      Office No. 123, IT Park Road,<br />
                      Hinjewadi, Pune - 411057,<br />
                      Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a href="tel:+919876543210" className="text-gray-600 hover:text-primary-600">
                      +91-9876543210
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href="mailto:info@rssofttecs.com" className="text-gray-600 hover:text-primary-600">
                      info@rssofttecs.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaClock className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Working Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Mon - Sat: 9:00 AM - 8:00 PM<br />
                      Sunday: 10:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mt-8 rounded-xl overflow-hidden h-64 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.625969893942!2d73.71674631513168!3d18.58863398739418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bb000f4b49b5%3A0x4ebc0a0d7d0d0e0f!2sHinjewadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1625000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-green-600">Thank You!</h3>
                    <p className="text-gray-600 mb-6">
                      Your enquiry has been submitted successfully. Our team will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="btn btn-primary"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold mb-2">Send Us a Message</h2>
                    <p className="text-gray-600 mb-6">
                      Fill out the form below and our team will get back to you within 24 hours.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-group">
                          <label htmlFor="name" className="form-label">Full Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email" className="form-label">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Enter your email"
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="form-group">
                          <label htmlFor="phone" className="form-label">Phone Number *</label>
                          <input
                            type="tel"
                            id="phone"
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
                          <label htmlFor="courseInterested" className="form-label">Course Interested</label>
                          <select
                            id="courseInterested"
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
                      </div>

                      <div className="form-group">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={4}
                          className="form-textarea"
                          placeholder="Tell us about your requirements..."
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary btn-lg w-full"
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <FaPaperPlane />
                            Submit Enquiry
                          </span>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
