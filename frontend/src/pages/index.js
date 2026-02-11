import { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import CourseCard from '@/components/ui/CourseCard';
import TestimonialCard from '@/components/ui/TestimonialCard';
import ReviewCard from '@/components/ui/ReviewCard';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import EnquiryPopup, { useEnquiryPopup } from '@/components/ui/EnquiryPopup';
import { coursesAPI, testimonialsAPI, reviewsAPI, settingsAPI } from '@/utils/api';
import { 
  FaGraduationCap, FaUsers, FaBriefcase, FaBuilding, 
  FaChalkboardTeacher, FaLaptopCode, FaHandshake, FaCertificate,
  FaArrowRight, FaCheckCircle, FaPlay, FaDownload
} from 'react-icons/fa';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [settings, setSettings] = useState(null);
  const [popupTrigger, setPopupTrigger] = useState('popup');
  const { showPopup, openPopup, closePopup, markSubmitted } = useEnquiryPopup();

  useEffect(() => {
    fetchData();
  }, []);

  // Handle download syllabus button click - open popup first
  const handleDownloadClick = () => {
    setPopupTrigger('syllabus_download');
    openPopup();
  };

  const fetchData = async () => {
    try {
      const [coursesRes, testimonialsRes, reviewsRes, settingsRes] = await Promise.all([
        coursesAPI.getAll({ featured: 'true' }),
        testimonialsAPI.getAll(),
        reviewsAPI.getAll(),
        settingsAPI.get(),
      ]);
      setCourses(coursesRes.data.data.slice(0, 6));
      setTestimonials(testimonialsRes.data.data.slice(0, 6));
      setReviews(reviewsRes.data.data.slice(0, 6));
      setSettings(settingsRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = settings?.stats || {
    studentsPlaced: 5000,
    yearsExperience: 13,
    coursesOffered: 25,
    hiringPartners: 200
  };

  if (loading) {
    return (
      <Layout>
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <span className="w-2 h-2 bg-accent-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Since 2011 | Pune&apos;s #1 IT Training Institute</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Launch Your 
                <span className="text-accent-400"> IT Career</span>
                <br />With Expert Training
              </h1>
              
              <p className="text-lg text-gray-200 mb-8 max-w-lg">
                Transform your career with industry-relevant IT courses. 
                Get trained by experts, work on real projects, and land your dream job 
                with our 100% placement assistance.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/courses" className="btn btn-accent btn-lg">
                  <span>Explore Courses</span>
                  <FaArrowRight />
                </Link>
                <button 
                  onClick={handleDownloadClick}
                  className="btn btn-white btn-lg"
                >
                  <FaDownload />
                  <span>Download Syllabus</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { icon: FaGraduationCap, value: `${stats.studentsPlaced}+`, label: 'Students Placed' },
                  { icon: FaBuilding, value: `${stats.hiringPartners}+`, label: 'Hiring Partners' },
                  { icon: FaLaptopCode, value: `${stats.coursesOffered}+`, label: 'Courses' },
                  { icon: FaUsers, value: `${stats.yearsExperience}+`, label: 'Years Experience' },
                ].map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className="text-2xl text-accent-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual */}
            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Main Visual */}
                <div className="absolute inset-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-3xl transform rotate-6 shadow-2xl" />
                <div className="absolute inset-10 bg-white rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-center p-8">
                    <FaGraduationCap className="text-7xl text-primary-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">RS Softtecs</h3>
                    <p className="text-gray-600">IT Training & Placement</p>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="text-green-500" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">100%</div>
                      <div className="text-xs text-gray-500">Placement Assistance</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 animate-float" style={{ animationDelay: '2s' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <FaCertificate className="text-primary-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Certified</div>
                      <div className="text-xs text-gray-500">Industry Training</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="section-tag">About RS Softtecs</span>
              <h2 className="section-title">
                Transforming Careers 
                <span className="gradient-text"> Since 2011</span>
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                RS Softtecs Pvt Ltd is Pune&apos;s leading IT training and placement institute, 
                dedicated to bridging the gap between education and industry requirements. 
                With over 13 years of experience, we have successfully trained and placed 
                thousands of students in top IT companies.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our industry-expert trainers, hands-on project-based learning approach, 
                and dedicated placement cell ensure that every student is job-ready 
                by the time they complete their course.
              </p>

              {/* Highlights */}
              <div className="grid sm:grid-cols-2 gap-4 mb-8">
                {[
                  'Industry-Expert Trainers',
                  'Live Project Training',
                  'Small Batch Size',
                  'Interview Preparation',
                  'Resume Building',
                  '100% Placement Support'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn btn-primary">
                Learn More About Us
                <FaArrowRight />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
                    <FaChalkboardTeacher className="text-3xl mb-3" />
                    <div className="text-3xl font-bold">50+</div>
                    <div className="text-primary-200">Expert Trainers</div>
                  </div>
                  <div className="card p-6">
                    <FaBriefcase className="text-3xl text-accent-500 mb-3" />
                    <div className="text-3xl font-bold text-gray-900">200+</div>
                    <div className="text-gray-600">Hiring Partners</div>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="card p-6">
                    <FaGraduationCap className="text-3xl text-primary-600 mb-3" />
                    <div className="text-3xl font-bold text-gray-900">5000+</div>
                    <div className="text-gray-600">Students Placed</div>
                  </div>
                  <div className="card p-6 bg-gradient-to-br from-accent-400 to-accent-600 text-white">
                    <FaHandshake className="text-3xl mb-3" />
                    <div className="text-3xl font-bold">95%</div>
                    <div className="text-accent-100">Placement Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="section-tag">Our Courses</span>
            <h2 className="section-title">
              Industry-Ready 
              <span className="gradient-text"> IT Courses</span>
            </h2>
            <p className="section-subtitle">
              Choose from our wide range of courses designed to make you job-ready 
              with the latest technologies and skills demanded by the industry.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/courses" className="btn btn-primary btn-lg">
              View All Courses
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="inline-block px-4 py-1.5 bg-white/10 text-white text-sm font-semibold rounded-full mb-4">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Your Success is Our <span className="text-accent-400">Priority</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              We go beyond teaching. We prepare you for a successful career in IT.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: FaChalkboardTeacher,
                title: 'Expert Faculty',
                description: 'Learn from industry veterans with 10+ years of real-world experience'
              },
              {
                icon: FaLaptopCode,
                title: 'Hands-on Training',
                description: 'Work on live projects and build a portfolio that impresses employers'
              },
              {
                icon: FaBriefcase,
                title: 'Placement Support',
                description: '100% placement assistance with mock interviews and resume building'
              },
              {
                icon: FaCertificate,
                title: 'Certification',
                description: 'Get industry-recognized certificates to boost your credentials'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 bg-accent-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">
              Our Students 
              <span className="gradient-text"> Success Stories</span>
            </h2>
            <p className="section-subtitle">
              Hear from our students who transformed their careers with RS Softtecs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <TestimonialCard 
                key={testimonial._id} 
                testimonial={testimonial}
                variant={idx === 0 ? 'featured' : 'default'}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/testimonials" className="btn btn-secondary">
              View All Success Stories
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Google Reviews */}
      <section className="section">
        <div className="container mx-auto px-4">
          <div className="section-header">
            <span className="section-tag">Google Reviews</span>
            <h2 className="section-title">
              What Our Students 
              <span className="gradient-text"> Say About Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/reviews" className="btn btn-secondary">
              View All Reviews
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent-500 to-accent-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your IT Career?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get free career counseling and find the perfect course for you. 
              Our experts will guide you every step of the way.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-white btn-lg">
                Book Free Counseling
              </Link>
              <Link href="/courses" className="btn bg-white/20 text-white hover:bg-white/30 btn-lg">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry Popup - appears every 1 minute or when download clicked */}
      <EnquiryPopup 
        isOpen={showPopup} 
        onClose={closePopup}
        onSubmitted={markSubmitted}
        triggerSource={popupTrigger}
        downloadAfterSubmit={popupTrigger === 'syllabus_download'}
      />
    </Layout>
  );
}
