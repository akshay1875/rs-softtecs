import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { testimonialsAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaCamera, FaTimes } from 'react-icons/fa';

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentPhoto: '',
    testimonialText: '',
    courseTaken: '',
    companyPlaced: '',
    designation: '',
    package: '',
    batchYear: '',
    rating: 5,
    status: 'active',
    isFeatured: false
  });

  useEffect(() => {
    if (id) {
      fetchTestimonial();
    }
  }, [id]);

  const fetchTestimonial = async () => {
    try {
      const { data } = await testimonialsAPI.getOne(id);
      const testimonial = data.data;
      setFormData({
        studentName: testimonial.studentName || '',
        studentPhoto: testimonial.studentPhoto || '',
        testimonialText: testimonial.testimonialText || '',
        courseTaken: testimonial.courseTaken || '',
        companyPlaced: testimonial.companyPlaced || '',
        designation: testimonial.designation || '',
        package: testimonial.package || '',
        batchYear: testimonial.batchYear || '',
        rating: testimonial.rating || 5,
        status: testimonial.status || 'active',
        isFeatured: testimonial.isFeatured || false
      });
      if (testimonial.studentPhoto) {
        setPhotoPreview(testimonial.studentPhoto);
      }
    } catch (error) {
      toast.error('Failed to fetch testimonial');
      router.push('/admin/testimonials');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({ ...prev, studentPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, studentPhoto: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await testimonialsAPI.update(id, formData);
      toast.success('Testimonial updated successfully');
      router.push('/admin/testimonials');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update testimonial');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout title="Edit Testimonial">
        <div className="flex justify-center py-12">
          <div className="spinner" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Testimonial">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Testimonials
      </button>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Student Information</h2>
              <div className="space-y-4">
                {/* Photo Upload */}
                <div className="form-group">
                  <label className="form-label">Student Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {photoPreview ? (
                        <div className="relative">
                          <img 
                            src={photoPreview} 
                            alt="Preview" 
                            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={removePhoto}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                          >
                            <FaTimes className="text-xs" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                          <FaCamera className="text-gray-400 text-2xl" />
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="btn btn-secondary cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoChange}
                          className="hidden"
                        />
                        {photoPreview ? 'Change Photo' : 'Upload Photo'}
                      </label>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG. Max 2MB</p>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Student Name *</label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="Enter student's full name"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Testimonial Text *</label>
                  <textarea
                    name="testimonialText"
                    value={formData.testimonialText}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="form-textarea"
                    placeholder="Enter the student's testimonial..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Course Taken</label>
                    <input
                      type="text"
                      name="courseTaken"
                      value={formData.courseTaken}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Full Stack Java"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Batch Year</label>
                    <input
                      type="text"
                      name="batchYear"
                      value={formData.batchYear}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., 2024"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Placement Details (Optional)</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="form-group">
                    <label className="form-label">Company Placed</label>
                    <input
                      type="text"
                      name="companyPlaced"
                      value={formData.companyPlaced}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Infosys"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Designation</label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g., Software Engineer"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Package</label>
                  <input
                    type="text"
                    name="package"
                    value={formData.package}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., 5 LPA"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <div className="card p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Rating</label>
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    className="form-select"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option key={r} value={r}>{r} Stars</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    id="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 text-primary-600"
                  />
                  <label htmlFor="isFeatured" className="text-sm">Featured Testimonial</label>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? 'Saving...' : <><FaSave /> Update Testimonial</>}
              </button>
              <button 
                type="button" 
                onClick={() => router.back()}
                className="btn btn-secondary w-full"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminLayout>
  );
}
