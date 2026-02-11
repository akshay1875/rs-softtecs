import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { enquiriesAPI, coursesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock, FaPaperPlane, FaCheckCircle, FaExternalLinkAlt } from 'react-icons/fa';

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
      // Mark as submitted so the auto-popup won't appear anymore
      localStorage.setItem('enquiryPopupSubmitted', Date.now().toString());
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

      {/* Office Addresses Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">Our Offices</h2>
            <p className="text-gray-600">Visit us at any of our office locations in Pune</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Head Office */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full mb-4">HEAD OFFICE</span>
                <h3 className="text-xl font-bold mb-3">Deccan, Pune</h3>
                <div className="flex gap-3 mb-4">
                  <FaMapMarkerAlt className="text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Office No 2, 4th Floor, Bhosale Shinde Arcade, JM Road, Near Deccan Bus Stop, Pune.
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  <a href="tel:+919172101012" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <FaPhone className="text-primary-600 text-sm" />
                    <span className="text-sm">+91 9172 101 012</span>
                  </a>
                  <a href="tel:+919172201101" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <FaPhone className="text-primary-600 text-sm" />
                    <span className="text-sm">+91 9172 201 101</span>
                  </a>
                </div>
                <a
                  href="https://maps.app.goo.gl/KeCcYoEwFwvMUAE66"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors"
                >
                  View on Google Maps <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
              <div className="h-56 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.3!2d73.8407!3d18.5155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c07f4b3e0b1d%3A0x0!2sBhosale+Shinde+Arcade+JM+Road+Deccan+Pune!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Head Office - Deccan, Pune"
                />
              </div>
            </div>

            {/* Branch Office */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-semibold rounded-full mb-4">BRANCH OFFICE</span>
                <h3 className="text-xl font-bold mb-3">Karvenagar, Pune</h3>
                <div className="flex gap-3 mb-4">
                  <FaMapMarkerAlt className="text-primary-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Office No 29/B Wing, 4th Floor, Yashashree Park, Warje Malwadi Rd, Near Karve Nagar PMT Bus Stop, Karve Nagar, Pune.
                  </p>
                </div>
                <div className="space-y-2 mb-4">
                  <a href="tel:+919172011021" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <FaPhone className="text-primary-600 text-sm" />
                    <span className="text-sm">+91 9172 011 021</span>
                  </a>
                  <a href="tel:+919172110012" className="flex items-center gap-3 text-gray-600 hover:text-primary-600 transition-colors">
                    <FaPhone className="text-primary-600 text-sm" />
                    <span className="text-sm">+91 9172 110 012</span>
                  </a>
                </div>
                <a
                  href="https://maps.app.goo.gl/LwTiZu5c2Ac9mWkB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 text-sm font-semibold transition-colors"
                >
                  View on Google Maps <FaExternalLinkAlt className="text-xs" />
                </a>
              </div>
              <div className="h-56 bg-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.8!2d73.8150!3d18.4950!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c0000f000001%3A0x0!2sYashashree+Park+Warje+Malwadi+Karve+Nagar+Pune!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Branch Office - Karvenagar, Pune"
                />
              </div>
            </div>
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
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Head Office (Deccan)</h3>
                    <a href="tel:+919172101012" className="block text-gray-600 hover:text-primary-600 text-sm">
                      +91 9172 101 012
                    </a>
                    <a href="tel:+919172201101" className="block text-gray-600 hover:text-primary-600 text-sm">
                      +91 9172 201 101
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Branch (Karvenagar)</h3>
                    <a href="tel:+919172011021" className="block text-gray-600 hover:text-primary-600 text-sm">
                      +91 9172 011 021
                    </a>
                    <a href="tel:+919172110012" className="block text-gray-600 hover:text-primary-600 text-sm">
                      +91 9172 110 012
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
