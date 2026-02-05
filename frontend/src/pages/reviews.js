import { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import ReviewCard from '@/components/ui/ReviewCard';
import { PageLoader } from '@/components/ui/LoadingSpinner';
import { reviewsAPI } from '@/utils/api';
import { FaStar, FaGoogle } from 'react-icons/fa';

export default function ReviewsPage() {
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data } = await reviewsAPI.getAll();
      setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate average rating
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  if (loading) {
    return (
      <Layout title="Google Reviews">
        <PageLoader />
      </Layout>
    );
  }

  return (
    <Layout title="Google Reviews" description="Read what our students say about RS Softtecs on Google Reviews.">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-4">
              <FaGoogle className="text-xl" />
              <span className="text-sm font-semibold">Google Reviews</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Students <span className="text-accent-400">Say</span>
            </h1>
            <p className="text-lg text-gray-200 mb-8">
              Don&apos;t just take our word for it. Read genuine reviews from our students on Google.
            </p>
            
            {/* Rating Summary */}
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6">
              <div className="text-center">
                <div className="text-5xl font-bold text-accent-400">{averageRating}</div>
                <div className="flex justify-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar 
                      key={star} 
                      className={star <= Math.round(averageRating) ? 'text-accent-400' : 'text-gray-400'}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-300">{reviews.length} Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="section">
        <div className="container mx-auto px-4">
          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <FaGoogle className="text-6xl text-blue-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600">Be the first to leave a review!</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Share Your Experience</h2>
            <p className="text-gray-600 mb-8">
              Are you a student or alumni of RS Softtecs? We&apos;d love to hear about your experience!
            </p>
            <a 
              href="https://g.page/review" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <FaGoogle className="mr-2" />
              Leave a Google Review
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
