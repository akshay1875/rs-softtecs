import { useState } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import { reviewsAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaSave, FaArrowLeft, FaStar, FaCamera, FaTimes } from 'react-icons/fa';

export default function NewReviewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [formData, setFormData] = useState({
    reviewerName: '',
    rating: 5,
    reviewMessage: '',
    reviewerPhoto: '',
    status: 'active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
        setFormData(prev => ({ ...prev, reviewerPhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview(null);
    setFormData(prev => ({ ...prev, reviewerPhoto: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await reviewsAPI.create(formData);
      toast.success('Review added successfully');
      router.push('/admin/reviews');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Add New Review">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <FaArrowLeft /> Back to Reviews
      </button>

      <div className="max-w-2xl">
        <form onSubmit={handleSubmit} className="card p-6 space-y-6">
          {/* Photo Upload */}
          <div className="form-group">
            <label className="form-label">Reviewer Photo</label>
            <div className="flex items-center gap-4">
              <div className="relative">
                {photoPreview ? (
                  <div className="relative">
                    <img 
                      src={photoPreview} 
                      alt="Preview" 
                      className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
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
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center border-2 border-dashed border-gray-300">
                    <FaCamera className="text-gray-400 text-xl" />
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
            <label className="form-label">Reviewer Name *</label>
            <input
              type="text"
              name="reviewerName"
              value={formData.reviewerName}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter reviewer's name"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating *</label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className="text-2xl focus:outline-none"
                >
                  <FaStar className={star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'} />
                </button>
              ))}
              <span className="ml-2 text-gray-600">{formData.rating} / 5</span>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Review Message *</label>
            <textarea
              name="reviewMessage"
              value={formData.reviewMessage}
              onChange={handleChange}
              required
              rows={5}
              className="form-textarea"
              placeholder="Enter the review message"
            />
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

          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? 'Saving...' : <><FaSave /> Save Review</>}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}
