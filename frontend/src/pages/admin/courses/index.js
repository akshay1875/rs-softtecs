import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { coursesAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data } = await coursesAPI.getAll();
      setCourses(data.data);
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await coursesAPI.toggleStatus(id);
      fetchCourses();
      toast.success('Course status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    try {
      await coursesAPI.delete(id);
      fetchCourses();
      toast.success('Course deleted successfully');
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  return (
    <AdminLayout title="Courses Management">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">{courses.length} courses found</p>
        <Link href="/admin/courses/new" className="btn btn-primary">
          <FaPlus /> Add New Course
        </Link>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Category</th>
                <th>Level</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center py-8">
                    <div className="spinner mx-auto" />
                  </td>
                </tr>
              ) : courses.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500">
                    No courses found. Add your first course!
                  </td>
                </tr>
              ) : (
                courses.map((course) => (
                  <tr key={course._id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                          <i className={`${course.icon || 'fas fa-laptop-code'} text-primary-600`} />
                        </div>
                        <div>
                          <p className="font-medium">{course.name}</p>
                          {course.isFeatured && (
                            <span className="badge badge-purple text-xs">Featured</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td>{course.duration}</td>
                    <td className="capitalize">{course.category?.replace('-', ' ')}</td>
                    <td className="capitalize">{course.level}</td>
                    <td>
                      <span className={`badge ${
                        course.status === 'active' ? 'badge-success' :
                        course.status === 'inactive' ? 'badge-error' :
                        'badge-warning'
                      }`}>
                        {course.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleStatus(course._id)}
                          className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded"
                          title={course.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {course.status === 'active' ? <FaEyeSlash /> : <FaEye />}
                        </button>
                        <Link
                          href={`/admin/courses/${course._id}`}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                          title="Edit"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(course._id)}
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
