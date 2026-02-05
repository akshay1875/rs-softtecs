import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { testimonialsAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaStar, FaBuilding, FaSearch } from 'react-icons/fa';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    // Filter testimonials based on search term
    if (searchTerm.trim() === '') {
      setFilteredTestimonials(testimonials);
    } else {
      const filtered = testimonials.filter(testimonial =>
        testimonial.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.companyPlaced?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.courseTaken?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        testimonial.testimonialText?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTestimonials(filtered);
    }
  }, [searchTerm, testimonials]);

  const fetchTestimonials = async () => {
    try {
      const { data } = await testimonialsAPI.getAll();
      setTestimonials(data.data);
      setFilteredTestimonials(data.data);
    } catch (error) {
      toast.error('Failed to fetch testimonials');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      await testimonialsAPI.toggleFeatured(id);
      fetchTestimonials();
      toast.success('Featured status updated');
    } catch (error) {
      toast.error('Failed to update featured status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      fetchTestimonials();
      toast.success('Testimonial deleted');
    } catch (error) {
      toast.error('Failed to delete testimonial');
    }
  };

  return (
    <AdminLayout title="Testimonials Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, company, course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">{filteredTestimonials.length} testimonials found</p>
          <Link href="/admin/testimonials/new" className="btn btn-primary">
            <FaPlus /> Add New Testimonial
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Course</th>
                <th>Placed At</th>
                <th>Package</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center py-8">
                    <div className="spinner mx-auto" />
                  </td>
                </tr>
              ) : filteredTestimonials.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    {searchTerm ? 'No testimonials match your search.' : 'No testimonials found. Add your first testimonial!'}
                  </td>
                </tr>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <tr key={testimonial._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        {testimonial.studentPhoto ? (
                          <img 
                            src={testimonial.studentPhoto} 
                            alt={testimonial.studentName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                            {testimonial.studentName?.split(' ').map(n => n[0]).join('')}
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{testimonial.studentName}</p>
                          <p className="text-xs text-gray-500">{testimonial.batchYear}</p>
                        </div>
                      </div>
                    </td>
                    <td>{testimonial.courseTaken || '-'}</td>
                    <td>
                      {testimonial.companyPlaced ? (
                        <div className="flex items-center gap-2">
                          <FaBuilding className="text-gray-400" />
                          <span>{testimonial.companyPlaced}</span>
                        </div>
                      ) : '-'}
                    </td>
                    <td>
                      {testimonial.package && (
                        <span className="badge badge-success">{testimonial.package}</span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleFeatured(testimonial._id)}
                        className={`text-xl ${testimonial.isFeatured ? 'text-yellow-500' : 'text-gray-300'}`}
                        title={testimonial.isFeatured ? 'Remove from featured' : 'Mark as featured'}
                      >
                        <FaStar />
                      </button>
                    </td>
                    <td>
                      <span className={`badge ${testimonial.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                        {testimonial.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/admin/testimonials/${testimonial._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(testimonial._id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
