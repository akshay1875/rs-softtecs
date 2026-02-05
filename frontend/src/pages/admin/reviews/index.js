import { useState, useEffect } from 'react';
import Link from 'next/link';
import AdminLayout from '@/components/admin/AdminLayout';
import { reviewsAPI } from '@/utils/api';
import toast from 'react-hot-toast';
import { FaPlus, FaEdit, FaTrash, FaStar, FaSearch } from 'react-icons/fa';

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  useEffect(() => {
    // Filter reviews based on search term
    if (searchTerm.trim() === '') {
      setFilteredReviews(reviews);
    } else {
      const filtered = reviews.filter(review =>
        review.reviewerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.reviewMessage?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredReviews(filtered);
    }
  }, [searchTerm, reviews]);

  const fetchReviews = async () => {
    try {
      const { data } = await reviewsAPI.getAll();
      setReviews(data.data);
      setFilteredReviews(data.data);
    } catch (error) {
      toast.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    try {
      await reviewsAPI.delete(id);
      fetchReviews();
      toast.success('Review deleted');
    } catch (error) {
      toast.error('Failed to delete review');
    }
  };

  const renderStars = (rating) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar key={star} className={star <= rating ? 'text-yellow-400' : 'text-gray-300'} />
      ))}
    </div>
  );

  return (
    <AdminLayout title="Google Reviews Management">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or message..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input pl-10 w-full"
          />
        </div>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">{filteredReviews.length} reviews found</p>
          <Link href="/admin/reviews/new" className="btn btn-primary">
            <FaPlus /> Add New Review
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center py-12">
            <div className="spinner" />
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            {searchTerm ? 'No reviews match your search.' : 'No reviews found. Add your first review!'}
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div key={review._id} className={`card p-6 ${review.status === 'inactive' ? 'opacity-60' : ''}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {review.reviewerPhoto ? (
                    <img 
                      src={review.reviewerPhoto} 
                      alt={review.reviewerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.reviewerName?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold">{review.reviewerName}</h3>
                    {renderStars(review.rating)}
                  </div>
                </div>
                <span className={`badge ${review.status === 'active' ? 'badge-success' : 'badge-error'}`}>
                  {review.status}
                </span>
              </div>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {review.reviewMessage}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-xs text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center gap-1">
                  <Link
                    href={`/admin/reviews/${review._id}`}
                    className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(review._id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </AdminLayout>
  );
}
