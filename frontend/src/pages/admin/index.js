import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { coursesAPI, reviewsAPI, testimonialsAPI, enquiriesAPI, quizAPI } from '@/utils/api';
import { FaBook, FaStar, FaComments, FaEnvelope, FaArrowUp, FaArrowDown, FaQuestionCircle } from 'react-icons/fa';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    courses: 0,
    reviews: 0,
    testimonials: 0,
    enquiries: { total: 0, new: 0 },
    quizQuestions: 0
  });
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [coursesRes, reviewsRes, testimonialsRes, enquiriesRes, quizRes] = await Promise.all([
        coursesAPI.getAll(),
        reviewsAPI.getAll(),
        testimonialsAPI.getAll(),
        enquiriesAPI.getAll(),
        quizAPI.getAll()
      ]);

      const enquiries = enquiriesRes.data.data;
      const newEnquiries = enquiries.filter(e => e.status === 'new').length;

      setStats({
        courses: coursesRes.data.count,
        reviews: reviewsRes.data.count,
        testimonials: testimonialsRes.data.count,
        enquiries: { total: enquiries.length, new: newEnquiries },
        quizQuestions: quizRes.data.count || 0
      });

      setRecentEnquiries(enquiries.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      title: 'Total Courses', 
      value: stats.courses, 
      icon: FaBook, 
      color: 'bg-blue-500',
      link: '/admin/courses'
    },
    { 
      title: 'Google Reviews', 
      value: stats.reviews, 
      icon: FaStar, 
      color: 'bg-yellow-500',
      link: '/admin/reviews'
    },
    { 
      title: 'Testimonials', 
      value: stats.testimonials, 
      icon: FaComments, 
      color: 'bg-green-500',
      link: '/admin/testimonials'
    },
    { 
      title: 'New Enquiries', 
      value: stats.enquiries.new, 
      icon: FaEnvelope, 
      color: 'bg-red-500',
      link: '/admin/enquiries',
      subtext: `${stats.enquiries.total} total`
    },
    { 
      title: 'Quiz Questions', 
      value: stats.quizQuestions, 
      icon: FaQuestionCircle, 
      color: 'bg-purple-500',
      link: '/admin/quiz'
    },
  ];

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {statCards.map((stat, idx) => (
          <Link key={idx} href={stat.link} className="card p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                {stat.subtext && (
                  <p className="text-xs text-gray-400 mt-1">{stat.subtext}</p>
                )}
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white`}>
                <stat.icon className="text-xl" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Enquiries</h2>
          <Link href="/admin/enquiries" className="text-primary-600 text-sm hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Course</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentEnquiries.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No enquiries yet
                  </td>
                </tr>
              ) : (
                recentEnquiries.map((enquiry) => (
                  <tr key={enquiry._id}>
                    <td className="font-medium">{enquiry.name}</td>
                    <td>{enquiry.email}</td>
                    <td>{enquiry.phone}</td>
                    <td>{enquiry.courseInterested || '-'}</td>
                    <td>
                      <span className={`badge ${
                        enquiry.status === 'new' ? 'badge-error' :
                        enquiry.status === 'contacted' ? 'badge-success' :
                        'badge-warning'
                      }`}>
                        {enquiry.status}
                      </span>
                    </td>
                    <td className="text-gray-500 text-sm">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
        {[
          { label: 'Add New Course', href: '/admin/courses/new', color: 'bg-primary-600' },
          { label: 'Add Review', href: '/admin/reviews/new', color: 'bg-yellow-600' },
          { label: 'Add Testimonial', href: '/admin/testimonials/new', color: 'bg-green-600' },
          { label: 'Add Quiz Question', href: '/admin/quiz/new', color: 'bg-purple-600' },
          { label: 'View Enquiries', href: '/admin/enquiries', color: 'bg-red-600' },
        ].map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className={`${link.color} text-white text-center py-3 px-4 rounded-lg font-medium hover:opacity-90 transition-opacity`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}
