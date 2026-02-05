import Link from 'next/link';
import { FaClock, FaChartLine, FaArrowRight } from 'react-icons/fa';

const CourseCard = ({ course }) => {
  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'badge-success';
      case 'intermediate': return 'badge-warning';
      case 'advanced': return 'badge-error';
      default: return 'badge-info';
    }
  };

  return (
    <div className="card card-hover overflow-hidden group">
      {/* Top Accent Bar */}
      <div className="h-1 bg-gradient-to-r from-primary-600 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      
      <div className="p-6">
        {/* Icon & Level */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-primary-500 group-hover:to-primary-600 transition-colors">
            <i className={`${course.icon || 'fas fa-laptop-code'} text-2xl text-primary-600 group-hover:text-white transition-colors`} />
          </div>
          <span className={`badge ${getLevelColor(course.level)} capitalize`}>
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
          {course.name}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.shortDescription || course.description?.substring(0, 100)}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaClock className="text-primary-500" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <FaChartLine className="text-accent-500" />
            {course.category?.replace('-', ' ')}
          </span>
        </div>

        {/* Features Preview */}
        {course.features && (
          <div className="flex flex-wrap gap-2 mb-4">
            {course.features.slice(0, 3).map((feature, idx) => (
              <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link 
          href={`/courses/${course.slug || course._id}`}
          className="flex items-center justify-between text-primary-600 font-semibold group/link"
        >
          <span>View Details</span>
          <FaArrowRight className="transform group-hover/link:translate-x-2 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;
