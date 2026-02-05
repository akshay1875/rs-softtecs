import { FaStar, FaGoogle } from 'react-icons/fa';

const ReviewCard = ({ review }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={`text-sm ${i < rating ? 'text-accent-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="card p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.reviewerPhoto ? (
            <img 
              src={review.reviewerPhoto} 
              alt={review.reviewerName}
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
            />
          ) : (
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {review.reviewerName?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-gray-900">{review.reviewerName}</h4>
            <div className="flex gap-0.5 mt-1">
              {renderStars(review.rating)}
            </div>
          </div>
        </div>
        <FaGoogle className="text-xl text-blue-500" />
      </div>

      {/* Review Text */}
      <p className="text-gray-600 text-sm leading-relaxed">
        {review.reviewMessage}
      </p>

      {/* Verified Badge */}
      {review.isVerified && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs text-green-600 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
            Verified Google Review
          </span>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
