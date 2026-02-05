import { FaStar, FaQuoteLeft, FaBuilding, FaBriefcase } from 'react-icons/fa';

const TestimonialCard = ({ testimonial, variant = 'default' }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < rating ? 'text-accent-400' : 'text-gray-300'} 
      />
    ));
  };

  if (variant === 'featured') {
    return (
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white rounded-2xl p-8 shadow-purple">
        <FaQuoteLeft className="text-4xl text-primary-300 opacity-50 mb-4" />
        <p className="text-lg leading-relaxed mb-6">
          {testimonial.testimonialText}
        </p>
        <div className="flex items-center gap-4">
          {testimonial.studentPhoto ? (
            <img 
              src={testimonial.studentPhoto} 
              alt={testimonial.studentName}
              className="w-14 h-14 rounded-full object-cover border-2 border-white/30"
            />
          ) : (
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
              {testimonial.studentName?.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-lg">{testimonial.studentName}</h4>
            {testimonial.companyPlaced && (
              <p className="text-primary-200 text-sm">
                {testimonial.designation} at {testimonial.companyPlaced}
              </p>
            )}
          </div>
        </div>
        {testimonial.package && (
          <div className="mt-4 inline-block bg-accent-500 text-white px-4 py-2 rounded-lg text-sm font-semibold">
            Package: {testimonial.package}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="card card-hover p-6">
      {/* Quote Icon */}
      <FaQuoteLeft className="text-2xl text-primary-200 mb-4" />
      
      {/* Testimonial Text */}
      <p className="text-gray-600 leading-relaxed mb-6">
        {testimonial.testimonialText}
      </p>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {renderStars(testimonial.rating || 5)}
      </div>

      {/* Author Info */}
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        {testimonial.studentPhoto ? (
          <img 
            src={testimonial.studentPhoto} 
            alt={testimonial.studentName}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold">
            {testimonial.studentName?.split(' ').map(n => n[0]).join('')}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{testimonial.studentName}</h4>
          {testimonial.courseTaken && (
            <p className="text-sm text-gray-500">{testimonial.courseTaken}</p>
          )}
        </div>
      </div>

      {/* Placement Info */}
      {testimonial.companyPlaced && (
        <div className="mt-4 flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2 text-gray-600">
            <FaBuilding className="text-primary-500" />
            {testimonial.companyPlaced}
          </span>
          {testimonial.package && (
            <span className="flex items-center gap-2 text-accent-600 font-semibold">
              <FaBriefcase className="text-accent-500" />
              {testimonial.package}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TestimonialCard;
